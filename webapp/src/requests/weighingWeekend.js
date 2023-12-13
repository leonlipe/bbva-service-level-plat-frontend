import instanceAPI from "./axiosconfig";
import { queryFilter } from "@/utils/requests";
import { pagination } from '@/constants/pagination';

export const createWeighingWeekendAPI = ( data) => {
  console.log(`Create /v1/ponderacion`, data);
  return instanceAPI.patch( `/v1/ponderacion/add`, data );
};

export const removeWeighingWeekendAPI = (id) => {
  console.log(`Delete /v1/ponderación/${id}`);
  return instanceAPI.patch( `/v1/ponderacion/${id}`);
};

export const updateWeighingWeekendAPI = (id, data) => {
  console.log(`Update /v1/ponderacion/${id}`, data);
  return instanceAPI.patch( `/v1/ponderacion/${id}`, data );
};

export const getWeighingWeekendsAPI = (
  pageNumber = pagination.number,
  pageSize = pagination.size,
  filters = []
) => {
  const query = queryFilter(filters, pageNumber, pageSize);

  console.log(`/v1/ponderacion/list`, query);

  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        { data: {
          "count": 2,
          "items": [
            {
              "id": 1,
              "cfs": "App Empresas update",
              "cfs_id": 2,
              "bu": "México",
              "bu_id": 1,
              "fecha_vigencia": "2024-01-12",
              "fecha_configuracion": "2023-11-30",
              "usuario": "Adrián Sanchez DEV",
              "ponSabado": 10,
              "ponDomingo": 20
            },
            {
              "id": 2,
              "cfs": "App Empresas",
              "cfs_id": 3,
              "bu": "México",
              "bu_id": 1,
              "fecha_vigencia": "2024-01-01",
              "fecha_configuracion": "2023-12-07",
              "usuario": "Adrián Sanchez DEV",
              "ponSabado": 5,
              "ponDomingo": 10
            }
          ]
        }}
      );
    });
  })
};
