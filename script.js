// Array para almacenar los datos
// let firstEntry = true;
// let data = [{
//     id: 3,
//     name: "Nicolas",
//     dni: "queti",
//     phone: "+54 3548 554840"
// }];

// --------------------------------- Logic of table --------------------------------------------------

// LOGICA DE COMPROBACION PARA LISTADO
function VerificarCodigo() {
    const codigoCorrecto = "0000"; // Definimos el código correcto
    const codigoIngresado = prompt("Por favor, ingresa el código de acceso:");

    if (codigoIngresado === codigoCorrecto) {
        // Si el código ingresado es correcto, permitimos la redirección
        window.location.href = "lista.html";
    } else {
        // Si el código es incorrecto, mostramos un mensaje de error
        alert("Código incorrecto. No tienes acceso al listado.");
    }
}


// Función para agregar una entrada 
function addEntry() {

    if (firstEntry) {
        data = [];
        firstEntry = false;
    }
    // Obtener valores del formulario
    let number = document.getElementById("number").value;
    let name = document.getElementById("name").value;
    let dni = document.getElementById("dni").value;
    let phone = document.getElementById("phone").value;

    // Validaciones
    if (number === '') {
        alert('El número es obligatorio');
    } else if (name === '') {
        alert('El Nombre es obligatorio');
    } else if (dni === '') {
        alert('El DNI es obligatorio');
    } else if (phone === '') {
        alert('Un numero de contacto es obligatorio');
    } else {
        // Crear un nuevo objeto con los datos
        let entry = {
            id: number,
            name: name,
            dni: dni,
            phone: phone
        };

        // Agregar el objeto al array de datos
        data.push(entry);
        // Renderizar la tabla
        renderTable();
        // Limpiar los campos del formulario
        document.getElementById("number").value = "";
        document.getElementById("name").value = "";
        document.getElementById("dni").value = "";
        document.getElementById("phone").value = "";
    }

}

// Funciónes para eliminar,renderizar una entrada en local
// function deleteEntry(id) {

//     // Filtrar array excluyendo el id  
//     data = data.filter(entry => entry.id !== id);

//     // Renderizar tabla actualizada
//     renderTable();}


// Función para renderizar la tabla completa en local

// function renderTable() {
//     data.sort((a, b) => b.id - a.id); //ordena segun id
//     document.getElementById("tableBody").innerHTML = "";

//     data.forEach(entry => {

//         let row = `<tr>

//         <td>${entry.id}</td>  
//         <td>${entry.name}</td>
//         <td>${entry.dni}</td>
//         <td>${entry.phone}</td>
//         <td>
//             <button class="btn btn-danger btn-sm"
//                     onclick="deleteEntry('${entry.id}')">
//             Eliminar</button>
//         </td>  
//         </tr>`;

//         document.getElementById("tableBody").innerHTML += row;

//     });

// }


// Función para obtener los datos de la base de datos y renderizar la tabla

function renderTableOnline() {
    // Realizar solicitud AJAX al servidor
    fetch('php/leer.php')
        .then(response => response.json())
        .then(data => {
            // Ordenar los datos por ID
            data.sort((a, b) => b.id - a.id);

            // Limpiar el contenido actual del cuerpo de la tabla
            document.getElementById("tableBody").innerHTML = "";

            // Iterar sobre los datos y agregar filas a la tabla
            data.forEach(entry => {
                let row = `
                    <tr>
                        <td>${entry.Numero}</td>
                        <td>${entry.Nombre}</td>
                        <td>${entry.Dni}</td>
                        <td>${entry.Telefono}</td>
                        <td>
                            <form method="POST" action="PHP/eliminar_entrada.php"> 
                                <input type="hidden" name="numero" value="${entry.Numero}">
                                <button type="submit" class="btn btn-danger btn-sm">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                `;
                document.getElementById("tableBody").innerHTML += row;
            });
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}

function deleteEntryOnline(numero) {
    // Redirigir al archivo PHP para eliminar la entrada
    window.location.href = 'eliminar_entrada.php';
    header("Location: {$_SERVER['HTTP_REFERER']}");
}
// ----------------------------------------- Logic of drinks --------------------------------------------

// logica de resaltado 
function resaltarSeccion(idTabla) {
    // Quitar cualquier resaltado previo
    document.querySelectorAll(".tabla-resaltar.resaltado.animado").forEach(tabla => {
        tabla.classList.remove("resaltado", "animado");
    });

    // Resaltar la tabla correspondiente
    const tabla = document.getElementById(idTabla);
    if (tabla) {
        tabla.classList.add("resaltado", "animado");
        tabla.classList.add("scaleReset")
        // Quitar la clase "animado" después de 2 segundos
        setTimeout(() => {
            tabla.classList.remove("animado", "resaltado");
        }, 2000);
        setTimeout(() => {
            tabla.classList.remove("scaleReset");
        }, 4000);

    }
}

// generar tabla
function generarTablaMenu(menu, Categoria) {

    let tabla = `<table id="${Categoria}" class="table table-dark fs-5-sm text-wrap"  >`;

    tabla += `
        <tr>
            <th class="bg-white text-black text-capitalize text-wrap" >${Categoria}</th>
            <th class="bg-white text-black text-wrap" >Precio de:  Efectivo - Transferencia</th>
            <th class="bg-white text-black text-wrap" >Precio de Tarjeta  - QR </th> 
        </tr>
    `;

    menu.forEach(item => {
        tabla += `
            <tr>
                <td class= "w-35 text-start text-wrap">${item.Producto}</td>  
                <td class= "w-33 text-center"><span class="text-success">$</span>${item.Precio}</td>
                <td class= "w-33 text-center"><span class="text-success">$</span>${Math.round(item.Precio * 1.10)}</td>
            </tr>
        `;
    });

    tabla += `</table>`;

    return `<div class="py-3 text-wrap">${tabla}</div>`
}

// // Renderizar inicialmente
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/bebidas.html" || window.location.pathname === "/bebidas") {
        // Generar HTML de las tablas
        const htmlTragos = generarTablaMenu(tragos, "Tragos");
        const htmlShots = generarTablaMenu(shots, "Shots");
        const htmlEspumantes = generarTablaMenu(espumantes, "Espumantes");
        const htmlVinos = generarTablaMenu(vinos, "Vinos");
        const htmlCervezas = generarTablaMenu(cervezas, "Cervezas");
        const htmlSinAlcohol = generarTablaMenu(SinAlcohol, "Sin Alcohol");

        // Obtener divs
        const divTabla1 = document.querySelector(".divTablaIzq");
        const divTabla2 = document.querySelector(".divTablaDer");

        // Asignar HTML a los divs
        divTabla1.innerHTML = htmlTragos + htmlShots + htmlEspumantes;
        divTabla2.innerHTML = htmlVinos + htmlCervezas + htmlSinAlcohol;
    }
});


// Array de objetos con datos del menú 
// TRAGOS
const tragos = [{
        Producto: "Fernet",
        Precio: 5000,
    }, {
        Producto: "Gin Tonic  - Heraclito",
        Precio: 6000,
    },
    {
        Producto: "Gin Tonic  - Beefeater",
        Precio: 12000,
    },
    {
        Producto: "Vodka - Economico",
        Precio: 4500,
    },

    {
        Producto: "Vodka - Sernova",
        Precio: 5500,
    },

    {
        Producto: "Vodka - Absolut",
        Precio: 12000,
    },
    {
        Producto: "Campari",
        Precio: 4500,
    },
    {
        Producto: "Gancia",
        Precio: 4500,
    },
    {
        Producto: "Cuba Libre",
        Precio: 5500,
    },
    {
        Producto: "Malibu",
        Precio: 5500,
    },
    {
        Producto: "Ron de Caramelo",
        Precio: 5500,
    },
    {
        Producto: "Ron de Uva",
        Precio: 5500,
    }
]
// SinALcohol 
const SinAlcohol = [{
        Producto: "Gaseosa",
        Precio: 1200,
    },
    {
        Producto: "Speed",
        Precio: 1200,
    },
    {
        Producto: "Agua",
        Precio: 1200,
    },
]
// VINOS
const vinos = [{
        Producto: "Dilema <span class='text-info'>(Blanco - Rosado - Tinto)</span>",
        Precio: 4500,
    },
    {
        Producto: "Santa Julia <span class='text-info'>(Blanco - Tinto)</span>",
        Precio: 6500,
    },
]

// CERVEZAS
const cervezas = [{
        Producto: "Heineken",
        Precio: 2400,
    },
    {
        Producto: "Imperial  <span class='text-info'>(Golden - Roja - Ipa)</span>",
        Precio: 2400,
    },
]

// CHAMPAGNES
const espumantes = [{
        Producto: "Du",
        Precio: 6000,
    }, {
        Producto: "Mumm",
        Precio: 10000,
    },

    {
        Producto: "Chandon",
        Precio: 14000,
    },
    {
        Producto: "Baron B",
        Precio: 25000,
    },
]

// SHOTS 
const shots = [{
        Producto: "Shot Tequila",
        Precio: 600,
    },
    {
        Producto: "Shot Vodka",
        Precio: 600,
    },
    {
        Producto: "Shot Jaggermaister",
        Precio: 3000,

    },
]