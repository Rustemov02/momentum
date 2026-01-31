import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

interface LayoutContextType {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <LayoutContext.Provider
      value={{
        isCreateDialogOpen,
        setIsCreateDialogOpen,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return context;
};
