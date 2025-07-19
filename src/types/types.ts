export type TCurrentWidget = 'mainTable' | 'personals' | 'templates' | 'messages';
export type TCurrentPVZ = 'PVZ1' | 'PVZ2' | 'PVZ3';

export type Employee = {
  id: number;
  fullName: string;
  photoUrl: string;
  phone: string;
  telegram: string;
  birthDate: string;
  hireDate: string;
  color: string;
};
export type Person = {
  id: number;
  fullname: string;
  phone: string;
  telegram: string;
  birthdate: string;
  hiredate: string;
  color: string;
  photourl: string | null;
  created_at: string;
};
export interface FormData extends Omit<Person, 'id' | 'created_at' | 'photourl'> {
  photofile?: File | null;
}

export type TTime =
  | '09:00'
  | '10:00'
  | '11:00'
  | '12:00'
  | '13:00'
  | '14:00'
  | '15:00'
  | '16:00'
  | '17:00'
  | '18:00'
  | '19:00'
  | '20:00'
  | '21:00';

export type TTemplates = {
  id: number;
  namePerson: string;
  startTime: TTime;
  endTime: TTime;
  currentRate: number;
  color: string;
};
