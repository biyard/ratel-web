import React, { useContext, useState } from 'react';
import { SpaceByIdContext } from './context';

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
