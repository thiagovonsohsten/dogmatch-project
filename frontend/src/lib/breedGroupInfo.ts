/**
 * Informações detalhadas sobre grupos de raças
 */

export interface BreedGroupInfo {
  name: string;
  description: string;
  characteristics: string[];
  examples: string[];
  idealFor: string[];
}

export const breedGroupInfo: Record<string, BreedGroupInfo> = {
  'Herding': {
    name: 'Pastoreio',
    description: 'Cães originalmente criados para pastorear e controlar rebanhos de animais.',
    characteristics: [
      'Inteligência alta',
      'Energia elevada',
      'Instinto de pastoreio',
      'Boa capacidade de treinamento',
      'Lealdade ao dono'
    ],
    examples: ['Pastor Alemão', 'Border Collie', 'Australian Shepherd'],
    idealFor: [
      'Pessoas ativas',
      'Famílias com espaço',
      'Quem gosta de treinar cães',
      'Ambientes rurais ou suburbanos'
    ]
  },
  'Sporting': {
    name: 'Esportivo',
    description: 'Cães criados para caça e atividades esportivas, especialmente caça de aves.',
    characteristics: [
      'Alta energia',
      'Instinto de caça',
      'Boa capacidade de natação',
      'Temperamento equilibrado',
      'Boa com famílias'
    ],
    examples: ['Golden Retriever', 'Labrador Retriever', 'Cocker Spaniel'],
    idealFor: [
      'Famílias ativas',
      'Caçadores',
      'Pessoas que gostam de atividades ao ar livre',
      'Quem tem tempo para exercícios'
    ]
  },
  'Working': {
    name: 'Trabalho',
    description: 'Cães criados para realizar trabalhos específicos como guarda, resgate e tração.',
    characteristics: [
      'Força física',
      'Inteligência alta',
      'Instinto de proteção',
      'Resistência',
      'Lealdade extrema'
    ],
    examples: ['Rottweiler', 'São Bernardo', 'Husky Siberiano'],
    idealFor: [
      'Pessoas experientes com cães',
      'Famílias com espaço',
      'Quem precisa de proteção',
      'Ambientes rurais'
    ]
  },
  'Hound': {
    name: 'Caça',
    description: 'Cães criados para caça, usando principalmente o olfato ou a visão para rastrear presas.',
    characteristics: [
      'Olfato ou visão aguçados',
      'Persistência na caça',
      'Independência',
      'Vocalização característica',
      'Resistência'
    ],
    examples: ['Beagle', 'Dachshund', 'Greyhound'],
    idealFor: [
      'Caçadores',
      'Pessoas que gostam de caminhadas',
      'Famílias com espaço',
      'Quem aprecia independência canina'
    ]
  },
  'Terrier': {
    name: 'Terrier',
    description: 'Cães pequenos a médios, criados para caçar pequenos animais e pragas.',
    characteristics: [
      'Coragem',
      'Energia alta',
      'Determinação',
      'Tendência a cavar',
      'Personalidade forte'
    ],
    examples: ['Bull Terrier', 'West Highland White Terrier', 'Yorkshire Terrier'],
    idealFor: [
      'Pessoas ativas',
      'Famílias com crianças maiores',
      'Quem gosta de personalidade forte',
      'Ambientes com quintal'
    ]
  },
  'Toy': {
    name: 'Toy/Companhia',
    description: 'Cães pequenos criados principalmente para companhia e estimação.',
    characteristics: [
      'Tamanho pequeno',
      'Apego ao dono',
      'Baixa necessidade de exercício',
      'Boa para apartamentos',
      'Temperamento doce'
    ],
    examples: ['Chihuahua', 'Pug', 'Maltês', 'Shih Tzu'],
    idealFor: [
      'Moradores de apartamento',
      'Idosos',
      'Famílias com pouco espaço',
      'Primeiros donos de cães'
    ]
  },
  'Non-Sporting': {
    name: 'Não-Esportivo',
    description: 'Grupo diversificado de cães que não se encaixam em outras categorias específicas.',
    characteristics: [
      'Variedade de tamanhos',
      'Temperamentos diversos',
      'Menos instintos específicos',
      'Boa adaptabilidade',
      'Características únicas'
    ],
    examples: ['Poodle', 'Bulldog Inglês', 'Chow Chow', 'Lhasa Apso'],
    idealFor: [
      'Famílias diversas',
      'Pessoas que querem características únicas',
      'Diferentes estilos de vida',
      'Quem busca versatilidade'
    ]
  }
};

/**
 * Função para obter informações de um grupo de raça
 * @param breedGroup - Nome do grupo em inglês
 * @returns Informações do grupo ou fallback
 */
export function getBreedGroupInfo(breedGroup: string): BreedGroupInfo {
  return breedGroupInfo[breedGroup] || {
    name: breedGroup,
    description: 'Grupo de raças com características específicas.',
    characteristics: ['Características variadas'],
    examples: ['Exemplos diversos'],
    idealFor: ['Diferentes perfis de donos']
  };
}
