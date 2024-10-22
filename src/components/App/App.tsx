import { FC } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styless from './app.module.scss';

export interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

const App: FC = () => {
  return (
    <>
      <AppHeader />
      <div className={styless.menu}>
        <BurgerIngredients />
      </div>
    </>
  );
};

export default App;
