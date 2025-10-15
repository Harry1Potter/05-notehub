import { useState } from "react";
import css from "./SearchBox.module.css"

interface SearchBoxProps {
  onSubmit: (topic: string) => void;
}

export default function SearchBox({ onSubmit }: SearchBoxProps) {
  const [topic, setTopic] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTopic(value);
    onSubmit(value);
  };

  return (
    <input
      type="text"
      className={css.input}
      name="topic"
      placeholder="Search notes..."
      value={topic}
      onChange={handleChange}
    />
  );
}