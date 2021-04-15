const axios = require('axios');


class Busquedas {

    Historial = ['bs', 'gr', 'g', 'p', 'ca', 'ar'];

    constructor() {

        //leer DB si existe

    }

    async ciudad(lugar = '') {

        //realizar peticion http
        //console.log(lugar);

        const resp = await axios.get('https://reqres.in/api/users?page=2');
        console.log(resp.data);

        return [] // retornar lugares que coincidan

    }

}


module.exports = Busquedas;