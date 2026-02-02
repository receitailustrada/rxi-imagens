/* PAINEL ESTRATÉGICO CRUZ ALTA 2030 
   Lógica de Negócio, Dados e Geradores de Relatório
*/

const DEFAULT = {
    meta: { updatedISO: new Date().toISOString(), fixedExec: "" },
    municipality: {
        name: "Cruz Alta (RS)",
        pop2010: 62821, pop2022: 58913, pop2024: 60500,
        idhm2010: 0.750, receitas2024_mi: 383.9, despesas2024_mi: 322.0,
        pibTotal2024_bi: 4.4, pibPc2021: 77389,
        pibSplit: { serv: 60.1, agro: 19.9, ind: 10.7, pub: 9.3 },
        caravela: { score: 86.8, rankBR: 154, divers: 97.2, rankRS: 39, rankSUL: 95 }
    },
    soli3: {
        investment_bi: 1.25, location: "Benjamin Nott",
        incentives: { itbi_mi: 0.303, iss_mi: 16.5 },
        commitments: { icms_mi: 201.9, jobs_constr: 1000, jobs_perm: 150, fatur_bi_ano: 2.2 },
        licensing: {
            organ: "SEMA-RS/FEPAM",
            phases: [
                {name:"Estudo prévio", from:"2025Q3", to:"2025Q4"},
                {name:"EIA-RIMA / LP", from:"2025Q4", to:"2025Q4"},
                {name:"Terraplanagem / LI", from:"2026Q1", to:"2026Q1"},
                {name:"Construção", from:"2026Q2", to:"2028Q1"},
                {name:"Operação (LO)", from:"2028Q2", to:"2028Q4"}
            ],
            eiaPublicGap: true
        },
        risks: [
            {k:"Aprovação legislativa/fiscal", sev:"alto", status:"em curso", note:"Revogação automática por descumprimento."},
            {k:"Financiamento opaco", sev:"crítico", status:"não iniciado", note:"Exigir garantias bancárias antes de renúncia."},
            {k:"Infraestrutura logística", sev:"alto", status:"não iniciado", note:"Plano de tráfego, ferrovias e acessos."},
            {k:"Licenciamento ambiental", sev:"crítico", status:"em curso", note:"Acompanhamento de LP/LI/LO e condicionantes."},
            {k:"Mão de obra qualificada", sev:"médio", status:"não iniciado", note:"Parceria com UNICRUZ e Sistema S."},
            {k:"Cadeia de suprimentos local", sev:"médio", status:"não iniciado", note:"Desenvolvimento de fornecedores regionais."},
            {k:"Gestão Comunitária", sev:"alto", status:"não iniciado", note:"Ouvidoria ativa e audiências públicas."}
        ],
        impacts: [
            {cat:"Vegetação/Solo", impact:"Supressão vegetal", mitigate:"Compensação e manejo de fauna"},
            {cat:"Recursos Hídricos", impact:"Consumo e efluentes", mitigate:"Tratamento e reuso de água"},
            {cat:"Emissões Atmosféricas", impact:"Particulados e odores", mitigate:"Filtros industriais e monitoramento"},
            {cat:"Resíduos Sólidos", impact:"Resíduos de processo", mitigate:"PGRS e destinação licenciada"},
            {cat:"Impacto Viário", impact:"Aumento de carga pesada", mitigate:"Novas rotas e sinalização"},
            {cat:"Impacto Social", impact:"Pressão em serviços", mitigate:"Investimento em infraestrutura básica"}
        ]
    },
    education: {
        problems: [
            "Carência de professores em áreas exatas",
            "Passivo de infraestrutura (EE Margarida Pardelhas)",
            "Volatilidade do calendário por eventos climáticos"
        ],
        margarida_mi: 21, alunos_transferidos: 1100,
        law15344_axes: [
            {axis:"Valorização", desc:"Reconhecimento e saúde mental", metric:"Permanência"},
            {axis:"Bolsas", desc:"Auxílio para áreas críticas", metric:"Redução de déficit"},
            {axis:"Seleção", desc:"Prova Nacional Docente", metric:"Vínculo Efetivo"},
            {axis:"Formação", desc:"Bolsa Mais Professores", metric:"Qualificação"}
        ],
        bolsa: {
            deadline: "2026-02-04", vagas_rs: 131, valor_mensal: 2100,
            elegibilidade: "Estágio probatório ou temporários (9ª CRE)",
            cronograma: ["Inscrições: até 04/02", "Preliminar: 06/02", "Final: 13/02"]
        },
        gaps: ["Déficit de indicadores IDEB locais", "Mapeamento nominal de carência"]
    },
    actions: [
        {id:"A1", area:"Soli3", title:"Transparência Financeira", horizon:"2026", metric:"Auditoria 100%", on:true},
        {id:"E1", area:"Educação", title:"Bolsa Mais Professores", horizon:"2026 Q1", metric:"Adesão Total", on:true},
        {id:"D1", area:"Economia", title:"Diversificação do PIB", horizon:"2030", metric:"Serviços +15%", on:true},
        {id:"M1", area:"Ambiental", title:"Monitoramento de Licenças", horizon:"2026-30", metric:"Zero infrações", on:true}
    ],
    notes: ""
};

let STATE = loadState();

function loadState(){
    const raw = localStorage.getItem("ca2030_state");
    return raw ? Object.assign(JSON.parse(JSON.stringify(DEFAULT)), JSON.parse(raw)) : JSON.parse(JSON.stringify(DEFAULT));
}

function saveState(){
    STATE.meta.updatedISO = new Date().toISOString();
    localStorage.setItem("ca2030_state", JSON.stringify(STATE));
}

/* UTILITÁRIOS */
const fmtBR = (n, d=0) => Number(n).toLocaleString('pt-BR', {minimumFractionDigits:d, maximumFractionDigits:d});
const moneyMI = (n) => "R$ " + fmtBR(n, 1) + " mi";
const moneyBI = (n) => "R$ " + fmtBR(n, 2) + " bi";
const qs = (id) => document.getElementById(id);
const setText = (id, t) => { if(qs(id)) qs(id).textContent = t; };

/* NAVEGAÇÃO */
function openView(viewId) {
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    const v = qs(viewId);
    if (v) v.classList.add("active");
}

document.querySelectorAll(".nav-item").forEach(el => {
    el.addEventListener("click", () => {
        document.querySelectorAll(".nav-item").forEach(x => x.classList.remove("active"));
        el.classList.add("active");
        openView(el.dataset.view);
    });
});

/* GERADORES DE TEXTO */
function genExecutiveReport() {
    const m = STATE.municipality;
    const s = STATE.soli3;
    return `RELATÓRIO EXECUTIVO - CRUZ ALTA 2030\n\n` +
           `Município: ${m.name}\n` +
           `População (2024): ${fmtBR(m.pop2024, 0)}\n` +
           `PIB Total: ${moneyBI(m.pibTotal2024_bi)}\n\n` +
           `PROJETO SOLI3:\n` +
           `- Investimento: ${moneyBI(s.investment_bi)}\n` +
           `- Empregos Permanentes: ${s.commitments.jobs_perm}\n` +
           `- Meta ICMS: ${moneyMI(s.commitments.icms_mi)}\n\n` +
           `Gerado em: ${new Date().toLocaleString('pt-BR')}`;
}

/* INICIALIZAÇÃO */
window.onload = () => {
    console.log("Painel Cruz Alta 2030 Iniciado.");
    setText("execSnapshot", "Diagnóstico carregado com sucesso.");
    // Aqui você chamaria as outras funções de renderização
};