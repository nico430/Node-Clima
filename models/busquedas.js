const fs = require('fs')
const axios = require('axios');


class Busquedas {

    Historial = [];
    dbPath = './db/database.json';

    constructor() {

        //leer DB si existe
        this.leerDB()

    }

    get historialCapitalizado(){
      return this.Historial.map(
        (lugar) => {
          let palabras = lugar.split(' ');
          palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

          return palabras.join(' ')
        }
      )
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather(){
      return{
        'appid': process.env.OPENWEATHER_KEY,
        'units': 'metric',
        'lang': 'es'
      }
    }

    

    async ciudad(lugar = '') {

        //realizar peticion http

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox

            });

            const resp = await instance.get();

            return resp.data.features.map(lugar => ({

                id: lugar.id,
                nombre: lugar.place_name,
                longitud: lugar.center[0],
                latitud: lugar.center[1]

            }));

        } catch (error) {
            return []
        }

    }
async ClimaLugar(lat,lon){
     try{

          //instance axios.create()
          const weatherInstance = axios.create(
            {
              baseURL: 'https://api.openweathermap.org/data/2.5/weather',
              params:
              {
                lat,
                lon,
                ...this.paramsWeather
              }
            }
          )

          //resp.data

          const response = await weatherInstance.get()
          const {weather, main} = response.data

          return(
            {
              "desc":weather[0].description,
              "min": main.temp_min,
              "max": main.temp_max,
              "temp":main.temp
            }
          )

       }
     catch(error){
       console.log(error);
       }

  }


  agregarHistorial( lugar = "" ){
    
    // prevenir que hayan historiales duplicados
    if( this.Historial.includes(lugar.toLocaleLowerCase())){
      return;
    }
    this.Historial = this.Historial.splice(0,5);
    // a??adir al historial
    this.Historial.unshift(lugar);  // en lugar de hacer un push y que se agrege al final el unshift agrega el nuevo elemento al principio del array

    // grabar el historial en un archivo o DB
    this.guardarDB()

  }

  guardarDB(){

    const payload = {
      historial:this.Historial
    }

    fs.writeFileSync( this.dbPath, JSON.stringify( payload ) )
  }

  leerDB(){
    if(fs.existsSync(this.dbPath)) return;

      const data = JSON.parse(fs.readFileSync(this.dbPath, {encoding:'utf-8'}))
      this.Historial = data.historial
  }

}


module.exports = Busquedas;