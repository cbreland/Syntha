export default obj => {

  function isEmpty (value) {
    return typeof value !== 'boolean' && !value;
  }
  const result = {};

  for (const key in obj) {
    const value = obj[key];
    if (!isEmpty(value)) {
      result[key] = value;
    }
  }

  return result;
};
