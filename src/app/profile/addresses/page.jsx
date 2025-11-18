'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function AddressesPage() {
  const [form, setForm] = useState({ address: '', pinCode: '' });
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
        setForm({ address: u.address || '', pinCode: u.pinCode || '' });
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const res = await api.put('/users', form);
      setMessage(res.data.message || 'Address updated');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-4 py-4">
      <h1 className="mb-4 text-xl font-semibold">Addresses</h1>
      {loading ? (
        <p className="text-sm text-zinc-500">Loading...</p>
      ) : (
        <form onSubmit={onSubmit} className="max-w-md space-y-4">
          {message && <p className="text-sm text-green-600">{message}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={onChange}
              className="w-full rounded-md border px-3 py-2"
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Pin Code</label>
            <input
              name="pinCode"
              value={form.pinCode}
              onChange={onChange}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>
          <button
            disabled={saving}
            className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Address'}
          </button>
        </form>
      )}
    </div>
  );
}
