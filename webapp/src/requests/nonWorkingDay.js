import instanceAPI from "./axiosconfig";
import { queryFilter } from "@/utils/requests";
import { pagination } from '@/constants/pagination';

export const createNonWorkingDayAPI = (data) => {
  console.log('create /v1/dia/add', data);
  return instanceAPI.post( '/v1/dia/add', data );
};

export const updateNonWorkingDayAPI = (id, data) => {
  console.log(`Update /v1/dia/${id}`, data);
  return instanceAPI.patch( `/v1/dia/${id}`, data );
};

export const removeNonWorkingDayAPI = (id) => {
  console.log(`remove /v1/dia/${id}`);
  return instanceAPI.delete( `/v1/dia/${id}`);
};

export const getNonWorkingDaysAPI = (
  pageNumber = pagination.number,
  pageSize = pagination.size,
  filters = []
) => {
  const query = queryFilter(filters, pageSize, pageNumber);
  console.log('/v1/dia/list', query);

  return new Promise( (resolve, reject) => {
    setTimeout(() => {
      resolve(
        {data: {
          "count": 2,
          "items": [
            {
              "id": 1,
              "day": 16,
              "month": 9,
              "monthText": "Septiembre",
              "year": 2024,
              "bu": "México",
              "bu_id": 1,
              "date": "2024-09-16"
            },
            {
              "id": 2,
              "day": 1,
              "month": 9,
              "monthText": "Enero",
              "year": 2024,
              "bu": "México",
              "bu_id": 1,
              "date": "2024-01-01"
            }
          ]
        }}
      );
    });
  });
};
