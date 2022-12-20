import React from 'react';

import { IUser } from '../types/services/user.types';

interface IUserContext {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

export default React.createContext({
  user: undefined,
  setUser: () => {},
} as IUserContext);
