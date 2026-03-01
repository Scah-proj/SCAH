import Image from "next/image";

const Notification = ({ notification }) => {
  return (
    <div className="relative flex gap-4 p-4 mb-4 bg-white hover:bg-gray-50 shadow-xl transition hover:shadow-2xl cursor-pointer rounded-xl">

      {/* Avatar */}
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 border">
      <Image
        src={notification.sender.profilePic}
        alt={notification.sender.name}
        width={34}
        height={34}
        className="object-cover"
      />
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm text-gray-800">
          <span className="font-semibold">
            {notification.sender.name}
          </span>{" "}
          {notification.message}
        </p>

        {notification.secondary && (
          <p className="text-xs text-gray-500 mt-1">
            {notification.secondary}
          </p>
        )}
      </div>

      {/* Unread dot */}
      {!notification.read && (
        <span className="absolute right-3 top-4 w-2.5 h-2.5 bg-teal-500 rounded-full" />
      )}
    </div>
  );
};

export default Notification;