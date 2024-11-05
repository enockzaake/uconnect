"use client";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/queries/userQueries";
import { Loader } from "lucide-react";
import React from "react";

export default function Test() {
  const { isFetching, data } = useEvents();
  return (
    <div className="flex flex-col gap-2 items-center  h-screen">
      <Button>Get data</Button>
      {isFetching ? (
        <Loader className="animate-spin" />
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

// export default function CountrySearchDropdown() {
//   const [search, setSearch] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   const filteredCountries = countries.filter((country) =>
//     country.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleSelectCountry = (country: { code: string; name: string }) => {
//     setSelectedCountry(country.name);
//     setSearch(country.name);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative max-w-md mx-auto">
//       <label
//         htmlFor="country-search"
//         className="block text-sm font-medium text-gray-700 mb-1"
//       >
//         Search and select a country
//       </label>
//       <div className="relative">
//         <input
//           type="text"
//           id="country-search"
//           className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Type to search..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setIsOpen(true);
//           }}
//           onFocus={() => setIsOpen(true)}
//         />
//         <button
//           type="button"
//           className="absolute inset-y-0 right-0 flex items-center px-2"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <svg
//             className="w-5 h-5 text-gray-400"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414  0l-4-4a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </button>
//       </div>
//       {isOpen && (
//         <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
//           {filteredCountries.map((country) => (
//             <li
//               key={country.code}
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleSelectCountry(country)}
//             >
//               {country.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
