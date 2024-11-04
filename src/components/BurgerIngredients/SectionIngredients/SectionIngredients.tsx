import { FC } from 'react';
import styles from './SectionIngredients.module.scss';
import selectedImage from '../../../images/seleted.svg';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../types/Ingredient';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient } from '../../../services/slices/constructorSlice';
import { RootState } from '../../../services/store';
import { setViewedIngredient } from '../../../services/slices/setViewedIngredientSlice';

interface Props {
  sectionRef: React.RefObject<HTMLDivElement>;
  title: string;
  ingredients: Ingredient[] | undefined;
  openModal: (ingredient: Ingredient) => void;
}

const SectionIngredients: FC<Props> = ({
  sectionRef,
  title,
  ingredients,
  openModal,
}) => {
  const dispatch = useDispatch();
  const selectedIngredient = useSelector((state: RootState) => state.viewedIngredient.item?._id)

  const handleIngredientClick = (ingredient: Ingredient) => {
    dispatch(setViewedIngredient(ingredient));
    dispatch(addIngredient(ingredient));
    openModal(ingredient);
  };

  return (
    <div ref={sectionRef} className='pb-10'>
      <h3 className='text text_type_main-medium pb-6'>{title}</h3>
      <div className={styles.ingredientsGrid}>
        {ingredients?.map((ingredient) => (
          <div
            key={ingredient._id}
            className={`${styles.ingredient} mr-4 ml-4`}
            onClick={() => handleIngredientClick(ingredient)}>
            {(selectedIngredient === ingredient._id) && (
              <img
                src={selectedImage}
                className={styles.selectedIngredient}
                alt='Выбранный элемент'
              />
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
        ))}
      </div>
    </div>
  );
};

export default SectionIngredients;
