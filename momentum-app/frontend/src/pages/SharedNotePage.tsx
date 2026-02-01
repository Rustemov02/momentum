import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";
import { NoteDetailDialog } from "@/components/Dialogs/NoteDetailDialog";

export default function SharedNotePage() {
  const { token } = useParams<{ token: string }>();
  const [note, setNote] = useState<any>(null);

  useEffect(() => {
    const getNoteDetails = async () => {
      try {
        const res = await apiRequest(`/tasks/share/${token}`);

        setNote(res);
        console.log(res);
      } catch (err) {
        setNote(null);
      }
    };

    getNoteDetails();
  }, [token]);

  if (!note) return <p>Note not found or expired</p>;

  return (
    <div>
      <NoteDetailDialog isPublic={true} isOpen={note} note={note || null} />
    </div>
  );
}
