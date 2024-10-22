import { FC, useRef } from 'react';
import { Ingredient } from '../App/App';
import styles from './BurgerIngredients.module.scss';

interface Props {
  ingredients: Ingredient[];
}

const BurgerIngredients: FC<Props> = ({ ingredients }) => {
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const fillingsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
  const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');
  const fillings = ingredients.filter(ingredient => ingredient.type === 'main');

  return (
    <section>
      <h2>Соберите бургер</h2>

      <div className={styles.navigationButtons}>
        <button onClick={() => scrollToSection(bunsRef)} className='text text_type_main-default'>Булки</button>
        <button onClick={() => scrollToSection(saucesRef)} className='text text_type_main-default'>Соусы</button>
        <button onClick={() => scrollToSection(fillingsRef)} className='text text_type_main-default'>Начинки</button>
      </div>

      <div className={`${styles.ingredientsContainer}, text text_type_main-default`}>
        <div ref={bunsRef}>
          <h3>Булки</h3>
          {buns.map((bun) => (
            <div key={bun._id}>
              <img src={bun.image} alt={bun.name} />
              <p>{bun.name}</p>
              <p>{bun.price}</p>
            </div>
          ))}
        </div>

        <div ref={saucesRef}>
          <h3>Соусы</h3>
          {sauces.map((sauce) => (
            <div key={sauce._id}>
              <img src={sauce.image} alt={sauce.name} />
              <p>{sauce.name}</p>
              <p>{sauce.price}</p>
            </div>
          ))}
        </div>

        <div ref={fillingsRef}>
          <h3>Начинки</h3>
          {fillings.map((filling) => (
            <div key={filling._id}>
              <img src={filling.image} alt={filling.name} />
              <p>{filling.name}</p>
              <p>{filling.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
