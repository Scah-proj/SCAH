"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast"; // Added this import
import { MdArrowBack } from "react-icons/md";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import { Button } from "../../components/ui/button";
import Select from 'react-select';
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { positionsBySport } from "../onboarding/page";
import { useCreateTryoutMutation, useGetTryoutByIdQuery, useUpdateTryoutMutation } from "../redux/api/tryoutApi";

export default function TryoutForm({ mode = "create", tryoutId }) {
    const params = useParams();
    const router = useRouter();

const id = tryoutId || params?.id;

  const [createTryout, { isLoading: isCreating }] = useCreateTryoutMutation();

  const {
  data,
  isLoading: isFetching
} = useGetTryoutByIdQuery(id, {
  skip: mode === "create",
});
const [
  updateTryout,
  {isLoading: isUpdating}
] = useUpdateTryoutMutation();

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

  const [gender, setGender] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sport: "",
    level: "",
    gender: "",
    city: "",
    venue: "",
    date: "",
    time: "",
    ageRange: "",
    positions: [],
    fee: { type: "", amount: "" },
    visibility: "",
    deadline: "",
    organization: "",
    contactEmail: "",
    opportunities: [],
    requirements: [],
  });
  
  useEffect(() => {
  if (mode === "edit" && data) {
    setGender(data.gender);

    setFormData({
      title: data.title || "",
      description: data.description || "",
      sport: data.sport || "",
      level: data.level || "",
      gender: data.gender || "",
      city: data.city || "",
      venue: data.venue || "",
      date: data.date ? data.date.split("T")[0] : "",
      time: data.date ? data.date.split("T")[1]?.slice(0, 5) : "",
      ageRange: data.ageRange || "",
      positions: data.positions || [],
      fee: data.fee || { type: "", amount: "" },
      visibility: data.visibility || "",
      deadline: data.deadline ? data.deadline.split("T")[0] : "",
      organization: data.organization || "",
      contactEmail: data.contactEmail || "",
      opportunities: data.opportunities || [],
      requirements: data.requirements || [],
    });
  }
}, [mode, data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeeChange = (e) => {
    setFormData(prev => ({
      ...prev,
      fee: { ...prev.fee, [e.target.name]: e.target.value }
    }));
  };

  const toggleArray = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].includes(value) 
        ? prev[key].filter(i => i !== value) 
        : [...prev[key], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalPayload = {
      ...formData,
      date: new Date(`${formData.date}T${formData.time}:00Z`).toISOString(),
      deadline: new Date(`${formData.deadline}T23:59:59Z`).toISOString(),
    };
    try {
      if(mode==="create"){

 await createTryout(finalPayload).unwrap();
 toast.success("Tryout successfully created");
 router.back();

}else{

 await updateTryout({
    id:tryoutId,
    data:finalPayload
 }).unwrap();
 toast.success("Tryout successfully updated");
 router.back();

}
    } catch (error) {
      console.error("Error creating tryout:", error);
      toast.error("Failed to create tryout."); // Error Toast
    }
  };

  const positionOptions = (positionsBySport[formData.sport] || []).map((pos) => ({
    value: pos.id,
    label: pos.title,
  }));

  return (
    <div>
      <div className="my-4">
<h3 className="text-3xl md:text-4xl font-bold text-gray-900">
  {mode === "create" ? "New Tryout" : "Edit Tryout"}
</h3>      </div>
      <div>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-6 shadow-md border">
          <div className="space-y-4">
            <p className="text-lg font-semibold">Tryout Details</p>
            <input name="title" placeholder="Trial Title" value={formData.title} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300" />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<Select
  options={sportOptions}
  value={sportOptions.find(
    (option) => option.value === formData.sport
  )}
  onChange={(s) =>
    setFormData({
      ...formData,
      sport: s.value
    })
  }
  placeholder="Select Sport"
/>
<Select
  isMulti
  options={positionOptions}
  value={positionOptions.filter(
    (option) =>
      formData.positions.includes(option.value)
  )}
  onChange={(s) =>
    setFormData({
      ...formData,
      positions: s.map(i => i.value)
    })
  }
  placeholder="Select Positions"
  isDisabled={!formData.sport}
/>
<Select
  options={levelOptions}
  value={levelOptions.find(
    (option) => option.value === formData.level
  )}
  onChange={(s) =>
    setFormData({
      ...formData,
      level: s.value
    })
  }
  placeholder="Select Level"
/>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <div className="flex gap-3">
                {["Male", "Female", "Both"].map((g) => (
                  <button key={g} type="button" onClick={() => { setGender(g); setFormData({ ...formData, gender: g }); }} className={`px-4 py-2 rounded-md border text-sm ${gender === g ? "bg-teal-600 text-white" : "bg-gray-100"}`}>{g}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Location & Date</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="city" placeholder="City, Country" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded-md" />
              <input name="venue" placeholder="Venue Name" value={formData.venue} onChange={handleChange} className="w-full p-2 border rounded-md" />
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded-md" />
              <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-2 border rounded-md" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Eligibility</h3>
<Select
  options={ageRangeOptions}
  value={ageRangeOptions.find(
    (option) => option.value === formData.ageRange
  )}
  onChange={(s) =>
    setFormData({
      ...formData,
      ageRange: s.value
    })
  }
  placeholder="Select Age Range"
/>          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cost & Outcome</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<Select
  options={feeOptions}
  value={feeOptions.find(
    (option) => option.value === formData.fee.type
  )}
  onChange={(s) =>
    setFormData((prev) => ({
      ...prev,
      fee: {
        ...prev.fee,
        type: s.value
      }
    }))
  }
  placeholder="Fee Type"
/>
              {formData.fee.type === "Paid" && <input name="amount" placeholder="Amount" value={formData.fee.amount} onChange={handleFeeChange} className="w-full p-2 border rounded-md" />}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {["Contract", "Scholarship", "Trial", "Scout Evaluation"].map((opt) => (
                <label key={opt} className="flex items-center gap-2"><input type="checkbox" onChange={() => toggleArray("opportunities", opt)} /> {opt}</label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Visibility & Deadline</h3>
<Select
  options={visibilityOptions}
  value={visibilityOptions.find(
    (option) => option.value === formData.visibility
  )}
  onChange={(s) =>
    setFormData({
      ...formData,
      visibility: s.value
    })
  }
  placeholder="Select Visibility"
/>
            <input type="date" name="deadline"   value={formData.deadline} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Organizer</h3>
            <input name="organization" placeholder="Academy Name" value={formData.organization} onChange={handleChange} className="w-full p-2 border rounded-md" />
            <input type="email" name="contactEmail" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          <button type="submit" disabled={isCreating || isUpdating} className="w-full bg-teal-700 text-white py-3 rounded-md">{isCreating || isUpdating 
 ? "Saving..." 
 : mode==="create" 
 ? "Post Tryout" 
 : "Update Tryout"}</button>
        </form>
      </div>
    </div>
  );
};
