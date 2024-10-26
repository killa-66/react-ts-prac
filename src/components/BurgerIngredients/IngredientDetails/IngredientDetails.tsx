import { FC } from "react";
import styles from './IngredientDetails.module.scss'
import { Ingredient } from "../../../types/Ingredient";

interface Props {
  ingredient: Ingredient;
}


const IngredientDetails: FC<Props> = ({ ingredient  }) => {
  return (
    <div className={styles.main}>
      <img className='mb-4' src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
      <div className={styles.details}>
        <div  className="text text_type_main-default">
          <p className="text text_type_main-default">Калории, ккал</p>
          <span>{ingredient.calories}</span>
        </div>

        <div  className="text text_type_main-default">
          <p className="text text_type_main-default">Белки, г</p>
          <span>{ingredient.proteins}</span>
        </div>

        <div  className="text text_type_main-default">
          <p className="text text_type_main-default">Жиры, г</p>
          <span>{ingredient.fat}</span>
        </div>

        <div className="text text_type_main-default">
          <p className="text text_type_main-default">Углеводы, г</p>
          <span>{ingredient.carbohydrates}</span>
        </div>
      </div>
    </div>
  );

}

export default IngredientDetails;