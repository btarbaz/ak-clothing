import { createContext, useState, useEffect } from 'react';

import { getCollectionAndDocument } from '../utils/firebase/firebase.utils.js';
export const CategoriesContext = createContext({ categoriesMap: {} });

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      const categoriesMap = await getCollectionAndDocument();
      setCategoriesMap(categoriesMap);
      console.log(categoriesMap);
    };
    getCategories();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
