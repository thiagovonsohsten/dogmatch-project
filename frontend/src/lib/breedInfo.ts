/**
 * Informações detalhadas das raças (resumo e história)
 */

export interface BreedInfo {
  summary: string;
  history: string;
}

export const breedInfoMap: Record<string, BreedInfo> = {
  'Border Collie': {
    summary: 'O Border Collie é um cão de trabalho inteligente, de porte médio, originalmente criado para pastorear ovelhas.',
    history: 'O Border Collie teve origem na fronteira entre a Escócia e a Inglaterra, onde era usado para pastorear ovelhas. A raça foi desenvolvida ao longo dos séculos, mantendo sua aptidão para trabalho e sua inteligência. Tornou-se popular como cão de pastoreio e também como cão de companhia.'
  },
  'Cocker Spaniel': {
    summary: 'O Cocker Spaniel é um cão alegre, de porte médio, originalmente criado para caçar aves (como coturnos).',
    history: 'O Cocker Spaniel teve origem na Inglaterra como um tipo de Spaniel especializado na caça de aves menores, especialmente coturnos ("woodcock"). No século XIX e início do XX foi refinado em linhagens distintas (Cocker Inglês, Cocker Americano), com seleções dirigidas ao temperamento e aparência ideal para exposições, mantendo sua aptidão para caça leve.'
  },
  'Golden Retriever': {
    summary: 'O Golden Retriever é um cão amigável, inteligente e ótimo para família, com especial aptidão para busca e resgate.',
    history: 'A raça foi desenvolvida na Escócia no século XIX por Sir Dudley Marjoribanks (Barão Tweedmouth), que cruzou um retriever de pelagem amarela ("Nous") com uma cadela Tweed Water Spaniel ("Belle") para obter cães de busca eficientes em ambientes de caça. Depois usou outras linhas, sempre selecionando pelos pelagens douradas e excelente temperamento. O primeiro padrão e clube da raça foram estabelecidos no início do século XX, e desde então o Golden Retriever se espalhou pelo mundo como um dos cães mais populares para companheirismo, serviço e também trabalho de detecção e resgate.'
  },
  'Siberian Husky': {
    summary: 'O Husky Siberiano é um cão de trenó vigoroso, com resistência, sociabilidade e aparência semelhante à de lobos.',
    history: 'O Husky Siberiano tem origem entre os povos indígenas Chukchi, na Sibéria, onde era usado para puxar trenós e carregar cargas sobre longas distâncias em terrenos gelados. Ao longo do tempo, tornou-se conhecido no mundo ocidental por expedições árticas e corridas de trenó, sendo levado para exposições de cães no início do século XX, e gradualmente adaptado para ser também cão de companhia mantendo sua robustez e resistência.'
  },
  'Labrador Retriever': {
    summary: 'O Labrador Retriever é um cão versátil, amigável e muito solicitado como cão de família, guia e de busca.',
    history: 'O Labrador original foi desenvolvido em Newfoundland (Canadá), como cão de trabalho marítimo auxiliando pescadores a puxar redes e recuperar itens da água. Foi levado para a Inglaterra no século XIX, onde criadores refinarem suas características de temperamento e aptidão de recuperação para caça. Com o tempo, tornou-se uma das raças mais populares do mundo para companhia, serviço e trabalho.'
  },
  'Lhasa Apso': {
    summary: 'O Lhasa Apso é um cão pequeno de porte elegante, originalmente criado como cão guardião e de companhia nos mosteiros tibetanos.',
    history: 'O Lhasa Apso tem raízes no Tibete, onde era mantido nos palácios e mosteiros como cão de guarda interior, alerta a intrusos com seus sentidos aguçados. Com o tempo, esses cães foram levados para o Ocidente no início do século XX, onde foram apreciados como companheiros exóticos, e padrões de raça foram formados, preservando características como pelagem densa, porte compacto e temperamento alerta.'
  },
  'Maltese': {
    summary: 'O Maltês é um cão de porte pequeno, elegante e afetuoso, bastante apropriado como animal de companhia.',
    history: 'O Maltês é uma das raças toy mais antigas conhecidas, com referências históricas que remontam a civilizações mediterrâneas, frequentemente representado na arte antiga como companheiro de elites. Ao longo dos séculos, foi cruzado e refinado em várias culturas europeias, mantendo-se como cão de companhia de luxo e prestígio.'
  },
  'German Shepherd': {
    summary: 'O Pastor Alemão é um cão de trabalho extremamente versátil, usado em polícia, buscas, guarda e também como companheiro leal.',
    history: 'A raça foi desenvolvida na Alemanha no final do século XIX por Maximilian von Stephanitz, que buscava um cão ideal para pastoreio, mas com capacidades físicas e mentais superiores. Ele padronizou cães com boa estrutura, inteligência e aptidão para trabalho, e o Pastor Alemão logo foi adotado para uso militar, policial e de serviço em muitos países.'
  },
  'Miniature Pinscher': {
    summary: 'O Pinscher Miniatura é um cão pequeno, enérgico e com aparência elegante, às vezes chamado de "rei dos miniaturas".',
    history: 'Essa raça provavelmente descende de cães tipo Pinscher e alguns Terrier europeus, mantidos na Alemanha e usados como caçadores de ratos nas casas e celeiros. No século XIX, ganhou popularidade como cão de companhia de porte pequeno, e padrões formais foram criados para definir sua estética e temperamento.'
  },
  'Poodle (Standard)': {
    summary: 'O Poodle padrão é um cão inteligente, elegante e atlético, famoso por seu corte característico de pelagem e versatilidade.',
    history: 'Acredita-se que o Poodle tenha origem na Alemanha como cão de água para recuperação de aves aquáticas, mas foi na França que seu padrão e imagem se consolidaram (o nome "poodle" deriva de palavra alemã para "chapinhar"). Ao longo dos séculos XVIII e XIX, criadores franceses intensificaram sua pelagem cacheada e técnicas de tosa para funcionalidade e estética, e a raça se espalhou pela Europa como cão de exposição e companhia.'
  },
  'Pug': {
    summary: 'O Pug é um cão de companhia compacto, de face achatada e personalidade amável e cativante.',
    history: 'O Pug tem origem na China antiga, sendo mantido nas cortes imperiais como cão de estimação dos imperadores. A raça foi levada para a Europa por mercadores no século XVI e tornou-se popular entre a nobreza europeia. Com tempo, desenvolveu-se conforme o padrão de rosto curto (braquicefalia) e caráter amigável que conhecemos hoje.'
  },
  'Rottweiler': {
    summary: 'O Rottweiler é um cão forte, confiável e bom para guarda, proteção e trabalho pesado.',
    history: 'A raça Rottweiler remonta à Roma antiga, utilizada pelos soldados para conduzir rebanhos e puxar carroças nas campanhas. À medida que os romanos se expandiram pela Europa, cães ancestrais contribuíram para o desenvolvimento de raças locais. Mais tarde, na região de Rottweil (Alemanha), essa linhagem se consolidou em cães de guarda, pastoreio ou transporte de mercadorias, e no século XIX a raça foi formalizada como "Rottweiler".'
  },
  'Samoyed': {
    summary: 'O Samoieda (Samoyed) é um cão de trenó elegante, amigável e muito sociável, com pelagem branca espessa.',
    history: 'A raça deriva dos cães da etnia samoyede da Sibéria, usados para puxar trenós, pastorear renas e manter calor para os povos que viviam em clima extremo. Com a exploração do Ártico e expedições polares nos séculos XIX/XX, esses cães foram levados para a Europa, onde foram refinados para exibições e também como cães de companhia em climas frios.'
  },
  'Saint Bernard': {
    summary: 'O São Bernardo é um cão gigante e gentil, famoso por seu histórico em operações de resgate e guarda alpina.',
    history: 'O São Bernardo se originou nos Alpes suíços, no mosteiro do Grande São Bernardo, onde monges mantinham cães de grande porte para resgate de viajantes perdidos na neve. Ao longo dos séculos XIX e XX, a raça foi selecionada para força, resistência ao frio e temperamento estável, consolidando-se como símbolo de resgate alpino.'
  },
  'Standard Schnauzer': {
    summary: 'O Schnauzer padrão é um cão de médio porte, alerta e versátil, frequentemente usado como cão de guarda ou companhia.',
    history: 'A raça surgiu na Alemanha no século XIX como cão de fazenda multifuncional: controlador de pragas, guarda de propriedade e companheiro familiar. "Schnauzer" vem do alemão para "bigode", referindo-se à barba característica que deu à raça seu visual distinto. Com o tempo, criadores padronizaram sua pelagem rígida, proporções balanceadas e temperamento vigilante.'
  },
  'Shih Tzu': {
    summary: 'O Shih Tzu é um cão pequeno e elegante, com pelagem abundante e temperamento amigável e digno.',
    history: 'Acredita-se que o Shih Tzu tenha origens no Tibete, possivelmente descendendo do Lhasa Apso, e foi levado à China onde se tornou um cão de palácio, apreciado por imperadores e nobres. Durante a Dinastia Ming e especialmente na corte da Imperatriz Viúva Cixi, o Shih Tzu foi cuidadosamente criado e mantido como símbolo de status. Com o tempo, foram exportados para a Europa e América e registraram-se clubes de raça, definindo padrões para sua pelagem luxuosa e conformação compacta.'
  },
  'Dachshund': {
    summary: 'O Dachshund é um cão de corpo longo, pernas curtas e coragem, originalmente especializado na caça de animais dentro de tocas.',
    history: 'A raça Teckel (ou Dachshund) foi desenvolvida na Alemanha nos séculos XVII a XIX para caçar texugos, raposas e outros animais que vivem em tocas subterrâneas. Sua forma alongada e pernas curtas permitiam-lhe penetrar em tocas. Com o tempo, variedades de tamanho (miniatura, padrão) e pelagens (lisa, dura, comprida) foram estabelecidas, e a raça se tornou popular como cão de companhia elegante e audaz.'
  },
  'West Highland White Terrier': {
    summary: 'O Westie é um terrier compacto, branco, vivaz e corajoso, ótimo para ambientes domésticos ou rurais.',
    history: 'O West Highland White Terrier foi desenvolvido na Escócia como variante de terriers locais, especificamente selecionado para pelagem branca para melhor visibilidade durante a caça de pequenas presas. Criadores reforçaram suas características de coragem e estrutura robusta no final do século XIX. Com o tempo, tornou-se popular como cão de companhia e de exposição, mantendo seu temperamento alerta e vivaz.'
  },
  'Yorkshire Terrier': {
    summary: 'O Yorkshire Terrier é um cão toy elegante, pequeno, corajoso e de pelagem longa sedosa.',
    history: 'A raça surgiu no século XIX no Reino Unido, a partir de cães de trabalho trazidos por mineiros da Escócia e do Norte da Inglaterra (como Terriers de Sealyham, Paisley, Maltês etc.). Eles foram cruzados para formar cães pequenos capazes de caçar ratos nas minas e habitações. O Yorkshire Terrier evoluiu como cão de companhia, com pelagem longa e aparência refinada, rapidamente ganhando status de luxo.'
  },
  'English Bulldog': {
    summary: 'O Bulldog Inglês é um cão de porte médio robusto, com estrutura compacta e face enrugada, de temperamento amigável e calmo.',
    history: 'O Bulldog Inglês tem raízes em cães usados nas lutas com touros na Inglaterra (bull-baiting) nos séculos XVI a XIX. Quando essas práticas foram proibidas, criadores passaram a selecionar exemplares mais dóceis com a aparência característica (face achatada, músculos desenvolvidos). No século XIX, o Bulldog Inglaterra passou a ser criado para exposição e companhia, suavizando agressividade e enfatizando traços físicos típicos da raça.'
  },
  'French Bulldog': {
    summary: 'O Bulldog Francês é um cão pequeno e robusto, com orelhas "de morcego" e personalidade afetuosa e charmosa.',
    history: 'O Bulldog Francês é derivado de Bulldogs ingleses transportados para a França, onde foram cruzados com raças locais de companhia (como ratters, toy breeds) no século XIX. Através de seleção, solidificou-se o formato compacto, as orelhas eretas características e o temperamento amigável ideal para ambientes urbanos.'
  },
  // Adicionar Beagle, Bull Terrier, Chihuahua, Chow Chow que não estavam no arquivo
  'Beagle': {
    summary: 'O Beagle é um cão de caça alegre, de porte médio, com excelente olfato e temperamento amigável e sociável.',
    history: 'O Beagle tem origem na Inglaterra, onde foi desenvolvido como cão de caça para perseguir lebres e coelhos. A raça foi refinada ao longo dos séculos, mantendo suas características de resistência, olfato aguçado e temperamento equilibrado. Tornou-se popular como cão de companhia devido à sua personalidade amigável e adaptabilidade.'
  },
  'Bull Terrier': {
    summary: 'O Bull Terrier é um cão corajoso, leal e enérgico, conhecido por sua cabeça única em formato de ovo.',
    history: 'O Bull Terrier foi desenvolvido na Inglaterra no século XIX, resultado do cruzamento entre Bulldogs e Terriers. A raça foi criada para combinar a força do Bulldog com a agilidade do Terrier. Com o tempo, foi refinada para ter o temperamento equilibrado e a aparência distintiva que conhecemos hoje.'
  },
  'Chihuahua': {
    summary: 'O Chihuahua é o menor cão do mundo, corajoso, alerta e muito leal ao seu dono.',
    history: 'O Chihuahua tem origem no México, especificamente no estado de Chihuahua. Acredita-se que descendem de cães antigos dos Toltecas e Astecas. A raça foi descoberta pelos europeus no século XIX e rapidamente se espalhou pelo mundo como cão de companhia devido ao seu tamanho pequeno e personalidade marcante.'
  },
  'Chow Chow': {
    summary: 'O Chow Chow é um cão independente, leal e de aparência leonina, com língua azul característica.',
    history: 'O Chow Chow é uma das raças mais antigas do mundo, com origem na China há mais de 2000 anos. Era usado como cão de guarda, caça e até mesmo como fonte de alimento. A raça foi levada para a Europa no século XIX e rapidamente se tornou popular devido à sua aparência única e temperamento reservado mas leal.'
  }
};

/**
 * Função para obter informações de uma raça
 * @param breedName - Nome da raça em inglês
 * @returns Informações da raça ou fallback
 */
export function getBreedInfo(breedName: string): BreedInfo {
  return breedInfoMap[breedName] || {
    summary: `O ${breedName} é uma raça com características únicas e personalidade marcante.`,
    history: `O ${breedName} tem uma história rica e interessante, sendo uma raça apreciada por suas qualidades especiais.`
  };
}
