import { alph, numb } from './RegularExpression';

export const isAlpha = (text) => {
  return alph.test(text) ? true : false;
};
