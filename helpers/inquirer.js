import inquirer from 'inquirer';
import colors from 'colors';

const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Seleccione una opción',
        choices: [
            'Crear tarea',
            'Listar tareas',
            'Listar tareas completadas',
            'Listar tareas pendientes',
            'Completar tarea(s)',
            'Eliminar tarea(s)',
            'Salir',
        ],
    },
];
const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}
const inquirerMenu = async () => {
    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opción'.green);
    console.log('===========================\n'.green);

    const opt = await inquirer.prompt(menuOpts);

    return opt;
};

export  {
    inquirerMenu,
    leerInput
}