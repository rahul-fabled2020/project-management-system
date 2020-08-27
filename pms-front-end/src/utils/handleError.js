const handleError = (err) => {
  let error = '';
  if (err.message) {
    error = err.message;
  } 
  if (err.details) {
    error = err.details.map((errorDetails) => errorDetails.message).join(', ');
  }

  return error;
}

export default handleError;