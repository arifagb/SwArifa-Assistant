// Mock data for Summoners War compositions based on swgt.io

export interface Monster {
  id: string;
  name: string;
  element: 'water' | 'fire' | 'wind' | 'light' | 'dark';
  icon: string;
}

export interface LeaderSkill {
  description: string;
  bonus: string;
}

export interface Composition {
  id: string;
  monsters: [string, string, string];
  leaderSkill: LeaderSkill;
  strengths: string[];
  weaknesses: string[];
  notes: string[];
}

export interface Counter {
  id: string;
  composition: Composition;
  rating: number;
  votes: number;
  author: string;
  date: string;
  strategy: string;
  buildNotes?: string;
}

export interface Defense {
  id: string;
  composition: Composition;
  counters: Counter[];
}

// Popular monsters in Summoners War
export const MONSTERS: Record<string, Monster> = {
  susano: {
    id: 'susano',
    name: 'Susano',
    element: 'water',
    icon: '💧',
  },
  garo: {
    id: 'garo',
    name: 'Garo',
    element: 'fire',
    icon: '🔥',
  },
  orion: {
    id: 'orion',
    name: 'Orion',
    element: 'wind',
    icon: '💨',
  },
  harmonia: {
    id: 'harmonia',
    name: 'Harmonia',
    element: 'light',
    icon: '✨',
  },
  vigor: {
    id: 'vigor',
    name: 'Vigor',
    element: 'water',
    icon: '💧',
  },
  skogul: {
    id: 'skogul',
    name: 'Skogul',
    element: 'dark',
    icon: '🌑',
  },
  triana: {
    id: 'triana',
    name: 'Triana',
    element: 'water',
    icon: '💧',
  },
  elucia: {
    id: 'elucia',
    name: 'Elucia',
    element: 'water',
    icon: '💧',
  },
  suiki: {
    id: 'suiki',
    name: 'Suiki',
    element: 'water',
    icon: '💧',
  },
  windy: {
    id: 'windy',
    name: 'Windy',
    element: 'wind',
    icon: '💨',
  },
  sian: {
    id: 'sian',
    name: 'Sian',
    element: 'wind',
    icon: '💨',
  },
  fran: {
    id: 'fran',
    name: 'Fran',
    element: 'water',
    icon: '💧',
  },
  malaka: {
    id: 'malaka',
    name: 'Malaka',
    element: 'fire',
    icon: '🔥',
  },
  betta: {
    id: 'betta',
    name: 'Betta',
    element: 'water',
    icon: '💧',
  },
  sabrina: {
    id: 'sabrina',
    name: 'Sabrina',
    element: 'water',
    icon: '💧',
  },
  talia: {
    id: 'talia',
    name: 'Talia',
    element: 'fire',
    icon: '🔥',
  },
  galleon: {
    id: 'galleon',
    name: 'Galleon',
    element: 'water',
    icon: '💧',
  },
  julie: {
    id: 'julie',
    name: 'Julie',
    element: 'water',
    icon: '💧',
  },
  groggo: {
    id: 'groggo',
    name: 'Groggo',
    element: 'wind',
    icon: '💨',
  },
  chloe: {
    id: 'chloe',
    name: 'Chloe',
    element: 'fire',
    icon: '🔥',
  },
  khmun: {
    id: 'khmun',
    name: 'Khmun',
    element: 'light',
    icon: '✨',
  },
  mina: {
    id: 'mina',
    name: 'Mina',
    element: 'fire',
    icon: '🔥',
  },
  konamiya: {
    id: 'konamiya',
    name: 'Konamiya',
    element: 'water',
    icon: '💧',
  },
  aegir: {
    id: 'aegir',
    name: 'Aegir',
    element: 'fire',
    icon: '🔥',
  },
  miho: {
    id: 'miho',
    name: 'Miho',
    element: 'wind',
    icon: '💨',
  },
  tetra: {
    id: 'tetra',
    name: 'Tetra',
    element: 'water',
    icon: '💧',
  },
  yen: {
    id: 'yen',
    name: 'Yen',
    element: 'dark',
    icon: '🌑',
  },
  emma: {
    id: 'emma',
    name: 'Emma',
    element: 'water',
    icon: '💧',
  },
  raviti: {
    id: 'raviti',
    name: 'Raviti',
    element: 'light',
    icon: '✨',
  },
  tractor: {
    id: 'tractor',
    name: 'Tractor',
    element: 'fire',
    icon: '🔥',
  },
  stella: {
    id: 'stella',
    name: 'Stella',
    element: 'fire',
    icon: '🔥',
  },
  bernard: {
    id: 'bernard',
    name: 'Bernard',
    element: 'wind',
    icon: '💨',
  },
  orochi: {
    id: 'orochi',
    name: 'Orochi',
    element: 'wind',
    icon: '💨',
  },
  dias: {
    id: 'dias',
    name: 'Dias',
    element: 'light',
    icon: '✨',
  },
  chasun: {
    id: 'chasun',
    name: 'Chasun',
    element: 'wind',
    icon: '💨',
  },
  darion: {
    id: 'darion',
    name: 'Darion',
    element: 'light',
    icon: '✨',
  },
  lulu: {
    id: 'lulu',
    name: 'Lulu',
    element: 'water',
    icon: '💧',
  },
  hraesvelg: {
    id: 'hraesvelg',
    name: 'Hraesvelg',
    element: 'wind',
    icon: '💨',
  },
};

// Sample defense with counters
export const SAMPLE_DEFENSE: Defense = {
  id: 'def-susano-garo-orion',
  composition: {
    id: 'comp-susano-garo-orion',
    monsters: ['susano', 'garo', 'orion'],
    leaderSkill: {
      description: 'Aumenta a Velocidade de Ataque de monstros aliados com atributo Água em 30%',
      bonus: 'Velocidade de Ataque +30%',
    },
    strengths: [
      'Líder de velocidade',
      'Orion com RNG',
      'Passiva do Garo/Susano',
      'Difícil de superar em velocidade',
    ],
    weaknesses: [
      'Vulnerável a composições Turn 2 (Shield Will)',
      'Fraco contra duplo água + vento',
      'Fraco contra gêmeos',
    ],
    notes: [
      'Shield Will Galleon Julie + 1 tanque fogo',
      'Shield will gêmeos água + Triana',
      'Duplo água + Fogo em Will etc.',
    ],
  },
  counters: [
    {
      id: 'counter-1',
      composition: {
        id: 'comp-harmonia-vigor-skogul',
        monsters: ['harmonia', 'vigor', 'skogul'],
        leaderSkill: {
          description: 'Aumenta a HP de monstros aliados em conteúdo de Guild em 33%',
          bonus: 'HP +33%',
        },
        strengths: ['Tanque robusto', 'Dano consistente'],
        weaknesses: [],
        notes: [],
      },
      rating: 5.0,
      votes: 7,
      author: 'free2pgod',
      date: '30/01/2023',
      strategy: 'Composição tanque com dano consistente',
    },
    {
      id: 'counter-2',
      composition: {
        id: 'comp-triana-elucia-suiki',
        monsters: ['triana', 'elucia', 'suiki'],
        leaderSkill: {
          description: 'Aumenta a Defesa de monstros aliados em conteúdo de Guild em 33%',
          bonus: 'Defesa +33%',
        },
        strengths: ['Suporte robusto', 'Curações'],
        weaknesses: [],
        notes: ['Qualquer bom dealer de dano água funciona no lugar de Suiki'],
      },
      rating: 5.0,
      votes: 2,
      author: 'Roger924',
      date: '24/06/2025',
      strategy: 'Suporte com dealers de dano água',
    },
    {
      id: 'counter-3',
      composition: {
        id: 'comp-vigor-windy-sian',
        monsters: ['vigor', 'windy', 'sian'],
        leaderSkill: {
          description: 'Aumenta o Poder de Ataque de monstros aliados em conteúdo de Guild em 21%',
          bonus: 'Poder de Ataque +21%',
        },
        strengths: ['Dano alto', 'Controle'],
        weaknesses: [],
        notes: ['Garo vai focar em Windy, construir ultra tanque (3x HP)'],
      },
      rating: 5.0,
      votes: 1,
      author: 'Aonun',
      date: '12/08/2023',
      strategy: 'Ez clap, Garo vai focar em Windy, construir ultra tanque (3 set HP) e criar escudo para o time, Vigor para matar Garo, Sian bomba o time sem imunidade (T2)',
    },
    {
      id: 'counter-4',
      composition: {
        id: 'comp-sabrina-triana-talia',
        monsters: ['sabrina', 'triana', 'talia'],
        leaderSkill: {
          description: 'Aumenta a Precisão de monstros aliados em conteúdo de Guild em 40%',
          bonus: 'Precisão +40%',
        },
        strengths: ['Dano gêmeos', 'Suporte'],
        weaknesses: [],
        notes: ['Garo - Susano - Orion'],
      },
      rating: 4.4,
      votes: 5,
      author: 'sparklefresh',
      date: '10/03/2020',
      strategy: 'Composição com gêmeos para dano consistente',
    },
    {
      id: 'counter-5',
      composition: {
        id: 'comp-galleon-malaka-triana',
        monsters: ['galleon', 'malaka', 'triana'],
        leaderSkill: {
          description: 'Aumenta a Velocidade de Ataque de monstros aliados em conteúdo de Guild em 24%',
          bonus: 'Velocidade de Ataque +24%',
        },
        strengths: ['Velocidade', 'Controle'],
        weaknesses: [],
        notes: ['Shield Will Galleon, Malaka em Shield, Triana em Will'],
      },
      rating: 3.9,
      votes: 7,
      author: 'Kappa84',
      date: '10/03/2020',
      strategy: 'Shield Will com Galleon em primeiro, Malaka em segundo e Triana em terceiro',
    },
  ],
};

// Function to search monsters by name
export function searchMonsters(query: string): Monster[] {
  const lowerQuery = query.toLowerCase().trim();
  return Object.values(MONSTERS).filter(
    (monster) =>
      monster.name.toLowerCase().includes(lowerQuery) ||
      monster.id.includes(lowerQuery)
  );
}

// Function to get monster by ID
export function getMonster(id: string): Monster | undefined {
  return MONSTERS[id.toLowerCase()];
}

// Function to search defenses by composition
export function searchDefenses(monsterIds: string[]): Defense[] {
  // For now, return sample defense if it matches
  const normalizedIds = monsterIds.map((id) => id.toLowerCase());
  
  if (
    normalizedIds.includes('susano') &&
    normalizedIds.includes('garo') &&
    normalizedIds.includes('orion')
  ) {
    return [SAMPLE_DEFENSE];
  }

  // Return empty array for other searches (would be populated from API)
  return [];
}
