import { queryFilter } from "@/utils/requests";
import { pagination } from '@/constants/pagination';

export const getGeographyN1sAPI = (
  pageNumber = pagination.number,
  pageSize = pagination.size,
  filters = []
) => {
  const query = queryFilter(filters, pageNumber, pageSize);
  console.log('List Geografías ', query);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 
        [
          {
            "id": 1,
            "titulo": "América"
          },
          {
            "id": 2,
            "titulo": "Europa"
          },
          {
            "id": 3,
            "titulo": "Global"
          }
        ]}
      );
    });
  });
};
