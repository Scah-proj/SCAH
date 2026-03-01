const categories = [
  { label: "All", value: "all" },
  { label: "Activity", value: "activity" },
  { label: "Opportunities", value: "opportunities" },
];

const NotificationPills = ({ active, setActive }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => setActive(cat.value)}
          className={`px-6 py-2 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer
            ${
              active === cat.value
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default NotificationPills;