import React, { useEffect, useState } from 'react';
import { fetchUser } from '../api';
import { useParams, Link } from 'react-router-dom';

export default function UserDetails(){
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(()=>{ fetchUser(id).then(r=>setUser(r.data)).catch(()=>alert('Failed to load')); }, [id]);
  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.company}</p>
        </div>
        <div className="space-x-2">
          <Link to={`/edit/${user._id}`} className="text-yellow-600">Edit</Link>
          <Link to="/" className="text-indigo-600">Back</Link>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address?.street}, {user.address?.city} {user.address?.zipcode}</p>
        <p><strong>Geo:</strong> {user.address?.geo?.lat || '-'} , {user.address?.geo?.lng || '-'}</p>
      </div>
    </div>
  );
}