import { createContext } from 'react';

import { TSetStateAction } from './ts-services/types';

interface IPageContext {
  setCurrentPage: TSetStateAction
}

const PageContext = createContext<Partial<IPageContext>>({});

export { PageContext };
