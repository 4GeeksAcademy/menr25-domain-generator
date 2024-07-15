/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

document.addEventListener("DOMContentLoaded", function() {
  //variables
  let pronoun = ["the", "our"];
  let adjetive = ["great", "big"];
  let noun = ["jogger", "racoon"];
  let extension = [".com", ".net"];

  //referencias a elementos del DOM
  const addButton = document.getElementById("addButton");
  const deleteButton = document.getElementById("deleteButton");

  //funcion para generar los dominios
  function domainGenerator() {
    let domains = "";
    for (let i = 0; i < pronoun.length; i++) {
      for (let j = 0; j < adjetive.length; j++) {
        for (let k = 0; k < noun.length; k++) {
          for (let l = 0; l < extension.length; l++) {
            domains += pronoun[i] + adjetive[j] + noun[k] + extension[l] + "\n";
          }
        }
      }
    }
    return domains;
  }

  //funcion para mostrar los dominios
  function generateDomains() {
    let paragraph = document.getElementById("domains");
    paragraph.innerText = domainGenerator();
  }

  //agregar evento al boton de generar dominios
  document
    .getElementById("generate")
    .addEventListener("click", generateDomains);

  //recargar la pagina en click
  document.getElementById("reload").addEventListener("click", function() {
    location.reload();
  });

  //funcion para mostrar alertas
  function showAlert(message, type) {
    const alertContainer = document.getElementById("alertContainer");
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = "alert";
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.appendChild(alert);

    //tiempo de muestra de la alerta
    setTimeout(() => {
      alert.classList.remove("show");
      alert.addEventListener("transitionend", () => alert.remove());
    }, 2000);
  }

  //funcion para determinar la opcion de radio seleccionada
  function getSelectedArray() {
    const selectedOption = document.querySelector(
      'input[name="inlineRadioOptions"]:checked'
    );
    if (selectedOption) {
      switch (selectedOption.value) {
        case "pronoun":
          return pronoun;
        case "adjetive":
          return adjetive;
        case "noun":
          return noun;
        case "extension":
          return extension;
        default:
          return null;
      }
    }
    return null;
  }

  //funcion para agregar elemento al array
  function addElement() {
    const inputElement = document.getElementById("inputElement"); // Obtener inputElement aquí
    const array = getSelectedArray();
    const value = inputElement.value.trim();
    if (array) {
      if (value && !array.includes(value)) {
        array.push(value);
        showAlert(`${value} added to the list.`, "success");
      } else {
        showAlert(`${value} is already in the list or invalid.`, "warning");
      }
    } else {
      showAlert("Please select a category.", "warning");
    }
  }

  //funcion para eliminar elemento del array
  function deleteElement() {
    const inputElement = document.getElementById("inputElement"); // Obtener inputElement aquí
    const array = getSelectedArray();
    const value = inputElement.value.trim();
    if (array) {
      const index = array.indexOf(value);
      if (index !== -1) {
        array.splice(index, 1);
        showAlert(`${value} removed from the list.`, "success");
      } else {
        showAlert(`${value} not found in the list.`, "danger");
      }
    } else {
      showAlert("Please select a category.", "warning");
    }
  }

  //agregar elemento al hacer clic en "Add"
  addButton.addEventListener("click", function() {
    addElement();
    document.getElementById("inputElement").value = ""; //limpiar el campo de entrada
  });

  //eliminar elemento al hacer clic en "Delete"
  deleteButton.addEventListener("click", function() {
    deleteElement();
    document.getElementById("inputElement").value = ""; //limpiar el campo de entrada
  });
});
