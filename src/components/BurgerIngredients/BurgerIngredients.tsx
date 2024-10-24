import { FC, useRef, useState } from 'react';
import { Ingredient } from '../App/App';
import styles from './BurgerIngredients.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import SectionIngredients from './SectionIngredients/SectionIngredients';

interface Props {
  ingredients: Ingredient[];
}

const BurgerIngredients: FC<Props> = ({ ingredients }) => {
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const fillingsRef = useRef<HTMLDivElement>(null);

  const [activeButton, setActiveButton] = useState<string>('buns');

  const [selectedBun, setSelectedBun] = useState<string | null>(null);
  const [selectedSauce, setSelectedSauce] = useState<string | null>(null);
  const [selectedFillings, setSelectedFillings] = useState<string[]>([]);

  const scrollToSection = (
    sectionRef: React.RefObject<HTMLDivElement>,
    section: string
  ) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveButton(section);
  };

  const handleSelectBun = (bunId: string) => {
    setSelectedBun(bunId);
  };

  const handleSelectSauce = (sauceId: string) => {
    setSelectedSauce(sauceId);
  };

  const handleSelectFilling = (fillingId: string) => {
    if (selectedFillings.includes(fillingId)) {
      setSelectedFillings(selectedFillings.filter((id) => id !== fillingId));
    } else {
      setSelectedFillings([...selectedFillings, fillingId]);
    }
  };

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );
  const fillings = ingredients.filter(
    (ingredient) => ingredient.type === 'main'
  );

  return (
    <section className={styles.page}>
      <h2 className='text text_type_main-medium pt-10 pb-5'>Соберите бургер</h2>

      <div className={styles.navigationButtons}>
        <Tab
          active={activeButton === 'buns'}
          value={'buns'}
          onClick={() => scrollToSection(bunsRef, 'buns')}>
          Булки
        </Tab>
        <Tab
          active={activeButton === 'sauces'}
          value={'buns'}
          onClick={() => scrollToSection(saucesRef, 'sauces')}>
          Соусы
        </Tab>
        <Tab
          active={activeButton === 'fillings'}
          value={'buns'}
          onClick={() => scrollToSection(fillingsRef, 'fillings')}>
          Начинки
        </Tab>
      </div>

      <div className={styles.childContainer}>
        <SectionIngredients
          sectionRef={bunsRef}
          title='Булки'
          ingredients={buns}
          selectedIngredient={selectedBun}
          setSelectedIngredient={handleSelectBun}
        />

        <SectionIngredients
          sectionRef={saucesRef}
          title='Соусы'
          ingredients={sauces}
          selectedIngredient={selectedSauce}
          setSelectedIngredient={handleSelectSauce}
        />

        <SectionIngredients
          sectionRef={fillingsRef}
          title='Начинки'
          ingredients={fillings}
          selectedIngredients={selectedFillings}
          setSelectedIngredient={handleSelectFilling}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
