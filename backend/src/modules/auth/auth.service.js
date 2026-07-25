import { comparePassword } from "../../utils/password.js";
import { generateToken } from "../../utils/jwt.js";

import * as repository from "./auth.repository.js";

export const getAccounts = async () => {
  return await repository.getAccounts();
};

export const login = async (username, password) => {
  const user = await repository.findByUsername(username);

  if (!user) {
    throw new Error("Usuario o contraseña incorrectos.");
  }

  const valid = await comparePassword(password, user.password);

  if (!valid) {
    throw new Error("Usuario o contraseña incorrectos.");
  }

  const token = generateToken({
    id: user.idusuario,
    codigo: user.codigo,
    username: user.username,
    rol: user.rol,
  });

  return {
    token,

    usuario: {
      id: user.idusuario,
      codigo: user.codigo,
      username: user.username,
      rol: user.rol,
    },
  };
};
