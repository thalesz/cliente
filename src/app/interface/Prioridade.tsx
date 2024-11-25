export interface NumericProps {
    [propName: string]: any;
  }
export interface IPrioridades {
    average: number;
    nivelDesordem:number;
    nome:string;
    percent:number;
    prioridade:number;
    tempoEsperado:number
    tempoFeito:number;
    numericProps: NumericProps;
    map: (callbackfn: (value: IPrioridades, index: number, array: IPrioridades[]) => any, thisArg?: any) => any[];
}
export interface Prioridades {
    some(arg0: (prioridade: any) => any): unknown;
    flatMap<U>(callback: (prioridade: IPrioridades, index: number, array: IPrioridades[]) => U[]): U[];
    reduce: (callbackfn: (keys: string[], prioridade: IPrioridades) => string[], initialValue: never[]) => string[];
    filter: (callbackfn: (value: IPrioridades, index: number, array: IPrioridades[]) => boolean) => IPrioridades[];
    [index: number]: IPrioridades; // Permitindo acesso por índice numérico
    map: (callbackfn: (value: IPrioridades, index: number, array: IPrioridades[]) => any, thisArg?: any) => any[];
    length: number;
    slice: (start?: number, end?: number) => IPrioridades[];
  
  }