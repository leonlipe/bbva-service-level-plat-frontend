import instanceAPI from "./axiosconfig";
import { queryFilter } from "@/utils/requests";
import { pagination } from '@/constants/pagination';

export const createThresholdD1API = (data) => {
  console.log(`Create /v1/umbrald/add`, data);
  return instanceAPI.post( `/v1/umbrald/add`, data );
};

export const getThresholdsD1API = (
  pageNumber = pagination.number,
  pageSize = pagination.size,
  filters = []
) => {
  const query = queryFilter(filters, pageNumber, pageSize);

  console.log('LIST /v1/umbrald/list', query);

  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        { data: {
          "count": 1,
          "items": [
            {
                "high_menor_que": 2.5100,
                "high_mayor_que": 5.5000,
                "usuario_id": 2,
                "fecha_configuracion": "04/12/2023",
                "fecha_vigencia": "04/12/2024",
                "usuario": "Andres R",
                "id": 2,
                "very_high_mayor_que": 5.0100
            }
          ]
        }}
      );
    });
  });
}
