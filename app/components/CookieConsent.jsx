"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const COOKIE_CONSENT_KEY = "scah-cookie-consent";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [preferences, setPreferences] = useState({
    essential: true,
    preferences: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!savedConsent) {
      setShowBanner(true);
      return;
    }

    try {
      const savedPreferences = JSON.parse(savedConsent);

      setPreferences({
        essential: true,
        preferences: Boolean(savedPreferences.preferences),
        analytics: Boolean(savedPreferences.analytics),
        marketing: Boolean(savedPreferences.marketing),
      });
    } catch {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (newPreferences) => {
    const consentData = {
      ...newPreferences,
      essential: true,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify(consentData)
    );

    setPreferences(consentData);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    saveConsent({
      essential: true,
      preferences: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectNonEssential = () => {
    saveConsent({
      essential: true,
      preferences: false,
      analytics: false,
      marketing: false,
    });
  };

  const saveCustomPreferences = () => {
    saveConsent(preferences);
  };

    useEffect(() => {
    const openCookieSettings = () => {
      setShowBanner(false);
      setShowSettings(true);
    };

    window.addEventListener("open-cookie-settings", openCookieSettings);

    return () => {
      window.removeEventListener("open-cookie-settings", openCookieSettings);
    };
  }, []);

  if (!showBanner && !showSettings) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-5">
          <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-2xl">
            <div className="p-5 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                
                {/* Icon + Text */}
                <div className="flex gap-4 flex-1">
                  <div className="hidden sm:flex shrink-0 w-11 h-11 rounded-full bg-teal-50 items-center justify-center">
                    <Cookie className="w-5 h-5 text-teal-700" />
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      We use cookies 🍪
                    </h3>

                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      We use cookies to keep SCAH secure, remember your
                      preferences, understand how our platform is used,
                      and improve your experience.
                    </p>

                    <div className="mt-2">
                      <Link
                        href="/legal/cookie"
                        className="text-sm text-teal-700 font-medium hover:underline"
                      >
                        Learn more about our Cookie Policy
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={rejectNonEssential}
                    className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Reject non-essential
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2.5 rounded-lg border border-teal-700 text-sm font-medium text-teal-700 hover:bg-teal-50 transition"
                  >
                    Cookie Settings
                  </button>

                  <button
                    type="button"
                    onClick={acceptAll}
                    className="px-4 py-2.5 rounded-lg bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 transition"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Cookie Settings
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Choose which types of cookies you allow.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Close cookie settings"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Categories */}
            <div className="p-6 space-y-5">

              {/* Essential */}
              <CookieCategory
                title="Essential Cookies"
                description="These cookies are necessary for SCAH to function properly, including security, authentication, and basic site functionality."
                checked={true}
                disabled={true}
              />

              {/* Preferences */}
              <CookieCategory
                title="Preference Cookies"
                description="These cookies help remember your choices and preferences to provide a more personalized experience."
                checked={preferences.preferences}
                onChange={(value) =>
                  setPreferences((prev) => ({
                    ...prev,
                    preferences: value,
                  }))
                }
              />

              {/* Analytics */}
              <CookieCategory
                title="Analytics Cookies"
                description="These cookies help us understand how visitors use SCAH so we can improve the platform."
                checked={preferences.analytics}
                onChange={(value) =>
                  setPreferences((prev) => ({
                    ...prev,
                    analytics: value,
                  }))
                }
              />

              {/* Marketing */}
              <CookieCategory
                title="Marketing Cookies"
                description="These cookies may be used to understand advertising effectiveness and provide more relevant content."
                checked={preferences.marketing}
                onChange={(value) =>
                  setPreferences((prev) => ({
                    ...prev,
                    marketing: value,
                  }))
                }
              />

              <p className="text-xs text-gray-500 leading-relaxed">
                You can change your cookie preferences at any time.
                For more information, please see our{" "}
                <Link
                  href="/legal/cookie"
                  className="text-teal-700 hover:underline font-medium"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={rejectNonEssential}
                className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Reject Non-Essential
              </button>

              <button
                type="button"
                onClick={saveCustomPreferences}
                className="px-4 py-2.5 rounded-lg bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 transition"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CookieCategory({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>

        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
          {description}
        </p>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative shrink-0 w-11 h-6 rounded-full transition ${
          checked ? "bg-teal-700" : "bg-gray-300"
        } ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
        aria-label={`Toggle ${title}`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}