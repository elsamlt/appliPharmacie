<script setup>
// import { Chose } from '../Chose.js';
import ToDoListItem from './ToDoListItem.vue';
import ToDoForm from './ToDoForm.vue';
import { reactive, onMounted } from 'vue';

const listeC = reactive([]); 
const url = "https://apitodo.pecatte.fr/api/45/todos";

/**
 * Récupérer les tâches depuis l'API
 */
function fetchTodos() {
    fetch(url)
        .then(response => response.json())
        .then(dataJSON => {
            listeC.splice(0, listeC.length, ...dataJSON); 
        })
        .catch(error => console.error("Erreur lors de la récupération des tâches :", error));
}

/**
 * Ajouter une nouvelle tâche via API
 */
function handlerAdd(libelle) {
    console.log(libelle)
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({libelle: libelle,fait: 0}) 
    })
    .then(response => response.json())
    .then(() => fetchTodos()) // Rafraîchir la liste après ajout
    .catch(error => console.error("Erreur lors de l'ajout :", error));
}

/**
 * Supprimer une tâche via API
 */
function handlerDelete(id) {
    fetch(`${url}/${id}`, { method: "DELETE" })
        .then(response => {
            if (response.ok) fetchTodos(); // Rafraîchir après suppression
        })
        .catch(error => console.error("Erreur lors de la suppression :", error));
}

/**
 * Marquer une tâche comme faite via API
 */
function handlerFaire(id, libelle, fait) {
    console.log(id, libelle, fait)
    console.log(url,id)
    fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id:id, libelle:libelle, fait:!fait}), 
    })
    .then(response => {
        if (response.ok) fetchTodos(); // Rafraîchir après modification
    })
    .catch(error => console.error("Erreur lors de la mise à jour :", error));
}

// Charger les tâches au montage
onMounted(fetchTodos);
</script>

<template>
    <h3>Liste des choses à faire</h3> 
    <ToDoForm @eventAdd="handlerAdd"></ToDoForm>
    <ul>
        <ToDoListItem 
            v-for="(chose, index) in listeC"  
            :key="chose.id" 
            :chose="chose"
            :index="index"
            @faire="handlerFaire(chose.id, chose.libelle, chose.fait)"
            @delete="handlerDelete(chose.id)"
        />
    </ul>
</template>