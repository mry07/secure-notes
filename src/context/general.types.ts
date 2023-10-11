import { Dispatch, SetStateAction } from "react";

export interface Note {
  id: number;
  title: string;
  note: string;
}

export interface LoginParams {
  biometric?: boolean;
  password?: string;
}

export interface ContextProps {
  hasLogged: boolean;
  setHasLogged: Dispatch<SetStateAction<boolean>>;
  encryptionKey: string;
  setEncryptionKey: Dispatch<SetStateAction<string>>;
  login: ({ biometric, password }: LoginParams) => void;
  logout: () => void;
  getNotes: () => Promise<Note[]>;
  createNote: ({ id, title, note }: Note) => Promise<boolean>;
  getNoteById: (id: number) => Promise<Note>;
  updateNote: ({ id, title, note }: Note) => Promise<boolean>;
}
