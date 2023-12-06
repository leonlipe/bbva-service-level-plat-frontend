import { validateRequired } from '@/utils/form';

export const headersTable = [
  { title: 'Fecha de configuración' },
  { title: 'Última modificación' },
  { title: 'Nombre y apellidos' },
  { title: 'High - menor que' },
  { title: 'High - mayor que' },
  { title: 'Very - menor que' },
];

export const filtersTable = [];

export const validationsForm = {
  high_menor_que: (value) => validateRequired(value),
  high_mayor_que: (value) => validateRequired(value),
  very_high_mayor_que: (value) => validateRequired(value),
  fecha_vigencia: (value) => validateRequired(value)
};

export const fieldsForm = [
  { name: 'high_menor_que', label: 'High - Menor que', type: 'number' },
  { name: 'high_mayor_que', label: 'High - Mayor que', type: 'number' },
  { name: 'very_high_mayor_que', label: 'Very High - Menor qué', type: 'number' },
  { name: 'fecha_vigencia' , label: 'Fecha de Vigencia', type: 'date'}
];

export const requestDataKeys = [
  'fecha_configuracion', 'fecha_vigencia', 'name', 'high_mayor_que',
  'high_menor_que', 'very_high_mayor_que'
];
