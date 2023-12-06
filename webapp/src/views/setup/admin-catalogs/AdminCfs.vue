<template>
  <app-bar></app-bar>
  <section-header
    title="Administración de CFS"
    backPath="/setup/admin-catalogs"
    backLabel="&nbsp;Volver a Catálogos"
    textButton="Crear CFS"
    :onClickButton="newItem"
  />
  <filter-table :filters="filters" :search="searchFilter"/>
  <data-table
    :headers="table.headers"
    star
    :onStar="star"
    :destroy="false"
    :onEdit="edit"
    :requestDataKeys="table.requestDataKeys"
    :requestData="table.request"
    :filtersOptions="table.filters"
    :requestError="errorInRequestModal"
  />
  <modal-form
    :close="closeForm"
    :data="form.data"
    :save="save"
    :open="form.open"
    :validations="form.validations"
    :fields="form.fields"
    resource="CFS"
    />
  <information-modal
     :open="modal.open"
     :close="closeModal"
     :title="modal.title"
     :message="modal.message"
     :type="modal.type"
    />
</template>

<script>
import SectionHeader from '@/components/headers/SectionHeader.vue';
import AppBar from "@/components/AppBar/AppBar.vue";
import DataTable from "@/components/table/DataTable.vue";
import ModalForm from '@/components/forms/ModalForm.vue';
import {
  headersTable, filtersTable, validationsForm, fieldsForm, requestDataKeys
} from '@/constants/adminCfs';
import {
  editSuccessModal, createSuccessModal, starSuccessModal, unstarSuccessModal
} from '@/utils/informationModal';
import { getCfsesAPI, createCfsAPI, updateCfsAPI, updateStatusCfsAPI } from '@/requests/cfs';
import InformationModal from '@/components/modals/InformationModal.vue';

export default {
  data() {
    return {
      table: {
        headers: headersTable, request: getCfsesAPI,
        filters: filtersTable, requestDataKeys
      },
      modal: {
        open: false,
        title: '',
        message: '',
        type: ''
      },
      form: {
        data: {}, open: false,
        id: null,
        validations: validationsForm,
        fields: fieldsForm
      },
    }
  },
  components: {
    AppBar,
    DataTable,
    SectionHeader,
    InformationModal,
    ModalForm
  },
  methods: {
    star(id, active) {
      updateStatusCfsAPI([id], active).then( () => {
        this.modal = {
          open: true,
          ...( active ? starSuccessModal('cfs') : unstarSuccessModal('cfs') )
        }; 
      }).catch((error) => {
        this.errorInRequestModal('cambiar estatus', error);
      });
    },
    edit(item) {
      this.form.open = true;
      this.form.data = item;
      this.form.id = item.id;
    },
    errorInRequestModal(action, error) {
      this.modal = {
        open: true, ...errorRequestModal(action, error)
      };
    },
    newItem() {
      this.form.data = {};
      this.form.open = true;
    },
    closeForm() {
      this.form.data = {};
      this.form.open = false;
    },
    closeModal() {
      this.modal.open = false;
    },
    save(values) {
      this.form.open = false;
      if(this.form.id) {
        updateCfsAPI(this.form.id, values).then(() => {
          this.modal = { open: true, ...editSuccessModal('cfs') };
          this.form = { ...this.form, id: null, data: {} };
        }).catch( (error) => {
          this.errorInRequestModal('actualizar', error)
        });
      } else {
        createCfsAPI(values).then(() => {
          this.modal = { open: true, ...createSuccessModal('cfs') };
          this.form = { ...this.form, id: null, data: {} };
        }).catch( (error) => {
          this.errorInRequestModal('eliminar', error);
        });
      }

    }
  }
};
</script>
