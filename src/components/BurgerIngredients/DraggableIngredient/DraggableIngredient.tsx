import { FC } from "react";
import { Ingredient } from "../../../types/Ingredient";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './DraggableIngredient.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { setViewedIngredient } from "../../../services/slices/setViewedIngredientSlice";
import { addIngredient, setBun } from "../../../services/slices/constructorSlice";
import { RootState } from '../../../services/store';
import selectedImage from '../../../images/seleted.svg';
import { useDrag } from "react-dnd";



interface Props {
  ingredient: Ingredient;
  openModal: (ingredient: Ingredient) => void;
}

const DraggableIngredient: FC<Props> = ({ ingredient, openModal }) => {
  const constructorBun = useSelector((state: RootState) => state.constructorIngredients.bun);
  const constructorOtherIngredients = useSelector((state: RootState) => state.constructorIngredients.otherIngredients);

  const isIngredientInConstructor = (ingredient: Ingredient) => {
    return ingredient.type === 'bun'
      ? constructorBun?._id === ingredient._id
      : constructorOtherIngredients.some(item => item._id === ingredient._id);
  };

  const count = (ingredient: Ingredient) => {
    if(ingredient.type === 'bun') {
      return 1;
    } else {
      return constructorOtherIngredients.filter((element) => element._id === ingredient._id).length
    }
  }

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      className={`${styles.ingredient} mr-4 ml-4`}
      onClick={() => openModal(ingredient)}>
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