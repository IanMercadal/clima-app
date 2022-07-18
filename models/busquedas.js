const axios = require('axios');
require('dotenv').config({path:'./tokens.env'})

class Busquedas {

    historial = ['Tegucigalpa','Madrid','San José'];

    constructor() {
        //  TODO: leer DB si existe

    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsMapboxWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'lang': 'es',
            'units': 'metric'
        }
    }

    async ciudad(lugar="") {
        try {
            // Peticion http 
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params:  this.paramsMapbox
            })
            
            const resp = await instance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }))

        } catch (error) {
            console.log("Error: ", error)
        }
    }

    async climaLugar(lat, lon) {

        try {
            // Peticion http 
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params:  {...this.paramsMapboxWeather, lat, lon}
            })
            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_max,
                max: main.temp_min,
                temp: main.temp,
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
}

module.exports = Busquedas;