import { Link, Outlet} from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <header className='header'>
                <Link to="/">🛍️ Мой магазин</Link>

                {/* Ссылка на корзину */}
                <Link to="/cart">🛒 Корзина</Link>
            </header>

            {/* Здесь будут отображаться страницы */}
             <main className="main-content">
                <Outlet />
            </main>

            <footer className="footer">
                © 2025 Мой магазин
            </footer>
        </div>
    )
}

export default Layout