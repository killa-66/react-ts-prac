import { FC, useState, useMemo } from 'react';
import styles from './BurgerConstructor.module.scss';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from './OrderDetails/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { selectIngredients, selectIngredientsError, selectIngredientsLoading } from '../../services/slices/ingredientsSlice';

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const loading = useSelector(selectIngredientsLoading);
  const error = useSelector(selectIngredientsError);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const bun = ingredients.find((ingredient) => ingredient.type === 'bun');
  const otherIngredients = ingredients.filter((ingredient) => ingredient.type !== 'bun');

  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const otherIngredientsPrice = otherIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
    return bunPrice + otherIngredientsPrice;
  }, [bun, otherIngredients]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div className={`${styles.constructorSection} pt-20`}>
      {bun && (
        <ConstructorElement
          type='top'
          text={`${bun.name} (верх)`}
          thumbnail={bun.image}
          price={bun.price}
          isLocked={true}
          extraClass='ml-6 mr-8 mb-4'
        />
      )}

      <div className={`${styles.ingredientSection}`}>
        {otherIngredients.map((ingredient, index) => (
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

      {bun && (
        <ConstructorElement
          type='bottom'
          text={`${bun.name} (низ)`}
          thumbnail={bun.image}
          price={bun.price}
          isLocked={true}
          extraClass='ml-6 mr-8 mt-4 mb-10'
        />
      )}

      <div className={`${styles.confirmSection} mr-8`}>
        <p className={`${styles.totalPrice} mr-4 text text_type_digits-medium`}>
          {totalPrice}
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
