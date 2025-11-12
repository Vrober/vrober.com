'use client';
import { useState } from 'react';
import api from '@/lib/axios';

export default function CallbackPage() {
  const [form, setForm] = useState({ name: '', phone: '', preferredTime: '', note: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await api.post('/callbacks', form);
      setStatus({ type: 'success', message: 'We will call you shortly.' });
      setForm({ name: '', phone: '', preferredTime: '', note: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to submit. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold">Request a Callback</h1>
      <p className="mb-6 text-sm text-gray-500">Leave your details and our team will reach out.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm">Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} required className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm">Preferred Time (optional)</label>
          <input name="preferredTime" value={form.preferredTime} onChange={handleChange} className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm">Note (optional)</label>
          <textarea name="note" value={form.note} onChange={handleChange} className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none" />
        </div>
        <button disabled={loading} className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60">
          {loading ? 'Submitting...' : 'Request Callback'}
        </button>
      </form>
      {status && (
        <p className={`mt-4 text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{status.message}</p>
      )}
    </div>
  );
}
