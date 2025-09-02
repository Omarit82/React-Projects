import Componente from "./Componente.js";

class Periferico extends Componente{
    
    constructor(id,info,name, quantity){
        super(id,name,quantity)
        this.info=info;
    }
}

export default Periferico;
