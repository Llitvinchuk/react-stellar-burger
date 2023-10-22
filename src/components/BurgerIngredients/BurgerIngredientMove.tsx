import { useDrag, useDrop } from "react-dnd";

import styles from "./BurgerIngredients.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { removeBurgerIngredient } from "../../services/actions/BurgerConstructorAction";

import { FC, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { TIngredient } from "../../utils/types";

type TBurgerMove = {
  ingredient: TIngredient;
  moveIngredientItem: (dragIndex: number, hoverIndex: number) => void;
};

export const BurgerIngredientMove: FC<TBurgerMove> = ({
  ingredient,
  moveIngredientItem,
}) => {
  const ingredients = useAppSelector((state) => state.burger.ingredients);

  const id = ingredient.key;
  const index = ingredients.indexOf(ingredient);

  const dispatch = useAppDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  const [{ handlerId }, drop] = useDrop({
    accept: "item",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item: TIngredient, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;

      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset || !dragIndex) {
        return;
      }

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredientItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    // drop(item) {
    //   const dragIndex = item.index;
    //   const hoverIndex = index;
    //   if (dragIndex === hoverIndex) {
    //     return;
    //   }
    //   moveIngredientItem(dragIndex, hoverIndex);
    // },
  });

  const ref = useRef<HTMLDivElement>(null);
  const dragDropRef = drag(drop(ref));

  return (
    <div
      className={`${styles.move} pl-2`}
      data-handler-id={handlerId}
      ref={ref}
      style={{ opacity }}
    >
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          if (!ingredient.key) {
            return;
          }

          dispatch(removeBurgerIngredient(ingredient.key));
        }}
      />
    </div>
  );
};
