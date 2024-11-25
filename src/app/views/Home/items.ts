export interface Item {
  id: number;
  title: string;
  buttonText: string;
  route?: string; // Adiciona a propriedade route para navegação
  role: string[]

}

const items: Item[] = [
  { id: 1, title: 'Usuário', buttonText: 'Acessar', route: '/all/users', role: ["2001", "187"] },
  { id: 2, title: 'Registrar', buttonText: 'Acessar', route: '/admin/register',  role: ["187"] },
  { id: 3, title: 'Rotas', buttonText: 'Acessar', route: '/admin/rotas',  role: ["187"] },
  { id: 4, title: 'Coletas', buttonText: 'Acessar', route: '/all/coletas',  role: ['187'] },
  // Adicione mais itens aqui
];



export default items;
