import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    const storage: Storage = {
      get length(){return values.size},
      clear: () => values.clear(),
      getItem: key => values.get(key) ?? null,
      key: index => [...values.keys()][index] ?? null,
      removeItem: key => { values.delete(key); },
      setItem: (key, value) => { values.set(key, String(value)); }
    };
    Object.defineProperty(globalThis, 'localStorage', {configurable:true, value:storage});
    TestBed.resetTestingModule();
  });

  it('switches the whole UI language and persists the choice', () => {
    const service = TestBed.inject(LanguageService);

    expect(service.text('Tableau de bord', 'Dashboard')).toBe('Tableau de bord');
    service.set('en');

    expect(service.current()).toBe('en');
    expect(service.text('Tableau de bord', 'Dashboard')).toBe('Dashboard');
    expect(localStorage.getItem('eti_ui_language')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('uses the account language when no explicit preference exists', () => {
    localStorage.setItem('eti_user', JSON.stringify({language: 'en'}));
    const service = TestBed.inject(LanguageService);
    expect(service.current()).toBe('en');
  });

  it('translates API errors and compatibility reasons in English mode', () => {
    const service = TestBed.inject(LanguageService);
    service.set('en');

    expect(service.server('Identifiants invalides')).toBe('Invalid credentials');
    expect(service.server('Seule une demande au statut Soumise peut être modifiée')).toBe('Only a request with Submitted status can be edited');
    expect(service.server('capacité insuffisante (12 places)')).toBe('insufficient capacity (12 seats)');
    expect(service.server('Salle incompatible : salle bloquée')).toBe('Incompatible room: blocked room');
  });
});
