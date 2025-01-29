import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from './Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  showFilterButton?: boolean;
  onFilterClick?: () => void;
  className?: string;
  debounceMs?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search...',
  initialValue = '',
  showFilterButton = false,
  onFilterClick,
  className = '',
  debounceMs = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const debouncedSearch = useCallback(
    (value: string) => {
      const handler = setTimeout(() => {
        onSearch(value);
      }, debounceMs);

      return () => clearTimeout(handler);
    },
    [onSearch, debounceMs]
  );

  useEffect(() => {
    const cleanup = debouncedSearch(searchTerm);
    return cleanup;
  }, [searchTerm, debouncedSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#526D4E]/25 focus:border-[#526D4E]"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      {showFilterButton && (
        <Button
          variant="outline"
          size="medium"
          onClick={onFilterClick}
          className="whitespace-nowrap"
        >
          Filters
        </Button>
      )}
    </div>
  );
};
