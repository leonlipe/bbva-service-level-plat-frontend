import { getEnvironmentsAPI } from '@/requests/environments';
import { getBusinessUnitsAPI } from '@/requests/businessUnit';
import { getMeasurementStatusesAPI } from '@/requests/measurementStatus';
import { getSourceModelsAPI } from '@/requests/sourceModel';
import { getStatusModelAPI } from '@/requests/statusModel';

export const headersTable = [
  { title: 'Business Unit' },
  { title: 'CFS' },
  { title: 'Entorno' },
  { title: 'Estatus modelo' },
  { title: 'Estatus medición' },
  { title: 'Versión' },
  { title: 'Fuente' },
];

export const filtersTable = [
  {
    name: 'business_unit',
    label: 'Business Unit',
    type: 'select',
    options: [],
    request: getBusinessUnitsAPI
  },
  {
    name: 'estatus',
    label: 'Estatus modelo',
    type: 'select',
    options: [],
    request: getStatusModelAPI
  },
  {
    name: 'estatus_medicion',
    label: 'Estatus medición',
    type: 'select',
    options: [],
    request: getMeasurementStatusesAPI
  },
  {
    name: 'version',
    label: 'Versión',
    type: 'text'
  },
  {
    name: 'fuente',
    label: 'Fuente',
    type: 'select',
    options: [],
    request: getSourceModelsAPI
  },
  {
    name: 'entorno',
    label: 'Entorno',
    type: 'select',
    options: [],
    request: getEnvironmentsAPI
  },
];


export const requestDataKeys = [
  "bu",  "cfs",  "entorno",  "estatus",  "estatus_medicion",  "version", "fuente"
];
