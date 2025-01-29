import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, Check } from 'lucide-react';

export interface SortOption {
  id: string;
  label: string;
  direction?: 'asc' | 'desc';
}

interface SortButtonProps {
  options: SortOption[];
  selectedOption?: SortOption;
  onSelect: (option: SortOption) => void;
  className?: string;
}

export const SortButton: React.FC<SortButtonProps> = ({
  options,
  selectedOption,
  onSelect,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: SortOption) => {
    const newDirection = option.id === selectedOption?.id && selectedOption.direction === 'asc' 
      ? 'desc' 
      : 'asc';
    
    onSelect({ ...option, direction: newDirection });
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={buttonRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#526D4E]/25 focus:border-[#526D4E]"
      >
        <ArrowUpDown className="w-4 h-4 mr-2" />
        <span className="text-gray-700">
          {selectedOption ? selectedOption.label : 'Sort'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 bg-white border rounded-lg shadow-lg min-w-[160px]">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span className="flex-1">{option.label}</span>
                {selectedOption?.id === option.id && (
                  <Check className="w-4 h-4 text-[#526D4E]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
