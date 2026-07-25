import * as service from "./combo.service.js";

export const create = async (req, res, next) => {
  try {
    const combo = await service.create(req.body);

    return res.status(201).json(combo);
  } catch (error) {
    next(error);
  }
};
