export function groupNotifications(notifications) {
  const now = new Date();

  const groups = {
    recent: [],
    week: [],
    month: [],
  };

  notifications.forEach((notif) => {
    const created = new Date(notif.createdAt);
    const diff = now - created;
    const days = diff / (1000 * 60 * 60 * 24);

    if (days < 1) {
      groups.recent.push(notif);
    } else if (days < 7) {
      groups.week.push(notif);
    } else {
      groups.month.push(notif);
    }
  });

  return groups;
}