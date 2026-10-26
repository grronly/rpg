# Crônicas de Eldoria — RPG de navegador

Um RPG simples feito com HTML, CSS e JavaScript puro. Não precisa instalar dependências, servidor ou framework.

## Como executar localmente
1. Baixe ou clone este repositório.
2. Abra `index.html` no navegador.

## Como publicar com GitHub Pages
1. Crie um repositório no GitHub.
2. Envie o arquivo `index.html` e este `README.md` para a raiz do repositório.
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/(root)`, depois clique em **Save**.
6. Aguarde a publicação. O GitHub mostrará o endereço do webapp na seção Pages.

## Como jogar
- **Explorar a floresta:** encontra criaturas, ganha XP e moedas.
- **Descansar:** troca 4 moedas por recuperação de vida.
- **Usar poção:** recupera até 15 pontos de vida.
- **Falar com a anciã:** recebe orientação da missão.
- Suba de nível, derrote pelo menos três criaturas e alcance o nível 3 para enfrentar o Guardião Sombrio.

O progresso é salvo localmente no navegador usando `localStorage`; ele não é sincronizado entre dispositivos.

## Personalização
O projeto está todo em `index.html`. Você pode alterar textos, cores, inimigos, recompensas e regras diretamente no CSS e no JavaScript.
