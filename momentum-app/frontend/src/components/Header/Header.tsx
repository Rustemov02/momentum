import { Search } from "lucide-react";
import { Input } from "../Input/Input";
import type { Dispatch, SetStateAction } from "react";
import { UserProfile } from "../Profile/UserProfile";

const Header = ({
  searchQuery,
  setSearchQuery,
  tabTitle,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  tabTitle: string;
}) => {
  const userData = localStorage.getItem("cachedUser");
  return (
    <header className="shrink-0 px-6 lg:px-8 py-6 border-b border-gray-800/50 bg-gray-900/30 backdrop-blur-sm">
      {/* <div className="max-w-6xl mx-auto"> */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white ml-12 lg:ml-0">{tabTitle}</h2>
        {/* <div className="text-gray-400 text-sm">
                {filteredNotes.length}{" "}
                {filteredNotes.length === 1 ? "item" : "items"}
              </div> */}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search notes, tags, or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-gray-800/50 border border-gray-700/50 text-white placeholder:text-gray-500 
                          focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 focus:outline-none"
        />
      </div>
      {/* </div> */}

      <UserProfile user={JSON.parse(userData || "{}")} onLogout={() => {}} />
    </header>
  );
};

export default Header;
