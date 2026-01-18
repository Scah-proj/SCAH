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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog"
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "../../../../../components/ui/drawer"

const Page = () => {
    const { id } = useParams();
    const [ tryout, setTryout ] = useState(null)

    useEffect(() => {
        async function fetchTrial(){
            const data = await getTryoutById(id);
            setTryout(data)
        }
        fetchTrial();
},[id])
    const [ open, setOpen ] = useState(false);
    const [gender, setGender ] = useState("")
    const [formData, setFormData ] = useState({firstName: "",lastName: "", age: "", position: "", experience:"" });
    const [status, setStatus] = useState("")
    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // simulate API submission
      await new Promise((res) => setTimeout(res, 1000))
      
      // await onSubmit(formData)

      setStatus("success") // show success message
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
    // finally {
    //   setLoading(false)
    // }
  }
      
      if(!tryout){
        return (
            <p>Loading Try out...</p>
        )
      }
      if (status === "success") {
    return (
      <div className="p-6 text-center">
        <h2 className="text-lg font-semibold text-teal-700 mb-2">
          Successfully Applied!
        </h2>
        <p className="text-gray-700">
          Your application has been submitted. The scout will contact you soon.
        </p>
      </div>
    )
  }
return(
    <div className="space-y-6 max-w-4xl mx-auto px-4 md:px-6">
        
            <Link href="/userfeed/tryout" className="flex items-center text-gray-600 hover:text-gray-800">
            <MdArrowBack/>
            <p className="px-2">Apply for Try Out</p>
            </Link> 

       <div className="w-full p-4 md:p-6">
               <div className="w-full max-w-3xl">
                <div className="p-4 space-y-5">
  {/* Header */}
  <div>
    <h2 className="text-2xl font-semibold leading-tight">{tryout.title}</h2>
    <p className="text-sm text-gray-600">
      {tryout.sport} · {tryout.level} · {tryout.gender}
    </p>
    <p className="text-sm text-gray-600">
      {tryout.date} · {tryout.time}
    </p>
    <p className="text-sm text-gray-600">
      {tryout.venue}, {tryout.city}
    </p>
  </div>

  {/* Overview */}
  <p className="text-gray-700">{tryout.description}</p>

  {/* Eligibility */}
  <div>
    <p className="font-medium">Eligibility</p>
    <p className="text-sm text-gray-600">
      Age: {tryout.eligibility.ageRange}
    </p>
    <p className="text-sm text-gray-600">
      Positions: {tryout.eligibility.positions.join(", ")}
    </p>
  </div>

  {/* Opportunities */}
  <div>
    <p className="font-medium">Opportunities</p>
    <div className="flex flex-wrap gap-2 mt-2">
      {tryout.opportunities.map((opp, i) => (
        <span
          key={i}
          className="px-3 py-1 text-xs rounded-full bg-teal-100 text-teal-700"
        >
          {opp}
        </span>
      ))}
    </div>
  </div>

  {/* Requirements */}
  <div>
    <p className="font-medium">Requirements</p>
    <ul className="list-disc pl-5 text-sm text-gray-600">
      {tryout.requirements.map((req, i) => (
        <li key={i}>{req}</li>
      ))}
    </ul>
  </div>

  {/* Deadline */}
  <p className="text-sm text-red-600">
    Application Deadline: {tryout.deadline}
  </p>

  {/* CTA */}
  <div className="pt-4">

 <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit">
          Apply Now
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle>Apply for Tryout</DialogTitle>
        </DialogHeader>
          <div>
            <form
  onSubmit={handleSubmit}
  className="rounded-lg p-5 space-y-5"
>
  {/* Name */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-md font-medium">First Name</label>
      <input
        type="text"
        name="firstName"
        placeholder="First name"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="mt-1 w-full rounded-md p-2 border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
      />
    </div>

    <div>
      <label className="block text-md font-medium">Last Name</label>
      <input
        type="text"
        name="lastName"
        placeholder="Last name"
        value={formData.lastName}
        onChange={handleChange}
        required
        className="mt-1 w-full rounded-md p-2 border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
      />
    </div>
  </div>

  {/* Contact Info */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-md font-medium">Email Address</label>
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        required
        className="mt-1 w-full rounded-md p-2 border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
      />
    </div>

    <div>
      <label className="block text-md font-medium">Phone Number</label>
      <input
        type="tel"
        name="phone"
        placeholder="+234..."
        value={formData.phone}
        onChange={handleChange}
        className="mt-1 w-full rounded-md p-2 border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
      />
    </div>
  </div>

  {/* Age & Experience */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-md font-medium">Age</label>
      <input
        type="number"
        name="age"
        placeholder="e.g. 17"
        value={formData.age}
        onChange={handleChange}
        required
        className="mt-1 w-full rounded-md p-2 border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
      />
    </div>

    <div>
      <label className="block text-md font-medium">Experience (years)</label>
      <input
        type="number"
        name="experience"
        placeholder="e.g. 3"
        value={formData.experience}
        onChange={handleChange}
        className="mt-1 w-full rounded-md p-2 border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
      />
    </div>
  </div>

  {/* Position */}
  <div>
    <label className="block text-md font-medium">Playing Position</label>
    <input
      type="text"
      name="position"
      placeholder="e.g. Striker, Midfielder"
      value={formData.position}
      onChange={handleChange}
      required
      className="mt-1 w-full rounded-md p-2 border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
    />
  </div>

  {/* Gender */}
  <div>
    <label className="block text-md font-medium mb-2">Gender</label>
    <div className="flex gap-4">
      {["male", "female"].map((g) => (
        <button
          key={g}
          type="button"
          onClick={() => setGender(g)}
          className={`flex-1 py-2 rounded-md border text-sm font-medium transition
            ${
              gender === g
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
        >
          {g.charAt(0).toUpperCase() + g.slice(1)}
        </button>
      ))}
    </div>
  </div>

  {/* Optional links */}
  <div>
    <label className="block text-md font-medium">
      Highlight Video (optional)
    </label>
    <input
      type="url"
      name="highlightVideo"
      placeholder="https://youtube.com/..."
      value={formData.highlightVideo}
      onChange={handleChange}
      className="mt-1 w-full rounded-md p-2 border border-gray-300 focus:border-teal-500 focus:ring-teal-500"
    />
  </div>

  {/* Confirmation */}
  <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" required />
    I confirm that the information provided is accurate.
  </label>

  {/* Submit */}
  <button
    type="submit"
    className="w-full bg-teal-700 text-white py-3 rounded-md hover:bg-teal-800 transition"
  >
    Submit Application
  </button>
            </form>
          </div>
      </DialogContent>
    </Dialog>
  </div>
</div>

                 </div> 
       
               </div>
    </div>
        
)
}
export default Page;