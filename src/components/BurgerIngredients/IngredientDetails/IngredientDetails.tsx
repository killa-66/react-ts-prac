import { FC } from "react";
import styles from './IngredientDetails.module.scss'

interface Props {
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  img: string;
  name: string;
}


const IngredientDetails: FC<Props> = ({ calories, proteins, fat, carbohydrates, img, name  }) => {
  return (
    <div className={styles.main}>
      <img className={styles.ingredientImage} src={img} alt={name} />
      <p className="text text_type_main-medium mb-8">{name}</p>
      <div className={styles.details}>
        <div  className="text text_type_main-default">
          <p className="text text_type_main-default">Калории, ккал</p>
          <span>{calories}</span>
        </div>

        <div  className="text text_type_main-default">
          <p className="text text_type_main-default">Белки, г</p>
          <span>{proteins}</span>
        </div>

        <div  className="text text_type_main-default">
          <p className="text text_type_main-default">Жиры, г</p>
          <span>{fat}</span>
        </div>

        <div className="text text_type_main-default">
          <p className="text text_type_main-default">Углеводы, г</p>
          <span>{carbohydrates}</span>
        </div>
      </div>
    </div>
  );

}

export default IngredientDetails;