# 🏥 MediClinic - Sistema de Gestão de Consultório Médico

Sistema completo e moderno para gerenciamento de consultório médico, desenvolvido com React, Tailwind CSS e Vite.

![MediClinic](https://img.shields.io/badge/MediClinic-v1.0.0-teal)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.6-38bdf8)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646cff)

## ✨ Funcionalidades

### 📊 Dashboard
- Visão geral com estatísticas em tempo real
- Consultas do dia com status
- Resumo financeiro
- Atividades recentes

### 👥 Gestão de Pacientes
- Cadastro completo (dados pessoais, convênio, alergias)
- Busca por nome, CPF ou telefone
- Cartões visuais com informações importantes
- Alertas de alergias em destaque

### 📅 Agenda
- Visualização por dia ou lista
- Navegação entre datas
- Status: pendente, confirmado, aguardando, finalizado, cancelado
- Atualização rápida de status

### 📋 Prontuários
- Histórico completo de atendimentos
- Sinais vitais (PA, FC, temperatura, peso, altura)
- Queixa, diagnóstico e prescrição
- Timeline de consultas

### 💰 Financeiro
- Receitas e despesas
- Categorização automática
- Formas de pagamento
- Controle de status (pago/pendente)

### 📈 Relatórios
- Receitas/despesas por categoria
- Taxa de comparecimento
- Ticket médio
- Gráficos de desempenho

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/mediclinic.git

# Entre na pasta
cd mediclinic

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

O app estará disponível em `http://localhost:3000`

### Build para Produção

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`

## 🌐 Deploy no GitHub Pages

### Configuração Automática (Recomendado)

O projeto já vem configurado com GitHub Actions para deploy automático:

1. **Crie um repositório no GitHub** chamado `mediclinic`

2. **Faça o push do código:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/mediclinic.git
git push -u origin main
```

3. **Configure o GitHub Pages:**
   - Vá em Settings → Pages
   - Em "Source", selecione "GitHub Actions"
   - O deploy será feito automaticamente!

4. **Acesse seu site:**
   - `https://SEU_USUARIO.github.io/mediclinic/`

### Deploy Manual (Alternativo)

```bash
npm run deploy
```

## ⚙️ Configuração

### Alterar nome do repositório

Se seu repositório tiver outro nome, altere em `vite.config.js`:

```js
export default defineConfig({
  base: '/NOME_DO_SEU_REPOSITORIO/',
  // ...
})
```

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **Vite 5** - Build tool
- **Tailwind CSS 3** - Estilização
- **Lucide React** - Ícones
- **GitHub Actions** - CI/CD

## 📁 Estrutura do Projeto

```
mediclinic/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions
├── public/
│   └── favicon.svg         # Ícone
├── src/
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Ponto de entrada
│   └── index.css           # Estilos globais
├── index.html              # HTML principal
├── package.json            # Dependências
├── vite.config.js          # Configuração Vite
├── tailwind.config.js      # Configuração Tailwind
└── README.md               # Documentação
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

Desenvolvido com ❤️ para profissionais da saúde
