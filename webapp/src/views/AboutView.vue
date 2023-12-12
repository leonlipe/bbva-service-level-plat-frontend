<script setup>
import { computed } from 'vue'
const userSession = computed(() => JSON.parse(sessionStorage.getItem('userSession')))
</script>

<template>
  <div class="about">
    <h1>About</h1>
    <fieldset>
      <h3>{{ userSession.nickname }}</h3>
      <strong>{{ userSession.email }}</strong>
      <ul>
        <li><strong>Employee Id:</strong> {{ userSession.employeeId }}</li>
        <li><strong>Workplace:</strong> {{ userSession.workplaceDescription }}</li>
        <li><strong>Country:</strong> {{ userSession.country }}</li>
        <li><strong>Company:</strong> {{ userSession.companyName }}</li>
      </ul>
    </fieldset>
  </div>
</template>

<style>
h1 {
  color: var(--primary-blue-color);
}
</style>
