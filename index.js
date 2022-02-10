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

                if(id === '0') continue;

                const lugarSel = lugares.find(l => l.id === id);
                // guardar historial
                busquedas.agregarHistorial(lugarSel.nombre)

                //clima
                const clima = await busquedas.ClimaLugar(lugarSel.latitud,lugarSel.longitud)
                //mostrar resultados
                console.clear()
                console.log('\n Información del lugar \n'.green);
                console.log('Ciudad: ', lugarSel.nombre.green);
                console.log('Latitud: ', lugarSel.latitud);
                console.log('Longitud: ', lugarSel.longitud);
                console.log('Temperatura: ', clima.temp );
                console.log('Mínima: ', clima.min);
                console.log('Máxima: ', clima.max);
                console.log('Como está el clima: ', clima.desc);

                break;
            
            case 2:
              busquedas.historialCapitalizado.forEach(
                (lugar,i)=>{
                  const idx = `${ i++ }. `.green;
                  console.log( idx, lugar);
                }
              )

            break;
        }

        await pausa()
    } while (opt !== 0);

}

main()