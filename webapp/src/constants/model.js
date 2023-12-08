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
  ventanas_general:[]
};

export const dataSecondSection = {
  modelo_id: null, // << ID del modelo al que pertenecen las operativas a actualizar
  cbps:[]
};

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
  dias_habiles: false
};
