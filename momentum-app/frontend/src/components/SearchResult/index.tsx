import { Search } from "lucide-react";

const SearchResult = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center ">
      <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-gray-600" />
      </div>
      <h3 className="text-gray-400 mb-2">
        {true ? "No results found" : `No notes yet`}
      </h3>
      <p className="text-gray-600 text-sm">
        {true
          ? "Try a different search term"
          : "Click the + button to create your first note"}
      </p>
    </div>
  );
};

export default SearchResult;
