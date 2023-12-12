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
            {{ Object.keys(data).length ? 'Editar usuario' : 'Crear usuario' }}
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
            <v-row >
              <v-col cols="12">
                <bbva-web-form-text
                  @input="(ev) => setValue('nombre_apellidos', ev)"
                  :value="inputs.nombre_apellidos.value"
                  :invalid="Boolean(inputs.nombre_apellidos.error)"
                  :error-message="inputs.nombre_apellidos.error"
                  label="Nombre y apellidos"></bbva-web-form-text>
              </v-col>
              <v-col cols="12">
                <bbva-web-form-text
                  @input="(ev) => setValue('email', ev)"
                  :value="inputs.email.value"
                  :invalid="Boolean(inputs.email.error)"
                  :error-message="inputs.email.error"
                  label="Email"></bbva-web-form-text>
              </v-col>
              <v-col cols="12">
                <bbva-web-form-text
                  @input="(ev) => setValue('employee_id', ev)"
                  :value="inputs.employee_id.value"
                  :invalid="Boolean(inputs.employee_id.error)"
                  :error-message="inputs.employee_id.error"
                  label="ID usuario"></bbva-web-form-text>
              </v-col>
              <v-col cols="12">
                <bbva-web-form-select
                  @change="(ev) => setValue('geografia_n1_id', ev)"
                  :value="inputs.geografia_n1_id.value"
                  :invalid="!!inputs.geografia_n1_id.error"
                  :error-message="inputs.geografia_n1_id.error"
                  label="Geografía">
                  <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
                  <bbva-web-form-option
                    v-for="option in catalogs.geografia_n1_id"
                    :key="option.id"
                    :value="option.id">{{option.label}}</bbva-web-form-option>
                   
                </bbva-web-form-select>
                 
              </v-col>
              <v-col cols="12">
                <bbva-web-form-select
                  v-if="addBu"
                  @change="(ev) => setValue('bu_id', ev)"
                  :value="inputs.bu_id.value"
                  :invalid="!!inputs.bu_id.error"
                  :error-message="inputs.bu_id.error"
                  label="Business unit">
                  <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
                  <bbva-web-form-option
                    v-for="option in catalogs.bu_id"
                    :key="option.id"
                    :value="option.id">{{option.label}}</bbva-web-form-option>
                </bbva-web-form-select>
              </v-col>
              <v-col cols="12">
                <bbva-web-form-select
                  @change="(ev) => setValue('rol_id', ev)"
                  :value="inputs.rol_id.value"
                  :invalid="!!inputs.rol_id.error"
                  :error-message="inputs.rol_id.error"
                  label="Rol">
                  <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
                  <bbva-web-form-option
                    v-for="option in catalogs.rol_id"
                    :key="option.id"
                    :value="option.id">{{option.label}}</bbva-web-form-option>
                </bbva-web-form-select>
              </v-col>
              <v-col cols="12">
                <bbva-web-form-select
                  @change="(ev) => setValue('perfil_id', ev)"
                  :value="inputs.perfil_id.value"
                  :invalid="!!inputs.perfil_id.error"
                  :error-message="inputs.perfil_id.error"
                  label="Perfil">
                  <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
                  <bbva-web-form-option
                    v-for="option in catalogs.perfil_id"
                    :key="option.id"
                    :value="option.id">{{option.label}}</bbva-web-form-option>
                </bbva-web-form-select>
              </v-col>
              <v-col cols="12">
                <bbva-web-form-select
                  @change="(ev) => setValue('area_id', ev)"
                  :value="inputs.area_id.value"
                  :invalid="!!inputs.area_id.error"
                  :error-message="inputs.area_id.error"
                  label="Cargo/Área">
                  <bbva-web-form-option value="">Ninguno</bbva-web-form-option>
                  <bbva-web-form-option
                    v-for="option in catalogs.area_id"
                    :key="option.id"
                    :value="option.id">{{option.label}}</bbva-web-form-option>
                </bbva-web-form-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pl-10 pb-10">
          <bbva-button-default
            :disabled="!valid"
            text="Guardar"
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
</template>

<script>

import '@/components/bbva-web-components/bbva-web-form-text.js'
import '@/components/bbva-web-components/bbva-web-form-select.js'
import '@/components/bbva-web-components/bbva-button-default.js'
import '@/components/bbva-web-components/bbva-foundations-icons.js'
import { getProfilesAPI } from '@/requests/profiles';
import { getAreasAPI } from '@/requests/areas';
import { getBusinessUnitsAPI } from '@/requests/businessUnit';
import { getGeographyN1sAPI } from '@/requests/geographyN1';
import { getRolesAPI } from '@/requests/roles';
import { validationsForm } from '@/constants/userAndRoles'
import {
  validateRequired, clearInputs, isThereError, validateAllFields, parseCatalog
} from '@/utils/form';
const fields = [
  'nombre_apellidos', 'email',  'employee_id',
  'bu_id', 'rol_id', 'perfil_id', 'area_id', 'geografia_n1_id'
]

export default {
  data() {
    return {
      dialog: false,
      inputs: {},
      valid: true,
      catalogs: {},
      validations: { ...validationsForm},
      addBu: true,
      fieldKeys: [...fields],
    }
  },
  beforeMount() {
    this.loadCatalogs();
  },
  methods: {
    loadCatalogs() {
      [
        { request: getProfilesAPI, key: 'perfil_id'},
        { request: getAreasAPI, key: 'area_id' },
        { request: getBusinessUnitsAPI, key: 'bu_id'},
        { request: getGeographyN1sAPI, key: 'geografia_n1_id'},
        { request:  getRolesAPI, key: 'rol_id'},
      ].forEach( ({request, key}) => {
        request().then((response) => {
          this.catalogs[key] = parseCatalog(response.data) ;
        }).catch((error) => {
           this.requestError('cargar catálogos', error);
        });
      })
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

      if( name === 'geografia_n1_id') {
        if( value === 3) {
          this.removeInputBu();
        } else {
          const filter = [ { name, value} ];

          this.inputs.bu_id = { value: '',  error: null, touch: false};
          getBusinessUnitsAPI(1, 1000, filter ).then((response) => {
            this.catalogs.bu_id = parseCatalog(response.data) ;
            this.addInputBu();
           }).catch((error) => {
            this.requestError('cargar catálogos', error);
          });
        };
      }

      this.valid = isThereError( this.inputs );
    },
    addInputBu() {
      const bu = this.fieldKeys.find( (item) => item === 'bu_id' );
      if( !bu ) {
        this.fieldKeys.push('bu_id');
      }

      this.inputs.bu_id = { value: '',  error: null, touch: false};
      this.validations.bu_id = validationsForm.bu_id;
      this.addBu = true;
    },
    removeInputBu() {
      this.fieldKeys = this.fieldKeys.filter((item) => {
        return item !== 'bu_id';
      });

      if( this.validations.bu_id ) {
        delete this.validations.bu_id;
      }
      if( this.inputs.bu_id ) {
        delete this.inputs.bu_id;
      }
      this.addBu = false;
    },
    onSubmit() {
      this.inputs = validateAllFields(this.validations, this.inputs);
      const values = {};

      this.valid = isThereError( this.inputs );
      if(this.valid) {
        this.fieldKeys.forEach( (key) => values[key] = this.inputs[key].value );
        this.save(values);
      }
    },
  },
  props: {
    open: { type: Boolean, default: false },
    save: { type: Function, default: () => {} },
    close: { type: Function, default: () => {} },
    requestError: { type: Function, default: () => {} },
    data: { type: Function, default: () => ({}) }
  },
  watch: {
    open(value) {
      this.dialog = value;
      this.fieldKeys = [ ...fields];
      this.addInputBu();
      if( Object.keys(this.data).length ) {
        this.fieldKeys.forEach( (key) => {
          this.inputs[key] = { value: this.data[key], error: '', touch: false };
        });
        if( this.data.geografia_n1_id === 3 ) {
          this.removeInputBu();
        }
      } else {
        this.inputs = clearInputs( this.fieldKeys );
      }
    },
  }
}
</script>
