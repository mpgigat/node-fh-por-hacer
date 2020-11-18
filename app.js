//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const colors=require('colors');


//console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        //console.log('Crear por hacer');
        let tarea =porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        //console.log('Mostrar tareas');
        let listado=porHacer.getListado();
        for(let tarea of listado){
            console.log('============Por Hacer=============='.green);
            console.log(tarea.descripcion);
            console.log(`Estado: ${tarea.completado}`);
            console.log('==================================='.green);
        }
        break;
    case 'actualizar':
        // console.log('Actualizar tareas');
        let actualizar=porHacer.actualizar(argv.descripcion,argv.completado);
        console.log(actualizar);
        break;
    case 'borrar':
        let borrado=porHacer.borrar(argv.descripcion);
        break;
    default:
        console.log('Comando no reconocido');
        break;
}