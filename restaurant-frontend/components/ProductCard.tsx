import type { Food } from '../types/food';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  food: Food;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ProductCard({ food, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className={styles.card}>
      {food.imageUrl && (
        <img
          src={food.imageUrl}
          alt={food.name}
          className={styles.image}
        />
      )}

      <div className={styles.header}>
        <div>
          <h3 className={styles.name}>{food.name}</h3>
          <p className={styles.category}>{food.category}</p>
        </div>
        <span className={styles.price}>
          {food.price?.toLocaleString()}₫
        </span>
      </div>

      {food.description && (
        <p className={styles.description}>{food.description}</p>
      )}

      {(onEdit || onDelete) && (
        <div className={styles.actions}>
          {onEdit && (
            <button onClick={onEdit} className={styles.editBtn}>
              Sửa
            </button>
          )}
          {onDelete && (
            <button onClick={onDelete} className={styles.deleteBtn}>
              Xóa
            </button>
          )}
        </div>
      )}
    </div>
  );
}
