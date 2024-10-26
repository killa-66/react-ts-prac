import { FC, useState } from 'react';
import styles from './BurgerConstructor.module.scss';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../App/App';
import Modal from '../Modal/Modal';
import OrderDetails from './OrderDetails/OrderDetails';

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
    <div className={`${styles.constructorSection} pt-25`}>
        <ConstructorElement
          type='top'
          text={`${ingredients[0].name} (верх)`}
          thumbnail={ingredients[0].image}
          price={ingredients[0].price}
          isLocked={true}
          extraClass='mr-8 mb-4'
        />

      <div className={`${styles.ingredientSection} pr-4`}>
        <div className={styles.middleItem}>
          <DragIcon type={'primary'} />
          <ConstructorElement
            text={`${ingredients[4].name}`}
            thumbnail={ingredients[4].image}
            price={ingredients[4].price}/>
        </div>

        <div className={styles.middleItem}>
          <DragIcon type={'primary'} />
          <ConstructorElement
            text={`${ingredients[11].name}`}
            thumbnail={ingredients[11].image}
            price={ingredients[11].price}/>
        </div>

        <div className={styles.middleItem}>
          <DragIcon type={'primary'} />
          <ConstructorElement
            text={`${ingredients[10].name}`}
            thumbnail={ingredients[10].image}
            price={ingredients[10].price}/>
        </div>

        <div className={styles.middleItem}>
          <DragIcon type={'primary'} />
          <ConstructorElement
            text={`${ingredients[6].name}`}
            thumbnail={ingredients[6].image}
            price={ingredients[6].price}/>
        </div>

        <div className={styles.middleItem}>
          <DragIcon type={'primary'} />
          <ConstructorElement
            text={`${ingredients[9].name}`}
            thumbnail={ingredients[9].image}
            price={ingredients[9].price}/>
        </div>

        <div className={styles.middleItem}>
          <DragIcon type={'primary'} />
          <ConstructorElement
            text={`${ingredients[12].name}`}
            thumbnail={ingredients[12].image}
            price={ingredients[12].price}/>
        </div>

        <div className={styles.middleItem}>
          <DragIcon type={'primary'} />
          <ConstructorElement
            text={`${ingredients[12].name}`}
            thumbnail={ingredients[12].image}
            price={ingredients[12].price}/>
        </div>

        <div className={styles.middleItem}>
          <DragIcon type={'primary'} />
          <ConstructorElement
            text={`${ingredients[12].name}`}
            thumbnail={ingredients[12].image}
            price={ingredients[12].price}/>
        </div>

        <div className={styles.middleItem}>
          <DragIcon type={'primary'} />
          <ConstructorElement
            text={`${ingredients[12].name}`}
            thumbnail={ingredients[12].image}
            price={ingredients[12].price}/>
        </div>

        <div className={styles.middleItem}>
          <DragIcon type={'primary'} />
          <ConstructorElement
            text={`${ingredients[12].name}`}
            thumbnail={ingredients[12].image}
            price={ingredients[12].price}/>
        </div>
      </div>

        <ConstructorElement
          type='bottom'
          text={`${ingredients[0].name} (верх)`}
          thumbnail={ingredients[0].image}
          price={ingredients[0].price}
          isLocked={true}
          extraClass='mr-8 mt-4 mb-10'
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
