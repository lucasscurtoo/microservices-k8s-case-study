import * as dotenv from 'dotenv';
dotenv.config();

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} no está definido`);
  }
  return value;
}

export const envs = {
  PORT: getEnvVariable('PORT'),
  REDIS_HOST: getEnvVariable('REDIS_HOST'),
  REDIS_PORT: getEnvVariable('REDIS_PORT'),
  DATABASE_URL: getEnvVariable('DATABASE_URL'),
  // Dominio publico donde resuelve el read-service, no el de este servicio.
  BASE_URL: getEnvVariable('BASE_URL').replace(/\/+$/, ''),
};
