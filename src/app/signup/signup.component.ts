import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {RequestService} from "../request.service";
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/throw';
import {singUp} from "./singUp";
import {Router} from "@angular/router";




@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    singUp: singUp[];

    formEmail:string;
    formPassword:string;
    formPassword2:string;
    emailSing:string;
    passwordSing:string;
    passwordSing2:string;

    checkClickSingIn:boolean=false;

    constructor( private requestService: RequestService, private router: Router) {
        this.requestService;
    }

    doSingIn(event){
        this.emailSing = this.formEmail;
        this.passwordSing = this.formPassword;
        console.log('register email '+this.emailSing);
        console.log('register password '+this.passwordSing);
        this.checkClickSingIn=true;

        if( localStorage.getItem("email")!=null && this.checkClickSingIn){
            alert('erro esta sesion ya esta activa');
        }
        else{
            this.singInNewUser();
        }

    }

    singInNewUser():void{

        this.requestService.singInUsr(
            'http://localhost:3000/signup',
            {
                "email": this.emailSing,
                "password": this.passwordSing
            },
            new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) })
        )
            .subscribe(
                singUp=>{
                    this.singUp =singUp;
                    console.log('imprimiendo error '+ JSON.stringify(this.singUp["error"]) );
                    if( this.singUp["error"] ){
                        alert('Este usuario ya existe');
                        return;
                    }
                    alert("Se ha resgistrado exitosamente");
                    this.router.navigate(['/login']);


                },
                err => { console.log(err);}
            )
    }

    ngOnInit() { }
}
