
export const getStatusModelAPI = (
) => {
  console.log('List v1/catalogos/estatusModelo ');
  
  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        { data: 
          [
            {
              "titulo": "Activo",
              "id": 1
            },
            {
              "titulo": "Inactivo",
              "id": 2
            },
            {
              "titulo": "Borrador",
              "id": 3
            }
          ]
      })
    }
  )});
};
