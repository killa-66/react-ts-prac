import { FC, useRef, useState } from 'react';
import styles from './BurgerIngredients.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import SectionIngredients from './SectionIngredients/SectionIngredients';
import Modal from '../Modal/Modal';
import IngredientDetails from './IngredientDetails/IngredientDetails';
import { Ingredient } from '../../types/Ingredient';

interface Props {
  ingredients: Ingredient[];
}

const BurgerIngredients: FC<Props> = ({ ingredients }) => {
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const fillingsRef = useRef<HTMLDivElement>(null);

  const [activeButton, setActiveButton] = useState<string>('buns');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [modalIngredient, setModalIngredient] = useState<Ingredient | null>(null);

  const scrollToSection = (
    sectionRef: React.RefObject<HTMLDivElement>,
    section: string
  ) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveButton(section);
  };

  const handleSelectBun = (bunId: string) => {
    setSelectedIngredient(ingredients.find((i) => i._id === bunId) || null);
  };

  const handleSelectSauce = (sauceId: string) => {
    setSelectedIngredient(ingredients.find((i) => i._id === sauceId) || null);
  };

  const handleSelectFilling = (fillingId: string) => {
    setSelectedIngredient(ingredients.find((i) => i._id === fillingId) || null);
  };

  const openModal = (ingredient: Ingredient) => {
    setModalIngredient(ingredient);
  };

  const closeModal = () => {
    setModalIngredient(null);
  };

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');
  const fillings = ingredients.filter((ingredient) => ingredient.type === 'main');

  return (
    <section className={`${styles.page} mr-10`}>
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
          selectedIngredient={selectedIngredient?._id || null}
          setSelectedIngredient={handleSelectBun}
          openModal={openModal}
        />

        <SectionIngredients
          sectionRef={saucesRef}
          title='Соусы'
          ingredients={sauces}
          selectedIngredient={selectedIngredient?._id || null}
          setSelectedIngredient={handleSelectSauce}
          openModal={openModal}
        />

        <SectionIngredients
          sectionRef={fillingsRef}
          title='Начинки'
          ingredients={fillings}
          selectedIngredient={selectedIngredient?._id || null}
          setSelectedIngredient={handleSelectFilling}
          openModal={openModal}
        />
      </div>

      {modalIngredient && (
        <Modal title='Детали ингридиента' onClose={closeModal}>
          <IngredientDetails
            ingredient={modalIngredient}/>
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
