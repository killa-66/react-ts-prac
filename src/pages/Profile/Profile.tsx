import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation, useGetUserQuery, useSetUserMutation } from '../../services/userApi';

const Profile: FC = () => {
  const { data: userData, refetch } = useGetUserQuery();
  const [setUser] = useSetUserMutation();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if(userData?.user) {
      setForm({ name: userData.user.name, email: userData.user.email, password: '' })
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await setUser({ name: form.name, email: form.email }).unwrap();
      refetch();
    } catch (error) {
      console.error('Ошибка обновления данных пользователя:', error);
    }
  };

  const handleCancel = () => {
    if (userData?.user) {
      setForm({ name: userData.user.name, email: userData.user.email, password: '' });
    }
  };

  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('Refresh token не найден');

      await logout({ token: refreshToken }).unwrap();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/register');
    } catch (error) {
      console.error('Ошибка выхода из системы:', error);
    }
  };

  return (
    <div className={`${styles.profile} mt-30`}>
      <div className={`${styles.profile_section} mr-15`}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.profile_element} ${styles.profile_element_active} text text text_type_main-medium`
              : `${styles.profile_element} text text text_type_main-medium text_color_inactive`
          }
          to={'/profile'}>
          Профиль
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.profile_element} ${styles.profile_element_active} text text text_type_main-medium`
              : `${styles.profile_element} text text text_type_main-medium text_color_inactive`
          }
          to={'/orders'}>
          История заказов
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.profile_element} ${styles.profile_element_active} text text text_type_main-medium`
              : `${styles.profile_element} text text text_type_main-medium text_color_inactive`
          }
          to={'/'}
          onClick={handleLogout}>
          Выход
        </NavLink>
        <div
          className={`${styles.profile_element} text text_type_main-small text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </div>

      <div className={styles.input_section}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          icon={'EditIcon'}
          value={form.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
        />

        <EmailInput
          onChange={handleChange}
          value={form.email}
          name={'email'}
          isIcon={false}
          extraClass='mb-6'
        />

        <PasswordInput
          onChange={handleChange}
          value={form.password}
          name={'password'}
          extraClass='mb-6'
        />

        <div className={styles.button_section}>
          <Button onClick={handleSave} htmlType={'submit'}>Сохранить</Button>
          <Button onClick={handleCancel} htmlType={'submit'}>Отмена</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
