import { FC } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.scss';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';

const App: FC = () => {

  return (
    <div className={styles.page}>
      <AppHeader />
      <Router>
        <main className={styles.menu}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </>
              }
            />
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
