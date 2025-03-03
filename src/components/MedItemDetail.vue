<template>
    <v-card>
        <v-row align="center">
            <v-col >
                <v-card-title>{{ med.denomination }}</v-card-title>
                <img :src="`https://apipharmacie.pecatte.fr/images/${med.photo}`" alt="Image du médicament" width="150" class="ml-6">
            </v-col>
            
            <v-card-text>
                <p><strong>Forme pharmaceutique :</strong> {{ med.formepharmaceutique }}</p>
                <p><strong>Quantité :</strong> {{ med.qte }}</p>
            </v-card-text>
        </v-row>
    </v-card>
    <v-row justify="center" class="mt-2">
        <v-col cols="auto">
            <v-btn icon="mdi-pencil"  color="blue" size="small"></v-btn>
        </v-col>
        <v-col cols="auto">
            <v-btn icon="mdi-delete"  color="red" size="small"></v-btn>
        </v-col>
    </v-row>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  med: Object
});
</script>
