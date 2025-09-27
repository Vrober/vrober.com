export default function SearchBar() {
  return (
    <div className="relative mx-auto my-5 w-full max-w-md">
      <input
        type="search"
        placeholder="Luxury Services Delivered to Your Doorstep"
        className="w-full rounded-full border-2 border-gray-300 bg-white px-4 py-4 pl-10 text-gray-700 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
    </div>
  );
}
