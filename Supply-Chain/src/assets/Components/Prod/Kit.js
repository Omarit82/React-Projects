

class Kit{
    
    constructor(id,info,name, quantity){
        this.info=info;
        this.complemento = [
            new Periferico(2724802647,"DW02-ZB","Sensor Magnético Meian",1),
            new Periferico(2477838256,"SP02-ZB","PIR/Sensor de Movimiento Meian",2),
            new Periferico(2477838258,"PB02-ZB","Control Remoto - Meian",1),
            new Periferico(139934834,"HS2WD-EFR1","Sirena de Interior - Heiman",1),
            new Periferico(2444485988,"FGML","Fuente 12V 2A",1),
            new Periferico(140962813,"2P403060","Batería 3.7V 3100 mAh - Topway/TewayCell",1),
            new Periferico(5,"FUENTEPACKAGING","Packaging para fuente en Kit - Citymesh",1),
            new Periferico(6,"PACKAGING","Packaging KIT - Citymesh",1),
        ];
    }
}

export default Kit