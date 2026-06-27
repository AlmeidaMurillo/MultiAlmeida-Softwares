# MultiAlmeida Softwares - Frontend Only

Aplicação React/Vite preparada para hospedagem apenas como frontend estático.

## Como rodar

```bash
npm install
npm run dev
```

## Build para hospedagem

```bash
npm run build
```

O resultado fica em `dist/` e pode ser hospedado em Vercel, Netlify, Hostinger, GitHub Pages ou qualquer servidor estático.

## Painel administrativo local

O fluxo administrativo funciona sem backend. Orçamentos, respostas, status e sessão são salvos no `localStorage` do navegador.

Acesso local:

```text
E-mail: admin@multialmeida.com
Senha: admin123
```

Rotas principais:

- `/admin/login`: login local.
- `/admin/dashboard`: cards, funil, últimos orçamentos e ações locais.
- `/admin/orcamentos/novos`: solicitações recebidas.
- `/admin/orcamentos/aguardando`: respostas enviadas e pendentes de retorno.
- `/admin/orcamentos/aceitos`: propostas aprovadas.
- `/admin/orcamentos/recusados`: propostas recusadas ou pausadas.

## Observação importante

Como não existe backend, autenticação e dados não são segurança real de servidor. Esse modelo é ideal para portfólio, demonstração e uso pessoal em um único navegador. Para produção com dados sensíveis, o próximo passo seria integrar uma API, banco de dados e autenticação segura.
