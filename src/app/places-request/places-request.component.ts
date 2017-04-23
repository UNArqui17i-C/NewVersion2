import { Component, OnInit } from '@angular/core';
import {RequestService} from "../request.service";
import {Router} from "@angular/router";
import {Placess} from "./placess";
import { Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-places-request',
  templateUrl: './places-request.component.html',
  styleUrls: ['./places-request.component.scss']
})
export class PlacesRequestComponent implements OnInit {

    constructor( private requestService: RequestService, private router: Router) {
        this.requestService;
    }

    placess: Placess[ ];



    addPlace(){

        alert("entrando al metodo create");
        this.requestService.createPlaces(
            'http://localhost:5000/places',
            {
                "email": "paula@gmail.com",
                "latitude": "892,31",
                "length": "-23,423"
            },
            new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) })
        )
            .subscribe(
                Plhaces=>{
                    alert("archivo creado");
                },
                err => { console.log(err);}
            )
    }


    printInConsole(){

        //Cross-allow-o
        this.requestService.getPlaces(
            'http://localhost:5000/places/2'
        )
            .subscribe(
                placess=>{
                    this.placess = placess;

                    console.log('imprimiendo places=' + JSON.stringify(this.placess ));
                    console.log('imprimiendo places=' + this.placess );

                },
                err => { console.log(err);}
            )

    }

    ngOnInit() {
        //this.printInConsole();
        this.addPlace();
    }

}
