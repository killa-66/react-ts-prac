import { FC } from 'react';
import styles from './SectionIngredients.module.scss';
import { Ingredient } from '../../../types/Ingredient';
import DraggableIngredient from '../DraggableIngredient/DraggableIngredient';

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
  openModal
}) => {

  return (
    <div ref={sectionRef} className='pb-10'>
      <h3 className='text text_type_main-medium pb-6'>{title}</h3>
      <div className={styles.ingredientsGrid}>
        {ingredients?.map((ingredient) => (
          <DraggableIngredient key={ingredient._id} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
};

export default SectionIngredients;
