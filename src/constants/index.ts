export enum EventTypes {
  INITIALIZE_FORM='INITIALIZE_FORM',
  SET_DATA = 'SET_DATA',
  GET_DATA_BY_PATH = 'GET_DATA_BY_PATH',
  UPDATE_FORM_DATA = 'UPDATE_FORM_DATA',
  SET_FORM_STATUS = 'SET_FORM_STATUS',
  COMPLETE_TASK = 'COMPLETE_TASK',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
}

// export const MAIN_DOP_HOST = 'https://dop-v3-dev.vbpo-st.com';
export const MAIN_DOP_HOST = 'http://localhost:8000';

export const DATE_FORMAT='YYYY-MM-DD 00:00:00';
export const DATE_FORMAT_DD_MM_YYYY='DD-MM-YYYY';
export const DATE_FORMAT_MM_DD_YYYY='MM/DD/YYYY';

export enum VariableType {
  BOOLEAN = 'Boolean',
  BYTE = 'Byte',
  FILE = 'File',
  DATE = 'Date',
  DOUBLE = 'Double',
  INTEGER = 'Integer',
  LONG = 'Long',
  OBJECT = 'Object',
  SHORT = 'Short',
  STRING = 'String',
  JSON = 'Json',
  XML = 'Xml',
  NULL = 'Null',
  USER_DEFINED = 'UserDefined'
}

export const enum FileType {
  PDF = 'pdf',
  IMAGE = 'image'
}
