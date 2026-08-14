"use client";

import { useState } from "react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { Loader, Smartphone, Tablet, Monitor, MapPin, LogOut } from "lucide-react";
import {
  useGetSessionsQuery,
  useRevokeSessionMutation,
  useRevokeAllOtherSessionsMutation,
} from "../../../../../redux/api/settingApi"; 

function timeAgo(dateString) {
  if (!dateString) return "";
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Active now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  return new Date(dateString).toLocaleDateString();
}

function DeviceIcon({ type }) {
  if (type === "mobile") return <Smartphone size={22} className="text-gray-600" />;
  if (type === "tablet") return <Tablet size={22} className="text-gray-600" />;
  return <Monitor size={22} className="text-gray-600" />;
}

const Page = () => {
  const { data, isLoading, isError } = useGetSessionsQuery();
  const [revokeSession, { isLoading: isRevoking }] = useRevokeSessionMutation();
  const [revokeAllOtherSessions, { isLoading: isRevokingAll }] =
    useRevokeAllOtherSessionsMutation();

  const [revokingId, setRevokingId] = useState(null);

  const sessions = data?.data?.sessions || [];
  const currentSession = sessions.find((s) => s.isCurrentDevice);
  const otherSessions = sessions.filter((s) => !s.isCurrentDevice);

  const handleRevoke = async (sessionId) => {
    setRevokingId(sessionId);
    try {
      await revokeSession(sessionId).unwrap();
    } catch (err) {
      console.error("Failed to revoke session:", err);
    } finally {
      setRevokingId(null);
    }
  };

  const handleRevokeAll = async () => {
    try {
      await revokeAllOtherSessions().unwrap();
    } catch (err) {
      console.error("Failed to revoke other sessions:", err);
    }
  };

  const renderSessionRow = (session, { isCurrent = false } = {}) => {
    const browser = session.device?.browser;
    const os = session.device?.os;
    const hasBrowser = browser && browser !== "Unknown";
    const hasOs = os && os !== "Unknown";

    const deviceLabel =
      session.device?.model ||
      (hasBrowser ? browser : null) ||
      (session.device?.type
        ? session.device.type.charAt(0).toUpperCase() + session.device.type.slice(1)
        : "Unknown device");

    const subtitle =
      hasBrowser || hasOs
        ? [hasBrowser ? browser : null, hasOs ? os : null].filter(Boolean).join(" · ")
        : null;

    const locationLabel = session.location || session.ipAddress || null;

    return (
      <div
        key={session.id}
        className="flex items-center justify-between gap-3 px-3 py-3 hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <DeviceIcon type={session.device?.type} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {deviceLabel}
              </p>
              {isCurrent && (
                <span className="text-[10px] font-semibold uppercase tracking-wide text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full flex-shrink-0">
                  This device
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-gray-500 truncate">{subtitle}</p>
            )}
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
              {locationLabel && (
                <>
                  <MapPin size={12} />
                  <span className="truncate">{locationLabel}</span>
                  <span>·</span>
                </>
              )}
              <span>{timeAgo(session.lastActiveAt)}</span>
            </div>
          </div>
        </div>

        {!isCurrent && (
          <button
            onClick={() => handleRevoke(session.id)}
            disabled={revokingId === session.id && isRevoking}
            className="text-xs font-semibold text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 rounded-md hover:bg-red-50 transition flex-shrink-0 flex items-center gap-1.5"
          >
            {revokingId === session.id && isRevoking ? (
              <>
                <Loader className="h-3 w-3 animate-spin text-red-600" />
                <span>Logging out...</span>
              </>
            ) : (
              "Log out"
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-10 max-w-4xl px-4 md:px-6 py-12 mx-auto">
      <Link
        href="/userfeed/settings/account/security"
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <MdArrowBack />
        <span className="ml-2 text-sm font-medium">Password and Security </span>
      </Link>

      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wide">
              where you're logged in
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Manage your active login sessions and view details about where you're signed in.
            </p>
          </div>

          {otherSessions.length > 0 && (
            <button
              onClick={handleRevokeAll}
              disabled={isRevokingAll}
              className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed border border-red-200 hover:bg-red-50 px-3 py-2 rounded-lg transition flex-shrink-0"
            >
              {isRevokingAll ? (
                <>
                  <Loader className="h-4 w-4 animate-spin text-red-600" />
                  <span>Logging out...</span>
                </>
              ) : (
                <>
                  <LogOut size={16} />
                  <span>Log out of all other devices</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader className="h-6 w-6 animate-spin text-teal-600" />
          <p className="text-sm text-gray-500 font-medium">Loading your sessions...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-8 text-red-500">
          <p className="text-sm font-medium">
            Failed to load sessions. Please try refreshing.
          </p>
        </div>
      )}

      {/* Sessions List */}
      {!isLoading && !isError && (
        <div className="bg-white border rounded-sm p-3 divide-y divide-gray-100">
          {currentSession && renderSessionRow(currentSession, { isCurrent: true })}
          {otherSessions.map((session) => renderSessionRow(session))}

          {sessions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium">No active sessions found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;