import AppError from "../errors/AppError.js";

export const required = (value, field) => {
  if (value === undefined || value === null || value === "") {
    throw new AppError(`${field} es obligatorio.`);
  }
};

export const positive = (value, field) => {
  if (Number(value) <= 0) {
    throw new AppError(`${field} debe ser mayor a cero.`);
  }
};

export const arrayNotEmpty = (array, field) => {
  if (!Array.isArray(array) || array.length === 0) {
    throw new AppError(`${field} debe contener al menos un elemento.`);
  }
};
