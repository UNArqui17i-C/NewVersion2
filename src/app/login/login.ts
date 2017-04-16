export class Login{
    error : boolean;
    token : string;

    constructor( error: boolean, token: string ){
        this.error = error;
        this.token = token;
    }
}
