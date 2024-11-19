import { FC, SetStateAction, useState } from "react";
import styles from './Login.module.scss';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

const Login:FC = () => {
  const [value, setValue] = useState('bob@example.com')
  const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setValue(e.target.value)
  }

  return (
    <div className={`${styles.login} mt-30`}>
      <h2 className="mb-6 text text_type_main-medium">Вход</h2>
      <EmailInput
        onChange={onChange}
        value={value}
        name={'email'}
        isIcon={false}
        extraClass="mb-6"
      />

      <PasswordInput
        onChange={onChange}
        value={value}
        name={'password'}
        extraClass="mb-6"
      />

      <Button
        htmlType={"button"}
        extraClass="mb-20"
        size="medium"
      >Войти</Button>

      <div>
        <span className="text text_type_main-small">Вы - новый пользователь?&nbsp;</span>
        <a href="/register" className={`text text_type_main-small ${styles.button_text}`}>Зарегестрироваться</a>
      </div>

      <div className="g">
        <span className="text text_type_main-small">Забыли пароль?&nbsp;</span>
        <a href="/forgot-password" className={`text text_type_main-small ${styles.button_text}`}>Восстановить пароль</a>
      </div>
    </div>
  )
}

export default Login