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
import { Route, useLocation, useNavigate } from 'react-router-dom';

const BurgerIngredients: FC = () => {
  const { data } = useFetchIngredientsQuery();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const fillingsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeButton, setActiveButton] = useState<string>("buns");

  useEffect(() => {
    if (data) dispatch(setIngredints(data));
  }, [data, dispatch]);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>, section: string) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setActiveButton(section);
  };

  const openModal = (ingredient: Ingredient) => {
    dispatch(setViewedIngredient(ingredient));
    navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
  };

  const buns = data?.filter((ingredient) => ingredient.type === "bun");
  const sauces = data?.filter((ingredient) => ingredient.type === "sauce");
  const fillings = data?.filter((ingredient) => ingredient.type === "main");

  return (
    <section className={`${styles.page} mr-10`}>
      <h2 className="text text_type_main-medium pt-10 pb-5">Соберите бургер</h2>

      <div className={styles.navigationButtons}>
        <Tab
          active={activeButton === "buns"}
          value="buns"
          onClick={() => scrollToSection(bunsRef, "buns")}
        >
          Булки
        </Tab>
        <Tab
          active={activeButton === "sauces"}
          value="sauces"
          onClick={() => scrollToSection(saucesRef, "sauces")}
        >
          Соусы
        </Tab>
        <Tab
          active={activeButton === "fillings"}
          value="fillings"
          onClick={() => scrollToSection(fillingsRef, "fillings")}
        >
          Начинки
        </Tab>
      </div>

      <div className={styles.childContainer} ref={containerRef}>
        <SectionIngredients
          sectionRef={bunsRef}
          title="Булки"
          ingredients={buns}
          openModal={openModal}
        />
        <SectionIngredients
          sectionRef={saucesRef}
          title="Соусы"
          ingredients={sauces}
          openModal={openModal}
        />
        <SectionIngredients
          sectionRef={fillingsRef}
          title="Начинки"
          ingredients={fillings}
          openModal={openModal}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
