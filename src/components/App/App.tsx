import { FC } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.scss';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import ResetPassword from '../ResetPassword/ResetPassword';
import { OnlyAuth, OnlyUnAuth } from '../ProtectedRouteElement/ProtectedRouteElement';
import Modal from '../Modal/Modal';
import IngredientDetails from '../BurgerIngredients/IngredientDetails/IngredientDetails';

const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundState = location.state && location.state.background;

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.menu}>
        <Routes location={backgroundState || location}>
          <Route
            path="/"
            element={
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
            }
          />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />

          <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
          <Route
            path="/ingredients/:ingredientId"
            element={<IngredientDetails ingredient={null} />}
          />
        </Routes>

        {backgroundState && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal title="Детали ингредиента" onClose={() => navigate("/")}>
                  <IngredientDetails ingredient={null} />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default App;
