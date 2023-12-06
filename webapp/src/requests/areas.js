export const getAreasAPI = () => {
  console.log('/v1/catalogos/area');

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 
        [
          {
            "id": 1,
            "nombre": "I&O Service Management - Services Level Metrics"
          },
          {
            "id": 2,
            "nombre": "I&O Service Management - Account Manager"
          },
          {
            "id": 3,
            "nombre": "Service Owner Contact Center (Banca Telefónica)"
          },
          {
            "id": 4,
            "nombre": "Service Owner Oficinas (Sucursales)"
          }
        ]}
      );
    });
  });
};
