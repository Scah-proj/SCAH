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
  DialogDescription,
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
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 pb-28 lg:pb-16">

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
              {/* <span>{tryout.date} · {tryout.time}</span> */}
              <span>{tryout.sport} · {tryout.gender}</span>
              <span>{tryout.city}, {tryout.venue}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-base">
            {tryout.description}
          </p>
    
      </div>


          {/* Eligibility + Requirements */}
          <div className="space-y-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">


  {/* LEFT SIDE */}
  <div className="md:col-span-2 space-y-6">
          {/* Opportunities */}
         <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
  <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
    Opportunities
  </h3>

  <div className="flex flex-wrap gap-3">
    {tryout.opportunities.map((opp, i) => (
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
    <div>
      <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">
        Age Range
      </p>
      <p className="text-gray-800 font-medium">
        {tryout.eligibility.ageRange}
      </p>
    </div>

    <div>
      <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">
        Positions
      </p>
      <p className="text-gray-800 font-medium">
        {tryout.eligibility.positions.join(", ")}
      </p>
    </div>

    <div>
      <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">
        Gender
      </p>
      <p className="text-gray-800 font-medium">
        {tryout.eligibility.gender}
      </p>
    </div>

    <div>
      <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">
        Experience
      </p>
      <p className="text-gray-800 font-medium">
        {tryout.eligibility.experience}
      </p>
    </div>
  </div>
</div>
    

  </div>

  {/* RIGHT INFO CARD */}
  <div className="md:col-span-1">
   <div className="border border-gray-200 rounded-2xl p-6 bg-white md:sticky md:top-24">
  <div className="space-y-4 text-sm text-gray-700">

    {/* <div className="flex justify-between pb-3 border-b border-gray-200">
      <span className="text-gray-500">Date</span>
      <span className="font-medium">{tryout.date}</span>
    </div>

    <div className="flex justify-between pb-3 border-b border-gray-200">
      <span className="text-gray-500">Time</span>
      <span className="font-medium">{tryout.time}</span>
    </div> */}

    <div className="flex justify-between pb-3 border-b border-gray-200">
      <span className="text-gray-500">Location</span>
      <span className="font-medium">{tryout.city}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">Age</span>
      <span className="font-medium">{tryout.eligibility.ageRange}</span>
    </div>
  </div>

  <div className="mt-6">
    <p className="px-4 py-3 rounded-lg bg-red-50 text-sm text-red-600 font-medium text-center">
      Deadline: {tryout.deadline}
    </p>
  </div>

  <div className="mt-6">
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button className="w-full bg-teal-600">
      Apply Now
    </Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
    <DialogHeader>
      <div className="p-6">

      <DialogTitle className="text-xl font-semibold">
        Tryout Application
      </DialogTitle>
      <p className="text-sm text-gray-500">
        Fill in your details to apply for this tryout.
      </p>
      </div>
    </DialogHeader>

      <div className="max-h-[70vh] overflow-y-auto no-scrollbar px-6">

    <form className="space-y-6">
      
      {/* PERSONAL INFO */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wide">
          Personal Information
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <input 
          type="text"
          placeholder="First Name"
          name="firstName" 
          className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500"/>
          <input type="text" placeholder="Last Name" name="lastName" className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500" />
        </div>

        <input type="email" placeholder="Email Address" name="email" className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500" />
        <input type="text" placeholder="Phone Number" name="phone" className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500" />
      </div>

      {/* PLAYER DETAILS */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wide">
          Player Details
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Age" name="age" className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500" />
          <input type="text" placeholder="Position (e.g. ST, GK)" name="position" className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500" />
        </div>

        <input
          type="text"
          placeholder="Years of Experience (e.g. 3 years)"
          name="experience"
          className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500"
        />

        <input
          placeholder="Preferred Foot (Optional)"
          name="foot"
          className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500"
        />
      </div>

      {/* MEDIA */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wide">
          Media
        </h3>

        <input
          placeholder="Highlight Video URL (YouTube, Drive, etc.)"
          name="highlightVideo"
          className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500"
        />
      </div>

      {/* EXTRA */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wide">
          Additional Info
        </h3>

        <textarea
          placeholder="Tell the scout anything that might help your application..."
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          rows={3}
        />
      </div>
      
    </form>
      </div>
      {/* SUBMIT */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 py-2">
          By submitting this application, you agree to our terms and conditions.
        </p>
        <Button type="submit" className="w-full bg-teal-600">
          Submit Application
        </Button> 
      </div>
  </DialogContent>
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