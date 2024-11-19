import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, SetStateAction, useState } from 'react';
import styles from './Profile.module.scss';
import { NavLink } from 'react-router-dom';

const Profile: FC = () => {
  const [value, setValue] = useState('bob@example.com');
  const onChange = (e: { target: { value: SetStateAction<string> } }) => {
    setValue(e.target.value);
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
          to={'/'}>
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
