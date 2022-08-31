import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux/es/exports';

import { getCollectionAndDocument } from '../../utils/firebase/firebase.utils';
import CatergoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { setCategories } from '../../store/categories/category.action';

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategories = async () => {
      const categoriesArray = await getCollectionAndDocument();
      dispatch(setCategories(categoriesArray));
    };
    getCategories();
  }, [dispatch]);
  return (
    <Routes>
      <Route index element={<CatergoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
