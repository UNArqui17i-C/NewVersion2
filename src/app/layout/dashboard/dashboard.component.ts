import { Component, OnInit, NgModule } from '@angular/core';
import {SebmGoogleMap} from 'angular2-google-maps/core';
import {
  BrowserModule
} from '@angular/platform-browser';

import {
  AgmCoreModule
} from 'angular2-google-maps/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    lat: number = 42.858279;
    lng: number = -70.930498;
    zoom: number = 11;

    markerName:string;
    markerLat:string;
    markerLng:string;
    markerDraggable:string;

    markers: marker[] = [
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
    ]

    constructor (){
    }

    clickedMarker(marker:marker, index:number){
    console.log('Clicked Marker: '+marker.name+' at index '+index);
    }

    mapClicked($event: any){
      var newMarker= {
        name: 'Unititled',
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable:false
        }
        this.markers.push(newMarker);
    }


    markerDragEnd(marker:any, $event:any){
      console.log('dragEnd', marker, $event);

      var updMarker={
        name: marker.name,
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
        draggable:false
      }

      var newLat = $event.coords.lat;
      var newLng = $event.coords.lng;

    }

    addMarker(){
      console.log('Adding marker');
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

      this.markers.push(newMarker);

    }

    ngOnInit() {}


}


interface marker{
  name?:string;
  lat: number;
  lng: number;
  draggable: boolean;
}
