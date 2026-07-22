"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useGetTryoutByIdQuery, useApplyToTryoutMutation } from "../../../../redux/api/tryoutApi";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import { Button } from "../../../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../../../../../components/ui/dialog"

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState("")
  const [gender, setGender] = useState("")
  const [submitError, setSubmitError] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    position: "",
    experience: "",
    foot: "",
    highlightVideo: "",
    notes: ""
  })

  const {
    data: tryout,
    isLoading,
    isError,
    error,
  } = useGetTryoutByIdQuery(id, { skip: !id })

  const [applyToTryout, { isLoading: isApplying }] = useApplyToTryoutMutation()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const getErrorMessage = (err) => {
    const backendError = err?.data?.error;
    if (backendError?.message) {
      return backendError.code
        ? `${backendError.message} (${backendError.code})`
        : backendError.message;
    }
    if (err?.data?.message) return err.data.message;
    if (err?.status === "FETCH_ERROR") return "Could not reach the server. Check your connection.";
    if (err?.status === "PARSING_ERROR") return "Received an unexpected response from the server.";
    if (err?.status) return `Request failed with status ${err.status}.`;
    return "Something went wrong. Please try again.";
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)
    try {
      await applyToTryout({
        id,
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          age: formData.age,
          position: formData.position,
          experience: formData.experience,
          foot: formData.foot,
          highlightVideo: formData.highlightVideo,
          notes: formData.notes,
        },
      }).unwrap()
      setStatus("success")
    } catch (err) {
      console.error("applyToTryout failed:", err)
      setSubmitError(getErrorMessage(err))
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-3 flex flex-col items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600"></div>
        <p>Loading Tryout...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <p className="p-6 text-red-600">
        Failed to load tryout{error?.data?.message ? `: ${error.data.message}` : "."}
      </p>
    )
  }

  if (!tryout) return <p className="p-6">Loading Tryout...</p>

  if (status === "success") {
    return (
      <div className="p-10 text-center max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-teal-700 mb-3">
          Application Submitted 🎉
        </h2>
        <p className="text-gray-600">
          The scout will review your profile and contact you soon.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 pb-28 lg:pb-16">
      <Link
        href="/userfeed/tryout"
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <MdArrowBack />
        <span className="ml-2 text-sm font-medium">Back to Tryouts</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium tracking-wide text-teal-600 uppercase">
                Official {tryout.level} Tryout
              </p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
                {tryout.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>{tryout.sport} · {tryout.gender}</span>
                <span>{tryout.city}, {tryout.venue}</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-base">
              {tryout.description}
            </p>
          </div>

          <div className="space-y-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  Opportunities
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(tryout.opportunities ?? []).map((opp, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 text-sm rounded-lg font-medium bg-teal-50 text-teal-700"
                    >
                      {opp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  Eligibility
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div><p className="text-gray-400 uppercase tracking-wide text-xs mb-1">Age Range</p><p className="text-gray-800 font-medium">{tryout.eligibility.ageRange}</p></div>
                  <div><p className="text-gray-400 uppercase tracking-wide text-xs mb-1">Positions</p><p className="text-gray-800 font-medium">{tryout.eligibility.positions.join(", ")}</p></div>
                  <div><p className="text-gray-400 uppercase tracking-wide text-xs mb-1">Gender</p><p className="text-gray-800 font-medium">{tryout.eligibility.gender}</p></div>
                  <div><p className="text-gray-400 uppercase tracking-wide text-xs mb-1">Experience</p><p className="text-gray-800 font-medium">{tryout.eligibility.experience}</p></div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="border border-gray-200 rounded-2xl p-6 bg-white md:sticky md:top-24">
                <div className="space-y-4 text-sm text-gray-700">
                  <div className="flex justify-between pb-3 border-b border-gray-200"><span className="text-gray-500">Location</span><span className="font-medium">{tryout.city}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Age</span><span className="font-medium">{tryout.eligibility.ageRange}</span></div>
                </div>
                <div className="mt-6"><p className="px-4 py-3 rounded-lg bg-red-50 text-sm text-red-600 font-medium text-center">Deadline: {tryout.deadline}</p></div>

                <div className="mt-6">
                  {user?.role === "Scout" ? (
                    <Button
  className="w-full bg-blue-600 hover:bg-blue-700"
  onClick={() =>
    router.push(`/userfeed/tryout/application/${id}/applicants`)
  }
>
  View Applicants
</Button>
                  ) : (
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-teal-600">Apply Now</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
                        <DialogHeader>
                          <div className="p-6">
                            <DialogTitle className="text-xl font-semibold">Tryout Application</DialogTitle>
                            <p className="text-sm text-gray-500">Fill in your details to apply for this tryout.</p>
                          </div>
                        </DialogHeader>
                        <div className="max-h-[70vh] overflow-y-auto no-scrollbar px-6">
                          <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                              <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wide">Personal Information</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500"/>
                                <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500" />
                              </div>
                              <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500" />
                              <input type="text" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500" />
                            </div>
                            <div className="space-y-4">
                              <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wide">Player Details</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Age" name="age" value={formData.age} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500" />
                                <input type="text" placeholder="Position (e.g. ST, GK)" name="position" value={formData.position} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500" />
                              </div>
                              <input type="text" placeholder="Years of Experience (e.g. 3 years)" name="experience" value={formData.experience} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500" />
                              <input placeholder="Preferred Foot (Optional)" name="foot" value={formData.foot} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500" />
                            </div>
                            <div className="space-y-4">
                              <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wide">Media</h3>
                              <input placeholder="Highlight Video URL (YouTube, Drive, etc.)" name="highlightVideo" value={formData.highlightVideo} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500" />
                            </div>
                            <div className="space-y-4">
                              <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wide">Additional Info</h3>
                              <textarea placeholder="Tell the scout anything that might help your application..." name="notes" value={formData.notes} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" rows={3} />
                            </div>
                            {submitError && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">{submitError}</p>}
                          </form>
                        </div>
                        <div className="p-4 border-t border-gray-200">
                          <p className="text-xs text-gray-500 py-2">By submitting this application, you agree to our terms and conditions.</p>
                          <Button type="button" onClick={handleSubmit} disabled={isApplying} className="w-full bg-teal-600">
                            {isApplying ? "Submitting..." : "Submit Application"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;