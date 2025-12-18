import { NoteCard, type Note } from "@/components/NoteCard";

const Notes = ({
  data,
  onClick,
}: {
  data: Note[];
  onClick: (note: Note) => void;
}) => {
  console.log("data : ", data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onClick={handleNoteClick}
                  />
                ))} */}
      {data.map((task) => (
        <NoteCard key={task._id} note={task} onClick={() => onClick(task)} />
      ))}
    </div>
  );
};

export default Notes;
