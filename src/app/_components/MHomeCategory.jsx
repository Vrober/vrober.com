import Image from 'next/image';

export default function MHomeCategory() {
  const categories = [
    { icon: '/assets/ac.png', title: 'Repair' },
    { icon: '/assets/grooming.png', title: 'Grooming' },
    { icon: '/assets/cleaning.png', title: 'Cleaning' },
    { icon: '/assets/painting.png', title: 'Painting' },
    { icon: '/assets/grooming.png', title: 'Grooming' },
    { icon: '/assets/cleaning.png', title: 'Cleaning' },
    { icon: '/assets/painting.png', title: 'Painting' },
    { icon: '/assets/plumbing.png', title: 'Plumbing' },
    { icon: '/assets/plumbing.png', title: 'Plumbing' },
    { icon: '/assets/plumbing.png', title: 'Plumbing' },
    { icon: '/assets/plumbing.png', title: 'Plumbing' },
    { icon: '/assets/electrician.png', title: 'Electrician' },
  ];
  const limitedCategories = categories.slice(0, 7);

  return (
    <>
      <h1 className="Seaction-heading">What are you looking for?</h1>
      <div className="flex flex-wrap justify-between gap-y-3">
        {limitedCategories.map((cat, index) => (
          <CategoryCard key={index} icon={cat.icon} title={cat.title} />
        ))}
        <CategoryCard icon="/assets/more.png" title="More" />
      </div>
    </>
  );
}

const CategoryCard = ({ icon, title }) => {
  return (
    <div className="flex h-20 w-20 flex-col items-center justify-center overflow-hidden rounded-xl bg-zinc-50 p-4 shadow-md">
      <Image
        src={icon}
        alt={title}
        width={48}
        height={48}
        className="mb-2 h-full w-full object-cover"
      />
      <p className="text-center text-xs">{title}</p>
    </div>
  );
};
