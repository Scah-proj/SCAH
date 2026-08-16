import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

// Turns Google's address_components into the {country, state, city} shape
// the backend's location schema actually expects — same parsing logic
// already used in the onboarding form's geolocation handler, so a saved
// residence looks the same whether it came from onboarding or a later edit.
function parseAddressComponents(components) {
  let city = "";
  let state = "";
  let country = "";

  components.forEach((component) => {
    if (component.types.includes("locality")) {
      city = component.long_name;
    }
    if (component.types.includes("administrative_area_level_1")) {
      state = component.long_name;
    }
    if (component.types.includes("country")) {
      country = component.long_name;
    }
  });

  return { city, state, country };
}

export default function PlacesAutocomplete({ onChange, value }) {
  // `value` is the existing residence — either the raw {country, state,
  // city} object from the profile, or a pre-formatted display string.
  // use-places-autocomplete only accepts a plain string via its
  // `defaultValue` init option (and only reads it once, on mount), so we
  // build that string here before the hook initializes.
  const initialDisplayValue =
    value && typeof value === "object"
      ? [value.city, value.state, value.country].filter(Boolean).join(", ")
      : value || "";

  const {
    ready,
    value: inputValue,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    defaultValue: initialDisplayValue,
  });

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results) => {
        const location = parseAddressComponents(results[0].address_components);
        onChange?.(location);
      });
    };

  return (
    <div className="absolute z-50 w-[85%] lg:w-[16%]">
      <input
        value={inputValue}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Enter your location"
        className="w-full p-2 border border-gray-200 rounded-md focus:ring-0 focus:border-teal-500 outline-none"
      />

      {status === "OK" && (
        <ul className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {data.map((item) => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = item;

            return (
              <li
                key={place_id}
                onClick={handleSelect(item)}
                className="p-3 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <strong className="text-gray-900">{main_text}</strong>
                <br />
                <small className="text-gray-500">{secondary_text}</small>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}