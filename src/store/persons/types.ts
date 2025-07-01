export type Person = {
  id: number;
  idPerson: number;
  namePerson: string;
  startTime: string;
  endTime: string;
  currentRate: number;
  color: string;
};

export type PersonsState = {
  data: Person[];
  loading: boolean;
  error: string | null;
};

export type PersonsActions = {
  fetchPersons: () => Promise<void>;
};

export type SetState<T> = (state: Partial<T> | ((prev: T) => Partial<T>)) => void;

export type PersonsStore = PersonsState & PersonsActions;