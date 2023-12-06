<template>
  <filter-table :filters="filters.options" :search="searchFilter" v-if="filters.options.length"/>
  <loader v-if="loading.all" class="pt-12"/>
  <no-data-message 
     v-else-if="data.length === 0"
     title="Información de la tabla"
     :message="this.filters.values.length ? 'No hay datos para los filtros seleccionados' :
              'No hay datos que mostrar en la tabla'"
  />
  <v-container v-else fluid class="pl-12">
    <v-row>
      <v-col>
        <v-table :class="styles.table">
          <thead>
            <tr>
              <th id="header-checkbox" v-if="noDestroyMany ? false : destroy">
                <bbva-web-table-header-checkbox @change="checkedItems">
                </bbva-web-table-header-checkbox>
              </th>
              <th
                v-for="(header, index) in headers"
                :id="`table-header${index}`"
                :key="`table-header${index}`"
                >
                <bbva-web-table-header-text>{{header.title}}</bbva-web-table-header-text>
              </th>
              <th class="text-right" id="checked-header" v-if="actions">
                <bbva-web-table-body-action
                  v-if="checkedAll || countCheckedItems()"
                  :class="styles.iconButton"
                  @click="onDestroyAll"
                  icon="bbva:trash" size="m"
                  ></bbva-web-table-body-action>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(id, indexRow) in Object.keys(data)" :key="`tr-body-${indexRow}`" >
              <td  v-if="noDestroyMany ? false : destroy" :id="`checkbox-table-row-${indexRow}`">
               <bbva-web-table-body-checkbox
                 :checked="checked[id] || checkedAll"
                 @change="(ev) => checked[id] = ev.target.checked"
                 ></bbva-web-table-body-checkbox>
              </td>
              <td v-for="(col, indexColumn) in data[id]" :key="`td-body-${indexColumn}`">
                <div v-if="(typeof col.value === 'string') && col.value.includes(separator)">
                  {{ splitColumnValue(col.value, 0) }}
                  <br/>
                  <span :class="styles.secondColumn">
                  {{ splitColumnValue(col.value, 1) }}
                  </span>
                </div>
                <span v-else> 
                  {{col.value}}
                </span>
              </td>
              <td class="text-right" v-if="actions">
                <bbva-web-table-body-action
                  v-if="edit"
                  @click="() => editItem(id)"
                  :class="styles.iconButton"
                  icon="bbva:edit" size="m"
                  ></bbva-web-table-body-action>
                <bbva-web-table-body-action
                  v-if="watch"
                  :class="styles.iconButton"
                  @click="() => onWatch(id)"
                  icon="bbva:show" size="m"
                  ></bbva-web-table-body-action>
                <bbva-web-table-body-action
                  v-if="destroy"
                  :class="styles.iconButton"
                  @click="() => destroyItem(id)"
                  icon="bbva:trash" size="m"
                  ></bbva-web-table-body-action>
                <bbva-web-table-body-action
                  v-if="star"
                  :class=" isActive(id) ? styles.buttonActive : styles.iconButton"
                  @click="() => onStar( id, !isActive(id) )"
                  icon="bbva:favorite" size="m"
                  ></bbva-web-table-body-action>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row >
    <v-row justify="center">
      <v-col sm="4" md="4" lg="3">
        <bbva-web-table-footer
           v-if="total > items.length"
           @click="loadMore"
          :loading="loading.more" loading-text="Cargando">Ver más</bbva-web-table-footer>
        <span v-else :class="styles.secondColumn">no hay más registros por mostrar</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import '@/components/bbva-web-components/bbva-foundations-microillustrations.js'
import '@/components/bbva-web-components/bbva-foundations-icons.js'
import '@/components/bbva-web-components/bbva-web-table-header.js'
import '@/components/bbva-web-components/bbva-web-table-body.js'
import '@/components/bbva-web-components/bbva-web-table-footer.js'
import { separator } from '@/constants/general';
import FilterTable from "@/components/table/FilterTable.vue"
import { pagination } from '@/constants/pagination';
import Loader from '@/components/loaders/ContentLoader.vue'
import NoDataMessage from '@/components/utils/NoDataMessage.vue'
import { parseCatalog } from '@/utils/form';
import { buildData } from '@/utils/table';

export default {
  props: {
    requestDataKeys: { type: Function, default: () => ([])},
    requestDestroyMany: { type: Function, default: () => ([])},
    deleteColumn: { type: Boolean, default: true },
    destroy: { type: Boolean, default: true },
    noDestroyMany: { type: Boolean, default: false },
    edit: { type: Boolean, default: true },
    filtersOptions: { type: Function, default: () => []},
    headers: { type: Function, default: () => [] },
    onDestroy: { type: Function, default: () => {} },
    onEdit: { type: Function, default: () => {} },
    onWatch: { type: Function, default: () => {}, },
    onStar: { type: Function, default: () => {} },
    requestError: { type: Function, default: () => {} },
    star: { type: Boolean, default: false },
    requestData: { type: Function, deafult: () => {} },
    watch: { type: Boolean, default: false },
  },
  data: () => ({
    actions: { type: Boolean, default: true },
    separator,
    data: [],
    checked: {},
    checkedAll: false,
    loading: { all:  false, more: false },
    page: {...pagination},
    filters: { values: [], options: []},
    total: 0,
    items: [],
    styles: {
      table: ref('data-table'),
      iconButton: ref('icon-button'),
      secondColumn:  ref('second-column'),
      buttonActive: ref('button-active')
    }
  }),
  components: {
    FilterTable,
    NoDataMessage,
    Loader
  },
  beforeMount() {
    this.clearCheckedItems();
    this.filters.options = this.filtersOptions;
    this.searchData();
    this.loadCatalogs();
    this.actions = this.edit || this.destroy || this.star
  },
  methods: {
    searchData(pageNumber = 1, pageSize = pagination.size, filters = [], load = 'all') {
      this.loading[load] = true;
      this.requestData(pageNumber, pageSize, filters).then( (response) => {
        this.data = buildData(response.data, this.requestDataKeys);
        this.items = response.data.items;
        this.total = response.data.count;
        this.loading[load] = false;
      }).catch((error) =>  {
        this.loading[load] = false;
        this.requestError('obtener elementos de la tabla.', error);
      });
    },
    splitColumnValue(value, index) {
      return value.split(separator)[index];
    },
    findItem(id) {
      const idString = `${id}`;
      return this.items.find( (item) => `${item.id}` === idString);
    },
    editItem(id) {
      this.onEdit( this.findItem(id) );
    },
    destroyItem(id) {
      this.onDestroy( this.findItem(id) );
    },
    loadCatalogs() {
      this.filters.options.forEach(({request, name}, index) => {
        if( !request ) return;

        request().then( (response) => {
          this.filters.options[index].options = parseCatalog(response.data);
        }).catch((error) => {
          this.requestError('cargar catálogos de', error);
        });
      })
    },
    countCheckedItems() {
      let count = 0;
      Object.keys(this.checked).forEach( (id) => {
        if( this.checked[id] ) count++;
      });
      return count;
    },
    clearCheckedItems() {
      Object.keys(this.data).forEach((id) => {
        this.checked[id] = false;
      });
    },
    checkedItems({ target: { checked: value } }) {
      if(!value) {
        this.checked = {};
      }
      this.checkedAll = value;
    },
    onDestroyAll(){
      const ids = []
      if(this.checkedAll) {
        Object.keys(this.data).forEach( (id) => {
          ids.push( id )
        });
      } else {
        Object.keys(this.checked).forEach( (id) => {
          if( this.checked[id] ) {
            ids.push( id )
          }
        });
      }
      this.requestDestroyMany(ids);
    },
    isActive(id) {
      const item = this.items.find( (element) => `${element.id}` === `${id}` );

      return item.activo;
    },
    searchFilter(values){
      this.filters.values = values;
      this.page.size = pagination.size;
      this.searchData(1, this.page.size, this.filters.values, 'all');
    },
    loadMore() {
      this.page.size += pagination.loadMore;
      this.searchData(1, this.page.size, this.filters.values, 'more');
    },
  },
  watch: {
    data(value) {
      const add = Object.keys(value).length - Object.keys(this.checked).length;
      if(add < 0) {
        Object.keys(this.data).forEach((id) => {
          this.checked[id] = !!this.checked[id];
        });
      } else {
        this.clearCheckedItems();
      }
    }
  }
}
</script>

<style>
.data-table {
  border-bottom: 1px solid #D3D3D3;
}
.icon-button {
  width: 40px;
  color: #1464A5;
}
.icon-button:hover {
  color: #072146;
}
.second-column {
  color: #666666;
  font-size: 12px;
}
.button-active {
  width: 40px;
  color: #8E7022;
}
</style>

