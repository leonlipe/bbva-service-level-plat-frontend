import instanceAPI from "./axiosconfig";
import { queryFilter } from "@/utils/requests";
import { pagination } from '@/constants/pagination';

export const createWeighingWeekendAPI = ( data) => {
  console.log(`Create /v1/ponderacion`, data);
  return instanceAPI.patch( `/v1/Ponderacion/add`, data );
};

export const removeWeighingWeekendAPI = (id) => {
  console.log(`Delete /v1/ponderación/${id}`);
  return instanceAPI.patch( `/v1/Ponderacion/${id}`);
};

export const updateWeighingWeekendAPI = (id, data) => {
  console.log(`Update /v1/ponderacion/${id}`, data);
  return instanceAPI.patch( `/v1/Ponderacion/${id}`, data );
};

export const getWeighingWeekendsAPI = (
  pageNumber = pagination.number,
  pageSize = pagination.size,
  filters = []
) => {
  const query = queryFilter(filters, pageNumber, pageSize);

  console.log(`/weighingWeekends`, query);

  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        { data: {
          "count": 2,
          "items": [
            {
              id: 1,
              'date_setup': '2023-11-12',
              'bu_id': 1,
              'bu': 'Mexico',
              'cfs': 'CFSS Q',
              'cfs_id': 2,
              'expiration_date': '2024-12-11',
              'updated_at': '2024-12-11',
              weighing_saturday: 50,
              weighing_sunday: 70
            },
            {
              id: 2,
              'bu_id': 1,
              'bu': 'Mexico',
              'cfs': 'CFSS Q',
              'cfs_id': 2,
              'date_setup': '2023-11-12',
              'expiration_date': '2024-12-11',
              'updated_at': '2024-12-11',
              weighing_saturday: 70,
              weighing_sunday: 80
            }
          ]
        }}
      );
    });
  })
};
