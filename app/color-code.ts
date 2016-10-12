import {ColorService} from './color.service';

export class ColorCode {
    constructor(fieldSize: number, private colorService: ColorService) {
        this.fieldSize = fieldSize;
        this.codesArray = new Array(this.fieldSize * this.fieldSize);
        for(let i = 0; i < this.fieldSize * this.fieldSize; i++)
        {
            this.codesArray[i] = '0';
        }
    }
    
    private codesArray: string[];
    private codingBase = 16;
    private fieldSize: number;

    getCode() {
        return this.codesArray.join("");
    }

    changeCodeAt(color: string, index: number) {
        this.codesArray[index] = this.getCodeByColor(color);
    }

    getColoredField() : string[] {
        var field = new Array(this.fieldSize * this.fieldSize);
        for(let i = 0; i < field.length; i++) {
            field[i] = this.getColorByCode(this.codesArray[i]);
        }
        return field;
    }

    getColorByCode(code: string) : string {
        let index = parseInt(code, this.codingBase);
        return this.colorService.getColor(index);
    }

    getCodeByColor(color: string) : string {
        let i = this.colorService.getColors().findIndex(c => c == color);

        return i.toString(this.codingBase);
    }

    setCode(code: string) {
        let codeLength = this.fieldSize * this.fieldSize;

        for(let i = 0; i < codeLength; i++) {
            this.codesArray[i] = code.at(i);
        }
    }

    setField(field: string[]) {
        let fieldLength = this.fieldSize * this.fieldSize;

        for(let i = 0; i < fieldLength; i++) {
            this.codesArray[i] = this.getCodeByColor(field[i]);
        }
    }
}