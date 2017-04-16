import { Component, OnInit } from '@angular/core';

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
