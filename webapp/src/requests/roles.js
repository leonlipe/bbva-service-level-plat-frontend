import { queryFilter } from "@/utils/requests";
import { pagination } from '@/constants/pagination';

export const getRolesAPI = (
  pageNumber = pagination.number,
  pageSize = pagination.size,
  filters = []
) => {
  const query = queryFilter(filters);
  console.log('List roles', query);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data:
        [
          {
            "id": 1,
            "nombre": "Account Manager"
          },
          {
            "id": 2,
            "nombre": "Automation Service Quality"
          },
          {
            "id": 3,
            "nombre": "Governance SM"
          },
          {
            "id": 4,
            "nombre": "I&O"
          },
          {
            "id": 5,
            "nombre": "Program Management"
          },
          {
            "id": 6,
            "nombre": "Quality"
          },
          {
            "id": 7,
            "nombre": "Service Care"
          },
          {
            "id": 8,
            "nombre": "Service Health"
          },
          {
            "id": 9,
            "nombre": "Service Level Metric Autorizador"
          },
          {
            "id": 10,
            "nombre": "Service Level Metrics"
          },
          {
            "id": 11,
            "nombre": "Service Mgt"
          },
          {
            "id": 12,
            "nombre": "Service Owner"
          },
          {
            "id": 13,
            "nombre": "Service Quality"
          }
        ]}
      );
    });
  });
};
