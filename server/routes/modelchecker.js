const checker = (fields, body) => {
  return body && fields.split(" ").every((prop) => prop in body);
};

const userChecker = (body) => {
  return checker("firstname lastname number email adress location", body);
};

const communityChecker = (body) => {
  return checker("name location private", body);
};

const offerChecker = (body) => {
  return checker("user_id quantity time_of_purchase broken_pkg", body);
};

const requestChecker = (body) => {
  return checker("user_id product_text quantity", body);
};

const transactionChecker = (body) => {
  return checker("responder_id time_of_expiration", body);
};

export {
  userChecker,
  communityChecker,
  offerChecker,
  requestChecker,
  transactionChecker,
};
