import axios from 'axios';
import { URLPersons } from "../../variables";
import type {PersonsStore, Person, SetState} from "./types"

export const fetchPersons = async (set: SetState<PersonsStore>) => {
  set({ loading: true, error: null });
  try {
    const response = await axios.get<Person[]>(URLPersons);
    set({ data: response.data, loading: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    set({ loading: false, error: message });
    console.error('Fetch persons error:', message);
  }
};