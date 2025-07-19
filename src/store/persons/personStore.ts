import { create } from 'zustand';
import { supabase } from "../../components/lib/supabaseClient"
import type { Person } from '../../types/types';

interface PersonState {
    persons: Person[];
    loading: boolean;
    error: string | null;
    loaded: boolean;
    getPersons: () => Promise<void>;
    addPerson: (person: Person) => void;
    updatePerson: (id: number, updates: Partial<Omit<Person, 'id' | 'created_at'>>) => Promise<void>;
    deletePerson: (id: number) => void;
}

export const usePersonStore = create<PersonState>((set, get) => ({
    persons: [],
    loading: true,
    error: null,
    loaded: false,

    getPersons: async () => {
        // Если данные уже загружены, пропускаем повторный запрос
        if (get().loaded) return;

        try {
            set({ loading: true, error: null });
            const { data, error } = await supabase
                .from('persons')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            set({
                persons: data as Person[],
                loaded: true // Устанавливаем флаг, что данные загружены
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
            console.error('Error fetching persons:', err);
            set({ error: errorMessage });
        } finally {
            set({ loading: false });
        }
    },

    addPerson: (person) => {
        set((state) => ({
            persons: [person, ...state.persons]
        }));
    },

    updatePerson: async (id, updates) => {
        try {
            set({ loading: true });
            const { data, error } = await supabase
                .from('persons')
                .update(updates)
                .eq('id', id)
                .select();

            if (error) throw error;

            set((state) => ({
                persons: state.persons.map((person) =>
                    person.id === id ? { ...person, ...data[0] } : person
                ),
            }));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
            console.error('Error updating person:', err);
            set({ error: errorMessage });
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    deletePerson: (id) => {
        set((state) => ({
            persons: state.persons.filter((person) => person.id !== id),
        }));
    },
}));