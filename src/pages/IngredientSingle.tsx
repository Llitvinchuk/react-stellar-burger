import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import styles from "./styles.module.css";

export function IngredientPage() {
  return (
    <div className={styles.ingredient}>
      <IngredientDetails />
    </div>
  );
}
