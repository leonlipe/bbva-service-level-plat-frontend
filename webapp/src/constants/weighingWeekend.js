import { validateRequired, validateNumber } from '@/utils/form';
import { getBusinessUnitsAPI } from '@/requests/businessUnit';
import { getCfsesAPI } from '@/requests/cfs';

export const headersTable = [
  { title: 'Business unit' },
  { title: 'Cfs' },
  { title: 'Fecha de vigencia' },
  { title: 'Fecha configuración' },
  { title: 'Última modificación' },
  { title: 'Pond sábado' },
  { title: 'Pond domingo' },
];

export const filtersTable = [
  { name: 'bu_id', label: 'Business unit', type: 'select', options: [], request: getBusinessUnitsAPI },
  { name: 'cfs_id', label: 'CFS', type: 'select', options: [], request: getCfsesAPI },
];

export const validationsForm = {
  bu_id: (value) => validateRequired(value),
  cfs_id: (value) => validateRequired(value),
  expiration_date: (value) => validateRequired(value),
  weighing_saturday: (value) => validateRequired(value) || validateNumber(value, 0, 100),
  weighing_sunday: (value) => validateRequired(value) || validateNumber(value, 0, 100),
}

export const fieldsForm = [
  { name: 'bu_id', label: 'Business unit', type: 'select', request: getBusinessUnitsAPI  },
  { name: 'cfs_id', label: 'CFS', type: 'select', request: getCfsesAPI  },
  { name: 'expiration_date', label: 'Fecha de vigencia', type: 'date' },
  {
    name: 'weighing_saturday', label: 'Porcentaje ponderación sábado', type: 'number',
    max: 100, min: 0 },
  {
    name: 'weighing_sunday', label: 'Porcentaje ponderación domingo', type: 'number',
    max: 100, min: 0
  },
];


export const requestDataKeys = [
  'bu', 'cfs', 'expiration_date', 'date_setup', 'updated_at', 'weighing_saturday', 'weighing_sunday'
];
