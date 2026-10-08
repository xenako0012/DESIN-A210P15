document.addEventListener("DOMContentLoaded", () => {

    console.log("BOPA Asturias - interfaz cargada correctamente");

});

/* =========================================
   BOPA - APP.JS
========================================= */


/* =========================================
   DATOS DE EJEMPLO
   -----------------------------------------
   Son datos ficticios para el prototipo
   académico.
========================================= */

const documentos = [

    {
        id: 1,

        tipo: "decreto",

        tipoNombre: "Decreto",

        titulo: "Decreto 45/2026, de 20 de septiembre, por el que se regula la organización de los centros educativos del Principado de Asturias",

        descripcion:
            "Regulación de la organización y funcionamiento de los centros educativos públicos del Principado de Asturias para el curso académico.",

        organismo: "educacion",

        organismoNombre:
            "Consejería de Educación",

        fecha: "2026-09-24",

        fechaTexto: "24 de septiembre de 2026",

        numero: 186,

        paginas: "12 páginas",

        consultas: 245,

        palabras: [
            "educación",
            "centros educativos",
            "organización",
            "asturias"
        ]

    },


    {
        id: 2,

        tipo: "resolucion",

        tipoNombre: "Resolución",

        titulo: "Resolución de 22 de septiembre de 2026, de la Consejería de Salud, por la que se establecen determinadas medidas administrativas",

        descripcion:
            "Resolución administrativa relativa a la aplicación de medidas y procedimientos dentro del ámbito sanitario del Principado de Asturias.",

        organismo: "salud",

        organismoNombre:
            "Consejería de Salud",

        fecha: "2026-09-23",

        fechaTexto: "23 de septiembre de 2026",

        numero: 185,

        paginas: "8 páginas",

        consultas: 198,

        palabras: [
            "salud",
            "sanidad",
            "medidas",
            "procedimientos"
        ]

    },


    {
        id: 3,

        tipo: "subvenciones",

        tipoNombre: "Subvención",

        titulo: "Convocatoria de ayudas destinadas a estudiantes para transporte escolar en zonas rurales",

        descripcion:
            "Convocatoria pública de ayudas destinadas a facilitar el transporte escolar de estudiantes residentes en zonas rurales.",

        organismo: "educacion",

        organismoNombre:
            "Consejería de Educación",

        fecha: "2026-09-22",

        fechaTexto: "22 de septiembre de 2026",

        numero: 184,

        paginas: "15 páginas",

        consultas: 421,

        palabras: [
            "ayudas",
            "estudiantes",
            "transporte escolar",
            "zonas rurales"
        ]

    },


    {
        id: 4,

        tipo: "oposiciones",

        tipoNombre: "Oposiciones y concursos",

        titulo: "Convocatoria de pruebas selectivas para el acceso a cuerpos de la Administración del Principado de Asturias",

        descripcion:
            "Convocatoria de pruebas selectivas y procedimiento de acceso a diferentes cuerpos de la Administración del Principado de Asturias.",

        organismo: "empleo",

        organismoNombre:
            "Consejería de Empleo",

        fecha: "2026-09-20",

        fechaTexto: "20 de septiembre de 2026",

        numero: 182,

        paginas: "23 páginas",

        consultas: 635,

        palabras: [
            "oposiciones",
            "empleo público",
            "administración",
            "pruebas selectivas"
        ]

    },


    {
        id: 5,

        tipo: "anuncio",

        tipoNombre: "Anuncio",

        titulo: "Anuncio relativo al periodo de información pública del proyecto de mejora de infraestructuras municipales",

        descripcion:
            "Información pública de un proyecto de mejora de infraestructuras y servicios municipales en varios concejos asturianos.",

        organismo: "presidencia",

        organismoNombre:
            "Presidencia del Principado",

        fecha: "2026-09-19",

        fechaTexto: "19 de septiembre de 2026",

        numero: 181,

        paginas: "6 páginas",

        consultas: 143,

        palabras: [
            "infraestructuras",
            "información pública",
            "municipios",
            "asturias"
        ]

    },


    {
        id: 6,

        tipo: "decreto",

        tipoNombre: "Decreto",

        titulo: "Decreto 42/2026, de 17 de septiembre, sobre medidas de apoyo al empleo juvenil",

        descripcion:
            "Medidas destinadas a fomentar el empleo juvenil y facilitar el acceso de las personas jóvenes al mercado laboral.",

        organismo: "empleo",

        organismoNombre:
            "Consejería de Empleo",

        fecha: "2026-09-18",

        fechaTexto: "18 de septiembre de 2026",

        numero: 180,

        paginas: "10 páginas",

        consultas: 356,

        palabras: [
            "empleo juvenil",
            "jóvenes",
            "empleo",
            "ayudas"
        ]

    }

];



/* =========================================
   VARIABLES
========================================= */

let resultadosActuales = [...documentos];

let busquedaActual = "";



/* =========================================
   INICIALIZACIÓN
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------------
       Detectar página
    ------------------------------------- */

    const esBuscador =
        document.getElementById("form-busqueda");

    if (esBuscador) {

        iniciarBuscador();

    }

});



/* =========================================
   INICIAR BUSCADOR
========================================= */

function iniciarBuscador() {

    const formulario =
        document.getElementById("form-busqueda");

    const input =
        document.getElementById("busqueda-principal");

    const sugerencias =
        document.getElementById("sugerencias");

    const orden =
        document.getElementById("orden");

    const limpiar =
        document.getElementById("limpiar-filtros");

    const reiniciar =
        document.getElementById("reiniciar-busqueda");


    /* -------------------------------------
       Leer parámetros de URL
    ------------------------------------- */

    const parametros =
        new URLSearchParams(window.location.search);


    const queryURL =
        parametros.get("q");

    const tipoURL =
        parametros.get("tipo");


    if (queryURL) {

        input.value = queryURL;

        busquedaActual = queryURL;

    }


    /* -------------------------------------
       Tipo recibido desde index.html
    ------------------------------------- */

    if (tipoURL) {

        const checkbox =
            document.querySelector(
                `input[name="tipo"][value="${tipoURL}"]`
            );

        if (checkbox) {

            checkbox.checked = true;

        }

    }


    /* -------------------------------------
       Mostrar resultados iniciales
    ------------------------------------- */

    aplicarFiltros();



    /* =====================================
       FORMULARIO
    ====================================== */

    formulario.addEventListener("submit", (event) => {

        event.preventDefault();

        busquedaActual =
            input.value.trim();

        guardarBusqueda(busquedaActual);

        aplicarFiltros();

        ocultarSugerencias();

    });



    /* =====================================
       AUTOCOMPLETADO
    ====================================== */

    input.addEventListener("input", () => {

        const texto =
            input.value.trim().toLowerCase();


        if (texto.length < 2) {

            ocultarSugerencias();

            return;

        }


        const sugerenciasEncontradas =
            obtenerSugerencias(texto);


        mostrarSugerencias(
            sugerenciasEncontradas
        );

    });



    /* =====================================
       CLICK EN SUGERENCIAS
    ====================================== */

    sugerencias.addEventListener(
        "click",
        (event) => {

            const boton =
                event.target.closest(
                    ".sugerencia"
                );


            if (!boton) {
                return;
            }


            const valor =
                boton.dataset.valor;


            input.value = valor;

            busquedaActual = valor;

            guardarBusqueda(valor);

            aplicarFiltros();

            ocultarSugerencias();

        }
    );



    /* =====================================
       BOTONES DE BÚSQUEDA POPULAR
    ====================================== */

    document
        .querySelectorAll(
            "[data-busqueda]"
        )
        .forEach((boton) => {

            boton.addEventListener(
                "click",
                () => {

                    const valor =
                        boton.dataset.busqueda;

                    input.value = valor;

                    busquedaActual = valor;

                    guardarBusqueda(valor);

                    aplicarFiltros();

                }
            );

        });



    /* =====================================
       CAMBIOS EN FILTROS
    ====================================== */

    document
        .querySelectorAll(
            'input[name="tipo"], input[name="organismo"]'
        )
        .forEach((checkbox) => {

            checkbox.addEventListener(
                "change",
                aplicarFiltros
            );

        });


    document
        .getElementById("fecha-desde")
        .addEventListener(
            "change",
            aplicarFiltros
        );


    document
        .getElementById("fecha-hasta")
        .addEventListener(
            "change",
            aplicarFiltros
        );


    document
        .getElementById("numero-bopa")
        .addEventListener(
            "input",
            aplicarFiltros
        );



    /* =====================================
       ORDEN
    ====================================== */

    orden.addEventListener(
        "change",
        () => {

            ordenarResultados(
                orden.value
            );

            mostrarResultados();

        }
    );



    /* =====================================
       LIMPIAR
    ====================================== */

    limpiar.addEventListener(
        "click",
        limpiarFiltros
    );


    reiniciar.addEventListener(
        "click",
        limpiarFiltros
    );



    /* =====================================
       CERRAR SUGERENCIAS AL HACER CLICK
       FUERA
    ====================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !event.target.closest(
                    ".panel-busqueda"
                )
            ) {

                ocultarSugerencias();

            }

        }
    );


    /* =====================================
       MODAL
    ====================================== */

    iniciarModal();



    /* =====================================
       HISTORIAL
    ====================================== */

    mostrarHistorial();

}



/* =========================================
   APLICAR FILTROS
========================================= */

function aplicarFiltros() {

    const input =
        document.getElementById(
            "busqueda-principal"
        );


    busquedaActual =
        input
            ? input.value.trim().toLowerCase()
            : "";


    const tiposSeleccionados =
        Array.from(
            document.querySelectorAll(
                'input[name="tipo"]:checked'
            )
        ).map(
            checkbox => checkbox.value
        );


    const organismosSeleccionados =
        Array.from(
            document.querySelectorAll(
                'input[name="organismo"]:checked'
            )
        ).map(
            checkbox => checkbox.value
        );


    const fechaDesde =
        document.getElementById(
            "fecha-desde"
        ).value;


    const fechaHasta =
        document.getElementById(
            "fecha-hasta"
        ).value;


    const numeroBopa =
        document.getElementById(
            "numero-bopa"
        ).value;



    resultadosActuales =
        documentos.filter((documento) => {


            /* -----------------------------
               BUSQUEDA
            ----------------------------- */

            const textoCompleto = (

                documento.titulo +
                " " +
                documento.descripcion +
                " " +
                documento.organismoNombre +
                " " +
                documento.tipoNombre +
                " " +
                documento.palabras.join(" ")

            ).toLowerCase();


            const coincideBusqueda =
                !busquedaActual ||
                textoCompleto.includes(
                    busquedaActual
                );


            if (!coincideBusqueda) {

                return false;

            }



            /* -----------------------------
               TIPO
            ----------------------------- */

            if (
                tiposSeleccionados.length > 0 &&
                !tiposSeleccionados.includes(
                    documento.tipo
                )
            ) {

                return false;

            }



            /* -----------------------------
               ORGANISMO
            ----------------------------- */

            if (
                organismosSeleccionados.length > 0 &&
                !organismosSeleccionados.includes(
                    documento.organismo
                )
            ) {

                return false;

            }



            /* -----------------------------
               FECHA DESDE
            ----------------------------- */

            if (
                fechaDesde &&
                documento.fecha < fechaDesde
            ) {

                return false;

            }



            /* -----------------------------
               FECHA HASTA
            ----------------------------- */

            if (
                fechaHasta &&
                documento.fecha > fechaHasta
            ) {

                return false;

            }



            /* -----------------------------
               NÚMERO BOPA
            ----------------------------- */

            if (
                numeroBopa &&
                documento.numero !==
                Number(numeroBopa)
            ) {

                return false;

            }


            return true;

        });


    ordenarResultados(
        document.getElementById("orden").value
    );


    mostrarResultados();

}



/* =========================================
   MOSTRAR RESULTADOS
========================================= */

function mostrarResultados() {

    const contenedor =
        document.getElementById(
            "lista-resultados"
        );


    const sinResultados =
        document.getElementById(
            "sin-resultados"
        );


    const contador =
        document.getElementById(
            "numero-resultados"
        );


    const textoFiltro =
        document.getElementById(
            "texto-filtro"
        );


    contenedor.innerHTML = "";


    contador.textContent =
        `${resultadosActuales.length} ${
            resultadosActuales.length === 1
                ? "resultado"
                : "resultados"
        }`;


    if (busquedaActual) {

        textoFiltro.textContent =
            `Resultados para «${busquedaActual}»`;

    } else {

        textoFiltro.textContent =
            "Publicaciones encontradas";

    }



    /* -------------------------------------
       Sin resultados
    ------------------------------------- */

    if (
        resultadosActuales.length === 0
    ) {

        sinResultados.hidden = false;

        return;

    }


    sinResultados.hidden = true;



    /* -------------------------------------
       Crear tarjetas
    ------------------------------------- */

    resultadosActuales.forEach(
        (documento) => {

            const tarjeta =
                crearTarjetaResultado(
                    documento
                );

            contenedor.appendChild(
                tarjeta
            );

        }
    );

}



/* =========================================
   CREAR TARJETA
========================================= */

function crearTarjetaResultado(
    documento
) {

    const article =
        document.createElement("article");


    article.className =
        "resultado";


    const titulo =
        resaltarTexto(
            documento.titulo,
            busquedaActual
        );


    const descripcion =
        resaltarTexto(
            documento.descripcion,
            busquedaActual
        );


    article.innerHTML = `

        <div class="resultado-superior">

            <div class="resultado-meta">

                <span class="etiqueta-resultado">
                    ${documento.tipoNombre}
                </span>

                <span class="fecha-resultado">
                    ${documento.fechaTexto}
                </span>

            </div>

        </div>


        <h2>
            ${titulo}
        </h2>


        <p class="resultado-descripcion">
            ${descripcion}
        </p>


        <div class="resultado-inferior">

            <div class="resultado-datos">

                <span class="resultado-dato">
                    BOPA:
                    <strong>
                        Nº ${documento.numero}
                    </strong>
                </span>

                <span class="resultado-dato">
                    Órgano:
                    <strong>
                        ${documento.organismoNombre}
                    </strong>
                </span>

                <span class="resultado-dato">
                    ${documento.paginas}
                </span>

            </div>


            <div class="resultado-acciones">

                <button
                    type="button"
                    class="boton-preview"
                    data-preview="${documento.id}"
                >
                    Vista previa
                </button>


                <a
                    href="documento.html?id=${documento.id}"
                    class="boton-documento"
                >
                    Consultar
                </a>

            </div>

        </div>

    `;


    return article;

}



/* =========================================
   RESALTAR TEXTO
========================================= */

function resaltarTexto(
    texto,
    busqueda
) {

    if (!busqueda) {

        return texto;

    }


    const palabras =
        busqueda
            .split(/\s+/)
            .filter(
                palabra =>
                    palabra.length > 1
            );


    let resultado =
        texto;


    palabras.forEach(
        palabra => {

            const expresion =
                new RegExp(
                    `(${escaparRegex(palabra)})`,
                    "gi"
                );


            resultado =
                resultado.replace(
                    expresion,
                    "<mark>$1</mark>"
                );

        }
    );


    return resultado;

}



/* =========================================
   ESCAPAR REGEX
========================================= */

function escaparRegex(texto) {

    return texto.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

}



/* =========================================
   AUTOCOMPLETADO
========================================= */

function obtenerSugerencias(
    texto
) {

    const resultados = [];


    documentos.forEach(
        documento => {

            const campos = [

                documento.titulo,

                documento.organismoNombre,

                documento.tipoNombre,

                ...documento.palabras

            ];


            campos.forEach(
                campo => {

                    if (
                        campo
                            .toLowerCase()
                            .includes(texto)
                    ) {

                        if (
                            !resultados.includes(
                                campo
                            )
                        ) {

                            resultados.push(
                                campo
                            );

                        }

                    }

                }
            );

        }
    );


    return resultados.slice(0, 6);

}



/* =========================================
   MOSTRAR SUGERENCIAS
========================================= */

function mostrarSugerencias(
    sugerencias
) {

    const contenedor =
        document.getElementById(
            "sugerencias"
        );


    if (
        sugerencias.length === 0
    ) {

        ocultarSugerencias();

        return;

    }


    contenedor.innerHTML =
        sugerencias
            .map(
                sugerencia => `

                    <button
                        type="button"
                        class="sugerencia"
                        data-valor="${sugerencia}"
                    >

                        <span class="sugerencia-icono">
                            ⌕
                        </span>

                        ${sugerencia}

                    </button>

                `
            )
            .join("");


    contenedor.style.display =
        "block";

}



/* =========================================
   OCULTAR SUGERENCIAS
========================================= */

function ocultarSugerencias() {

    const contenedor =
        document.getElementById(
            "sugerencias"
        );


    if (!contenedor) {
        return;
    }


    contenedor.innerHTML = "";

    contenedor.style.display =
        "none";

}



/* =========================================
   ORDENAR RESULTADOS
========================================= */

function ordenarResultados(
    criterio
) {

    switch (criterio) {


        case "fecha-desc":

            resultadosActuales.sort(
                (a, b) =>
                    new Date(b.fecha) -
                    new Date(a.fecha)
            );

            break;



        case "fecha-asc":

            resultadosActuales.sort(
                (a, b) =>
                    new Date(a.fecha) -
                    new Date(b.fecha)
            );

            break;



        case "consultados":

            resultadosActuales.sort(
                (a, b) =>
                    b.consultas -
                    a.consultas
            );

            break;



        case "relevancia":

        default:

            resultadosActuales.sort(
                (a, b) =>
                    b.consultas -
                    a.consultas
            );

            break;

    }

}



/* =========================================
   LIMPIAR FILTROS
========================================= */

function limpiarFiltros() {

    const input =
        document.getElementById(
            "busqueda-principal"
        );


    input.value = "";

    busquedaActual = "";


    document
        .querySelectorAll(
            'input[name="tipo"], input[name="organismo"]'
        )
        .forEach(
            checkbox =>
                checkbox.checked = false
        );


    document.getElementById(
        "fecha-desde"
    ).value = "";


    document.getElementById(
        "fecha-hasta"
    ).value = "";


    document.getElementById(
        "numero-bopa"
    ).value = "";


    window.history.replaceState(
        {},
        "",
        "buscador.html"
    );


    aplicarFiltros();

}



/* =========================================
   MODAL
========================================= */

function iniciarModal() {

    const modal =
        document.getElementById(
            "modal-preview"
        );


    const cerrar =
        document.getElementById(
            "cerrar-modal"
        );


    const fondo =
        modal.querySelector(
            ".modal-fondo"
        );


    const contenido =
        document.getElementById(
            "preview-contenido"
        );


    document.addEventListener(
        "click",
        (event) => {

            const boton =
                event.target.closest(
                    "[data-preview]"
                );


            if (!boton) {
                return;
            }


            const id =
                Number(
                    boton.dataset.preview
                );


            const documento =
                documentos.find(
                    item =>
                        item.id === id
                );


            if (!documento) {
                return;
            }


            contenido.innerHTML = `

                <span class="etiqueta etiqueta-verde">
                    ${documento.tipoNombre}
                </span>

                <h2>
                    ${documento.titulo}
                </h2>

                <p>
                    ${documento.descripcion}
                </p>


                <div class="preview-datos">

                    <div class="preview-dato">

                        <span>
                            Publicación
                        </span>

                        <strong>
                            BOPA Nº ${documento.numero}
                        </strong>

                    </div>


                    <div class="preview-dato">

                        <span>
                            Fecha
                        </span>

                        <strong>
                            ${documento.fechaTexto}
                        </strong>

                    </div>


                    <div class="preview-dato">

                        <span>
                            Órgano emisor
                        </span>

                        <strong>
                            ${documento.organismoNombre}
                        </strong>

                    </div>


                    <div class="preview-dato">

                        <span>
                            Extensión
                        </span>

                        <strong>
                            ${documento.paginas}
                        </strong>

                    </div>

                </div>


                <a
                    href="documento.html?id=${documento.id}"
                    class="boton-secundario"
                >
                    Consultar documento completo
                </a>

            `;


            modal.hidden = false;

            document.body.style.overflow =
                "hidden";

        }
    );


    cerrar.addEventListener(
        "click",
        cerrarModal
    );


    fondo.addEventListener(
        "click",
        cerrarModal
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                !modal.hidden
            ) {

                cerrarModal();

            }

        }
    );


    function cerrarModal() {

        modal.hidden = true;

        document.body.style.overflow =
            "";

    }

}



/* =========================================
   HISTORIAL DE BÚSQUEDAS
========================================= */

function guardarBusqueda(
    busqueda
) {

    if (!busqueda) {
        return;
    }


    let historial =
        JSON.parse(
            localStorage.getItem(
                "bopaHistorial"
            )
        ) || [];


    historial =
        historial.filter(
            item =>
                item.toLowerCase() !==
                busqueda.toLowerCase()
        );


    historial.unshift(
        busqueda
    );


    historial =
        historial.slice(0, 5);


    localStorage.setItem(
        "bopaHistorial",
        JSON.stringify(historial)
    );


    mostrarHistorial();

}



/* =========================================
   MOSTRAR HISTORIAL
========================================= */

function mostrarHistorial() {

    const contenedor =
        document.getElementById(
            "historial-busquedas"
        );


    if (!contenedor) {
        return;
    }


    const historial =
        JSON.parse(
            localStorage.getItem(
                "bopaHistorial"
            )
        ) || [];


    if (
        historial.length === 0
    ) {

        contenedor.innerHTML = `
            <span>
                Todavía no hay búsquedas.
            </span>
        `;

        return;

    }


    contenedor.innerHTML =
        historial
            .map(
                busqueda => `

                    <div
                        class="historial-item"
                        data-historial="${busqueda}"
                    >
                        ${busqueda}
                    </div>

                `
            )
            .join("");


    contenedor
        .querySelectorAll(
            ".historial-item"
        )
        .forEach(
            elemento => {

                elemento.addEventListener(
                    "click",
                    () => {

                        const input =
                            document.getElementById(
                                "busqueda-principal"
                            );


                        input.value =
                            elemento.dataset.historial;


                        busquedaActual =
                            elemento.dataset.historial;


                        aplicarFiltros();

                    }
                );

                elemento.style.cursor =
                    "pointer";

            }
        );

}