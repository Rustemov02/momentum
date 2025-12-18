import { Plus } from "lucide-react";

const CreateNoteButton = ({
  onClick,
}: {
  onClick: (status: boolean) => void;
}) => {
  return (
    <button
      onClick={() => onClick(true)}
      className="fixed cursor-pointer bottom-6 right-6 w-14 h-14 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110 z-30"
    >
      <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
    </button>
  );
};

export default CreateNoteButton;
