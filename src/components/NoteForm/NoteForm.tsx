import { addNote } from "../../services/noteService";
import type { NewNodeData } from "../../types/note";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (fetchResponse: NewNodeData) => addNote(fetchResponse),
    onSuccess: () => {
      console.log("Note created!");
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      onClose(); // закриваємо форму після успіху
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // щоб не перезавантажувалася сторінка

    const formData = new FormData(event.currentTarget);

    mutate({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as string,
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <input id="title" type="text" name="title" className={css.input} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <textarea
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <select id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
  </div>

  <div className={css.actions}>
    <button type="button" onClick={onClose} disabled={isPending} className={css.cancelButton}>
      Cancel
    </button>
    <button type="submit" className={css.submitButton} disabled={isPending}
    >
      {isPending ? "Creating..." : "Create note"}
    </button>
  </div>
</form>
  );
}
