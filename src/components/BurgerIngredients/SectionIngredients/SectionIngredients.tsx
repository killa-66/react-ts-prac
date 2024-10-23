import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../App/App';
import styles from './SectionIngredients.module.scss';
import { FC, RefObject } from 'react';

interface Props {
  sectionRef: RefObject<HTMLDivElement>;
  title: string;
  ingredients: Ingredient[];
}

const SectionIngredients: FC<Props> = ({ sectionRef, title, ingredients }) => {
  return (
    <div ref={sectionRef} className='pb-10'>
      <h3 className='text text_type_main-medium pb-6'>{title}</h3>
      <div className={styles.ingredientsGrid}>
        {ingredients.map((ingredient) => (
          <div key={ingredient._id} className={styles.ingredient}>
            <img src={ingredient.image} alt={ingredient.name} />
            <p
              className={`${styles.price} text text_type_main-default pb-1 pt-1`}>
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
