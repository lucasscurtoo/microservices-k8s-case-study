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
  DATABASE_URL: getEnvVariable('DATABASE_URL'),
  BROKER_URL: getEnvVariable('BROKER_URL'),
};
