const capitalizeFirstLetter = (resource) => (
  resource.charAt(0).toUpperCase() + resource.slice(1)
);

export const editSuccessModal = (resource) => ({
  type: 'success',
  message: `Has editado el ${resource} correctamente`,
  title: `${capitalizeFirstLetter(resource)} Editado`
});

export const createSuccessModal = (resource) => ({
  type: 'success',
  title: `${capitalizeFirstLetter(resource)} creado`,
  message: `Has creado el ${resource} correctamente`
});

export const removeCautionModal = (resource) => ({
  type: 'caution',
  title: `¿Seguro que quieres eliminar el ${resource}?`,
  message: `El elemento borrará de manera permanente`
});

export const removeManyCautionModal = (resource) => ({
  type: 'caution',
  title: `¿Seguro que quieres eliminar ${resource}?`,
  message: `Los elementos se borrarán de manera permanente`
});

export const starSuccessModal = (resource) => ({
  type: 'success',
  title: `${capitalizeFirstLetter(resource)} activado`,
  message: `Has activado el ${resource} correctamente`
});

export const unstarSuccessModal = (resource) => ({
  type: 'success',
  title: `${capitalizeFirstLetter(resource)} desactivado`,
  message: `Has desactivado el ${resource} correctamente`
});

export const errorRequestModal = (action, error) => {
  const message = error?.response?.data?.message || 'Ocurrio un error, vuleve a intentar';
  return {
    type: 'caution',
    title: `Error al ${action}`,
    message: message
  }
};
