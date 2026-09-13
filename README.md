<div align="center">

# 🔐 LetsSign — É simples assinar!

![NEXT FIAP 2025](https://img.shields.io/badge/NEXT_FIAP_2025-%F0%9F%8F%86_1%C2%BA_LUGAR-FFD700?style=for-the-badge&labelColor=0B0A14)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

[🔗 Ver demo ao vivo](https://bellacarmobrito.github.io/challenge-letssign-frontend/)

</div>

## Sobre o projeto

Protótipo funcional desenvolvido para o **Challenge FIAP em parceria com a LetsSign**, plataforma de assinatura eletrônica de documentos. O desafio propôs explorar **novas formas de comprovar a autenticidade de quem assina um documento digitalmente**, reforçando a validade jurídica das assinaturas eletrônicas.

Esta interface simula, ponta a ponta, o fluxo de um usuário enviando um contrato para assinatura e escolhendo — via drag-and-drop — um método reforçado de verificação de identidade antes de confirmar a assinatura.

🏆 Solução vencedora (1º lugar) do **NEXT FIAP 2025**.

## Funcionalidades

- **Visualização e assinatura de contrato** — tela inicial com preview do documento e ação de prosseguir para assinatura.
- **Seleção do método de verificação via drag-and-drop** — o usuário arrasta a opção *Reconhecimento Facial* ou *Biometria Digital* diretamente sobre o documento para vinculá-la à assinatura.
- **Reconhecimento facial simulado** — acesso à câmera do navegador (`MediaDevices.getUserMedia`) com feedback visual em tempo real (quadrante de detecção, ícones de verificação) até a confirmação da identidade.
- **Biometria digital simulada** — mesmo fluxo de captura por câmera, adaptado para leitura de impressão digital.
- **Verificação de RG** — etapa de captura e validação do documento de identidade antes da biometria/reconhecimento facial.
- **Autenticação via Gov.br** — exibida na tela de visualização do contrato como camada adicional de validação de identidade.
- **Disclaimers e mensagens de boas-vindas** contextuais para cada método de verificação escolhido.
- **Design responsivo** construído com Bootstrap 5 e Bootstrap Icons.

> O desafio também propôs abordagens complementares — como registro das evidências de assinatura em **blockchain** e integração multifator (SMS/WhatsApp/e-mail) — detalhadas na documentação de solução da equipe, mesmo fora do escopo deste protótipo de front-end.

## Tecnologias

- HTML5 semântico
- CSS3 (estilos próprios por página, em `css/`)
- [Bootstrap 5.3.3](https://getbootstrap.com/) + [Bootstrap Icons](https://icons.getbootstrap.com/)
- JavaScript (vanilla) — manipulação de DOM, Drag and Drop API, MediaDevices API
- Google Fonts (Inter, Mulish)

Projeto 100% estático, sem dependências de build ou empacotador.

## Como rodar localmente

Não há etapa de build — basta servir os arquivos estáticos:

```bash
# Opção 1: extensão Live Server do VS Code, botão direito em index.html → "Open with Live Server"

# Opção 2: um servidor HTTP simples
npx serve .
```

> ⚠️ As telas de reconhecimento facial e biometria pedem acesso à câmera (`getUserMedia`). Navegadores só liberam esse acesso em contexto seguro (`https://` ou `localhost`) — abrir o `index.html` direto como arquivo (`file://`) faz a câmera falhar silenciosamente.

## Estrutura do projeto

```
├── index.html                  # Tela inicial — visualização do contrato
├── assets/                     # Ícones, ilustrações e imagens
├── css/                        # Estilos por página/fluxo
├── docs/                       # Contrato-modelo usado no protótipo
├── js/
│   ├── drag-and-drop.js        # Seleção do método de verificação
│   └── reconhecimento-visual.js# Simulação de câmera (facial/biometria/RG)
├── modelos/                    # Telas de modelo (empresa / usuário)
└── pages/                      # Fluxo completo: disclaimers, boas-vindas,
                                 # verificação de RG, biometria, facial e assinatura
```

## Equipe

| Nome | RM |
|---|---|
| Beatriz Silva Rosa | RM559606 |
| **Isabella Gomes do Carmo Brito** | RM560036 |
| Levir dos Santos | RM559328 |
| Nina Feres Vieira de Carvalho | RM559267 |
| Stephanie Gomes dos Santos | RM561044 |

---

<div align="center">Desenvolvido como parte do curso de Análise e Desenvolvimento de Sistemas — FIAP</div>
