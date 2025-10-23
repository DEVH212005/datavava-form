import { EventTypes, VariableType } from "../constants";

export interface IMessageToExternalForm {
  type: EventTypes;
  data?: any;
  extra?: ExtraFormField;
}

export interface FormFileInfo {
  src: string;
  extension?: string;
}

export interface ExtraFormField {
  // You can define any extra fields to handle on form, it will returned from main
  isTaskCompleted?: boolean;

  // Used when get file with action GET_DATA_BY_PATH
  fileDataType?: FileDataType;

  // Used when complete task with action COMPLETE_TASK
  isNeedToUpload?: boolean;
  fieldKey?: string;
  fileName?: string;
  fileUploadType?: string;

  action?: ExtraFormAction;

  // ====> You can add more fields if the form need here <=====
  orgDataType?: ExtraOrgDataType;
}

export enum FileDataType {
  NORMAL_FILE = "NORMAL_FILE",
  JSON_FILE = "JSON_FILE",
  DATA_STORE_FILE = "DATA_STORE_FILE",
  DATA_STORE_VALUE = "DATA_STORE_VALUE",
}

export enum ExtraFormAction {
  GET_FORM_FILE = "GET_FORM_FILE",
  GET_JSON_FILE_DATA = "GET_JSON_FILE_DATA",
  SET_LANGUAGE = "SET_LANGUAGE",
  SET_THEME = "SET_THEME",

  // ====> You can add more fields if the form need here <=====
}

export enum ExtraOrgDataType {
  CLAIM = "claim",
  DATA_STORE = "data_store",
}

// ======> You can add custom interfaces here <=========
export interface ITaskVariable {
  [key: string]: ITaskVariableInfo;
}

export interface ITaskVariableInfo {
  type?: VariableType;
  value: number | string | boolean;
  valueInfo?: Record<string, unknown>;
}

export interface IDopOption {
  code: string;
  name: string;
}

export interface ITaskWithConfidence {
  value: number | string | boolean;
  confidence?: number;
}

export interface CompletedTaskVariable {
  type: string;
  value: boolean | number | string;
  valueInfo: any;
  id: string;
  name: string;
  processDefinitionKey: string;
  processDefinitionId: string;
  processInstanceId: string;
  executionId: string;
  activityInstanceId: string;
  caseDefinitionKey: string;
  caseDefinitionId: string;
  caseInstanceId: string;
  caseExecutionId: string;
  taskId: string;
  errorMessage: string;
  tenantId: string;
  state: string;
  createTime: Date;
  removalTime: Date;
  rootProcessInstanceId: string;
}

export interface IFormValues {}

export interface IOrgData {
  dataStoreName?: string;
  orgCode?: string;
  group?: string;
  key?: string;
  dataStoreId?: number;
}

// ======> Org Data Input <=========
export interface IOrgDataInput {
  id: string;
  dataStoreId: number;
  group: string;
  key: string;
  isCredential: boolean;
  payload: IOrgDataPayload;
  filePaths: any[];
  encryptFields: null;
  createdBy: string;
  createdDate: Date | string;
  lastModifiedBy: string;
  lastModifiedDate: Date | string;
  fileUrl: any;
}

export interface IOrgDataPayload {
  [key: string]: IClaim[];
}

export interface IClaim {
  era_id: string;
  detail_code: IDetailCode[];
}

export interface IDetailCode {
  claim_id: string;
  code_error: string[];
}

// ======> Org Data Claim Input <=========
export interface IOrgDataClaimInput {
  id: string;
  dataStoreId: number;
  group: string;
  key: string;
  isCredential: boolean;
  payload: IOrgDataClaimPayload;
  filePaths: any[];
  encryptFields: null;
  createdBy: string;
  createdDate: Date | string;
  lastModifiedBy: string;
  lastModifiedDate: Date | string;
  fileUrl: any;
}

export interface IOrgDataClaimPayload {
  clinic: string;
  [key: string]: IClaimItem[] | string;
}

export interface IClaimItem {
  era_id: string;
  detail_claim: IDetailClaim[];
  action: string;
}

export interface IDetailClaim {
  claim_id: string;
  patient_name: string;
  date_of_service: string;
  dob: string;
  case: string;
  reason_code?: Record<string, string>;
}

// ======> Data Table <=========
export interface IDataTable {
  key: string;
  claimKey: string;
  eraId: string;
  claimId: string;
  reasonCode: string;
  codeCARC: string | null;
  codeCARCDescription: string | null;
}

export interface OrgDataInitial {
  ORG_ID: number;
  org_data_key: string;
  data_store_name: string;
  ORG_CODE: string;
  PROCESS_INSTANCE_START_TIME_IN_MILI: number;
  RUN_BY: string;
  ORG_CODE_PATH: string;
  data_store_id: string;
  org_code: string;
  group: string;
}
