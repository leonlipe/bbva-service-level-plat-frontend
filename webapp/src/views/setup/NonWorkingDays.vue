<template>
  <app-bar></app-bar>
  <section-header
    title="Días inhábiles"
    icon="/icons/Calendar.svg"
    backPath="/setup"
    textButton="Crear nuevo día inhabil"
    :onClickButton="newItem"
  />
  <data-table
    :headers="table.headers"
    :onEdit="edit"
    :onDestroy="warningDestroy"
    :requestDestroyMany="warningDestroyMany"
    :requestData="table.request"
    :requestDataKeys="table.requestDataKeys"
    :filtersOptions="table.filters"
    :requestError="errorInRequestModal"
  />
  <non-working-day-form
    :close="closeForm"
    :save="save"
    :data="form.data"
    :open="form.open"
    :requestError="errorInRequestModal"
    />
  <information-modal
     :open="modal.open"
     :close="closeModal"
     :title="modal.title"
     :onAccept="remove"
     :message="modal.message"
     :confirmation="modal.confirmation"
     :type="modal.type"
    />
</template>

<script>
import SectionHeader from '@/components/headers/SectionHeader.vue';
import AppBar from "@/components/AppBar/AppBar.vue";
import DataTable from "@/components/table/DataTable.vue"
import NonWorkingDayForm from "@/components/forms/NonWorkingDayForm.vue"
import { headersTable, filtersTable, requestDataKeys } from '@/constants/nonWorkingDays';
import InformationModal from '@/components/modals/InformationModal.vue';
import {
  editSuccessModal, createSuccessModal, removeCautionModal, removeManyCautionModal, errorRequestModal
} from '@/utils/informationModal';
import {
  removeNonWorkingDayAPI, updateNonWorkingDayAPI, createNonWorkingDayAPI, getNonWorkingDaysAPI
} from '@/requests/nonWorkingDay';
export default {
  data(){
    return {
      table: {
        headers: headersTable, request: getNonWorkingDaysAPI,
        filters: filtersTable, requestDataKeys
      },
      modal: {
        open: false,
        title: '',
        message: '',
        confirmation: false,
        type: ''
      },
      form: { data: {}, open: false, id: null, ids: [] },
    }
  },
  components: {
    AppBar,
    DataTable,
    SectionHeader,
    InformationModal,
    NonWorkingDayForm
  },
  methods: {
    edit(item) {
      this.form.data = item;
      this.form.id = item.id;
      this.form.open = true;
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
    warningDestroy(item) {
      this.form.id = item.id;
      this.modal = { open: true, ...removeCautionModal('día inhabil'), confirmation: true  };
    },
    warningDestroyMany(ids) {
      this.form.ids = ids;
      this.modal = {
        open: true, ...removeManyCautionModal('a los días inhabiles'), confirmation: true
      };
    },
    remove() {
      this.modal.open = false;
      const ids = this.form.ids.length ? this.form.ids : [this.form.id];
      ids.forEach( (id) => {
        removeNonWorkingDayAPI(id).then(() => {
          this.form = { ...this.form, id: null, data: {}, ids: [] };
          this.$forceUpdate();
        }).catch((error) => {
          this.errorInRequestModal('eliminar','día inhabil', error)
        });
      });
    },
    closeForm() {
      this.form.data = {};
      this.form.open = false;
    },
    closeModal() {
      this.modal.open = false;
    },
    save({bu_id, day, month, year}) {
      this.form.open = false;
      const parsedValues = {
        bu_id,
        fecha: `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
      };
      if(this.form.id) {
        updateNonWorkingDayAPI(this.form.id, parsedValues).then(() => {
          this.modal = { open: true, ...editSuccessModal('día inhabil') };
          this.form = { ...this.form, id: null, data: {} };
        }).catch( (error) => {
          this.errorInRequestModal('actualizar', error)
        });
      } else {
        createNonWorkingDayAPI(parsedValues).then(() => {
          this.modal = { open: true, ...createSuccessModal('día inahbil') };
          this.form = { ...this.form, id: null, data: {} };
        }).catch( (error) => {
          this.errorInRequestModal('eliminar', error);
        });
      }
    }
  }
};
</script>
