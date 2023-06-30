import { Producto } from "./producto";

export class Combo {
    _id!:string; 
    titulo!:string; 
    descuento!:number;
    montoFinal!:number; 
    productos!:Array<Producto>;
    estado!:boolean;

    constructor()
    {
        this.productos = new Array<Producto>();
    }

}
