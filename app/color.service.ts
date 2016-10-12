import {Injectable} from '@angular/core';

import {SORTEDCOLORS} from './colors';

@Injectable()
export class ColorService {
    getColors(): string[] {
        return SORTEDCOLORS;
    }

    getColor(i: number): string {
        return this.getColors()[i];
    }
}