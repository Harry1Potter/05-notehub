import { useState, type FormEvent } from "react";
import type { Note } from "../../types/note";
import css from './NoteForm.module.css'

interface NoteFormProps {
  onSubmit: (values: { title: string; content: string; tag: Note["tag"] }) => void;
  onCancel: () => void;
}

function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<Note["tag"]>("Todo");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title, content, tag });
    setTitle("");
    setContent("");
    setTag("Todo");
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={css.input}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={css.textarea}
        required
      />
      <select value={tag} className={css.select} onChange={(e) => setTag(e.target.value as Note["tag"])}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      <button type="button" onClick={onCancel}>Cancel</button>
      <button type="submit" className={css.submitButton}>Create Note</button>
    </form>
  );
}

export default NoteForm;
