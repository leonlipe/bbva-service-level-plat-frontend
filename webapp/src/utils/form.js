export const validateRequired = (value) => {
  if(value) {
    return '';
  }

  return 'Campo requerido';
};

export const validateEmail = (value) => {
  if ( !value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) ) {
    return 'Introduce un correo electrónico valido.';
  }

  return '';
};

export const manyValidations = (validations, value) => {
  let error = '';
  validations.every((validation) => {
    const message = validation(value);
    if( message ) {
      error = message;
      return false;
    }
    return true;
  });

  return error;
};

export const clearInputs = (keys) => {
  const inputs = {};
  keys.forEach( (name) => {
    inputs[name] = { error: '', value: null, touch: false };
  });
  return inputs;
}

export const isThereError = ( inputs ) => {
  return !Object.values(inputs).find((input) => !!input.error);
};

export const validateNumber = (value, min, max) => {
  if( value < min ) {
    return `El número no puede ser menor a ${min}`;
  } else if( value > max) {
    return `El número no puede ser mayor a ${max}`;
  }
  return '';
}

export const validateAllFields = (validations, inputs ) => {
  const validated = {...inputs};
  Object.keys(validations).forEach( (field) => {
     validated[field].error = validations[field]( inputs[field].value );
  });
  return validated;
};


export const parseCatalog = (catalog) => {
  const data = [];
  const array = catalog.items || catalog;
  array.forEach((item) => {
    data.push({id:  item.id, label: item?.nombre || item.titulo || item.bu});
  });
  return data;
};
  
