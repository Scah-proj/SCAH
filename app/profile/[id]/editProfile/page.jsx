"use client"
import Image from "next/image";
import Link from "next/link";
import Slider from '@mui/material/Slider';
import PlacesAutocomplete from "../../../../components/PlacesAutocomplete";
import Select from 'react-select'
import { useState, useEffect, useRef } from "react";
import { positionsBySport } from "../../../onboarding/page";
import { MdEdit, MdArrowBack, MdExpandMore, MdCheck } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoTrash } from "react-icons/io5";
import { useUserStore } from "../../../../lib/userStore";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../../../components/ui/accordion";
import { profileSections } from "./profileSections";
import { PhoneInput } from 'react-international-phone';
import { CountryDropdown } from 'react-country-region-selector';
import 'react-international-phone/style.css';
import { createPortal } from "react-dom";
import { Checkbox } from "../../../../components/ui/checkbox"
import { Label } from "../../../../components/ui/label"
import ExperienceSection from "../../../components/Experience";

export default function EditProfile() {
  const user = useUserStore((state) => state.user);
  const userType = user?.role;
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
  const { name, value } = e.target;

  const isValidDate = (d) => {
    if (!d) return false;
    const t = new Date(d).getTime();
    return !isNaN(t);
  };

  const getUser = () => useUserStore.getState().user;

  
  if (name === "expPrimarySport") {
    useUserStore.getState().updateProfile({ [name]: value, expAthletePosition: "" });
    return;
  }

  if (name === "primarySport") {
    useUserStore.getState().updateProfile({ [name]: value, athletePosition: "" });
    return;
  }

  
  if (name === "expCurrent") {
    if (value) {
      setErrors((p) => {
        const c = { ...p };
        delete c.expEnd;
        return c;
      });
    }

    useUserStore.getState().updateProfile({
      expCurrent: value,
      ...(value ? { expEnd: "" } : {})
    });

    return;
  }

  if (name === "current") {
    if (value) {
      setErrors((p) => {
        const c = { ...p };
        delete c.end;
        return c;
      });
    }

    useUserStore.getState().updateProfile({
      current: value,
      ...(value ? { end: "" } : {})
    });

    return;
  }

  
  if (name === "expEnd" || name === "end") {
    useUserStore.getState().updateProfile({ [name]: value });
    setErrors((p) => {
      const c = { ...p };
      delete c[name];
      return c;
    });
    return;
  }

  
  if (name === "expStart" || name === "start") {
    // Update start and clear any existing end-date error while editing.
    const endField = name === "expStart" ? "expEnd" : "end";
    useUserStore.getState().updateProfile({ [name]: value });
    setErrors((p) => {
      const c = { ...p };
      delete c[endField];
      return c;
    });
    return;
  }

  
  useUserStore.getState().updateProfile({ [name]: value });
};

  const handleAddExperience = (e) => {
  e.preventDefault();

  const userState = useUserStore.getState().user;

  const academy =
    userType?.toLowerCase() === "athlete"
      ? userState?.expAcademy
      : userState?.expOrganization;

  if (!academy || !userState?.expStart) {
    setErrors((p) => ({
      ...p,
      experience: "Please fill in Club/Academy and Start Date",
    }));
    return;
  }

  const start = userState.expStart;
  const end = userState.expEnd;
  const isCurrent = userState.expCurrent === true;

  const isValidDate = (d) => !isNaN(new Date(d).getTime());

  if (!isCurrent && start && end) {
    if (isValidDate(start) && isValidDate(end)) {
      if (new Date(end) < new Date(start)) {
        setErrors((p) => ({
          ...p,
          expEnd: "End date cannot be before the start date",
        }));
        return;
      }
    }
  }

  const experience = {
    Academy: academy || "",
    primarySport: userState.expPrimarySport || "",
    athletePosition: userState.expAthletePosition || "",
    start: start || "",
    end: isCurrent ? "Present" : (end || ""),
  };

  const allExperience = userState.experienceList || [];

  useUserStore.getState().updateProfile({
    experienceList: [...allExperience, experience],
    expAcademy: "",
    expPrimarySport: "",
    expAthletePosition: "",
    expStart: "",
    expEnd: "",
    expCurrent: false,
  });

  setErrors((p) => {
    const c = { ...p };
    delete c.expEnd;
    delete c.experience;
    return c;
  });
   // ADD THESE DEBUG LOGS
  console.log("✅ Experience added:", experience);
  console.log("✅ Full experienceList:", [...allExperience, experience]);
  console.log("✅ Store after update:", useUserStore.getState().user);
};

// const handleDeleteExperience = (index) => {
//   const allExperience = user?.experienceList || [];
//   const updatedList = allExperience.filter((_, i) => i !== index);
//   useUserStore.getState().updateProfile({ experienceList: updatedList });
// };

    
  const handleSubmit = (e) => {
      e.preventDefault();
  }
  
    return(
       <div className="w-full bg-center flex flex-col items-center gap-6 py-6" style={{
          backgroundImage: `url('/scah-bck.png')`,
        }}>
            <div className="w-full  bg-white sm:w-1/2 sm:h-4/5 sm:rounded-md p-4 lg:pl-[50px] lg:pr-[50px] lg:pt-6 lg:pb-6 p-4 shadow-md" >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between mb-8">
            <Link href="/profile/123"><MdArrowBack/></Link>
            <Link href="/profile/123">
            <button type="submit" disabled='' className="bg-teal-600 text-white text-sm font-medium px-3 py-2 rounded-md">
              Save changes
              {/* {isLoading ? (
                <Spinner className="w-5 h-5" />
              ) : (
                <MdOutlineCheck className="text-blue-500 w-6 h-6" />
              )} */}
            </button>
            </Link>
          </div>
            <label
              htmlFor="profilePicture"
              className="text-teal-500 font-small cursor-pointer"
            >
              <Image
                src='/wen.webp'
                width={180}
                height={180}
                alt='Profile Picture'
                className="w-24 !h-24 mb-2 rounded-full object-cover"
              />
              Edit Profile Photo
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                onChange={handleChange}
                className="hidden"
              />
            </label>

  <div className="w-full flex items-center justify-center flex-col gap-3 mt-4">
          {profileSections
  .filter(section => !section.role || section.role.toLowerCase() === userType?.toLowerCase())
  .map((section) => (
    <Accordion key={section.id} type="single" className="w-full pb-8 p-4 my-2 shadow-sm overflow-visible" collapsible>
      <AccordionItem value={section.title}>
        <div className="flex items-center">
        <div className="">{section.icon}</div>
        <AccordionTrigger className="font-semibold ml-4">{section.title}</AccordionTrigger>
        
        </div>
        
        <AccordionContent >
          <div className="w-full " key={section.id === "experience"}>
            {section.id === "experience" ? <AddBtn onAdd={handleAddExperience} error={errors?.experience} /> : null}
        </div>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-visible">

          {section.fields
            .filter(field => !field.userType || field.userType.toLowerCase() === userType?.toLowerCase())
            .map((field, i) => {
              if (field.fields) {
                return (
               <div key={`${section.id}-${field.name || field.title || i}`} className="sm:col-span-2">

                  <Accordion type="single" collapsible className="ml-4">
                    <AccordionItem value={field.title}>
                      <AccordionTrigger>{field.title}</AccordionTrigger>
                      <AccordionContent className="mt-3 space-y-2">
                       {field.fields
  .filter(subField => !subField.userType || subField.userType.toLowerCase() === userType?.toLowerCase())
  .map((subField, j) => (
    <div key={`${section.id}-${field.title}-${subField.name || j}`} className="w-full">
      {/* Check if subField also has nested fields (triple nesting) */}
      {subField.fields ? (
        <Accordion type="single" collapsible className="ml-4">
          <AccordionItem value={subField.title}>
            <AccordionTrigger className="text-sm">{subField.title}</AccordionTrigger>
            <AccordionContent className="mt-2 space-y-2">
              {subField.fields
                .filter(innerField => !innerField.userType || innerField.userType.toLowerCase() === userType?.toLowerCase())
                .map((innerField, k) => (
                  <div key={`${section.id}-${field.title}-${subField.title}-${innerField.name || k}`}>
                    { innerField.type === "technicalSkill" ? (
                      <TechnicalSkillField
                      {...innerField}
                      value={user?.[innerField.name] || []}
                      onChange={handleChange}
                      />
                    ):
                    innerField.type === "coreSkill" ? (
                      <CoreSkillField
                        {...innerField}
                        value={user?.[innerField.name] || []}
                        onChange={handleChange}
                      />
                    ) : innerField.type === "text" ? (
                      <InputField
                        {...innerField}
                        value={user?.[innerField.name] || ""}
                        onChange={handleChange}
                      />
                    ) : null}
                  </div>
                ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : subField.type === "file" ? (
                    <MediaUploadField
                    {...subField}
                    value={user?.[subField.name] || ""}
                    onChange={handleChange}
                  />
                  ) :subField.type === "coreSkill" ? (
        <CoreSkillField
          {...subField}
          value={user?.[subField.name] || []}
          onChange={handleChange}
        />
      ) : subField.type === "slider" ? (
        <SliderField
          {...subField}
          value={user?.[subField.name] || ""}
          onChange={handleChange}
          min={subField.min}
          max={subField.max}
          step={subField.step}
        />
      ) : subField.type === "phone" ? (
        <PhoneField
          {...subField}
          value={user?.[subField.name] || ""}
          onChange={handleChange}
        />
      ) : subField.type === "textarea" ? (
        <TextareaField
          {...subField}
          value={user?.[subField.name] || ""}
          onChange={handleChange}
        />
      ) : subField.type === "checkbox" ? (
        <CheckboxField
          {...subField}
          value={(subField.name === "current" || subField.name === "expCurrent") ? (user?.[subField.name] || false) : (user?.[subField.name] || [])}
          onChange={handleChange}
        />
      ) : subField.type === "select" ? (
        <SelectField
          {...subField}
          options={
            (subField.name === "athletePosition" || subField.name === "expAthletePosition")
              ? (positionsBySport[subField.name === "expAthletePosition" ? user?.expPrimarySport : user?.primarySport] || []).map((pos) => ({
                  value: pos.id,
                  label: pos.title,
                }))
              : subField.options
          }
          value={user?.[subField.name] || ""}
          onChange={handleChange}
        />
      ) : subField.type === "date" && (subField.name === "end" || subField.name === "expEnd") ? (
        <InputField
          {...subField}
          value={
            subField.name === "expEnd" 
              ? (user?.expCurrent ? "Present" : user?.[subField.name] || "")
              : (user?.current ? "Present" : user?.[subField.name] || "")
          }
          onChange={handleChange}
          disabled={
            subField.name === "expEnd" 
              ? user?.expCurrent === true 
              : user?.current === true
          }
          min={subField.name === "expEnd" ? user?.expStart : user?.start}
          error={errors && errors[subField.name]}
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
                  </div>
                )
              }
              return (
                <div key={field.name || i} className={i === 0 ? "sm:col-span-2" : "" }>

                 
                  {field.type === "file" ? (
                    <MediaUploadField
                    {...field}
                    value={user?.[field.name] || ""}
                    onChange={handleChange}
                  />
                  ) : field.type === "weight" ? (
                <WeightField
                  {...field}
                  value={user?.[field.name] || ""}
                  onChange={handleChange}
                />
                  ) : field.type === "height" ? (
                <HeightField
                  {...field}
                  value={user?.[field.name] || ""}
                  onChange={handleChange}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                />
                  ) : field.type === "location" ? (
                <LocationChange
                  {...field}
                  value={user?.[field.name] || ""}
                  onChange={handleChange}
                  
                /> 
                  ) : field.type === "nationality" ? (
                <Nationality
                  {...field}
                  value={user?.[field.name] || ""}
                  onChange={handleChange}
                />
                  ) : field.type === "phone" ? (
                <PhoneField
                  {...field}
                  value={user?.[field.name] || ""}
                  onChange={handleChange}
                />
                  ) : field.type === "textarea" ? (
                    <TextareaField
                      {...field}
                      value={user?.[field.name] || ""}
                      onChange={handleChange}
                    />
                  ) : field.type === "checkbox" ? (
                    <CheckboxField
                      {...field}
  value={(field.name === "current" || field.name === "expCurrent") ? (user?.[field.name] || false) : (user?.[field.name] || [])}
                      onChange={handleChange}
                    />
                  ) : field.type === "select" ? (
                    <SelectField
                      {...field}
                      options={
                      (field.name === "athletePosition" || field.name === "expAthletePosition")
                        ? (positionsBySport[field.name === "expAthletePosition" ? user?.expPrimarySport : user?.primarySport] || []).map((pos) => ({
                            value: pos.id,
                            label: pos.title,
                          }))
                         : field.options
                    }

                      value={user?.[field.name] || ""}
                      onChange={handleChange}
                    />
                 ) : field.type === "scoutPosition" ? (
                <ScoutPositionField
                  {...field}
                  options={
                  (field.name === "scoutingPosition")
                        ? (positionsBySport[field.name === "scoutingPosition" ? user?.scoutingSport : user?.primarySport] || []).map((pos) => ({
                            value: pos.id,
                            label: pos.title,
                          })) : field.options
                  }
                  value={user?.[field.name] || ""}
                  onChange={handleChange}
                  />
                 )
                 
                 : field.type === "date" && (field.name === "end" || field.name === "expEnd") ? (
  <InputField
    {...field}
    value={ field.name === "expEnd" ?
    (user?.expCurrent ? "Present" : user?.[field.name] || "") :
    (user?.current ? "Present" : user?.[field.name] || "")
    }
    onChange={handleChange}
    disabled={
      field.name === "expEnd"
        ? user?.expCurrent === true
        : user?.current === true
    }
    min={field.name === "expEnd" ? user?.expStart : user?.start}
    error={errors && errors[field.name]}
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
        </div>
        <div>
          {section.id === "experience" && (
<ExperienceSection experienceList={user?.experienceList || []} isOwnProfile={true} mode="edit" />          )}
        </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ))}

          </div>
        </form>
      </div>
        </div>
    )

function AddBtn({onAdd, error}) {
  return(
    <div className="text-right mb-4">
          <button onClick={onAdd} className="cursor-pointer">
            <AiOutlinePlus className="text-gray-500 w-5 h-5"/>
          </button>
          {error ? <p className="text-red-600 text-sm mt-1">{error}</p> : null}
    </div>    
  )
}
// function ExperienceSection ({experienceList}) {
//   return(
//     <div>
//       {experienceList.map((exp, index) => (
//         <div key={index} className="my-4 p-4 border border-gray-200 rounded-md">
//           <div className="flex">
//             <p>
//               Played
//             </p>
//             {exp.primarySport && (
//             <p className="text-gray-500 text-sm mt-1">{exp.primarySport}</p>
//           )}
//           <p>at</p>
//           </div>
//           <div className="flex justify-between items-center mb-2"> 
//           <div className="font-semibold text-xl flex ">
//           <h3 className="ml-2">{exp.Academy}</h3>
//           </div>
//           <div className="flex gap-2">

//           <MdEdit className="text-gray-500 w-5 h-5 cursor-pointer"/>
//           <IoTrash className="text-red-500 w-5 h-5 cursor-pointer" onClick={() => handleDeleteExperience(index)}/>
//           </div>
//           </div>
//           <div className="flex items-center">
//           {exp.athletePosition && (
//             <p>{exp.athletePosition}</p>
//           )}
//           <p className="text-gray-600">
//             {formatDate(exp.start)} - {formatDate(exp.end)}
//           </p>
//           </div>
          
//         </div>
//       ))}
//     </div>
//   )
// }


}
function InputField({ label, name, value, onChange, type = "text", disabled = false, min, error }) {
    const today = new Date().toISOString().split('T')[0];
    const base = "rounded-md p-2.5 px-3 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500";
    const border = error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-teal-500";

  return (
    <div className="flex flex-col w-full">
      <label className="relative py-2" htmlFor={name}>
        <span className="text-gray-700 font-medium w-[20%]">{label}</span>
      </label>
      <input
        className={`${base} border ${border}`}
        type={disabled && (name === "end" || name === "expEnd") ? "text" : type}
        name={name}
        id={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        max={type === "date" ? today : undefined}
        min={min}
      />
      {error ? <p className="text-red-600 text-sm mt-1">{error}</p> : null}
    </div>
  );
}
function SelectField({ label, name, value, onChange, options = [] }) {
  const handleSelectChange = (selectedOption) => {
    onChange({
      target: {
        name: name,
        value: selectedOption ? selectedOption.value : ''
      }
    });
  };

  return (
    <div className="flex flex-col w-full">
      <label className="relative py-2" htmlFor={name}>
        <span className="text-gray-700 font-medium w-[20%]">{label}</span>
      </label>
     <Select
  id={name}
  name={name}
  options={options}
  value={options.find(option => option.value === value) || null}
  onChange={handleSelectChange}
  menuPortalTarget={document.body}
  styles={{
    control: (base, state) => ({
      ...base,
      boxShadow: state.isFocused ? "0 0 0 1px #14b8a6" : "none",
      borderColor: state.isFocused ? "#14b8a6" : base.borderColor,
      "&:hover": {
        borderColor: state.isFocused ? "#14b8a6" : base.borderColor,
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  }}
  classNames={{
    control: (state) =>
      `border rounded-md p-1 ${
        state.isFocused ? "border-teal-500" : "border-gray-300"
      }`,
    option: (state) =>
      `px-3 py-2 cursor-pointer ${
        state.isFocused ? "bg-gray-100" : ""
      }`,
    menu: () => "bg-white shadow-lg border border-gray-200 rounded-md",
    menuList: () => "bg-white rounded-md",
    valueContainer: () => "p-1",
    placeholder: () => "text-gray-400",
  }}
/>

    </div>
  );
}
function ScoutPositionField({ label, name, value = [], onChange, options = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null); 

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function updatePosition() {
      if (buttonRef.current && isOpen) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    }

    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      document.addEventListener('mousedown', handleClickOutside);
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleToggle = (optionValue) => {
    const currentValues = Array.isArray(value) ? value : [];
    let updated;

    if (currentValues.includes(optionValue)) {
      updated = currentValues.filter((v) => v !== optionValue);
    } else {
      updated = [...currentValues, optionValue];
    }

    onChange({
      target: {
        name,
        value: updated,
      },
    });
  };

  const getDisplayText = () => {
    if (!value || value.length === 0) return 'Select positions...';
    
    if (value.length === 1) {
      const selected = options.find(opt => opt.value === value[0]);
      return selected ? selected.label : 'Select positions...';
    }
    
    return `${value.length} positions selected`;
  };

  return (
    <div className="flex flex-col w-full">
      <label className="relative py-2" htmlFor={name}>
        <span className="text-gray-700 font-medium">{label}</span>
      </label>

      <div className="relative">
        <button
          ref={buttonRef} // ADD THIS
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full border rounded-md p-2.5 px-3 bg-white text-left focus:outline-none transition-colors flex items-center justify-between ${
            isOpen ? 'border-teal-500' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <span className={value?.length > 0 ? 'text-gray-900 text-sm' : 'text-gray-400 text-sm'}>
            {getDisplayText()}
          </span>
          <MdExpandMore 
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {isOpen && createPortal(
          <div 
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: `${dropdownPosition.top + 4}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
            }}
            className="bg-white border border-gray-200 rounded-md shadow-md z-[9999] max-h-64 overflow-y-auto"
          >
            {options.map((option) => {
              const isSelected = value?.includes(option.value);
              
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleToggle(option.value)}
                  className={`w-full px-3 py-2 text-left text-sm flex items-center gap-3 transition-colors
                    ${isSelected ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-100 text-gray-700'}
                  `}
                >
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {isSelected && (
                      <MdCheck className="w-5 h-5 text-teal-600 font-bold" />
                    )}
                  </div>
                  <span className={isSelected ? 'font-medium' : ''}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}
function CheckboxField({ label, name, value = [], onChange, options = [] }) {
  const isSingleCheckbox = name === "current" || name === "expCurrent"; 
  
  const handleCheckboxChange = (optionValue, checked) => {
    if (isSingleCheckbox) {
      onChange({ target: { name, value: checked } });
    } else {
      let updatedValues = Array.isArray(value) ? [...value] : [];
      if (checked) {
        updatedValues.push(optionValue);
      } else {
        updatedValues = updatedValues.filter((v) => v !== optionValue);
      }
      onChange({ target: { name, value: updatedValues } });
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <Label className="relative py-2" htmlFor={name}>
        <span className="text-gray-700 font-medium">{label}</span>
      </Label>     
      <div className="flex flex-wrap gap-3 cursor-pointer">
        {options.map((opt) => {
          const optionValue = typeof opt === 'object' ? opt.value : opt;
          const optionLabel = typeof opt === 'object' ? opt.label : opt;
          const optionDescription = typeof opt === 'object' ? opt.description : '';
          
          const isChecked = isSingleCheckbox 
            ? value 
            : (Array.isArray(value) && value.includes(optionValue));
          
          return (
            <Label 
              key={optionValue} 
              className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-teal-600 has-[[aria-checked=true]]:bg-teal-50 cursor-pointer"
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={(checked) => handleCheckboxChange(optionValue, checked)}
                className="data-[state=checked]:border-teal-600 data-[state=checked]:bg-teal-600 data-[state=checked]:text-white"
              />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  {optionLabel}
                </p>
                {optionDescription && (
                  <p className="text-muted-foreground text-sm">
                    {optionDescription}
                  </p>
                )}
              </div>
            </Label>
          );
        })}
      </div>
    </div>
  );
}
function TextareaField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="relative py-2" htmlFor={name}>
        <span className="text-gray-700 font-medium w-[20%]">{label}</span>
      </label>
      <textarea
        className="border border-gray-200 rounded-md focus:ring-0 p-2 my-2 w-full"
        name={name}
        id={name}
       
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
function PhoneField({ label, name, value, onChange }) {
  return (
    
    <div className="flex flex-col w-full">
      <label className="relative py-2" htmlFor={name}>
        <span className="text-gray-700 font-medium w-[20%]">{label}</span>
      </label>
      <PhoneInput
        // className="border border-gray-300 rounded-md p-2.5 px-3 focus:outline-none focus:border-teal-500 transition-colors"
        name={name}
        id={name}
        defaultCountry="ng"
        placeholder={label}
        value={value}
                onChange={(phone) => onChange({ target: { name, value: phone } })} 
        inputClassName="border-gray-300 focus:border-teal-500"
    countrySelectorStyleProps={{
      buttonClassName: "border-gray-300"
    }}
    style={{
      '--react-international-phone-border-radius': '0.375rem',
      '--react-international-phone-border-color': '#d1d5db',
      '--react-international-phone-border-color-focus': '#14b8a6', 
    '--react-international-phone-box-shadow-focus': '0 0 0 1px #14b8a6',
      '--react-international-phone-background-color': '#ffffff',
      '--react-international-phone-text-color': '#111827',
      '--react-international-phone-selected-dropdown-item-background-color': '#f3f4f6',
      '--react-international-phone-country-selector-background-color-hover': '#f9fafb',
      '--react-international-phone-font-size': '14px',
      '--react-international-phone-height': '42px',
    }}
      />
    </div>
  );
}
function SliderField({ label, name, value, onChange, min, max, step, defaultValue = 20 }) {
  const numValue = value ? Number(value) : defaultValue;
  return(
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
      <label className="relative py-2" htmlFor={name}>
        <span className="text-gray-700 font-medium w-[20%]">
          {label}
        </span>
      </label>

          <div className="border rounded-md px-2 py-1 font-medium text-sm text-gray-500">
            {numValue}
          </div>
      </div>
      <div className="px-4">
      <Slider
        size="small"
        defaultValue={50}
        value={numValue}
        onChange={(event, newValue) => onChange({ target: { name, value: newValue } })}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        aria-label={label}
        color="success"
      />
      </div>
    </div>
  )
}
function LocationChange({ name, value, onChange, label }) {
  

  return (
    
    <div className="flex flex-col w-full">
      <label className="relative py-2" htmlFor={name}>
        <span className="text-gray-700 font-medium w-[20%]">
          {label}
        </span>
      </label>  
       <div className="">

          <PlacesAutocomplete
            onChange={(location) => onChange({ target: { name, value: location } })}
            className="border border-gray-300 rounded-md p-2.5 px-3 focus:outline-none focus:border-teal-500 transition-colors w-full"

          />
      
      </div>
        </div>
  
  );
}
function Nationality({ label, name, value, onChange }) {
    const [country, setCountry] = useState('');

  return (
    <div className="flex flex-col w-full">
      <label className="relative py-2" htmlFor={name}>
        <span className="text-gray-700 font-medium w-[20%]">{label}</span>
      </label>
     <CountryDropdown
          className="border border-gray-300 rounded-md py-[9px] px-2 pr-8 focus:outline-none focus:border-teal-500 transition-colors w-full appearance-none bg-white"
          name={name}
          value={value}
          onChange={(val) => onChange({ target: { name, value: val } })}
          defaultOptionLabel="Select Nationality"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
    </div>
  );
}
// function HeightField({ label, name, value, onChange, defaultValue = 150 }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const popupRef = useRef(null);
//   const inputRef = useRef(null);
  
//   const numValue = value ? Number(value) : defaultValue;

 
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (popupRef.current && !popupRef.current.contains(event.target) && 
//           inputRef.current && !inputRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     }

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//       return () => document.removeEventListener('mousedown', handleClickOutside);
//     }
//   }, [isOpen]);

//   const handleHeightChange = (newHeight) => {
//     onChange({ target: { name, value: newHeight } });
//   };

//   return (
//     <div className="flex flex-col w-full relative">
//       <label className="relative py-2" htmlFor={name}>
//         <span className="text-gray-700 font-medium">
//           {label}
//         </span>
//       </label>

     
//       <div
//         ref={inputRef}
//         onClick={() => setIsOpen(true)}
//         className="border border-gray-300 rounded-md p-2.5 px-3 focus:outline-none focus:border-teal-500 transition-colors w-full cursor-pointer bg-white"
//       >
//         <span className="text-gray-900">
//           {numValue} cm
//         </span>
//       </div>

   
//       {isOpen && (
//         <div 
//           ref={popupRef}
//           className="absolute left-1/2 -translate-x-1/2 bg-white border border-gray-300 rounded-md shadow-xl z-[9999] p-4 mt-2"
//         >
     
//           <div 
//             className="text-center mb-2 text-sm font-medium text-gray-700 cursor-pointer"
//             onClick={() => setIsOpen(false)}
//           >
//             {/* {numValue} cm */}Select Height
//           </div>
// <div className="length-picker-container border border-gray-300 rounded-md p-2 focus-within:border-teal-500" onClick={() => setIsOpen(false)}>

//           <LengthPicker
//             unit="metric"
//             length={numValue}
//             onLengthChange={handleHeightChange}
//             metricMin={79}
//             metricMax={400}
//             metricStep={1}
//             imperialMin={118}
//             imperialMax={157}
//             imperialStep={1}
//             containerHeight={150}
//             containerWidth={70}
//           />
// </div>
//         </div>
//       )}
//     </div>
//   );
// }
function HeightField({ label, name, value, onChange, defaultValue = 79 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unit, setUnit] = useState('cm'); // 'cm' or 'inches'
  const popupRef = useRef(null);
  const inputRef = useRef(null);
  
  const numValue = value ? Number(value) : defaultValue;

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleHeightChange = (newHeight) => {
    onChange({ target: { name, value: newHeight } });
  };

  // Generate height options (79cm to 400cm or 66lbs to 440lbs)
  const minHeight = 79;
  const maxHeight = 400;
  const heights = [];
  for (let i = minHeight; i <= maxHeight; i++) {
    heights.push(i);
    
  }

  return (
    <div className="flex flex-col w-full relative">
      <label className="relative py-2" htmlFor={name}>
        <span className="text-gray-700 font-medium">
          {label}
        </span>
      </label>

      <div
        ref={inputRef}
        onClick={() => setIsOpen(true)}
        className="border border-gray-300 rounded-md p-2.5 px-3 focus:outline-none focus:border-teal-500 transition-colors w-full cursor-pointer bg-white"
      >
        <span className="text-gray-900">
          {numValue} {unit}
        </span>
      </div>

      {isOpen && (
        <div 
          ref={popupRef}
          className="absolute left-1/2 -translate-x-1/2 bg-white border border-gray-300 rounded-md shadow-xl z-[9999] p-4 mt-2 w-64"
        >
          <div className="text-center mb-2 text-sm font-medium text-gray-700">
            Select Height
          </div>

          <div className="flex gap-2 mb-3 justify-center">
            <button
              type="button"
              onClick={() => setUnit('cm')}
              className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                unit === 'cm' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              cm
            </button>
            {/* <button
              type="button"
              onClick={() => setUnit('inches')}
              className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                unit === 'inches' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              inches
            </button> */}
          </div>

          <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md">
            {heights.map((height) => (
              <button
                key={height}
                type="button"
                onClick={() => {
                  handleHeightChange(height);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                  numValue === height ? 'bg-teal-50 text-teal-700 font-medium' : ''
                }`}
              >
                {height} {unit}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
function WeightField({ label, name, value, onChange, defaultValue = 70 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unit, setUnit] = useState('kg'); // 'kg' or 'lbs'
  const popupRef = useRef(null);
  const inputRef = useRef(null);
  
  const numValue = value ? Number(value) : defaultValue;

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleWeightChange = (newWeight) => {
    onChange({ target: { name, value: newWeight } });
  };

  // Generate weight options (30kg to 200kg or 66lbs to 440lbs)
  const minWeight = unit === 'kg' ? 30 : 66;
  const maxWeight = unit === 'kg' ? 200 : 440;
  const weights = [];
  for (let i = minWeight; i <= maxWeight; i++) {
    weights.push(i);
  }

  return (
    <div className="flex flex-col w-full relative">
      <label className="relative py-2" htmlFor={name}>
        <span className="text-gray-700 font-medium">
          {label}
        </span>
      </label>

      <div
        ref={inputRef}
        onClick={() => setIsOpen(true)}
        className="border border-gray-300 rounded-md p-2.5 px-3 focus:outline-none focus:border-teal-500 transition-colors w-full cursor-pointer bg-white"
      >
        <span className="text-gray-900">
          {numValue} {unit}
        </span>
      </div>

      {isOpen && (
        <div 
          ref={popupRef}
          className="absolute left-1/2 -translate-x-1/2 bg-white border border-gray-300 rounded-md shadow-xl z-[9999] p-4 mt-2 w-64"
        >
          <div className="text-center mb-2 text-sm font-medium text-gray-700">
            Select Weight
          </div>

          <div className="flex gap-2 mb-3 justify-center">
            <button
              type="button"
              onClick={() => setUnit('kg')}
              className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                unit === 'kg' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              kg
            </button>
            <button
              type="button"
              onClick={() => setUnit('lbs')}
              className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                unit === 'lbs' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              lbs
            </button>
          </div>

          <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md">
            {weights.map((weight) => (
              <button
                key={weight}
                type="button"
                onClick={() => {
                  handleWeightChange(weight);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                  numValue === weight ? 'bg-teal-50 text-teal-700 font-medium' : ''
                }`}
              >
                {weight} {unit}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CoreSkillField({ label, name, value, onChange }){
  const options = [
  { value: 'speed', label: 'Speed' },
{ value: 'agility', label: 'Agility' },
{ value: 'endurance', label: 'Endurance' },
{ value: 'strength', label: 'Strength' },
{ value: 'explosiveness', label: 'Explosiveness' },
{ value: 'balance_coordination', label: 'Balance & Coordination' },
{ value: 'reaction_time', label: 'Reaction Time' },

{ value: 'mental_toughness', label: 'Mental Toughness' },
{ value: 'discipline', label: 'Discipline' },
{ value: 'focus_concentration', label: 'Focus & Concentration' },
{ value: 'confidence', label: 'Confidence' },
{ value: 'resilience', label: 'Resilience' },
{ value: 'adaptability', label: 'Adaptability' },
{ value: 'determination', label: 'Determination' },

{ value: 'decision_making', label: 'Decision-Making' },
{ value: 'spatial_awareness', label: 'Spatial Awareness' },
{ value: 'anticipation', label: 'Anticipation' },
{ value: 'positioning', label: 'Positioning' },
{ value: 'timing', label: 'Timing' },
{ value: 'reading_the_game', label: 'Reading the Game' },
{ value: 'creativity_in_play', label: 'Creativity in Play' },

{ value: 'communication', label: 'Communication' },
{ value: 'leadership', label: 'Leadership' },
{ value: 'team_collaboration', label: 'Team Collaboration' },
{ value: 'coachability', label: 'Coachability' },
{ value: 'reliability', label: 'Reliability' },
{ value: 'work_ethic', label: 'Work Ethic' },
{ value: 'sportsmanship', label: 'Sportsmanship' },

{ value: 'accountability', label: 'Accountability' },
{ value: 'consistency', label: 'Consistency' },
{ value: 'self_discipline', label: 'Self-Discipline' },
{ value: 'time_management', label: 'Time Management' },
{ value: 'drive_for_improvement', label: 'Drive for Improvement' },
{ value: 'persistence', label: 'Persistence' },
{ value: 'positive_attitude', label: 'Positive Attitude' },

]
  const handleToggle = (val) => {
    let updated;

    if (value.includes(val)) {
      
      updated = value.filter((v) => v !== val);
    } else {
      
      updated = [...value, val];
    }

    onChange({
      target: {
        name,
        value: updated,
        
      },
    });
    useUserStore.getState().updateProfile({ [name]: updated });
  };


  return (
    <div className="flex flex-col w-full">
      <label className="relative py-2" htmlFor={name}>
        <span className="text-gray-700 font-medium w-[20%]">{label}</span>
      </label>

    <div className=" rounded-md focus:ring-0 w-full flex flex-wrap gap-3">
      {options.map((opt) => {
        const selected = value.includes(opt.value);

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleToggle(opt.value)}
            className={`px-4 py-1.5 rounded-md border transition 
              ${selected 
                ? "bg-teal-600 text-white border-teal-700" 
                : "bg-white text-gray-700 border-gray-300 hover:border-teal-500"}
            `}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
    </div>
  );
};
function TechnicalSkillField({ label, name, value, onChange }){
  const options = [
  { value: 'ball_control', label: 'Ball Control' },
{ value: 'first_touch', label: 'First Touch' },
{ value: 'close_control', label: 'Close Control / Tight-Space Handling' },
{ value: 'dribble_control', label: 'Dribble Control' },
{ value: 'change_of_direction_dribbling', label: 'Change-of-Direction Dribbling' },
{ value: 'weak_foot_handling', label: 'Weak-Foot / Weak-Hand Handling' },

{ value: 'short_pass_accuracy', label: 'Short Pass Accuracy' },
{ value: 'long_pass_accuracy', label: 'Long Pass Accuracy' },
{ value: 'quick_decision_passing', label: 'Quick-Decision Passing' },
{ value: 'creative_playmaking', label: 'Creative Playmaking' },
{ value: 'field_vision', label: 'Court Vision / Field Vision' },
{ value: 'through_ball_timing', label: 'Through-Ball / Lead-Pass Timing' },

{ value: 'finishing_accuracy', label: 'Finishing Accuracy' },
{ value: 'one_touch_finishing', label: 'One-Touch Finishing' },
{ value: 'long_range_shooting', label: 'Long-Range Shooting' },
{ value: 'pull_up_shooting', label: 'Pull-Up Shooting / Finishing at the Rim' },
{ value: 'catch_and_shoot', label: 'Catch-and-Shoot Accuracy' },
{ value: 'red_zone_efficiency', label: 'Red-Zone Efficiency' },

{ value: 'off_ball_movement', label: 'Off-Ball Movement' },
{ value: 'positioning_awareness', label: 'Positioning Awareness' },
{ value: 'movement_iq', label: 'Movement IQ' },
{ value: 'separation_ability', label: 'Separation Ability' },
{ value: 'route_running_precision', label: 'Route Running Precision' },

{ value: 'on_ball_defense', label: 'On-Ball Defense' },
{ value: 'defensive_positioning', label: 'Defensive Positioning' },
{ value: 'marking_coverage', label: 'Marking / Coverage Discipline' },
{ value: 'interception_timing', label: 'Interception Timing' },
{ value: 'tackling_technique', label: 'Tackling Technique' },
{ value: 'shot_contest_technique', label: 'Shot Contest Technique' },

{ value: 'ball_security', label: 'Ball Security' },
{ value: 'composure_under_pressure', label: 'Composure in Tight Situations' },
{ value: 'secure_catching', label: 'Secure Catching' },

{ value: 'aerial_control', label: 'Aerial Control' },
{ value: 'high_point_catching', label: 'High-Point Catching' },

{ value: 'set_piece_delivery', label: 'Free-Kick / Set-Piece Delivery' },

]
  const handleToggle = (val) => {
    let updated;

    if (value.includes(val)) {
      
      updated = value.filter((v) => v !== val);
    } else {
      
      updated = [...value, val];
    }

    onChange({
      target: {
        name,
        value: updated,
      },
    });
        useUserStore.getState().updateProfile({ [name]: updated });

  };

  return (
    <div className="flex flex-col w-full">
      <label className="relative py-2" htmlFor={name}>
        <span className="text-gray-700 font-medium w-[20%]">{label}</span>
      </label>

    <div className=" rounded-md focus:ring-0 w-full flex flex-wrap gap-3">
      {options.map((opt) => {
        const selected = value.includes(opt.value);

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleToggle(opt.value)}
            className={`px-4 py-1.5 rounded-md border transition 
              ${selected 
                ? "bg-teal-600 text-white border-teal-700" 
                : "bg-white text-gray-700 border-gray-300 hover:border-teal-500"}
            `}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
    </div>
  );
};
function MediaUploadField({ label, name, value, onChange, accept = "image/*,video/*" }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange({ target: { name, value: file } });
  };
  return (
    <div className="flex flex-col w-full">
      <label className="relative py-2" htmlFor={name}>
        <span className="text-gray-700 font-medium">
          {label}
        </span>
      </label>
      <div className="border rounded-md flex items-center justify-center">
        <div className="p-4 text-center text-gray-500">
          <IoCloudUploadOutline size={36} className="mx-auto mb-2" />
        <p className="font-medium text-md">Choose a file or drag & drop it here</p>
        <p className="text-sm text-gray-400 my-1">JPEG, PNG, PDF, AND MP4 formats, up to 50Mb</p>
        <div className="flex items-center justify-center my-2">
        
        <Label className="border border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-100 font-medium">

        <input
        type="file"
        id={name}
        name={name}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      /> Browse File
        </Label>
        </div>
        </div>

      </div>
    </div>
  );
}



