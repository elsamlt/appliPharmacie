<template>
    <v-app>
        <v-container>
            <!-- Barre de recherche -->
            <v-row>
                <v-col cols="4">
                    <SearchMed v-model="searchQuery" @input="fetchMedSearch" />
                </v-col>
                <v-col cols="2">
                    <v-btn icon="mdi-plus"  color="blue" size="small" @click="showAddMed = true ; selectedMed = null"></v-btn>
                </v-col>
            </v-row>

            <v-row>
                <!-- Liste des médicaments -->
                <v-col cols="4">
                    <v-list-item title="Liste des médicaments" subtitle="Vuetify"></v-list-item>
                    <v-divider></v-divider>

                    <MedItem 
                        v-for="(med, index) in listMed"  
                        :key="med.id" 
                        :med="med"
                        :index="index"
                        @faire="handlerFaire(med.id, med.libelle, med.fait)"
                        @delete="handlerDelete(med.id)"
                        @click="handlerSelectMed(med)"
                    />
                </v-col>

                <!-- Détails du médicament sélectionné -->
                <v-col cols="8">
                    <v-container v-if="selectedMed">
                        <MedItemDetail :med="selectedMed" />
                    </v-container>
                    <v-container v-if="showAddMed">
                        <AddMed></AddMed>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script setup>
import MedItem from "./MedItem.vue";
import MedItemDetail from "./MedItemDetail.vue";
import SearchMed from "./SearchMed.vue";
import AddMed from "./AddMed.vue";
import { reactive, ref, onMounted } from 'vue';

const listMed = reactive([]); 
const searchQuery = ref("");
const url = "https://apipharmacie.pecatte.fr/api/1/medicaments";

const selectedMed = ref(null); 
const showAddMed = ref(false);


/**
 * Récupérer les médicaments depuis l'API
 */
function fetchMeds() {
    fetch(url)
        .then(response => response.json())
        .then(dataJSON => {
            listMed.splice(0, listMed.length, ...dataJSON); 
        })
        .catch(error => console.error("Erreur lors de la récupération des tâches :", error));
}

/**
 * Sélectionner un médicament et afficher ses détails
 */
function handlerSelectMed(med) {
    selectedMed.value = med;
    showAddMed.value = false;
}

/**
 * Récupérer les médicaments de la recherche depuis l'API
 */
 function fetchMedSearch() {
  if (!searchQuery.value.trim()) {
    fetchMeds();
  } else {
    fetch(`${url}?search=${searchQuery.value}`)
      .then(response => response.json())
      .then(dataJSON => {
        listMed.splice(0, listMed.length, ...dataJSON); // Clear and update listMed with the search results
      })
      .catch(error => console.error("Erreur lors de la recherche des médicaments :", error));
  }
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
    .then(() => fetchMeds()) // Rafraîchir la liste après ajout
    .catch(error => console.error("Erreur lors de l'ajout :", error));
}

/**
 * Supprimer une tâche via API
 */
function handlerDelete(id) {
    fetch(`${url}/${id}`, { method: "DELETE" })
        .then(response => {
            if (response.ok) fetchMeds(); // Rafraîchir après suppression
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
        if (response.ok) fetchMeds(); // Rafraîchir après modification
    })
    .catch(error => console.error("Erreur lors de la mise à jour :", error));
}

// Charger les tâches au montage
onMounted(fetchMeds);
</script>


  