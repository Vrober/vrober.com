"use client";
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const debouncedQ = useDebounce(q, 200);

  useEffect(() => {
    let active = true;
    if (!debouncedQ) {
      setSuggestions([]);
      return;
    }
    api
      .get('/services/suggestions', { params: { q: debouncedQ, limit: 5 } })
      .then((res) => {
        if (!active) return;
        setSuggestions(res.data.suggestions || []);
        setOpen(true);
      })
      .catch(() => {})
      .finally(() => {});
    return () => {
      active = false;
    };
  }, [debouncedQ]);

  const onSelect = (s) => {
    setOpen(false);
    router.push(`/book?serviceId=${encodeURIComponent(s.id)}`);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (suggestions[0]) onSelect(suggestions[0]);
  };

  return (
    <div className="relative mx-auto my-5 w-full max-w-md">
      <form onSubmit={submitSearch}>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search services..."
          className="w-full rounded-full border-2 border-gray-300 bg-white px-4 py-4 pl-10 text-gray-700 shadow-sm transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-none"
          onFocus={() => suggestions.length && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />
        <svg
          className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </form>
      {open && suggestions.length > 0 && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {suggestions.map((s) => (
            <button
              key={s.id}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onSelect(s)}
              className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-50"
            >
              <span>{s.name}</span>
              <span className="text-sm text-gray-500">₹ {s.price || 0}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
