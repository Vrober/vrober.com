export default function sitemap() {
  const baseUrl = 'https://vrober.com';
  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changefreq: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changefreq: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/book`,
      lastModified: new Date(),
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bookings`,
      lastModified: new Date(),
      changefreq: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changefreq: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/callback`,
      lastModified: new Date(),
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/vendor`,
      lastModified: new Date(),
      changefreq: 'monthly',
      priority: 0.8,
    },
  ];

  // Category routes
  const categories = [
    'beauty',
    'cleaning',
    'painting',
    'ac-services',
    'repair-maintenance',
    'plumbing',
    'electrical',
    'carpentry',
    'pest-control',
    'salon-women',
    'salon-men',
    'appliance-repair',
  ];

  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: new Date(),
    changefreq: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
