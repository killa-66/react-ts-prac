import { FC, useState, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.scss';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const App: FC = () => {

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.menu}>
        <>
          <BurgerIngredients />
          <BurgerConstructor />
        </>
      </main>
    </div>
  );
};

export default App;
