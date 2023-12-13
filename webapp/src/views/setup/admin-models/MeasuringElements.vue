<template>
	<v-container class="pl-8 pb-12" fluid>
		<v-row>
			<v-col cols="12">
				<bbva-progress-multistep-bar style="margin: 0" accessibility-text="50" value="50">
				</bbva-progress-multistep-bar>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<span class="text-h5">Datos del modelo</span>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<span class="text-h6">Datos CFS</span>
			</v-col>
		</v-row>

		<v-row >
			<v-col  sm="6" md="4" lg="3">
				<bbva-web-form-select
					key="input-bu-select"
					@change="(ev) => data.firstSection.bu_id = ev.target.value"
					:value="data.firstSection.bu_id"
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
					@change="(ev) => data.firstSection.cfs_id = ev.target.value"
					:value="data.firstSection.cfs_id"
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
					@change="(ev) => data.firstSection.service_owner = ev.target.value"
					:value="data.firstSection.service_owner"
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
					@change="(ev) => data.firstSection.criticidad_id = ev.target.value"
					:value="data.firstSection.criticidad_id"
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
					@change="(ev) => data.firstSection.entorno_id = ev.target.value"
					:value="data.firstSection.entorno_id"
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
					@change="(ev) => data.firstSection.rfo_clp = ev.target.checked"
					name="rfo_clp" :checked="data.firstSection.rfo_clp">
					RFO/CLP
				</bbva-web-form-checkbox>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<span class="text-h6">Ventana</span>
			</v-col>
		</v-row>

		<v-row v-for="(ventana, index) in data.ventanas_general" :key="`row-ventana-${index}`">
			<v-col>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<span class="text-h6">Datos de medición</span>
			</v-col>
		</v-row>

		<v-row>
			<v-col  sm="6" md="4" lg="3">
				<bbva-web-form-select
					key="input-bu-select"
					@change="(ev) => data.firstSection.estatus_id = ev.target.value"
					:value="data.firstSection.estatus_id"
					:invalid="!!errors.estatus_id"
					:error-message="errors.estatus_id"
					label="Business Unit">
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
					@change="(ev) => data.firstSection.estatus_medicion_id = ev.target.value"
					:value="data.firstSection.estatus_medicion_id"
					:invalid="!!errors.estatus_medicion_id"
					:error-message="errors.estatus_medicion_id"
					label="CFS / Servicio">
					<bbva-web-form-option value="">Ninguno</bbva-web-form-option>
					<bbva-web-form-option
						v-for="option in catalogs.estatus_medicion_id"
						:key="option.id"
						:value="option.id">{{option.label}}</bbva-web-form-option>
				</bbva-web-form-select>
			</v-col>
			<v-col sm="6" md="4" lg="3">
				<bbva-web-form-select
					key="input-fuente-select"
					@change="(ev) => data.firstSection.fuente_id = ev.target.value"
					:value="data.firstSection.fuente_id"
					:invalid="!!errors.fuente_id"
					:error-message="errors.fuente_id"
					label="Service Owner / Nombre y apellidos">
					<bbva-web-form-option value="">Ninguno</bbva-web-form-option>
					<bbva-web-form-option
						v-for="option in catalogs.fuente_id"
						:key="option.id"
						:value="option.id">{{option.label}}</bbva-web-form-option>
				</bbva-web-form-select>
			</v-col>
			<v-col  sm="6" md="4" lg="3">
				<bbva-web-form-select
					key="input-tipo-modelo-select"
					@change="(ev) => data.firstSection.tipo_modelo_id = ev.target.value"
					:value="data.firstSection.tipo_modelo_id"
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
			<v-col  sm="6" md="4" lg="3">
				<bbva-web-form-text
					key="input-version-text"
					@input="(ev) => data.firstSection.version = ev.target.value"
					:value="data.firstSection.version"
					:invalid="errors.version"
					:error-message="errors.version"
					label="Versión"></bbva-web-form-text>
			</v-col>
			<v-col  sm="6" md="4" lg="3">
				<bbva-web-form-number
					key="input-meta-disponibilidad-number"
					@input="(ev) => data.firstSection.meta_disponibilidad"
					:value="data.firstSection.meta_disponibilidad"
					:invalid="!!errors.meta_disponibilidad"
					:error-message="errors.meta_disponibilidad"
					label="Meta disponibilidad"></bbva-web-form-number>
			</v-col>
			<v-col  sm="6" md="4" lg="3">
					<bbva-web-form-number
					key="input-meta-respuesta-number"
					@input="(ev) => data.firstSection.meta_tiempo_respuesta"
					:value="data.firstSection.meta_tiempo_respuesta"
					:invalid="!!errors.meta_tiempo_respuesta"
					:error-message="errors.meta_tiempo_respuesta"
					label="Meta tiempo de respuesta %"></bbva-web-form-number>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<span class="text-h6">Fechas</span>
			</v-col>
		</v-row>

		<v-row>
			<v-col sm="6" md="4" lg="3">
				<bbva-web-form-date custom
					label="Fecha de alta"
					:value="valueAsStr"
					:min="min"
					class="date-input"
					:invalid="invalid"
					:error-message="errorMessage"
					:max="max"
					@value-change="(ev) => data.firstSection.fecha_alta = ev.target.value"
				/>
			</v-col>
			<v-col sm="6" md="4" lg="3">
				<bbva-web-form-date custom
					label="Fecha de activación"
					:value="valueAsStr"
					:min="min"
					class="date-input"
					:invalid="invalid"
					:error-message="errorMessage"
					:max="max"
					@value-change="(ev) => data.firstSection.fecha_activacion = ev.target.value"
				/>
			</v-col>
			<v-col sm="6" md="4" lg="3">
				<bbva-web-form-date custom
					label="Fecha de inicio Periodo de Garantía"
					:value="valueAsStr"
					:min="min"
					class="date-input"
					:invalid="invalid"
					:error-message="errorMessage"
					:max="max"
					@value-change="(ev) => data.firstSection.fecha_periodo_garantia = ev.target.value"
				/>
			</v-col>
			<v-col sm="6" md="4" lg="3">
				<bbva-web-form-date custom
					label="Fecha de inicio Oficial"
					:value="valueAsStr"
					:min="min"
					class="date-input"
					:invalid="invalid"
					:error-message="errorMessage"
					:max="max"
					@value-change="(ev) => data.firstSection.fecha_inicio_oficial = ev.target.value"
				/>
			</v-col>
			<v-col sm="6" md="4" lg="3">
				<bbva-web-form-date custom
					label="Fecha de inactivación"
					:value="valueAsStr"
					:min="min"
					class="date-input"
					:invalid="invalid"
					:error-message="errorMessage"
					:max="max"
					@value-change="(ev) => data.firstSection.fecha_inactivacion = ev.target.value"
				/>
			</v-col>
			<v-col sm="6" md="4" lg="3">
				<bbva-web-form-date custom
					label="Fecha de inicio de versión"
					:value="valueAsStr"
					:min="min"
					class="date-input"
					:invalid="invalid"
					:error-message="errorMessage"
					:max="max"
					@value-change="(ev) => data.firstSection.fecha_inicio_version = ev.target.value"
				/>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<span class="text-h6">Partnership</span>
			</v-col>
		</v-row>

		<v-row>
			<v-col sm="6" md="4" lg="3">
				<bbva-web-form-select
					key="partnership_select"
					@change="(ev) => data.firstSection.partnership_id = ev.target.value"
					:value="data.firstSection.partnership_select"
					:invalid="!!errors.partnership_select"
					:error-message="errors.partnership_select"
					label="Partnership">
					<bbva-web-form-option value="">Ninguno</bbva-web-form-option>
					<bbva-web-form-option
						v-for="option in catalogs.partnership_select"
						:key="option.id"
						:value="option.id">{{option.label}}</bbva-web-form-option>
				</bbva-web-form-select>
			</v-col>
			<v-col sm="6" md="4" lg="3">
				<bbva-web-form-select
					key="partnership_measurement_select"
					@change="(ev) => data.firstSection.estatus_medicion_partnership_id = ev.target.value"
					:value="data.firstSection.partnership_measurement_select"
					:invalid="!!errors.partnership_measurement_select"
					:error-message="errors.partnership_measurement_select"
					label="Estatus Medición Partnership">
					<bbva-web-form-option value="">Ninguno</bbva-web-form-option>
					<bbva-web-form-option
						v-for="option in catalogs.partnership_measurement_select"
						:key="option.id"
						:value="option.id">{{option.label}}</bbva-web-form-option>
				</bbva-web-form-select>
			</v-col>
			<v-col  sm="6" md="4" lg="3">
				<bbva-web-form-text
					key="input-meta_partnership_expected-text"
					@input="(ev) => data.firstSection.meta_partnership_expected = ev.target.value"
					:value="data.firstSection.meta_partnership_expected"
					:invalid="errors.meta_partnership_expected"
					:error-message="errors.meta_partnership_expected"
					label="Meta Partnership Expected SLA"></bbva-web-form-text>
			</v-col>
			<v-col sm="6" md="4" lg="3">
				<bbva-web-form-text
					key="input-meta_partnership_minimum-text"
					@input="(ev) => data.firstSection.meta_partnership_minimum = ev.target.value"
					:value="data.firstSection.meta_partnership_minimum"
					:invalid="errors.meta_partnership_minimum"
					:error-message="errors.meta_partnership_minimum"
					label="Meta Partnership Minimum SLA"></bbva-web-form-text>
			</v-col>
			<v-col sm="6" md="4" lg="3">
				<bbva-web-form-date custom
					label="Fecha de inicio partnership Initial"
					:value="valueAsStr"
					:min="min"
					class="date-input"
					:invalid="invalid"
					:error-message="errorMessage"
					:max="max"
					@value-change="(ev) => data.firstSection.fecha_inicio_partnership_initial = ev.target.value"
				/>
			</v-col>
			<v-col sm="6" md="4" lg="3">
				<bbva-web-form-date custom
					label="Fecha de inicio partnership As Is"
					:value="valueAsStr"
					:min="min"
					class="date-input"
					:invalid="invalid"
					:error-message="errorMessage"
					:max="max"
					@value-change="(ev) => data.firstSection.fecha_inicio_partnership_as_ls = ev.target.value"
				/>
			</v-col>
		</v-row>

		<v-row align-content="center">
			<v-col sm="6" md="4" lg="2">
				<bbva-button-default
					text="Continuar"
					:disabled="!valid"
					@click="onSubmit">
				</bbva-button-default>
			</v-col>
			<v-col sm="6" md="4" lg="1" align-self="center">
				<bbva-button-default
					text="Cancelar"
					class="btn-cancel"
					variant="link"
					@click="cancel">
				</bbva-button-default>
			</v-col>
		</v-row>

	</v-container>
</template>

<script>
import {
	dataFirstSection, dataSecondSection, dataCBPS, dataOperativa, dataVentana
} from '@/constants/model';
import '@/components/bbva-web-components/bbva-web-form-select.js'
import '@/components/bbva-web-components/bbva-web-form-checkbox.js';
import '@/components/bbva-web-components/bbva-web-form-text.js'
import '@/components/bbva-web-components/bbva-web-form-number.js'
import '@/components/bbva-web-components/bbva-web-form-date.js'
import '@/components/bbva-web-components/bbva-button-default.js'
import '@/components/bbva-web-components/bbva-progress-multistep-bar.js'
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

export default {
	data() {
		return {
			data: {
				firstSection: { ...dataFirstSection}
			},
			errors: {},
			catalogs: {}
		};
	},
	beforeMount() {
		this.loadCatalogs();
	},
	computed: {
		valueAsStr () { return this.value }
	},
	methods: {
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
				{request: getPartnershipAPI, key: 'partnership_select'},
				{request: getPartnershipMeasurementAPI, key: 'partnership_measurement_select'}
			].forEach( ({ request, key }) => {
				request().then((response) => {
					this.catalogs[key] = parseCatalog(response.data) ;
				}).catch((error) => {
					console.log(error);
				});
			});

					console.log(this.catalogs);
		},
		onSubmit() {},
		cancel () {}
	}
}
</script>

<style>
	.date-input input {
		position: absolute;
		top: 20%;
		left: 5%;
	}
	.btn-cancel {
		margin: 10px 0;
	}
</style>
	