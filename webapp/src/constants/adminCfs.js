import { getBusinessUnitsAPI } from '@/requests/businessUnit';
import { validateRequired } from '@/utils/form';

export const headersTable = [
  { title: 'CFS' },
  { title: 'Business Unit' },
];

export const filtersTable = [
  {
    name: 'nombre',
    label: 'CFS',
    type: 'text',
  },
  {
    name: 'bu_id',
    label: 'Business Unit',
    type: 'select',
    options: [],
    request: getBusinessUnitsAPI
  },
];

export const validationsForm = {
  bu_id: (value) => validateRequired(value),
  nombre: (value) => validateRequired(value)
};

export const fieldsForm = [
  { name: 'nombre', label: 'CFS', type: 'text' },
  { name: 'bu_id', label: 'Business Unit', request: getBusinessUnitsAPI, type: 'select' },
];

export const requestDataKeys = [ 'nombre', 'bu' ];
