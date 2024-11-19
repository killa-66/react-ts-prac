import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, SetStateAction, useState } from "react";
import styles from './Register.module.scss'


const Register: FC = () => {
  const [value, setValue] = useState('bob@example.com')
  const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setValue(e.target.value)
  }

  return(
    <div className={`${styles.register} mt-30`}>
      <h2 className="mb-6 text text_type_main-medium">Регистрация</h2>
      <div className={styles.input_section}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setValue(e.target.value)}
          icon={'EditIcon'}
          value={value}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />

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
        >Зарегестрироваться</Button>

        <div>
          <span className="text text_type_main-small">Уже зарегестрированы?&nbsp;</span>
          <a href="/login" className={`text text_type_main-small ${styles.button_text}`}>Войти</a>
        </div>
      </div>

    </div>
  )
}

export default Register;