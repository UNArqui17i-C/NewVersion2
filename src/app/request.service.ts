import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';


@Injectable()
export class RequestService {




    constructor(private http: Http) {
    }

    getUsers(baseUrl): Observable<any> {
        return this.http.get( baseUrl)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error getuser'));
    }

    authentication(baseUrl,body,options): Observable<any>{
        return this.http.post(baseUrl,body,options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || ''));
    }

    getToken(baseUrl,body,options): Observable<any>{
        return this.http.post(baseUrl,body,options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || ''));
    }

    logoutSession(baseUrl,body,options): Observable<any>{
        return this.http.post(baseUrl,body,options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error logout'));
    }

    singInUsr(baseUrl,body,options): Observable<any>{
        return this.http.post(baseUrl,body,options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error sing In'));
    }

    getPlaces(baseUrl): Observable<any> {
        return this.http.get( baseUrl)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error getPlaces'));
    }

    createPlaces(baseUrl,body,options): Observable<any>{
        return this.http.post(baseUrl,body,options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error create Places'));
    }

    createPlacesToVisit(baseUrl,body,options): Observable<any>{
        return this.http.post(baseUrl,body,options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error create Places To Visit'));
    }




}






/*
 search(){
 this.getComments().subscribe(
 respuesta => { console.log(respuesta ) },
 error => console.log(error)
 )
 }

 public getComments() : Observable<Comment[]>{
 //let url = 'http://192.168.99.103:5000/users';
 //let url = 'http://192.168.99.101:8000/comment/?format=json';
 let url = 'https://jsonplaceholder.typicode.com/posts';
 return this.http.get(url)
 .map(this.parseResponse)
 .catch( ()=> Observable.throw("algo salio re mal") );
 }

 parseResponse( response : Response ): Comment[]{
 if( !response.json() || !response.json().Search )return [];

 return response.json().Search.map(
 jsonComment => new Comment(
 jsonComment['email'],
 jsonComment['password'],
 )
 )

 }*/

//{ "email" : "imailtest", "password" : "passtest" }


