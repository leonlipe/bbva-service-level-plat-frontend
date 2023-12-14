<template>
  <header-form-model stepValue="50"/>
	<v-container class="pl-8 pb-12" fluid>
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

		<v-container v-for="(CPBS, indexCbps) in CPBS" class="mx-5" style="max-width: 100%;">
			<v-row>
				<v-col cols="3">
					<span class="text-h6 font-weight-black">- CBP {{ indexCbps + 1 }}</span>
				</v-col>
			</v-row>
			<v-row>
				<v-col  sm="6" md="4" lg="3">
					<bbva-web-form-text
						key="input-name-cbp-text"
						class="input-text"
						@input="(ev) => setValueCBPS(indexCbps, 'name_cbp', ev.target.value)"
						:value="data.cbps[indexCbps].name_cbp"
						:invalid="errors.name_cbp"
						:error-message="errors.name_cbp"
						label="Nombre de CBP"></bbva-web-form-text>
				</v-col>
				<v-col  sm="6" md="4" lg="3" align-self="center">
					<bbva-button-default
						text="Eliminar CBP"
						style="color: #1973B8; display: flex; gap: 8px;"
						icon="bbva:trash"
						variant="link"
						:disabled="indexCbps === 0"
						@click="deleteRowCPBS">
					</bbva-button-default>
				</v-col>
			</v-row>
			<v-row v-for="(input, indexOperational) in inputs">
				<v-col cols="12">
					<span class="text fs-14">Operativa {{ indexOperational + 1 }}</span>
				</v-col>
				<v-col  sm="6" md="4" lg="3">
					<bbva-web-form-text
						key="input-operational-text"
						class="input-text"
						@input="(ev) => setValueOperational(indexCbps, indexOperational, 'name_operational', ev.target.value)"
						:value="data.cbps[indexCbps].operational[indexOperational].name_operational"
						:invalid="errors.name_operational"
						:error-message="errors.name_operational"
						label="Nombre operativa"></bbva-web-form-text>
				</v-col>
				<v-col  sm="6" md="4" lg="3">
					<bbva-web-form-text
						key="input-element-text"
						class="input-text"
						@input="(ev) => setValueOperational(indexCbps, indexOperational, 'element', ev.target.value)"
						:value="data.cbps[indexCbps].operational[indexOperational].element"
						:invalid="errors.element"
						:error-message="errors.element"
						label="Elemento variante de cada fuente"></bbva-web-form-text>
				</v-col>
				<v-col  sm="6" md="4" lg="3">
					<bbva-web-form-text
						key="input-umbral-text"
						class="input-text"
						@input="(ev) => setValueOperational(indexCbps, indexOperational, 'umbral_tr', ev.target.value)"
						:value="data.cbps[indexCbps].operational[indexOperational].umbral_tr"
						:invalid="errors.umbral_tr"
						:error-message="errors.umbral_tr"
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
						@click="addRowOperational">
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
import { dataSecondSection, validateSecondSection } from '@/constants/model';
import '@/components/bbva-web-components/bbva-web-form-select.js'
import '@/components/bbva-web-components/bbva-web-form-checkbox.js';
import '@/components/bbva-web-components/bbva-web-form-text.js'
import '@/components/bbva-web-components/bbva-web-form-number.js'
import '@/components/bbva-web-components/bbva-web-form-date.js'
import '@/components/bbva-web-components/bbva-web-form-radio-button.js'
import '@/components/bbva-web-components/bbva-button-default.js'
import '@/components/bbva-web-components/bbva-progress-multistep-bar.js'
import '@/components/bbva-web-components/bbva-web-notification-message.js'
import HeaderFormModel from '@/components/headers/HeaderFormModel.vue'

export default {
	data() {
		return {
      data: {
        ...dataSecondSection,
      },
			errors: {},
			validations: {
       ...validateSecondSection
			},
			CPBS: [1],
			inputs: [1],
		};
	},
	beforeMount() {},
	computed: {
		valueAsStr () { return this.value }
	},
  components: {
    HeaderFormModel
  },
	methods: {
		setValueCBPS(index, key, value) {
      this.data.cbps[index][key] = value;
      this.errors[key] = this.validations.cbps[index][key](value);
    },
		setValueOperational(iCbps, iOperatinal, key, value) {
			this.data.cbps[iCbps].operational[iOperatinal][key] = value;
      this.errors[key] = this.validations.cbps[iCbps].operational[iOperatinal][key](value);
    },
		addRowCPBS() {
			this.CPBS.push({
        model_id : null,
      	name_cbp: null,
				operational: []
      })
		},
		addRowOperational() {
      this.inputs.push({
        name_operational: null,
        element: null,
        umbral_tr: null,
        variable_mother: null
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
	
