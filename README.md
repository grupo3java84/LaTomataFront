### 🍅 La Tomata - Front-End


O **La Tomata** é uma aplicação web voltada para o setor gastronômico, desenvolvida para oferecer uma experiência de cardápio digital moderna, fluida e dinâmica. Este repositório concentra a camada de **Front-End** do sistema, que consome uma API REST robusta integrada a um ecossistema completo de gestão e governança de dados. 

### 🚀 Funcionalidades Principais

* **Catálogo de Produtos Público:** Clientes e visitantes anônimos podem visualizar todo o menu de pratos, preços, fotos e especificações de forma ultra rápida.
* **Filtros Inteligentes:** Visualização segmentada por categorias e destaque para opções saudáveis do cardápio.
* **Gerenciamento Administrativo (CRUD):** Área protegida por autenticação restrita, permitindo que usuários administradores cadastrem, listem, editem e excluam categorias e produtos diretamente pela interface.
* **Autenticação Segura:** Controle de sessão de usuários utilizando criptografia e persistência dinâmica via Context API.
* **Interface Responsiva:** Design elegante e fluido que se adapta perfeitamente a computadores, tablets e celulares.

### 🛠️ Tecnologias e Ferramentas

### Front-End

* **React com TypeScript:** Construção de uma interface baseada em componentes reaproveitáveis, com tipagem estática que previne erros em tempo de desenvolvimento.
* **Tailwind CSS:** Framework utilitário para estilização ágil, garantindo um visual limpo, moderno e otimizado.
* **Axios:** Cliente HTTP responsável pelas requisições assíncronas de dados entre a interface e o servidor.

### Integração com o Back-End

* **Spring Framework (Java):** O núcleo do servidor onde residem as regras de negócio e validações de segurança.
* **Banco de Dados Relacional SQL:** Armazenamento persistente e estruturado de usuários, produtos e categorias.
* **Swagger:** Plataforma de documentação interativa para teste e mapeamento das rotas da API.

### Deploy e Hospedagem

* **Vercel:** Plataforma em nuvem responsável pela hospedagem e distribuição rápida da interface visual (Front-End).
* **Render:** Servidor de hospedagem em nuvem utilizado para manter o Back-End e o Banco de Dados ativos na internet.

### 👥 Gestão e Metodologia de Desenvolvimento

O projeto foi construído seguindo os mais altos padrões de governança corporativa e desenvolvimento colaborativo de software do mercado: 

* **Metodologia Ágil Scrum:** Divisão do escopo do projeto em ciclos semanais de entrega, garantindo flexibilidade e melhoria contínua.
* **Planejamento de Backlogs:** Uso estratégico de planilhas para mapeamento de requisitos de negócios, distribuição clara de tarefas e controle de prazos da equipe.
* **Alinhamento Diário (Daily Meetings):** Reuniões diárias de 15 minutos via **Discord** para sincronizar o progresso do time, planejar os próximos passos e mitigar impedimentos.
* **Controle de Versão:** Uso estrito de **Git e GitHub** como central de controle, garantindo colaboração segura, rastreabilidade de código e transparência durante todo o desenvolvimento.

### 🔧 Como Executar o Projeto Localmente

1. **Clone o repositório:** 

bash

git clone https://github.com/grupo3java84/LaTomataFront.git

Use o código com cuidado.
2. **Acesse a pasta do projeto:** 

bash

cd LaTomataFront

Use o código com cuidado.
3. **Instale as dependências:** 

bash

npm install

Use o código com cuidado.
4. **Configure a URL da API:**
Certifique-se de validar se as requisições estão apontando para o servidor principal em produção (https://latomata.onrender.com).
5. **Inicie o servidor de desenvolvimento:** 

bash

npm run dev

Use o código com cuidado.

O site estará disponível no seu navegador no endereço padrão http://localhost:5173.

### 📄 Licença

Este projeto faz parte de um escopo educacional e prático voltado ao mercado corporativo de tecnologia. Sinta-se livre para explorar o código.
