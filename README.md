# Posto Granada – Site Institucional

Site institucional do **Auto Posto Parque Granada** (Posto Granada), desenvolvido em HTML, CSS e JavaScript puro — zero dependências de build, pronto para deploy no Vercel.

## Estrutura

```
posto-granada/
├── index.html                   # Página principal
├── politica-de-privacidade.html # Política de privacidade (LGPD)
├── termos-de-uso.html           # Termos de uso
├── 404.html                     # Página de erro 404
├── vercel.json                  # Configuração do Vercel (headers, rotas)
├── robots.txt                   # Instruções para crawlers
├── sitemap.xml                  # Sitemap (atualize a URL após publicar)
└── assets/
    ├── css/
    │   └── styles.css           # Estilos completos
    ├── js/
    │   └── main.js              # Scripts (navbar, form, AOS, etc.)
    └── img/
        └── favicon.svg          # Favicon SVG
```

## Deploy no Vercel

1. Suba este projeto para um repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) → **Add New Project**
3. Importe o repositório
4. Framework Preset: **Other** (sem build step)
5. Clique em **Deploy** — pronto!

## Personalizações necessárias antes de publicar

| O que | Onde |
|---|---|
| Telefone real | `index.html` – todos os `href="tel:..."` e `wa.me/...` |
| Endereço completo | `index.html` – seção `#contato` |
| Embed Google Maps | `index.html` – substituir o `.map-placeholder__inner` pelo `<iframe>` do Maps |
| URL real do site | `sitemap.xml` e meta `og:url` no `index.html` |
| E-mail real | `index.html` e páginas legais |
| Redes sociais | Links `href="#"` nos ícones de Instagram/Facebook |
| Foto OG (compartilhamento) | Adicionar `/assets/img/og-image.jpg` (1200×630px) |

## Tecnologias

- HTML5 semântico
- CSS3 puro (variáveis CSS, Grid, Flexbox, animações)
- JavaScript ES6+ vanilla
- Font Awesome 6 (ícones via CDN)
- Google Fonts – Inter + Barlow Condensed
- `vercel.json` com headers de segurança (HSTS, X-Frame, CSP ready)

## Dados da Empresa

- **Razão Social:** Auto Posto Parque Granada
- **CNPJ:** 01.507.529/0001-69
- **CNAE Principal:** 47.31-8-00 – Comércio varejista de combustíveis
- **CNAE Secundária:** 47.32-6-00 – Comércio varejista de lubrificantes
