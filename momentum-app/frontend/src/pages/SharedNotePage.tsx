import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";
import { NoteDetailDialog } from "@/components/Dialogs/NoteDetailDialog";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";
import { Button } from "@/components/Button/Button";
export default function SharedNotePage() {
  const { token } = useParams<{ token: string }>();
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getNoteDetails = async () => {
      try {
        const res = await apiRequest(`/tasks/share/${token}`);

        setNote(res);
        console.log(res);
      } catch (err) {
        setNote(null);
        console.log("request error : ", err);
      } finally {
        setLoading(false);
      }
    };

    getNoteDetails();
  }, [token]);
  const navigate = useNavigate();
  return (
    <div className="h-dvh flex items-center justify-center ">
      {loading && <Loader />}
      {!note && !loading && (
        <div className="bg-gray-900 border-gray-800 text-white w-[calc(100%-2rem)] max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          >
            <div className="w-11/12 sm:w-[30%] h-auto py-10 px-2 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl sm:rounded-2xl shadow-2xl shadow-cyan-500/10 flex flex-col gap-16 items-center justify-center text-xl pointer-events-auto animate-in zoom-in-95 duration-200">
              <p className="text-center"> Note not found or expired</p>
              <Button
                className="text-white bg-gray-800 cursor-pointer h-10 px-2 sm:px-4"
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/notes`)}
              >
                Go to Momentum
              </Button>
            </div>
          </motion.div>
        </div>
      )}
      <NoteDetailDialog isPublic={true} isOpen={true} note={note || null} />
    </div>
  );
}
