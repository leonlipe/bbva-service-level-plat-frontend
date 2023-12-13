<script setup>
</script>

<template>
  <v-container color="primary" fluid style="background-color: #072146">
    <v-row >
      <v-col>
        <span class="text-white text-h6 pl-4 font-weight-black">
          {{ id ? 'Editar modelo' : 'Nuevo Modelo'}}
        </span>
      </v-col>
    </v-row>
  </v-container>
  <bbva-progress-multistep-bar
    :class="styles.stepBar"
    :accessibility-text="stepValue"
    :value="stepValue"
  ></bbva-progress-multistep-bar>
</template>

<script>
import '@/components/bbva-web-components/bbva-progress-multistep-bar.js'
import { ref } from 'vue';

export default {
  data() {
    return {
      styles: { stepBar: ref('step-bar') },
      id: null
    }
  },
  beforeMount() {
    this.id = this.$route.params.id;
  },
  props: {
    stepValue: { type: String, default: '0' }
  }
}
</script>

<style>
  .step-bar span span {
    background-color: #E9E9E9 !important;
  }
</style>
