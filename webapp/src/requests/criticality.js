export const getCriticalitiesAPI = () => {
  console.log('Get /v1/catalogos/criticidad');

  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        { data: [
          {
              "titulo": "Critico global",
              "id": 1
          },
          {
              "titulo": "Critico local",
              "id": 2
          },
          {
              "titulo": "Local",
              "id": 3
          }
        ] }
      )
    })
  });

}
