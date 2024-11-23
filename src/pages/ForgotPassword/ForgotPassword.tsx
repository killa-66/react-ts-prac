import { FC, useState } from 'react';
import styles from './ForgotPassword.module.scss'
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useResetPasswordMutation } from '../../services/userApi';
import { NavLink, useNavigate } from 'react-router-dom';

const ForgotPassword:FC = () => {
  const [email, setEmail] = useState('');
  const [resetPassword, { isLoading, isError, isSuccess }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleReset = async () => {
    try {
      await resetPassword({ email }).unwrap();
      console.log('Письмо с инструкцией отправлено на ваш email.');
      navigate('/reset-password', { state: { fromForgotPassword: true } });
    } catch {
      console.log('Не удалось отправить письмо. Проверьте email и повторите попытку.');
    }
  };

  return (
    <div>
   <div className={`${styles.forgot_password} mt-30`}>
      <h2 className='mb-6 text text_type_main-medium'>Восстановление пароля</h2>
      <div className={styles.input_section}>
        <EmailInput
          onChange={onChange}
          value={email}
          name={'email'}
          isIcon={false}
          extraClass='mb-6'
          placeholder='Укажите e-mail'
        />

        <Button
          htmlType={'button'}
          extraClass='mb-20'
          size='medium'
          onClick={handleReset}
        >Восстановить</Button>

        <div>
          <span className='text text_type_main-small'>Вспомнили пароль?&nbsp;</span>
          <NavLink
            to={'/login'}
            className={`text text_type_main-small ${styles.button_text}`}>
            Войти
          </NavLink>
        </div>
      </div>

    </div>
    </div>
  )
}

export default ForgotPassword;