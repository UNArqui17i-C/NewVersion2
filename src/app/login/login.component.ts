/*import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


    formEmail:string;
    formPassword:string;

    constructor() { }

    doLoggin(){
    console.log('El correo es '+this.formEmail+', La clave es: '+this.formPassword);
    }

    ngOnInit() {
    }

}
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {RequestService} from "../request.service";
import { Headers, RequestOptions } from '@angular/http';
import {Login} from "./login";
import {Thoken} from "./thoken";
import 'rxjs/add/observable/throw';
import {singUp} from "../signup/singUp";
import {Router} from "@angular/router";



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    emailSing:string;
    passwordSing:string;
    formEmail:string;
    formPassword:string;

    emailOP:string;
    passwordOP:string;
    login: Login[];
    thoken: Thoken[];
    tokenOP:string;
    singUp: singUp[];

    checkClick:boolean = false;
    checkClickSingIn:boolean=false;

     init(){

        if( localStorage.getItem("email")!=null){
            this.router.navigate(['/dashboard']);
        }
    }

    /*
    public loginForm = this.fb.group({
        email: ["", Validators.required],
        password: ["", Validators.required]
    });

    public singIn = this.fb.group({
        email: ["", Validators.required],
        password: ["", Validators.required]
    });*/


    constructor( private requestService: RequestService, private router: Router) {
        this.requestService;
    }
    doLogin(event) {
        //console.log(event);
        //console.log(this.loginForm.value);
        this.emailOP=this.formEmail;
        this.passwordOP=this.formPassword;
        console.log(this.emailOP);
        console.log(this.passwordOP);
        this.checkClick=true;
        this.authenticate();


    }
    /*doSingIn(event){
        this.emailSing = this.singIn.value.email;
        this.passwordSing = this.singIn.value.password;
        console.log('register email '+this.emailSing);
        console.log('register password '+this.passwordSing);
        this.checkClickSingIn=true;

        if( localStorage.getItem("email")!=null && this.checkClickSingIn){
            alert('erro esta sesion ya esta activa');
        }
        else{
            this.singInNewUser();
        }

    }*/

    /*
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

    }*/

    /*
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



                },
                err => { console.log(err);}
            )
    }*/

    authenticate():void{
        this.requestService.authentication(
            'http://localhost:3000/authenticate',
            {
                "email": this.emailOP,
                "password": this.passwordOP
            },
            new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) })
        )
            .subscribe(
                login=>{
                    this.login =login;
                    //console.log('this.users=' + JSON.stringify(this.login));
                    if( this.login['error'] && this.checkClick ){
                        alert('Este usuario no esta registrado o el password esta mal');
                        return;
                    }else{
                        if( localStorage.getItem("email")!=null){
                            alert('ya esta alguien registrado');
                            return;
                        }
                    }
                    //true - > si hay error


                    this.requestService.getToken(
                        'http://localhost:3000/token',
                        {
                            "email": this.emailOP
                        },
                        new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) })
                    )
                        .subscribe(
                            thoken=>{
                                this.thoken =thoken;
                                console.log('imprimiendo thoken= ' + JSON.stringify(this.thoken));
                                this.tokenOP=JSON.stringify(this.thoken["token"]);
                                console.log('**********' + this.tokenOP);

                                if (typeof(Storage) !== "undefined") {
                                    localStorage.setItem("email", this.emailOP);
                                    localStorage.setItem("token", this.tokenOP);
                                    this.router.navigate(['/dashboard']);
                                } else {
                                    document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage!";
                                }
                                //ir a otra pagina
                            },
                            err => { console.log(err);}
                        )

                },
                err => { console.log(err); }
            )
    }


    ngOnInit() {

    this.init();
        this.authenticate();
    }

}

