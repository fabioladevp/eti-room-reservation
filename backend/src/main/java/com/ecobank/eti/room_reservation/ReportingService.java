package com.ecobank.eti.room_reservation;

import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.Color;
import java.io.*;
import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
class ReportingService {
    private final ReservationRepository requests;
    private final FeedbackRepository feedbacks;
    private final FeedbackAnswerRepository feedbackAnswers;

    ReportingService(ReservationRepository requests, FeedbackRepository feedbacks, FeedbackAnswerRepository feedbackAnswers) {
        this.requests = requests; this.feedbacks = feedbacks; this.feedbackAnswers = feedbackAnswers;
    }

    @Transactional(readOnly = true)
    DashboardView dashboard() {
        List<ReservationRequestEntity> all = requests.findAllByOrderByCreatedAtDesc();
        double hours = all.stream().filter(r -> !EnumSet.of(RequestStatus.CANCELLED, RequestStatus.EXPIRED).contains(r.status))
                .flatMap(r -> r.occurrences.stream()).mapToLong(o -> Duration.between(o.startTime, o.endTime).toMinutes()).sum() / 60.0;
        long participants = all.stream().filter(r -> !EnumSet.of(RequestStatus.CANCELLED, RequestStatus.EXPIRED).contains(r.status)).mapToLong(r -> r.participantCount).sum();
        Map<String, Long> byStatus = all.stream().collect(Collectors.groupingBy(r -> r.status.name(), LinkedHashMap::new, Collectors.counting()));
        Map<String, Long> byBuilding = all.stream().filter(r -> r.assignedRoom != null)
                .collect(Collectors.groupingBy(r -> r.assignedRoom.building.name, LinkedHashMap::new, Collectors.counting()));
        Map<String, Long> byRoom = all.stream().filter(r -> r.assignedRoom != null && !EnumSet.of(RequestStatus.CANCELLED, RequestStatus.EXPIRED).contains(r.status))
                .collect(Collectors.groupingBy(r -> r.assignedRoom.name + " · " + r.assignedRoom.building.name, Collectors.counting()))
                .entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed().thenComparing(Map.Entry.comparingByKey()))
                .limit(8)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (left, right) -> left, LinkedHashMap::new));
        LocalDate first = all.stream().flatMap(r -> r.occurrences.stream()).map(o -> o.occurrenceDate).min(LocalDate::compareTo).orElse(LocalDate.now());
        long days = Math.max(1, ChronoUnit.DAYS.between(first, LocalDate.now()) + 1);
        double occupancy = Math.min(100, hours / (14d * 12d * days) * 100d);
        return new DashboardView(all.size(), round(hours), participants, round(occupancy),
                all.stream().filter(r -> EnumSet.of(RequestStatus.SUBMITTED, RequestStatus.PENDING_FACILITY, RequestStatus.PENDING_IT).contains(r.status)).count(),
                requests.countByStatus(RequestStatus.CANCELLED), requests.countByPriorityLevel(PriorityLevel.PRIORITY),
                round(Optional.ofNullable(feedbackAnswers.averageRating())
                        .orElseGet(() -> Optional.ofNullable(feedbacks.averageRating()).orElse(0d))), byStatus, byBuilding, byRoom);
    }

    @Transactional(readOnly = true)
    byte[] excel() {
        try (Workbook wb = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = wb.createSheet("Réservations");
            String[] headers = {"Référence","Objet","Demandeur","Début","Fin","Participants","Salle","Statut","Priorité"};
            Row header = sheet.createRow(0);
            CellStyle hs = wb.createCellStyle();
            hs.setFillForegroundColor(IndexedColors.DARK_TEAL.getIndex()); hs.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            Font hf = wb.createFont(); hf.setBold(true); hf.setColor(IndexedColors.WHITE.getIndex()); hs.setFont(hf);
            for (int i=0;i<headers.length;i++) { Cell c=header.createCell(i); c.setCellValue(headers[i]); c.setCellStyle(hs); }
            int rowIndex = 1;
            for (ReservationRequestEntity r : requests.findAllByOrderByCreatedAtDesc()) {
                Row row = sheet.createRow(rowIndex++); int c=0;
                row.createCell(c++).setCellValue(r.reference); row.createCell(c++).setCellValue(r.subject);
                row.createCell(c++).setCellValue(r.requester.fullName); row.createCell(c++).setCellValue(r.startDate + " " + r.startTime);
                row.createCell(c++).setCellValue(r.endDate + " " + r.endTime); row.createCell(c++).setCellValue(r.participantCount);
                row.createCell(c++).setCellValue(r.assignedRoom == null ? "Non assignée" : r.assignedRoom.name);
                row.createCell(c++).setCellValue(r.status.name()); row.createCell(c).setCellValue(r.priorityLevel.name());
            }
            for(int i=0;i<headers.length;i++) sheet.autoSizeColumn(i);
            wb.write(out); return out.toByteArray();
        } catch (IOException e) { throw new IllegalStateException("Impossible de produire l'export Excel", e); }
    }

    @Transactional(readOnly = true)
    byte[] pdf() {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document doc = new Document(PageSize.A4.rotate(), 30, 30, 30, 30);
            PdfWriter.getInstance(doc, out); doc.open();
            com.lowagie.text.Font title = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, new Color(0,91,130));
            doc.add(new Paragraph("ETI - Rapport des réservations", title));
            doc.add(new Paragraph("Généré le " + LocalDateTime.now(ZoneId.of("Africa/Lome")))); doc.add(Chunk.NEWLINE);
            PdfPTable table = new PdfPTable(new float[]{1.2f,2.2f,1.8f,1.4f,1.2f,2f,1.4f}); table.setWidthPercentage(100);
            for (String h : List.of("Référence","Objet","Demandeur","Période","Participants","Salle","Statut")) {
                PdfPCell cell = new PdfPCell(new Phrase(h, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9, Color.WHITE)));
                cell.setBackgroundColor(new Color(0,91,130)); cell.setPadding(6); table.addCell(cell);
            }
            for (ReservationRequestEntity r : requests.findAllByOrderByCreatedAtDesc()) {
                add(table,r.reference); add(table,r.subject); add(table,r.requester.fullName); add(table,r.startDate+" au "+r.endDate);
                add(table,String.valueOf(r.participantCount)); add(table,r.assignedRoom==null?"Non assignée":r.assignedRoom.name); add(table,r.status.name());
            }
            doc.add(table); doc.close(); return out.toByteArray();
        } catch (DocumentException | IOException e) { throw new IllegalStateException("Impossible de produire l'export PDF", e); }
    }

    private void add(PdfPTable t, String value) { PdfPCell c = new PdfPCell(new Phrase(value, FontFactory.getFont(FontFactory.HELVETICA, 8))); c.setPadding(5); t.addCell(c); }
    private double round(double value) { return Math.round(value * 10d) / 10d; }
}
