// CardData.js
const cardDataArray = [
  {
    title: 'Media Ponderada',
    info: 'Gere um gráfico referente a média ponderada por grupos',
    tags: ['Média', 'Análise'],
    link:'/agrupMediaPond',
    metrica: 'mediaPond'
  },
  {
    title: 'Assertividade',
    info: 'Informação sobre dúvidas dos alunos.',
    tags: ['Dúvida', 'Informação'],
    link:'/duvidasPorAluno',
    metrica:'assertividade'
  },
  // {
  //   title: 'User',
  //   info: 'Informação sobre o card 2.',
  //   tags: ['Análise', 'Informação'],
  //   link:'/users'
  // },
  {
    title: 'Compreensão',
    info: 'Nota Ponderada da Turma.',
    tags: ['Análise', 'Média'],
    link:'/mediaPond',
    metrica: 'compreensao'
  },
  {
    title: 'Média Normal',
    info: 'Métricas de assertividade e compreensão.',
    tags: ['Assertividade', 'Compreensão'],
    link:'/metricas',
    metrica: 'media'
  },
  {
    title: 'Dúvidas',
    info: 'Quantidade de dúvida em cada questão por alunos',
    tags: ['Análise', 'Média'],
    link:'/duvidaPorAluno',
    metrica:'duvidaPorQuestao'
  },
  {
    title: 'Tempo Resposta',
    info: 'Média de tempo resposta entre questões',
    tags: ['Assertividade', 'Tempo'],
    link:'/relacao',
    metrica: 'tempoResposta'
  }, 
  {
    title: 'Todas',
    info: 'Todas as métricas até então',
    tags: ['Tempo', 'Análise'],
    link:'/tempomedio',
    metrica:'todas'
  },
  {
    title: 'Relação Entre Médias',
    info: 'Relação entre as principais métricas.',
    tags: ['Análise', 'Métricas'],
    link:'/todasmetricas',
    metrica:'medias'
  },
  {
    title: 'Avaliando estudantes',
    info: 'Analise atraves de 4 métricas',
    tags: ['Análise', 'Métricas'],
    link:'/todasmetricas',
    metrica:'assessingStudents'
  }
  // Adicione mais objetos conforme necessário
];


export const filterCardData = (select: string) => {
  return cardDataArray.filter(card =>
    select === "Todas" || card.tags.some(tag => tag.toLowerCase() === select.toLowerCase())
  );
};


export default cardDataArray;
