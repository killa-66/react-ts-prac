import { FC, useEffect, useRef, useState } from 'react';
import styles from './BurgerIngredients.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import SectionIngredients from './SectionIngredients/SectionIngredients';
import Modal from '../Modal/Modal';
import IngredientDetails from './IngredientDetails/IngredientDetails';
import { Ingredient } from '../../types/Ingredient';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { setViewedIngredient } from '../../services/slices/setViewedIngredientSlice';
import { useFetchIngredientsQuery } from '../../services/baseApi';
import { setIngredints } from '../../services/slices/ingredientsSlice';

const BurgerIngredients: FC = () => {
  const { data } = useFetchIngredientsQuery();
  const dispatch = useDispatch<AppDispatch>();

  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const fillingsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeButton, setActiveButton] = useState<string>('buns');
  const [modalIngredient, setModalIngredient] = useState<Ingredient | null>(null);

  useEffect(() => {
    dispatch(setIngredints(data));
  }, [data, dispatch]);

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (
    sectionRef: React.RefObject<HTMLDivElement>,
    section: string
  ) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveButton(section);
  };

  const handleScroll = () => {
    if (!containerRef.current) return;

    const bunsPosition = bunsRef.current?.getBoundingClientRect().top || 0;
    const saucesPosition = saucesRef.current?.getBoundingClientRect().top || 0;
    const fillingsPosition = fillingsRef.current?.getBoundingClientRect().top || 0;

    const containerTop = containerRef.current.getBoundingClientRect().top;

    // Определяем, какой раздел ближе к верхней части контейнера
    const bunsDistance = Math.abs(bunsPosition - containerTop);
    const saucesDistance = Math.abs(saucesPosition - containerTop);
    const fillingsDistance = Math.abs(fillingsPosition - containerTop);

    const minDistance = Math.min(bunsDistance, saucesDistance, fillingsDistance);

    if (minDistance === bunsDistance) {
      setActiveButton('buns');
    } else if (minDistance === saucesDistance) {
      setActiveButton('sauces');
    } else {
      setActiveButton('fillings');
    }
  };

  const openModal = (ingredient: Ingredient) => {
    dispatch(setViewedIngredient(ingredient));
    setModalIngredient(ingredient);
  };

  const closeModal = () => {
    dispatch(setViewedIngredient(null));
    setModalIngredient(null);
  };

  const buns = data?.filter((ingredient) => ingredient.type === 'bun');
  const sauces = data?.filter((ingredient) => ingredient.type === 'sauce');
  const fillings = data?.filter((ingredient) => ingredient.type === 'main');

  return (
    <section className={`${styles.page} mr-10`}>
      <h2 className='text text_type_main-medium pt-10 pb-5'>Соберите бургер</h2>

      <div className={styles.navigationButtons}>
        <Tab
          active={activeButton === 'buns'}
          value='buns'
          onClick={() => scrollToSection(bunsRef, 'buns')}>
          Булки
        </Tab>
        <Tab
          active={activeButton === 'sauces'}
          value='sauces'
          onClick={() => scrollToSection(saucesRef, 'sauces')}>
          Соусы
        </Tab>
        <Tab
          active={activeButton === 'fillings'}
          value='fillings'
          onClick={() => scrollToSection(fillingsRef, 'fillings')}>
          Начинки
        </Tab>
      </div>

      <div className={styles.childContainer} ref={containerRef}>
        <SectionIngredients
          sectionRef={bunsRef}
          title='Булки'
          ingredients={buns}
          openModal={openModal}
        />

        <SectionIngredients
          sectionRef={saucesRef}
          title='Соусы'
          ingredients={sauces}
          openModal={openModal}
        />

        <SectionIngredients
          sectionRef={fillingsRef}
          title='Начинки'
          ingredients={fillings}
          openModal={openModal}
        />
      </div>

      {modalIngredient && (
        <Modal title='Детали ингридиента' onClose={closeModal}>
          <IngredientDetails ingredient={modalIngredient} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
