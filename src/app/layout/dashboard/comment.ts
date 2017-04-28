export class Comment{
    email: string;
    comment: string;
    latitude: string;
    length: string;

    constructor( email:string, comment:string, latitude:string, length:string ){
        this.email = email;
        this.comment = comment;
        this.latitude = latitude;
        this.length = length;
    }
}
