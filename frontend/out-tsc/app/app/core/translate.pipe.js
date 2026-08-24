import { Pipe, inject } from '@angular/core';
import { LanguageService } from './language.service';
import * as i0 from "@angular/core";
export class TranslatePipe {
    language = inject(LanguageService);
    transform(french, english) {
        return this.language.text(french, english);
    }
    static ɵfac = function TranslatePipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TranslatePipe)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "tr", type: TranslatePipe, pure: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TranslatePipe, [{
        type: Pipe,
        args: [{ name: 'tr', standalone: true, pure: false }]
    }], null, null); })();
//# sourceMappingURL=translate.pipe.js.map