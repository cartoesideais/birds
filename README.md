🐦 Flappy Multi-Sky Party
Um jogo multiplayer de Flappy Bird em tempo real, construído com HTML5 Canvas, PeerJS para conexão P2P e Netlify Blobs para gerenciamento de salas e ranking global.

🚀 Funcionalidades "Maestria"
Recentemente o jogo passou por uma série de melhorias críticas para garantir a melhor experiência:

🎮 Multiplayer Sincronizado: O Host controla a geração de obstáculos, garantindo que todos os jogadores vejam os mesmos canos ao mesmo tempo.

🔒 Salas Privadas: Opção de ocultar sua sala da lista pública para jogar apenas com amigos via link/código.

⚡ Ajuste de Velocidade: Controle de dificuldade limitado entre 1.0x e 2.5x para manter o equilíbrio.

💬 Chat Inteligente: Sistema de mensagens dentro da sala com auto-hide após 5 segundos para manter a tela limpa.

🏆 Ranking Global: Lista dos melhores jogadores com suporte a scroll suave, totalmente otimizado para dispositivos móveis.

🛠️ Tecnologias Utilizadas
Frontend: HTML5, CSS3, JavaScript (Canvas API).

Comunicação: PeerJS (WebRTC) para latência quase zero entre jogadores.

Backend (Serverless): Netlify Functions (Node.js).

Banco de Dados: Netlify Blobs para persistência de dados.

📦 Como implantar (Deploy)
Este projeto foi configurado especificamente para a infraestrutura da Netlify.

Clone o repositório:

Bash
git clone https://github.com/seu-usuario/seu-repositorio.git
Instale as dependências das funções:

Bash
npm install
Conecte à Netlify:
Certifique-se de que o arquivo netlify.toml está na raiz com as configurações de publish = "." e functions = "netlify/functions".

Suba para o GitHub:
Ao dar push, a Netlify detectará automaticamente e fará o deploy das funções e do site.

📂 Estrutura de Arquivos
Plaintext
├── index.html          # Jogo, interface e lógica do cliente
├── netlify.toml        # Configuração de build e redirecionamento
├── package.json        # Dependências (Netlify Blobs)
└── netlify/
    └── functions/      # API Serverless
        ├── rooms.js    # Gerenciamento de salas (Create/List/Join)
        └── rankings.js # Sistema de recordes mundiais
🤝 Contribuição
Faça um Fork do projeto.

Crie uma Branch para sua modificação (git checkout -b feature/nova-funcionalidade).

Faça o Commit (git commit -m 'Adicionando funcionalidade X').

dê um Push (git push origin feature/nova-funcionalidade).

Abra um Pull Request.

Desenvolvido com 🕹️ por [Seu Nome]

Dicas extras para o seu GitHub:
Adicione uma Imagem: Se puder, tire um print do jogo e coloque no lugar do texto ![Netlify Status]. Isso atrai muito mais atenção.

Configuração de Repositório: No campo "About" (Sobre) do lado direito do GitHub, coloque o link do site já hospedado na Netlify.

License: Se você não tiver uma, a MIT é a mais comum para projetos abertos.
