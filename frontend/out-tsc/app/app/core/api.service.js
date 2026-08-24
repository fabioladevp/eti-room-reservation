import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './auth.service';
import * as i0 from "@angular/core";
export class ApiService {
    http = inject(HttpClient);
    rooms() { return this.http.get(`${API}/rooms`); }
    equipment() { return this.http.get(`${API}/equipment`); }
    createRequest(data) { return this.http.post(`${API}/requests`, data); }
    mine() { return this.http.get(`${API}/requests/mine`); }
    allRequests() { return this.http.get(`${API}/requests`); }
    facilityQueue() { return this.http.get(`${API}/facility/requests`); }
    itQueue() { return this.http.get(`${API}/it/requests`); }
    compatibility(id) { return this.http.get(`${API}/admin/requests/${id}/compatibility`); }
    assign(id, roomId, justification = '') { return this.http.post(`${API}/admin/requests/${id}/assign`, { roomId, justification }); }
    decision(scope, id, approved, justification) { return this.http.post(`${API}/${scope}/requests/${id}/decision`, { approved, justification }); }
    confirm(id) { return this.http.post(`${API}/admin/requests/${id}/confirm`, {}); }
    cancel(id, reason) { return this.http.post(`${API}/requests/${id}/cancel`, { reason }); }
    notifications() { return this.http.get(`${API}/notifications`); }
    readNotification(id) { return this.http.patch(`${API}/notifications/${id}/read`, {}); }
    dashboard() { return this.http.get(`${API}/admin/dashboard`); }
    users() { return this.http.get(`${API}/admin/users`); }
    audit() { return this.http.get(`${API}/admin/audit`); }
    updateUser(id, data) { return this.http.put(`${API}/admin/users/${id}`, data); }
    createUser(data) { return this.http.post(`${API}/admin/users`, data); }
    deleteUser(id) { return this.http.delete(`${API}/admin/users/${id}`); }
    updateEquipment(id, data) { return this.http.put(`${API}/it/equipment/${id}`, data); }
    createEquipment(data) { return this.http.post(`${API}/admin/equipment`, data); }
    deleteEquipment(id) { return this.http.delete(`${API}/admin/equipment/${id}`); }
    updateRoom(id, data) { return this.http.put(`${API}/admin/rooms/${id}`, data); }
    createRoom(data) { return this.http.post(`${API}/admin/rooms`, data); }
    deleteRoom(id, justification) { return this.http.delete(`${API}/admin/rooms/${id}`, { body: { justification } }); }
    uploadRoomPhoto(id, file) { const data = new FormData(); data.append('file', file); return this.http.post(`${API}/admin/rooms/${id}/photo`, data); }
    deleteRoomPhoto(id) { return this.http.delete(`${API}/admin/rooms/${id}/photo`); }
    exportPdf() { return this.http.get(`${API}/admin/reports/reservations.pdf`, { responseType: 'blob' }); }
    exportExcel() { return this.http.get(`${API}/admin/reports/reservations.xlsx`, { responseType: 'blob' }); }
    static ɵfac = function ApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=api.service.js.map