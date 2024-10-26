import { FC, RefObject } from 'react';
import styles from './SectionIngredients.module.scss';
import selectedImage from '../../../images/seleted.svg';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../types/Ingredient';

interface Props {
  sectionRef: RefObject<HTMLDivElement>;
  title: string;
  ingredients: Ingredient[];
  selectedIngredient?: string | null;
  selectedIngredients?: string[];
  setSelectedIngredient: (id: string) => void;
  openModal: (ingredient: Ingredient) => void;
}

const SectionIngredients: FC<Props> = ({
  sectionRef,
  title,
  ingredients,
  selectedIngredient,
  selectedIngredients = [],
  setSelectedIngredient,
  openModal,
}) => {
  return (
    <div ref={sectionRef} className='pb-10'>
      <h3 className='text text_type_main-medium pb-6'>{title}</h3>
      <div className={styles.ingredientsGrid}>
        {ingredients.map((ingredient) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            key={ingredient._id}
            className={`${styles.ingredient} mr-4 ml-4`}
            onClick={() => {
              setSelectedIngredient(ingredient._id);
              openModal(ingredient);
            }}>
            {(selectedIngredient === ingredient._id ||
              selectedIngredients.includes(ingredient._id)) && (
              <img
                src={selectedImage}
                className={styles.selectedIngredient}
                alt='Выбранный элемент'
              />
            )}
            <img src={ingredient.image} alt={ingredient.name} />
            <p
              className={`${styles.price} text text_type_digits-default pb-1 pt-1`}>
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
