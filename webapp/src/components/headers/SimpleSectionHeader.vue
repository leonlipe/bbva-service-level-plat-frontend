<template>
  <v-container fluid :class="styles.header">
    <v-row justify="space-between" >
      <v-col>
        <bbva-button-default
          variant="link"
          style="color: #1973B8; padding-bottom: 10px"
          icon="bbva:return"
          :text="backLabel"
          @click="back">
        </bbva-button-default>
        <div class="d-flex">
          <img v-if="icon" :src="icon" alt="Icono de la sección"/>
          <span class="pl-1 text-h5 font-weight-bold">{{title}}</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import '@/components/bbva-web-components/bbva-button-default.js'

export default {
  data() {
    return {
      styles: {
        header: ref('simple-section-header'),
      }
    }
  },
  methods: {
    back() {
      this.$router.push(this.backPath);
    }
  },
  props: {
    backLabel: {
      type: String,
      default: "&nbsp;Volver al inicio"
    },
    backPath: {
      type: String,
      default: '/'
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
  }
};
</script>

<style>
.simple-section-header {
 margin-left: 0px;
 margin-right: 0px;
 padding-left: 48px;
 padding-top: 13px;
 padding-bottom: 0px;
 height: 120px;
}
</style>
