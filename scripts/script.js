// Fonction pour récupérer les données stockées dans le localStorage
function getStoredData() {
    const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    return storedData;
}

// Fonction pour sauvegarder les données dans le localStorage
function saveDataToStorage(data) {
    localStorage.setItem("userData", JSON.stringify(data));
}

// Fonction pour afficher les données dans le tableau
function displayData() {
    const table = document.getElementById("dataTable");
    const storedData = getStoredData();

    // Effacer le contenu existant du tableau
    table.innerHTML = "<tr><th>Éclat</th><th>Nombre Éclats & Épiques</th><th>Action</th></tr>";

    storedData.forEach(item => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.innerHTML = item.eclatLabel;
        cell2.innerHTML = `Éclat: ${item.eclatValue}, Épiques: ${item.epiqueValue}`;
        cell3.innerHTML = `<button onclick="modifierLigne(${item.index})">Modifier</button>
                           <button onclick="supprimerLigne(${item.index})">Supprimer</button>`;
    });
}

// Fonction pour ajouter une nouvelle ligne
function ajouterLigne() {
    // Récupérer les valeurs depuis les champs de saisie
    const eclatLabel = prompt("Veuillez entrer le type d'éclat: (Antiques, Néant...)");
    const eclatValue = prompt(`Veuillez entrer la valeur d'éclat pour ${eclatLabel}:`);
    const epiqueValue = prompt(`Veuillez entrer la valeur d'épique pour ${eclatLabel}:`);

    // Vérifier si les champs sont remplis avant d'ajouter une ligne
    if (eclatLabel !== null && estNombreEntier(eclatValue) && estNombreEntier(epiqueValue)) {
        // Récupérer les données stockées
        const storedData = getStoredData();

        // Ajouter les nouvelles valeurs
        storedData.push({
            eclatLabel: eclatLabel,
            eclatValue: eclatValue,
            epiqueValue: epiqueValue,
            index: storedData.length  // Utilisé pour identifier la ligne
        });

        // Sauvegarder les données mises à jour
        saveDataToStorage(storedData);

        // Actualiser le tableau
        displayData();
    } else {
        alert("Veuillez remplir tous les champs avec des nombres entiers avant d'ajouter une ligne.");
    }
}

// Fonction pour vérifier si une valeur est un nombre entier
function estNombreEntier(valeur) {
    return /^\d+$/.test(valeur);
}

// Fonction pour modifier une ligne
function modifierLigne(index) {
    // Récupérer les valeurs depuis les champs de saisie
    const newEclatValue = prompt("Veuillez entrer la nouvelle valeur d'éclat:");
    const newEpiqueValue = prompt("Veuillez entrer la nouvelle valeur d'épique:");

    // Vérifier si les valeurs sont des nombres entiers
    if (estNombreEntier(newEclatValue) && estNombreEntier(newEpiqueValue)) {
        // Récupérer les données stockées
        const storedData = getStoredData();

        // Modifier les valeurs de la ligne existante
        storedData[index].eclatValue = newEclatValue;
        storedData[index].epiqueValue = newEpiqueValue;

        // Sauvegarder les données mises à jour
        saveDataToStorage(storedData);

        // Actualiser le tableau
        displayData();
    } else {
        alert("Veuillez entrer des valeurs valides (nombres entiers).");
    }
}

// Fonction pour supprimer une ligne avec confirmation
function supprimerLigne(index) {
    // Demander confirmation à l'utilisateur
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette ligne ?");

    if (confirmation) {
        // Récupérer les données stockées
        const storedData = getStoredData();

        // Supprimer la ligne avec l'index spécifié
        storedData.splice(index, 1);

        // Sauvegarder les données mises à jour
        saveDataToStorage(storedData);

        // Actualiser le tableau
        displayData();
    }
}

// Fonction pour demander la confirmation avant la réinitialisation
function demanderConfirmation() {
    const confirmation = prompt("Veuillez entrer 'OUI' en majuscules pour confirmer la réinitialisation.");

    if (confirmation === "OUI") {
        // Réinitialiser les données
        reinitialiser();
    } else {
        alert("Réinitialisation annulée. Entrez 'OUI' en majuscules pour confirmer.");
    }
}

// Fonction pour réinitialiser les données
function reinitialiser() {
    // Supprimer toutes les données stockées
    localStorage.removeItem("userData");

    // Actualiser le tableau
    displayData();
}

// Fonction pour télécharger les données en tant que fichier texte
function telechargerDonnees() {
    const storedData = getStoredData();
    const contenuFichier = JSON.stringify(storedData, null, 2);

    // Ouvrir une nouvelle fenêtre pour afficher le contenu JSON sous forme de tableau
    const popup = window.open("", "_blank");
    popup.document.write("<h2>Contenu des données</h2>");
    popup.document.write("<table border='1'><tr><th>Éclat</th><th>Épiques</th></tr>");

    // Afficher chaque entrée du tableau dans la nouvelle fenêtre
    storedData.forEach(item => {
        popup.document.write(`<tr><td>${item.eclatLabel}</td><td>Éclat: ${item.eclatValue}, Épiques: ${item.epiqueValue}</td></tr>`);
    });

    popup.document.write("</table>");
}

// Appel de la fonction pour afficher les données au chargement de la page
document.addEventListener("DOMContentLoaded", displayData);
