# Exemplo 1

<!doctype html>
<html lang="pt">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Atividade — One-Pager do Business Case (Banco)</title>

  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <style>
   

    /* ===== Estilos locais ===== */
    .card{background:#fff;border:1px solid #e5e7eb;border-radius:1rem;box-shadow:0 4px 18px rgba(2,6,23,.06)}
    .kbd{border:1px solid #ddd;border-bottom-width:2px;border-right-width:2px;border-radius:.4rem;padding:.15rem .35rem;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.85rem;background:#f8fafc}
    .hint{font-size:.9rem;color:#475569}
    .req::after{content:" *"; color:#dc2626; font-weight:700}
    textarea{resize:vertical}
    .mono{font-family:ui-monospace,Menlo,Consolas,monospace}
    /* Pré-visualização fixa em desktop */
    @media (min-width: 1024px){
      .sticky-preview{position: sticky; top: 88px;}
    }
  </style>
</head>

<body class="bg-slate-50 text-slate-800">

  <!-- Conteúdo em largura total -->
  <main class="w-full px-4 lg:px-6 py-6">
    <!-- 3 colunas em desktop: formulário (2) + preview (1) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- FORMULÁRIO (2/3) -->
      <section class="card p-5 lg:col-span-2">
        <h2 class="text-lg font-semibold mb-3">Preenchimento</h2>
        <p class="hint mb-4">
          Objetivo: gerar um <em>one-pager</em> que legitime o Programa de Governança de Dados num banco (à luz de Ladley). 
          Use <span class="kbd">Exportar</span> para obter Markdown/JSON ou <span class="kbd">Imprimir/PDF</span>.
        </p>

        <form id="form" class="space-y-6">
          <!-- Objetivo + Sponsor em grelha 2 colunas -->
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block font-medium req">Objetivo do programa</label>
              <textarea id="objetivo" rows="4" class="mt-1 w-full rounded-lg border-slate-300" placeholder="Ex.: Estabelecer capacidades de governança (papéis, políticas e métricas) para reduzir riscos e aumentar o valor dos dados em 12 meses."></textarea>
              <p class="hint mt-1">Alinhar com a estratégia do banco e metas mensuráveis.</p>
            </div>
            <div>
              <label class="block font-medium req">Sponsor executivo</label>
              <input id="sponsor" type="text" class="mt-1 w-full rounded-lg border-slate-300" placeholder="Ex.: CFO, COO, CRO, CDO Executivo"/>
              <p class="hint mt-1">C-level com mandato e influência transversal.</p>
            </div>
          </div>

          <!-- Benefícios / Riscos / KPIs em cartões -->
          <div class="grid md:grid-cols-3 gap-4">
            <div class="p-4 rounded-lg border">
              <label class="block font-medium req mb-2">4 Benefícios principais</label>
              <div id="beneficios" class="space-y-2"></div>
              <p class="hint mt-2">Ex.: menos retrabalho; melhor qualidade; time-to-insight; conformidade.</p>
            </div>

            <div class="p-4 rounded-lg border">
              <label class="block font-medium req mb-2">4 Riscos a mitigar</label>
              <div id="riscos" class="space-y-2"></div>
              <p class="hint mt-2">Ex.: RGPD/BCBS; acessos excessivos; DQM; linhagem.</p>
            </div>

            <div class="p-4 rounded-lg border">
              <label class="block font-medium req mb-2">4 Métricas de sucesso (KPIs)</label>
              <div id="kpis" class="space-y-2"></div>
              <p class="hint mt-2">Ex.: % stewards; incidentes/mês; ciclo de pedidos; % classificados.</p>
            </div>
          </div>

          <!-- Ações -->
          <div class="flex flex-wrap gap-2 pt-1">
            <button type="button" id="btn-exemplo" class="rounded-lg bg-slate-200 hover:bg-slate-300 px-3 py-2">Preencher exemplo</button>
             
          </div>
          <p class="hint">Guardado no <strong>localStorage</strong>. Nada é enviado para servidor.</p>
        </form>

        <hr class="my-6"/>

        <details class="mt-2">
          <summary class="cursor-pointer font-medium">Guião (Ladley) & Enquadramento (ISO/RGPD)</summary>
          <ul class="list-disc pl-6 mt-2 text-sm leading-6">
            <li><strong>Ladley — Business Case</strong>: visão, riscos, custos da má qualidade, oportunidades, <em>data debt</em>, impactos e validação com stakeholders.</li>
            <li><strong>ISO/IEC 27001 & 27005</strong>: objetivos de segurança, avaliação de risco, controlos (acessos, classificação, retenção, logging).</li>
            <li><strong>RGPD</strong>: privacy-by-design, minimização, bases legais; avaliar AIPD/DPIA quando aplicável.</li>
          </ul>
        </details>
      </section>

      <!-- PRÉ-VISUALIZAÇÃO (1/3) -->
      <section class="card p-5 lg:col-span-1 sticky-preview">
        <h2 class="text-lg font-semibold mb-3">Pré-visualização</h2>

        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Markdown gerado</label>
            <!-- altura generosa; ajusta conforme necessário -->
            <textarea id="md" class="w-full rounded-lg border-slate-300 mono h-[60vh]"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Renderização rápida</label>
            <article id="render" class="prose max-w-none"></article>
          </div>
        </div>
      </section>
    </div>
  </main>

  <footer class="text-center text-sm text-slate-500 py-6">
    © GSD Academy — atividade “One-Pager do Business Case (Banco)”.
  </footer>

  <script>
    // ---------- util ----------
    const $ = (sel) => document.querySelector(sel);
    const createInput = (name, placeholder) => {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = placeholder;
      input.className = 'w-full rounded-lg border-slate-300';
      input.dataset.name = name;
      return input;
    };
    const createList = (id, label, count, placeholders) => {
      const wrap = document.getElementById(id);
      wrap.innerHTML = '';
      for (let i=0;i<count;i++){
        const div = document.createElement('div');
        div.appendChild(createInput(id, placeholders[i] || `${label} ${i+1}`));
        wrap.appendChild(div);
      }
    };
    const getValues = (id) => [...document.querySelectorAll('#'+id+' input')].map(i => i.value.trim()).filter(Boolean);
    const setValues = (id, arr=[]) => {
      const inputs = document.querySelectorAll('#'+id+' input');
      inputs.forEach((i,idx)=> i.value = arr[idx] ?? '');
    };
    const dl = (filename, text, mime='text/plain') => {
      const blob = new Blob([text], {type: mime});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename; a.click();
      URL.revokeObjectURL(url);
    };

    // ---------- inicializar listas ----------
    createList('beneficios','Benefício',4,[
      'Ex.: -20% retrabalho em 9 meses',
      'Ex.: +15% qualidade em dados de cliente',
      'Ex.: Acelerar time-to-insight em 25%',
      'Ex.: Reduzir não conformidades RGPD'
    ]);
    createList('riscos','Risco',4,[
      'Ex.: Multas/penalizações (RGPD/BCBS)',
      'Ex.: Acessos excessivos a dados sensíveis',
      'Ex.: Inconsistência de dados mestres',
      'Ex.: Falhas na linhagem/tracing'
    ]);
    createList('kpis','KPI',4,[
      'Ex.: % domínios com steward nomeado',
      'Ex.: Nº incidentes de qualidade/mês',
      'Ex.: Tempo ciclo de pedidos de dados',
      'Ex.: % dados classificados por nível'
    ]);

    // ---------- estado ----------
    const KEY = 'gsd_onepager_banco_v1';
    function readForm(){
      return {
        objetivo: $('#objetivo').value.trim(),
        sponsor:  $('#sponsor').value.trim(),
        beneficios: getValues('beneficios'),
        riscos:     getValues('riscos'),
        kpis:       getValues('kpis')
      }
    }
    function writeForm(d){
      $('#objetivo').value = d.objetivo || '';
      $('#sponsor').value = d.sponsor || '';
      setValues('beneficios', d.beneficios || []);
      setValues('riscos', d.riscos || []);
      setValues('kpis', d.kpis || []);
      render();
    }

    // ---------- render Markdown + preview ----------
    function toMarkdown(d){
      const list = (arr, prefix='- ') => (arr||[]).map(v => `${prefix}${v}`).join('\n');
      return `# One-Pager — Business Case (Banco)

**Objetivo do Programa**  
${d.objetivo || ''}

**Sponsor Executivo**  
${d.sponsor || ''}

**Benefícios (4)**  
${list(d.beneficios)}

**Riscos a Mitigar (4)**  
${list(d.riscos)}

**Métricas de Sucesso — KPIs (4)**  
${list(d.kpis)}

---

**Notas**  
- Este one-pager segue as linhas de John Ladley (Business Case): visão, riscos, custos da má qualidade, oportunidades, *data debt*, obstáculos/impactos/mudanças.  
- Enquadramento: ISO/IEC 27001 (controlos de segurança), ISO 27005 (risco), RGPD (privacy-by-design).`;
    }
    function markdownToHtml(md){
      // conversor mínimo (sem libs externas) para headers + listas
      let html = md
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/^(?:- |\u2022 )(.*)$/gim, '<li>$1</li>');
      html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
      html = html.replace(/\n{2,}/g, '<br/><br/>');
      return html;
    }
    function render(){
      const d = readForm();
      const md = toMarkdown(d);
      $('#md').value = md;
      $('#render').innerHTML = markdownToHtml(md);
    }
    ['objetivo','sponsor'].forEach(id => $('#'+id).addEventListener('input', render));
    ['beneficios','riscos','kpis'].forEach(id => {
      document.querySelector('#'+id).addEventListener('input', render);
    });

    // ---------- ações ----------
    $('#btn-exemplo').addEventListener('click', ()=>{
      writeForm({
        objetivo: 'Estabelecer governança de dados corporativa para aumentar a qualidade e confiança dos dados críticos, reduzir risco regulatório e acelerar decisões.',
        sponsor: 'CRO + CDO Executivo',
        beneficios: [
          'Redução de 25% no retrabalho analítico em 12 meses',
          'Conformidade reforçada (RGPD/BCBS) e evidência de controlos',
          'Qualidade em dados de cliente (+20% nas regras críticas)',
          'Time-to-insight reduzido em 30% em relatórios de gestão'
        ],
        riscos: [
          'Multas por incumprimento RGPD/BCBS e danos reputacionais',
          'Acessos excessivos a dados sensíveis e ausência de logs',
          'Dados mestres inconsistentes entre sistemas core',
          'Falta de linhagem impacta auditorias e confiança'
        ],
        kpis: [
          '% domínios com steward nomeado (meta: ≥80% em 6m)',
          'Nº incidentes de qualidade/mês (meta: -40% em 9m)',
          'Tempo de ciclo de pedidos de dados (meta: -30%)',
          '% registos classificados e com retenção definida (meta: ≥90%)'
        ]
      });
    });

    $('#btn-limpar').addEventListener('click', ()=>{
      writeForm({objetivo:'', sponsor:'', beneficios:['','','',''], riscos:['','','',''], kpis:['','','','']});
      localStorage.removeItem(KEY);
    });

    $('#btn-guardar').addEventListener('click', ()=>{
      localStorage.setItem(KEY, JSON.stringify(readForm()));
      alert('Guardado no navegador (localStorage).');
    });

    $('#btn-md').addEventListener('click', ()=>{
      dl('onepager-business-case.md', $('#md').value, 'text/markdown;charset=utf-8');
    });

    $('#btn-json').addEventListener('click', ()=>{
      dl('onepager-business-case.json', JSON.stringify(readForm(), null, 2), 'application/json;charset=utf-8');
    });

    $('#btn-copiar').addEventListener('click', async ()=>{
      await navigator.clipboard.writeText($('#md').value);
      alert('Markdown copiado para a área de transferência.');
    });

    $('#btn-print').addEventListener('click', ()=>{ window.print(); });

    // ---------- load ----------
    const saved = localStorage.getItem(KEY);
    if (saved) { try { writeForm(JSON.parse(saved)); } catch(e){ render(); } }
    else { render(); }
  </script>
</body>
</html>
