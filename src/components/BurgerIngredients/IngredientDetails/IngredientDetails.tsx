import { FC, useEffect, useState } from "react";
import styles from './IngredientDetails.module.scss'
import { Ingredient } from "../../../types/Ingredient";
import { Link, useLocation, useParams } from "react-router-dom";
import { useFetchIngredientsQuery } from '../../../services/baseApi';
interface Props {
  ingredient: Ingredient | null;
}

const IngredientDetails: FC<Props> = ({ ingredient }) => {
  const { ingredientId } = useParams();
  const { data: ingredients } = useFetchIngredientsQuery();
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(ingredient);

  useEffect(() => {
    if (!ingredient && ingredients) {
      const foundIngredient = ingredients.find((ing) => ing._id === ingredientId);
      setCurrentIngredient(foundIngredient || null);
    }
  }, [ingredient, ingredientId, ingredients]);

  if (!currentIngredient) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className={styles.main}>
      <img className="mb-4" src={currentIngredient.image_large} alt={currentIngredient.name} />
      <p className="text text_type_main-medium mb-8">{currentIngredient.name}</p>
      <div className={styles.details}>
        <div className="text text_type_main-default">
          <p>Калории, ккал</p>
          <span>{currentIngredient.calories}</span>
        </div>
        <div className="text text_type_main-default">
          <p>Белки, г</p>
          <span>{currentIngredient.proteins}</span>
        </div>
        <div className="text text_type_main-default">
          <p>Жиры, г</p>
          <span>{currentIngredient.fat}</span>
        </div>
        <div className="text text_type_main-default">
          <p>Углеводы, г</p>
          <span>{currentIngredient.carbohydrates}</span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
