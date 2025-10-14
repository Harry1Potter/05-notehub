import axios from 'axios';
import type { FetchNotesResponse, Note } from '../types/note';

const API_BASE = 'https://notehub-public.goit.study/api'

function getAuthHeader() {
    const token = import.meta.env.VITE_NOTEHUB_TOKEN as string | undefined;
    return { Authorization: `Bearer ${token}`};
}

export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
}

export async function fetchNotes({ page = 1, perPage = 12, search = ''}: FetchNotesParams): Promise<FetchNotesResponse> {
    const res = await axios.get<FetchNotesResponse>(`${API_BASE}/notes`, {
        params: { page, perPage, search},
        headers: getAuthHeader(),
    });
    return res.data;
}

export async function createNote(payload: { title:string, content: string, tag: Note['tag'] }): Promise<Note> {
    const res = await axios.post<Note>(`${API_BASE}/notes`, payload, {
        headers: getAuthHeader(),
    });
    return res.data;
}

export async function deleteNote(id: string): Promise<{id: number}> {
    const res = await axios.delete(`${API_BASE}/notes/${id}`, {
        headers: getAuthHeader(),
    });
    return res.data;
}