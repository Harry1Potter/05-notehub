import type { Note } from "../../types/note";
import css from './NoteList.module.css'

interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
  onSelect: (note: Note) => void;
}

function NoteList({ notes, onDelete, onSelect }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((n) => (
        <li key={n.id} className={css.listlistItem}>
          <h2 className={css.title} onClick={() => onSelect(n)}>{n.title}</h2>
          <p className={css.content}>{n.content}</p>
          <div>
            <span>{n.tag}</span>
            <button className={css.button} onClick={() => onDelete(n.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
