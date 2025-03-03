<template>
  <!-- <li> -->
    <!-- {{ med.denomination }} -->
    <!-- {{ med.fait === 1 ? "(Fait)" : "(Pas fait)" }}
    <button @click="handleDelete">Delete</button>
    <button @click="handleFaire">Faire</button> -->
  <!-- </li> -->
  <v-list-item link :title="props.med.denomination" @click="handleSelect"></v-list-item>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["med", "index"]);
console.log(props);
const emit = defineEmits(["faire", "delete", "select"]); // Déclare les événements

function handleFaire() {
  emit("faire", med.id, med.libelle, med.fait);
}

function handleDelete() {
  emit("delete", index);
}

function handleSelect() {
    emit("select", props.med);  // Émet un événement avec les détails du médicament
}
</script>

