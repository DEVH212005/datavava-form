import { create } from "zustand";

export interface Patient {
  id: string;
  patient_name: string;
  age: string;
  country: string;
  phone_number: string;
  gender: boolean;
}

interface PatientStore {
  patients: Patient[];
  addPatient: (p: Omit<Patient, "id">) => void;
  updatePatient: (p: Patient) => void;
  deletePatient: (id: string) => void;
  setPatients: (list: Partial<Patient>[]) => void;
  getPatientsWithoutId: () => Omit<Patient, "id">[]; // 👈 thêm mới
}

export const usePatientStore = create<PatientStore>((set, get) => ({
  patients: [
    {
      id: "1",
      patient_name: "Alice",
      age: "25",
      country: "VN",
      phone_number: "0901112233",
      gender: true,
    },
  ],

  addPatient: (p) =>
    set((state) => ({
      patients: [...state.patients, { ...p, id: crypto.randomUUID() }],
    })),

  updatePatient: (updated) =>
    set((state) => ({
      patients: state.patients.map((p) => (p.id === updated.id ? updated : p)),
    })),

  deletePatient: (id) =>
    set((state) => ({
      patients: state.patients.filter((p) => p.id !== id),
    })),

  setPatients: (list) =>
    set(() => ({
      patients: list.map((p) => ({
        id: p.id || crypto.randomUUID(),
        patient_name: p.patient_name || "",
        age: p.age || "",
        country: p.country || "",
        phone_number: p.phone_number || "",
        gender: p.gender ?? true,
      })),
    })),

  // 👇 Getter để lấy danh sách không có id
  getPatientsWithoutId: () => {
    const patients = get().patients;
    return patients.map(({ id, ...rest }) => rest);
  },
}));
