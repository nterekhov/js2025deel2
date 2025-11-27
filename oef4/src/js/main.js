// Import our custom CSS
import '../scss/styles.scss'
import { User } from "./userModel.js";
import { createUserCard } from "./userCard.js";

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

//eigen js

// State: lijst van users
const users = [];

// DOM-elementen
const nameInput = document.querySelector("#ex4_name");
const ageInput = document.querySelector("#ex4_age");
const addBtn = document.querySelector("#ex4_btn");
const list = document.querySelector("#ex4_list");
const status = document.querySelector("#ex4_status");

// Klik-event: gebruiker toevoegen
addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const age = Number(ageInput.value);

    // Validatie
    if (!name) {
        status.className = "alert alert-danger";
        status.textContent = "Naam mag niet leeg zijn.";
        return;
    }

    if (!age || age <= 0) {
        status.className = "alert alert-danger";
        status.textContent = "Leeftijd moet een positief getal zijn.";
        return;
    }

    // Nieuw User-object
    const user = new User(name, age);
    users.push(user);

    // Veldjes leegmaken
    nameInput.value = "";
    ageInput.value = "";

    updateUI();
});

// UI vernieuwen
function updateUI() {
    // 1. Lijst vullen
    list.innerHTML = users.map(u => createUserCard(u)).join("");

    // 2. Status
    if (users.length === 0) {
        status.className = "alert alert-secondary";
        status.textContent = "Nog geen gebruikers toegevoegd.";
    } else {
        status.className = "alert alert-success";
        status.textContent = `Aantal gebruikers: ${users.length}`;
    }
}