<template>
  <app-bar />
  <section-header
    title="Administrar Modelos"
    icon="/icons/Download-Certificate.svg"
    textButton="Crear Modelo"
    :onClickButton=" () => {}"
  />
</template>

<script>
import SectionHeader from '@/components/headers/SectionHeader';
import AppBar from "@/components/AppBar/AppBar.vue";

export default {
  data(){
    return {
    }
  },
  components: {
    SectionHeader,
    AppBar
  }
};
</script>
