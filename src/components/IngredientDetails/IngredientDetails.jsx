import { ingredientPropType } from "../../utils/prop-types";
import styles from "./IngredientDetails.module.css";

const IngredientDetails = (props) => {
  return (
    <div>
      <div className={`${styles.image} mt-25`}>
        <img src={props.image_large} alt={"Фото ингредиента"} />
      </div>

      <p className={`${styles.name} mt-4 text text_type_main-medium`}>
        {props.name}
      </p>
      <div className={`${styles.compound} mt-8 mb-15`}>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.calories}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.proteins}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.fat}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;

IngredientDetails.propTypes = {
  props: ingredientPropType,
};
