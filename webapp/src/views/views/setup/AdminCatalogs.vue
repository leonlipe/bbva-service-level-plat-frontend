<template>
  <simple-section-header
    title="Administración de Catalogos"
    icon="/icons/Book.svg"
  />
  <v-container>
    <v-row v-for=" row in list">
      <v-col
        v-for="col in row"
        sm="3"
        class="d-flex"
        style="border-bottom: 1px solid #D3D3D3; margin-right: 30px">
        <img src="/icons/flag.svg" alt="Icono de listado">
        <span class="pl-1">{{ col.title }}</span>
        <v-spacer></v-spacer>
        Administrar
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dataList } from '@/constants/adminCatalogs';

import SimpleSectionHeader from '@/components/headers/SimpleSectionHeader';
export default {
  data() {
    return {
      list: dataList
    }
  },
  components: {
    SimpleSectionHeader
  }
}
</script>
