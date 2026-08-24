import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './auth.service';
import { AuditItem, Compatibility, Dashboard, Equipment, FeedbackDetail, FeedbackReservation, FeedbackStatus, Notification, Reservation, Room, User } from './models';

@Injectable({providedIn:'root'})
export class ApiService {
  private http=inject(HttpClient);
  rooms(){ return this.http.get<Room[]>(`${API}/rooms`); }
  equipment(){ return this.http.get<Equipment[]>(`${API}/equipment`); }
  createRequest(data:unknown){ return this.http.post<Reservation>(`${API}/requests`,data); }
  request(id:number){ return this.http.get<Reservation>(`${API}/requests/${id}`); }
  updateRequest(id:number,data:unknown){ return this.http.put<Reservation>(`${API}/requests/${id}`,data); }
  mine(){ return this.http.get<Reservation[]>(`${API}/requests/mine`); }
  allRequests(){ return this.http.get<Reservation[]>(`${API}/requests`); }
  facilityQueue(){ return this.http.get<Reservation[]>(`${API}/facility/requests`); }
  itQueue(){ return this.http.get<Reservation[]>(`${API}/it/requests`); }
  compatibility(id:number){ return this.http.get<Compatibility[]>(`${API}/admin/requests/${id}/compatibility`); }
  setPriority(id:number,priority:'NORMAL'|'PRIORITY'){ return this.http.patch<Reservation>(`${API}/admin/requests/${id}/priority`,{priority}); }
  assign(id:number,roomId:number,justification=''){ return this.http.post<Reservation>(`${API}/admin/requests/${id}/assign`,{roomId,justification}); }
  decision(scope:'facility'|'it',id:number,approved:boolean,justification:string){ return this.http.post<Reservation>(`${API}/${scope}/requests/${id}/decision`,{approved,justification}); }
  confirm(id:number){ return this.http.post<Reservation>(`${API}/admin/requests/${id}/confirm`,{}); }
  cancel(id:number,reason:string){ return this.http.post<Reservation>(`${API}/requests/${id}/cancel`,{reason}); }
  feedbackStatus(id:number){ return this.http.get<FeedbackStatus>(`${API}/requests/${id}/feedback-status`); }
  submitFeedback(id:number,data:unknown){ return this.http.post<void>(`${API}/requests/${id}/feedback`,data); }
  myFeedbacks(){ return this.http.get<FeedbackReservation[]>(`${API}/feedbacks/mine`); }
  feedbackResults(){ return this.http.get<FeedbackDetail[]>(`${API}/feedbacks`); }
  notifications(){ return this.http.get<Notification[]>(`${API}/notifications`); }
  unreadNotificationCount(){ return this.http.get<{unread:number}>(`${API}/notifications/unread-count`); }
  readAllNotifications(){ return this.http.patch<void>(`${API}/notifications/read-all`,{}); }
  readNotification(id:number){ return this.http.patch<void>(`${API}/notifications/${id}/read`,{}); }
  dashboard(){ return this.http.get<Dashboard>(`${API}/admin/dashboard`); }
  users(){ return this.http.get<User[]>(`${API}/admin/users`); }
  audit(){ return this.http.get<AuditItem[]>(`${API}/admin/audit`); }
  updateUser(id:number,data:unknown){ return this.http.put<User>(`${API}/admin/users/${id}`,data); }
  createUser(data:unknown){ return this.http.post<User>(`${API}/admin/users`,data); }
  deleteUser(id:number,adminPassword:string){ return this.http.delete<{archived:boolean;message:string}>(`${API}/admin/users/${id}`,{body:{adminPassword,confirmed:true}}); }
  updateEquipment(id:number,data:unknown){ return this.http.put<Equipment>(`${API}/it/equipment/${id}`,data); }
  createEquipment(data:unknown){ return this.http.post<Equipment>(`${API}/admin/equipment`,data); }
  deleteEquipment(id:number){ return this.http.delete<{message:string}>(`${API}/admin/equipment/${id}`); }
  updateRoom(id:number,data:unknown){ return this.http.put<Room>(`${API}/admin/rooms/${id}`,data); }
  createRoom(data:unknown){ return this.http.post<Room>(`${API}/admin/rooms`,data); }
  deleteRoom(id:number,justification:string){ return this.http.delete<{message:string}>(`${API}/admin/rooms/${id}`,{body:{justification}}); }
  uploadRoomPhoto(id:number,file:File){ const data=new FormData();data.append('file',file);return this.http.post<Room>(`${API}/admin/rooms/${id}/photo`,data); }
  deleteRoomPhoto(id:number){ return this.http.delete<Room>(`${API}/admin/rooms/${id}/photo`); }
  exportPdf(){ return this.http.get(`${API}/admin/reports/reservations.pdf`,{responseType:'blob'}); }
  exportExcel(){ return this.http.get(`${API}/admin/reports/reservations.xlsx`,{responseType:'blob'}); }
}
