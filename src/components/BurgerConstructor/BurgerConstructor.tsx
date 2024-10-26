import { FC, useState } from 'react';
import styles from './BurgerConstructor.module.scss';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from './OrderDetails/OrderDetails';
import { Ingredient } from '../../types/Ingredient';

interface Props {
  ingredients: Ingredient[];
  selectedIngredient?: string | null;
  selectedIngredients?: string[];
}

const BurgerConstructor: FC<Props> = ({ ingredients }) => {

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`${styles.constructorSection} pt-20`}>
        <ConstructorElement
          type='top'
          text={`${ingredients[0].name} (верх)`}
          thumbnail={ingredients[0].image}
          price={ingredients[0].price}
          isLocked={true}
          extraClass='ml-6 mr-8 mb-4'
        />

      <div className={`${styles.ingredientSection}`}>
        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.middleItem}>
            <DragIcon type={'primary'} />
            <ConstructorElement
              text={ingredient.name}
              thumbnail={ingredient.image}
              price={ingredient.price}
            />
          </div>
        ))}
      </div>

        <ConstructorElement
          type='bottom'
          text={`${ingredients[0].name} (верх)`}
          thumbnail={ingredients[0].image}
          price={ingredients[0].price}
          isLocked={true}
          extraClass='ml-6 mr-8 mt-4 mb-10'
        />

      <div className={`${styles.confirmSection} mr-8`}>
        <p className={`${styles.totalPrice} mr-4 text text_type_digits-medium`}>
          10
          <CurrencyIcon type={'primary'} />
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>

      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
