/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAluno {
  filter(arg0: (aluno: any) => any): any;
  nome: string;
  _id: string;
  grupo: string;
  codigo:string;    
}

export interface NumericProps {
  [propName: string]: any;
}

export interface Item {
  disciplina: string;
  aluno: IAluno;
  nomedisciplina:string;
  numericProps: NumericProps;
  map: (callbackfn: (value: Item, index: number, array: Item[]) => any, thisArg?: any) => any[];
}

export interface Itens {
  some(arg0: (item: any) => any): unknown;
  flatMap<U>(callback: (item: Item, index: number, array: Item[]) => U[]): U[];
  reduce: (callbackfn: (keys: string[], item: Item) => string[], initialValue: never[]) => string[];
  filter: (callbackfn: (value: Item, index: number, array: Item[]) => boolean) => Item[];
  [index: number]: Item; // Permitindo acesso por índice numérico
  map: (callbackfn: (value: Item, index: number, array: Item[]) => any, thisArg?: any) => any[];
  length: number;
  slice: (start?: number, end?: number) => Item[];

}