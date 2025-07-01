import { create } from 'zustand';
import { fetchPersons } from './actions';
import type { PersonsStore, PersonsState } from "./types";

const initialState: PersonsState = {
  data: [],
  loading: false,
  error: null
};

const usePersonsStore = create<PersonsStore>((set) => ({
  ...initialState,
  fetchPersons: () => fetchPersons(set),
}));

export default usePersonsStore;