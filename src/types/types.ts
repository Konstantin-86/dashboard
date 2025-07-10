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
