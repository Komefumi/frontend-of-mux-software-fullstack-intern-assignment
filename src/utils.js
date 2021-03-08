const handlerFromSetter = (setter) => (e) => {
  setter(e.target.value);
};

export { handlerFromSetter };
