class Componente{
    constructor(id,name,infoUnoId,quantity){
        if(new.target == Componente){
            throw new Error("No puede instanciarse");
        }
        this.id=id;
        this.name=name;
        this.quantity=quantity;
        this.infoUnoId=infoUnoId;
    }

    getQuantity(){
        return quantity;
    }
}

export default Componente