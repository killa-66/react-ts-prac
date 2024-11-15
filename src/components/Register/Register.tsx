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
      <div className={`${styles.profile_section} mr-15`}>
        <div className={`${styles.profile_element} text text text_type_main-medium`}>Профиль</div>
        <div className={`${styles.profile_element} text text text_type_main-medium`}>История заказов</div>
        <div className={`${styles.profile_element} mb-20 text text text_type_main-medium`}>Выход</div>
        <div className={`${styles.profile_element} text text_type_main-small`}>
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </div>

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


      </div>

    </div>
  )
}

export default Register;