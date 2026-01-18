





export default function ShareOption({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[64px]">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 border">
        {icon}
      </div>
      <span className="text-xs text-gray-700 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}