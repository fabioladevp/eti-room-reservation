from pathlib import Path
from datetime import date
import math

from PIL import Image, ImageDraw, ImageFont
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn


ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "report_assets"
OUT = ROOT / "Sections_3_2_a_3_4_4_Rapport_de_stage_ETI.docx"
ASSETS.mkdir(parents=True, exist_ok=True)

NAVY = "005B82"
NAVY_DARK = "17343E"
BLUE = "2E74B5"
BLUE_DARK = "1F4D78"
LIME = "B8D900"
LIGHT = "F2F4F7"
PALE_BLUE = "E8F2F5"
PALE_GREEN = "F3F8E5"
MUTED = "58717B"
RED = "9B1C1C"
GOLD = "7A5A00"
WHITE = "FFFFFF"
BLACK = "000000"


def font(size, bold=False):
    path = Path(r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf")
    return ImageFont.truetype(str(path), size)


def draw_arrow(draw, start, end, fill="#78909A", width=4):
    draw.line([start, end], fill=fill, width=width)
    angle = math.atan2(end[1] - start[1], end[0] - start[0])
    length = 14
    for delta in (2.55, -2.55):
        p = (end[0] + length * math.cos(angle + delta), end[1] + length * math.sin(angle + delta))
        draw.line([end, p], fill=fill, width=width)


def rounded_box(draw, xy, title, subtitle="", fill="#FFFFFF", outline="#D5E1E4", accent="#005B82", title_size=22):
    x1, y1, x2, y2 = xy
    draw.rounded_rectangle(xy, radius=16, fill=fill, outline=outline, width=3)
    draw.rounded_rectangle((x1, y1, x1 + 10, y2), radius=5, fill=accent)
    draw.text((x1 + 24, y1 + 18), title, font=font(title_size, True), fill="#17343E")
    if subtitle:
        draw.multiline_text((x1 + 24, y1 + 52), subtitle, font=font(15), fill="#58717B", spacing=5)


def create_db_diagram(path):
    img = Image.new("RGB", (1800, 1180), "#F7F9FA")
    d = ImageDraw.Draw(img)
    d.text((70, 38), "Modèle relationnel simplifié - base eti_rooms", font=font(34, True), fill="#17343E")
    d.text((70, 87), "Relations principales entre identité, ressources, réservations et suivi", font=font(19), fill="#58717B")

    groups = [
        ((55, 145, 430, 1120), "IDENTITÉ & ACCÈS", "#E8F2F5"),
        ((455, 145, 900, 1120), "RESSOURCES", "#F3F8E5"),
        ((925, 145, 1360, 1120), "RÉSERVATIONS", "#EDF1F8"),
        ((1385, 145, 1745, 1120), "SUIVI", "#FFF5E8"),
    ]
    for (x1, y1, x2, y2), label, color in groups:
        d.rounded_rectangle((x1, y1, x2, y2), radius=22, fill=color, outline="#D4E0E4", width=2)
        d.text((x1 + 22, y1 + 18), label, font=font(17, True), fill="#005B82")

    boxes = {
        "roles": (85, 230, 395, 325), "users": (85, 390, 395, 500), "user_roles": (85, 565, 395, 660),
        "buildings": (485, 230, 870, 325), "rooms": (485, 390, 870, 505), "capacities": (485, 570, 870, 675),
        "equipment": (485, 740, 870, 845), "room_equipment": (485, 905, 870, 1010),
        "requests": (955, 230, 1330, 365), "occurrences": (955, 430, 1330, 540), "assignments": (955, 605, 1330, 715),
        "validations": (955, 775, 1330, 885), "blocks": (955, 945, 1330, 1045),
        "notifications": (1415, 230, 1715, 330), "feedbacks": (1415, 410, 1715, 520),
        "answers": (1415, 600, 1715, 700), "audit": (1415, 800, 1715, 900),
    }
    labels = {
        "roles": ("ROLES", "id · name"), "users": ("USERS", "id · email · password_hash\nactive · deleted_at"),
        "user_roles": ("USER_ROLES", "user_id · role_id"), "buildings": ("BUILDINGS", "id · code · name"),
        "rooms": ("ROOMS", "id · building_id · status\nphoto_url · version"), "capacities": ("ROOM_CAPACITIES", "room_id · layout · capacity"),
        "equipment": ("EQUIPMENT", "type · quantities · status"), "room_equipment": ("ROOM_EQUIPMENT", "room_id · equipment_id"),
        "requests": ("RESERVATION_REQUESTS", "requester_id · dates · statut\nassigned_room_id · validations"),
        "occurrences": ("RESERVATION_OCCURRENCES", "request_id · date · heures"),
        "assignments": ("ASSIGNMENTS", "request_id · room_id · assigned_by"),
        "validations": ("VALIDATION_RECORDS", "request_id · validator_id · décision"),
        "blocks": ("ROOM_BLOCKS", "room_id · période · motif"),
        "notifications": ("NOTIFICATIONS", "user_id · type · lu/non lu"),
        "feedbacks": ("FEEDBACKS", "request_id · respondent_id\nnote globale"),
        "answers": ("FEEDBACK_ANSWERS", "feedback_id · critère · note"),
        "audit": ("AUDIT_LOGS", "acteur · action · entité · date"),
    }
    accents = {"users":"#005B82", "rooms":"#6A8F18", "requests":"#585F99", "feedbacks":"#BD7622"}
    for key, xy in boxes.items():
        rounded_box(d, xy, *labels[key], accent=accents.get(key, "#78909A"), title_size=18)

    arrows = [
        ("roles", "user_roles"), ("users", "user_roles"), ("buildings", "rooms"), ("rooms", "capacities"),
        ("equipment", "room_equipment"), ("rooms", "room_equipment"), ("users", "requests"), ("rooms", "requests"),
        ("requests", "occurrences"), ("requests", "assignments"), ("requests", "validations"), ("rooms", "blocks"),
        ("users", "notifications"), ("requests", "feedbacks"), ("feedbacks", "answers"), ("users", "audit"),
    ]
    for a, b in arrows:
        ax1, ay1, ax2, ay2 = boxes[a]
        bx1, by1, bx2, by2 = boxes[b]
        start = (ax2, (ay1 + ay2)//2) if bx1 > ax2 else ((ax1 + ax2)//2, ay2)
        end = (bx1, (by1 + by2)//2) if bx1 > ax2 else ((bx1 + bx2)//2, by1)
        draw_arrow(d, start, end, fill="#9AACB2", width=3)
    img.save(path)


def create_nav_diagram(path):
    img = Image.new("RGB", (1800, 1040), "#F8FAFB")
    d = ImageDraw.Draw(img)
    d.text((70, 35), "Plan de navigation par rôle", font=font(36, True), fill="#17343E")
    d.text((70, 88), "Le serveur contrôle les autorisations ; les menus s’adaptent au profil connecté.", font=font(19), fill="#58717B")
    rounded_box(d, (700, 145, 1100, 255), "CONNEXION", "Adresse professionnelle + mot de passe", fill="#FFFFFF", accent="#005B82", title_size=24)

    role_boxes = [
        ((70, 365, 440, 925), "DEMANDEUR", "#E8F2F5", ["Accueil", "Nouvelle demande", "Mes demandes", "Planning", "Salles", "Feedback J+1"]),
        ((485, 365, 855, 925), "ADMINISTRATEUR", "#EDF1F8", ["Tableau de bord", "Demandes & assignations", "Salles / équipements", "Utilisateurs", "Rapports", "Journal d’audit"]),
        ((900, 365, 1270, 925), "FACILITY", "#F3F8E5", ["Accueil", "Validations physiques", "Planning", "Salles", "Feedbacks", "Notifications"]),
        ((1315, 365, 1685, 925), "PERSONNEL IT", "#FFF5E8", ["Accueil", "Validations IT", "Équipements", "Planning", "Feedbacks", "Notifications"]),
    ]
    for i, (xy, title, fill, items) in enumerate(role_boxes):
        x1, y1, x2, y2 = xy
        d.rounded_rectangle(xy, radius=22, fill=fill, outline="#D2E0E4", width=3)
        d.text((x1+24, y1+22), title, font=font(22, True), fill="#005B82")
        y = y1 + 82
        for item in items:
            d.rounded_rectangle((x1+24, y, x2-24, y+58), radius=10, fill="#FFFFFF", outline="#DCE6E9", width=2)
            d.ellipse((x1+42, y+19, x1+60, y+37), fill=["#005B82","#585F99","#6A8F18","#BD7622"][i])
            d.text((x1+78, y+17), item, font=font(17, True), fill="#17343E")
            y += 72
        draw_arrow(d, (900, 255), ((x1+x2)//2, y1), fill="#78909A", width=4)

    d.rounded_rectangle((520, 960, 1280, 1015), radius=14, fill="#005B82")
    d.text((572, 975), "Commun : langue FR/EN · notifications · tutoriels d’utilisation", font=font(18, True), fill="#FFFFFF")
    img.save(path)


def mock_base(title, subtitle, accent="#005B82"):
    img = Image.new("RGB", (1600, 880), "#F4F7F8")
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, 1600, 95), fill=accent)
    d.text((45, 25), "Ecobank  |  ETI", font=font(28, True), fill="#FFFFFF")
    d.rounded_rectangle((455, 22, 1120, 72), radius=12, fill="#267797", outline="#6FA9BE", width=2)
    d.text((485, 36), "Rechercher une salle, une demande...", font=font(16), fill="#EAF3F6")
    d.text((1375, 35), "FR / EN", font=font(16, True), fill="#FFFFFF")
    d.rectangle((0, 95, 270, 880), fill="#FFFFFF")
    for i, label in enumerate(["Accueil", "Planning", "Demandes", "Salles", "Notifications"]):
        y = 165 + i*70
        if i == 2:
            d.rounded_rectangle((20, y-12, 250, y+42), radius=9, fill="#E8F2F5")
        d.rounded_rectangle((38, y, 68, y+30), radius=6, fill="#E5EEF1", outline="#BFCFD4")
        d.text((88, y+4), label, font=font(16, i==2), fill="#2B4A55")
    d.text((325, 130), title, font=font(34, True), fill="#17343E")
    d.text((325, 183), subtitle, font=font(18), fill="#58717B")
    return img, d


def create_masks():
    paths = []
    # Connexion
    p = ASSETS / "mask_1_connexion.png"
    img = Image.new("RGB", (1600, 880), "#FFFFFF"); d = ImageDraw.Draw(img)
    d.rectangle((0,0,780,880), fill="#005B82")
    d.text((70,70), "Ecobank  |  ETI", font=font(32,True), fill="#FFFFFF")
    d.text((70,260), "Vos espaces de réunion,", font=font(42,True), fill="#FFFFFF")
    d.text((70,320), "simplement organisés.", font=font(42,True), fill="#D6E887")
    d.multiline_text((70,410), "Accès sécurisé au suivi des demandes,\nvalidations et réservations.", font=font(23), fill="#DCEBF0", spacing=10)
    d.text((925,170), "Connexion", font=font(38,True), fill="#17343E")
    for y,label,value in [(290,"Adresse e-mail professionnelle","prenom.nom@ecobank.com"),(455,"Mot de passe","••••••••••••")]:
        d.text((925,y), label, font=font(17,True), fill="#45636D")
        d.rounded_rectangle((925,y+35,1460,y+100),radius=9,fill="#FFFFFF",outline="#BFCFD4",width=3)
        d.text((948,y+57),value,font=font(18),fill="#78909A")
    d.rounded_rectangle((925,635,1460,705),radius=9,fill="#005B82")
    d.text((1105,657),"SE CONNECTER",font=font(20,True),fill="#FFFFFF")
    img.save(p); paths.append(p)

    # Demande
    p = ASSETS / "mask_2_demande.png"; img,d=mock_base("Nouvelle demande","Informations générales, période, horaires et besoins")
    d.rounded_rectangle((320,235,1515,815),radius=14,fill="#FFFFFF",outline="#D8E4E7",width=3)
    fields=[(360,285,910,355,"Objet de la réunion"),(945,285,1475,355,"Nombre de participants"),(360,405,880,475,"Date de début"),(925,405,1475,475,"Date de fin"),(360,525,880,595,"Heure de début"),(925,525,1475,595,"Heure de fin")]
    for x1,y1,x2,y2,label in fields:
        d.text((x1,y1-26),label,font=font(14,True),fill="#58717B")
        d.rounded_rectangle((x1,y1,x2,y2),radius=8,fill="#FFFFFF",outline="#C8D6DA",width=2)
    d.rounded_rectangle((360,650,740,710),radius=8,fill="#F3F8E5",outline="#C8D991",width=2)
    d.text((385,669),"✓  Mêmes horaires chaque jour",font=font(17,True),fill="#456100")
    d.rounded_rectangle((1180,735,1475,790),radius=8,fill="#005B82")
    d.text((1240,752),"SOUMETTRE",font=font(18,True),fill="#FFFFFF")
    img.save(p); paths.append(p)

    # Assignation
    p = ASSETS / "mask_3_assignation.png"; img,d=mock_base("Demandes et assignations","Vérification de compatibilité avant affectation",accent="#585F99")
    d.rounded_rectangle((320,235,1515,800),radius=14,fill="#FFFFFF",outline="#D8E4E7",width=3)
    d.text((360,275),"REQ-2026-0184 · Formation conformité régionale",font=font(23,True),fill="#17343E")
    d.text((360,320),"28 participants · 3 occurrences · disposition Conseil",font=font(17),fill="#58717B")
    rooms=[("Salle de Conseil du 7e étage",True,"Compatible avec toutes les occurrences"),("Amphi du PAC",False,"Capacité/disposition incompatible"),("Salon VIP",False,"Conflit horaire avec une réservation")]
    y=390
    for name,ok,reason in rooms:
        fill="#F2FAF6" if ok else "#FFF6F4"; border="#9FD1C3" if ok else "#E7B9B2"; icon="✓" if ok else "!"
        d.rounded_rectangle((360,y,1470,y+105),radius=10,fill=fill,outline=border,width=2)
        d.ellipse((388,y+31,432,y+75),fill="#DCEFE8" if ok else "#FBE2DE")
        d.text((403,y+39),icon,font=font(18,True),fill="#087A62" if ok else "#A12820")
        d.text((458,y+22),name,font=font(18,True),fill="#17343E")
        d.text((458,y+57),reason,font=font(15),fill="#58717B")
        if ok:
            d.rounded_rectangle((1260,y+28,1440,y+78),radius=7,fill="#005B82")
            d.text((1302,y+44),"ASSIGNER",font=font(15,True),fill="#FFFFFF")
        y+=125
    img.save(p); paths.append(p)

    # Feedback
    p = ASSETS / "mask_4_feedback.png"; img,d=mock_base("Questionnaire de satisfaction","Disponible à J+1 après la dernière occurrence",accent="#BD7622")
    d.rounded_rectangle((320,235,1515,815),radius=14,fill="#FFFFFF",outline="#D8E4E7",width=3)
    d.text((360,275),"Évaluez uniquement les critères pertinents",font=font(22,True),fill="#17343E")
    d.text((955,280),"VERY GOOD     GOOD      POOR",font=font(14,True),fill="#58717B")
    rows=["Salle / Venue","Cadre & Décor","Connexion Réseau & Internet","Qualité de l’Audio-Visuel"]
    y=340
    for i,label in enumerate(rows):
        d.rectangle((360,y,1470,y+65),fill="#F7F9FA" if i%2==0 else "#FFFFFF")
        d.text((385,y+21),label,font=font(16,True),fill="#294853")
        for x in (1030,1195,1355):
            d.ellipse((x,y+19,x+25,y+44),outline="#78909A",width=3)
        if i in (0,2): d.ellipse((1036,y+25,1049,y+38),fill="#005B82")
        y+=70
    d.text((385,655),"Note globale",font=font(19,True),fill="#17343E")
    for i in range(5):
        d.text((565+i*60,642),"★",font=font(34,True),fill="#E0A22E" if i<4 else "#CED9DC")
    d.rounded_rectangle((1180,730,1470,785),radius=8,fill="#005B82")
    d.text((1240,747),"ENVOYER",font=font(17,True),fill="#FFFFFF")
    img.save(p); paths.append(p)
    return paths


def create_stats(path):
    img = Image.new("RGB", (1800, 1000), "#F6F9FA"); d=ImageDraw.Draw(img)
    d.text((70,40),"Instantané statistique de la base",font=font(36,True),fill="#17343E")
    d.text((70,92),"Lecture au 19 août 2026 · données de démonstration · échantillon limité",font=font(19),fill="#58717B")
    cards=[("14","salles actives","#005B82"),("8","équipements","#6A8F18"),("3","demandes","#585F99"),("14 h","réservées","#147B8E"),("18","participants","#BD7622"),("4,0/5","satisfaction (n=1)","#087A62")]
    for i,(value,label,color) in enumerate(cards):
        col=i%3; row=i//3; x=70+col*565; y=160+row*185
        d.rounded_rectangle((x,y,x+510,y+145),radius=18,fill="#FFFFFF",outline="#D7E3E6",width=3)
        d.rounded_rectangle((x,y,x+12,y+145),radius=6,fill=color)
        d.text((x+35,y+25),value,font=font(38,True),fill=color)
        d.text((x+35,y+87),label,font=font(18,True),fill="#45636D")
    d.text((70,570),"État des demandes",font=font(25,True),fill="#17343E")
    statuses=[("Confirmées",2,"#087A62"),("Annulées",1,"#B42318"),("En attente",0,"#D49A00")]
    maxv=3
    y=635
    for label,value,color in statuses:
        d.text((70,y),label,font=font(18,True),fill="#45636D")
        d.rounded_rectangle((290,y,1070,y+38),radius=9,fill="#E4ECEE")
        width=0 if value==0 else int(780*value/maxv)
        if width: d.rounded_rectangle((290,y,290+width,y+38),radius=9,fill=color)
        d.text((1100,y+3),str(value),font=font(21,True),fill=color)
        y+=72
    d.rounded_rectangle((1250,590,1715,875),radius=18,fill="#FFFFFF",outline="#D7E3E6",width=3)
    d.text((1290,625),"Traçabilité",font=font(23,True),fill="#17343E")
    d.text((1290,690),"50",font=font(58,True),fill="#005B82")
    d.text((1290,762),"événements d’audit",font=font(20,True),fill="#58717B")
    d.text((1290,810),"créations · modifications\nvalidations · assignations",font=font(16),fill="#78909A",spacing=6)
    img.save(path)


def set_run_font(run, name="Calibri", size=None, color=None, bold=None, italic=None):
    run.font.name = name
    run._element.get_or_add_rPr().rFonts.set(qn("w:ascii"), name)
    run._element.get_or_add_rPr().rFonts.set(qn("w:hAnsi"), name)
    if size is not None: run.font.size = Pt(size)
    if color is not None: run.font.color.rgb = RGBColor.from_string(color)
    if bold is not None: run.bold = bold
    if italic is not None: run.italic = italic


def set_cell_shading(cell, color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = tcPr.find(qn("w:shd"))
    if shd is None: shd = OxmlElement("w:shd"); tcPr.append(shd)
    shd.set(qn("w:fill"), color)


def set_cell_border(cell, color="D5E1E4", size="6"):
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = tcPr.first_child_found_in("w:tcBorders")
    if tcBorders is None: tcBorders = OxmlElement("w:tcBorders"); tcPr.append(tcBorders)
    for edge in ("top","left","bottom","right","insideH","insideV"):
        tag = "w:"+edge; elem = tcBorders.find(qn(tag))
        if elem is None: elem=OxmlElement(tag); tcBorders.append(elem)
        elem.set(qn("w:val"),"single"); elem.set(qn("w:sz"),size); elem.set(qn("w:color"),color)


def configure_table(table, widths_dxa, header=True, indent=120):
    total = sum(widths_dxa)
    table.autofit = False
    table.alignment = WD_TABLE_ALIGNMENT.LEFT
    tblPr = table._tbl.tblPr
    for tag in ("w:tblW","w:tblInd","w:tblLayout","w:tblCellMar"):
        old=tblPr.find(qn(tag))
        if old is not None: tblPr.remove(old)
    tblW=OxmlElement("w:tblW"); tblW.set(qn("w:w"),str(total)); tblW.set(qn("w:type"),"dxa"); tblPr.append(tblW)
    tblInd=OxmlElement("w:tblInd"); tblInd.set(qn("w:w"),str(indent)); tblInd.set(qn("w:type"),"dxa"); tblPr.append(tblInd)
    layout=OxmlElement("w:tblLayout"); layout.set(qn("w:type"),"fixed"); tblPr.append(layout)
    margins=OxmlElement("w:tblCellMar")
    for edge,val in (("top",80),("start",120),("bottom",80),("end",120)):
        e=OxmlElement("w:"+edge); e.set(qn("w:w"),str(val)); e.set(qn("w:type"),"dxa"); margins.append(e)
    tblPr.append(margins)
    grid=table._tbl.tblGrid
    for child in list(grid): grid.remove(child)
    for width in widths_dxa:
        col=OxmlElement("w:gridCol"); col.set(qn("w:w"),str(width)); grid.append(col)
    for row in table.rows:
        trPr = row._tr.get_or_add_trPr()
        cant_split = OxmlElement("w:cantSplit")
        cant_split.set(qn("w:val"), "true")
        trPr.append(cant_split)
        for idx,cell in enumerate(row.cells):
            tcPr=cell._tc.get_or_add_tcPr(); tcW=tcPr.find(qn("w:tcW"))
            if tcW is None: tcW=OxmlElement("w:tcW"); tcPr.append(tcW)
            tcW.set(qn("w:w"),str(widths_dxa[idx])); tcW.set(qn("w:type"),"dxa")
            cell.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER; set_cell_border(cell)
    if header and table.rows:
        trPr=table.rows[0]._tr.get_or_add_trPr(); repeat=OxmlElement("w:tblHeader"); repeat.set(qn("w:val"),"true"); trPr.append(repeat)
        for cell in table.rows[0].cells: set_cell_shading(cell, LIGHT)


def add_page_number(paragraph):
    paragraph.alignment=WD_ALIGN_PARAGRAPH.RIGHT
    r=paragraph.add_run("Page "); set_run_font(r,size=9,color=MUTED)
    fld=OxmlElement("w:fldSimple"); fld.set(qn("w:instr"),"PAGE"); paragraph._p.append(fld)


def create_numbering(doc, fmt, text, left=720, hanging=360):
    part=doc.part.numbering_part; root=part.element
    abstract_ids=[int(x.get(qn("w:abstractNumId"))) for x in root.findall(qn("w:abstractNum"))]
    num_ids=[int(x.get(qn("w:numId"))) for x in root.findall(qn("w:num"))]
    abstract_id=max(abstract_ids+[0])+1; num_id=max(num_ids+[0])+1
    abstract=OxmlElement("w:abstractNum"); abstract.set(qn("w:abstractNumId"),str(abstract_id))
    multi=OxmlElement("w:multiLevelType"); multi.set(qn("w:val"),"singleLevel"); abstract.append(multi)
    lvl=OxmlElement("w:lvl"); lvl.set(qn("w:ilvl"),"0")
    start=OxmlElement("w:start"); start.set(qn("w:val"),"1"); lvl.append(start)
    numFmt=OxmlElement("w:numFmt"); numFmt.set(qn("w:val"),fmt); lvl.append(numFmt)
    lvlText=OxmlElement("w:lvlText"); lvlText.set(qn("w:val"),text); lvl.append(lvlText)
    pPr=OxmlElement("w:pPr"); ind=OxmlElement("w:ind"); ind.set(qn("w:left"),str(left)); ind.set(qn("w:hanging"),str(hanging)); pPr.append(ind); lvl.append(pPr)
    abstract.append(lvl)
    # Dans numbering.xml, toutes les définitions abstractNum doivent précéder
    # les instances num. Word répare sinon le fichier en fusionnant les listes.
    first_num = root.find(qn("w:num"))
    if first_num is None:
        root.append(abstract)
    else:
        first_num.addprevious(abstract)
    num=OxmlElement("w:num"); num.set(qn("w:numId"),str(num_id)); absid=OxmlElement("w:abstractNumId"); absid.set(qn("w:val"),str(abstract_id)); num.append(absid); root.append(num)
    return num_id


def add_list_item(doc, text, num_id, bold_prefix=None):
    p=doc.add_paragraph(); p.paragraph_format.space_after=Pt(8); p.paragraph_format.line_spacing=1.167
    pPr=p._p.get_or_add_pPr(); numPr=OxmlElement("w:numPr"); ilvl=OxmlElement("w:ilvl"); ilvl.set(qn("w:val"),"0"); num=OxmlElement("w:numId"); num.set(qn("w:val"),str(num_id)); numPr.extend([ilvl,num]); pPr.append(numPr)
    if bold_prefix and text.startswith(bold_prefix):
        r=p.add_run(bold_prefix); set_run_font(r,bold=True)
        r=p.add_run(text[len(bold_prefix):]); set_run_font(r)
    else:
        r=p.add_run(text); set_run_font(r)
    return p


def add_para(doc, text="", bold=False, italic=False, color=BLACK, align=None, keep=False):
    p=doc.add_paragraph(); p.paragraph_format.space_after=Pt(6); p.paragraph_format.line_spacing=1.10
    if align is not None: p.alignment=align
    if keep: p.paragraph_format.keep_with_next=True
    r=p.add_run(text); set_run_font(r,size=11,color=color,bold=bold,italic=italic)
    return p


def add_caption(doc, text):
    p=doc.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_before=Pt(4); p.paragraph_format.space_after=Pt(8); p.paragraph_format.keep_with_next=True
    r=p.add_run(text); set_run_font(r,size=9,color=MUTED,italic=True)


def add_callout(doc, title, text, color=PALE_BLUE, accent=NAVY):
    t=doc.add_table(rows=1,cols=1); configure_table(t,[9360],header=False)
    cell=t.cell(0,0); set_cell_shading(cell,color); set_cell_border(cell,accent,"8")
    p=cell.paragraphs[0]; p.paragraph_format.space_after=Pt(3)
    r=p.add_run(title+". "); set_run_font(r,bold=True,color=accent)
    r=p.add_run(text); set_run_font(r,color=NAVY_DARK)
    doc.add_paragraph().paragraph_format.space_after=Pt(2)


def add_table(doc, headers, rows, widths, font_size=9.5):
    t=doc.add_table(rows=1,cols=len(headers))
    for i,h in enumerate(headers):
        p=t.rows[0].cells[i].paragraphs[0]; p.alignment=WD_ALIGN_PARAGRAPH.CENTER
        r=p.add_run(h); set_run_font(r,size=font_size,color=NAVY_DARK,bold=True)
    for values in rows:
        cells=t.add_row().cells
        for i,value in enumerate(values):
            p=cells[i].paragraphs[0]; p.paragraph_format.space_after=Pt(0); p.paragraph_format.line_spacing=1.08
            if i==0 and len(values)>2: p.alignment=WD_ALIGN_PARAGRAPH.CENTER
            r=p.add_run(str(value)); set_run_font(r,size=font_size,color=NAVY_DARK)
    configure_table(t,widths,header=True)
    doc.add_paragraph().paragraph_format.space_after=Pt(2)
    return t


def keep_heading(paragraph):
    paragraph.paragraph_format.keep_with_next=True
    paragraph.paragraph_format.keep_together=True


def add_heading(doc, text, level=1):
    p=doc.add_paragraph(text, style=f"Heading {level}"); keep_heading(p); return p


def setup_doc():
    doc=Document(); sec=doc.sections[0]
    sec.page_width=Inches(8.5); sec.page_height=Inches(11)
    sec.top_margin=sec.bottom_margin=sec.left_margin=sec.right_margin=Inches(1)
    sec.header_distance=sec.footer_distance=Inches(0.492)
    styles=doc.styles
    normal=styles["Normal"]; normal.font.name="Calibri"; normal.font.size=Pt(11); normal._element.rPr.rFonts.set(qn("w:ascii"),"Calibri"); normal._element.rPr.rFonts.set(qn("w:hAnsi"),"Calibri")
    normal.paragraph_format.space_before=Pt(0); normal.paragraph_format.space_after=Pt(6); normal.paragraph_format.line_spacing=1.10
    for name,size,color,before,after in [("Heading 1",16,BLUE,16,8),("Heading 2",13,BLUE,12,6),("Heading 3",12,BLUE_DARK,8,4)]:
        s=styles[name]; s.font.name="Calibri"; s.font.size=Pt(size); s.font.bold=True; s.font.color.rgb=RGBColor.from_string(color)
        s._element.rPr.rFonts.set(qn("w:ascii"),"Calibri"); s._element.rPr.rFonts.set(qn("w:hAnsi"),"Calibri")
        s.paragraph_format.space_before=Pt(before); s.paragraph_format.space_after=Pt(after); s.paragraph_format.keep_with_next=True
    header=sec.header.paragraphs[0]; header.text="ETI - Gestion des salles | Dossier technique du rapport de stage"; header.alignment=WD_ALIGN_PARAGRAPH.LEFT
    for r in header.runs: set_run_font(r,size=8.5,color=MUTED,bold=True)
    add_page_number(sec.footer.paragraphs[0])
    return doc


def build_document():
    db=ASSETS/"database_model.png"; nav=ASSETS/"navigation_plan.png"; stats=ASSETS/"statistics_snapshot.png"
    create_db_diagram(db); create_nav_diagram(nav); masks=create_masks(); create_stats(stats)
    doc=setup_doc()
    # Numéro 1 : liste à puces native du modèle Word. Les deux suites
    # décimales sont distinctes afin que chaque procédure recommence à 1.
    bullet=1
    decimal=create_numbering(doc,"decimal","%1.")
    db_decimal=create_numbering(doc,"decimal","%1.")

    # Couverture - editorial_cover, surcharge nommée : titre 27 pt bleu institutionnel.
    for _ in range(5): doc.add_paragraph()
    p=doc.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_after=Pt(18)
    r=p.add_run("DOSSIER TECHNIQUE"); set_run_font(r,size=11,color=NAVY,bold=True)
    p=doc.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_after=Pt(8)
    r=p.add_run("Sécurité, évaluation financière\net présentation de l’application"); set_run_font(r,size=27,color=NAVY_DARK,bold=True)
    p=doc.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_after=Pt(28)
    r=p.add_run("Sections 3.2 à 3.4.4 du rapport de stage"); set_run_font(r,size=14,color=MUTED,italic=True)
    t=doc.add_table(rows=3,cols=2)
    rows=[("Projet","Plateforme ETI de gestion des salles de réunion"),("Architecture","Angular 21 · Spring Boot 4.1 · Java 21 · MariaDB/XAMPP"),("État du relevé","19 août 2026")]
    for i,(a,b) in enumerate(rows):
        t.cell(i,0).text=a; t.cell(i,1).text=b
        for rr in t.cell(i,0).paragraphs[0].runs: set_run_font(rr,size=10,bold=True,color=NAVY)
        for rr in t.cell(i,1).paragraphs[0].runs: set_run_font(rr,size=10,color=NAVY_DARK)
    configure_table(t,[2300,7060],header=False)
    doc.add_paragraph()
    add_callout(doc,"Périmètre","Ce document est autonome et destiné à être repris dans le rapport. Il repose sur une lecture du code, des migrations et de la base locale, sans modification de la plateforme.",PALE_GREEN,"648B00")
    doc.add_page_break()

    add_heading(doc,"Note méthodologique",1)
    add_para(doc,"Les constats ci-dessous distinguent trois niveaux : les protections effectivement implémentées, les mécanismes adaptés au développement local, et les renforcements nécessaires avant une mise en production. Cette distinction évite de présenter le prototype comme un système déjà homologué pour un environnement bancaire.")
    add_heading(doc,"Périmètre technique observé",2)
    for item in [
        "Frontend : Angular 21.2.19, TypeScript 5.9.3, formulaires réactifs et routage par rôle.",
        "Backend : Java 21, Spring Boot 4.1, Spring Security, Spring Data JPA/Hibernate, Flyway et API REST.",
        "Données : MariaDB 10.4.32 fournie par XAMPP, schéma eti_rooms, six migrations Flyway et vingt tables techniques (historique Flyway inclus).",
        "Vérification : 19 scénarios d’intégration backend et 5 tests unitaires frontend sont présents ; les builds de production ont été exécutés avec succès.",
    ]: add_list_item(doc,item,bullet)
    add_callout(doc,"Confidentialité du rapport","Aucun mot de passe, secret JWT, jeton d’accès ni donnée sensible complète n’est reproduit dans ce document.","FFF5E8",GOLD)

    add_heading(doc,"3.2. Sécurité de l’application",1)
    add_para(doc,"La sécurité est organisée en couches : authentification, autorisation par rôle, contrôle de propriété des données, validation des entrées, intégrité transactionnelle et traçabilité. Le frontend améliore l’expérience utilisateur, mais la décision d’autoriser ou de refuser une action appartient toujours au backend.")

    add_heading(doc,"3.2.1. Authentification et gestion des mots de passe",2)
    for item in [
        "Les mots de passe ne sont pas stockés en clair : Spring Security applique BCrypt avec un facteur de coût de 12.",
        "Les comptes inactifs ou supprimés logiquement ne peuvent plus être authentifiés.",
        "Les nouveaux mots de passe doivent contenir au minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial, sans espace.",
        "La création, la modification et la suppression d’un utilisateur exigent la ressaisie du mot de passe de l’administrateur ; une suppression exige aussi une confirmation explicite.",
        "Après connexion, un jeton signé HMAC-SHA256 transporte l’identité, les rôles et une date d’expiration. L’API fonctionne sans session serveur (mode stateless).",
    ]: add_list_item(doc,item,bullet)
    add_callout(doc,"Limite actuelle","Le jeton est conservé dans localStorage et sa durée par défaut est de 480 minutes. En production, un stockage par cookie HttpOnly/Secure/SameSite, une durée plus courte, une rotation et une révocation côté serveur réduiraient l’impact d’une attaque XSS.","FFF5E8",GOLD)

    add_heading(doc,"3.2.2. Contrôle des accès et confidentialité",2)
    add_para(doc,"Le modèle RBAC (Role-Based Access Control) comprend quatre profils : USER, ADMIN, FACILITY et IT. Les routes Angular masquent les écrans non autorisés, tandis que les méthodes de l’API sont protégées par des règles @PreAuthorize. Le contrôle backend constitue la barrière de sécurité réelle.")
    access_rows=[
        ("USER","Créer une demande, consulter et annuler ses propres demandes, répondre au feedback à J+1."),
        ("ADMIN","Assigner une salle, définir la priorité, confirmer, administrer salles, équipements et utilisateurs, consulter rapports et audit."),
        ("FACILITY","Consulter et décider les validations physiques ; visualiser les feedbacks autorisés."),
        ("IT","Consulter et décider les validations techniques ; gérer les équipements ; visualiser les feedbacks autorisés."),
    ]
    add_table(doc,["Rôle","Droits principaux"],access_rows,[1700,7660],10)
    for item in [
        "Contrôle de propriété : un demandeur ne peut lire, modifier, annuler ou évaluer que sa propre réservation.",
        "Protection des notifications : un utilisateur ne peut marquer comme lue qu’une notification qui lui appartient.",
        "Protection administrative : impossibilité de supprimer son propre compte ou le dernier administrateur actif.",
        "Réponses API minimisées : le hash du mot de passe n’est jamais renvoyé au frontend.",
    ]: add_list_item(doc,item,bullet)

    add_heading(doc,"3.2.3. Injection SQL et intégrité des données",2)
    add_para(doc,"Les accès aux données passent par Spring Data JPA et Hibernate. Les requêtes déclarées utilisent des paramètres nommés (:email, :id, :role, etc.) au lieu de concaténer les valeurs reçues. Les deux requêtes SQL natives servant au verrouillage utilisent également un paramètre :id. Ce mode d’accès réduit fortement le risque d’injection SQL recommandé par l’OWASP.")
    for item in [
        "Contraintes relationnelles : clés étrangères, unicité des e-mails, codes, références et couples salle/disposition.",
        "Contraintes de domaine : capacité et quantité positives, dates cohérentes, notes bornées et une seule réponse par critère.",
        "Transactions Spring et verrouillage FOR UPDATE pour les opérations concurrentes d’assignation, de modification et de suppression.",
        "Version optimiste sur les salles et les demandes afin de détecter certaines mises à jour concurrentes.",
        "Hibernate est configuré en ddl-auto=validate : le schéma attendu est vérifié, mais n’est pas modifié automatiquement.",
    ]: add_list_item(doc,item,bullet)

    add_heading(doc,"3.2.4. Validation, XSS, CSRF, CORS et téléversement",2)
    add_para(doc,"Les objets reçus par l’API sont validés avec Jakarta Validation : champs obligatoires, formats d’e-mail, longueurs maximales, valeurs numériques et expressions régulières. Des règles métier complètent ces contrôles pour les périodes, horaires, conflits de salles, capacités, équipements, justificatifs et transitions de statut.")
    sec_rows=[
        ("XSS","Angular échappe les interpolations affichées et aucun rendu HTML dynamique non maîtrisé n’a été identifié.","Partiel","Ajouter une Content-Security-Policy stricte et conserver l’interdiction de HTML utilisateur."),
        ("CSRF","Protection Spring désactivée car l’API utilise un jeton Bearer et aucune session cookie.","Adapté au prototype","Réévaluer si le jeton passe dans un cookie ; activer alors une protection CSRF."),
        ("CORS","Origines autorisées configurables ; localhost:4200 par défaut. Méthodes et en-têtes explicitement limités.","Implémenté","Renseigner uniquement les domaines internes autorisés en production."),
        ("Photos","Limite 5 Mo, formats PNG/JPEG/WebP, nom UUID, normalisation du chemin et refus des URL externes.","Partiel","Contrôler la signature binaire, réencoder l’image, analyser par antivirus et protéger l’accès public."),
        ("Erreurs","Réponses structurées ; message technique générique pour les erreurs inattendues.","Implémenté","Centraliser les journaux sans données sensibles et mettre en place des alertes."),
    ]
    add_table(doc,["Sujet","Mécanisme actuel","État","Renforcement"],sec_rows,[1100,3650,1050,3560],8.3)

    add_heading(doc,"3.2.5. Traçabilité, confidentialité et disponibilité",2)
    for item in [
        "Journal d’audit : créations, modifications, assignations, validations, annulations et opérations administratives sont associées à l’acteur et à la date.",
        "Suppression maîtrisée : utilisateurs, salles et équipements peuvent être archivés logiquement pour préserver l’historique et l’intégrité référentielle.",
        "Notifications persistantes : les événements de workflow restent stockés et sont isolés par utilisateur.",
        "Flyway versionne les changements de schéma ; les migrations sont validées au démarrage.",
        "Les conflits de réservation sont recherchés pour chaque occurrence en tenant compte du temps de battement de la salle.",
    ]: add_list_item(doc,item,bullet)
    add_callout(doc,"Données personnelles","La base contient notamment noms, e-mails, demandes, commentaires, feedbacks et traces d’action. Le prototype ne met pas encore en œuvre une politique formelle de durée de conservation, de purge, de chiffrement au repos ou de gestion des droits d’accès aux sauvegardes.","FFF5E8",GOLD)

    add_heading(doc,"3.2.6. Matrice de sécurité et limites",2)
    matrix=[
        ("Injection SQL","JPA/Hibernate + paramètres nommés","Implémenté","Conserver les requêtes paramétrées ; compte DB à privilèges minimaux."),
        ("Mot de passe compromis","BCrypt coût 12 + politique de complexité","Implémenté","Ajouter MFA/SSO d’entreprise, verrouillage et détection d’attaque."),
        ("Accès non autorisé","JWT + RBAC serveur + contrôles de propriété","Implémenté","Réduire la durée du jeton, révocation et rotation des clés."),
        ("Conflit de réservation","Transactions, verrous et contrôle par occurrence","Implémenté","Tests de charge et supervision des échecs concurrents."),
        ("Fuite par upload","Taille/type/UUID/chemin normalisé","Partiel","Signature de fichier, réencodage, antivirus, stockage non exécutable."),
        ("XSS / vol de jeton","Échappement Angular","Partiel","CSP, en-têtes de sécurité et cookie HttpOnly si architecture adaptée."),
        ("Interception réseau","Aucune terminaison TLS dans XAMPP local","Développement","HTTPS obligatoire via proxy inverse en production."),
        ("Attaque par force brute","Message d’erreur non distinctif","À renforcer","Rate limiting, temporisation, verrouillage progressif et journalisation."),
        ("Perte de données","Historique et soft delete","Partiel","Sauvegardes chiffrées, test de restauration et plan de reprise."),
    ]
    add_table(doc,["Risque","Protection observée","État","Mesure cible"],matrix,[1450,3020,1250,3640],8.3)

    add_heading(doc,"3.2.7. Mesures indispensables avant production",2)
    prod_steps=[
        "Remplacer immédiatement le secret JWT de démonstration par une valeur aléatoire forte conservée dans un coffre de secrets ; interdire toute valeur par défaut.",
        "Déployer sous HTTPS via un proxy inverse, activer HSTS et utiliser TLS entre l’application et la base lorsque l’infrastructure le permet.",
        "Créer un compte MariaDB dédié sans droits d’administration, avec mot de passe fort ; ne jamais utiliser root en production.",
        "Désactiver ou restreindre Swagger/OpenAPI et les endpoints techniques ; limiter l’accès réseau à l’intranet ou au VPN.",
        "Mettre en place MFA ou SSO d’entreprise, limitation des tentatives, verrouillage progressif et renouvellement/révocation des jetons.",
        "Ajouter CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy et une stratégie stricte de cookies/jetons.",
        "Analyser les dépendances (SCA), le code (SAST), les secrets et les images téléversées ; corriger les vulnérabilités avant chaque livraison.",
        "Définir sauvegardes chiffrées, rétention, restauration testée, supervision, alertes et procédure de réponse à incident.",
    ]
    for step in prod_steps: add_list_item(doc,step,decimal)

    doc.add_page_break()
    add_heading(doc,"3.3. Évaluation financière de la solution",1)
    add_para(doc,"L’évaluation suivante est indicative. Elle valorise le temps de réalisation et un scénario de mise en production interne ; elle ne constitue ni un devis fournisseur ni un coût réellement engagé par Ecobank. Les technologies utilisées sont majoritairement open source et n’entraînent pas de licence logicielle directe pour le prototype.")
    add_heading(doc,"3.3.1. Hypothèses de coût",2)
    cost_rows=[
        ("Conception, développement, tests, documentation","25 à 40 j × 35 000 FCFA/j","875 000 à 1 400 000","Valorisation du travail, non dépense constatée"),
        ("Durcissement sécurité et préparation production","5 à 10 j × 35 000 FCFA/j","175 000 à 350 000","TLS, secrets, sauvegardes, supervision, SSO/MFA"),
        ("Formation et conduite du changement","2 à 3 j × 35 000 FCFA/j","70 000 à 105 000","Administrateur, Facility, IT et demandeurs"),
        ("Licences Angular/Java/Spring/MariaDB/XAMPP","Open source","0","Sous réserve du respect des licences des composants"),
        ("Total initial indicatif","Développement + durcissement + formation","1 120 000 à 1 855 000","Hors infrastructure déjà disponible"),
    ]
    add_table(doc,["Poste","Hypothèse","Montant FCFA","Observation"],cost_rows,[2500,2200,1700,2960],8.5)

    add_heading(doc,"3.3.2. Coûts récurrents",2)
    recurring=[
        ("Hébergement/VM interne","0 à 50 000 / mois","Dépend de la capacité déjà disponible."),
        ("Sauvegardes et stockage","5 000 à 20 000 / mois","Copies chiffrées et rétention."),
        ("Relais e-mail","0 à 20 000 / mois","Nul si relais interne existant."),
        ("Supervision et certificats","0 à 20 000 / mois","Certificat possible sans licence ; exploitation à prévoir."),
        ("Maintenance corrective/évolutive","40 000 à 160 000 / mois","4 à 8 heures à 10 000-20 000 FCFA/h."),
        ("Total récurrent indicatif","45 000 à 250 000 / mois","Fourchette dépendante de l’infrastructure interne."),
    ]
    add_table(doc,["Poste","Fourchette","Commentaire"],recurring,[2600,2100,4660],9)

    add_heading(doc,"3.3.3. Bénéfices et retour sur investissement",2)
    add_para(doc,"Le bénéfice principal réside dans la réduction du travail manuel, l’évitement des conflits de salles, la traçabilité et la disponibilité immédiate des rapports. Un scénario pédagogique peut être calculé comme suit :")
    benefit=[
        ("Traitement manuel évité","100 demandes/mois × 15 min × 5 000 FCFA/h","125 000 / mois"),
        ("Conflits et reprises évités","2 incidents/mois × 2 h × 3 acteurs × 5 000 FCFA/h","60 000 / mois"),
        ("Production de rapports","8 h/mois × 5 000 FCFA/h","40 000 / mois"),
        ("Bénéfice brut théorique","Somme des trois postes","225 000 / mois"),
    ]
    add_table(doc,["Gain","Hypothèse","Valeur FCFA"],benefit,[2800,4200,2360],9)
    add_callout(doc,"Lecture du résultat","Avec ces hypothèses, le retour sur l’investissement initial se situe approximativement entre 5 et 9 mois, avant prise en compte des coûts récurrents. Le calcul doit être recalibré avec le volume réel de demandes, le coût horaire interne et le nombre d’incidents effectivement évités.",PALE_GREEN,"648B00")
    add_heading(doc,"3.3.4. Conclusion financière",2)
    add_para(doc,"La solution présente un coût de licence faible, mais la mise en production sécurisée représente l’essentiel de l’investissement : infrastructure, durcissement, sauvegardes, supervision et maintenance. La valeur attendue est surtout opérationnelle et qualitative : centralisation, transparence du workflow, réduction des erreurs, meilleure utilisation des salles et disponibilité d’indicateurs fiables.")

    doc.add_page_break()
    add_heading(doc,"3.4. Présentation de l’application",1)
    add_para(doc,"L’application est une plateforme web bilingue destinée à la gestion centralisée des salles ETI. Elle couvre la demande, l’assignation, les validations physiques et techniques, la confirmation, les notifications, le feedback à J+1, l’administration du référentiel et le reporting.")

    add_heading(doc,"3.4.1. Mise en place de la base de données",2)
    add_para(doc,"En développement, la base s’appuie sur MariaDB 10.4.32 via XAMPP. Le backend communique avec elle par JDBC ; Spring Data JPA/Hibernate réalise le mapping objet-relationnel et Flyway applique les évolutions du schéma de manière versionnée.")
    db_steps=[
        "Démarrer le module MySQL de XAMPP sur le port 3306.",
        "Configurer DB_URL, DB_USER et DB_PASSWORD dans les variables d’environnement ; le projet local utilise la base eti_rooms.",
        "Démarrer le backend Spring Boot. Flyway vérifie les six migrations et crée/met à jour le schéma si nécessaire.",
        "Hibernate exécute ensuite une validation de conformité du modèle (ddl-auto=validate).",
        "Contrôler l’état avec l’endpoint de santé et phpMyAdmin, sans modifier manuellement les tables gérées par Flyway.",
    ]
    for step in db_steps: add_list_item(doc,step,db_decimal)
    db_info=[
        ("SGBD local","MariaDB 10.4.32 / XAMPP"),("Base","eti_rooms"),("Accès applicatif","JDBC + MySQL Connector/J"),
        ("ORM","Spring Data JPA / Hibernate"),("Migrations","Flyway : V1 à V6"),("Tables","20, historique Flyway inclus"),
        ("Fuseau horaire","Africa/Lome"),("Stratégie DDL","Validation, pas de génération automatique"),
    ]
    add_table(doc,["Élément","Choix retenu"],db_info,[2400,6960],9.5)
    add_callout(doc,"Important pour la production","Le compte root sans mot de passe et useSSL=false sont propres au poste XAMPP de développement. Ils doivent être remplacés par un compte dédié à privilèges minimaux, une authentification forte et une connexion chiffrée.","FFF5E8",GOLD)

    add_heading(doc,"Modèle logique de données simplifié",2)
    doc.add_picture(str(db),width=Inches(6.45)); doc.paragraphs[-1].alignment=WD_ALIGN_PARAGRAPH.CENTER
    add_caption(doc,"Figure 1 - Relations principales de la base eti_rooms (schéma simplifié).")
    add_para(doc,"Le modèle sépare les identités, le référentiel des ressources, le cycle de réservation et les données de suivi. Les tables d’occurrences permettent de représenter une réservation sur plusieurs journées avec des horaires différents. Les tables d’assignation et de validation conservent l’historique du workflow, tandis que les feedbacks et réponses détaillent la satisfaction post-événement.")

    doc.add_page_break()
    add_heading(doc,"3.4.2. Plan de navigation",2)
    add_para(doc,"Après authentification, l’utilisateur est dirigé vers un espace adapté à son rôle. Les fonctions transversales restent accessibles à tous : planning, salles, feedbacks, notifications, langue FR/EN et tutoriels d’utilisation.")
    doc.add_picture(str(nav),width=Inches(6.45)); doc.paragraphs[-1].alignment=WD_ALIGN_PARAGRAPH.CENTER
    add_caption(doc,"Figure 2 - Organisation de la navigation selon les quatre profils.")
    navigation_rows=[
        ("Demandeur","Accueil → nouvelle demande → mes demandes → feedback J+1","Planning, salles, notifications, tutoriels"),
        ("Administrateur","Tableau de bord → demandes/assignations → confirmation","Salles, équipements, utilisateurs, rapports, audit"),
        ("Facility","Accueil → file Facility → validation/rejet","Planning, salles, feedbacks, notifications"),
        ("IT","Accueil → file IT → validation/rejet","Équipements, planning, feedbacks, notifications"),
    ]
    add_table(doc,["Acteur","Parcours principal","Accès complémentaires"],navigation_rows,[1700,3900,3760],9)

    doc.add_page_break()
    add_heading(doc,"3.4.3. Quelques masques de saisie",2)
    add_para(doc,"Quatre masques significatifs sont retenus afin de présenter le fonctionnement sans surcharger le rapport. Les figures suivantes sont des représentations documentaires fidèles à la structure de l’interface ; elles peuvent être remplacées par des captures finales si nécessaire.")
    mask_texts=[
        ("Figure 3 - Masque de connexion.","Le formulaire recueille l’adresse e-mail professionnelle et le mot de passe. Le champ mot de passe est masqué, les erreurs d’authentification restent génériques et l’utilisateur est redirigé selon son rôle."),
        ("Figure 4 - Création d’une demande de réservation.","Le demandeur renseigne l’objet, les participants, les dates, les horaires, la disposition et les besoins. Pour une période multi-jours, il peut conserver les mêmes horaires ou préciser chaque journée."),
        ("Figure 5 - Vérification et assignation d’une salle.","L’administrateur visualise toutes les salles avec les motifs de compatibilité ou d’incompatibilité. L’assignation n’est possible que si la capacité, la disposition, les équipements, les blocages et les conflits horaires sont satisfaits."),
        ("Figure 6 - Questionnaire de satisfaction à J+1.","Après la dernière occurrence, le demandeur peut noter seulement les critères pertinents parmi 19 thèmes, ajouter une note globale sur 5 et un commentaire. Une réservation ne reçoit qu’un seul feedback."),
    ]
    for idx,(cap,desc) in enumerate(mask_texts):
        # Un masque par page évite qu'une capture soit séparée de sa légende
        # lors du rendu Word/PDF.
        if idx: doc.add_page_break()
        doc.add_picture(str(masks[idx]),width=Inches(6.35)); doc.paragraphs[-1].alignment=WD_ALIGN_PARAGRAPH.CENTER
        add_caption(doc,cap); add_para(doc,desc)

    doc.add_page_break()
    add_heading(doc,"3.4.4. Quelques états et statistiques",2)
    add_para(doc,"L’application met à disposition un tableau de bord et des exports PDF/Excel. Les indicateurs ci-dessous proviennent d’une lecture de la base locale au 19 août 2026. Ils servent à illustrer le fonctionnement ; avec seulement trois demandes et un feedback, ils ne doivent pas être interprétés comme une mesure définitive de performance.")
    doc.add_picture(str(stats),width=Inches(6.45)); doc.paragraphs[-1].alignment=WD_ALIGN_PARAGRAPH.CENTER
    add_caption(doc,"Figure 7 - Instantané des principaux indicateurs de la base de démonstration.")
    stat_rows=[
        ("Ressources disponibles","14 salles actives ; 8 équipements référencés","Mesure la couverture du catalogue et facilite la maintenance du référentiel."),
        ("Activité","3 demandes ; 4 occurrences","Distingue une demande métier des créneaux journaliers qu’elle génère."),
        ("État du workflow","2 confirmées ; 1 annulée ; 0 en attente","Permet de suivre les dossiers à traiter et le résultat du cycle de validation."),
        ("Temps réservé","14,0 heures hors demandes annulées","Quantifie la charge d’occupation et alimente le taux d’utilisation."),
        ("Participants","18 participants cumulés ; moyenne 9 par demande active","Aide à ajuster la capacité des salles et les dispositions."),
        ("Satisfaction","4,0/5 sur 1 feedback","Suit la qualité perçue ; l’échantillon est insuffisant pour conclure."),
        ("Priorité","1 demande prioritaire","Aide l’administrateur à ordonner le traitement des demandes."),
        ("Traçabilité","50 événements dans le journal d’audit","Permet de rechercher qui a réalisé quelle action et à quel moment."),
        ("Salles les plus assignées","Amphi du PAC et Auditorium de l’Académie : 1 chacune","Identifie les salles les plus sollicitées et prépare les décisions de maintenance."),
    ]
    add_table(doc,["Indicateur","Valeur observée","Utilité"],stat_rows,[2050,2450,4860],8.0)
    add_heading(doc,"Indicateurs calculés par le tableau de bord",3)
    for item in [
        "Nombre total de demandes et ventilation par statut.",
        "Heures réservées et nombre cumulé de participants, hors annulations.",
        "Taux d’occupation théorique des 14 salles sur une amplitude de 12 heures par jour.",
        "Demandes en attente, annulées et prioritaires.",
        "Note moyenne issue des feedbacks et classement des huit salles les plus assignées.",
        "Répartition des réservations par bâtiment.",
    ]: add_list_item(doc,item,bullet)

    add_heading(doc,"Conclusion des sections",1)
    add_para(doc,"La plateforme met en œuvre une base de sécurité cohérente pour un prototype fonctionnel : mots de passe BCrypt, authentification par jeton, contrôle d’accès par rôle, requêtes JPA paramétrées, validations, transactions, contraintes SQL et audit. Elle centralise l’ensemble du processus de réservation et produit des indicateurs utiles. Une mise en production en contexte bancaire nécessite cependant un durcissement complémentaire, en particulier HTTPS, coffre de secrets, compte base de données dédié, SSO/MFA, limitation des tentatives, supervision, sauvegardes testées et politique de confidentialité.")

    add_heading(doc,"Références techniques",1)
    refs=[
        "Code interne du projet : SecurityConfig, TokenService, ApiDtos, ReservationService, RoomPhotoStorage, Repositories et ReportingService.",
        "Migrations Flyway : V1__initial_schema.sql à V6__feedback_overall_rating.sql.",
        "Configuration : application.yml, pom.xml, package.json et routes Angular.",
        "OWASP Cheat Sheet Series, « SQL Injection Prevention Cheat Sheet », cheatsheetseries.owasp.org, consulté le 19 août 2026.",
        "OWASP Cheat Sheet Series, « Password Storage Cheat Sheet », cheatsheetseries.owasp.org, consulté le 19 août 2026.",
        "OWASP Cheat Sheet Series, « JSON Web Token for Java Cheat Sheet », cheatsheetseries.owasp.org, consulté le 19 août 2026.",
        "OWASP Cheat Sheet Series, « Cross Site Scripting Prevention Cheat Sheet », cheatsheetseries.owasp.org, consulté le 19 août 2026.",
    ]
    for ref in refs: add_list_item(doc,ref,bullet)

    # Propriétés et sauvegarde.
    doc.core_properties.title="Sections 3.2 à 3.4.4 - Rapport de stage ETI"
    doc.core_properties.subject="Sécurité, évaluation financière et présentation de la plateforme de gestion des salles"
    doc.core_properties.author="Rapport de stage - Projet ETI"
    doc.core_properties.keywords="ETI, sécurité, Spring Boot, Angular, MariaDB, rapport de stage"
    doc.save(OUT)
    return OUT


if __name__ == "__main__":
    print(build_document())
