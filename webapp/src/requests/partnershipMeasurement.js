export const getPartnershipMeasurementAPI = () => {
    console.log(`GET v1/catalogos/medicionPartnership`);
  
    return  new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
            { data: {
              "count": 2,
              "items": [
                {
                  "titulo": "As Is",
                  "id": 1
                },
                {
                    "titulo": "Initial",
                    "id": 2
                }
              ]
            }
          });
      })
    });
  };
