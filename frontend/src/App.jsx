import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserForm from './pages/UserForm';
import UserDetails from './pages/UserDetails';

export default function App(){
  return (
    <Router>
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-indigo-600">User Management</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
            <Link to="/create" className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">Add User</Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/create" element={<UserForm/>} />
          <Route path="/edit/:id" element={<UserForm edit/>} />
          <Route path="/user/:id" element={<UserDetails/>} />
        </Routes>
      </main>
    </Router>
  );
}