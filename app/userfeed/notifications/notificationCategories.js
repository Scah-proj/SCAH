

const ACTIVITY_TYPES = [
  "post_like",
  "post_comment",
  "comment_reply",
  "follow",
  "connection_request",
  "connection_accepted",
];

const OPPORTUNITY_TYPES = [
  // Scout-facing: someone applied to a tryout you posted
  "tryout_application",
  // Athlete-facing: a scout accepted/rejected your application
  "tryout_application_status",
];

const TRYOUT_NOTIFICATION_ALIASES = {
  tryout_application: [
    "tryout_application",
    "tryout_application_created",
    "new_tryout_application",
    "application_submitted",
    "application_created",
    "new_application",
    "tryout_application_request",
  ],
  tryout_application_status: [
    "tryout_application_status",
    "application_status_update",
    "application_status_changed",
    "application_decision",
    "tryout_status_update",
  ],
};

export function normalizeNotificationType(type) {
  const value = typeof type === "string" ? type.trim().toLowerCase() : "";

  if (!value) return "";

  for (const [normalized, aliases] of Object.entries(TRYOUT_NOTIFICATION_ALIASES)) {
    if (aliases.includes(value)) return normalized;
  }

  return value;
}

export function getNotificationCategory(type) {
  const normalizedType = normalizeNotificationType(type);

  if (OPPORTUNITY_TYPES.includes(normalizedType)) return "opportunities";
  if (ACTIVITY_TYPES.includes(normalizedType)) return "activity";
  return "activity";
}