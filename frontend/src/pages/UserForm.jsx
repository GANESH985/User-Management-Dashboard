import React, { useState, useEffect } from 'react';
import { createUser, fetchUser, updateUser } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const isValidEmail = (s) => /\S+@\S+\.\S+/.test(s);

export default function UserForm({ edit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', address: { street:'', city:'', zipcode:'', geo:{lat:'',lng:''} } });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (edit && id) {
      fetchUser(id).then(r => {
        // ensure nested address exists
        const data = r.data;
        if (!data.address) data.address = { street:'', city:'', zipcode:'', geo:{lat:'',lng:''} };
        if (!data.address.geo) data.address.geo = {lat:'',lng:''};
        setForm(data);
      }).catch(()=>alert('Failed to load'));
    }
  }, [edit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.geo.')) {
      const key = name.split('.')[2];
      setForm(f => ({ ...f, address: {...f.address, geo: {...f.address.geo, [key]: value }} }));
    } else if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setForm(f => ({ ...f, address: {...f.address, [key]: value }}));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!isValidEmail(form.email)) e.email = 'Valid email is required';
    if (form.address && form.address.zipcode && !/^[0-9\-\s]+$/.test(form.address.zipcode)) e.zipcode = 'Invalid zipcode';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      if (edit) await updateUser(id, form);
      else await createUser(form);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || (err.response?.data?.errors ? JSON.stringify(err.response.data.errors) : 'Save failed');
      alert(msg);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-4">{edit ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name *</label>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email *</label>
          <input name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Company</label>
            <input name="company" value={form.company} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
        </div>

        <fieldset className="border p-4 rounded">
          <legend className="text-sm font-medium">Address</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm">Street</label>
              <input name="address.street" value={form.address.street} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm">City</label>
              <input name="address.city" value={form.address.city} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm">Zipcode</label>
              <input name="address.zipcode" value={form.address.zipcode} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
              {errors.zipcode && <p className="text-sm text-red-600 mt-1">{errors.zipcode}</p>}
            </div>
            <div>
              <label className="block text-sm">Latitude</label>
              <input name="address.geo.lat" value={form.address.geo?.lat || ''} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm">Longitude</label>
              <input name="address.geo.lng" value={form.address.geo?.lng || ''} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
          </div>
        </fieldset>

        <div className="flex items-center space-x-3">
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">{edit ? 'Save Changes' : 'Create User'}</button>
          <button type="button" onClick={()=>navigate('/')} className="text-gray-600">Cancel</button>
        </div>
      </form>
    </div>
  );
}