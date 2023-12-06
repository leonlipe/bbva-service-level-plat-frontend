<template>
  <app-bar />
  <simple-section-header
    title="Valores D+1"
    icon="/icons/Book.svg"
    backPath="/setup"
  />
  <bbva-web-tab-default label="">
    <bbva-web-tab-default-item heading="Umbrales D+1">
      <threshold-d1 />
    </bbva-web-tab-default-item>
    <bbva-web-tab-default-item heading="Ponderación fin de semana">
      <weighing-weekend />
    </bbva-web-tab-default-item>
  </bbva-web-tab-default>
</template>

<script>
import AppBar from "@/components/AppBar/AppBar.vue";
import SimpleSectionHeader from '@/components/headers/SimpleSectionHeader.vue';
import '@/components/bbva-web-components/bbva-web-tab-default.js'
import ThresholdD1 from "@/views/setup/values-d1/ThresholdD1.vue"
import WeighingWeekend from "@/views/setup/values-d1/WeighingWeekend.vue"

export default {
  data() {
    return {
    }
  },
  components: {
    SimpleSectionHeader,
    ThresholdD1,
    WeighingWeekend,
    AppBar
  }
}
</script>
