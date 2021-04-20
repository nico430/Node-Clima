require('dotenv').config();



const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async() => {

    const busquedas = new Busquedas();

    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {

            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                //Buscar ciudades
                const lugares = await busquedas.ciudad(termino);

                //seleccionar el lugar
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find(l => l.id === id);
                console.log(lugarSel);

                //clima

                //mostrar resultados

                console.log('\n Información del lugar \n'.green);
                console.log('Ciudad: ', lugarSel.nombre);
                console.log('Latitud: ', lugarSel.latitud);
                console.log('Longitud: ', lugarSel.longitud);
                console.log('Temperatura: ', );
                console.log('Mínima: ', );
                console.log('Máxima: ', );

                break;
        }

        await pausa()
    } while (opt !== 0);

}

main()