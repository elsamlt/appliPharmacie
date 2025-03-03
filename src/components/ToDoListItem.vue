<script setup> 
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps(["chose", "index"]); 
    const emit = defineEmits(["faire", "delete"]); // Déclare les événements

    function handleFaire() {
        emit("faire", props.chose.id, props.chose.libelle, props.chose.fait); 
    }

    function handleDelete() {
        emit("delete", props.index); // Utiliser props.index
    }
</script> 

<template> 
    <li>
        {{ chose.libelle }} 
        {{ chose.fait === 1 ? '(Fait)' : '(Pas fait)' }}
        <button @click="handleDelete">Delete</button> 
        <button @click="handleFaire">Faire</button>
    </li>
</template>
