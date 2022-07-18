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
                    if(id === '0') continue;

                    const lugarSelec = lugares.find(l => l.id);
                    
                    // Guardar en DB
                    busquedas.agregarHistorial(lugarSelec.nombre)

                    // Datos del clima
                    const clima = await busquedas.climaLugar(lugarSelec.lat, lugarSelec.lng)
                    // Mostrar resultaods
                    console.log('\n\tInformación del lugar\n'.green);
                    console.log('Ciudad', lugarSelec.nombre.green);
                    console.log('Lat', lugarSelec.lat);
                    console.log('Lng', lugarSelec.lng);
                    console.log('Temperatura', clima.temp);
                    console.log('Mínima', clima.min);
                    console.log('Máxima', clima.max);
                    console.log('Aspécto del día:', clima.desc.green);
                }
                break;

                case 2:
                    busquedas.historial.forEach((lugar,i) => {
                        const idx = `${i + 1}.`.green;
                        console.log(`${idx} ${lugar} `);
                    })
            }

        if (opt !== 0) await pausa();
    } while (opt !== 0);
};

main();