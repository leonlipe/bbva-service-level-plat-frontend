<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="font-weight-bold">
          Añade ponderaciones de fin de semana desde cero:
        </span>
        <bbva-core-icon icon="bbva:add" size="16" style="color: #1973B8;"/>
        <bbva-button-default
          text="Crear ponderación"
          class="pl-2"
          variant="link"
          @click="newItem"
          ></bbva-button-default>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pb-0">
        <span class="font-weight-bold">
          Historial de umbrales D+1
        </span>
      </v-col>
    </v-row>
  </v-container>
  <data-table
    :headers="table.headers"
    :onEdit="edit"
    :noDestroyMany="true"
    :onDestroy="warningDestroy"
    :requestDataKeys="table.requestDataKeys"
    :requestData="table.request"
    :filtersOptions="table.filters"
  />
  <modal-form
    :close="closeForm"
    :data="form.data"
    :save="save"
    :open="form.open"
    :validations="form.validations"
    :fields="form.fields"
    resource="ponderación de fin de semana"
    />
  <information-modal
     :open="modal.open"
     :close="closeModal"
     :onAccept="remove"
     :title="modal.title"
     :confirmation="modal.confirmation"
     :message="modal.message"
     :type="modal.type"
    />

</template>

<script>
import DataTable from "@/components/table/DataTable.vue"
import {
  headersTable, filtersTable, validationsForm, fieldsForm, requestDataKeys
} from '@/constants/weighingWeekend.js';
import {
  editSuccessModal, createSuccessModal, errorRequestModal
} from '@/utils/informationModal';
import {
  getWeighingWeekendsAPI, removeWeighingWeekendAPI, updateWeighingWeekendAPI,
  createWeighingWeekendAPI
} from '@/requests/weighingWeekend';
import ModalForm from '@/components/forms/ModalForm.vue';
import InformationModal from '@/components/modals/InformationModal.vue';
import '@/components/bbva-web-components/bbva-button-default.js'
import '@/components/bbva-web-components/bbva-core-icon.js'

export default {
  data(){
    return {
      table: {
        headers: headersTable,
        request: getWeighingWeekendsAPI, filters: filtersTable, requestDataKeys
      },
      form: {
        id: null,
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
    DataTable,
    InformationModal,
    ModalForm,
  },
  methods: {
    edit(item) {
      this.form.open = true;
      this.form.data = item;
      this.form.id = item.id;
    },
    remove() {
      this.modal.open = false;
      removeWeighingWeekendAPI(this.form.id).then(() => {
        this.form = { ...this.form, id: null, data: {}, ids: [] };
        this.$forceUpdate();
      }).catch((error) => {
        this.errorInRequestModal('eliminar', 'ponderación fin de semana', error)
      });
    },
    warningDestroy(item) {
      this.form.id = item.id;
      this.modal = {
        open: true,
        type: 'caution',
        title: 'Eliminar Ponderación de fin de semana',
        message: `
          ¿Seguro que quieres eliminar la siguiente ponderación de fin de semana?
          BU: ${item.bu}, CFS: ${item.cfs},
          Ponderación sábado: ${item.weighing_saturday}, Ponderación domingos ${item.weighing_sunday}
        `,
        confirmation: true
      };
    },
    newItem(item) {
      this.form.data = item;
      this.form.open = true;
    },
    closeForm() {
      this.form.data = {};
      this.form.open = false;
    },
    closeModal() {
      this.modal.open = false;
    },
    errorInRequestModal(action, error) {
      this.modal = {
        open: true, ...errorRequestModal(action, error)
      };
    },
    save(values) {
      this.form.open = false;
      if(this.form.id) {
        updateWeighingWeekendAPI(this.form.id, values).then(() => {
          this.modal = { open: true, ...editSuccessModal('ponderación de fin de semana') };
          this.form = { ...this.form, id: null, data: {} };
        }).catch( (error) => {
          this.errorInRequestModal('actualizar', error)
        });
      } else {
        createWeighingWeekendAPI(values).then(() => {
          this.modal = { open: true, ...createSuccessModal('ponderación de fin de semana') };
          this.form = { ...this.form, id: null, data: {} };
        }).catch( (error) => {
          this.errorInRequestModal('crear', error);
        });
      }

    }
  }
}
</script>
