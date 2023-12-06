import instanceAPI from "./axiosconfig";
import { queryFilter } from "@/utils/requests";
import { pagination } from '@/constants/pagination';

export const updateStatusCfsAPI = (id, active) => {
  console.log(`Update Status /v1/cfs/${id}`, { activo: active } );
  return instanceAPI.patch(
    `/v1/cfs/${id}`, { activo: active }
  )
};

export const updateCfsAPI = (id, data) => {
  console.log(`UPDATE /v1/cfs/${id}`, data);
  return instanceAPI.patch(
    `/v1/cfs/${id}`, data
  );
};

export const createCfsAPI = (data) => {
  console.log(`CREATE /v1/cfs/add`, data);
  return instanceAPI.post('/v1/cfs/add', data );
};

export const removeCfsAPI = (id) => {
  console.log(`DELETE /v1/cfs/${id}`);
  return instanceAPI.delete(`/v1/cfs/${id}`);
};

export const getCfsesAPI = (
  pageNumber = pagination.number,
  pageSize = pagination.size,
  filters = []
) => {
  const query = queryFilter(filters, pageNumber, pageSize);

  console.log('/v1/cfs/list', query);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        { data: {
          "count": 2,
          "items": [
            {
              "id": 1,
              "nombre": "App Empresas",
              "bu_id": 1,
              "bu": "México",
              "activo": true
            },
            {
              "id": 2,
              "nombre": "App Empresas update",
              "bu_id": 2,
              "bu": "Argentina",
              "activo": false
            }
          ]
        }}
      );
    });
  });
};

