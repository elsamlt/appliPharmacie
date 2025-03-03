<template>
    <v-card>
      <v-card-title>
        <span class="headline">Ajouter un médicament</span>
      </v-card-title>
  
      <v-card-text>
        <v-form>
          <v-text-field label="Nom du médicament" v-model="med.denomination" required></v-text-field>
          <v-text-field label="Forme pharmaceutique" v-model="med.formepharmaceutique" required></v-text-field>
          <v-text-field label="Quantité" v-model="med.qte" required type="number"></v-text-field>

          <!-- Image Upload -->
          <v-file-input
            v-model="med.image"
            label="Ajouter une image"
            accept="image/*"
            prepend-icon="mdi-image"
            outlined
            @change="handleImageChange"
          ></v-file-input>
  
          <v-btn @click="submitMed" class="mt-3">Ajouter</v-btn>
          <v-btn @click="closeForm" class="mt-3">Annuler</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const med = ref({
    libelle: '',
    formepharmaceutique: '',
    qte: ''
  });
  
  const submitMed = () => {
    // Logique pour ajouter un médicament via API ou autre
    console.log("Nouveau médicament : ", med.value);
    // Remettre à zéro après l'ajout
    med.value = { libelle: '', formepharmaceutique: '', qte: '' };
  };
  
  const closeForm = () => {
    // Remettre à zéro ou fermer le formulaire
    med.value = { libelle: '', formepharmaceutique: '', qte: '' };
  };
  </script>
  