export const getPartnershipAPI = () => {
    console.log(`GET v1/catalogos/partnership`);
  
    return  new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
            { data: {
              "count": 2,
              "items": [
                {
                    "titulo": "Omega",
                    "id": 1
                },
                {
                    "titulo": "NA",
                    "id": 2
                }
              ]
            }
          });
      })
    });
  };
