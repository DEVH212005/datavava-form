import { create } from "zustand";
import {
  IDataTable,
  IOrgData,
  IOrgDataClaimInput,
  IOrgDataInput,
  OrgDataInitial,
} from "../interfaces";

interface FormState {
  disabled: boolean;
  initialData: IOrgDataInput | undefined;
  orgData: IOrgData;
  dataTable: IDataTable[];
  claimData: IOrgDataClaimInput | undefined;
  orgDataClaim: IOrgData;
  orgDataInitial: OrgDataInitial | null;
  setDisabled: (disabled: boolean) => void;
  setInitialData: (initialData: IOrgDataInput) => void;
  setOrgData: (orgData: IOrgData) => void;
  setOrgDataClaim: (orgDataClaim: IOrgData) => void;
  setDataTable: (dataTable: IDataTable[]) => void;
  setClaimData: (claimData: IOrgDataClaimInput) => void;
  setOrgDataInitial: (orgData: OrgDataInitial) => void;
}

const useFormState = create<FormState>()((set) => ({
  disabled: false,
  initialData: undefined,
  orgData: {},
  dataTable: [],
  claimData: undefined,
  orgDataClaim: {},
  orgDataInitial: null,
  setOrgDataInitial: (orgDataInitial: OrgDataInitial) => {
    set({ orgDataInitial });
  },
  setDisabled: (disabled: boolean) => set({ disabled }),
  setInitialData: (initialData: IOrgDataInput) => {
    set({ initialData })
  },
  setOrgData: (orgData: IOrgData) => set({ orgData }),
  setOrgDataClaim: (orgDataClaim: IOrgData) => set({ orgDataClaim }),
  setDataTable: (dataTable: IDataTable[]) => set({ dataTable }),
  setClaimData: (claimData: IOrgDataClaimInput) => set({ claimData }),
}));

export { useFormState };
