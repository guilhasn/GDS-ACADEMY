# Exercício 1 — Mapeamento de Stakeholders

## Objetivo

Este exercício prático visa desenvolver competências de identificação, análise e gestão de stakeholders em projetos de Data Governance. Os alunos aprenderão a mapear partes interessadas, avaliar a sua influência e interesse, e definir estratégias de comunicação adequadas.

## Checklist do Exercício

- [ ] Identificar pelo menos 5-8 stakeholders relevantes para um projeto de DG
- [ ] Avaliar cada stakeholder nas escalas de Influência (1-5) e Interesse (1-5)
- [ ] Classificar automaticamente cada stakeholder no quadrante apropriado
- [ ] Definir mensagens-chave personalizadas para cada grupo
- [ ] Selecionar canais e frequências de comunicação adequados
- [ ] Exportar o mapeamento final em formato CSV para análise posterior

## Critérios de Avaliação

| Critério | Insuficiente | Satisfatório | Excelente |
|----------|-------------|-------------|-----------|
| **Identificação** | < 4 stakeholders | 5-7 stakeholders | 8+ stakeholders diversos |
| **Análise** | Avaliações imprecisas | Escalas coerentes | Análise fundamentada |
| **Estratégia** | Mensagens genéricas | Personalizadas por grupo | Específicas por stakeholder |
| **Canais** | Canais inadequados | Apropriados ao quadrante | Otimizados e diversificados |

---

## Widget Interativo: Mapeamento de Stakeholders

<style>
.stakeholder-widget {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    max-width: 100%;
    margin: 20px 0;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background: #fafafa;
}

.stakeholder-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.stakeholder-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s;
}

.btn-primary { background: #1976d2; color: white; }
.btn-primary:hover { background: #1565c0; }
.btn-success { background: #388e3c; color: white; }
.btn-success:hover { background: #2e7d32; }
.btn-secondary { background: #757575; color: white; }
.btn-secondary:hover { background: #616161; }
.btn-warning { background: #f57c00; color: white; }
.btn-warning:hover { background: #ef6c00; }

.stakeholder-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-size: 13px;
}

.stakeholder-table th,
.stakeholder-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.stakeholder-table th {
    background: #e0e0e0;
    font-weight: 600;
    position: sticky;
    top: 0;
}

.stakeholder-table input,
.stakeholder-table select {
    width: 100%;
    border: none;
    padding: 4px;
    font-size: 12px;
    background: transparent;
}

.stakeholder-table input:focus,
.stakeholder-table select:focus {
    background: white;
    outline: 2px solid #1976d2;
}

.quadrant-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 20px;
    padding: 15px;
    background: white;
    border-radius: 6px;
    border: 1px solid #ddd;
}

.quadrant-card {
    padding: 12px;
    border-radius: 4px;
    border-left: 4px solid;
}

.quadrant-high { border-left-color: #d32f2f; background: #ffebee; }
.quadrant-maintain { border-left-color: #f57c00; background: #fff3e0; }
.quadrant-inform { border-left-color: #1976d2; background: #e3f2fd; }
.quadrant-monitor { border-left-color: #388e3c; background: #e8f5e8; }

.quadrant-card h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 600;
}

.quadrant-card ul {
    margin: 0;
    padding-left: 16px;
    font-size: 12px;
}

.quadrant-card li {
    margin-bottom: 4px;
}

.table-container {
    overflow-x: auto;
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
}

@media (max-width: 768px) {
    .stakeholder-controls {
        flex-direction: column;
    }
    
    .stakeholder-btn {
        width: 100%;
    }
}
</style>

<div class="stakeholder-widget">
    <div class="stakeholder-controls">
        <button class="stakeholder-btn btn-success" onclick="carregarExemplo()">🎲 Carregar Exemplo</button>
        <button class="stakeholder-btn btn-primary" onclick="adicionarStakeholder()">➕ Adicionar Stakeholder</button>
        <button class="stakeholder-btn btn-secondary" onclick="limparTabela()">🗑️ Limpar Tabela</button>
        <button class="stakeholder-btn btn-warning" onclick="exportarCSV()">📊 Exportar CSV</button>
    </div>

    <div class="table-container">
        <table class="stakeholder-table" id="stakeholdersTable">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Função</th>
                    <th>Papel</th>
                    <th>Influência<br>(1-5)</th>
                    <th>Interesse<br>(1-5)</th>
                    <th>Poder<br>(1-5)</th>
                    <th>Risco</th>
                    <th>Quadrante</th>
                    <th>Mensagem-chave</th>
                    <th>Canal</th>
                    <th>Frequência</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody id="stakeholdersBody">
                <!-- Linhas serão adicionadas dinamicamente -->
            </tbody>
        </table>
    </div>

    <div class="quadrant-info">
        <div class="quadrant-card quadrant-high">
            <h4>🔴 Gerir de Perto (Inf≥4, Int≥4)</h4>
            <ul>
                <li>Envolvimento ativo e direto</li>
                <li>Comunicação frequente e detalhada</li>
                <li>Participação em decisões-chave</li>
            </ul>
        </div>
        
        <div class="quadrant-card quadrant-maintain">
            <h4>🟠 Manter Satisfeito (Inf≥4, Int≤3)</h4>
            <ul>
                <li>Atualizações regulares sobre progresso</li>
                <li>Demonstrar valor e benefícios</li>
                <li>Evitar surpresas negativas</li>
            </ul>
        </div>
        
        <div class="quadrant-card quadrant-inform">
            <h4>🔵 Manter Informado (Inf≤3, Int≥4)</h4>
            <ul>
                <li>Partilhar informações relevantes</li>
                <li>Newsletters e dashboards</li>
                <li>Consultar sobre impactos</li>
            </ul>
        </div>
        
        <div class="quadrant-card quadrant-monitor">
            <h4>🟢 Monitorizar (Restantes)</h4>
            <ul>
                <li>Comunicação básica e eficiente</li>
                <li>Acompanhar mudanças de posição</li>
                <li>Esforço mínimo mas consistente</li>
            </ul>
        </div>
    </div>
</div>

<script>
let stakeholders = [];
let exemploIndex = 0;

const exemplos = [
    {
        tipo: "Autarquia",
        stakeholders: [
            {
                nome: "Presidente da Câmara",
                funcao: "Autarca",
                papel: "Sponsor",
                influencia: 5,
                interesse: 4,
                poder: 5,
                risco: "Médio",
                mensagem: "Transparência e modernização dos serviços municipais",
                canal: "Reunião",
                frequencia: "Mensal"
            },
            {
                nome: "Diretor de Sistemas",
                funcao: "CIO Municipal",
                papel: "CIO/CDO",
                influencia: 4,
                interesse: 5,
                poder: 4,
                risco: "Baixo",
                mensagem: "Eficiência tecnológica e integração de sistemas",
                canal: "Workshop",
                frequencia: "Quinzenal"
            },
            {
                nome: "Responsável RGPD",
                funcao: "DPO",
                papel: "DPO",
                influencia: 3,
                interesse: 5,
                poder: 3,
                risco: "Médio",
                mensagem: "Conformidade legal e proteção de dados pessoais",
                canal: "Comité",
                frequencia: "Mensal"
            },
            {
                nome: "Chefe Divisão Financeira",
                funcao: "CFO",
                papel: "Data Owner",
                influencia: 3,
                interesse: 3,
                poder: 3,
                risco: "Baixo",
                mensagem: "ROI e sustentabilidade financeira do projeto",
                canal: "Dashboard",
                frequencia: "Mensal"
            }
        ]
    },
    {
        tipo: "Banco",
        stakeholders: [
            {
                nome: "CEO",
                funcao: "Chief Executive",
                papel: "Sponsor",
                influencia: 5,
                interesse: 4,
                poder: 5,
                risco: "Alto",
                mensagem: "Vantagem competitiva e compliance regulatório",
                canal: "Reunião",
                frequencia: "Mensal"
            },
            {
                nome: "Chief Risk Officer",
                funcao: "CRO",
                papel: "Data Owner",
                influencia: 4,
                interesse: 5,
                poder: 4,
                risco: "Alto",
                mensagem: "Gestão de risco e qualidade de dados para decisões",
                canal: "Comité",
                frequencia: "Quinzenal"
            },
            {
                nome: "Data Protection Officer",
                funcao: "DPO",
                papel: "DPO",
                influencia: 3,
                interesse: 5,
                poder: 3,
                risco: "Médio",
                mensagem: "Proteção de dados e conformidade RGPD",
                canal: "Workshop",
                frequencia: "Mensal"
            },
            {
                nome: "Diretor TI",
                funcao: "CTO",
                papel: "CIO/CDO",
                influencia: 4,
                interesse: 4,
                poder: 4,
                risco: "Médio",
                mensagem: "Arquitetura de dados e infraestrutura segura",
                canal: "Dashboard",
                frequencia: "Semanal"
            }
        ]
    },
    {
        tipo: "Cadeia de Supermercados",
        stakeholders: [
            {
                nome: "CEO",
                funcao: "Chief Executive",
                papel: "Sponsor",
                influencia: 5,
                interesse: 3,
                poder: 5,
                risco: "Médio",
                mensagem: "Crescimento de vendas e otimização operacional",
                canal: "Dashboard",
                frequencia: "Mensal"
            },
            {
                nome: "Diretor Comercial",
                funcao: "Chief Commercial",
                papel: "Data Owner",
                influencia: 4,
                interesse: 5,
                poder: 4,
                risco: "Baixo",
                mensagem: "Analytics de clientes e personalização",
                canal: "Workshop",
                frequencia: "Quinzenal"
            },
            {
                nome: "Responsável Logística",
                funcao: "Head of Supply Chain",
                papel: "Steward",
                influencia: 3,
                interesse: 4,
                poder: 3,
                risco: "Baixo",
                mensagem: "Otimização de stocks e supply chain",
                canal: "Newsletter",
                frequencia: "Mensal"
            },
            {
                nome: "Chief Information Officer",
                funcao: "CIO",
                papel: "CIO/CDO",
                influencia: 4,
                interesse: 4,
                poder: 4,
                risco: "Baixo",
                mensagem: "Integração de sistemas e data lakes",
                canal: "Reunião",
                frequencia: "Semanal"
            }
        ]
    },
    {
        tipo: "Universidade",
        stakeholders: [
            {
                nome: "Reitor",
                funcao: "Reitor",
                papel: "Sponsor",
                influencia: 5,
                interesse: 3,
                poder: 5,
                risco: "Médio",
                mensagem: "Excelência académica e reputação institucional",
                canal: "Reunião",
                frequencia: "Mensal"
            },
            {
                nome: "Pró-Reitor Académico",
                funcao: "Academic VP",
                papel: "Data Owner",
                influencia: 4,
                interesse: 5,
                poder: 4,
                risco: "Baixo",
                mensagem: "Sucesso estudantil e analytics académicos",
                canal: "Workshop",
                frequencia: "Quinzenal"
            },
            {
                nome: "Diretor Serviços TI",
                funcao: "IT Director",
                papel: "CIO/CDO",
                influencia: 3,
                interesse: 4,
                poder: 3,
                risco: "Baixo",
                mensagem: "Sistemas integrados e segurança de dados",
                canal: "Dashboard",
                frequencia: "Semanal"
            },
            {
                nome: "Responsável RGPD",
                funcao: "DPO",
                papel: "DPO",
                influencia: 2,
                interesse: 5,
                poder: 2,
                risco: "Médio",
                mensagem: "Proteção de dados estudantis e investigação",
                canal: "Email",
                frequencia: "Mensal"
            }
        ]
    }
];

function calcularQuadrante(influencia, interesse) {
    if (influencia >= 4 && interesse >= 4) return "Gerir de Perto";
    if (influencia >= 4 && interesse <= 3) return "Manter Satisfeito";
    if (influencia <= 3 && interesse >= 4) return "Manter Informado";
    return "Monitorizar";
}

function adicionarLinhaTabela(stakeholder = null) {
    const tbody = document.getElementById('stakeholdersBody');
    const tr = document.createElement('tr');
    
    const defaultStakeholder = stakeholder || {
        nome: '',
        funcao: '',
        papel: 'Data Owner',
        influencia: 3,
        interesse: 3,
        poder: 3,
        risco: 'Médio',
        mensagem: '',
        canal: 'Email',
        frequencia: 'Mensal'
    };

    tr.innerHTML = `
        <td><input type="text" value="${defaultStakeholder.nome}" placeholder="Nome do stakeholder"></td>
        <td><input type="text" value="${defaultStakeholder.funcao}" placeholder="Função na organização"></td>
        <td>
            <select>
                <option value="Sponsor" ${defaultStakeholder.papel === 'Sponsor' ? 'selected' : ''}>Sponsor</option>
                <option value="Data Owner" ${defaultStakeholder.papel === 'Data Owner' ? 'selected' : ''}>Data Owner</option>
                <option value="Steward" ${defaultStakeholder.papel === 'Steward' ? 'selected' : ''}>Steward</option>
                <option value="DPO" ${defaultStakeholder.papel === 'DPO' ? 'selected' : ''}>DPO</option>
                <option value="CISO" ${defaultStakeholder.papel === 'CISO' ? 'selected' : ''}>CISO</option>
                <option value="CIO/CDO" ${defaultStakeholder.papel === 'CIO/CDO' ? 'selected' : ''}>CIO/CDO</option>
                <option value="Business User" ${defaultStakeholder.papel === 'Business User' ? 'selected' : ''}>Business User</option>
            </select>
        </td>
        <td><input type="number" min="1" max="5" value="${defaultStakeholder.influencia}" onchange="atualizarQuadrante(this)"></td>
        <td><input type="number" min="1" max="5" value="${defaultStakeholder.interesse}" onchange="atualizarQuadrante(this)"></td>
        <td><input type="number" min="1" max="5" value="${defaultStakeholder.poder}"></td>
        <td>
            <select>
                <option value="Baixo" ${defaultStakeholder.risco === 'Baixo' ? 'selected' : ''}>Baixo</option>
                <option value="Médio" ${defaultStakeholder.risco === 'Médio' ? 'selected' : ''}>Médio</option>
                <option value="Alto" ${defaultStakeholder.risco === 'Alto' ? 'selected' : ''}>Alto</option>
            </select>
        </td>
        <td class="quadrante">${calcularQuadrante(defaultStakeholder.influencia, defaultStakeholder.interesse)}</td>
        <td><input type="text" value="${defaultStakeholder.mensagem}" placeholder="Mensagem-chave para este stakeholder"></td>
        <td>
            <select>
                <option value="Reunião" ${defaultStakeholder.canal === 'Reunião' ? 'selected' : ''}>Reunião</option>
                <option value="Workshop" ${defaultStakeholder.canal === 'Workshop' ? 'selected' : ''}>Workshop</option>
                <option value="Dashboard" ${defaultStakeholder.canal === 'Dashboard' ? 'selected' : ''}>Dashboard</option>
                <option value="Newsletter" ${defaultStakeholder.canal === 'Newsletter' ? 'selected' : ''}>Newsletter</option>
                <option value="Email" ${defaultStakeholder.canal === 'Email' ? 'selected' : ''}>Email</option>
                <option value="Comité" ${defaultStakeholder.canal === 'Comité' ? 'selected' : ''}>Comité</option>
            </select>
        </td>
        <td>
            <select>
                <option value="Semanal" ${defaultStakeholder.frequencia === 'Semanal' ? 'selected' : ''}>Semanal</option>
                <option value="Quinzenal" ${defaultStakeholder.frequencia === 'Quinzenal' ? 'selected' : ''}>Quinzenal</option>
                <option value="Mensal" ${defaultStakeholder.frequencia === 'Mensal' ? 'selected' : ''}>Mensal</option>
                <option value="Pontual" ${defaultStakeholder.frequencia === 'Pontual' ? 'selected' : ''}>Pontual</option>
            </select>
        </td>
        <td><button onclick="removerLinha(this)" style="background: #d32f2f; color: white; border: none; padding: 4px 8px; border-radius: 2px; cursor: pointer;">❌</button></td>
    `;
    
    tbody.appendChild(tr);
}

function atualizarQuadrante(input) {
    const tr = input.closest('tr');
    const influencia = parseInt(tr.children[3].querySelector('input').value);
    const interesse = parseInt(tr.children[4].querySelector('input').value);
    const quadranteCell = tr.children[7];
    quadranteCell.textContent = calcularQuadrante(influencia, interesse);
}

function adicionarStakeholder() {
    adicionarLinhaTabela();
}

function removerLinha(btn) {
    if (confirm('Tem a certeza que deseja remover este stakeholder?')) {
        btn.closest('tr').remove();
    }
}

function limparTabela() {
    if (confirm('Tem a certeza que deseja limpar toda a tabela?')) {
        document.getElementById('stakeholdersBody').innerHTML = '';
    }
}

function carregarExemplo() {
    const exemplo = exemplos[exemploIndex];
    exemploIndex = (exemploIndex + 1) % exemplos.length;
    
    // Limpar tabela atual
    document.getElementById('stakeholdersBody').innerHTML = '';
    
    // Adicionar variação nos dados para cada clique
    exemplo.stakeholders.forEach(s => {
        // Pequenas variações aleatórias nos valores
        const stakeholder = {
            ...s,
            influencia: Math.max(1, Math.min(5, s.influencia + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2))),
            interesse: Math.max(1, Math.min(5, s.interesse + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2))),
            poder: Math.max(1, Math.min(5, s.poder + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2)))
        };
        
        adicionarLinhaTabela(stakeholder);
    });
}

function exportarCSV() {
    const BOM = '\ufeff';
    let csv = BOM + 'Nome;Função;Papel;Influência;Interesse;Poder;Risco;Quadrante;Mensagem-chave;Canal;Frequência\n';
    
    const tbody = document.getElementById('stakeholdersBody');
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const nome = cells[0].querySelector('input').value;
        const funcao = cells[1].querySelector('input').value;
        const papel = cells[2].querySelector('select').value;
        const influencia = cells[3].querySelector('input').value;
        const interesse = cells[4].querySelector('input').value;
        const poder = cells[5].querySelector('input').value;
        const risco = cells[6].querySelector('select').value;
        const quadrante = cells[7].textContent;
        const mensagem = cells[8].querySelector('input').value;
        const canal = cells[9].querySelector('select').value;
        const frequencia = cells[10].querySelector('select').value;
        
        csv += `"${nome}";"${funcao}";"${papel}";${influencia};${interesse};${poder};"${risco}";"${quadrante}";"${mensagem}";"${canal}";"${frequencia}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'stakeholders-engagement.csv';
    link.click();
}

// Inicialização: adicionar uma linha vazia
document.addEventListener('DOMContentLoaded', function() {
    adicionarLinhaTabela();
});
</script>

---

## Instruções de Integração

Para integrar este exercício no MkDocs, adicione a seguinte entrada no ficheiro `mkdocs.yml`:

```yaml
nav:
  - ETAPA 2 — Engagement:
      - Introdução: etapa-02-engagement.md
      - Exercício 1 — Mapeamento de Stakeholders: ETAPA 2 - Engagement/ex1-mapeamento-stakeholders.md
```

O exercício funcionará automaticamente em qualquer instalação do MkDocs com Material Theme, incluindo GitHub Pages, sem necessidade de dependências externas.
