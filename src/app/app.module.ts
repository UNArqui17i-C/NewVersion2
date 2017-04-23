import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RequestService} from "./request.service";
import { PlacesRequestComponent } from './places-request/places-request.component';


@NgModule({
    declarations: [
        AppComponent,
        PlacesRequestComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [RequestService],
    bootstrap: [AppComponent]
})
export class AppModule { }
