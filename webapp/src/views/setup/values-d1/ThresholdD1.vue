<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="font-weight-bold">
          Umbral actual D+1:
        </span>
        <span>
          <img src="/icons/rec-orange.svg" style="width: 15px;" alt="orange flag"/>
          <b class="pl-2">Rango High</b> &gt; {{form.data.high_menor_que}} - &lt;
          <img src="/icons/rec-red.svg" style="width: 15px;" alt="red flag"/>
          {{form.data.high_mayor_que}}</span>
        <span class="pr-4">
          <b class="pl-2">Rango Very High</b> &ge; {{form.data.very_high_mayor_que}}
        </span>
        <bbva-core-icon icon="bbva:update" size="16" style="color: #1973B8;"/>
        <bbva-button-default
          text="Actualizar"
          variant="link"
          class="pl-2"
          @click="edit"
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
    :edit="false"
    :destroy="false"
    :star="false"
    :requestData="table.request"
    :requestDataKeys="table.requestDataKeys"
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
    resource="umbrales D+1"
    />
  <information-modal
     :open="modal.open"
     :close="closeModal"
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
} from '@/constants/thresholdD1.js';
import { editSuccessModal, errorRequestModal } from '@/utils/informationModal';
import { createThresholdD1API, getThresholdsD1API } from '@/requests/thresholdD1';
import ModalForm from '@/components/forms/ModalForm.vue';
import InformationModal from '@/components/modals/InformationModal.vue';
import '@/components/bbva-web-components/bbva-button-default.js'

export default {
  data(){
    return {
      table: {
        headers: headersTable,
        request: getThresholdsD1API, filters: filtersTable, requestDataKeys
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
  beforeMount() {
    getThresholdsD1API(1,1, []).then((response) => {
      this.form.data = response.data.items[0];
      this.form.id = this.form.data.id; 
    }).catch((error) => {
      console.log(error);
      this.errorInRequestModal('obtener', error);
    });
  },
  methods: {
    edit() {
      getThresholdsD1API(1,1, []).then((response) => {
        this.form.data = response.data.items[0];
        this.form.id = this.form.data.id; 
        this.form.open = true;
      }).catch((error) => {
        this.errorInRequestModal('obtener', error);
      });
    },
    errorInRequestModal(action, error) {
      this.modal = {
        open: true, ...errorRequestModal(action, error)
      };
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
      createThresholdD1API(values).then(() => {
        this.modal = { open: true, ...editSuccessModal('umbral D+1') };
        this.form = { ...this.form, id: null, data: {} };
      }).catch( (error) => {
        this.errorInRequestModal('crear', error);
      });
    }
  }
}
</script>
