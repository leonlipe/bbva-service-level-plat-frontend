<template>
  <section-header
    title="Días inhábiles"
    icon="/icons/Calendar.svg"
    textButton="Crear nuevo día inhabil"
    :onClickButton=" () => {}"
  />
</template>

<script>
import SectionHeader from '@/components/headers/SectionHeader';

export default {
  data(){
    return {
    }
  },
  components: {
    SectionHeader
  }
};
</script>
