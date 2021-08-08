const TOKEN = '2aef7c8e9e108bbae49cb8afb8533241';

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

// const ErrorHTTPStatusCode = {
//   NOT_FOUND: 404,
//   BAD_TOKEN: 101,
//   INVALID_API_FN: 103,
//   NO_PHONE_NUMBER_PROVIDED: 210,
// };

const getUrl = (number) => {
  return `http://apilayer.net/api/validate?access_key=${TOKEN}&number=${number}`;
};

const checkStatus = (response) => {
  if (response.status < SuccessHTTPStatusRange.MIN || response.status > SuccessHTTPStatusRange.MAX) {
    const { status, statusText } = response;
    throw new Error(`${status}: ${statusText}`);
  }
  return response;
};

const api = (number) => {
  const URL = getUrl(number);
  return fetch(URL)
    .then(checkStatus)
    .then((response) => response.json())
    .catch((err) => { throw err; });
};

export { api };
