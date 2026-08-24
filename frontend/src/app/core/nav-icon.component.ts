import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-icon',
  standalone: true,
  host: { class: 'nav-icon', 'aria-hidden': 'true' },
  template: `
    @switch (name) {
      @case ('dashboard') { <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="8"/><rect x="14" y="3" width="7" height="5"/><rect x="3" y="15" width="7" height="6"/><rect x="14" y="12" width="7" height="9"/></svg> }
      @case ('home') { <svg viewBox="0 0 24 24"><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></svg> }
      @case ('calendar') { <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4m8-4v4M3 10h18M7 14h2m3 0h2m3 0h1M7 17h2m3 0h2"/></svg> }
      @case ('document') { <svg viewBox="0 0 24 24"><path d="M6 2h9l4 4v16H6z"/><path d="M14 2v5h5M9 12h7m-7 4h7"/></svg> }
      @case ('plus') { <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v8m-4-4h8"/></svg> }
      @case ('rooms') { <svg viewBox="0 0 24 24"><path d="M4 3h16v18H4zM8 3v18m8-18v18M4 9h16m-16 6h16"/><circle cx="13" cy="12" r=".7"/></svg> }
      @case ('tasks') { <svg viewBox="0 0 24 24"><path d="M9 6h11M9 12h11M9 18h11"/><path d="m3 6 1.5 1.5L7 4m-4 8 1.5 1.5L7 10m-4 8 1.5 1.5L7 16"/></svg> }
      @case ('check') { <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m7.5 12 3 3 6-7"/></svg> }
      @case ('it') { <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4M7 9h3m-3 3h5"/></svg> }
      @case ('equipment') { <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4M7 8h10M7 12h6"/></svg> }
      @case ('users') { <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2m1-11h5m-2.5-2.5v5"/></svg> }
      @case ('reports') { <svg viewBox="0 0 24 24"><path d="M4 21V10m6 11V4m6 17v-7m6 7H2"/></svg> }
      @case ('audit') { <svg viewBox="0 0 24 24"><path d="M12 3 4 6v6c0 5 3 8 8 9 5-1 8-4 8-9V6z"/><path d="m8 12 2.5 2.5L16 9"/></svg> }
      @case ('bell') { <svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-11 12h4"/></svg> }
      @case ('feedback') { <svg viewBox="0 0 24 24"><path d="M4 4h16v13H9l-5 4z"/><path d="m8 10 2.5 2.5L16 7"/></svg> }
      @case ('tutorial') { <svg viewBox="0 0 24 24"><path d="M4 4.5A3.5 3.5 0 0 1 7.5 1H20v18H7.5A3.5 3.5 0 0 0 4 22.5z"/><path d="M4 4.5v18M9 6h7m-7 4h7m-7 4h4"/></svg> }
    }
  `
})
export class NavIconComponent { @Input({required:true}) name = ''; }
