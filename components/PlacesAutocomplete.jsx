import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export default function PlacesAutocomplete({ onChange }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      onChange?.(description);

      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("Coordinates:", lat, lng);
      });
    };

  return (
    <div className="absolute z-50 w-[85%] lg:w-[16%]">
      <input
        value={value}
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