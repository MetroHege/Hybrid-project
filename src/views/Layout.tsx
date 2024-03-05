import {Link, Outlet, useLocation} from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  if (!user) {
    handleAutoLogin();
  }

  const location = useLocation();

  return (
    <>
      <header className="wave-bg flex items-center justify-between p-2 text-white">
        <Link className="flex items-center" to="/">
          {' '}
          <img
            src="./src/img/logo-test-enhanced.png"
            alt="MediaWave"
            className="h-10 w-10"
          />
          <h1 className="pacifico-regular bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-2xl font-bold italic text-transparent">
            MediaWave
          </h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li
              className={
                location.pathname === '/'
                  ? 'rounded bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold'
                  : ''
              }
            >
              <Link
                className="block p-2 text-center text-slate-200 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-400 hover:bg-clip-text hover:font-bold hover:text-transparent"
                to="/"
              >
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li
                  className={
                    location.pathname === '/profile'
                      ? 'rounded bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold'
                      : ''
                  }
                >
                  <Link
                    className="block p-2 text-center text-slate-200 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-400 hover:bg-clip-text hover:font-bold hover:text-transparent"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === '/upload'
                      ? 'rounded bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold'
                      : ''
                  }
                >
                  <Link
                    className="block p-2 text-center text-slate-200 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-400 hover:bg-clip-text hover:font-bold hover:text-transparent"
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === '/logout'
                      ? 'rounded bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold'
                      : ''
                  }
                >
                  <Link
                    className="block p-2 text-center text-slate-200 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-400 hover:bg-clip-text hover:font-bold hover:text-transparent"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li
                className={
                  location.pathname === '/login'
                    ? 'rounded bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold'
                    : ''
                }
              >
                <Link
                  className="block p-2 text-center text-slate-200 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-400 hover:bg-clip-text hover:font-bold hover:text-transparent"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <p>Copyright 2024 - NN</p>
      </footer>
    </>
  );
};

export default Layout;
