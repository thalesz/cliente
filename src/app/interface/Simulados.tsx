// src/interface/Simulados.ts

export interface ISimulado {
  _id: string;
  descricao: string;
  data: string;
  nomeProfessor: string[];
  disciplinas: string[];
  turmas: string[];
  id_disciplinas: string[];
  id_turmas: string[];
}

export type Simulados = ISimulado[]; // Corrigido para ser um array de ISimulado
