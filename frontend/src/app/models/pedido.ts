import { Calificacion } from "./calificacion";
import { Cliente } from "./cliente";

export class Pedido {
    _id!:string;
    estado!: string;
    demora!: string;
    modalidad!: string;
    cliente!: Cliente;
    detalleproductos!: Array<String>;
    calificacion!: Calificacion;
}
