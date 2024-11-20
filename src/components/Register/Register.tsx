import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useState } from 'react';
import styles from './Register.module.scss';
import { useRegisterMutation } from '../../services/userApi';
import { useNavigate } from 'react-router-dom';

const Register: FC = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(form).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Ошибка регистрации:', err);
    }
  };

  return (
    <div className={`${styles.register} mt-30`}>
      <h2 className='mb-6 text text_type_main-medium'>Регистрация</h2>
      <form className={styles.input_section} onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='Имя'
          onChange={handleChange}
          value={form.name}
          name='name'
          error={false}
          errorText='Ошибка'
          size='default'
          extraClass='mb-6'
        />

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
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </form>

      <div>
        <span className='text text_type_main-small'>
          Уже зарегистрированы?&nbsp;
        </span>
        <a
          href='/login'
          className={`text text_type_main-small ${styles.button_text}`}>
          Войти
        </a>
      </div>
    </div>
  );
};

export default Register;
