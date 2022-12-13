import { fill } from 'lodash';

export const createAndFillArray = (count: number) => fill(Array(count), 1).map((_, index) => index);
