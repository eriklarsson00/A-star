const checkIntID = (id, res, msg) => {
  if (isNaN(id)) {
    console.log;
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

export { checkIntID, checkEmptyBody, checkEmptyParam };
