// src/components/Categories.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // для навигации

const Categories = () => {
  const navigate = useNavigate(); // хук для перехода
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка категорий
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
        console.error("Ошибка загрузки категорий:", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async (categoryName = null) => {
    setLoadingProducts(true);
    setError(null);
    setSearchTerm('');
    try {
      let url = 'https://fakestoreapi.com/products';
      if (categoryName) {
        url = `https://fakestoreapi.com/products/category/${encodeURIComponent(categoryName)}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
      const data = await response.json();
      setProducts(data);
      setActiveCategory(categoryName);
    } catch (err) {
      setError(err.message);
      console.error("Ошибка загрузки товаров:", err);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Фильтрация по поиску
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    return products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleCategoryClick = (categoryName) => {
    fetchProducts(categoryName);
  };

  const handleAllClick = () => {
    fetchProducts();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Переход на страницу товара
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loadingCategories) {
    return <div className="loading-message">Загрузка категорий...</div>;
  }

  if (error && !loadingCategories) {
    return <div className="error-message">Ошибка: {error}</div>;
  }

  return (
    <div>
      <div className="categories-container">
        <h2>Категории товаров</h2>
        <div className="categories-list">
          <button
            onClick={handleAllClick}
            className={`category-button ${activeCategory === null ? 'active' : ''}`}
          >
            Все
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Поле поиска */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск товаров по названию..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
          disabled={loadingProducts}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="search-clear">
            ✕
          </button>
        )}
      </div>

      {/* Блок с товарами */}
      <div className="products-container">
        <h2>
          Товары
          {activeCategory && <span> / {activeCategory}</span>}
          {searchTerm && <span> / поиск: "{searchTerm}"</span>}
          <span className="products-count"> ({filteredProducts.length})</span>
        </h2>

        {loadingProducts && <div className="loading-message">Загрузка товаров...</div>}
        {!loadingProducts && error && <div className="error-message">Ошибка загрузки товаров: {error}</div>}
        {!loadingProducts && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <p className="no-results">Нет товаров, соответствующих критериям.</p>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="product-card"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img src={product.image} alt={product.title} className="product-image" />
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-price">${product.price}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;