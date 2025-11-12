"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function MHomeCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api.get('/categories')
      .then(res => {
        if (!active) return;
        const cats = res.data.categories || [];
        // Filter active categories and sort by order
        const activeCats = cats.filter(c => c.isActive !== false).sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(activeCats);
      })
      .catch(err => {
        if (!active) return;
        setError(err.response?.data?.message || 'Failed to load categories');
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const shown = categories.slice(0, 7);

  return (
    <>
      <h1 className="Seaction-heading">What are you looking for?</h1>
      {loading && <p className="text-xs text-zinc-500">Loading categories...</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex flex-wrap justify-between gap-y-3">
        {shown.map(category => (
          <CategoryCard
            key={category._id}
            icon={category.imageUrl}
            title={category.displayName || category.name}
            id={category.name}
            emoji={category.icon}
          />
        ))}
        {categories.length > 7 && (
          <CategoryCard icon="/assets/more.png" title="More" id={'all'} />
        )}
      </div>
    </>
  );
}

const CategoryCard = ({ icon, title, id, emoji }) => {
  const router = useRouter();

  const handleClick = () => {
    if (id === 'all') {
      router.push('/category/all');
      return;
    }
    if (id) router.push(`/category/${encodeURIComponent(id)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl bg-zinc-50 p-4 shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
    >
      {icon ? (
        <Image
          src={icon}
          alt={title}
          width={48}
          height={48}
          className="mb-2 h-full w-full object-cover"
        />
      ) : emoji ? (
        <span className="text-3xl mb-1">{emoji}</span>
      ) : (
        <div className="w-12 h-12 bg-gray-200 rounded mb-2"></div>
      )}
      <p className="text-center text-xs line-clamp-1">{title}</p>
    </div>
  );
};
