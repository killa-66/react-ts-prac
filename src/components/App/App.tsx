import { FC } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.scss';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import ResetPassword from '../ResetPassword/ResetPassword';

const App: FC = () => {

  return (
    <div className={styles.page}>
      <AppHeader />
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
          <Route path='/profile' element={<Profile />}/>
          <Route path='/forgot-password' element={<ForgotPassword />}/>
          <Route path='/reset-password' element={<ResetPassword />}/>
        </Routes>
      </main>
    </div>
  );
};

export default App;
