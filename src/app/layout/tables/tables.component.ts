import
{ Component, OnInit } from '@angular/core';
import {Places} from "./places";
import {RequestService} from "../../request.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
    constructor(private requestService: RequestService, private router: Router) {
        this.requestService;
    }

    places: Places[];
    rightPlaces: Places[] = new Array();


    showPlaces(){
        this.requestService.getPlaces(
            'http://localhost:5000/places'
        )
            .subscribe(
                places=>{
                    this.places = places;

                    // console.log('imprimiendo places=' + JSON.stringify(this.placesMapi ));

                    for (let entry of this.places) {

                        if(entry.email==localStorage.getItem("email") ){
                            var newPlace:Places = new Places(
                                localStorage.getItem("email"),
                                entry["latitude"],
                                entry["length"]
                            )
                            //console.log(  newPlace);
                            this.rightPlaces.push(newPlace);
                        }

                    }

                },
                err => { console.log(err);}
            )
    }


    ngOnInit() {
        this.showPlaces();
    }
}
