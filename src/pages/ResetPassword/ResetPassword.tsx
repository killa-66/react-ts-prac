import { FC, useEffect, useState } from "react";
import styles from "./ResetPassword.module.scss";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSaveNewPasswordMutation } from "../../services/userApi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const ResetPassword: FC = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [saveNewPassword, { isLoading, isError, isSuccess }] = useSaveNewPasswordMutation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('Location State:', location.state);
    if (!location.state?.fromForgotPassword) {
      navigate('/forgot-password');
    }
  }, [location, navigate]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await saveNewPassword({ password, token }).unwrap();
      console.log("Пароль успешно обновлен!");
      navigate('/login', { state: { fromResetPassword: true } });
    } catch {
      console.log("Не удалось обновить пароль. Проверьте данные и попробуйте снова.");
    }
  };

  return (
    <div>
      <div className={`${styles.reset_password} mt-30`}>
        <h2 className="mb-6 text text_type_main-medium">Восстановление пароля</h2>
        <form className={styles.input_section} onSubmit={handleSave}>
          <PasswordInput
            onChange={handlePasswordChange}
            value={password}
            name="password"
            extraClass="mb-6"
            placeholder="Введите новый пароль"
          />

          <Input
            onChange={handleTokenChange}
            value={token}
            name="token"
            extraClass="mb-6"
            placeholder="Введите код из письма"
          />

          <Button
            htmlType="submit"
            extraClass="mb-20"
            size="medium"
            disabled={isLoading}
          >
            {isLoading ? "Сохранение..." : "Сохранить"}
          </Button>

          {isError && (
            <span className="text text_type_main-small text_color_error">
              Ошибка сохранения пароля. Проверьте данные.
            </span>
          )}

          {isSuccess && (
            <span className="text text_type_main-small text_color_success">
              Пароль успешно обновлен. Вы можете войти.
            </span>
          )}

          <div>
            <span className="text text_type_main-small">Вспомнили пароль?&nbsp;</span>
            <NavLink
              to={'/login'}
              className={`text text_type_main-small ${styles.button_text}`}>
                Войти
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
