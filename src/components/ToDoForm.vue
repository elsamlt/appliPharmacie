<script setup>
import { ref } from 'vue';

const libelle = ref(''); // Variable réactive pour la saisie
const emit = defineEmits(['eventAdd']); // Déclare l'événement vers le parent

function submitForm() {
    emit('eventAdd', libelle.value); // Envoie la valeur de la tâche au parent
}
</script>

<template>
    <form @submit.prevent="submitForm">
        <input v-model="libelle" type="text" placeholder="Nouvelle tâche" />
        <button type="submit">Ajouter</button>
    </form>
</template>
