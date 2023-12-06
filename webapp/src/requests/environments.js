export const getEnvironmentsAPI = () => {
  console.log('List Environment');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data:
        [
          {
              "titulo": "Producción",
              "id": 1
          },
          {
              "titulo": "Calidad",
              "id": 2
          },
          {
              "titulo": "Test",
              "id": 3
          }
        ]
      })
    })
  });
};
