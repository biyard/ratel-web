import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type SpaceByIdContext = {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
  close: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
};

const noop: Dispatch<SetStateAction<boolean>> = () => {};

const SpaceByIdContext = createContext({
  expand: false,
  setExpand: noop,
  close: true,
  setClose: noop,
});

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expand, setExpand] = useState(false);
  const [close, setClose] = useState(true);

  return (
    <SpaceByIdContext.Provider value={{ expand, setExpand, close, setClose }}>
      {children}
    </SpaceByIdContext.Provider>
  );
}

export function useSpaceByIdContext() {
  return useContext(SpaceByIdContext);
}
