import styles from "./IngredientDetails.module.css";
import { useParams } from "react-router-dom";

import { useAppSelector } from "../../utils/hooks";

const IngredientDetails = () => {
  const ingredients = useAppSelector((state) => state.ingredients.data);

  const { id } = useParams();

  const item = ingredients.find((el) => el._id === id);

  if (!item) {
    return <></>;
  }

  return (
    <div>
      <div className={`${styles.image} mt-25`}>
        <img src={item.image_large} alt={item.name} />
      </div>

      <p className={`${styles.name} mt-4 text text_type_main-medium`}>
        {item.name}
      </p>
      <div className={`${styles.compound} mt-8 mb-15`}>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {item.calories}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {item.proteins}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {item.fat}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {item.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
