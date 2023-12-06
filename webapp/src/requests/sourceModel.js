export const getSourceModelsAPI = (
) => {
  console.log('List Fuente ');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 
       [
           {
               "titulo": "AKAMAI/DEVO",
               "id": 1
           },
           {
               "titulo": "DCRUM",
               "id": 2
           },
           {
               "titulo": "ELASTIK LOCAL",
               "id": 3
           },
           {
               "titulo": "Ether Cloud Services (ECS)",
               "id": 4
           },
           {
               "titulo": "ONEAGENT HUB",
               "id": 5
           },
           {
               "titulo": "ONEAGENT LOCAL",
               "id": 6
           }
       ]
      })
    })
  })
};
