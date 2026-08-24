import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from './language.service';

@Pipe({name: 'tr', standalone: true, pure: false})
export class TranslatePipe implements PipeTransform {
  private readonly language = inject(LanguageService);

  transform(french: string, english: string): string {
    return this.language.text(french, english);
  }
}
