import { FC, useState } from 'react';
import styles from './Login.module.scss';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLoginMutation } from '../../services/userApi';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login: FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(form).unwrap();
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      navigate('/');
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    return (
        <Navigate to={from} replace />
    );
}

  return (
    <div className={`${styles.login} mt-30`}>
      <h2 className='mb-6 text text_type_main-medium'>Вход</h2>
      <form onSubmit={handleSubmit}>
        <EmailInput
          onChange={handleChange}
          value={form.email}
          name='email'
          isIcon={false}
          extraClass='mb-6'
        />
        <PasswordInput
          onChange={handleChange}
          value={form.password}
          name='password'
          extraClass='mb-6'
        />
        <Button
          htmlType='submit'
          extraClass='mb-20'
          size='medium'
          disabled={isLoading}>
          {isLoading ? 'Вход...' : 'Войти'}
        </Button>
      </form>
      <div>
        <span className='text text_type_main-small'>
          Вы - новый пользователь?&nbsp;
        </span>
        <NavLink
          to={'/register'}
          className={`text text_type_main-small ${styles.button_text}`}>
          Зарегистрироваться
        </NavLink>
      </div>
      <div>
        <span className='text text_type_main-small'>Забыли пароль?&nbsp;</span>
        <NavLink
          to={'/forgot-password'}
          className={`text text_type_main-small ${styles.button_text}`}>
          Восстановить пароль
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
