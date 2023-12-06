<template>
  <v-container
    :class="styles.header"
    fluid
    >
    <v-row class="h-100" >
      <v-col xs="6" sm="6" md="7" lg="6" class="pt-3">
        <bbva-button-default
          variant="link"
          style="color: #1973B8; padding-bottom: 10px"
          icon="bbva:return"
          :text="backLabel"
          @click="back">
        </bbva-button-default>
        <div class="d-flex">
          <img v-if="icon" :src="icon" alt="Icono de las sección"/>
          <span class="pl-1 text-h5">{{title}}</span>
        </div>
      </v-col>
      <v-spacer></v-spacer>
      <v-col xs="6" sm="6"  md="4" lg="2"
        :class="styles.gradientBackgroud"
        >
        <div class="pt-6">
        <bbva-button-default
          active=""
          :text="textButton"
          :class="styles.button"
          @click="onClickButton" ></bbva-button-default>
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
        header: ref('section-header'),
        button: ref('button-header'),
        verticalCenter: ref('vertical-center'),
        gradientBackgroud: ref('gradient-background')
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
    textButton: {
      type: String,
      default: ''
    },
    onClickButton: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style>
.section-header {
 box-shadow: 0 4px 2px -2px #D3D3D3;
 margin-left: 0px;
 margin-right: 0px;
 padding-left: 48px;
 padding-top: 13px;
 height: 120px;
}
.button-header {
  width: 208px;
  height: 48px;
  background-color: #1464A5;
}
.gradient-background {
  background: linear-gradient(283deg, rgba(227,227,227,1) 91%, rgba(255,255,255,1) 91%, rgba(255,255,255,1) 100%);
  height: 119px;
  box-shadow: 0 4px 2px -2px #D3D3D3;
  text-align: end;
}
</style>
