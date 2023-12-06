import { queryFilter } from "@/utils/requests";
import { pagination } from '@/constants/pagination';
import { instanceAPI } from '@/requests/axiosconfig';

export const createBusinessUnitAPI = (data) => {
  console.log('CREATE /v1/bu/add ', data);
  return instanceAPI.post('/v1/bu/add', data);
};

export const updateBusinessUnitAPI = (id, data) => {
  console.log(`UPDATE /v1/bu/${id} `, data);
  return instanceAPI.patch(
    `/v1/bu/${id}`, data
  );
};

export const removeBusinessUnitAPI = (id) => {
  console.log(`DELETE /v1/bu/${id}`);
  return instanceAPI.delete(id);
};

export const getBusinessUnitsAPI = (
  pageNumber = pagination.number,
  pageSize = pagination.size,
  filters = []
) => {

  const query = queryFilter(filters, pageNumber, pageSize);

  console.log('List /v1/bu/list ', query);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        { data: {
          "count": 4,
          "items": [
             {
                 "bu": "México",
                 "geografia_n1": "América",
                 "geografia_n1_id": 1,
                 "id": 1
             },
             {
                 "bu": "Argentina",
                 "geografia_n1": "América",
                 "geografia_n1_id": 1,
                 "id": 2
             },
             {
                 "bu": "Chile",
                 "geografia_n1": "América",
                 "geografia_n1_id": 1,
                 "id": 3
             },
             {
                 "bu": "Colombia",
                 "geografia_n1": "América",
                 "geografia_n1_id": 1,
                 "id": 4
             }
          ]
        }}
      );
    });
  });
};
