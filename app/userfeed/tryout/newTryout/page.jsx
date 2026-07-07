"use client";
import { useState } from "react";
import toast from "react-hot-toast"; // Added this import
import { MdArrowBack } from "react-icons/md";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../../../components/ui/calendar";
import { Button } from "../../../../components/ui/button";
import Select from 'react-select';
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "../../../../components/ui/field";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { positionsBySport } from "../../../onboarding/page";
import { useCreateTryoutMutation } from "../../../redux/api/tryoutApi";

const Page = () => {
  const [createTryout, { isLoading }] = useCreateTryoutMutation();

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
      await createTryout(finalPayload).unwrap();
      toast.success("Tryout created!"); // Success Toast
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
    <div className="space-y-8 max-w-2xl px-4 py-8 mx-auto">
      <div className="my-4">
        <p className="text-2xl font-bold">New Tryout</p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-6 shadow-md border">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tryout Details</h3>
            <input name="title" placeholder="Trial Title" value={formData.title} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300" />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full rounded-md p-2 border border-gray-300" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select options={sportOptions} onChange={(s) => setFormData({ ...formData, sport: s.value })} placeholder="Select Sport" />
              <Select isMulti options={positionOptions} onChange={(s) => setFormData({ ...formData, positions: s.map(i => i.value) })} placeholder="Select Positions" isDisabled={!formData.sport} />
              <Select options={levelOptions} onChange={(s) => setFormData({ ...formData, level: s.value })} placeholder="Select Level" />
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
              <input type="date" name="date" onChange={handleChange} className="w-full p-2 border rounded-md" />
              <input type="time" name="time" onChange={handleChange} className="w-full p-2 border rounded-md" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Eligibility</h3>
            <Select options={ageRangeOptions} onChange={(s) => setFormData({ ...formData, ageRange: s.value })} placeholder="Select Age Range" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cost & Outcome</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select options={feeOptions} onChange={(s) => setFormData(p => ({ ...p, fee: { ...p.fee, type: s.value } }))} placeholder="Fee Type" />
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
            <Select options={visibilityOptions} onChange={(s) => setFormData({ ...formData, visibility: s.value })} placeholder="Select Visibility" />
            <input type="date" name="deadline" onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Organizer</h3>
            <input name="organization" placeholder="Academy Name" value={formData.organization} onChange={handleChange} className="w-full p-2 border rounded-md" />
            <input type="email" name="contactEmail" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-teal-700 text-white py-3 rounded-md">{isLoading ? "Posting..." : "Post Tryout"}</button>
        </form>
      </div>
    </div>
  );
};

export default Page;