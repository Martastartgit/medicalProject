import * as bcrypt from 'bcrypt';

import {config} from '../config';

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, config.SaltRounds);
export const comparePassword = (password: string, hashPassword: string): Promise<boolean> => bcrypt.compare(password, hashPassword);
