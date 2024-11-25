const url = "https://65480baf902874dff3acf283.mockapi.io/api/TpiLab3bis/ventas";


async function listar(id) {
    let cadUrl;
    if(isNaN(id))
      cadUrl= url;
    else 
      cadUrl = url + "/" + id;  
    return await fetch(cadUrl)
        .then(respuesta => respuesta.json());
}

async function crear(idUsuario, emailUsuario, idProducto, nombreProducto, cantidad, fecha, despachado) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: idUsuario, 
            emailUsuario: emailUsuario, 
            idProducto: idProducto, 
            nombreProducto: nombreProducto, 
            cantidad: cantidad, 
            fecha: fecha, 
            despachado: despachado
        })
    })
}

async function editar(id,  despachado) {

    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            despachado: despachado
        })
    })
}

async function listarVentasDespachadas(despachadas) {
    const newUrl= new URL(url);
    newUrl.searchParams.append('despachado', despachadas);
    return await fetch(newUrl)
        .then(respuesta => respuesta.json());
 
}

async function borrar(id){
  
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
            method: 'DELETE'
       })
}


export const ventasServices = {
    listar,
    crear,
    editar,
    borrar,
    listarVentasDespachadas
}