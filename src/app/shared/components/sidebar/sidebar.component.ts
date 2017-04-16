import { Component } from '@angular/core';
import {RequestService} from "../../../request.service";
import { Headers, RequestOptions } from '@angular/http';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive = false;
    showMenu = '';


    constructor( private requestService: RequestService) {
        this.requestService;
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    logout(){

        this.requestService.logoutSession(
            'http://localhost:3000/logout',
            {
                "email": localStorage.getItem("email")
            },
            new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) })
        )
            .subscribe(
                logoutS=>{
                },
                err => { console.log(err);}
            )

        localStorage.clear();

    }




    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
