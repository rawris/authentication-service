const formatResponse = (res, response) => res.status(200).json({
  result: response,
  status: 200,
  error: null,
});

const formatError = (res, error, status = 500) => {
  let errorRef = error;
  if (Array.isArray(error)) {
    [errorRef] = error;
  }
  if (error && error.message) {
    errorRef = error.message;
  } else if (error && error.errors) {
    if (Array.isArray(error.errors)) {
      const [err] = error.errors[0];
      errorRef.errors = err;
    }
    errorRef = error.errors.message;
  }
  return res.status(status).json({
    result: null,
    status: status ? status.toString() : 500,
    error: errorRef,
  });
};

const arrayBufferToString = (buf) => String.fromCharCode.apply(null, new Uint8Array(buf));

const sendFileAsArrayBufferString = (res, arrayBuffer) => {
  const arrayBufferStr = arrayBufferToString(arrayBuffer);
  return res.status(200).send(arrayBufferStr);
};


module.exports = {
  formatResponse,
  formatError,
  sendFileAsArrayBufferString,
};
