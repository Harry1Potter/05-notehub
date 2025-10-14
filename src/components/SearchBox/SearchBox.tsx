import type { ChangeEvent } from "react";
import css from './SearchBox.module.css'

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
}

function SearchBox ({value, onChange}: SearchBoxProps) {
    const handle = (e: ChangeEvent<HTMLInputElement>) => onChange (e.target.value);

  return (
    <input className={css.input} type="text" placeholder="Search" value={value} onChange={handle} />
  )
}

export default SearchBox