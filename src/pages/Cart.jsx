// src/pages/Cart.jsx
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const Cart = () => {
  const { items, removeItem, increaseQuantity, decreaseQuantity, clearCart } = useCartStore();

  // Вычисляем общую сумму
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Корзина пуста</h2>
        <p>Добавьте товары из каталога</p>
        <Link to="/" className="continue-shopping-btn">
          🛍️ Перейти к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Корзина</h1>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p className="cart-item-price">${item.price}</p>
            </div>
            <div className="cart-item-quantity">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <div className="cart-item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button onClick={() => removeItem(item.id)} className="remove-btn">
              🗑️
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <strong>Итого:</strong> ${totalPrice.toFixed(2)}
        </div>
        <button onClick={clearCart} className="clear-cart-btn">
          Очистить корзину
        </button>
        <Link to="/checkout" className="checkout-btn">
          Перейти к оформлению
        </Link>
      </div>
    </div>
  );
};

export default Cart;