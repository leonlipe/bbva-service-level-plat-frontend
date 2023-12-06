import { separator } from '@/constants/general';

export const buildData = (data, keys) => {
  const build = {};
  Object.values(data.items).forEach( (item) => {
    build[item.id] = keys.map( (key) => {
      let value = item[key];
    if( key.includes(separator) ) {
      const key1 = key.split(separator)[0];
      const key2 = key.split(separator)[1];
      value = item[key1] + separator + item[key2]
    }
    return { value }
    });
  });
  return build;
};
