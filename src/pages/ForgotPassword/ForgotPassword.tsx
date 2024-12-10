import React, { FC, useState } from 'react';
import styles from './ForgotPassword.module.scss'
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useResetPasswordMutation } from '../../services/userApi';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const ForgotPassword:FC = () => {
  const [email, setEmail] = useState('');
  const [resetPassword, { isLoading, isError, isSuccess }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const location = useLocation();


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleReset = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await resetPassword({ email }).unwrap();
      console.log('Письмо с инструкцией отправлено на ваш email.');
      console.log(location.state)
      navigate('/reset-password', { state: { fromForgotPassword: true } });
      console.log(location.state)
    } catch {
      console.log('Не удалось отправить письмо. Проверьте email и повторите попытку.');
    }
  };

  return (
    <div>
   <div className={`${styles.forgot_password} mt-30`}>
      <h2 className='mb-6 text text_type_main-medium'>Восстановление пароля</h2>
      <form className={styles.input_section} onSubmit={handleReset}>
        <EmailInput
          onChange={onChange}
          value={email}
          name={'email'}
          isIcon={false}
          extraClass='mb-6'
          placeholder='Укажите e-mail'
        />

        <Button
          htmlType={'submit'}
          extraClass='mb-20'
          size='medium'
          disabled={isLoading}
        >Восстановить</Button>

        <div>
          <span className='text text_type_main-small'>Вспомнили пароль?&nbsp;</span>
          <NavLink
            to={'/login'}
            className={`text text_type_main-small ${styles.button_text}`}>
            Войти
          </NavLink>
        </div>
      </form>

    </div>
    </div>
  )
}

export default ForgotPassword;