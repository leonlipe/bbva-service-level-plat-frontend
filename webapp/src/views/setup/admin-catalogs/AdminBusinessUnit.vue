<template>
  <app-bar></app-bar>
  <section-header
    title="Administración de Business Unit"
    backPath="/setup/admin-catalogs"
    backLabel="&nbsp;Volver a Catálogos"
    textButton="Crear Business Unit"
    :onClickButton="newItem"
  />
  <data-table
    :headers="table.headers"
    :onEdit="edit"
    :onDestroy="warningDestroy"
    :requestDestroyMany="warningDestroyMany"
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
    resource="BUs"
    />
  <information-modal
     :open="modal.open"
     :close="closeModal"
     :title="modal.title"
     :onAccept="remove"
     :confirmation="modal.confirmation"
     :message="modal.message"
     :type="modal.type"
    />
</template>

<script>
import SectionHeader from '@/components/headers/SectionHeader.vue';
import AppBar from "@/components/AppBar/AppBar.vue";
import DataTable from "@/components/table/DataTable.vue"
import {
  getBusinessUnitsAPI, createBusinessUnitAPI, updateBusinessUnitAPI, removeBusinessUnitAPI
} from '@/requests/businessUnit';
import InformationModal from '@/components/modals/InformationModal.vue';
import {
  headersTable, filtersTable, validationsForm, fieldsForm, requestDataKeys
} from '@/constants/adminBusinessUnit';
import ModalForm from '@/components/forms/ModalForm.vue';
import {
  editSuccessModal, createSuccessModal, removeCautionModal, removeManyCautionModal
} from '@/utils/informationModal';

export default {
  data() {
    return {
      table: {
        headers: headersTable, request: getBusinessUnitsAPI, filters: filtersTable,
        requestDataKeys
      },
      form: {
        id: null,
        ids: [],
        data: {}, open: false,
        validations: validationsForm,
        fields: fieldsForm
      },
      modal: {
        open: false,
        title: '',
        message: '',
        confirmation: false,
        type: ''
      },
    }
  },
  components: {
    AppBar,
    InformationModal,
    DataTable,
    SectionHeader,
    ModalForm
  },
  methods: {
    edit(item) {
      this.form.open = true;
      this.form.data = item;
      this.form.id = 1;
    },
    newItem(item) {
      this.form.data = item;
      this.form.open = true;
    },
    remove() {
      this.modal.open = false;
      const ids = this.form.ids.length ? this.form.ids : [this.form.id];
      ids.forEach( (id) => {
        removeBusinessUnitAPI(id).then(() => {
          this.form = { ...this.form, id: null, data: {}, ids: [] };
          this.$forceUpdate();
        }).catch((error) => {
          this.errorInRequestModal('eliminar', 'business unit', error)
        });
      });
    },
    warningDestroyMany(ids) {
      this.form.ids = ids;
      this.modal = {
        open: true, ...removeManyCautionModal('a las bussiness units'), confirmation: true
      };
    },
    warningDestroy(item) {
      this.form.id = item.id;
      this.modal = { open: true, ...removeCautionModal('BU'), confirmation: true };
    },
    closeForm() {
      this.form.data = {};
      this.form.open = false;
    },
    closeModal() {
      this.modal.open = false;
    },
    errorInRequestModal(action, error) {
      this.modal = { open: true, ...errorRequestModal(action, error) };
    },
    save(values) {
      this.form.open = false;
      if(this.form.id) {
        updateBusinessUnitAPI(this.form.id, values).then(() => {
          this.modal = { open: true, ...editSuccessModal('business unit') };
          this.form = { ...this.form, id: null, data: {} };
        }).catch( (error) => {
          this.errorInRequestModal('actualizar', error)
        });
      } else {
        createBusinessUnitAPI(values).then(() => {
          this.modal = { open: true, ...createSuccessModal('business unit') };
          this.form = { ...this.form, id: null, data: {} };
        }).catch( (error) => {
          this.errorInRequestModal('crear', error);
        });
      }
    }
  }
};
</script>
