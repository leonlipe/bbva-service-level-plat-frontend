export const getMeasurementStatusesAPI = () => {
  console.log('List Estatus de Medición');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data:
        [
            {
                "titulo": "Oficial",
                "id": 1
            },
            {
                "titulo": "Periodo de garantia",
                "id": 2
            },
            {
                "titulo": "Baja",
                "id": 3
            }
        ]
      })
    })
  });
};
