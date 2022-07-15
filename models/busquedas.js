import axios from 'axios';

export default class Busquedas {
     
    historial = ['Tegucigalpa','Madrid','San José'];

    constructor() {
        //  TODO: leer DB si existe
    }

    async ciudad(lugar="") {
        try {
            // peticion http 
            const resp = await axios.get('http://reqres.in/api/users?page=2')
            console.log(resp.data.per_page);
        return []; // retornar lugares
        } catch (error) {
            
        }


        
    }
}