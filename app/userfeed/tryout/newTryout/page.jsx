"use client"
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../../../../components/ui/calendar";
import { Button } from "../../../../components/ui/button"
import Select from 'react-select';
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "../../../../components/ui/field";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover"
import { positionsBySport } from "../../../onboarding/page";

const Page = () => {
    const sportOptions = [
    { value: 'Football', label: 'Football' },
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Tennis', label: 'Tennis' },
  ];
  const levelOptions = [
    { value: 'Academy', label: 'Academy' },
    { value: 'Semi-Pro', label: 'Semi-Pro' },
    { value: 'Pro', label: 'Pro' },
    { value: 'Scholarship', label: 'Scholarship' },
  ];
  const ageRangeOptions = [
  { value: "U12 (8–12)", label: "U12 (8–12)" },
  { value: "U15 (13–15)", label: "U15 (13–15)" },
  { value: "U17 (16–17)", label: "U17 (16–17)" },
  { value: "U20 (18–20)", label: "U20 (18–20)" },
  { value: "Senior (21+)", label: "Senior (21+)" },
];
  const feeOptions = [
    { value: 'Free', label: 'Free' },
    { value: 'Paid', label: 'Paid' },
  ];
  const visibilityOptions = [
    { value: 'Public', label: 'Public' },
    { value: 'Verified Athletes', label: 'Verified Athletes' },
  ];

      const [gender, setGender ] = useState("")
    const [formData, setFormData] = useState({
  trialTitle: "",
  sport: "",
  level: "",
  gender: "",
  city: "",
  venue: "",
  date: "",
  time: "",
  ageRange: "",
  positions: [],
  feeType: "",
  feeAmount: "",
  visibility: "",
  deadline: "",
  organization: "",
  contactEmail: "",
});       const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    const [open, setOpen] = useState(false)
      const [date, setDate] = useState(new Date("2025-06-01"))
      const [month, setMonth] = useState(date)
      const [value, setValue] = useState(formatDate(date))
        const handleSubmit = async (e) => {
            e.preventDefault();
          };
    const positionOptions =
  (positionsBySport[formData.sport] || []).map((pos) => ({
                            value: pos.id,
                            label: pos.title,}));
    return(
        
        <div className="space-y-8 max-w-2xl px-4 py-8 mx-auto">
 <div className="my-4">
        <p className="text-2xl font-bold">New Tryout</p>
        </div>         
           <div>
                 <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-6 shadow-md border">
  {/* SECTION 1: Tryout Details */}
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Tryout Details</h3>

    <input
      type="text"
      name="trialTitle"
      placeholder="Trial Title"
      value={formData.trialTitle}
      onChange={handleChange}
      className="w-full rounded-md p-2 border border-gray-300 focus:ring-1 focus:ring-teal-500"
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select
        options={sportOptions}
        name="sport"
        value={sportOptions.find(option => option.value === formData.sport)}
        onChange={(selected) => setFormData({ ...formData, sport: selected.value, positions: [] })}
        placeholder="Select Sport"
        classNames={{
          control: (state) => `w-full mt-1 p-1 border rounded-md ${state.isFocused ? "border-teal-500" : "border-gray-300"}`,
          menu: () => "bg-white shadow-lg rounded-md border border-gray-200",
          option: (state) => `px-3 py-2 cursor-pointer ${state.isFocused ? "bg-gray-100" : ""}`,
        }}
      />
 <Select
  isMulti
  name="positions"
  options={positionOptions} // ✅ already correct

  value={positionOptions.filter((opt) =>
    formData.positions?.includes(opt.value)
  )}

  onChange={(selected) =>
    setFormData({
      ...formData,
      positions: selected.map((item) => item.value),
    })
  }

  placeholder={
    formData.sport ? "Select Positions" : "Pick a sport"
  }

  isDisabled={!formData.sport}

  classNames={{
    control: (state) =>
      `w-full mt-1 p-1 border rounded-md ${
        state.isFocused ? "border-teal-500" : "border-gray-300"
      }`,
    menu: () =>
      "bg-white shadow-lg rounded-md border border-gray-200",
  }}
/>
      <Select
        options={levelOptions}
        name="level"
        value={levelOptions.find(option => option.value === formData.level)}
        onChange={(selected) => setFormData({ ...formData, level: selected.value })}
        placeholder="Select Level"
        classNames={{
          control: (state) => `w-full mt-1 p-1 border rounded-md ${state.isFocused ? "border-teal-500" : "border-gray-300"}`,
          menu: () => "bg-white shadow-lg rounded-md border border-gray-200",
          option: (state) => `px-3 py-2 cursor-pointer ${state.isFocused ? "bg-gray-100" : ""}`,
        }}
      />
    </div>

    {/* Gender Toggle */}
    <div>
      <label className="block text-sm font-medium mb-2">Gender</label>
      <div className="flex gap-3">
        {["Male", "Female", "Both"].map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => { setGender(g);
              setFormData({ ...formData, gender: g });
            }}
            
            className={`px-4 py-2 rounded-md border text-sm hover:bg-gray-200 ${
              gender === g ? "bg-teal-600 text-white border-teal-600" : "bg-gray-100 border-gray-300"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  </div>

  {/* SECTION 2: Location & Date */}
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Location & Date</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        name="city"
        placeholder="City, Country"
        value={formData.city}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:ring-1 focus:ring-teal-500"
      />
      <input
        name="venue"
        placeholder="Venue Name"
        value={formData.venue}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:ring-1 focus:ring-teal-500"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:ring-1 focus:ring-teal-500"
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:ring-1 focus:ring-teal-500"
      />
    </div>
  </div>

  {/* SECTION 3: Eligibility */}
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Eligibility</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select
  name="ageRange"
  options={ageRangeOptions}
  value={ageRangeOptions.find(option => option.value === formData.ageRange)}
  onChange={(selected) =>
    setFormData({ ...formData, ageRange: selected.value })
  }
  placeholder="Select Age Range"
  classNames={{
    control: (state) =>
      `w-full mt-1 p-1 border rounded-md ${
        state.isFocused ? "border-teal-500" : "border-gray-300"
      }`,
    menu: () =>
      "bg-white shadow-lg rounded-md border border-gray-200",
    option: (state) =>
      `px-3 py-2 cursor-pointer ${
        state.isFocused ? "bg-gray-100" : ""
      }`,
  }}
/>
    
    </div>
  </div>

  {/* SECTION 4: Cost & Outcome */}
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Cost & Outcome</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select
        name="feeType"
        options={feeOptions}
        value={feeOptions.find(option => option.value === formData.feeType)}
        onChange={(selected) => setFormData({ ...formData, feeType: selected.value })}
        placeholder="Fee Type"
        classNames={{
          control: (state) => `w-full mt-1 p-1 border rounded-md ${state.isFocused ? "border-teal-500" : "border-gray-300"}`,
          menu: () => "bg-white shadow-lg rounded-md border border-gray-200",
          option: (state) => `px-3 py-2 cursor-pointer ${state.isFocused ? "bg-gray-100" : ""}`,
        }}
      />

      {formData.feeType === "Paid" && (
        <input
          name="feeAmount"
          placeholder="Amount"
          className="w-full p-2 border rounded-md focus:ring-1 focus:ring-teal-500"
        />
      )}
    </div>

    {/* Opportunities */}
    <div className="grid grid-cols-2 gap-2 text-sm">
      {["Contract", "Scholarship", "Trial", "Scout Evaluation"].map((opt) => (
        <label key={opt} className="flex items-center gap-2">
          <input type="checkbox" />
          {opt}
        </label>
      ))}
    </div>
  </div>

  

  {/* SECTION 6: Visibility & Deadline */}
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Visibility & Deadline</h3>
    <Select
      name="visibility"
      options={visibilityOptions}
      value={visibilityOptions.find(option => option.value === formData.visibility)}
      onChange={(selected) => setFormData({ ...formData, visibility: selected.value })}
      placeholder="Select Visibility"
      classNames={{
        control: (state) => `w-full mt-1 p-1 border rounded-md ${state.isFocused ? "border-teal-500" : "border-gray-300"}`,
        menu: () => "bg-white shadow-lg rounded-md border border-gray-200",
        option: (state) => `px-3 py-2 cursor-pointer ${state.isFocused ? "bg-gray-100" : ""}`,
      }}
    />

    <input
      type="date"
      name="deadline"
      value={formData.deadline}
      onChange={handleChange}
      className="w-full p-2 border rounded-md focus:ring-1 focus:ring-teal-500"
    />
  </div>

  {/* SECTION 7: Organizer */}
  <div className="space-y-2">
    <h3 className="text-lg font-semibold">Organizer</h3>
    <input
      name="organization"
      placeholder="Academy / Organization Name"
      value={formData.organization}
      onChange={handleChange}
      className="w-full p-2 border rounded-md focus:ring-1 focus:ring-teal-500"
    />
    <input
      type="email"
      name="contactEmail"
      placeholder="Contact Email"
      value={formData.contactEmail}
      onChange={handleChange}
      className="w-full p-2 border rounded-md focus:ring-1 focus:ring-teal-500"
    />
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="w-full bg-teal-700 text-white py-3 rounded-md hover:bg-teal-800 transition"
  >
    Post Tryout
  </button>
</form>

       
            </div>
        </div>
    )
}
export default Page;

function formatDate(date) {
  if (!date) return ""

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}
function isValidDate(date) {
  return !!date && !isNaN(date.getTime())
}