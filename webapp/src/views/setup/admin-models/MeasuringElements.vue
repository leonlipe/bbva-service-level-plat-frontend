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
				<span class="text-h6">1 de 2</span>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<span class="text-h5 font-weight-black">Elementos de medición</span>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<bbva-web-notification-message style="padding-top: 5px; padding-left: 10px;">
					<p>Todos los campos son obligatorios para poder avanzar</p>
				</bbva-web-notification-message>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<span class="text-h6 font-weight-black">Resumen Modelo paso 1</span>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="2">
				<span class="text fs-14">Business Unit: Mexico</span>
			</v-col>
			<v-col cols="2">
				<span class="text fs-14">CFS: App Empresas</span>
			</v-col>
			<v-col cols="3">
				<span class="text fs-14">Estatus de medición: Periodo de garantía</span>
			</v-col>
			<v-col cols="2">
				<span class="text fs-14">Fuente: App Empresas: DCRUM</span>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12" style="display: flex;gap: 10px;align-items: center;">
				<span class="text-h5 font-weight-black">Business Unit y CBPS</span>
				<bbva-button-default
					text="Añadir CBP"
					style="color: #1973B8; display: flex; gap: 8px;"
					icon="bbva:add"
					variant="link"
					@click="addRowCPBS">
				</bbva-button-default>
			</v-col>
			<v-col cols="12">
				<span class="text fs-14">Crea CBPS y añade las operativas con sus datos necesarias</span>
			</v-col>
		</v-row>

		<v-container v-for="(CPBS, index) in CPBS" class="mx-5" style="max-width: 100%;">
			<v-row>
				<v-col cols="3">
					<span class="text-h6 font-weight-black">- CBP {{ index + 1 }}</span>
				</v-col>
			</v-row>
			<v-row>
				<v-col  sm="6" md="4" lg="3">
					<bbva-web-form-text
						key="input-version-text"
						class="input-text"
						@input="(ev) => data.firstSection.version = ev.target.value"
						:value="data.firstSection.version"
						:invalid="errors.version"
						:error-message="errors.version"
						label="Nombre de CBP"></bbva-web-form-text>
				</v-col>
				<v-col  sm="6" md="4" lg="3" align-self="center">
					<bbva-button-default
						text="Eliminar CBP"
						style="color: #1973B8; display: flex; gap: 8px;"
						icon="bbva:trash"
						variant="link"
						:disabled="index === 0"
						@click="deleteRowCPBS">
					</bbva-button-default>
				</v-col>
			</v-row>
			<v-row v-for="(input, index) in inputs">
				<v-col cols="12">
					<span class="text fs-14">Operativa {{ index + 1 }}</span>
				</v-col>
				<v-col  sm="6" md="4" lg="3">
					<bbva-web-form-text
						key="input-version-text"
						class="input-text"
						@input="(ev) => data.firstSection.version = ev.target.value"
						:value="data.firstSection.version"
						:invalid="errors.version"
						:error-message="errors.version"
						label="Nombre operativa"></bbva-web-form-text>
				</v-col>
				<v-col  sm="6" md="4" lg="3">
					<bbva-web-form-text
						key="input-version-text"
						class="input-text"
						@input="(ev) => data.firstSection.version = ev.target.value"
						:value="data.firstSection.version"
						:invalid="errors.version"
						:error-message="errors.version"
						label="Elemento variante de cada fuente"></bbva-web-form-text>
				</v-col>
				<v-col  sm="6" md="4" lg="3">
					<bbva-web-form-text
						key="input-version-text"
						class="input-text"
						@input="(ev) => data.firstSection.version = ev.target.value"
						:value="data.firstSection.version"
						:invalid="errors.version"
						:error-message="errors.version"
						label="Umbral TR"></bbva-web-form-text>
				</v-col>
				<v-col  sm="6" md="4" lg="2" class="py-0" style="text-align: center;">
					<span class="">Elemento variable madre</span>
					<div role="radiogroup" class="radio-custom-grid">
						<bbva-web-form-radio-button name="options" value="1">Si</bbva-web-form-radio-button>
						<bbva-web-form-radio-button name="options" value="2">No</bbva-web-form-radio-button>
					</div>
				</v-col>
				<v-col  sm="1" md="1" lg="1">
					<bbva-button-default
						text=""
						style="color: #1973B8"
						icon="bbva:trash"
						variant="link"
						:disabled="index === 0"
						@click="deleteRow">
					</bbva-button-default>
				</v-col>

			</v-row>
			<v-row>
				<v-col sm="6" md="4" lg="1" align-self="center">
					<bbva-button-default
						text="Añadir operativa"
						style="color: #1973B8; display: flex; gap: 8px;"
						icon="bbva:add"
						variant="link"
						@click="addRow">
					</bbva-button-default>
				</v-col>
			</v-row>
		</v-container>

		<v-divider class="my-5"></v-divider>

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
					style="color: #1973B8"
					class="btn-cancel font-weight-black"
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
import '@/components/bbva-web-components/bbva-web-form-radio-button.js'
import '@/components/bbva-web-components/bbva-button-default.js'
import '@/components/bbva-web-components/bbva-progress-multistep-bar.js'
import '@/components/bbva-web-components/bbva-web-notification-message.js'
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
			catalogs: {},
			CPBS: [1],
			inputs: [1],
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
		addRowCPBS() {
			this.CPBS.push({
        one: '',
        two: ''
      })
		},
		addRow() {
      this.inputs.push({
        one: '',
        two: ''
      })
    },
		deleteRowCPBS(index) {
			this.CPBS.splice(index,1)
		},
		deleteRow(index) {
      this.inputs.splice(index,1)
    },
		onSubmit() {},
		cancel () {}
	}
}
</script>

<style>
	.fs-14 {
		font-size: 14px;
	}
	.btn-cancel {
		margin: 10px 0;
	}
	.input-text input {
		margin-left: 17px;
    margin-top: 12px;
	}
	.radio-custom-grid {
		display: flex;
    justify-content: space-around;
	}
</style>
	