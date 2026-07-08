# Frontend Quiz

Aplicacao web de quiz focada em programacao frontend, desenvolvida com React + TypeScript + Vite.

O projeto permite escolher um tema, responder perguntas e visualizar resultado com gabarito ao final.

## Funcionalidades

- Selecao de tema na tela inicial.
- Categorias de frontend: HTML, CSS, JavaScript, TypeScript, React e Entrevistas.
- Sorteio aleatorio de perguntas por tentativa.
- Limite de 10 perguntas por quiz, mesmo que o banco tenha mais.
- Barra de progresso durante a prova.
- Resultado com pontuacao total e percentual de acerto.
- Gabarito completo com resposta do usuario e resposta correta.
- Layout responsivo para mobile, tablet e desktop.
- Alternancia de tema claro/escuro.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- React Icons
- Headless UI

## Como executar localmente

### Requisitos

- Node.js 20+ (recomendado)
- npm

### Passos

1. Instale as dependencias:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Acesse no navegador o endereco exibido no terminal (normalmente http://localhost:5173).

## Scripts disponiveis

- Desenvolvimento:

```bash
npm run dev
```

- Build de producao:

```bash
npm run build
```

- Preview da build:

```bash
npm run preview
```

- Lint:

```bash
npm run lint
```

## Estrutura do projeto

```text
src/
  App.tsx                 # Home e selecao de categorias
  main.tsx                # Configuracao de rotas
  mock/
    Quiz.ts               # Banco de perguntas local
  page/
    QuizQuestion.tsx      # Fluxo de perguntas
    QuizResult.tsx        # Resultado e gabarito
  components/
    Question.tsx          # Componente auxiliar
  service/
    service.ts            # Axios (nao obrigatorio para o mock atual)
```

## Fluxo de uso

1. Usuario escolhe uma categoria na home.
2. Sistema sorteia perguntas aleatoriamente e seleciona no maximo 10.
3. Usuario responde uma pergunta por vez.
4. Ao finalizar, o sistema calcula a pontuacao.
5. Tela de resultado exibe desempenho e gabarito da tentativa.

## Melhorias futuras sugeridas

- Embaralhar alternativas em cada pergunta.
- Persistir historico de tentativas no localStorage.
- Filtro de dificuldade (junior/pleno/senior).
- Temporizador por pergunta.
- Integracao com backend para ranking.

## Licenca

Projeto para fins de estudo e portfolio.
