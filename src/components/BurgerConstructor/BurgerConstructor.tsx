import React, { FC } from 'react';
import styles from './BurgerConstructor.module.scss';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../App/App';

interface Props {
  ingredients: Ingredient[];
  selectedIngredient?: string | null;
  selectedIngredients?: string[];
}

const BurgerConstructor: FC<Props> = ({ ingredients }) => {
  return (
    <div className={styles.main}>
      <ConstructorElement
        type='top'
        text={`${ingredients[0].name} (верх)`}
        thumbnail={ingredients[0].image}
        price={ingredients[0].price}
      />

      <ConstructorElement text={''} thumbnail={''} price={0} />
      <ConstructorElement text={''} thumbnail={''} price={0} />

      <ConstructorElement
        type='bottom'
        text={`${ingredients[0].name} (верх)`}
        thumbnail={ingredients[0].image}
        price={ingredients[0].price}
      />
    </div>
  );
};

export default BurgerConstructor;
