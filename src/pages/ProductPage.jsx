import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Товар не найден');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
      alert('Товар добавлен в корзину'); // или лучше сделать всплывающее уведомление
    }
  };

  if (loading) return <div className="loading-message">Загрузка товара...</div>;
  if (error) return <div className="error-message">Ошибка: {error}</div>;
  if (!product) return <div className="error-message">Товар не найден</div>;

  return (
    <div className="product-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Назад
      </button>
      <div className="product-details">
        <img src={product.image} alt={product.title} className="product-details-image" />
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-category">Категория: {product.category}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
          <button onClick={handleAddToCart} className="add-to-cart-button">
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;