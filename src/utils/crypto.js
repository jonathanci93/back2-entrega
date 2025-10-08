import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export function hashPasswordSync(plain) {
  return bcrypt.hashSync(plain, SALT_ROUNDS);
}

export function comparePasswordSync(plain, hash) {
  return bcrypt.compareSync(plain, hash);
}
