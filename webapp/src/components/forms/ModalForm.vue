<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="600"
    >
      <v-card>
        <v-card-title class="pl-10 pb-2 pt-4">
          <span class="text-h5 font-weight-black pt-3">
            {{ Object.keys(data).length ? `Editar ${resource}` : `Crear ${resource}` }}
          </span>
          <div class="float-right">
            <v-btn
              variant="text"
              size="x-small"
              @click="close"
              >
              <bbva-core-icon icon="bbva:close" size="m"></bbva-core-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <v-container class="pt-0">
            <v-row v-for="(field, index) in fields" :key="`input-row-${index}`">
              <v-col cols="12" :key="`input-col-${index}`" >
                <bbva-web-form-select
                  :key="`input-${index}-select`"
                  v-if="field.type === 'select'"
                  @change="(ev) => setValue(field.name, ev)"
                  :value="inputs[field.name].value"
                  :invalid="!!inputs[field.name].error"
                  :disabled="checkItemDisabled(field.name)"
                  :error-message="inputs[field.name].error"
                  :label="field.label">
                  <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
                  <bbva-web-form-option
                    v-for="option in catalogs[field.name]"
                    :key="option.id"
                    :value="option.id">{{option.label}}</bbva-web-form-option>
                </bbva-web-form-select>
                <bbva-web-form-text
                  :key="`input-${index}-text`"
                  v-if="field.type === 'text'"
                  @input="(ev) => setValue(field.name, ev)"
                  :value="inputs[field.name].value"
                  :invalid="Boolean(inputs[field.name].error)"
                  :error-message="inputs[field.name].error"
                  :label="field.label"></bbva-web-form-text>
                <bbva-web-form-number
                  :key="`input-${index}-number`"
                  v-if="field.type === 'number'"
                  @input="(ev) => setValue(field.name, ev)"
                  :value="inputs[field.name].value"
                  :invalid="!!inputs[field.name].error"
                  :error-message="inputs[field.name].error"
                  :label="field.label"></bbva-web-form-number>
                <div
                  v-if="field.type === 'date'"
                  data-grid="region">
                   <div data-grid="zone">
                     <date-picker
                       :key="`input-${index}-date`"
                       @value-change="(ev) => setValue(field.name, ev)"
                       :label="field.label"
                       :invalid="!!inputs[field.name].error"
                       :errorMessage="inputs[field.name].error"
                       :value="inputs[field.name].value"
                       />
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pl-10 pb-10">
          <bbva-button-default
            text="Guardar"
            :disabled="!valid"
            @click="onSubmit" ></bbva-button-default>
          <div class="pl-8">
            <bbva-button-default
              text="Cancelar"
              variant="link"
              class="h-75"
              @click="close"
              ></bbva-button-default>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <overlay :open="dialog"></overlay>
</template>

<script>

import '@/components/bbva-web-components/bbva-web-form-text.js'
import '@/components/bbva-web-components/bbva-web-form-number.js'
import '@/components/bbva-web-components/bbva-web-form-select.js'
import '@/components/bbva-web-components/bbva-button-default.js'
import '@/components/bbva-web-components/bbva-foundations-icons.js'
import DatePicker from '@/components/forms/DatePicker.vue'
import { clearInputs, isThereError, validateAllFields, parseCatalog } from '@/utils/form';
import Overlay from "@/components/overlay/Overlay.vue"

export default {
  data() {
    return {
      dialog: false,
      inputs: {},
      valid: true,
      catalogs: {},
      fieldKeys: [],
    }
  },
  beforeMount() {
    this.loadCatalogs();

    this.fieldKeys = this.fields.map( ({name}) => name );
  },
  methods: {
    loadCatalogs() {
      const selects = this.fields.filter((field) => field.request );
      selects.forEach(({request, name}) => {
        request().then((response) => {
          this.catalogs[name] = parseCatalog(response.data) ;
        }).catch((error) => {
          this.requestError('cargar catálogos', error);
        });
      });
    },
    setValue(name, ev) {
      const value = ev.target.value
      this.inputs[name].value = value;
      this.inputs[name].error = '';
      const error = this.validations[name](value);

      if( error ) {
        setTimeout(() => {
          this.inputs[name].error = error;
        }, 100);
      }

      this.valid = isThereError( this.inputs );
      if( this.nestedFields[name]?.length ) {
        const filter = [ { name, value} ];
        const options = this.fields.filter( (item) => {
          return this.nestedFields[name].find( (catalog) => catalog === item.name )
        });
        options.forEach(({request, name: field}) => {

          this.inputs[field] = { value: '',  error: null, touch: false};

          request(1, 1000, filter ).then((response) => {
            this.catalogs[field] = parseCatalog(response.data) ;
          }).catch((error) => {
            this.requestError('cargar catálogos', error);
          });
        });
      }
    },
    checkItemDisabled(field) {
      let disabled = false;
      Object.keys(this.nestedFields).forEach( (key) => {
        const catalog = this.nestedFields[key];
        disabled =  !!catalog.find( (subCatalog) =>  subCatalog === field) && !this.inputs[key].value;
      });
      return disabled;
    },
    onSubmit() {
      const values = {};
      this.inputs = validateAllFields(this.validations, this.inputs);

      this.valid = isThereError( this.inputs );

      if(this.valid) {
        this.fieldKeys.forEach((key) => {
          values[key] = this.inputs[key].value;
        });
        this.save(values);
      }
    },
  },
  components: {
    DatePicker,
    Overlay
  },
  props: {
    open: { type: Boolean, default: false },
    save: { type: Function, default: () => {} },
    close: { type: Function, default: () => {} },
    data: { type: Function, default: () => ({}) },
    validations: { type: Function, default: () => ({})},
    fields: { type: Function, default: () => []},
    resource: { type: Function, default: '' },
    nestedFields: { type: Function, default: () => ({}) },
    requestError: { type: Function, default: () => {} },
  },
  watch: {
    open(value) {
      this.dialog = value;
      if( Object.keys(this.data).length ) {
        this.fieldKeys.forEach( (key) => {
          this.inputs[key] = { value: this.data[key], error: '' };
        });
      } else {
        this.inputs = clearInputs( this.fieldKeys );
      }
    },
  }
}
</script>
