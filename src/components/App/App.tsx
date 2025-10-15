import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { fetchNotes } from "../../services/noteService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import type { Note } from "../../types/note";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css"

export default function App() {
  const [topic, setTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<{ notes: Note[]; totalPages: number }, Error>({
    queryKey: ["notes", topic, currentPage],
    queryFn: ({ queryKey }) => {
      const [, search, page] = queryKey;
      return fetchNotes(search as string, page as number);
    },
    placeholderData: keepPreviousData,
  });

  const handleSearch = (newTopic: string) => {
    setTopic(newTopic);
    setCurrentPage(1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSubmit={handleSearch} />
        <Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages ?? 0}
          onPageChange={setCurrentPage}
        />
        <button className={css.button} type="button" onClick={openModal}>
          Create Note
        </button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong!</p>}
      {data && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}