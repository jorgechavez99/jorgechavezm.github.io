// Capturar los elementos del DOM
const formulario = document.querySelector('#formulario');
const genero = document.querySelector('#genero');
const filtrar = document.querySelector('#filtrar');
const cajaPelis = document.querySelector('#cajaPelis');
const listaErrores = document.querySelector('#listaErrores');
const mensajeTabla = document.querySelector('#mensajeTabla');

const fragment=document.createDocumentFragment()

//Arrays a utilizar

let peliculas = [];
/**
 * @param {string}//Incluir nombres los generos de las peliculos añadidas
 *
 */
let generos=['Terror','Comedia','Acción','Romántica']

//==================Eventos===========================
formulario.addEventListener('submit', (ev) => {
    ev.preventDefault();
    validar();
    pintarTabla()
});

filtrar.addEventListener('change',(ev)=>{
    const filtro=ev.target.value;
    //console.log(filtro)
    const filtrados= peliculas.filter((item)=>item.genero==filtro)
    console.log(filtrados)

    pintarTabla(filtrados)
if(ev.target.value=='mostrar'){
    pintarTabla()
    mensajeTabla.innerHTML=''
}

})

//=========================Funciones======================

/**
 * 
 * @param  {...any} array Indicamos el array que se pintara el select con un Rest para que pueda alcanzar cada elemento.
 * @returns  
 */
const pintarSelect=(...array)=>{
    array.forEach((item)=>{
        const opcion=document.createElement('OPTION')
        opcion.value=item
        opcion.text=item

        fragment.append(opcion)
    })

   return fragment
}

/**
 * En esta funcion nosotros validaremos con el metodo ReExp,
 * el cual nos permite asignar diversas caracteristicas que nosotros veamos convenientes para el ingreso de datos.
 */
const validar = () => {
    const regExp={
        titulo:/^.{2,}$/ig,
        director:/^[a-zÁ-ü]{2,}$/i,
        anio:/^[\d]{4}$/
    }
    let date = new Date()
    let year = date.getFullYear()

    let titulo = formulario["titulo"].value;
    let director = formulario["director"].value;
    let anio = formulario["anio"].value;
    let valorGenero = formulario["genero"].value;

    let errores=''

    if (!regExp.titulo.test(titulo)) {
        errores+='<li>Introduzca un título correcto</li>'
    };
    if (!regExp.director.test(director)) {
        errores+='<li>Introduzca un director válido</li>'
    };
    if (!regExp.anio.test(anio) || (anio > year || anio < 1800)) {
        errores+='<li>Introduzca un año entre el 1800 y la fecha actual</li>'
    };
    if (valorGenero=='Seleccionar Género') {
        errores+='<li>selecciona un genero</li>'
    };
    if (errores === '') {
        const objetoPeliculas={
            director,
            titulo,
            anio,
            genero:valorGenero,
        }
        almacenarPelis(objetoPeliculas)
        listaErrores.innerHTML=''
        formulario.reset()
    }else{
        listaErrores.innerHTML=errores
    };
};
const pintarTabla=(array=peliculas)=>{
    cajaPelis.innerHTML=''
        array.forEach((item)=>{
            const fila=document.createElement('TR')
            const titulo=document.createElement("TD")
            titulo.textContent=item.titulo
            const director=document.createElement("TD")
            director.textContent=item.director
            const anio=document.createElement("TD")
         anio.textContent=item.anio
            const genero=document.createElement("TD")
            genero.textContent=item.genero
            fila.append(titulo,director,anio,genero)
             fragment.append(fila)
         })
         cajaPelis.append(fragment)
}
// Función que almacene el objeto de la peli en array 
const almacenarPelis=(objetoPeliculas)=>{
    peliculas.push(objetoPeliculas);
}
genero.append(pintarSelect('genero',...generos))
filtrar.append(pintarSelect('mostrar',...generos))



