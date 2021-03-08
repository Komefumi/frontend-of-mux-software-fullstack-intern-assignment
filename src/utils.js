import { listFields } from './api';

const handlerFromSetter = (setter) => (e) => {
  setter(e.target.value);
};

const genEmptyFieldData = (storeName) => {
  return listFields(storeName).then((data) => {
    const { fields } = data;
    const emptyFieldData = fields.reduce((accum, { fieldName }) => {
      return { ...accum, [fieldName]: '' };
    }, {});
    return emptyFieldData;
  });
};

export { handlerFromSetter, genEmptyFieldData };
