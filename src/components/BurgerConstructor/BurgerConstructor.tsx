import { FC, useState, useMemo, useEffect } from 'react';
import styles from './BurgerConstructor.module.scss';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from './OrderDetails/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { IOrderResponse, useCompliteOrderMutation } from '../../services/baseApi';
import { clearConstructor, removeIngredient } from '../../services/slices/constructorSlice';

const BurgerConstructor: FC = () => {
  const [compliteOrder] = useCompliteOrderMutation();
  const { bun, otherIngredients } = useSelector((state: RootState) => state.constructorIngredients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<IOrderResponse>();
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const otherIngredientsPrice = otherIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
    return bunPrice + otherIngredientsPrice;
  }, [bun, otherIngredients]);

  const handleOrder = async () => {
    const ingredientIds = [bun?._id, ...otherIngredients.map((ingredient) => ingredient._id)]
      .filter((id): id is string => id !== undefined);
    try {
      const response = await compliteOrder({ ingredients: ingredientIds });
      setOrderData(response.data);
      openModal();
    } catch (err) {
      console.log('Не удалось создать заказ', err);
    }
    dispatch(clearConstructor());
  };

  const handleDelete = (index: number) => {
    dispatch(removeIngredient(index));
  };

  return (
    <div className={`${styles.constructorSection} pt-20`}>
      <>
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
                handleClose={() => handleDelete(index)}
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
          <Button htmlType="button" type="primary" size="large" onClick={handleOrder}>
            Оформить заказ
          </Button>
        </div>

        {(isModalOpen && orderData) && (
          <Modal onClose={closeModal}>
            <OrderDetails orderData={orderData} />
          </Modal>
        )}
      </>
    </div>
  );
};

export default BurgerConstructor;
