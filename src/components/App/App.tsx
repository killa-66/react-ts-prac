import { FC } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

const App:FC = () => {
  return (
    <>
      <AppHeader />
      <BurgerIngredients />
    </>
  )
};

export default App;