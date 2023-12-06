import { getGeographyN1sAPI } from '@/requests/geographyN1';
import { validateRequired } from '@/utils/form';

export const headersTable = [
  { title: 'Business Unit' },
  { title: 'Geografía' },
];

export const filtersTable = [
  {
    name: 'nombre',
    label: 'Business Unit',
    type: 'text'
  },
  {
    name: 'geografia_n1_id',
    label: 'Geografía',
    type: 'select',
    options: [],
    request: getGeographyN1sAPI
  },
];


export const validationsForm = {
  bu: (value) => validateRequired(value),
  geografia_n1_id: (value) => validateRequired(value),
};


export const fieldsForm = [
  { name: 'bu', label: 'Business Unit', type: 'text' },
  { name: 'geografia_n1_id', label: 'Geografía N1', request: getGeographyN1sAPI, type: 'select' },
];

export const requestDataKeys = [
  'bu', 'geografia_n1'
];
