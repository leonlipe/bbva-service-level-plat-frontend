<template>
  <v-overlay v-model="openOverlay" color="primary"></v-overlay>
</template>

<script>
export default {
  data() {
    return {
      openOverlay: false
    };
  },
  props: {
    open: { type: Boolean, default: false }
  },
  watch: {
    open(value) {
      this.openOverlay = value;
    }
  }
}
</script>

<style>
.v-overlay--active {
    background: rgb(04, 32, 63 , 0.45);
}
</style>

