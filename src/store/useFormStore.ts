import { create } from "zustand";
import type { FormInstance } from "antd";

interface FormStore {
  form: FormInstance | null;
  setForm: (form: FormInstance | null) => void;
  getForm: () => FormInstance | null;
}

export const useFormStore = create<FormStore>((set, get) => ({
  form: null,
  setForm: (form) => set({ form }),
  getForm: () => get().form,
}));
