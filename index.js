const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");



const main = async() => {

    const busquedas = new Busquedas();

    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {

            case 1:
                //Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                busquedas.ciudad(lugar)
                    //buscar los lugares

                //seleccionar el lugar

                //clima

                //mostrar resultados

                console.log('\n Información del lugar \n'.green);
                console.log('Ciudad: ', );
                console.log('Latitud: ', );
                console.log('Longitud: ', );
                console.log('Temperatura: ', );
                console.log('Mínima: ', );
                console.log('Máxima: ', );

                break;
        }

        await pausa()
    } while (opt !== 0);

}

main()