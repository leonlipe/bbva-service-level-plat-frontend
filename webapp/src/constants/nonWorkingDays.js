import { getBusinessUnitsAPI } from '@/requests/businessUnit';

export const headersTable = [
  { title: 'Business Unit' }, { title: 'Días' }, { title: 'Mes' }, { title: 'Año' },
];

export const filtersTable = [
  { name: 'bu_id', label: 'Business Unit', type: 'select', options: [], request: getBusinessUnitsAPI },
  { name: 'fecha', label: 'Día / Mes / año', type: 'date' },
];

export const requestDataKeys = [ 'bu', 'day', 'monthText', 'year' ];
