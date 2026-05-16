import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Загрузка товара...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!product) return <div>Товар не найден</div>;

  return (
    <div className="product-page">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p className="product-price">Цена: ${product.price}</p>
      <p>Категория: {product.category}</p>
      <button className="add-to-cart">Добавить в корзину</button>
    </div>
  );
};

export default Product;