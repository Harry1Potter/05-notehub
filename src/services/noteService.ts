import axios from "axios";
import type { NewNodeData, Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

function getAuthHeader() {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const fetchNotes = async (search = "", page = 1, perPage = 10) => {
  const res = await axios.get("/notes", {
    headers: getAuthHeader(),
    params: {
      search,
      page,
      perPage,
    },
  });

  // API повертає { notes: [...], totalPages: number }
  return res.data;
};

export const addNote = async (fetchResponse: NewNodeData) => {
  const res = await axios.post<Note>("/notes", fetchResponse, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const deleteNote = async (noteId: number) => {
  const res = await axios.delete(`/notes/${noteId}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};