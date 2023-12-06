<template>
  <section-header
    title="Configuración de usuarios y roles"
    icon="/icons/The-Best-And-Most-Engaged-Team.svg"
    textButton="Crear nuevo usuario"
    :onClickButton=" () => {openForm = true}"
  />
  <data-table 
    :headers="headers"
    :data="data"
  />
  <user-form :open="openForm" :save="() => { openForm = false }"/>
</template>

<script>
import DataTable from "@/components/table/DataTable.vue"
import SectionHeader from '@/components/headers/SectionHeader.vue';
import { headersUsersTable } from '@/constants/tableUserAndRoles';
import { buildUsersData } from '@/utils/userAndRolesTable';
import UserForm from '@/components/forms/UserForm.vue';

export default {
  data(){
    return {
      openForm: false,
      headers: headersUsersTable,
      data: []
    }
  },
  beforeMount() {
    this.data = buildUsersData([]);
  },
  components: {
    DataTable,
    SectionHeader,
    UserForm
  }
};
</script>
