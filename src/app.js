import "bootstrap";
import "./style.css";

document.addEventListener("DOMContentLoaded", function() {
  let pronoun = ["the", "our"];
  let adjetive = ["great", "big"];
  let noun = ["jogger", "racoon"];
  let extension = [".com", ".net"];

  const addButton = document.getElementById("addButton");
  const deleteButton = document.getElementById("deleteButton");

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

  function generateDomains() {
    let liElement = document.getElementById("domains");
    liElement.innerText = domainGenerator();
  }

  document
    .getElementById("generate")
    .addEventListener("click", generateDomains);

  document.getElementById("reload").addEventListener("click", function() {
    location.reload();
  });

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

  function addElement() {
    const inputElement = document.getElementById("inputElement");
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

  function deleteElement() {
    const inputElement = document.getElementById("inputElement");
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

  addButton.addEventListener("click", function() {
    addElement();
    document.getElementById("inputElement").value = "";
  });

  deleteButton.addEventListener("click", function() {
    deleteElement();
    document.getElementById("inputElement").value = "";
  });
});
