import { IEnumNumber } from '../ts-services/interfaces';

const TOKEN: string = '2aef7c8e9e108bbae49cb8afb8533241';

const SuccessHTTPStatusRange: IEnumNumber = {
  MIN: 200,
  MAX: 299,
};

// const ErrorHTTPStatusCode: IEnumNumber = {
//   NOT_FOUND: 404,
//   BAD_TOKEN: 101,
//   INVALID_API_FN: 103,
//   NO_PHONE_NUMBER_PROVIDED: 210,
// };

const getUrl = (number: string): string => {
  return `http://apilayer.net/api/validate?access_key=${TOKEN}&number=${number}`;
};

const checkStatus = (response): Promise<any> => {
  if (response.status < SuccessHTTPStatusRange.MIN || response.status > SuccessHTTPStatusRange.MAX) {
    const { status, statusText } = response;
    throw new Error(`${status}: ${statusText}`);
  }
  return response;
};

const api = (number: string) => {
  const URL: string = getUrl(number);

  return fetch(URL)
    .then(checkStatus)
    .then((response) => response.json())
    .catch((err) => {
      throw err;
    });
};

export { api };
