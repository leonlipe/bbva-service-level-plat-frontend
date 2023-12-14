import { validateRequired } from '@/utils/form';

export const dataCBPS = {
  id:null, // si se edita el modelo para agregar un CBP el atributo id debe de ser null, el back sabrá que se trata de un nuevo CBP a crear, si el id no es null el CBP se actualizará
  nombre: null,
  numero: null,
  operativas: []
};

export const dataOperativa = {
  id:null,
  nombre: null,
  elemento_variable: null,
  umbral_tr: null,
  es_madre: false
};

export const dataVentana = {
  id: null,
  dia_inicio: null,
  hora_inicio: null,
  dia_fin: null,
  hora_fin: null,
  dias_inhabiles: false
};

export const dataFirstSection = {
  data: {
    bu_id: null,
    cfs_id: null,
    service_owner: null,
    criticidad_id: null,
    entorno_id: null,
    rfo_clp: false,
    estatus_id: null,
    estatus_medicion_id: null,
    tipo_modelo_id: null,
    fuente_id: null,
    version: null,
    meta_disponibilidad: null,
    meta_tiempo_respuesta: null,
    niveles_servicio: null,
    tiempos_respuesta: false,
    fecha_alta: null,
    fecha_activacion: null,
    fecha_inactivacion: null,
    fecha_periodo_garantia: null,
    fecha_inicio_oficial: null,
    fecha_inicio_version: null,
    partnership_id: null,
    estatus_medicion_partnership_id: null,
    meta_partnership_expected: null,
    meta_partnership_minimum: null,
    fecha_inicio_partnership_initial: null,
    fecha_inicio_partnership_as_ls: null
  },
  ventanas_general:[ {...dataVentana}]
};

export const dataSecondSection = {
  cbps: [
    {
      model_id : null,
      name_cbp: null,
      operational: [
        {
          name_operational: null,
          element: null,
          umbral_tr: null,
          variable_mother: null
        }
      ]
    }
  ]
};

export const days = [ 
  { id: 1, label: 'Lunes'},
  { id: 2, label: 'Martes'},
  { id: 3, label: 'Miércoles'},
  { id: 4, label: 'Jueves'},
  { id: 5, label: 'Viernes'},
  { id: 6, label: 'Sábado'},
  { id: 7, label: 'Domingo'},
]

export const validationsVentana = {
  id:  (value) => validateRequired(value),
  dia_inicio: (value) => validateRequired(value),
  hora_inicio: (value) => validateRequired(value),
  dia_fin: (value) => validateRequired(value),
  hora_fin: (value) => validateRequired(value),
  dias_inhabiles: (value) => ''
};

export const validateFirstSection = {
    bu_id: (value) => validateRequired(value),
    cfs_id: (value) => validateRequired(value),
    service_owner: (value) => validateRequired(value),
    criticidad_id: (value) => validateRequired(value),
    entorno_id: (value) => validateRequired(value),
    rfo_clp: (value) => '',
    estatus_id: (value) => validateRequired(value),
    estatus_medicion_id: (value) => validateRequired(value),
    tipo_modelo_id: (value) => validateRequired(value),
    fuente_id: (value) => validateRequired(value),
    version: (value) => validateRequired(value),
    meta_disponibilidad: (value) => validateRequired(value),
    meta_tiempo_respuesta: (value) => validateRequired(value),
    niveles_servicio: (value) => validateRequired(value),
    tiempos_respuesta: (value) => validateRequired(value),
    fecha_alta: (value) => validateRequired(value),
    fecha_activacion: (value) => validateRequired(value),
    fecha_inactivacion: (value) => validateRequired(value),
    fecha_periodo_garantia: (value) => validateRequired(value),
    fecha_inicio_oficial: (value) => validateRequired(value),
    fecha_inicio_version: (value) => validateRequired(value),
    partnership_id: (value) => validateRequired(value),
    estatus_medicion_partnership_id: (value) => validateRequired(value),
    meta_partnership_expected: (value) => validateRequired(value),
    meta_partnership_minimum: (value) => validateRequired(value),
    fecha_inicio_partnership_initial: (value) => validateRequired(value),
    fecha_inicio_partnership_as_ls: (value) => validateRequired(value)
}


export const validateSecondSection = {
  cbps: [
    {
      name_cbp: (value) => validateRequired(value),
      operational: [
        {
          name_operational: (value) => validateRequired(value),
          element: (value) => validateRequired(value),
          umbral_tr: (value) => validateRequired(value),
          variable_mother: (value) => validateRequired(value)
        }
      ]
    }
  ]
}
