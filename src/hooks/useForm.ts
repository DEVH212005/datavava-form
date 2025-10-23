import queryString from "query-string";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { EventTypes } from "../constants";
import { ThemeMode } from "../enum";
import {
  ExtraOrgDataType,
  IDataTable,
  IFormValues,
  IMessageToExternalForm,
  OrgDataInitial,
} from "../interfaces";
import { useFormState } from "../store/useFormState";
import { useTheme } from "../store/useTheme";
import {
  convertCompletedInputData,
  convertDataTable,
  convertFormOutputData,
  convertInputData,
  isEmptyObject,
} from "../utils";
import { ExtraFormAction, FileDataType } from "./../interfaces/index";
import { usePatientStore } from "../store/usePatient";

export function useForm() {
  const { i18n } = useTranslation();
  const {
    disabled,
    initialData,
    setDisabled,
    setOrgData,
    setOrgDataClaim,
    setInitialData,
    claimData,
    orgDataClaim,
    setClaimData,
    dataTable,
    setDataTable,
    orgDataInitial,
    setOrgDataInitial,
  } = useFormState();
  const { setThemeMode } = useTheme();

  const { setPatients, getPatientsWithoutId } = usePatientStore();

  useEffect(() => {
    console.log("FORM BUILDER LOADED");
    sendMessageToParent({
      action: EventTypes.INITIALIZE_FORM,
    });
  }, []);

  const onFinish = (values: IFormValues) => {
    sendMessageToParent({
      action: EventTypes.COMPLETE_TASK,
      data: {
        dataStoreName: orgDataInitial?.data_store_name ?? "",
        group: orgDataInitial?.group ?? "",
        key: orgDataInitial?.org_data_key ?? "",
        orgCode: orgDataInitial?.org_code ?? orgDataInitial?.ORG_CODE ?? "",
        isCredential: initialData?.isCredential || false,
        payload: {
          data: getPatientsWithoutId(),
        },
      },
      extra: {
        isNeedToUpdateOrgData: true,
      },
    });
  };

  const onCompleteTask = useCallback(() => {
    onFinish(dataTable);
  }, [dataTable, initialData, orgDataInitial]);

  const onGetDataByPath = useCallback((path: string, extra?: any) => {
    // request to fetch and display data on UI
    sendMessageToParent({
      action: EventTypes.GET_DATA_BY_PATH,
      data: path,
      extra,
    });
  }, []);

  const handleSetFormStatus = useCallback(
    (eventData: IMessageToExternalForm) => {
      setDisabled(eventData.data?.disabled || false);
    },
    []
  );

  const handleSetLanguage = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
    },
    [i18n]
  );

  const handleSetThemMode = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);
  }, []);

  const handleSetJsonData = useCallback(
    (data: any, orgDataType?: ExtraOrgDataType) => {
      if (orgDataType === ExtraOrgDataType.CLAIM) {
        // NOT USED
        setClaimData(data);
      }

      if (orgDataType === ExtraOrgDataType.DATA_STORE) {
        setInitialData(data);
        setPatients(data?.payload?.data ?? []);
      }
    },
    [setInitialData]
  );

  const onChange = useCallback(
    (key: string, field: string, value: string) => {
      const foundIndex = dataTable.findIndex((item) => item.key === key);

      if (foundIndex !== -1) {
        const newData = [...dataTable];
        newData[foundIndex][field as keyof IDataTable] = value;
        setDataTable(newData as IDataTable[]);
      }
    },
    [dataTable]
  );

  const handleSetFormData = useCallback((eventData: IMessageToExternalForm) => {
    const isTaskCompleted = eventData.extra?.isTaskCompleted || false;
    const receivedData = isTaskCompleted
      ? convertCompletedInputData(eventData.data)
      : convertInputData(eventData.data);

    const dataStoreId = receivedData["data_store_id"];
    const key = receivedData["org_data_key"];
    const group = receivedData["group"];
    const orgCode = receivedData["ORG_CODE"];

    const dataStoreIdClaim = receivedData["data_store_id_claim"];
    const dataStoreNameClaim = receivedData["data_store_name_claim"];
    const groupClaim = receivedData["group_claim"];
    const keyClaim = receivedData["org_data_key_claim"];

    setOrgDataInitial(receivedData as OrgDataInitial);

    if (isTaskCompleted) {
      setDisabled(true);
    }

    const conditionToQueryClaim =
      dataStoreIdClaim && groupClaim && keyClaim && dataStoreNameClaim;
    const conditionToQueryDataStore = dataStoreId && group && key;

    if (!!conditionToQueryClaim) {
      // not used
      const query = {
        dataStoreId: dataStoreIdClaim,
        dataStoreName: dataStoreNameClaim,
        key: keyClaim,
        group: groupClaim,
        orgCode: orgCode,
      };

      setOrgDataClaim(query);

      onGetDataByPath("", {
        fileDataType: FileDataType.DATA_STORE_VALUE,
        action: ExtraFormAction.GET_JSON_FILE_DATA,
        orgDataType: ExtraOrgDataType.CLAIM,
        queryParam: queryString.stringify(query),
      });
    }

    // Only conditionToQueryDataStore is true
    if (!!conditionToQueryDataStore) {
      // used
      const query = {
        dataStoreId: dataStoreId,
        key: key,
        group: group,
      };

      setOrgData(query);

      onGetDataByPath("", {
        fileDataType: FileDataType.DATA_STORE_VALUE,
        action: ExtraFormAction.GET_JSON_FILE_DATA,
        orgDataType: ExtraOrgDataType.DATA_STORE,
        queryParam: queryString.stringify(query),
      });
    }
  }, []);

  const handleUpdateSettings = useCallback(
    (eventData: IMessageToExternalForm) => {
      const { data, extra } = eventData;

      if (extra?.action === ExtraFormAction.SET_THEME) {
        const theme = data?.theme || ThemeMode.LIGHT;
        handleSetThemMode(theme);
      }

      if (extra?.action === ExtraFormAction.SET_LANGUAGE) {
        const language = data?.language || "en";
        handleSetLanguage(language);
      }
    },
    []
  );

  const handleUpdateFormData = useCallback(
    (eventData: IMessageToExternalForm) => {
      const { data, extra } = eventData;

      if (extra?.action === ExtraFormAction.GET_JSON_FILE_DATA) {
        // Handle set form json data, you can pass any field to set specific item
        handleSetJsonData(data, extra?.orgDataType);
      }
    },
    []
  );

  const sendMessageToParent = useCallback((message: unknown) => {
    window.parent.postMessage(message, "*");
  }, []);

  const onListenMessage = useCallback(
    (payload: IMessageToExternalForm) => {
      const { type } = payload;

      if (type === EventTypes.SET_DATA) {
        // Receive data from request EventTypes.GET_DATA_BY_PATH
        handleSetFormData(payload);
      }

      if (type === EventTypes.UPDATE_FORM_DATA) {
        // Receive data from request EventTypes.GET_DATA_BY_PATH
        handleUpdateFormData(payload);
      }

      if (type === EventTypes.UPDATE_SETTINGS) {
        // Settings like theme, language,...
        handleUpdateSettings(payload);
      }

      if (type === EventTypes.SET_FORM_STATUS) {
        // Enable or disable button
        handleSetFormStatus(payload);
      }
    },
    [handleSetFormData, handleUpdateFormData, handleSetFormStatus]
  );

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const eventData: IMessageToExternalForm = event.data;
      onListenMessage(eventData);
    };

    window?.addEventListener("message", handleMessage);

    return () => {
      window?.removeEventListener("message", handleMessage);
    };
  }, [window]);

  return {
    onFinish,
    onCompleteTask,
    dataTable,
    onChange,
    disabled,
  };
}
