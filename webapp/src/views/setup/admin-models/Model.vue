<template>
  <v-container class="pl-8 pb-12" fluid>
    <v-row>
      <v-col cols="12">
        <bbva-button-default
          variant="link"
          style="color: #1973B8"
          icon="bbva:return"
          text=" Volver a Administración de Modelos" 
          @click="back">
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
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Business Unit: {{data.bu}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">CFS: {{data.cfs}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Service Owner / Nombre y apellidos: {{data.service_owner}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Clasificación de criticidad: {{data.criticidad}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Entorno: {{data.entorno}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">
          <bbva-web-form-checkbox disabled name="rfo_clp" :checked="data.rfo_clp">RFO/CLP</bbva-web-form-checkbox>
        </span>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <span class="text-h6">Ventana</span>
      </v-col>
    </v-row>

    <v-row v-for="(ventana, index) in data.ventanas_general" :key="`row-ventana-${index}`">
      <v-col :class="styles.itemModel" lg="1" md="2">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Día inicio: {{ventana.dia_inicio}}</span>
      </v-col>
      <v-col :class="styles.itemModel" lg="1" md="2">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Hora inicio: {{ventana.hora_inicio}}</span>
      </v-col>
      <v-col :class="styles.itemModel" lg="1" md="2">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Dia fin: {{ventana.dia_fin}}</span>
      </v-col>
      <v-col :class="styles.itemModel" lg="1" md="2">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Hora fin: {{ventana.hora_fin}}</span>
      </v-col>
      <v-col class="width-auto ml-4" lg="1" md="2" style="display: block ruby" >
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">
          <bbva-web-form-checkbox disabled name="rfo_clp" :checked="ventana.dias_habiles">
            Día inhábiles
          </bbva-web-form-checkbox>
        </span>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <span class="text-h6">Datos de medición</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Estatus de modelo: {{data.estatus}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Estatus de medición: {{data.estatus_medicion}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Modelo: {{data.tipo_modelo}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Fuente: {{data.fuente}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Version: {{data.version}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Meta disponibilidad: {{data.meta_disponibilidad}}%</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Meta tiempo de respuesta: {{data.meta_tiempo_respuesta}}%</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">
          <bbva-web-form-checkbox disabled name="rfo_clp" :checked="data.niveles_servicio">
            Niveles de servicio
          </bbva-web-form-checkbox>
        </span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">
          <bbva-web-form-checkbox disabled name="rfo_clp" :checked="data.tiempos_respuesta">
            Tiempo de respuesta
          </bbva-web-form-checkbox>
        </span>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <span class="text-h6">Fechas</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col :class="styles.itemModel" lg="2" md="3">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Fecha alta: {{data.fecha_alta}}</span>
      </v-col>
      <v-col :class="styles.itemModel" lg="2" md="3">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Fecha de activación: {{data.fecha_activacion}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">
          Fecha de inicio de Periodo de Garantía: {{data.fecha_periodo_garantia}}
        </span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Fecha de inicio Oficial: {{data.fecha_inicio_oficial}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Fecha de inactivación: {{data.fecha_inactivacion}}</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <span class="text-h6">Partnership</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Partnership: {{data.partnership}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Estatus medición partnership: {{data.estatus_medicion_partnership}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">
          Meta Partnership Expected SLA: {{data.meta_partnership_expected}}
        </span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Meta Partnership Minimum SLA: {{data.mata_partnership_minimum}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Fecha de inicio partnership initial: {{data.fecha_inicio_partnership_initial}}</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Fecha de inicio partnership As Is: {{data.fecha_inicio_partnership_as_ls}}</span>
      </v-col>
    </v-row>

    <v-row class="pb-3">
      <v-col cols="12" class="d-flex">
        <bbva-button-default
          variant="link"
          style="color: #1973B8; padding-top: 5px;"
          :icon="showAdminSystems ? 'bbva:collapse' : 'bbva:expand'"
          text=""
          @click="() => showAdminSystems = ! showAdminSystems">
        </bbva-button-default>
        <span class="text-h6">Administración de sistemas</span>
      </v-col>
    </v-row>

    <v-row v-show="showAdminSystems" class="pb-6">
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Operativa:</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Elemento variable de cada fuente:</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Umbral TR:</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Elemento variable madre:</span>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row class="pb-3 pt-3">
      <v-col cols="12" class="d-flex">
        <bbva-button-default
          variant="link"
          style="color: #1973B8; padding-top: 5px;"
          :icon="showOperative ? 'bbva:collapse' : 'bbva:expand'"
          text=""
          @click="() => showOperative = ! showOperative">
        </bbva-button-default>
        <span class="text-h6">Operaciones transaccionales</span>
      </v-col>
    </v-row>

    <v-row v-show="showOperative" class="pb-6">
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Operativa:</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Elemento variable de cada fuente:</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Umbral TR:</span>
      </v-col>
      <v-col :class="styles.itemModel">
        <img src="/icons/flag.svg" alt="Icono de listado"/>
        <span class="pl-2">Elemento variable madre:</span>
      </v-col>
    </v-row>

    <v-divider></v-divider>

  </v-container>
</template>

<script>
import '@/components/bbva-web-components/bbva-button-default.js';
import '@/components/bbva-web-components/bbva-web-form-checkbox.js';
import { getModelAPI } from '@/requests/models';
import { ref } from 'vue';

export default {
  data() {
    return {
      data: {},
      id: null,
      showAdminSystems: false,
      showOperative: false,
      styles: {
        itemModel: ref('item-model')
      }
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
      this.$router.push('/setup/admin-models');
    }
  }
}
</script>

<style>
.item-model {
  display: block ruby;
  margin-left: 16px;
  width: 100%;
}
</style>
