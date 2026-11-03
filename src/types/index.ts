// ECI Process Intelligence 2027 - Type Definitions

export type EvidenceNature = 'DOCUMENTADA_EN_ANTECEDENTE' | 'INFERIDA_FUNCIONALMENTE' | 'HIPOTESIS_POR_VALIDAR';
export type EvidenceVerification = 'NO_VERIFICADA' | 'FUENTE_LOCALIZADA' | 'CONTRASTADA' | 'VALIDADA_CON_DATOS_AUTORIZADOS';
export type EvidenceVigencia = 'VIGENTE_CONFIRMADA' | 'HISTORICA' | 'VIGENCIA_DESCONOCIDA' | 'OBSOLETA_ACREDITADA';

export type HypothesisStatus = 'PROPUESTA' | 'EN_ANALISIS' | 'PENDIENTE_DE_DATOS' | 'LISTA_PARA_ENSAYO' | 'ENSAYO_AUTORIZADO' | 'RESULTADO_INCONCLUSO' | 'MEJORA_DEMOSTRADA' | 'MEJORA_NO_DEMOSTRADA' | 'DESCARTADA';

export type UserRole = 'ADMINISTRADOR' | 'ANALISTA' | 'AUDITOR' | 'LECTOR';

export interface ProcessAxis {
  id: string;
  name: string;
  description: string;
  order: number;
  color: string;
}

export interface Process {
  id: string;
  name: string;
  description: string;
  axisId: string;
  inputs: string[];
  outputs: string[];
  dependencies: string[];
  risks: string[];
  indicators: string[];
  evidenceIds: string[];
  reviewDate: string;
  verificationLevel: string;
  createdAt: string;
  updatedAt: string;
}

export interface Interface {
  id: string;
  originId: string;
  destinationId: string;
  name: string;
  exchangeType: string;
  transferredObject: string;
  triggerEvent: string;
  risks: string[];
  restrictions: string[];
  indicators: string[];
  documents: string[];
  evidenceIds: string[];
  verificationStatus: EvidenceVerification;
  createdAt: string;
  updatedAt: string;
}

export interface Site {
  id: string;
  name: string;
  location: string;
  region: string;
  historicalFunctions: string[];
  status: string;
  notes: string;
}

export interface Source {
  id: string;
  title: string;
  author: string;
  entity: string;
  date: string;
  url: string;
  type: string;
  version: string;
  hash: string;
  summary: string;
  claims: string[];
  limitations: string[];
  reviewStatus: string;
}

export interface Evidence {
  id: string;
  title: string;
  sourceId: string;
  author: string;
  date: string;
  reference: string;
  file: string;
  hash: string;
  claim: string;
  limitations: string[];
  reviewer: string;
  nature: EvidenceNature;
  verification: EvidenceVerification;
  vigencia: EvidenceVigencia;
  linkedProcesses: string[];
  linkedInterfaces: string[];
  createdAt: string;
  updatedAt: string;
}

export interface KPIDefinition {
  id: string;
  code: string;
  name: string;
  formula: string;
  unit: string;
  dataSource: string;
  period: string;
  quality: string;
  baseline: number | null;
  observedValue: number | null;
  target: number | null;
  validationStatus: string;
}

export interface Hypothesis {
  id: string;
  question: string;
  processId: string;
  interfaceId: string;
  availableEvidence: string[];
  pendingData: string[];
  mainIndicator: string;
  baseline: string;
  expectedResult: string;
  validationMethod: string;
  risks: string[];
  acceptanceCriteria: string;
  obtainedResult: string;
  uncertainty: string;
  conclusion: string;
  status: HypothesisStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SimulationRun {
  id: string;
  name: string;
  duration: number;
  operatingDays: number;
  dailyReturns: number;
  compatibilityRate: number;
  potentialOperations: number;
  incrementalValue: number;
  totalIncrementalValue: number;
  co2Equivalent: number;
  variables: Record<string, number>;
  results: Record<string, number>;
  isSynthetic: boolean;
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  actor: string;
  date: string;
  operation: string;
  resource: string;
  previousVersion: string;
  newVersion: string;
  result: string;
  reason: string;
}

export interface AppState {
  axes: ProcessAxis[];
  processes: Process[];
  interfaces: Interface[];
  sites: Site[];
  sources: Source[];
  evidence: Evidence[];
  kpis: KPIDefinition[];
  hypotheses: Hypothesis[];
  simulations: SimulationRun[];
  auditLog: AuditEvent[];
  darkMode: boolean;
  currentView: string;
}
