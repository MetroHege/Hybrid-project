import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';
import Upload from './views/Upload';
import Layout from './views/Layout';
import Login from './views/Login';
import Logout from './views/Logout';
import {UserProvider} from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './views/Admin';
import {UpdateProvider} from './contexts/UpdateContext';
import {ThemeProvider} from './contexts/ThemeContext';
import Contact from './views/Contact';

const App = () => {
  return (
    <ThemeProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <UserProvider>
          <UpdateProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <Upload />
                    </ProtectedRoute>
                  }
                />
                <Route path="/single" element={<Single />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/admin" element={<Admin.Admin />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
            </Routes>
          </UpdateProvider>
        </UserProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
