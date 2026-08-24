export type Role = 'USER'|'ADMIN'|'FACILITY'|'IT';
export interface User { id:number; email:string; fullName:string; role:Role; language:string; active:boolean }
export interface Capacity { layout:string; capacity:number }
export interface Equipment { id:number; code:string; name:string; type:string; totalQuantity:number; availableQuantity:number; status:string }
export interface Room { id:number; code:string; name:string; building:string; location:string; bufferMinutes:number; status:string; active:boolean; photoUrl:string; capacities:Capacity[]; equipment:Equipment[] }
export interface Occurrence { id:number; date:string; startTime:string; endTime:string }
export interface Reservation { id:number; reference:string; requesterName:string; requesterEmail:string; subject:string; description:string; participantCount:number; startDate:string; endDate:string; startTime:string; endTime:string; layout:string; physicalNeeds:string; technicalNeeds:string; observations:string; priority:string; status:string; assignedRoom:Room|null; facilityValidated:boolean|null; itValidated:boolean|null; facilityNote:string; itNote:string; cancelReason:string; createdAt:string; occurrences:Occurrence[] }
export interface Compatibility { roomId:number; roomName:string; compatible:boolean; reasons:string[] }
export interface Notification { id:number; title:string; message:string; eventType:string; read:boolean; createdAt:string }
export interface FeedbackStatus { eligible:boolean; submitted:boolean; availableFrom:string }
export interface FeedbackReservation { requestId:number; reference:string; subject:string; roomName:string|null; eventDate:string; availableFrom:string; eligible:boolean; submitted:boolean; average:number|null; submittedAt:string|null }
export interface FeedbackAnswer { criterion:string; rating:number }
export interface FeedbackDetail { id:number; requestId:number; reference:string; subject:string; roomName:string|null; respondentName:string; eventDate:string; answers:FeedbackAnswer[]; comment:string|null; language:string; createdAt:string; average:number }
export interface Dashboard { totalMeetings:number; reservedHours:number; totalParticipants:number; occupancyRate:number; pendingRequests:number; cancellations:number; priorityRequests:number; satisfactionAverage:number; byStatus:Record<string,number>; byBuilding:Record<string,number>; byRoom:Record<string,number> }
export interface AuditItem { id:number; actorEmail:string; actionType:string; entityType:string; entityId:string; details:string; createdAt:string }
