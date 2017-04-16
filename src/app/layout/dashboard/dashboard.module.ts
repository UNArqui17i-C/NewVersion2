import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FormsModule }   from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
    TimelineComponent,
    NotificationComponent
} from './components';
import { StatModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        DashboardRoutingModule,
        AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDRsI0ZuWrj5Hr0KaRLc3pwwZibEP6w7T0'
        }),
        StatModule,
        FormsModule

    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
    ]
})
export class DashboardModule { }
