import React, { FC } from 'react';
import styles from './BurgerConstructor.module.scss';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';



export default function BurgerConstructor() {
  return (
    <div className={styles.main}>
      <ConstructorElement text={''} thumbnail={''} price={0} />
      <ConstructorElement text={''} thumbnail={''} price={0} />
      <ConstructorElement text={''} thumbnail={''} price={0} />
    </div>
  );
};