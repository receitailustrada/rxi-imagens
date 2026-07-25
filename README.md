# 💊 Ecossistema RXI - Repositório de Imagens (rxi-imagens)

![Status](https://img.shields.io/badge/Status-Ativo-success)
![Design](https://img.shields.io/badge/Design-Material_UI-blue)
![Uso](https://img.shields.io/badge/Uso-Clínico%20%2F%20APS-00A651)

Bem-vindo ao repositório oficial de ativos visuais do **Ecossistema RXI (Receita Ilustrada)**. Este repositório centraliza todas as ilustrações, ícones e renderizações 3D utilizados nas plataformas de saúde digital e prescrições médicas visuais.

## 🎯 Objetivo
Fornecer uma base sólida e padronizada de recursos visuais para modernizar a Atenção Primária à Saúde (APS). Através de elementos visuais claros (como cápsulas, indicações anatômicas de dor e exercícios), o projeto RXI busca aumentar a adesão ao tratamento, facilitando a compreensão do paciente e desburocratizando a comunicação clínica.

## 📂 Estrutura e Padrão de Nomenclatura
Os arquivos estão exportados no formato `.png` com fundo transparente, garantindo uma integração perfeita com interfaces web limpas e geradores automáticos de prescrição.

As imagens estão organizadas intuitivamente para facilitar a chamada via código:
- **Medicamentos e Posologia:** `1capsula-azul.png`, `1capsula-marrom.png`, `1comp-white.png`, `01-1cp-dor-febre.png`
- **Anatomia e Focos de Dor:** `001-dor-pe.png`, `001-dor-quadril.png`, `001-joelho-articular.png`
- **Recomendações Não-Farmacológicas:** `01-bicicleta001.png`, `01-eliptico.png`, `01-tenisconfort.png`

## 🎨 Identidade Visual e Integração
Os ativos foram projetados com foco em alta usabilidade e design institucional:
* **Backgrounds:** Feitos para sobrepor perfeitamente fundos em estilo *dot grid* ou brancos.
* **Tipografia Complementar:** Em sistemas web e impressos, recomenda-se o uso da fonte **Montserrat** (pesos 400 a 700) acompanhando estas imagens.
* **Cores Institucionais:** Os ícones conversam diretamente com as variáveis CSS de paletas de saúde (ex: `#0070BA`, `#00A651`).

## ⚙️ Notas de Desenvolvimento
Ao integrar este repositório com sistemas geradores de PDF ou dashboards clínicos locais, lembre-se de referenciar o caminho correto das imagens. Para protótipos focados em velocidade e privacidade, essas imagens podem ser carregadas de forma estática, complementando estratégias de armazenamento via `LocalStorage`.

---
*Ecossistema RXI - Ferramentas digitais para gestão clínica e saúde humanizada.*
