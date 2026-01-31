// src/components/Select/Select.tsx
import { ChevronDown, Clock } from "lucide-react";
import { useState, type FC } from "react";

interface OptionType {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: OptionType[];
  value: OptionType;
  setValue: (option: OptionType) => void;
}

const Select: FC<SelectProps> = ({ label, value, setValue, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: OptionType) => {
    setValue(option);
    setIsOpen(false);
  };

  return (
    <>
      {label && (
        <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <Clock className="w-4 h-4" />
          {label}
        </label>
      )}

      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-white rounded-lg 
                     focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer
                     hover:bg-gray-800/70 flex items-center justify-between"
        >
          {value.label}
          <ChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full border border-gray-700/50 rounded-lg overflow-hidden mt-1">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`p-1 px-2 cursor-pointer text-white transition-colors
                  ${
                    value.value === option.value
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "bg-gray-900 hover:bg-gray-700"
                  }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Select;
