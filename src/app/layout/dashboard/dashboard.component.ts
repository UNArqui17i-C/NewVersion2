import { Component, OnInit, NgModule } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import {SebmGoogleMap} from 'angular2-google-maps/core';
import { SebmGoogleMapMarker } from 'angular2-google-maps/core';

import {
  BrowserModule
} from '@angular/platform-browser';

import {
  AgmCoreModule
} from 'angular2-google-maps/core';
import {RequestService} from "../../request.service";
import {Router} from "@angular/router";
import {PlacesMapi} from "./placesMapi";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    lat: number = 4.6381991;
    lng: number = -74.0862351;
    zoom: number = 2;

    markerName:string =null;
    markerLat:string = null;
    markerLng:string =null;
    markerDraggable:string;

    user = localStorage.getItem("email");

    placesMapi:PlacesMapi[];

    markers: marker[]=[];
      /*  = [
      {
      name: 'Company 1',
      lat: 42.825588,
      lng: -71.018029,
      draggable: true

      },
      {
      name: 'Company 2',
      lat: 42.868164,
      lng: -70.889071,
      draggable: true

      },
      {
      name: 'Company 3',
      lat: 42.858279,
      lng: -70.930498,
      draggable: false

      }
    ]*/

    constructor( private requestService: RequestService, private router: Router) {
        this.requestService;
    }

    addPlaceToVisit(latitude:string,length:string, label:string){


        this.requestService.createPlacesToVisit(
            'http://localhost:5005/places',
            {
                "email": label,
                "latitude": latitude,
                "length": length
            },
            new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) })
        )
            .subscribe(
                Plhaces=>{
                    alert("el lugar ha sido guardado");
                },
                err => { console.log(err);}
            )
    }

    addOtherPlaces( lat, lng, label) {
        if ( label != localStorage.getItem("email") ) {
            this.addPlaceToVisit(lat,lng,localStorage.getItem("email"));
            alert("Se agrego el lugar a lugares por visitar")

        }
    }

    init(){
        this.requestService.getPlaces(
            'http://localhost:5000/places'
        )
            .subscribe(
                placesMapi=>{
                    this.placesMapi = placesMapi;

                   // console.log('imprimiendo places=' + JSON.stringify(this.placesMapi ));

                    for (let entry of this.placesMapi) {
                        //console.log("aqui Aqui aqui "+parseFloat(entry["latitude"])+" "+parseFloat( entry["length"] ) );
                        var newMarker= {
                            label: entry["email"],
                             name:'Added',
                             lat: parseFloat(entry["latitude"]) ,
                             lng: parseFloat( entry["length"] ),
                             draggable:false
                        }
                        this.markers.push(newMarker);
                    }

                },
                err => { console.log(err);}
            )
    }

    clickedMarker(marker:marker, index:number){

    console.log('Clicked Marker: '+marker.name+' at index '+index);
    //console.log(`clicked the marker: ${label || index}`);
    }

    addPlace(latitude:string,length:string){


        this.requestService.createPlaces(
            'http://localhost:5000/places',
            {
                "email": localStorage.getItem("email"),
                "latitude": latitude,
                "length": length
            },
            new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) })
        )
            .subscribe(
                Plhaces=>{
                    alert("el lugar ha sido guardado");
                },
                err => { console.log(err);}
            )
    }

    findMarker():number{
        var index=0;
        for (let entry of this.markers) {
            if( entry.name=='Unititled'){
                return index;
            }
            index++;
        }
        return -1;
    }


    mapClicked($event: any){
        this.init();
        // buscar marcadores que tengan name = Unititled y borrarlos



        var index=this.findMarker();
        if (index > -1) {
            this.markers.splice(index, 1);
        }

      var newMarker= {
          label: localStorage.getItem("email"),
          name: 'Unititled',
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable:false
        }
        this.markers.push(newMarker);
        this.markerLat=newMarker.lat;
        this.markerLng= newMarker.lng;
        console.log("coordenadas abril: "+ newMarker.lat + newMarker.lng);
        //this.addPlace(newMarker.lat,newMarker.lng);


    }


    markerDragEnd(marker:any, $event:any){
      /*console.log('dragEnd', marker, $event);

      var updMarker={
        name: marker.name,
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
        draggable:false
      }

      var newLat = $event.coords.lat;
      var newLng = $event.coords.lng;*/

    }

    addMarker(){
      /*console.log('Adding marker');
      if(this.markerDraggable == 'yes'){
        var isDraggable = true;
      }else{
        var isDraggable = false;
      }

      var newMarker = {
        name:this.markerName,
        lat: parseFloat(this.markerLat),
        lng: parseFloat(this.markerLng),
        draggable: isDraggable

      }

      this.markers.push(newMarker);*/
      this.markerLat;
      this.markerLng;
      if( this.markerLat!=null && this.markerLng!=null){
          this.addPlace(this.markerLat,this.markerLng);
          this.markerLat=null; this.markerLng=null;
      }


    }

    ngOnInit() {
        this.init();
    }


}


interface marker{
    label?: string;
    name?:string;
  lat: number;
  lng: number;
  draggable: boolean;
}
