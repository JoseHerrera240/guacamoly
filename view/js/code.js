//definicioón de variables

const url = "http://localhost:3000/api/clientes"
const contenedor = document.querySelector('tbody')
let resultados = ''

const formAticulo = document.querySelector('form')
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');
const direccion = document.getElementById('direccion');
const documento = document.getElementById('documento');



const mostrar = (clientes) => {
    clientes.forEach(cliente => {
        console.log("cliente ", cliente)
        resultados += `
        <tr>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.documento}</td>
            <td>${cliente.correo}</td>
            <td>${cliente.direccion}</td>
            <td>${cliente.telefono}</td>
        </tr>
    `
    });
    contenedor.innerHTML = resultados
}


formAticulo.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre.value,
            apellido: apellido.value,
            documento: documento.value,
            correo: correo.value,
            direccion: direccion.value,
            telefono: telefono.value,
        })
    })
        .then(response => response.json())
        .then(data => {
            const nuevoCliente = [] 
            nuevoCliente.push(data) 
            mostrar(nuevoCliente)
        })
})




fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))