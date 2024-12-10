import { FC } from 'react';
import {
  BurgerIcon,
  Button,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.scss';
import { NavLink } from 'react-router-dom';

const AppHeader: FC = () => {
  return (
    <header className={styles.header_body}>
      <nav className={styles.navigation}>
        <ul className={styles.menu_list}>
          <li className={styles.menu_item}>
            <BurgerIcon type={'primary'} />
            <Button
              htmlType='button'
              type={'secondary'}
              extraClass={`${styles.button_header} pb-2 pt-2 pl-4 pr-4`}>
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.header_link} ${styles.header_link_active}`
                    : `${styles.header_link} text_color_inactive`
                }>
                Конструктор
              </NavLink>
            </Button>
          </li>
          <li className={styles.menu_item}>
            <ListIcon type={'primary'} />
            <Button
              htmlType='button'
              type={'secondary'}
              extraClass={`${styles.button_header} pb-2 pt-2 pl-4 pr-4`}>
              <NavLink
                to={'/orders-line'}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.header_link} ${styles.header_link_active}`
                    : `${styles.header_link} text_color_inactive`
                }>
                Лента заказов
              </NavLink>
            </Button>
          </li>
        </ul>
      </nav>

      <div className={styles.logo_container}>
        <Logo />
      </div>

      <div className={styles.menu_item}>
        <ProfileIcon type={'primary'} />
        <Button
          htmlType='button'
          type={'secondary'}
          extraClass={`${styles.button_header} pb-2 pt-2 pl-4 pr-4`}>
          <NavLink
            to={'/profile'}
            className={({ isActive }) =>
              isActive
                ? `${styles.header_link} ${styles.header_link_active}`
                : `${styles.header_link} text_color_inactive`
            }>
            Личный кабинет
          </NavLink>
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
