import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';

import {ColorService} from './color.service';
import {ColorCode} from './color-code';

@Component({
    moduleId: module.id,
    selector: 'my-painter',
    templateUrl: 'painter.component.html',
    styleUrls: ['painter.component.css']
})

export class PainterComponent implements OnInit {
    fieldSize: number;
    colorTemplate: string[];
    codeTemplate: string;
    currentColor : string;
    defualtColor: string;
    isActive: boolean;
    colorCode : ColorCode;

    constructor(private colorService: ColorService, 
    private route: ActivatedRoute,
    private location: Location){
                this.isActive = false;
        this.fieldSize = 16;
        this.colorTemplate = new Array(this.fieldSize * this.fieldSize);
        this.defualtColor = "lightgray";
        this.colorCode = new ColorCode(this.fieldSize, this.colorService);
        this.currentColor = this.defualtColor;
        this.clearField();
        
    }

    ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
        let codeTemplate = params['codeTemplate'];
        if(codeTemplate == null)
        return;
        this.codeTemplate = codeTemplate;
        this.parseCode();
    });
    }

    getColor(i: number): string {
        return this.colorService.getColor(i);
    }

    getColors() : string[] {
        return this.colorService.getColors();
    }



    setColorByColumnRow(column: number, row: number) : void {
        let index = row * this.fieldSize + column;
        this.colorTemplate[index] = this.currentColor;
        this.colorCode.changeCodeAt(this.currentColor, index);
        this.codeTemplate = this.colorCode.getCode();
    }

    setColorByColumnRowIfActive(column: number, row: number) : void {
        if(this.isActive)
        {
            this.setColorByColumnRow(column, row);
        }
    }

    onClick(color: string) {
        this.currentColor = color;
    }

    getArrayBySize(size: number): number[] {
        let arr = new Array(size);
        for(let i = 0; i < this.fieldSize; i++){
            arr[i] = i;
        }
        return arr;
    }

    clearField() : void {
        for(let i = 0; i < this.fieldSize * this.fieldSize; i++){
            this.colorTemplate[i] = this.defualtColor;
        }
        this.changeCode();
    }

    changeCode() {
        this.colorCode.setField(this.colorTemplate);
        this.codeTemplate = this.colorCode.getCode();
    }

    parseCode(): void {
        this.colorCode.setCode(this.codeTemplate);
        this.colorTemplate = this.colorCode.getColoredField();
    }

    setActive(active: boolean): void {
        this.isActive = active;
    }
 }