import { queryFilter } from "@/utils/requests";
import { pagination } from '@/constants/pagination';

export const getProfilesAPI = (
  pageNumber = pagination.number,
  pageSize = pagination.size,
  filters = []
) => {
  const query = queryFilter(filters, pageNumber, pageSize);

  console.log('List profiles', query);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 
        [
          {
            "id": 1,
            "tipo_usuario": "Usuario Administrador",
            "titulo": "Perfil 0",
            "fecha_creacion": "Nov 22, 2023, 2:02:22 PM"
          },
          {
            "id": 2,
            "tipo_usuario": "Usuario Operador",
            "titulo": "Perfil 1",
            "fecha_creacion": "Nov 22, 2023, 2:02:22 PM"
          },
          {
            "id": 3,
            "tipo_usuario": "Usuario Consulta",
            "titulo": "Perfil 2",
            "fecha_creacion": "Nov 22, 2023, 2:02:22 PM"
          },
          {
            "id": 4,
            "tipo_usuario": "Usuario Omega",
            "titulo": "Perfil 3",
            "fecha_creacion": "Nov 22, 2023, 2:02:22 PM"
          }
        ]}
      );
    });
  });
};
