

class Citymesh{
    
    constructor(id,info,name, quantity){
        this.info=info;
        this.complemento = [
            new Periferico(1,"CARCASA","Carcasa Plástica Citymesh",quantity),
            new Periferico(2,"TORNILLOSYTARUGOS","Juego de Tornillos y Tarugos Citymesh",quantity), 
            new Periferico(3,"PACKAGING","Packaging Citymesh",quantity),
        ];
    }
}

export default Citymesh
