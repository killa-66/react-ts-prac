import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { RootState } from '../../../services/store';
import { Ingredient } from "../../../types/Ingredient";
import styles from './DraggableIngredient.module.scss';

interface Props {
  ingredient: Ingredient;
}

const DraggableIngredient: FC<Props> = ({ ingredient }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const constructorBun = useSelector((state: RootState) => state.constructorIngredients.bun);
  const constructorOtherIngredients = useSelector((state: RootState) => state.constructorIngredients.otherIngredients);

  const isIngredientInConstructor = (ingredient: Ingredient) => {
    return ingredient.type === 'bun'
      ? constructorBun?._id === ingredient._id
      : constructorOtherIngredients.some(ingredient => ingredient._id === ingredient._id);
  };

  const count = (ingredient: Ingredient) => {
    if (ingredient.type === 'bun') {
      return 1;
    } else {
      return constructorOtherIngredients.filter((element) => element._id === ingredient._id).length
    }
  };

  const [_, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const openModal = () => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };

  return (
    <div ref={dragRef} className={`${styles.ingredient} mr-4 ml-4`} onClick={openModal}>
      {isIngredientInConstructor(ingredient) && (
        <Counter count={count(ingredient)} size="default" extraClass="m-1" />
      )}
      <img src={ingredient.image} alt={ingredient.name} />
      <p className={`${styles.price} text text_type_digits-default pb-1 pt-1`}>
        {ingredient.price}
        <CurrencyIcon type={'primary'} />
      </p>
      <p className='text text_type_main-default pb-1 pt-1'>
        {ingredient.name}
      </p>
    </div>
  );
};

export default DraggableIngredient;
