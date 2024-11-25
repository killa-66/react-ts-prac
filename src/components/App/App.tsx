import { FC } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Profile from '../../pages/Profile/Profile';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../BurgerIngredients/IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { OnlyAuth, OnlyUnAuth } from '../ProtectedRouteElement/ProtectedRouteElement';
import styles from './App.module.scss';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import IngredientDetailsPage from '../../pages/IngredientDetailsPage/IngredientDetailsPage';

const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundState = location.state?.background;

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
            element={<IngredientDetailsPage />}
          />
        </Routes>

        {backgroundState && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal title="Детали ингредиента" onClose={() => navigate(-1)}>
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
