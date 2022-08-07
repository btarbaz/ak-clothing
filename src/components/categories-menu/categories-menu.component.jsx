import './categories.styles.scss';
import CategoryItem from '../category-item/category-item.component';

const CategoriesMenu = ({ categories }) => {
  return (
    <div className="categories-menu-container">
      {categories.map(category => {
        return <CategoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};
export default CategoriesMenu;
