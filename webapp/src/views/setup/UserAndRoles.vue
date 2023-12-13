<template>
  <app-bar />
  <section-header
    title="Configuración de usuarios y roles"
    backPath="/setup"
    icon="/icons/The-Best-And-Most-Engaged-Team.svg"
    textButton="Crear nuevo usuario"
    :onClickButton="newItem"
  />
  <data-table
    :headers="table.headers"
    :onEdit="edit"
    star
    :onStar="star"
    :destroy="false"
    :requestData="table.request"
    :requestDataKeys="table.requestDataKeys"
    :filtersOptions="table.filters"
    :requestError="errorInRequestModal"
  />
  <user-form
    :close="closeForm"
    :data="form.data"
    :save="save"
    :open="form.open"
    :requestError="errorInRequestModal"
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
import {
  errorRequestModal, editSuccessModal, createSuccessModal, starSuccessModal, unstarSuccessModal
} from '@/utils/informationModal';
import DataTable from "@/components/table/DataTable.vue";
import AppBar from "@/components/AppBar/AppBar.vue";
import SectionHeader from '@/components/headers/SectionHeader.vue';
import {
  headersTable, filtersTable, validationsForm, fieldsForm, requestDataKeys, nestedFields
} from '@/constants/userAndRoles';
import UserForm from '@/components/forms/UserForm.vue';
import { updateStatusUsersAPI, getUsersAPI, createUserAPI, updateUserAPI } from '@/requests/users';
import InformationModal from '@/components/modals/InformationModal.vue';
import { instanceAxiosAPI } from '@/requests/axiosconfig';

export default {
  data() {
    return {
      table: {
        headers: headersTable, request: getUsersAPI, filters: filtersTable, requestDataKeys
      },
      form: {
        id: null,
        ids: [],
        data: {}, open: false,
        validations: validationsForm,
        fields: fieldsForm,
        nestedFields,
      },
      modal: {
        open: false,
        title: '',
        message: '',
        type: ''
      },
    }
  },
  components: {
    AppBar,
    InformationModal,
    DataTable,
    SectionHeader,
    UserForm,
  },
  beforeMount() {
    console.log('Hola a todos');
     instanceAxiosAPI.get('/v1/bu/3').then( (response) => {
       console.log('Exito: ', response);
     }).catch( (error) => {
       console.log('Exito: ', error);
     });
  },
  methods: {
    edit(item) {
      this.form.open = true;
      this.form.data = item;
      this.form.id = item.id;
    },
    star(id, active) {
      updateStatusUsersAPI([id], active).then( () => {
        this.modal = {
          open: true,
          ...( active ? starSuccessModal('usuario') : unstarSuccessModal('usuario') )
        }; 
      }).catch((error) => {
        this.errorInRequestModal('cambiar estatus', error);
      });
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
    errorInRequestModal(action, error) {
      this.modal = {
        open: true, ...errorRequestModal(action, error)
      };
    },
    save(values) {
      this.form.open = false;
      if(this.form.id) {
        updateUserAPI(this.form.id, values).then(() => {
          this.modal = { open: true, ...editSuccessModal('usuario') };
          this.form = { ...this.form, id: null, data: {} };
        }).catch( (error) => {
          this.errorInRequestModal('actualizar', error)
        });
      } else {
        createUserAPI(values).then(() => {
          this.modal = { open: true, ...createSuccessModal('usuario') };
          this.form = { ...this.form, id: null, data: {} };
        }).catch( (error) => {
          this.errorInRequestModal('crear', error);
        });
      }
    }
  }
};
</script>

