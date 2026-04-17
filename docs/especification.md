# Especificações do Projeto

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

Caso deseje atribuir uma imagem a sua persona, utilize o site https://thispersondoesnotexist.com/

## Personas

Pedro Paulo tem 26 anos, é arquiteto recém-formado e autônomo. Pensa em se desenvolver profissionalmente através de um mestrado fora do país, pois adora viajar, é solteiro e sempre quis fazer um intercâmbio. Está buscando uma agência que o ajude a encontrar universidades na Europa que aceitem alunos estrangeiros.

Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

| Eu como... | Quero/Desejo... | Para... |
|------------|----------------|---------|
| Consumidora (Mariana) | Localizar prestadores de serviço próximos à minha residência, como eletricistas, encanadores e diaristas | Economizar tempo e encontrar opções confiáveis na região |
| Consumidora (Carol) | Consultar avaliações de outros usuários sobre prestadores de serviços como salões de beleza, mecânicos e serviços de manutenção | Tomar decisões mais seguras antes de contratar |
| Microempreendedor (João), eletricista autônomo | Gerenciar meu catálogo de serviços, como instalações elétricas e manutenção residencial | Manter as ofertas atualizadas e atrativas para os clientes |
| Microempreendedor (Rodrigo) | Disponibilizar um meio de contato direto para os clientes | Facilitar a comunicação e aumentar as chances de fechar vendas |

## Requisitos

### Requisitos Funcionais

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF-01 | O sistema deve filtrar e exibir estabelecimentos com base na geolocalização do usuário | Alta |
| RF-02 | O sistema deve permitir a visualização detalhada do catálogo de serviços do anunciante, incluindo descrição, preço e imagens | Alta |
| RF-03 | O sistema deve exibir avaliações e comentários de outros usuários sobre os prestadores de serviço | Média |
| RF-04 | O sistema deve disponibilizar botões de contato direto, como WhatsApp e telefone, no perfil do anunciante | Alta |
| RF-05 | O sistema deve permitir que o empreendedor cadastre, edite e exclua seus serviços por meio de uma interface de gestão | Alta |

### Requisitos não Funcionais

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RNF-01 | A interface deve seguir padrões de design responsivo para garantir compatibilidade em diferentes dispositivos e tamanhos de tela | Alta |
| RNF-02 | O sistema deve processar requisições de busca com tempo de resposta inferior a 2 segundos | Alta |
| RNF-03 | Os dados sensíveis dos usuários devem ser protegidos por criptografia e autenticação segura, conforme normas de proteção de dados | Alta |
| RNF-04 | A interface de gestão do empreendedor deve ser intuitiva, reduzindo a curva de aprendizagem para usuários com baixo domínio tecnológico | Alta |
| RNF-05 | O sistema deve garantir a integridade dos dados de avaliações, prevenindo manipulação indevida | Média |
| RNF-06 | A plataforma deve utilizar geolocalização com precisão mínima de 50 metros para exibir resultados relevantes | Alta |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
