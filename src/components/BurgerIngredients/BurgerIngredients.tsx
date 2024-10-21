import { FC } from "react"
import styles from './BurgerIngredients.module.scss'

const BurgerIngredients: FC = () => {
  return (
    <div className={styles.ingredients_body}>
      <p className="m-0 pt-10 text text_type_main-medium">Соберите бургер</p>
    </div>
  );
}

export default BurgerIngredients;