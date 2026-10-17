"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useBanAccountMutation, useUnbanAccountMutation } from "../../../redux/api/settingApi";

const errorMessage = (error) =>
  error?.data?.error?.message || error?.data?.message || error?.data?.error || error?.error || "The request failed. Please try again.";

export default function AdminModerationPage() {
  const auth = useSelector((state) => state.auth);
  const isAdmin = auth?.user?.isAdmin === true || auth?.role?.toLowerCase() === "admin" || auth?.user?.role?.toLowerCase() === "admin";
  const [userId, setUserId] = useState("");
  const [reason, setReason] = useState("");
  const [temporary, setTemporary] = useState(false);
  const [days, setDays] = useState("7");
  const [banAccount, { isLoading: isBanning }] = useBanAccountMutation();
  const [unbanAccount, { isLoading: isUnbanning }] = useUnbanAccountMutation();
  const busy = isBanning || isUnbanning;

  if (!isAdmin) {
    return <main className="mx-auto max-w-xl p-6"><h1 className="text-xl font-semibold">Admin moderation</h1><p className="mt-2 text-sm text-gray-600">This interface is available to administrators only.</p></main>;
  }

  const submitBan = async (event) => {
    event.preventDefault();
    const normalizedId = userId.trim();
    const banDays = Number(days);
    if (!normalizedId || !reason.trim() || (temporary && (!Number.isInteger(banDays) || banDays < 1 || banDays > 365))) return;
    const confirmation = temporary
      ? `Temporarily ban account ${normalizedId} for ${banDays} days?`
      : `Permanently ban account ${normalizedId}?`;
    if (!window.confirm(confirmation)) return;

    try {
      const result = await banAccount({ userId: normalizedId, reason: reason.trim(), ...(temporary ? { days: banDays } : {}) }).unwrap();
      const ban = result?.data ?? result;
      const expiresAt = ban?.expiresAt || ban?.expiryDate || ban?.expires;
      const when = expiresAt ? new Date(expiresAt).toLocaleString() : null;
      toast.success(temporary ? `Temporary ban applied${when ? ` until ${when}` : ""}.` : "Permanent ban applied.");
    } catch (error) {
      toast.error(errorMessage(error));
    }
  };

  const submitUnban = async () => {
    const normalizedId = userId.trim();
    if (!normalizedId || !window.confirm(`Unban account ${normalizedId}?`)) return;
    try {
      await unbanAccount(normalizedId).unwrap();
      toast.success("Account unbanned successfully.");
    } catch (error) {
      toast.error(errorMessage(error));
    }
  };

  return (
    <main className="mx-auto max-w-xl space-y-6 p-6">
      <header><h1 className="text-2xl font-semibold">Admin moderation</h1><p className="mt-1 text-sm text-gray-600">Ban or unban an account by its user ID.</p></header>
      <label className="block text-sm font-medium">Target user ID<input value={userId} onChange={(event) => setUserId(event.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" required /></label>
      <form onSubmit={submitBan} className="space-y-4 rounded-xl border p-5">
        <h2 className="font-semibold">Ban account</h2>
        <label className="block text-sm font-medium">Reason<textarea value={reason} onChange={(event) => setReason(event.target.value)} maxLength={1000} rows={3} className="mt-1 block w-full rounded-md border px-3 py-2" required /></label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={temporary} onChange={(event) => setTemporary(event.target.checked)} />Temporary ban</label>
        {temporary && <label className="block text-sm font-medium">Duration in days<input type="number" min="1" max="365" step="1" value={days} onChange={(event) => setDays(event.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" required /></label>}
        <button disabled={busy || !userId.trim() || !reason.trim() || (temporary && (!Number.isInteger(Number(days)) || Number(days) < 1 || Number(days) > 365))} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{isBanning ? "Submitting…" : "Ban account"}</button>
      </form>
      <section className="rounded-xl border p-5"><h2 className="font-semibold">Unban account</h2><button type="button" onClick={submitUnban} disabled={busy || !userId.trim()} className="mt-3 rounded-md border px-4 py-2 text-sm disabled:opacity-60">{isUnbanning ? "Submitting…" : "Unban account"}</button></section>
    </main>
  );
}
