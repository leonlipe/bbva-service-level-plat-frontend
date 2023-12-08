export const getTypesModelsAPI = () => {
  console.log('Get /v1/catalogos/tiposModelo');

  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        { data: [
          {
            "titulo": "RUM",
            "id": 1
          },
          {
            "titulo": "Eventos",
            "id": 2
          }
        ] }
      )
    })
  });

}
