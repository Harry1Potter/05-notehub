import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import type { Note } from "../../types/note";
import Loader from "../Loader/Loader";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Error from "../Error/Error";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import css from './App.module.css'

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false); // 👈 стан для модального вікна

  const queryClient = useQueryClient();

  // Отримуємо нотатки
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { page, search }],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
  });

  // Мутації
  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      closeModal(); // 👈 закриваємо модал після створення
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteNote(String(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  // Обробники
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleSelect = (note: Note) => {
    alert(`Selected note: ${note.title}`);
  };

  const handleCreate = (values: {
    title: string;
    content: string;
    tag: Note["tag"];
  }) => {
    createMutation.mutate(values);
  };

  // 👇 відкриття / закриття модалки
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Рендер
  if (isLoading) return <Loader />;
  if (isError || !data) return <Error />;

  return (
    <div style={{ padding: "20px" }}>
      <h1>NoteHub</h1>

      <SearchBox value={search} onChange={handleSearch} />
      <button onClick={openModal}>+ Add Note</button>

      <NoteList notes={data.notes} onDelete={handleDelete} onSelect={handleSelect} />

      <Pagination page={page} pageCount={data.totalPages} onPageChange={setPage} />

      {/* 👇 Ось модал */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSubmit={handleCreate} onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;