export const findIndexByKeyValue = (array, key, value) => {
  return array.findIndex((item) => item[key] === value);
}
