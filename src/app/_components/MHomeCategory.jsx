'use client';
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
    api
      .get('/categories')
      .then((res) => {
        if (!active) return;
        const cats = res.data.categories || [];
        // Filter active categories and sort by order
        const activeCats = cats
          .filter((c) => c.isActive !== false)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(activeCats);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.response?.data?.message || 'Failed to load categories');
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const shown = categories.slice(0, 7);

  return (
    <>
      <h1 className="Seaction-heading text-black">What are you looking for?</h1>
      {loading && (
        <p className="text-xs text-gray-600">Loading categories...</p>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex flex-wrap justify-between gap-y-3">
        {shown.map((category) => (
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
      className="flex h-20 w-20 cursor-pointer flex-col items-center justify-between overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-2 shadow-sm transition-all hover:scale-105 hover:border-black hover:shadow-md active:scale-95"
    >
      <div className="flex flex-1 items-center justify-center">
        {icon ? (
          <Image
            src={icon}
            alt={title}
            width={40}
            height={40}
            className="h-10 w-10 rounded object-cover transition-all duration-300 hover:scale-110"
          />
        ) : emoji ? (
          <span className="text-2xl">{emoji}</span>
        ) : (
          <div className="h-10 w-10 rounded bg-gray-200"></div>
        )}
      </div>
      <p
        className="category-label text-center text-xs leading-tight font-medium text-black"
        style={{ fontSize: '10px' }}
      >
        {title}
      </p>
    </div>
  );
};
