import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../api';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  const load = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data);
    } catch (e) {
      alert('Failed to load users');
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete user?')) return;
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u._id !== id));
    } catch (e) { alert('Delete failed'); }
  };

  const filtered = users.filter(u => {
    const term = q.toLowerCase();
    return u.name?.toLowerCase().includes(term) || u.email?.toLowerCase().includes(term) || u.company?.toLowerCase().includes(term);
  });

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name, email or company" className="border rounded px-3 py-2 w-64"/>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Company</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {filtered.map(u => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{u.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{u.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{u.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">{u.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link to={`/user/${u._id}`} className="text-indigo-600 hover:underline">View</Link>
                  <Link to={`/edit/${u._id}`} className="text-yellow-600 hover:underline">Edit</Link>
                  <button onClick={()=>handleDelete(u._id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No users found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}