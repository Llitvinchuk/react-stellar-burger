import { useSelector } from "react-redux";
import { ingredientPropType } from "../../utils/prop-types";
import styles from "./IngredientDetails.module.css";

const IngredientDetails = () => {
  const popupIngredient = useSelector(
    (state) => state.ingredientDetails.popupIngredient
  );
  return (
    <div>
      <div className={`${styles.image} mt-25`}>
        <img src={popupIngredient.image_large} alt={popupIngredient.name} />
      </div>

      <p className={`${styles.name} mt-4 text text_type_main-medium`}>
        {popupIngredient.name}
      </p>
      <div className={`${styles.compound} mt-8 mb-15`}>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {popupIngredient.calories}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {popupIngredient.proteins}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {popupIngredient.fat}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {popupIngredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
