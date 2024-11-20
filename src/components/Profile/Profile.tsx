import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, SetStateAction, useState } from 'react';
import styles from './Profile.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../services/userApi';

const Profile: FC = () => {
  const [value, setValue] = useState('bob@example.com');
  const onChange = (e: { target: { value: SetStateAction<string> } }) => {
    setValue(e.target.value);
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
          onChange={(e) => setValue(e.target.value)}
          icon={'EditIcon'}
          value={value}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
        />

        <EmailInput
          onChange={onChange}
          value={value}
          name={'email'}
          isIcon={false}
          extraClass='mb-6'
        />

        <PasswordInput
          onChange={onChange}
          value={value}
          name={'password'}
          extraClass='mb-6'
        />
      </div>
    </div>
  );
};

export default Profile;
