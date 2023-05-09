import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];
export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;

export const cn = (...inputs: ClassValue[]) => twMerge(cx(inputs));

export const createVar = (name: any) =>
  Object.entries(name)
    .map(([name, val]) => ({ [`--${name}`]: val } as React.CSSProperties))
    .shift();
