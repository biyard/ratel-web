import { createContext, Dispatch, SetStateAction } from 'react';

export type SpaceByIdContext = {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
  close: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
};

const noop: Dispatch<SetStateAction<boolean>> = () => {};

export const SpaceByIdContext = createContext({
  expand: false,
  setExpand: noop,
  close: true,
  setClose: noop,
});
