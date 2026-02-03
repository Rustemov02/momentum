import React from "react";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu/dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-800/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50">
          <Avatar className="w-8 h-8 border border-gray-700">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-sm">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="text-gray-300 text-sm hidden sm:inline-block max-w-[120px] truncate">
            {user.name}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-gray-900 border-gray-800 text-white"
      >
        <DropdownMenuLabel className="text-gray-400">
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-white">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-800" />
        <DropdownMenuItem
          onClick={onLogout}
          className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
