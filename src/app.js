/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";
import { Button } from "bootstrap";

document.addEventListener("DOMContentLoaded", function() {
  // Variables
  let pronoun = ["the", "our"];
  let adjetive = ["great", "big"];
  let noun = ["jogger", "racoon"];
  let extension = [".com", ".net"];

  // Referencias a elementos del DOM
  const addButton = document.getElementById("addButton");
  const deleteButton = document.getElementById("deleteButton");

  // Función para generar los dominios
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

  // Función para mostrar los dominios
  function generateDomains() {
    let paragraph = document.getElementById("domains");
    paragraph.innerText = domainGenerator();
  }

  // Agregar evento al botón de generar dominios
  document
    .getElementById("generate")
    .addEventListener("click", generateDomains);

  // Recargar la página
  document.getElementById("reload").addEventListener("click", function() {
    location.reload();
  });

  // Función para mostrar alertas
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

    setTimeout(() => {
      alert.classList.remove("show");
      alert.addEventListener("transitionend", () => alert.remove());
    }, 2000);
  }

  // Función para determinar la opción de radio seleccionada
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

  // Función para agregar elemento al array
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

  // Función para eliminar elemento del array
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

  // Agregar elementos al hacer clic en "Add all"
  addButton.addEventListener("click", function() {
    addElement();
    document.getElementById("inputElement").value = ""; // Limpiar el campo de entrada
  });

  // Eliminar elementos al hacer clic en "Delete all"
  deleteButton.addEventListener("click", function() {
    deleteElement();
    document.getElementById("inputElement").value = ""; // Limpiar el campo de entrada
  });
});
