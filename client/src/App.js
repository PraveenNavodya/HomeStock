import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InventoryList from './components/InventoryList';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import LoginPage from './components/LoginPage';
function App() {
  return (
    <Router>
      {/* ✅ Navbar using className */}
      <nav className="navbar">
        <Link to="/inventory" className="nav-link">Inventory</Link>
        <Link to="/users" className="nav-link">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/edit-item/:id" element={<EditItem />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;