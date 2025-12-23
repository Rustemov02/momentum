import { ChevronDown, Clock } from "lucide-react";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";

interface OptionType {
  value: string;
  label: string;
}
const Select: FC<{
  label?: string;
  options: OptionType[];
  value: string;
  setValue: Dispatch<SetStateAction<OptionType>>;
}> = ({ label, value, setValue, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {label && (
        <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <Clock className="w-4 h-4" />
          {label}
        </label>
      )}
      <div className="relative" onClick={() => setIsOpen(!isOpen)}>
        <div
          className="w-full px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-white rounded-lg 
               focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer
               hover:bg-gray-800/70 cursor-pointer flex items-center justify-between"
        >
          {value}
          <ChevronDown
            className={`transition-all duration-300 ${
              isOpen ? "scale-y-100" : ""
            }`}
          />
        </div>

        <div
          className={`absolute z-10 w-full border border-gray-700/50 rounded-lg overflow-hidden mt-1 transition-all duration-300 ${
            isOpen ? "max-h-auto" : "max-h-0 border-none"
          } `}
        >
          {options &&
            options?.map((option: OptionType) => (
              <option
                value={option.value}
                onClick={() => setValue(option)}
                className="bg-gray-900 p-1 cursor-pointer hover:bg-gray-500 text-white px-2"
              >
                {option.label}
              </option>
            ))}
        </div>
      </div>
      {/* <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-white rounded-lg 
               focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer
               hover:bg-gray-800/70 cursor-pointer"
      >
        {options &&
          options?.map((option: OptionType) => (
            <option value={option.value} className="bg-gray-900">
              {option.label}
            </option>
          ))}
      </select> */}
    </>
  );
};

export default Select;
