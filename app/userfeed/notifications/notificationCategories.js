// Central place to decide which category a notification belongs to.
// Keeping this as one shared source of truth avoids the categories
// silently drifting apart if a new notification type gets added later.

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

export function getNotificationCategory(type) {
  if (OPPORTUNITY_TYPES.includes(type)) return "opportunities";
  if (ACTIVITY_TYPES.includes(type)) return "activity";
  // Unrecognized types default to Activity so nothing silently
  // disappears from filtering if a new type is added later without
  // updating this file.
  return "activity";
}