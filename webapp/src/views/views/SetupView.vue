<template>
  <div class="home-configuration">
    <configuration-header />
    <div class="home-configuration__section-list">
      <configuration-section>
        <micro-manager-man slot="micro" />
        <span slot="text"> Perfil de usuario </span>
      </configuration-section>
      <configuration-section @click="() => navigateTo('thresholds')">
        <micro-search-graphic slot="micro" />
        <span slot="text"> Configurador de umbrales </span>
      </configuration-section>
      <configuration-section @click="() => {} ">
        <micro-book slot="micro" />
        <span slot="text"> Configurador de catalogos </span>
      </configuration-section>
    </div>
  </div>
</template>

<script>
import '@/components/bbva-web-components/bbva-foundations-microillustrations.js'
import router from '@/router'

export default {
  methods: {
    navigateTo (name) {
      router.push({ name })
    }
  }
}
</script>

<style>
.home-configuration {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.home-configuration__section-list {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.5rem;
}
</style>
