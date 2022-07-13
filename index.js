import colors from 'colors';
import { leerInput } from './helpers/inquirer.js';

const main = async () => {
    let opt = '';
    do {
        opt = await leerInput();
        console.log({ opt });
    } while (opt !== '');
};

main();