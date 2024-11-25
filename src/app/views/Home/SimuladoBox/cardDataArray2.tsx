// CardData.js
const cardDataArray = [
  {
    title: 'WS', // Métrica: média ponderada
    info: 'Análise de dados utilizando média ponderada por grupos.',
    tags: ['Média', 'Análise'],
    link: '/agrupMediaPond',
    metrica: 'metrica_ws'
  },
  {
    title: 'AD', // Métrica: grau de assertividade
    info: 'Avaliação das dúvidas dos alunos para medir a assertividade.',
    tags: ['Assertividade', 'Dúvidas'],
    link: '/duvidasPorAluno',
    metrica: 'assurance_degree'
  },
  {
    title: 'QuCL', // Métrica: compreensão
    info: 'Análise da compreensão através da nota ponderada da turma.',
    tags: ['Compreensão', 'Análise'],
    link: '/mediaPond',
    metrica: 'qucl'
  },
  {
    title: 'TS', // Métrica: média normal
    info: 'Métricas de assertividade e compreensão em uma visão geral.',
    tags: ['Média', 'Análise'],
    link: '/metricas',
    metrica: 'metrica_ts'
  },
  {
    title: 'Avaliando Estudantes', // Métrica: avaliando estudantes
    info: 'Análise abrangente através de todas as métricas disponíveis.',
    tags: ['Análise', 'Métricas', 'Avaliação'],
    link: '/todasmetricas',
    metrica: 'assessingStudents'
  },
  {
    title: 'Prioridade', // Métrica: avaliando estudantes
    info: 'Análise de prioridade entre disciplinas e tópicos.',
    tags: ['Prioridade', 'Métricas'],
    link: '/priority',
    metrica: 'priority'
  }
  // Adicione mais objetos conforme necessário
];

export const filterCardData = (select: string) => {
  return cardDataArray.filter(card =>
    select === "Todas" || card.tags.some(tag => tag.toLowerCase() === select.toLowerCase())
  );
};

export default cardDataArray;
