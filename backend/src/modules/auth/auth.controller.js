import * as service from "./auth.service.js";

export const accounts = async (req, res, next) => {
  try {
    const data = await service.getAccounts();
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const data = await service.login(username, password);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const profile = async (req, res) => {
  return res.json(req.user);
};
