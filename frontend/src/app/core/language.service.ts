import { Injectable, signal } from '@angular/core';

export type UiLanguage = 'fr' | 'en';

@Injectable({providedIn: 'root'})
export class LanguageService {
  private readonly languageState = signal<UiLanguage>(this.readInitialLanguage());
  readonly current = this.languageState.asReadonly();

  constructor() {
    this.applyDocumentLanguage(this.languageState());
  }

  set(language: UiLanguage) {
    if (this.languageState() === language) return;
    this.languageState.set(language);
    this.storage()?.setItem('eti_ui_language', language);
    this.applyDocumentLanguage(language);
  }

  text(french: string, english: string) {
    return this.languageState() === 'fr' ? french : english;
  }

  server(message: string | null | undefined): string {
    if (!message || this.languageState() === 'fr') return message ?? '';
    const exact: Record<string, string> = {
      'Accès refusé': 'Access denied',
      'Ressource introuvable': 'Resource not found',
      'Opération impossible': 'Operation failed',
      'État incompatible avec cette action': 'This action is not allowed in the current state',
      'Identifiants invalides': 'Invalid credentials',
      'Demande introuvable': 'Request not found',
      'Salle introuvable': 'Room not found',
      'Bâtiment introuvable': 'Building not found',
      'Équipement introuvable': 'Equipment not found',
      'Utilisateur introuvable': 'User not found',
      'Notification introuvable': 'Notification not found',
      'Cette demande ne vous appartient pas': 'This request does not belong to you',
      'La demande est déjà annulée': 'The request has already been cancelled',
      "L'événement est déjà terminé": 'The event has already ended',
      "La demande n'est pas assignable dans son état actuel": 'The request cannot be assigned in its current state',
      'Une justification est obligatoire en cas de rejet': 'A reason is required when rejecting a request',
      "Cette demande n'attend pas Facility": 'This request is not awaiting Facility approval',
      "Cette demande n'attend pas IT": 'This request is not awaiting IT approval',
      'Les validations Facility et IT sont obligatoires avant confirmation': 'Facility and IT approvals are required before confirmation',
      "Aucune salle n'est assignée": 'No room has been assigned',
      "Le feedback est disponible après la fin de l'événement": 'Feedback is available after the event ends',
      "Le feedback est disponible le lendemain de l'événement": 'Feedback is available the day after the event',
      'Veuillez répondre aux 19 critères du questionnaire': 'Please answer all 19 questionnaire criteria',
      'Chaque réponse doit être Very good, Good ou Poor': 'Each answer must be Very good, Good or Poor',
      'Un feedback a déjà été enregistré': 'Feedback has already been submitted',
      'La date de fin doit suivre la date de début': 'The end date must be after the start date',
      "L'heure de fin doit suivre l'heure de début": 'The end time must be after the start time',
      'La période ne peut pas dépasser 12 mois': 'The period cannot exceed 12 months',
      'Aucune occurrence ne correspond aux jours sélectionnés': 'No occurrence matches the selected days',
      'Aucune occurrence future à modifier': 'There is no future occurrence to edit',
      'La demande a expiré et aucune action n’est plus possible': 'The request has expired and no further action is possible',
      'Seule une demande au statut Soumise peut être modifiée': 'Only a request with Submitted status can be edited',
      'La modification est bloquée à H-1 ou moins': 'Changes are locked one hour before the event',
      'Cette adresse e-mail est déjà utilisée': 'This email address is already in use',
      'Vous ne pouvez pas supprimer votre propre compte': 'You cannot delete your own account',
      'Vous ne pouvez pas désactiver ou retirer votre propre rôle administrateur': 'You cannot deactivate or remove your own administrator role',
      'Le dernier administrateur actif ne peut pas être supprimé ou rétrogradé': 'The last active administrator cannot be deleted or downgraded',
      'La quantité disponible dépasse le stock total': 'The available quantity exceeds total stock',
      'Ce code de salle existe déjà': 'This room code already exists',
      'Ce code d’équipement existe déjà': 'This equipment code already exists',
      'Le Wi-Fi et la climatisation sont obligatoires et ne peuvent pas être supprimés': 'Wi-Fi and air conditioning are required and cannot be deleted',
      'La salle a été supprimée du catalogue.': 'The room was removed from the catalogue.',
      'L’équipement a été supprimé.': 'The equipment was deleted.',
      'Sélectionnez une photo': 'Select a photo',
      'La photo ne doit pas dépasser 5 Mo': 'The photo must not exceed 5 MB',
      'Format non accepté : utilisez PNG, JPEG ou WebP': 'Unsupported format: use PNG, JPEG or WebP',
      'Adresse de photo non autorisée': 'Unauthorized photo address',
      'Impossible d’enregistrer la photo': 'Unable to save the photo',
      'Impossible de supprimer la photo': 'Unable to delete the photo',
      'Un équipement mobile ne peut pas être rattaché définitivement à une salle': 'Mobile equipment cannot be permanently assigned to a room',
      'Votre profil ne permet pas de créer une demande prioritaire': 'Your profile cannot create a priority request'
    };
    if (exact[message]) return exact[message];
    if (message.startsWith('Salle incompatible : ')) {
      return 'Incompatible room: ' + message.slice('Salle incompatible : '.length).split(', ').map(reason => this.server(reason)).join(', ');
    }
    return message
      .replace(/^Équipement introuvable : /, 'Equipment not found: ')
      .replace(/^salle inactive$/, 'inactive room')
      .replace(/^salle bloquée pour maintenance$/, 'room blocked for maintenance')
      .replace(/^salle bloquée$/, 'blocked room')
      .replace(/^disposition non prise en charge$/, 'unsupported layout')
      .replace(/^capacité insuffisante \((\d+) places\)$/, 'insufficient capacity ($1 seats)')
      .replace(/^équipement inconnu : /, 'unknown equipment: ')
      .replace(/^équipement indisponible : /, 'unavailable equipment: ')
      .replace(/^équipement fixe manquant : /, 'missing fixed equipment: ')
      .replace(/^équipement mobile indisponible : /, 'unavailable mobile equipment: ')
      .replace(/^salle indisponible le (.+) \(blocage\)$/, 'room unavailable on $1 (blocked)')
      .replace(/^conflit avec une réservation existante le /, 'conflict with an existing booking on ')
      .replace(/^temps de battement insuffisant le /, 'insufficient turnaround time on ');
  }

  private readInitialLanguage(): UiLanguage {
    const storage = this.storage();
    const saved = storage?.getItem('eti_ui_language');
    if (saved === 'fr' || saved === 'en') return saved;

    try {
      const account = JSON.parse(storage?.getItem('eti_user') ?? 'null') as {language?: string} | null;
      if (account?.language === 'en') return 'en';
    } catch {
      // Une préférence illisible ne doit pas empêcher l'application de démarrer.
    }
    return 'fr';
  }

  private applyDocumentLanguage(language: UiLanguage) {
    if (typeof document !== 'undefined') document.documentElement.lang = language;
  }

  private storage(): Storage | null {
    try {
      return typeof localStorage === 'undefined' ? null : localStorage;
    } catch {
      return null;
    }
  }
}
