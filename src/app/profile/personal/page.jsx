"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function PersonalInfoPage() {
  const [form, setForm] = useState({ name: '', email: '', address: '', pinCode: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    api
      .get('/users/me')
      .then((res) => {
        if (!active) return;
        const u = res.data.user || {};
        setForm({
          name: u.name || '',
          email: u.email || '',
          address: u.address || '',
          pinCode: u.pinCode || '',
        });
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const res = await api.put('/users', form);
      setMessage(res.data.message || 'Profile updated');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-4 py-4">
      <h1 className="mb-4 text-xl font-semibold">Personal Information</h1>
      {loading ? (
        <p className="text-sm text-zinc-500">Loading...</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
          {message && <p className="text-sm text-green-600">{message}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Name</label>
            <input name="name" value={form.name} onChange={onChange} className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Email</label>
            <input name="email" value={form.email} onChange={onChange} className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Address</label>
            <input name="address" value={form.address} onChange={onChange} className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Pin Code</label>
            <input name="pinCode" value={form.pinCode} onChange={onChange} className="w-full rounded-md border px-3 py-2" />
          </div>
          <button disabled={saving} className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}
    </div>
  );
}
