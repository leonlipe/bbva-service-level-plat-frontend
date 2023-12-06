export const singleOptions = (data) => {
  const options = []
  data.forEach((item) => {
    options.push({ id: item, label: item });
  });

  return options;
};

export const yearsOptions = () => {
  const currentYear = new Date().getFullYear();
  return [
    { id: currentYear, label: currentYear },
    { id: currentYear + 1, label: currentYear + 1 }
  ];
};

const bisiesto = (item) => {
  if(item % 400 === 0) {
    return true;
  }

  return (item % 100 === 0) ? false : item % 4 === 0;
};

export const daysOptions = (year, month) => {
  const days = (limit) => [...Array(limit).keys()].map(i => i + 1);
  const data = (limit) => {
    return singleOptions( days(limit) );
  };

  const options = {
    1: data(31),
    2: data(bisiesto(year) ? 29 : 28),
    3: data(31),
    4: data(30),
    5: data(31),
    6: data(30),
    7: data(31),
    8: data(31),
    9: data(30),
    10: data(31),
    11: data(30),
    12: data(31),
  };
  return options[`${month}`];
};

export const monthsOptions = () => {
  const data = [1,2,3,4,5,6,7,8,9,10,11,12];
  return singleOptions(data);
};
