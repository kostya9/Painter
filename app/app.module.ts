import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {PainterComponent} from './painter.component';
import {ColorService} from './color.service';

@NgModule({
    imports: [BrowserModule, FormsModule,
    RouterModule.forRoot([
        {
            path: '',
            component: PainterComponent
        },
        {
            path: ':codeTemplate',
            component: PainterComponent
        }
    ])],
    declarations: [AppComponent, PainterComponent],
    bootstrap: [AppComponent],
    providers: [ColorService]
})

export class AppModule { }