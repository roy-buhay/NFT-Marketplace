import { NextPage } from 'next';
import { FormikValues, FormikErrors } from 'formik'
import { ComponentType, ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (_page: ReactElement) => ReactNode;
  layout?: ComponentType;
};

export interface IPrice {
  _hex: string;
  _BigNumber: boolean;
}

export interface Web3Button {
  type: string;
  func: (() => void) | null;
}

export interface ICollection {
    name: string;
    url: string;
    description: string;
    category: string;
    logo: string;
    banner: string;
}

export interface INFT {
  tokenURI?: string;
  tokenId?: string;
  seller?: string;
  owner?: string;
  isSold: boolean;
  image: string;
  name: string;
  category?: string;
  collection: any;
  description: string;
  attributes?: any;
  price: string;
}

export interface IUser {
    address: string;
    bio: string;
    email: string;
    name: string;
    photoURL?: string;
}

export interface IAttribute {
  key: string;
  value: string;
}

export interface ISelectedCollection {
  name: string;
  logo: string;
}

export interface IItem {
  file: string;
  price: string;
  category: string;
  collection: ISelectedCollection;
  name: string;
  description: string;
  attributes: IAttribute[];
}

export interface IInput {
  field: FormikValues;
  label: string;
  name: string;
  errors: FormikErrors<any>; 
  props: any
}

export interface IHistory {
  event: string;
  price: any;
  from: string;
  to: string;
  date: number;
}