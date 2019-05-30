
const errorParser = (errors) => {
  const parsedError = [];
  try {
    if (Object.values(errors.errors).length > 0) {
      const errorKeys = Object.keys(errors.errors);

      errorKeys.forEach((key) => {
        const errorObject = {
          location: 'body',
          param: errors.errors[key].path,
          value: '',
          msg: errors.errors[key].message,
        };

        parsedError.push(errorObject);
      });

      return parsedError;
    }
  } catch (e) {
    return errors.message;
  }
};

export default errorParser;
