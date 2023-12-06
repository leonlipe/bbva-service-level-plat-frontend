<template>
  <v-card
    v-show="showMoreFilters"
    position="absolute"
    min-width="94%"
    style="overflow: initial; z-index: 50;"
    class="mt-2 ml-12">
    <v-container fluid class="pl-12 ml-0 mr-0">
      <v-row>
        <v-col cols="12">
          <div class="float-right pr-5">
            <v-btn
              variant="text"
              size="x-small"
              @click="showMoreFilters = false" 
              ><img src="/icons/close.svg" alt="Cerrar"></v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="pr-8">
        <v-col
          sm="12"
          md="4"
          lg="4"
          :key="`hidden-filter-index-${index}`"
          v-for="(filter, index) in filters">
          <bbva-web-form-text
            v-if="filter.type === 'text'"
            @change="(ev) => setValue(filter, ev)"
            :value="inputs[filter.name].value"
            :label="filter.label"></bbva-web-form-text>
          <bbva-web-form-select
            v-if="filter.type === 'select'"
            @change="(ev) => setValue(filter, ev)"
            :value="inputs[filter.name]?.value"
            :label="filter.label">
            <bbva-web-form-option value="">Todos</bbva-web-form-option>
            <bbva-web-form-option
              v-for="option in filter.options"
              :key="option.id"
              :value="option.id">{{option.label}}</bbva-web-form-option>
          </bbva-web-form-select>
          <div
            v-if="filter.type === 'date'"
            data-grid="region">
             <div data-grid="zone">
               <date-picker
                 @value-change="(ev) => setValue(filter, ev)"
                 :label="filter.label"
                 :value="inputs[filter.name].value"
                 />
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="12" md="2" lg="1">
          <bbva-button-default
            active=""
            text="Buscar"
            class="w-100"
            @click="searchFilter" ></bbva-button-default>
        </v-col>
        <v-col sm="12" md="2" lg="1">
          <div class="pt-3">
          <bbva-button-default
            text="Borrar filtros"
            variant="link"
            class="h-75"
            @click="clearFilter" ></bbva-button-default>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <v-container fluid class="pl-12 pt-6">
    <v-row justify="start">
      <v-col
        sm="12"
        md="3" lg="3"
        :key="`showed-filter-index-${index}`"
        v-for="(filter, index) in showedFilters">
        <bbva-web-form-text
          v-if="filter.type === 'text'"
          @input="(ev) => setValue(filter, ev)"
          :value="inputs[filter.name].value"
          :label="filter.label"></bbva-web-form-text>
        <bbva-web-form-select
          v-if="filter.type === 'select'"
          @change="(ev) => setValue(filter, ev)"
          :value="inputs[filter.name].value"
          :label="filter.label">
          <bbva-web-form-option value="">Todos</bbva-web-form-option>
          <bbva-web-form-option
            v-for="option in filter.options"
            @change="(ev) => setValue(filter, ev)"
            :key="option.id"
            :value="option.id">{{option.label}}</bbva-web-form-option>
        </bbva-web-form-select>
        <div
          v-if="filter.type === 'date'"
          data-grid="region">
           <div data-grid="zone">
             <date-picker
               @value-change="(ev) => setValue(filter, ev)"
               :label="filter.label"
               :value="inputs[filter.name].value"
               />
          </div>
        </div>
      </v-col>
      <v-col sm="12" md="2" lg="1" v-if="filters.length > 2">
        <div class="pt-3 pl-4">
          <bbva-button-default
            text="Ver más filtros"
            variant="link"
            class="h-75"
            @click="showMoreFilters = true"></bbva-button-default>
        </div>
      </v-col>
        <v-col sm="12" md="1" lg="1" v-else>
          <div class="pt-3 pl-4">
          <bbva-button-default
            text="Borrar filtros"
            variant="link"
            class="h-75"
            @click="clearFilter" ></bbva-button-default>
          </div>
        </v-col>

      <v-col sm="12" md="2" lg="1">
        <bbva-button-default
          active=""
          text="Buscar"
          class="w-100"
          @click="searchFilter" ></bbva-button-default>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import '@/components/bbva-web-components/bbva-web-form-text.js'
import '@/components/bbva-web-components/bbva-web-form-select.js'
import '@/components/bbva-web-components/bbva-button-default.js'
import DatePicker from '@/components/forms/DatePicker.vue'

export default {
  data() {
    return {
      showMoreFilters: false,
      showedFilters: [],
      inputs: {}
    }
  },
  beforeMount() {
    this.filters.forEach((filter, index) => {
      this.inputs[filter.name] = {}
      if( index <= 2 ) {
        this.showedFilters.push(filter);
      }
    })
  },
  methods: {
    setValue(filter, ev) {
      this.inputs[filter.name] = {
        value: ev.target.value,
        name: filter.name,
      }
    },
    searchFilter() {
      const values = [];
      Object.values(this.inputs).forEach( (input) => {
        if( input.value ) {
          values.push(input);
        }
      });
      this.search(values);
      this.showMoreFilters = false;
    },
    clearFilter() {
      this.filters.forEach(({name}) => { this.inputs[name] = {} });
      this.search([]);
    }
  },
  components: {
    DatePicker
  },
  props: {
    filters: {
      type: Function,
      default: () => []
    },
    search: {
      type: Function,
      default: () => {}
    }
  }
};
</script>
