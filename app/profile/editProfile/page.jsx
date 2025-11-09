"use client"
import { MdClose, MdOutlineCheck } from "react-icons/md";
import Image from "next/image";
import { useUserStore } from "@/lib/userStore";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { profileSections } from "./profileSections";


export default function EditProfile() {
  const user = useUserStore((state) => state.user);
  const updateProfile = useUserStore((state) => state.updateProfile);
  const userType = useUserStore((state) => state.user?.role);
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateProfile({[name]: value});
  };
  const handleSubmit = (e) => {
    e.preventdefault();
  }
    return(
         <div className="bg-white w-full sm:w-1/2 sm:h-4/5 sm:rounded-md p-3">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between">
            {/* <div
              onClick=''
              className="cursor-pointer"
            >
              <MdClose className="w-6 h-6" />  
             
            </div> */}
            <p className="font-medium">Edit Profile</p>
            <button type="submit" disabled=''>
              {/* {isLoading ? (
                <Spinner className="w-5 h-5" />
              ) : (
                <MdOutlineCheck className="text-blue-500 w-6 h-6" />
              )} */}
            </button>
          </div>
          <div className="flex items-center justify-center flex-col gap-3 mt-8">
            <label
              htmlFor="profilePicture"
              className="text-blue-500 font-medium cursor-pointer"
            >
              <Image
                src='/wen.webp'
                width={180}
                height={180}
                alt='Profile Picture'
                className="w-24 !h-24 rounded-full object-cover"
              />
              Edit picture
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                onChange={handleChange}
                className="hidden"
              />
            </label>

          {profileSections.map((section) => (
  <Accordion key={section.id} type="single" className="w-full" collapsible>
    <AccordionItem value={section.title}>
      <AccordionTrigger>{section.title}</AccordionTrigger>
      <AccordionContent className="mt-3 space-y-3">
        {section.fields.map((field, i) => {
          // Subfields
          if (field.fields) {
            return (
              <Accordion key={i} type="single" collapsible className="ml-4">
                <AccordionItem value={field.title}>
                  <AccordionTrigger>{field.title}</AccordionTrigger>
                  <AccordionContent className="mt-2 space-y-2">
                    {field.fields.map((subField, j) => (
                      <div key={j}>
                        {subField.type === "checkbox" ? (
                          <CheckboxField
                            {...subField}
                            value={user?.[subField.name] || []}
                            onChange={handleChange}
                          />
                        ) : subField.type === "select" ? (
                          <SelectField
                            {...subField}
                            value={user?.[subField.name] || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          <InputField
                            {...subField}
                            value={user?.[subField.name] || ""}
                            onChange={handleChange}
                          />
                        )}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          }

          // Regular top-level fields
          return (
            <div key={i}>
              {field.type === "checkbox" ? (
                <CheckboxField
                  {...field}
                  value={user?.[field.name] || []}
                  onChange={handleChange}
                />
              ) : field.type === "select" ? (
                <SelectField
                  {...field}
                  value={user?.[field.name] || ""}
                  onChange={handleChange}
                />
              ) : (
                <InputField
                  {...field}
                  value={user?.[field.name] || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          );
        })}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
))}



            {/* <div className="flex justify-between w-full">
            <label className="relative pt-4" htmlFor="name">
              <span className="absolute top-0 left-0 text-slate-500">Name</span>
            </label>
            <input
              className="w-[80%] border-0 border-b border-gray-400 focus:ring-0 px-0"
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              value={user?.name ||""}
              onChange={handleChange}
            />
            </div> */}

           
          </div>
        </form>
      </div>
    )
}
function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="flex justify-between w-full">
      <label className="relative pt-4" htmlFor={name}>
        <span className="text-slate-500 w-[20%]">{label}</span>
      </label>
      <input
        className="w-[80%] border-0 border-b border-gray-400 focus:ring-0 px-0"
        type={type}
        name={name}
        id={name}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="flex justify-between w-full">
      <label className="relative pt-4" htmlFor={name}>
        <span className="absolute top-0 left-0 text-slate-500">{label}</span>
      </label>
      <select
        className="w-[80%] border-0 border-b border-gray-400 focus:ring-0 px-0 bg-transparent"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
function CheckboxField({ label, name, value = [], onChange, options }) {
  const handleCheckboxChange = (e) => {
    const { checked, value: val } = e.target;
    let updatedValues = [...value];

    if (checked) {
      updatedValues.push(val);
    } else {
      updatedValues = updatedValues.filter((v) => v !== val);
    }

    onChange({ target: { name, value: updatedValues } });
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="font-medium">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-1">
            <input
              type="checkbox"
              value={opt}
              checked={value.includes(opt)}
              onChange={handleCheckboxChange}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
