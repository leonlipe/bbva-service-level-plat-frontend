import { instanceAPI } from "./axiosconfig";
import { queryFilter } from "@/utils/requests";
import { pagination } from '@/constants/pagination';

export const createUserAPI = (data) => {
  console.log('create /v1/User', data);
  return instanceAPI.post( '/v1/User/add', data );
};

export const updateUserAPI = (id, data) => {
  console.log(`Update /v1/User/${id}`, data);
  return instanceAPI.patch( `/v1/User/${id}`, data );
};

export const updateStatusUsersAPI = (ids, active) => {
  console.log(`Update /v1/changeStatus`, { ids, activo: active } );
  return instanceAPI.post(
    '/v1/User/changeStatus',
    { id: ids, activo: active }
  )
};

export const getUsersAPI = (
  pageNumber = pagination.number,
  pageSize = pagination.size,
  filters = []
) => {
  const query = queryFilter(filters, pageSize, pageNumber);
  console.log('List /v1/User/list ', query);
  
  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        { data: {

          "count": 7,
          "items": [
             {
                 "area": "I&O Service Management - Account Manager",
                 "geografia_n1_id": 1,
                 "nombre_apellidos": "Alejandra Aguilera Hernandez",
                 "area_id": 2,
                 "rol": "Automation Service Quality",
                 "perfil": "Perfil 0",
                 "bu": "México",
                 "geografia_n1": "América",
                 "perfil_id": 1,
                 "id": 1,
                 "employee_id": "XMF4602",
                 "bu_id": 1,
                 "rol_id": 2,
                 "email": "alejandra_aguilera@bbva.com",
                 "activo": true
             },
             {
                 "area": "I&O Service Management - Account Manager",
                 "geografia_n1_id": 1,
                 "nombre_apellidos": "Andres Aguilera Hernandez",
                 "area_id": 2,
                 "rol": "Automation Service Quality",
                 "perfil": "Perfil 1",
                 "bu": "México",
                 "geografia_n1": "América",
                 "perfil_id": 1,
                 "id": 2,
                 "employee_id": "XMF4661",
                 "bu_id": 1,
                 "rol_id": 2,
                 "email": "andres_aguilera@bbva.com",
                 "activo": false
             }
          ]
        }}
      );
    }, 300);
  })
};

export const getListUserNamesAPI = () => {
  console.log('List user names /v1/User/listUserNames');

  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        { data: [
          {
              "id": "1",
              "nombre": "Adrián Sanchez DEV"
          }
        ] }
      )
    })
  });
};

