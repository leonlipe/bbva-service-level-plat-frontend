import { getProfilesAPI } from '@/requests/profiles';
import { getAreasAPI } from '@/requests/areas';
import { getBusinessUnitsAPI } from '@/requests/businessUnit';
import { getGeographyN1sAPI } from '@/requests/geographyN1';
import { getRolesAPI } from '@/requests/roles';
import { separator } from '@/constants/general';
import {
  validateRequired, validateEmail, manyValidations
} from '@/utils/form';

export const headersTable = [
  { title: 'NOMBRE/APELLIDOS/MAIL' },
  { title: 'ID' },
  { title: 'GEOGRAFÍA/BU' },
  { title: 'ROL' },
  { title: 'PERFIL' },
  { title: 'CARGO/AREA' }
];

export const filtersTable = [
  { name: 'name', label: 'Nombre y apellidos', type: 'text' },
  { name: 'bu_id', label: 'Business Unit', type: 'select', options: [], request: getBusinessUnitsAPI },
  { name: 'rol_id', label: 'Rol', type: 'select', options: [], request: getRolesAPI },
  { name: 'employee_id', label: 'ID', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'perfil_id', label: 'Perfil', type: 'select', options: [], request: getProfilesAPI },
  { name: 'area_id', label: 'Cargo/Área', type: 'select', options: [], request: getAreasAPI },
  { name: 'geografia_n1_id', label: 'Geografía', type: 'select', options: [], request: getGeographyN1sAPI },
];

export const validationsForm = {
  nombre_apellidos: (value) => validateRequired(value),
  employee_id: (value) => validateRequired(value),
  email: (value) => manyValidations([validateRequired, validateEmail], value),
  bu_id: (value) => validateRequired(value),
  geografia_n1_id: (value) => validateRequired(value),
  perfil_id: (value) => validateRequired(value),
  area_id: (value) => validateRequired(value),
  rol_id: (value) => validateRequired(value)
};

export const fieldsForm = [
  { name: 'nombre_apellidos', label: 'Nombre y apellidos', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'employee_id', label: 'ID usuario', type: 'text' },
  { name: 'geografia_n1_id', label: 'Geografía', type: 'select', request: getGeographyN1sAPI },
  { name: 'bu_id', label: 'Business unit', type: 'select', request: getBusinessUnitsAPI  },
  { name: 'rol_id', label: 'Rol', type: 'select', request: getRolesAPI  },
  { name: 'perfil_id', label: 'Perfil', type: 'select', request: getProfilesAPI  },
  { name: 'area_id', label: 'Cargo/Área', type: 'select', request: getAreasAPI  },
];

export const requestDataKeys = [
  `nombre_apellidos${separator}email`,  "employee_id",  `geografia_n1${separator}bu`,  "rol",  "perfil",  "area"
];

export const nestedFields = {
  geografia_n1_id: ['bu_id']
}

