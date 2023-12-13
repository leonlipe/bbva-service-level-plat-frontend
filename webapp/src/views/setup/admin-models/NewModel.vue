<template>
  <header-form-model stepValue="0"/>
  <v-container class="pl-8 pb-12" fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h5 font-weight-black">Datos del modelo</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-black">Datos CFS</span>
      </v-col>
    </v-row>

    <v-row >
      <v-col  sm="6" md="4" lg="3">
        <bbva-web-form-select
          key="input-bu-select"
          @change="(ev) => setValue('bu_id', ev.target.value)"
          :value="data.bu_id"
          :invalid="!!errors.bu_id"
          :error-message="errors.bu_id"
          label="Business Unit">
          <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
          <bbva-web-form-option
            v-for="option in catalogs.bu_id"
            :key="option.id"
            :value="option.id">{{option.label}}</bbva-web-form-option>
        </bbva-web-form-select>
      </v-col>
      <v-col  sm="6" md="4" lg="3">
        <bbva-web-form-select
          key="input-cfs-select"
          @change="(ev) => setValue('cfs_id', ev.target.value)"
          :value="data.cfs_id"
          :invalid="!!errors.cfs_id"
          :error-message="errors.cfs_id"
          label="CFS / Servicio">
          <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
          <bbva-web-form-option
            v-for="option in catalogs.cfs_id"
            :key="option.id"
            :value="option.id">{{option.label}}</bbva-web-form-option>
        </bbva-web-form-select>
      </v-col>
      <v-col  sm="6" md="4" lg="3">
        <bbva-web-form-select
          key="input-user-select"
          @change="(ev) => setValue('service_owner', ev.target.value)"
          :value="data.service_owner"
          :invalid="!!errors.service_owner"
          :error-message="errors.service_owner"
          label="Service Owner / Nombre y apellidos">
          <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
          <bbva-web-form-option
            v-for="option in catalogs.service_owner"
            :key="option.id"
            :value="option.id">{{option.label}}</bbva-web-form-option>
        </bbva-web-form-select>
      </v-col>
      <v-col  sm="6" md="4" lg="3">
        <bbva-web-form-select
          key="input-criticidad-select"
          @change="(ev) => setValue('criticidad_id', ev.target.value)"
          :value="data.criticidad_id"
          :invalid="!!errors.criticidad_id"
          :error-message="errors.criticidad_id"
          label="Clasificación criticidad">
          <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
          <bbva-web-form-option
            v-for="option in catalogs.criticidad_id"
            :key="option.id"
            :value="option.id">{{option.label}}</bbva-web-form-option>
        </bbva-web-form-select>
      </v-col>
      <v-col sm="6" md="4" lg="3">
        <bbva-web-form-select
          key="input-entorno-select"
          @change="(ev) => setValue('entorno_id', ev.target.value)"
          :value="data.entorno_id"
          :invalid="!!errors.entorno_id"
          :error-message="errors.entorno_id"
          label="Entorno">
          <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
          <bbva-web-form-option
            v-for="option in catalogs.entorno_id"
            :key="option.id"
            :value="option.id">{{option.label}}</bbva-web-form-option>
        </bbva-web-form-select>
      </v-col>
      <v-col md="2" lg="1">
        <bbva-web-form-checkbox
          class="pt-3"
          @change="(ev) => setValue('rfo_clp', ev.target.checked)"
          name="rfo_clp" :checked="data.rfo_clp">
          RFO/CLP
        </bbva-web-form-checkbox>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-black">Ventanas General</span>
      </v-col>
    </v-row>

    <v-row v-for="(ventana, index) in data.ventanas_general" :key="`row-ventana-${index}`">
      <v-col  sm="6" md="4" lg="2" xl="1">
        <bbva-form-time
          :class="styles.textInput"
          :required="true"
          :value="ventana.hora_inicio"
          @input="(ev) => setVentanaValue('hora_inicio', index, ev.target.value)"
          :invalid="!!getVentanaError('hora_inicio', index)"
          :error-message="getVentanaError('hora_inicio', index)"
          label="Hora inicio"></bbva-form-time>
      </v-col>
      <v-col  sm="6" md="4" lg="3" xl="2">
        <bbva-web-form-select
          key="input-entorno-select"
          @change="(ev) => setVentanaValue('dia_inicio', index, ev.target.value)"
          :value="ventana.dia_inicio"
          :invalid="!!getVentanaError('dia_inicio', index)"
          :error-message="getVentanaError('dia_inicio', index)"
          label="Día de inicio">
          <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
          <bbva-web-form-option
            v-for="option in catalogs.days"
            :key="option.id"
            :value="option.id">{{option.label}}</bbva-web-form-option>
        </bbva-web-form-select>
      </v-col>

      <v-col  sm="6" md="4" lg="2" xl="1">
        <bbva-form-time
          :class="styles.textInput"
          :value="ventana.hora_fin"
          @input="(ev) => setVentanaValue('hora_fin', index, ev.target.value)"
          :invalid="!!getVentanaError('hora_fin', index)"
          :error-message="getVentanaError('hora_fin', index)"
          label="Hora fin" :required="true"></bbva-form-time>
      </v-col>

      <v-col  sm="6" md="4" lg="3" xl="2">
        <bbva-web-form-select
          key="input-entorno-select"
          @change="(ev) => setVentanaValue('dia_fin', index, ev.target.value)"
          :value="ventana.dia_fin"
          :invalid="!!getVentanaError('dia_fin', index)"
          :error-message="getVentanaError('dia_fin', index)"
          label="Día fin">
          <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
          <bbva-web-form-option
            v-for="option in catalogs.days"
            :key="option.id"
            :value="option.id">{{option.label}}</bbva-web-form-option>
        </bbva-web-form-select>
      </v-col>
      <v-col  sm="6" md="4" lg="2" xl="1">
        <bbva-web-form-checkbox
          class="pt-3"
          @change="(ev) => setVentanaValue( 'dias_inhabiles', index,  ev.target.checked)"
          :invalid="!!getVentanaError('dias_inhabiles', index)"
          :error-message="getVentanaError('dias_inhabiles', index)"
          name="dias_inhabiles" :checked="ventana.dias_inhabiles">
          Días inhabiles
        </bbva-web-form-checkbox>
      </v-col>
      <v-col  sm="6" md="4" lg="2" xl="1">
        <bbva-button-default
           v-if="index != 0"
          text=""
          variant="link"
          style="color: #1973B8; padding-bottom: 10px"
          class="pt-3"
          icon="bbva:trash"
          @click="() => removeWindow(index)">
        </bbva-button-default>
      </v-col>
    </v-row> 

  <v-row> 
    <v-col cols="12">
      <bbva-button-default
        text="Añadir ventana"
        variant="link"
			  style="color: #1973B8; display: flex; gap: 8px;"
        icon="bbva:add"
        @click="addWindow">
      </bbva-button-default>
    </v-col>
  </v-row> 

    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-black">Datos de medición</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col  sm="6" md="4" lg="3">
        <bbva-web-form-select
          key="input-bu-select"
          @change="(ev) => setValue('estatus_id', ev.target.value)"
          :value="data.estatus_id"
          :invalid="!!errors.estatus_id"
          :error-message="errors.estatus_id"
          label="Estatus de modelo">
          <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
          <bbva-web-form-option
            v-for="option in catalogs.estatus_id"
            :key="option.id"
            :value="option.id">{{option.label}}</bbva-web-form-option>
        </bbva-web-form-select>
      </v-col>
      <v-col  sm="6" md="4" lg="3">
        <bbva-web-form-select
          key="input-status-measurement-select"
          @change="(ev) => setValue('estatus_medicion_id', ev.target.value)"
          :value="data.estatus_medicion_id"
          :invalid="!!errors.estatus_medicion_id"
          :error-message="errors.estatus_medicion_id"
          label="Estatus de medición">
          <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
          <bbva-web-form-option
            v-for="option in catalogs.estatus_medicion_id"
            :key="option.id"
            :value="option.id">{{option.label}}</bbva-web-form-option>
        </bbva-web-form-select>
      </v-col>

      <v-col  sm="6" md="4" lg="3">
        <bbva-web-form-select
          key="input-tipo-modelo-select"
          @change="(ev) => setValue('tipo_modelo_id', ev.target.value)"
          :value="data.tipo_modelo_id"
          :invalid="!!errors.tipo_modelo_id"
          :error-message="errors.tipo_modelo_id"
          label="Modelo">
          <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
          <bbva-web-form-option
            v-for="option in catalogs.tipo_modelo_id"
            :key="option.id"
            :value="option.id">{{option.label}}</bbva-web-form-option>
        </bbva-web-form-select>
      </v-col>
      <v-col sm="6" md="4" lg="3">
        <bbva-web-form-select
          key="input-fuente-select"
          @change="(ev) => setValue('fuente_id', ev.target.value)"
          :value="data.fuente_id"
          :invalid="!!errors.fuente_id"
          :error-message="errors.fuente_id"
          label="Fuente">
          <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
          <bbva-web-form-option
            v-for="option in catalogs.fuente_id"
            :key="option.id"
            :value="option.id">{{option.label}}</bbva-web-form-option>
        </bbva-web-form-select>
      </v-col>
      <v-col  sm="6" md="4" lg="3">
        <bbva-web-form-text
          key="input-version-text"
          :class="styles.textInput"
          @input="(ev) => setValue('version' ,ev.target.value)"
          :value="data.version"
          :invalid="errors.version"
          :error-message="errors.version"
          label="Versión"></bbva-web-form-text>
      </v-col>
      <v-col  sm="6" md="4" lg="3">
        <bbva-web-form-number
          key="input-meta-disponibilidad-number"
          :class="styles.textInput"
          @input="(ev) => setValue('meta_disponibilidad', ev.target.value)"
          :value="data.meta_disponibilidad"
          :invalid="!!errors.meta_disponibilidad"
          :error-message="errors.meta_disponibilidad"
          label="Meta disponibilidad"></bbva-web-form-number>
      </v-col>
      <v-col  sm="6" md="4" lg="3">
         <bbva-web-form-number
          :class="styles.textInput"
          key="input-meta-respuesta-number"
          @input="(ev) => setValue('meta_tiempo_respuesta', ev.target.value)"
          :value="data.meta_tiempo_respuesta"
          :invalid="!!errors.meta_tiempo_respuesta"
          :error-message="errors.meta_tiempo_respuesta"
          label="Meta tiempo de respuesta %"></bbva-web-form-number>
      </v-col>
      <v-col sm="6" md="4" lg="3" xl="2">
        <bbva-web-form-checkbox
          class="pt-3"
          @change="(ev) => setValue('niveles_servicio', ev.target.checked)"
          name="nuveles_servicio" :checked="data.niveles_servicio">
          Datos de medición
        </bbva-web-form-checkbox>
      </v-col>
      <v-col sm="6" md="4" lg="3" xl="2">
        <bbva-web-form-checkbox
          class="pt-3"
          @change="(ev) => setValue('tiempos_respuesta', ev.target.checked)"
          name="tiempos_respuesta" :checked="data.tiempos_respuesta">
          Tiempos de respuesta
        </bbva-web-form-checkbox>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-black">Fechas</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="6" md="4" lg="3">
        <date-picker
          label="Fecha de alta"
          :value="data.fecha_alta"
          :invalid="!!errors.fecha_alta"
          :errorMessage="errors.fecha_alta"
          @value-change="(ev) => setValue('fecha_alta', ev.target.value)"
        />
      </v-col>
      <v-col sm="6" md="4" lg="3">
        <date-picker
          label="Fecha de activación"
          :value="data.fecha_activacion"
          :invalid="!!errors.fecha_activacion"
          :errorMessage="errors.fecha_activacion"
          @value-change="(ev) => setValue('fecha_activacion', ev.target.value)"
        />
      </v-col>
      <v-col sm="6" md="4" lg="3">
        <date-picker
          label="Fecha de inicio Periodo de Garantía"
          :value="data.fecha_periodo_garantia"
          :invalid="!! errors.fecha_periodo_garantia"
          :errorMessage="errors.fecha_periodo_garantia"
          @value-change="(ev) => setValue('fecha_periodo_garantia', ev.target.value)"
        />
      </v-col>
      <v-col sm="6" md="4" lg="3">
        <date-picker
          label="Fecha de inicio Oficial"
          :value="data.fecha_inicio_oficial"
          :invalid="!!errors.fecha_inicio_oficial"
          :errorMessage="errors.fecha_inicio_oficial"
          :max="max"
          @value-change="(ev) => setValue('fecha_inicio_oficial', ev.target.value)"
        />
      </v-col>
      <v-col sm="6" md="4" lg="3">
        <date-picker
          label="Fecha de inactivación"
          :value="data.fecha_inactivacion"
          :invalid="!!errors.fecha_inactivacion"
          :errorMessage="errors.fecha_inactivacion"
          :max="max"
          @value-change="(ev) => setValue('fecha_inactivacion', ev.target.value)"
        />
      </v-col>
      <v-col sm="6" md="4" lg="3">
        <date-picker
          label="Fecha de inicio de versión"
          :value="data.fecha_inicio_version"
          :invalid="errors.fecha_inicio_version"
          :errorMessage="errors.fecha_inicio_version"
          :max="max"
          @value-change="(ev) => setValue('fecha_inicio_version', ev.target.value)"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-black">Partnership</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="6" md="4" lg="3">
        <bbva-web-form-select
          key="partnership_select"
          @change="(ev) => setValue('partnership_id', ev.target.value)"
          :value="data.partnership_id"
          :invalid="!!errors.partnership_id"
          :error-message="errors.partnership_id"
          label="Partnership">
          <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
          <bbva-web-form-option
            v-for="option in catalogs.partnership_id"
            :key="option.id"
            :value="option.id">{{option.label}}</bbva-web-form-option>
        </bbva-web-form-select>
      </v-col>
      <v-col sm="6" md="4" lg="3">
        <bbva-web-form-select
          key="estatus_medicion_partnership_id"
          @change="(ev) => setValue('estatus_medicion_partnership_id', ev.target.value)"
          :value="data.estatus_medicion_partnership_id"
          :invalid="!!errors.estatus_medicion_partnership_id"
          :error-message="errors.estatus_medicion_partnership_id"
          label="Estatus Medición Partnership">
          <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
          <bbva-web-form-option
            v-for="option in catalogs.estatus_medicion_partnership_id"
            :key="option.id"
            :value="option.id">{{option.label}}</bbva-web-form-option>
        </bbva-web-form-select>
      </v-col>
      <v-col  sm="6" md="4" lg="3">
        <bbva-web-form-text
          key="input-meta_partnership_expected-text"
          :class="styles.textInput"
          @input="(ev) => setValue('meta_partnership_expected', ev.target.value)"
          :value="data.meta_partnership_expected"
          :invalid="errors.meta_partnership_expected"
          :error-message="errors.meta_partnership_expected"
          label="Meta Partnership Expected SLA"></bbva-web-form-text>
      </v-col>
      <v-col sm="6" md="4" lg="3">
        <bbva-web-form-text
          :class="styles.textInput"
          key="input-meta_partnership_minimum-text"
          @input="(ev) => setValue('meta_partnership_minimum', ev.target.value)"
          :value="data.meta_partnership_minimum"
          :invalid="errors.meta_partnership_minimum"
          :error-message="errors.meta_partnership_minimum"
          label="Meta Partnership Minimum SLA"></bbva-web-form-text>
      </v-col>
      <v-col sm="6" md="4" lg="3">
        <date-picker
          label="Fecha de inicio partnership Initial"
          :value="data.fecha_inicio_partnership_initial"
          :invalid="!!errors.fecha_inicio_partnership_initial"
          :errorMessage="errors.fecha_inicio_partnership_initial"
          @value-change="(ev) => setValue('fecha_inicio_partnership_initial', ev.target.value)"
        />
      </v-col>
      <v-col sm="6" md="4" lg="3">
        <date-picker
          label="Fecha de inicio partnership As Is"
          :value="data.fecha_inicio_partnership_as_ls"
          :invalid="!!errors.fecha_inicio_partnership_as_ls"
          :errorMessage="errors.fecha_inicio_partnership_as_ls"
          @value-change="(ev) => setValue('fecha_inicio_partnership_as_ls', ev.target.value)"
        />
      </v-col>
    </v-row>

    <v-row align-content="center">
      <v-col sm="6" md="2" lg="1" xl="1">
        <bbva-button-default
          text="Continuar"
          :disabled="!valid"
          @click="onSubmit">
        </bbva-button-default>
      </v-col>
      <v-col sm="6" md="2" lg="1" xl="1" align-self="center">
        <bbva-button-default
          text="Cancelar"
          variant="link"
          @click="back">
        </bbva-button-default>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {
  dataFirstSection, dataSecondSection, dataCBPS, dataOperativa, dataVentana, days,
  validateFirstSection, validationsVentana
} from '@/constants/model';
import '@/components/bbva-web-components/bbva-web-form-select.js'
import '@/components/bbva-web-components/bbva-web-form-checkbox.js';
import '@/components/bbva-web-components/bbva-web-form-text.js'
import '@/components/bbva-web-components/bbva-web-form-number.js'
import DatePicker from '@/components/forms/DatePicker.vue'
import HeaderFormModel from '@/components/headers/HeaderFormModel.vue'
import '@/components/bbva-web-components/bbva-form-time.js'
import '@/components/bbva-web-components/bbva-button-default.js'
import { getBusinessUnitsAPI } from '@/requests/businessUnit';
import { getCfsesAPI } from '@/requests/cfs';
import { getListUserNamesAPI } from '@/requests/users';
import { getCriticalitiesAPI } from '@/requests/criticality';
import { parseCatalog } from '@/utils/form';
import { getEnvironmentsAPI } from '@/requests/environments';
import { getMeasurementStatusesAPI } from '@/requests/measurementStatus';
import { getSourceModelsAPI } from '@/requests/sourceModel';
import { getStatusModelAPI } from '@/requests/statusModel';
import { getTypesModelsAPI } from '@/requests/typeModel';
import { getPartnershipAPI } from "@/requests/partnership";
import { getPartnershipMeasurementAPI } from "@/requests/partnershipMeasurement";
import { ref } from 'vue';

export default {
  data() {
    return {
      data: {
        ...dataFirstSection,
      },
      valid: true,
      styles: {
        textInput: ref('text-input'),
      },
      errors: {},
      validations: {
       ...validateFirstSection,
        ventanas_general: {...validationsVentana}
      },
      catalogs: {}
    };
  },
  beforeMount() {
    this.loadCatalogs();
  },
  components: {
    DatePicker,
    HeaderFormModel
  },
  methods: {
    onSubmit() {
      this.$router.push('/setup/admin-models/elements');
    },
    removeWindow(index) {
      this.data.ventanas_general.splice(index,1);
    },
    back() {
      this.$router.push('/setup/admin-models');
    },
    addWindow() {
      this.data.ventanas_general.push(
        { ...dataVentana }
      );
    },
    loadCatalogs() {
      [
        {request: getBusinessUnitsAPI, key: 'bu_id'},
        {request: getCfsesAPI, key: 'cfs_id' },
        {request: getListUserNamesAPI, key: 'service_owner'},
        {request: getCriticalitiesAPI, key: 'criticidad_id'},
        {request: getEnvironmentsAPI, key: 'entorno_id'},
        {request: getMeasurementStatusesAPI, key: 'estatus_medicion_id' },
        {request: getSourceModelsAPI, key: 'fuente_id'},
        {request: getStatusModelAPI, key: 'estatus_id'},
        {request: getTypesModelsAPI, key: 'tipo_modelo_id'},
        {request: getPartnershipAPI, key: 'partnership_id'},
        {request: getPartnershipMeasurementAPI, key: 'estatus_medicion_partnership_id'}
      ].forEach( ({ request, key }) => {
        request().then((response) => {
          this.catalogs[key] = parseCatalog(response.data) ;
        }).catch((error) => {
          console.log(error);
        });
      });
     this.catalogs.days = days;

    },
    setValue(key, value) {
      this.data[key] = value;
      this.errors[key] = this.validations[key](value);
    },
    setVentanaValue(key, index, value) {
      const indexKey = `${index}`;

      this.data.ventanas_general[index][key] = value;

      if( !this.errors.ventana ) {
        this.errors.ventana = {};
      }
      if( !this.errors.ventana[indexKey] ) {
        this.errors.ventana[indexKey] = {};
      }
      this.errors.ventana[indexKey][key] = this.validations.ventanas_general[key](
        this.data.ventanas_general[index][key]
      );
    },
    getVentanaError(key, index) {
      const indexKey = `${index}`;
      if( this.errors.ventana && this.errors.ventana[indexKey] ) {
        return this.errors.ventana[indexKey][key];
      }
      return '';
    },
  }
}
</script>

<style>
  .text-input input {
    position: absolute;
    top: 20%;
    left: 5%;
  }
	.fs-14 {
		font-size: 14px;
	}
</style>
