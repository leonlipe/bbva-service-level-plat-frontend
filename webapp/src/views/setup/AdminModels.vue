<template>
  <app-bar />
  <section-header
    title="Administrar Modelos"
    icon="/icons/Download-Certificate.svg"
    textButton="Crear Modelo"
    backPath="/setup"
    :onClickButton="newItem"
  />
  <data-table
    :headers="table.headers"
    :destroy="false"
    :watch="true"
    :onWatch="watchItem"
    :onEdit="edit"
    :requestDataKeys="table.requestDataKeys"
    :requestData="table.request"
    :filtersOptions="table.filters"
  />
</template>

<script>
import SectionHeader from '@/components/headers/SectionHeader.vue';
import DataTable from "@/components/table/DataTable.vue"
import AppBar from "@/components/AppBar/AppBar.vue"
import { headersTable, filtersTable, requestDataKeys } from '@/constants/adminModels';
import { getModelsAPI } from '@/requests/models';

export default {
  data() {
    return {
      table: {
        headers: headersTable, request: getModelsAPI, filters: filtersTable, requestDataKeys
      },
      form: { data: {}, open: false },
    }
  },
  methods: {
    edit(item) {
      this.form.open = true;
      this.form.data = item;
    },
    newItem() {
      this.form.data = {};
      this.form.open = true;
    },
    closeForm() {
      this.form.data = {};
      this.form.open = false;
    },
    watchItem(id) {
      console.log('id: ', id);
      this.$router.push(`/setup/admin-models/${id}`);
    },
    save() {
      this.form.open = false;
    }
  },
  components: {
    AppBar,
    SectionHeader,
    DataTable,
  }
};
</script>
