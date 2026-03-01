import Notification from "./Notification";

const NotificationByGroup = ({ title, notifications }) => {
  if (!notifications.length) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {title}
      </h3>

      <div className="space-y-1">
        {notifications.map((notif) => (
          <Notification key={notif.id} notification={notif} />
        ))}
      </div>
    </div>
  );
};

export default NotificationByGroup;