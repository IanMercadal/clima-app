require('dotenv').config({ path: './tokens.env' })


const { leerInput, listarLugares, inquirerMenu, pausa } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {

    const busquedas = new Busquedas();
    let opt = '';

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje 
                let termino = await leerInput('Ciudad: ');
                // Buscar  los lugares
                let lugares = await busquedas.ciudad(termino);

                // Seleccionar el lugar
                if (lugares.length === 0) {
                    console.log('Ciudad no encontrada');
                } else {
                    const id = await listarLugares(lugares);
                    const lugarSelec = lugares.find(l => l.id);
                    // console.log(lugarSelec);

                    // Datos del clima

                    // Mostrar resultaods

                    console.log('\n\tInformación del lugar\n'.green);
                    console.log('Ciudad', lugarSelec.nombre);
                    console.log('Lat', lugarSelec.lat);
                    console.log('Lng', lugarSelec.lng);
                    console.log('Temperatura',);
                    console.log('Mínima',);
                    console.log('Máxima',);
                }
                break;
        }

        if (opt !== 0) await pausa();
    } while (opt !== 0);
};

main();