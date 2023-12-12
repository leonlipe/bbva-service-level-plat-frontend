<template>
  <app-bar />
  <v-container class="pt-8">
    <v-row justify="start" >
      <v-col sm="12">
        <div class="text-h5 font-weight-bold">
        Acciones de configuración
        </div>
        <div class="text-body-1 font-weight-light">
        Consulta y configuración de datos
        </div>
      </v-col>
    </v-row>
    <v-row
      justify="start"
      v-for="(row, index) in setupOptions"
      :key="`row-setup-${index}`">
      <v-col sm="12" md="12" lg="4" xl="3" v-for="(col, indexCol) in row" :key="`col-setup-${indexCol}`">
        <v-card
          variant="outlined"
          rounded
          :class="styles.cardConfig"
          :to="col.path"
          link
        > 
          <v-card-title class="pt-8 pb-8 text-black d-flex">
            <img v-if="col.icon" :src="col.icon" alt="Icono de la sección"/>
            <span class="pl-1">{{ col.title }}</span>
          </v-card-title>
        </v-card> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import '@/components/bbva-web-components/bbva-foundations-microillustrations.js'
import AppBar from "@/components/AppBar/AppBar.vue";
import router from '@/router'
import { ref } from "vue";
import { setupOptions } from '@/constants/setupView';

export default {
  data() {
    return {
      setupOptions: setupOptions,
      styles: {
        cardConfig: ref('card-config')
      }
    };
  },
  methods: {
    navigateTo (name) {
      router.push({ name })
    }
  },
  components: {
    AppBar
  }
}
</script>

<style>
.card-config {
  height: 90px;
  border-color: #D3D3D3;
  border-width: 2px;
}
</style>
