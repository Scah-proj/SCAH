"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { User, LogOut } from "lucide-react";

import { navroutes } from "./navroutes";
import { useGetMyProfileQuery } from "../../../redux/api/profileApi";
import { logout } from "../../../redux/features/auth/authSlice";

const Sidenav = ({ onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const user = useSelector((state) => state.auth.user);

  // Fetch full profile
  const { data: profile } = useGetMyProfileQuery();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    if (onClose) onClose();
    window.location.href = "/auth/login";
  };

  const computedProfilePicture =
    profile?.profilePicture ||
    profile?.picture ||
    user?.profilePicture ||
    user?.picture ||
    null;

  const computedDisplayName =
    profile?.name ||
    `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() ||
    user?.name ||
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const computedOrganization =
    profile?.organization ||
    profile?.club ||
    profile?.team ||
    "";

  const computedLocation =
    profile?.location ||
    profile?.athleteProfile?.location ||
    user?.location ||
    {};

  const profilePicture = mounted ? computedProfilePicture : null;
  const displayName = mounted ? computedDisplayName : "Profile";
  const organization = mounted ? computedOrganization : "";
  const location = mounted ? computedLocation : {};

  return (
    <div className="relative w-full h-screen flex flex-col justify-between">
      <div className="flex-shrink-0 px-4 pt-4">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-6">
          <div className="mb-8">
            <Link href="/userfeed">
              <Image
                src="/yattr.png"
                alt="SCAH Logo"
                width={60}
                height={30}
                priority
                className="object-contain"
              />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/profile" className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border flex items-center justify-center">
                {profilePicture && !hasError ? (
                  <Image
                    src={profilePicture}
                    alt="Profile Picture"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                    onError={() => setHasError(true)}
                  />
                ) : (
                  <User className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </Link>

            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
              <p className="font-semibold text-base text-black truncate">
                {mounted ? displayName : "Profile"}
              </p>

              {organization && (
                <p className="text-xs text-gray-600 truncate">
                  {organization}
                </p>
              )}

              {(location?.city ||
                location?.state ||
                location?.country) && (
                <p className="text-xs text-gray-600 truncate">
                  {[location?.city, location?.state, location?.country]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <nav className="w-full">
          <ul className="space-y-1">
            {navroutes.map((route) => {
              const isActive = pathname === route.path;

              return (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    onClick={() => onClose && onClose()}
                    className={`group flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                      isActive
                        ? "bg-teal-500 text-white"
                        : "text-gray-700 hover:bg-gray-200/50 hover:text-gray-700"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 ${
                        isActive
                          ? "text-white"
                          : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      {route.icon}
                    </span>

                    <span className="text-sm font-medium">
                      {route.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom Logout Section */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-red-600 hover:bg-red-50 transition-colors font-medium text-sm"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidenav;