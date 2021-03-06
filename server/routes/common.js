const checkIntID = (id, res, msg) => {
  if (isNaN(id)) {
    res.status(400).json(msg);
    return true;
  }
  return false;
};

const checkEmptyBody = (body, res, msg) => {
  if (body === {} || body === [] || body === "") {
    res.status(400).json(msg);
    return true;
  }
  return false;
};

const checkEmptyParam = (param, res, msg) => {
  if (param === null || param === undefined || param === "") {
    res.status(400).json(msg);
    return true;
  }
  return false;
};

const stdErrorHandler = (err, res) => {
  console.error(err);
  return res.status(500).json(err);
};

export { checkIntID, checkEmptyBody, checkEmptyParam, stdErrorHandler };
