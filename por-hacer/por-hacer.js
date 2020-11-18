const fs =require('fs');


let listadoPorHacer=[]

const guardarDB=()=>{
    let data=JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json',data,(err)=>{
        if(err) throw new Error('No se pudo grabar')
    });
}

const cargarDB=()=>{
    //se puede hacer con una peticion http(axios)
    //pero vamos a aprovechar que estamos del lado del servidor
    try {
        listadoPorHacer=require('../db/data.json');    
    } catch (error) {
        listadoPorHacer=[];
    }
}

const getListado=()=>{
    cargarDB();
    return listadoPorHacer;
}

const actualizar=(descripcion,completado=true)=>{
    cargarDB();
    let index=listadoPorHacer.findIndex(tarea =>descripcion===tarea.descripcion);
    if (index>=0) {
        listadoPorHacer[index].completado=completado;
        guardarDB();
        return true
    }else return false;

}

const borrar=(descripcion)=>{
    cargarDB();
    let nuevoListado=listadoPorHacer.filter(tarea =>descripcion!==tarea.descripcion);
    if (nuevoListado.length!==listadoPorHacer.length) {        
        guardarDB();
        return true
    }else return false;
}

const crear=(descripcion) =>{

    cargarDB();
    let porHacer={
        descripcion,
        completado:false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

module.exports={crear,getListado,actualizar,borrar}