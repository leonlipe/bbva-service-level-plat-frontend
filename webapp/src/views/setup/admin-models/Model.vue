<template>
  <v-container class="pl-8" fluid>
    <v-row>
      <v-col cols="12">
        <bbva-button-default
          variant="link"
          style="color: #1973B8"
          icon="bbva:return"
          text=" Volver a Administración de Modelos" 
          click="back">
        </bbva-button-default>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="text-h5">Resumen del modelo</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <span class="text-h6">Datos CFS</span>
      </v-col>
    </v-row>

    <v-row >
      <v-col class="d-flex">
        <div class="width-auto pl-4">
          <img src="/icons/flag.svg" alt="Icono de listado"/>
          <span class="pl-2">Business Unit: {{data.bu}}</span>
        </div>
        <div class="width-auto pl-4">
          <img src="/icons/flag.svg" alt="Icono de listado"/>
          <span class="pl-2">CFS: {{data.cfs}}</span>
        </div>
        <div class="width-auto pl-4">
          <img src="/icons/flag.svg" alt="Icono de listado"/>
          <span class="pl-2">Service Owner / Nombre y apellidos: {{data.service_owner}}</span>
        </div>
        <div class="width-auto pl-4">
          <img src="/icons/flag.svg" alt="Icono de listado"/>
          <span class="pl-2">Clasificación de criticidad: {{data.criticidad}}</span>
        </div>
        <div class="width-auto pl-4">
          <img src="/icons/flag.svg" alt="Icono de listado"/>
          <span class="pl-2">Entorno: {{data.entorno}}</span>
        </div>
        <div class="width-auto pl-4">
          <img src="/icons/flag.svg" alt="Icono de listado"/>
          <span class="pl-2">
            RFO/CLP:
            <bbva-web-form-checkbox name="rfo_clp" :checked="data.rfo_clp"></bbva-web-form-checkbox>
          </span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import '@/components/bbva-web-components/bbva-button-default.js';
import '@/components/bbva-web-components/bbva-web-form-checkbox.js';
import { getModelAPI } from '@/requests/models';

export default {
  data() {
    return {
      data: {},
      id: null
    };
  },
  beforeMount() {
    this.id = this.$route.params.id;
    getModelAPI(this.id).then( (response) => {
      this.data = response.data;
    }).catch( (error) => {
      console.log(error);
    });
  },
  methods: {
    back() {
      this.$router('/setup/admin-models');
    }
  }
}
</script>
