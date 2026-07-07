"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import { ExternalLink } from "lucide-react";

import { useGetTryoutApplicantsQuery } from "../../../../../redux/api/tryoutApi";

export default function ApplicantsPage() {
  const { id } = useParams();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetTryoutApplicantsQuery(id);

  const applicants = data?.data?.applicants || [];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-6">
        Loading applicants...
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
            Total Applicants: {data?.data?.total || 0}
          </p>
        </div>
      </div>

      {!applicants.length ? (
        <div className="rounded-xl border bg-white p-12 text-center">
          <h2 className="text-xl font-semibold">
            No Applicants Yet
          </h2>

          <p className="mt-2 text-gray-500">
            Athletes who apply will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
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
                </tr>
              </thead>

              <tbody>
                {applicants.map((applicant) => (
                  <tr
                    key={applicant._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <h3 className="font-semibold">
                          {applicant.athleteId.firstName}{" "}
                          {applicant.athleteId.lastName}
                        </h3>

                        <p className="text-xs text-gray-500">
                          {applicant.athleteId._id}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      {applicant.athleteId.email}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}