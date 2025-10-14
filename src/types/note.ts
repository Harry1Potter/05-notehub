
export interface Note {
      "id": number,
      "title": string,
      "content": string,
      "createdAt": string,
      "updatedAt": string,
      "tag": 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
    }

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalNotes: number;
  totalPages: number;
}