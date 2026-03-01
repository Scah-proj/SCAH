"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation";
import { getTryoutById } from "../../../lib/tryOuts";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import { Button } from "../../../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog"

const Page = () => {
  const { id } = useParams();
  const [tryout, setTryout] = useState(null)
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState("")
  const [gender, setGender] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    position: "",
    experience: "",
    highlightVideo: ""
  })

  useEffect(() => {
    async function fetchTrial() {
      const data = await getTryoutById(id);
      setTryout(data)
    }
    fetchTrial();
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await new Promise((res) => setTimeout(res, 1000))
    setStatus("success")
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
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 pb-28 lg:pb-10">

      {/* Back */}
      <Link
        href="/userfeed/tryout"
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <MdArrowBack />
        <span className="ml-2 text-sm font-medium">Back to Tryouts</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-10">

          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
              {tryout.title}
            </h1>

            <p className="text-teal-600 font-medium">
              Official {tryout.level} Tryout
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <span>{tryout.date} · {tryout.time}</span>
              <span>{tryout.city}, {tryout.venue}</span>
              <span>{tryout.sport} · {tryout.gender}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">
            {tryout.description}
          </p>

          {/* Opportunities */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Opportunities Available
            </h3>
            <div className="flex flex-wrap gap-3">
              {tryout.opportunities.map((opp, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-sm rounded-full bg-teal-50 text-teal-700 border border-teal-200"
                >
                  {opp}
                </span>
              ))}
            </div>
          </div>

          {/* Eligibility + Requirements */}
          <div className="space-y-8 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">

  {/* LEFT SIDE */}
  <div className="md:col-span-1 space-y-8">

    <div>
      <h3 className="font-semibold text-lg mb-3">Eligibility</h3>
      <p className="text-sm text-gray-600 mb-2">
        Age: {tryout.eligibility.ageRange}
      </p>
      <p className="text-sm text-gray-600">
        Positions: {tryout.eligibility.positions.join(", ")}
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-lg mb-3">Requirements</h3>
      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
        {tryout.requirements.map((req, i) => (
          <li key={i}>{req}</li>
        ))}
      </ul>
    </div>

  </div>

  {/* RIGHT INFO CARD */}
  <div className="md:col-span-2 md:mr-10 flex items-center justify-center">
    <div className="border rounded-2xl p-5 shadow-sm bg-white space-y-5 md:sticky md:top-24">

      <div className="space-y-2 text-sm">
        <p><strong>Date:</strong> {tryout.date}</p>
        <p><strong>Time:</strong> {tryout.time}</p>
        <p><strong>Location:</strong> {tryout.city}</p>
        <p><strong>Age:</strong> {tryout.eligibility.ageRange}</p>
      </div>

      <p className="text-sm text-red-600 font-medium">
        Deadline: {tryout.deadline}
      </p>

      <div className="">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              Apply Now
            </Button>
          </DialogTrigger>
        </Dialog>
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