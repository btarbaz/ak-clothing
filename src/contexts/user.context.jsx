import { createContext, useState } from 'react';

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

// user provider wraps around component{childrens} so that component can use its values
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
