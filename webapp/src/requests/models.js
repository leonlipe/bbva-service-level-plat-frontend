import { queryFilter } from "@/utils/requests";
import { pagination } from '@/constants/pagination';

export const getModelAPI = (id) => {
  console.log(`GET /v1/modelo/${id}`);

  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        { data: {
          "tiempos_respuesta": true,
          "fuente": "AKAMAI/DEVO",
          "cfs_id": 1,
          "meta_partnership_minimum": "something",
          "estatus_medicion_partnership_id": 1,
          "entorno_id": 1,
          "cbps": [
              {
                  "modelo_id": 3,
                  "numero": 1,
                  "id": 2,
                  "nombre": "cbp1",
                  "operativas": [
                      {
                          "cbp_id": 2,
                          "umbral_tr": 1,
                          "nombre": "operativa name 1",
                          "elemento_variable": "variable1",
                          "es_madre": true
                      },
                      {
                          "cbp_id": 2,
                          "umbral_tr": 2,
                          "nombre": "operativa name 2",
                          "elemento_variable": "variable2",
                          "es_madre": true
                      }
                  ]
              },
              {
                  "modelo_id": 3,
                  "numero": 2,
                  "id": 3,
                  "nombre": "cbp2",
                  "operativas": [
                      {
                          "cbp_id": 3,
                          "umbral_tr": 3,
                          "nombre": "operativa name a",
                          "elemento_variable": "variable_a",
                          "es_madre": true
                      },
                      {
                          "cbp_id": 3,
                          "umbral_tr": 4,
                          "nombre": "operativa name b",
                          "elemento_variable": "variable_b",
                          "es_madre": true
                      }
                  ]
              }
          ],
          "criticidad_id": 1,
          "bu": "México",
          "meta_partnership_expected": "something",
          "estatus_medicion_partnership": "As Is",
          "estatus_id": 1,
          "fecha_alta": "2023-11-15",
          "niveles_servicio": true,
          "ventanas_general": [
              {
                  "dias_habiles": true,
                  "hora_inicio": "19:15",
                  "dia_inicio": 2,
                  "dia_fin": 6,
                  "hora_fin": "01:30",
                  "id": 1
              },
              {
                  "dias_habiles": true,
                  "hora_inicio": "19:15",
                  "dia_inicio": 2,
                  "dia_fin": 6,
                  "hora_fin": "01:30",
                  "id": 2
              }
          ],
          "id": 3,
          "bu_id": 1,
          "fecha_inicio_partnership_initial": "2023-11-15",
          "tipo_modelo_id": 1,
          "fecha_periodo_garantia": "2023-11-15",
          "tipo_modelo": "RUM",
          "fecha_inicio_partnership_as_ls": "2023-11-15",
          "partnership": "Omega",
          "service_owner": "Adrián Sanchez DEV",
          "meta_tiempo_respuesta": 20,
          "partnership_id": 1,
          "criticidad": "Critico global",
          "version": 1.0,
          "entorno": "Producción",
          "estatus_medicion": "Oficial",
          "cfs": "App Empresas",
          "estatus": "Activo",
          "fecha_inicio_version": "2023-11-15",
          "fecha_activacion": "2023-11-15",
          "fecha_inactivacion": "2024-11-15",
          "estatus_medicion_id": 1,
          "meta_disponibilidad": 19,
          "fuente_id": 1,
          "fecha_inicio_oficial": "2023-11-15",
          "rfo_clp": true,
          "service_owner_id": 1
        }}
      )
    })
  });
};

export const getModelsAPI = (
  pageNumber = pagination.number,
  pageSize = pagination.size,
  filters = []
) => {
  const query = queryFilter(filters, pageNumber, pageSize);

  console.log('List /v1/Model/list ', query);
  
  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        { data: {
          "count": 7,
          "items": [
             {
               id: 1,
                "bu_id": 1,
                "bu": "México",
                cfs: 'CFS 1',
                cfs_id: 1,
                entorno: 'algún entorno',
                estatus: 'Activo',
                version: 1,
                fuente: 'DCRUM',
                fuente_id: 1,
                estatus_medicion: 'Oficial'
             }
          ]
        }
      });
    }
  )});
};
