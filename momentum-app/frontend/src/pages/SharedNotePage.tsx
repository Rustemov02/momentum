import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function SharedNotePage() {
  const { token } = useParams<{ token: string }>();
  const [note, setNote] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/share/${token}`)
      .then((res) => res.json())
      .then(setNote)
      .catch(() => setNote(null));
  }, [token]);

  if (!note) return <p>Note not found or expired</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}
