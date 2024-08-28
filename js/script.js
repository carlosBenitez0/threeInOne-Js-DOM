const comands_input = document.querySelector(".comands-input");
const box = document.querySelector(".box");
const cantidad_comandos = document.getElementById("cantidad-comandos");
let cantidad = 0;

//Al cargarse la pagina el input va a tener el foco, asi no hace falta darle click para escribir
comands_input.focus();

//Con cada tecla que se presione se va a ejecutar la funcion executeCommand(Siempre y cuando el input tenga el foco)
comands_input.addEventListener("input", () => {
  executeComand(comands_input.value);
});

function executeComand(comando) {
  //dividimos en dos partes los comandos que el usuario escibe a partir de ':'
  //de esta manera se detecta la clave y el valor
  let comandParts = comando.split(":"); // ejem commandParts["f-color", "red"]

  switch (comandParts[0]) {
    //Se utiliza comandParts[0], ejem -> "f-color" para verificar cual instruccion debe ejecutarse
    //En base a la clave escrita
    case "f-color":
      //Se utiliza la el valor despues de los ':', ejem -> #6a7, para modificar los estilos en linea
      box.style.backgroundColor = comandParts[1];
      break;
    case "color-texto":
      box.style.color = comandParts[1];
      break;
    case "borde":
      //se modifica el borde al detectar que el usuario escribe 'px' o 'rem'
      if (comandParts[1].includes("px") || comandParts[1].includes("rem")) {
        box.style.border = comandParts[1] + " solid black";
      }
      break;
    case "mover-arriba":
      //utilizamos el translateY para mover el elemento hacia arriba dependiendo de la medida
      let transformy = `translateY(-${comandParts[1]})`;
      if (transformy.indexOf(" ")) {
        /* Al utilizar la instruccion: `translateY(-${comandParts[1]})`, se crea un espacio en blanco luego del signo '-'
          asi que creamos un arreglos con split para eliminar el espacio y luego join para crear la cadena nuevamente sin el espacio
        */
        transformy = transformy.split(" ").join("");
      }
      box.style.transform = transformy;
      break;
    case "mover-abajo":
      box.style.transform = `translateY(${comandParts[1]})`;
      break;
    case "mover-izquierda":
      let transformx = `translateX(-${comandParts[1]})`;
      if (transformx.indexOf(" ")) {
        transformx = transformx.split(" ").join("");
      }
      box.style.transform = transformx;
      break;
    case "mover-derecha":
      box.style.transform = `translateX(${comandParts[1]})`;
      break;
    case "borde-redondo":
      box.style.borderRadius = comandParts[1];
      break;
    case "altura":
      box.style.height = comandParts[1];
      break;
    case "ancho":
      box.style.width = comandParts[1];
      break;
  }
}

//Agregar mas 1 a la cantidad y agregar comando al historial
function oneMore() {
  cantidad++;
  cantidad_comandos.innerText = cantidad;
}

const observer = new MutationObserver((mutationsList) => {
  //El mutation observa si hay mutaciones en el elemento que le pasamos en la configuracion

  mutationsList.forEach((mutation) => {
    if (mutation.type === "attributes") {
      // Si hay un cambio en los atributos (en este caso el estilo), ejecuta la función
      oneMore();
      addCommandToRegister();
    }
  });
});

//configuracion del observacion de  mutacion
observer.observe(box, {
  attributes: true, // Observar cambios en los atributos
  attributeFilter: ["style"], // filtrar por estilos, verifica si hay mutaciones en los estilos en linea del elemento box
});

const historial_list = document.querySelector(".historial-list");
function addCommandToRegister() {
  // <li class="historial-item">Comando 1</li>
  //crear un elemento li cada vez que se realiza una mutacion en el elemento "box" y se agrega al historial
  let list_item = document.createElement("li");
  list_item.classList.add("historial-item");

  list_item.innerText = comands_input.value;

  historial_list.appendChild(list_item);
}

//------------------------mostrar la ventana modal------------------------
const btn_historial = document.getElementById("btn-historial");
const modal_bg = document.querySelector(".modal-bg");
const close_modal = document.getElementById("close-modal");
const modal = document.querySelector(".modal");

btn_historial.addEventListener("click", () => {
  modal_bg.classList.remove("no-visible");
});

close_modal.addEventListener("click", () => {
  modal_bg.classList.add("no-visible");
});

modal_bg.addEventListener("click", () => {
  modal_bg.classList.add("no-visible");
});

modal.addEventListener("click", (event) => {
  event.stopPropagation(); //Evitar la propagacion del evento click al modal por ser hijo del modal-bg
});
