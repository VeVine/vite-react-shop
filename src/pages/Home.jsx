import Categories from '../components/Categories';

const Home = () => {
  return (
    <div>
      <h1>Добро пожаловать в наш магазин!</h1>
      {/* Рендерим компонент с категориями */}
      <Categories />
    </div>
  );
};

export default Home;