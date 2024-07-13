/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";
import { Button } from "bootstrap";

document.addEventListener("DOMContentLoaded", function() {
  //variables
  let pronoun = ["the", "our"];
  let adjetive = ["great", "big"];
  let noun = ["jogger", "racoon"];
  let extension = [".com", ".net"];

  //referencias a elementos del DOM
  const inputElementPronoun = document.getElementById("elementPronoun");
  const inputElementAdjetive = document.getElementById("elementAdjetive");
  const inputElementNoun = document.getElementById("elementNoun");
  const inputElementExtension = document.getElementById("elementExtension");
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

  //recargar la pagina
  document.getElementById("reload").addEventListener("click", function() {
    location.reload();
  });

  //funcion para agregar elemento al array
  function addElement(array, value) {
    if (value && !array.includes(value)) {
      array.push(value);
      alert(`${value} added to the list.`);
    } else {
      alert(`${value} is already in the list or invalid.`);
    }
  }

  //funcion para eliminar elemento del array
  function deleteElement(array, value) {
    const index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
      alert(`${value} removed from the list.`);
    } else {
      alert(`${value} not found in the list.`);
    }
  }

  //agregar elementos al hacer clic en "Add all"
  addButton.addEventListener("click", function() {
    addElement(pronoun, inputElementPronoun.value);
    addElement(adjetive, inputElementAdjetive.value);
    addElement(noun, inputElementNoun.value);
    addElement(extension, inputElementExtension.value);
    inputElementPronoun.value = "";
    inputElementAdjetive.value = "";
    inputElementNoun.value = "";
    inputElementExtension.value = "";
  });

  //eliminar elementos al hacer clic en "Delete all"
  deleteButton.addEventListener("click", function() {
    deleteElement(pronoun, inputElementPronoun.value);
    deleteElement(adjetive, inputElementAdjetive.value);
    deleteElement(noun, inputElementNoun.value);
    deleteElement(extension, inputElementExtension.value);
    inputElementPronoun.value = "";
    inputElementAdjetive.value = "";
    inputElementNoun.value = "";
    inputElementExtension.value = "";
  });
});
