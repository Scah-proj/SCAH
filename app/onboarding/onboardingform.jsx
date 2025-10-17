'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeftIcon } from 'lucide-react'
import * as React from 'react'
import { create } from 'zustand'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Country, State, City } from 'country-state-city'
import { positionsBySport } from './page'
import Link from 'next/link'
import { useState } from 'react'
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

const useFormStore = create((set) => ({
  currentStep: 0,
  selections: {},
  setStep: (step) => set({ currentStep: step }),
  setSelection: (key, selection) =>
    set((state) => ({
      selections: { ...state.selections, [key]: selection }
    })),
  reset: () => set({ currentStep: 0, selections: {} }),
}))

const OptionCard = React.forwardRef(({ title, description, icon: Icon, selected, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-teal-50',
        selected && 'border-teal-500 bg-teal-50 ring-2 ring-teal-200'
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0">
        <div className={cn(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center',
          selected ? 'border-teal-500' : 'border-gray-300'
        )}>
          {selected && <div className="w-2 h-2 rounded-full bg-teal-500" />}
        </div>
      </div>

      {Icon && <Icon className={cn('h-5 w-5', selected ? 'text-teal-600' : 'text-gray-600')} />}

      <div className="flex-1">
        <h3 className={cn('font-medium', selected ? 'text-teal-900' : 'text-gray-900')}>{title}</h3>
        {description && (
          <p className={cn('text-sm mt-1', selected ? 'text-teal-600' : 'text-gray-500')}>{description}</p>
        )}
      </div>
    </div>
  )
})
OptionCard.displayName = 'OptionCard'

const FormCard = React.forwardRef(({ options}, ref) => {

  
  const currentStep = useFormStore((state) => state.currentStep)
  const selections = useFormStore((state) => state.selections)
  const setSelection = useFormStore((state) => state.setSelection)
  const userType = selections[0];
  const [showManualLocation, setShowManualLocation] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")


  const handleSelection = (option) => {

    if (option.id === "current-location") {
  if (!navigator.geolocation) return alert("Geolocation not supported")

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    try{
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      const res = await fetch(url)
      const data = await res.json()

      if (data.status === "OK" && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            
            let state = "";
            let country = "";
            
            addressComponents.forEach(component => {
              if (component.types.includes("administrative_area_level_1")) {
                state = component.long_name;
              }
              if (component.types.includes("country")) {
                country = component.long_name;
              }
            });
            
            const locationString = `${state}, ${country}`;
            console.log("Resolved location:", locationString);
            setSelection(currentStep, locationString);
          } else {
            console.error("Geocoding failed:", data);
            alert("Could not get address");
          }
    }
    
    catch (err) {
      console.error("Error fetching address:", err);
      alert("Could not get address");
    }
  }, () => {
    alert("Could not get location");
  })

  return;
}

    // Toggle selection for regular options
    const currentSelection = selections[currentStep]
    const newValue = (currentSelection === option.id) ? null : option.id
    setSelection(currentStep, newValue)
  }
  const handleManualLocationSubmit = () => {
  if (selectedCountry && selectedState && selectedCity) {
    const countryName = Country.getCountryByCode(selectedCountry)?.name || selectedCountry
    const stateName = State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name || selectedState
    
    const manualAddress = `${selectedCity}, ${stateName}, ${countryName}`
    setSelection(currentStep, manualAddress)
    setShowManualLocation(false)
  }
}

 const filteredOptions = options.filter(
  (opt) => !(opt.id === "position" && userType === "scout")
)

  const isMultiDropdownStep = filteredOptions && filteredOptions.length > 0 && filteredOptions[0].options !== undefined
  const hasLocationOption = filteredOptions.some(opt => opt.id === "current-location")
  const locationIsSet = hasLocationOption && selections[currentStep] && typeof selections[currentStep] === 'string'

  return (
    <div ref={ref} className="space-y-4 max-w-md mx-auto">
      {isMultiDropdownStep
        ? filteredOptions.map((dropdown) => (
            <div key={dropdown.id} className="flex flex-col space-y-2">
              <label htmlFor={`${currentStep}-${dropdown.id}`} className="text-sm font-medium text-gray-700">
                {dropdown.title}
              </label>

             {dropdown.id === "Date of Birth" ? (
  <DatePicker
    selected={
      selections[`${currentStep}-${dropdown.id}`]
        ? new Date(selections[`${currentStep}-${dropdown.id}`])
        : null
    }
    onChange={(date) =>
      setSelection(
        `${currentStep}-${dropdown.id}`,
        date?.toISOString().split("T")[0]
      )
    }
    dateFormat="yyyy-MM-dd"
    placeholderText="Select your date of birth"
    className="w-full border rounded-lg p-3"
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
  />
) : dropdown.id === "position" ? (
  <select
    value={selections[`${currentStep}-position`] || ""}
    onChange={(e) =>{
          console.log("Saving sport to key:", `${currentStep}-${dropdown.id}`, "with value:", e.target.value);

      setSelection(`${currentStep}-${dropdown.id}`, e.target.value)
    }}
    className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-400 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
  >
    <option  className="text-gray-900 py-2" value="">Select position...</option>
    {(() => {
      const positions = positionsBySport[selections[`${currentStep}-sports`]] || []
      const selectedSport = selections[`${currentStep}-sports`]
      const displayPositions = selectedSport === "football" ? positions.slice(0, 3) : positions
      
      return displayPositions.map((pos) => (
        <option key={pos.id} value={pos.id}>
          {pos.title}
        </option>
      ))
    })()}
  </select>

   
  
) : (
  
  <select
    value={selections[`${currentStep}-${dropdown.id}`] || ""}
    onChange={(e) =>
      setSelection(`${currentStep}-${dropdown.id}`, e.target.value)
    }
   className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-400 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
  >
    <option className="text-gray-900 py-2" value="">Select...</option>
    {dropdown.options.map((opt) => (
      <option key={opt.id} value={opt.id}>
        {opt.title}
      </option>
    ))}
  </select>
  


    // <Menu as="div" className="relative inline-block">
    //   <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
    //     Select...
    //     <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
    //   </MenuButton>

    //   <MenuItems
    //     transition
    //     className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
    //   >
    //     <div className="py-1">
    //       <MenuItem>
    //         <a
    //           href="#"
    //           className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
    //         >
    //           Account settings
    //         </a>
    //       </MenuItem>
    //       <MenuItem>
    //         <a
    //           href="#"
    //           className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
    //         >
    //           Support
    //         </a>
    //       </MenuItem>
    //       <MenuItem>
    //         <a
    //           href="#"
    //           className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
    //         >
    //           License
    //         </a>
    //       </MenuItem>
    //       <form action="#" method="POST">
    //         <MenuItem>
    //           <button
    //             type="submit"
    //             className="block w-full px-4 py-2 text-left text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
    //           >
    //             Sign out
    //           </button>
    //         </MenuItem>
    //       </form>
    //     </div>
    //   </MenuItems>
    // </Menu>
  

)}
            </div>
          ))
        : filteredOptions.map((option) => (
            <OptionCard
              key={option.id}
              title={selections[currentStep] && option.id === "current-location" ? selections[currentStep] : option.title}
              description={option.description}
              icon={option.icon}
              selected={selections[currentStep] === option.id}
              onClick={() => handleSelection(option)}
            />
          ))}
          {locationIsSet && !showManualLocation && (
        <div className="flex justify-end mt-2">
          <Button
            variant="outline"
            onClick={() => setShowManualLocation(true)}
            className="text-teal-600 border-teal-600 hover:bg-teal-50"
          >
            Change Location
          </Button>
        </div>
      )}
      {showManualLocation && (
        <div className="flex flex-col gap-4 p-6 bg-teal-50 rounded-2xl border border-teal-200 mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-teal-900">Select Location Manually</h3>
            <button
              onClick={() => setShowManualLocation(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          {/* Country Dropdown */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              id="country"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedState("");
                setSelectedCity("");
              }}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-400 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* State Dropdown */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              id="state"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity("");
              }}
              disabled={!selectedCountry}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-400 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="">Select State</option>
              {selectedCountry && State.getStatesOfCountry(selectedCountry).map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* City Dropdown */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-400 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="">Select City</option>
              {selectedCountry && selectedState && City.getCitiesOfState(selectedCountry, selectedState).map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Submit Button */}
          <Button
            onClick={handleManualLocationSubmit}
            disabled={!selectedCountry || !selectedState || !selectedCity}
            className="bg-teal-600 hover:bg-teal-700 text-white w-full mt-2"
          >
            Set Location
          </Button>
        </div>
      )}
    </div>
  )
})
FormCard.displayName = 'FormCard'





const MultiStepForm = React.forwardRef(({ title, formSteps, onComplete, onSkip, userType, positionsBySport, className, ...otherProps }, ref) => {
  const { currentStep, setStep, selections } = useFormStore()
  const [isCompleting, setIsCompleting] = React.useState(false)


  const selectedUserType = selections[0];

  if (!formSteps || formSteps.length === 0) {
    return <p className="text-gray-500 p-8">No form steps available.</p>
  }

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      
      if (formSteps[prevStep]?.id === "step-5" && selectedUserType === "scout") {
        setStep(prevStep - 1) // Jump to step 4 instead
      } else {
        setStep(prevStep)
      }
    }
  }

  const handleContinue = async () => {

    const isScoutLastStep = currentStepData?.id === "step-4" && selectedUserType === "scout"

    if (currentStep < formSteps.length - 1 && !isScoutLastStep) {
      setStep(currentStep + 1)
    } else {
      setIsCompleting(true)
      try {
        await onComplete(selections)
      } catch (error) {
        console.error(error)
        setIsCompleting(false)
      }
    }
  }

  const currentStepData = formSteps[currentStep]
  const isLastStep = currentStep === formSteps.length - 1

  // ---------- Fixed validation logic ----------
  let hasSelection = false
  console.log(
    "Step:", currentStep,
    "Items:", currentStepData?.items?.map(i => i.id),
    "Selections:", selections,
    "UserType:", selectedUserType
  );
  
  if (currentStepData?.items && currentStepData.items.length > 0) {
    // Filter items the same way FormCard does
    const filteredItems = currentStepData.items.filter(
      (item) => !(item.id === "position" && selectedUserType === "scout")
    )
    
    const isMultiDropdownStep = filteredItems.length > 0 && filteredItems[0].options !== undefined
    
    if (isMultiDropdownStep) {
      // Multi-dropdown step - check all dropdown selections for filtered items only
      hasSelection = filteredItems.every((item) => {
        const key = `${currentStep}-${item.id}`
        const val = selections[key]
        return val !== undefined && val !== null && val !== ""
      })
    } else {
      // Simple OptionCard step - check single selection
      const val = selections[currentStep]
      hasSelection = val !== undefined && val !== null && val !== ""
    }
  }

  return (
    <div
      ref={ref}
      className={cn('flex flex-col items-center', className)}
      {...otherProps}
    >
      <div className="w-full max-w-5xl p-2 min-h-screen h-screen">
        <Card className="w-full mx-auto p-6 shadow-lg p-2 md:p-6 h-full">
          <div className="mb-8 p-4 md:p-0">
            <div className="flex items-center justify-between mb-4">
              <div className="w-20">
                {currentStep > 0 ? (
                  <Button
                    variant="link"
                    onClick={handleBack}
                    className="mr-4 p-0"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                    Back
                  </Button>
                ) : (
                  <div className="invisible">
                    <Button variant="link" className="mr-4 p-0">
                      <ChevronLeftIcon className="h-5 w-5" />
                      Back
                    </Button>
                  </div>
                )}
              </div>
              {title && <div className="flex items-center">{title}</div>}
              <div className="w-20 flex justify-end">
                {currentStep > 1 && (
                  <Link href="/userfeed/feed">
                    <Button
                      variant="link"
                      onClick={onSkip}
                      className="text-sm text-muted-foreground hover:text-foreground p-0"
                    >
                      Skip
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <Progress
              value={((currentStep + 1) / formSteps.length) * 100}
              className="h-2 bg-gray-200 [&>div]:bg-teal-400"
            />
            <div className="mt-4 text-center">
              <h1 className="text-2xl font-semibold mb-2">
                {currentStepData?.id === "step-3" && selectedUserType === "scout"
                  ? "Where are you scouting from?"
                  : currentStepData?.id === "step-4" && selectedUserType === "scout"
                  ? "What level of athletes are you interested in?"
                  : currentStepData?.title}
              </h1>
              {currentStepData?.description && (
                <p className="text-sm text-muted-foreground mx-auto max-w-md">
                  {currentStepData.description}
                </p>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.15 }}
            >
             <FormCard options={currentStepData?.items || []} userType={userType} />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-end mt-8">
            <Button 
              onClick={handleContinue} 
              disabled={!hasSelection || isCompleting}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isCompleting ? 'Processing...' : (isLastStep ? 'Complete' : 'Continue')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
})
MultiStepForm.displayName = 'MultiStepForm'

export default MultiStepForm;