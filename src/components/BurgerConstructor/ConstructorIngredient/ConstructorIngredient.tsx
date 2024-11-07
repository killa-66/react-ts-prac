import { FC, LegacyRef, useRef } from "react";
import { Ingredient } from "../../../types/Ingredient";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ConstructorIngredient.module.scss';
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { reorderIngredient } from "../../../services/slices/constructorSlice";

interface Props {
  ingredient: Ingredient;
  handleDelete: (index: number) => void;
  index: number;
}

const ConstructorIngredient: FC<Props> = ({ingredient, handleDelete, index}) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [{ isDragging }, dragRef] = useDrag({
    type: 'constructor-ingredient',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'constructor-ingredient',
    drop: (item: { index: number }, monitor: DropTargetMonitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;

      if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) || (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) return;

      dispatch(reorderIngredient({ fromIndex: dragIndex, toIndex: hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const dragDropRef = dragRef(dropRef(ref))

  return (
    <div ref={dragDropRef as LegacyRef<HTMLDivElement>} className={`${styles.middleItem} ${isDragging ? styles.dragging : ''}`}>
      <DragIcon type={'primary'} />
      <ConstructorElement
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={() => handleDelete(index)}
      />
    </div>
  );
};

export default ConstructorIngredient;
