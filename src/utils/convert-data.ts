import dayjs from "dayjs";
import { DATE_FORMAT, DATE_FORMAT_MM_DD_YYYY, VariableType } from "../constants";
import { CompletedTaskVariable, IClaim, IClaimItem, IDataTable, IOrgDataClaimInput, IOrgDataInput, ITaskVariable } from "../interfaces";
import { convertDateToFormat } from "./date-utils";
import { isEmptyObject } from "./validation";

export const convertInputData = (variables: ITaskVariable) => {
  const result: Record<string, any> = {};

  for (const [key, item] of Object.entries(variables)) {
    if ('value' in item && 'type' in item) {
      result[key] = formatDataByType(item.type as VariableType, item.value);
    }
  }

  return result;
}

interface OutputObject {
  [key: string]: string | number | boolean;
}

export const convertCompletedInputData = (data: CompletedTaskVariable[]): OutputObject => {
  const result: OutputObject = {};

  for (const item of data) {
    result[item.name] = item.value;
  }

  return result;
}

const formatDataByType = (type: VariableType, value: any) => {
  switch (type) {
    case VariableType.DATE:
      return dayjs(value, DATE_FORMAT);

    case VariableType.JSON:
      return JSON.parse(value);

    default:
      return value;
  }
}

export const checkInitData = (name: string) => {
  const splitData = name.split(":");

  return splitData.length > 1 ? splitData[1].trim() : splitData[0];
};

export const convertDataTable = (data: IOrgDataInput) => {
  if (!data || isEmptyObject(data.payload)) {
    return [];
  }

  const result: IDataTable[] = [];
  const payload = data.payload || {};
  const claimKeys = Object.keys(payload).filter(it => it.startsWith('claim_'));

  claimKeys.forEach(claimKey => {
    const claims = payload[claimKey] as IClaim[] ?? [];

    claims.forEach(claim => {
      const eraId = claim?.era_id ?? '';
      const detailCodes = claim?.detail_code ?? [];

      detailCodes.forEach(detailCode => {
        const claimId = detailCode?.claim_id ?? '';
        const codeErrors = detailCode?.code_error ?? [];

        codeErrors.forEach((codeError, idx) => {
          if (eraId && claimId && codeError) {
            const item: IDataTable = {
              key: `${eraId}-${claimId}-${idx+1}`,
              claimKey,
              eraId,
              claimId,
              reasonCode: codeError,
              codeCARC: null,
              codeCARCDescription: null,
            }
  
            result.push(item);
          }
        });
      });
    });
  });

  return result;
}

const groupByClaimKey = (items: IDataTable[]): Record<string, IDataTable[]> => {
  return items.reduce((acc, item) => {
    if (!acc[item.claimKey]) {
      acc[item.claimKey] = [];
    }

    acc[item.claimKey].push(item);
    return acc;
  }, {} as Record<string, IDataTable[]>);
}

export const convertFormOutputData = (claimData: IOrgDataClaimInput, dataTable: IDataTable[]) => {
  // clone without mutating original
  const updated: IOrgDataClaimInput = JSON.parse(JSON.stringify(claimData));

  for (const row of dataTable) {
    const { claimKey, eraId, claimId, codeCARC, codeCARCDescription } = row;

    const claimGroup = updated.payload[claimKey] as IClaimItem[] | undefined;
    if (!claimGroup) continue;

    const eraBlock = claimGroup.find((era) => era.era_id === eraId);
    if (!eraBlock) continue;

    const claimDetail = eraBlock.detail_claim.find(
      (claim) => claim.claim_id === claimId
    );
    if (!claimDetail) continue;

    if (!claimDetail.reason_code) {
      claimDetail.reason_code = {};
    }

    if (codeCARC && codeCARCDescription) {
      claimDetail.reason_code[codeCARC] = codeCARCDescription;
    }
  }

  return updated;
}