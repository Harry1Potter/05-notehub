import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import { deleteNote } from "../../services/noteService";
import css from "./NoteList.module.css"

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {

  const queryClient = useQueryClient();
  
  const { mutate: deleteMutate, isPending: deleting } = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
    onError: (err) => console.error("Error deleting note:", err),
  });

  if (!notes || notes.length === 0) {
    return <p>No notes yet...</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>
          <small className={css.tag}>{note.tag}</small>
          <button className={css.button} onClick={() => deleteMutate(note.id)} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
}