export interface DopInputData {}

export interface DopTask {
  assignee: any;
  assigneeId: number;
  autoAssign: boolean;
  businessKey: string;
  candidateGroups: string[];
  candidateUsers: string[];
  comment: string;
  creationTime: Date;
  deleteReason: string;
  description: string;
  dueDate: Date;
  formKey: string;
  group: string;
  id: number;
  inputData: DopInputData;
  inputVariables: any;
  jobId: number;
  keywords: string;
  name: string;
  outputData: string;
  outputVariables: any;
  owner: any;
  parentTaskId: number;
  performedTime: any;
  priority: number;
  processDefinitionId: string;
  processInstanceId: string;
  projectId: number;
  startTime: any;
  status: string;
  submitTime: any;
  taskDefinitionKey: string;
  taskId: string;
  taskPoints: number;
  timeoutPerforming: any;
  timeoutPerformingDate: any;
  orgId: number;
  variables?: any;
}