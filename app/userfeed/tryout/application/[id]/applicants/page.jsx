"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import { ExternalLink, Check, X, Loader } from "lucide-react";
import toast from "react-hot-toast";

import {
  useGetTryoutApplicantsQuery,
  useUpdateApplicationStatusMutation,
} from "../../../../../redux/api/tryoutApi";

const STATUS_STYLES = {
  pending: "bg-yellow-50 text-yellow-700",
  accepted: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
  withdrawn: "bg-gray-100 text-gray-500",
};

const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
  { label: "Withdrawn", value: "withdrawn" },
];

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${style}`}>
      {status || "pending"}
    </span>
  );
}

export default function ApplicantsPage() {
  const { id } = useParams();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetTryoutApplicantsQuery(id);

  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();

  // Tracks current selected status filter
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Tracks which specific application and action is currently being executed
  const [actingState, setActingState] = useState({ id: null, status: null });

  const applicants = data?.data?.applicants || data?.applicants || [];
  const reportedTotal =
    data?.data?.totalApplicants ??
    data?.data?.total ??
    data?.totalApplicants ??
    data?.total;
  const totalApplicants = Number.isFinite(Number(reportedTotal))
    ? Math.max(Number(reportedTotal), applicants.length)
    : applicants.length;

  // Filter applicants based on selected status tab
  const filteredApplicants = applicants.filter((applicant) => {
    if (selectedStatus === "all") return true;
    const currentStatus = applicant.status || "pending";
    return currentStatus === selectedStatus;
  });

  // Calculate total counts per status for filter tab badges
  const getCountByStatus = (statusValue) => {
    if (statusValue === "all") return applicants.length;
    return applicants.filter(
      (a) => (a.status || "pending") === statusValue
    ).length;
  };

  const handleDecision = async (applicationId, status) => {
    setActingState({ id: applicationId, status });
    try {
      await updateApplicationStatus({
        id,
        applicationId,
        status,
      }).unwrap();
      toast.success(`Application ${status}`);
    } catch (err) {
      console.error("Failed to update application status:", err);
      toast.error(
        err?.data?.error?.message || `Failed to ${status === "accepted" ? "accept" : "reject"} application`
      );
    } finally {
      setActingState({ id: null, status: null });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-10 px-6">
        <Loader className="h-6 w-6 animate-spin text-teal-600" />
        <div className="mt-4 text-gray-600">Loading applicants...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-6 text-red-600">
        {error?.data?.message || "Failed to load applicants"}
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href={`/userfeed/tryout/application/${id}`}
            className="flex items-center text-gray-500 hover:text-black mb-4"
          >
            <MdArrowBack />
            <span className="ml-2">Back to Tryout</span>
          </Link>

          <h1 className="text-3xl font-bold">Tryout Applicants</h1>

          <p className="text-gray-500 mt-2">
            Total Applicants: {totalApplicants}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        {FILTER_OPTIONS.map((option) => {
          const count = getCountByStatus(option.value);
          const isActive = selectedStatus === option.value;

          return (
            <button
              key={option.value}
              onClick={() => setSelectedStatus(option.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              <span>{option.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  isActive
                    ? "bg-teal-700 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {!filteredApplicants.length ? (
        <div className="rounded-xl border bg-white p-12 text-center">
          <h2 className="text-xl font-semibold">
            No {selectedStatus !== "all" ? selectedStatus : ""} Applicants Found
          </h2>

          <p className="mt-2 text-gray-500">
            {selectedStatus === "all"
              ? "Athletes who apply will appear here."
              : `There are no applicants with the status "${selectedStatus}".`}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Athlete
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Notes
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Highlight Video
                  </th>

                  <th className="px-6 py-4 text-center font-semibold">
                    Applied
                  </th>

                  <th className="px-6 py-4 text-center font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredApplicants.map((applicant) => {
                  const isPending = (applicant.status || "pending") === "pending";
                  const isActing = actingState.id === applicant._id;
                  const isAccepting = isActing && actingState.status === "accepted";
                  const isRejecting = isActing && actingState.status === "rejected";

                  return (
                    <tr
                      key={applicant._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <h3 className="font-semibold">
                            {applicant.athleteId?.firstName}{" "}
                            {applicant.athleteId?.lastName}
                          </h3>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        {applicant.athleteId?.email}
                      </td>

                      <td className="px-6 py-5">
                        {applicant.notes || "-"}
                      </td>

                      <td className="px-6 py-5">
                        {applicant.highlightVideo ? (
                          <a
                            href={applicant.highlightVideo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-teal-600 hover:underline"
                          >
                            Watch Video
                            <ExternalLink size={15} />
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="px-6 py-5 text-center">
                        {new Date(applicant.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-5 text-center">
                        <StatusBadge status={applicant.status} />
                      </td>

                      <td className="px-6 py-5">
                        {isPending ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              disabled={isActing}
                              onClick={() => handleDecision(applicant._id, "accepted")}
                              className="inline-flex items-center gap-1.5 rounded-md bg-teal-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                              {isAccepting ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <Check size={14} />
                              )}
                              Accept
                            </button>
                            <button
                              type="button"
                              disabled={isActing}
                              onClick={() => handleDecision(applicant._id, "rejected")}
                              className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                              {isRejecting ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <X size={14} />
                              )}
                              Reject
                            </button>
                          </div>
                        ) : (
                          <div className="text-center text-xs text-gray-400">
                            {applicant.status === "withdrawn"
                              ? "Withdrawn"
                              : "Decision made"}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}