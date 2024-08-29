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
        box.style.border = comandParts[1] + " solid";
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

// Activa el Dark Mode

const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Cambia el texto del botón según el modo actual
  if (body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = "Light Mode";
  } else {
    darkModeToggle.textContent = "Dark Mode";
  }
});

// Cambiar el color del box al cambiar los valores de los inputs

const red_text = document.getElementById("red_text");
const green_text = document.getElementById("green_text");
const blue_text = document.getElementById("blue_text");
const picker_title = document.getElementById("picker-title");

const red_input = document.getElementById("red");
const green_input = document.getElementById("green");
const blue_input = document.getElementById("blue");

let rgb = [0, 0, 0];

//el rgb del titulo se ira modificando siempre que se ejecute la funcion changeRgb
const changeRgb = () => {
  picker_title.style.color = `rgb(${rgb})`;
};
//modificar el valor r
red_input.addEventListener("input", () => {
  /* en el rgb, r es red, este codigo modifica ese valor en el array rgb en base al valor obtenido en el cambio
   del valor del input de tipo range */
  rgb[0] = red_input.value;
  changeRgb(); //modificar el color de fondo
  red_text.innerText = red_input.value; //modificar el valor del elemento p red_input
  red_text.style.color = `rgb(${red_input.value}, 0, 0)`; //modificar el color de la letra del elemento p
  console.log(rgb); //verificar el cambio en consola
  //se aplica para los otros 2 colores en los eventos adyacentes
});

//modificar el valor g
green_input.addEventListener("input", () => {
  rgb[1] = green_input.value;
  changeRgb();
  green_text.innerText = green_input.value;
  green_text.style.color = `rgb(0, ${green_input.value}, 0)`;
  console.log(rgb);
});

//modificar el valor b
blue_input.addEventListener("input", () => {
  rgb[2] = blue_input.value;
  changeRgb();
  blue_text.innerText = blue_input.value;
  blue_text.style.color = `rgb(0, 0, ${blue_input.value})`;
  console.log(rgb);
});
