import { FC } from 'react';
import {
  BurgerIcon,
  Button,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.scss';

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
              Конструктор
            </Button>
          </li>
          <li className={styles.menu_item}>
            <ListIcon type={'primary'} />
            <Button
              htmlType='button'
              type={'secondary'}
              extraClass={`${styles.button_header} pb-2 pt-2 pl-4 pr-4`}>
              Лента заказов
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
          Личный кабинет
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
