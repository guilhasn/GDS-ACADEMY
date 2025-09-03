# Exemplo 2

<!doctype html>
<html lang="pt">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Atividade — One-Pager do Business Case (Banco)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* ——— Estilos locais ——— */
    .card{background:#fff;border:1px solid #e5e7eb;border-radius:1rem;box-shadow:0 4px 18px rgba(2,6,23,.06)}
    .kbd{border:1px solid #ddd;border-bottom-width:2px;border-right-width:2px;border-radius:.4rem;padding:.15rem .35rem;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.85rem;background:#f8fafc}
    .hint{font-size:.9rem;color:#475569}
    .req::after{content:" *"; color:#dc2626; font-weight:700}
    textarea{resize:vertical}
    .mono{font-family:ui-monospace,Menlo,Consolas,monospace}
    @media (min-width: 1024px){ .sticky-preview{position:sticky; top:88px;} }
  </style>
</head>

<body class="bg-slate-50 text-slate-800">
  <main class="w-full px-4 lg:px-6 py-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- FORMULÁRIO (2/3) -->
      <section class="card p-5 lg:col-span-2">
        <div class="flex items-center justify-between gap-4 mb-2">
          <h1 class="text-xl font-semibold">One-Pager — Business Case (Banco)</h1>

        </div>
       
        <!-- CONTROLOS GERAIS -->
        <div class="grid md:grid-cols-4 gap-3 mb-4">
          <div class="md:col-span-2">
            <label class="block font-bold">Organização</label>
            <input id="org" class="mt-1 w-full rounded-lg border-slate-300" placeholder="Ex.: INOVADATA Bank" />
          </div>
          <div>
            <label class="block font-bold">Sponsor (C-level)</label>
            <input id="sponsor" class="mt-1 w-full rounded-lg border-slate-300" placeholder="Ex.: CRO / CDO Executivo" />
          </div>
          <div class="flex items-end gap-2">
            <button id="btn-inovadata" class="rounded-lg bg-slate-200 hover:bg-slate-300 px-3 py-2 w-full">Carregar exemplo INOVADATA</button>
            <button id="btn-limpar" class="rounded-lg bg-white border px-3 py-2 w-full">Limpar</button>
          </div>
        </div>

        <form id="form" class="space-y-6">
          <!-- Objetivo + Resumo executivo -->
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold req">Objetivo do programa</label>
              <textarea id="objetivo" rows="4" class="mt-1 w-full rounded-lg border-slate-300" placeholder="Ex.: Estabelecer capacidades de governança (papéis, políticas, métricas) para reduzir risco regulatório e aumentar o valor dos dados em 12 meses."></textarea>
              <p class="hint mt-1">Alinhar com a estratégia do banco; metas e horizonte temporal claros.</p>
            </div>
            <div>
              <label class="block font-bold">Resumo executivo (opcional)</label>
              <textarea id="resumo" rows="4" class="mt-1 w-full rounded-lg border-slate-300" placeholder="Elevator pitch: porquê agora, que valor, qual a mudança."></textarea>
              <p class="hint mt-1">Mensagem em 3–4 frases para sponsor/board.</p>
            </div>
          </div>

          <!-- Benefícios / Riscos / KPIs -->
          <div class="grid md:grid-cols-3 gap-4">
            <div class="p-4 rounded-lg border">
              <label class="block font-bold req mb-2">4 Benefícios principais</label>
              <div id="beneficios" class="space-y-2"></div>
              <p class="hint mt-2">Eficiência, qualidade, conformidade, velocidade de decisão.</p>
            </div>
            <div class="p-4 rounded-lg border">
              <label class="block font-bold req mb-2">4 Riscos a mitigar</label>
              <div id="riscos" class="space-y-2"></div>
              <p class="hint mt-2">Ex.: RGPD/BCBS, acessos, DQ, linhagem.</p>
            </div>
            <div class="p-4 rounded-lg border">
              <label class="block font-bold req mb-2">4 Métricas de sucesso (KPIs)</label>
              <div id="kpis" class="space-y-2"></div>
              <p class="hint mt-2">% stewards, incidentes/mês, ciclo de pedidos, % classificados.</p>
            </div>
          </div>

          <!-- Ações -->
           </form>

        <hr class="my-6"/>

        <details class="mt-2">
          <summary class="cursor-pointer font-medium">Guião (Ladley) & Enquadramento (ISO/RGPD)</summary>
          <ul class="list-disc pl-6 mt-2 text-sm leading-6">
            <li><strong>Ladley — Business Case</strong>: visão, riscos de não agir, custos da má qualidade, oportunidades, <em>data debt</em>, obstáculos/impactos/mudanças.</li>
            <li><strong>ISO/IEC 27001 & 27005</strong>: objetivos de segurança, avaliação de risco, controlos (acessos, classificação, retenção, logging).</li>
            <li><strong>RGPD</strong>: privacy-by-design, minimização, base legal, AIPD (quando aplicável).</li>
          </ul>
        </details>
      </section>

      <!-- PRÉ-VISUALIZAÇÃO (1/3) -->
      <section class="card p-5 lg:col-span-1 sticky-preview">
        <h2 class="text-lg font-semibold mb-3">Pré-visualização</h2>
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-bold mb-1">Markdown gerado</label>
            <textarea id="md" class="w-full rounded-lg border-slate-300 mono h-[60vh]"></textarea>
          </div>
          <div>
            <label class="block text-sm font-bold mb-1">Renderização rápida</label>
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
    // ===== Util =====
    const $$ = (s) => document.querySelector(s);
    const createInput = (ph) => {
      const i = document.createElement('input');
      i.type='text'; i.placeholder=ph;
      i.className='w-full rounded-lg border-slate-300';
      i.addEventListener('input', render);
      return i;
    };
    const createList = (id, phs=[]) => {
      const wrap = $$('#'+id); wrap.innerHTML='';
      phs.forEach(ph => wrap.appendChild(createInput(ph)));
      while (wrap.children.length < 4) wrap.appendChild(createInput(id+' '+(wrap.children.length+1)));
    };
    const getList = (id) => [...document.querySelectorAll('#'+id+' input')].map(i=>i.value.trim()).filter(Boolean);
    const setList = (id, arr=[]) => {
      const inputs = document.querySelectorAll('#'+id+' input');
      inputs.forEach((i,ix)=> i.value = arr[ix] ?? '');
    };
    const dl = (filename, text, mime='text/plain;charset=utf-8') => {
      const blob = new Blob([text], {type:mime});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download=filename; a.click();
      URL.revokeObjectURL(url);
    };

    // ===== Inicialização =====
    createList('beneficios',[
      'Ex.: -25% retrabalho analítico em 12m',
      'Ex.: +20% qualidade em KYC/AML',
      'Ex.: -35% time-to-insight em dashboards',
      'Ex.: Conformidade RGPD/BCBS reforçada'
    ]);
    createList('riscos',[
      'Acesso indevido a dados sensíveis',
      'DQ deficiente em KYC (erros AML)',
      'Ausência de linhagem (auditoria falha)',
      'Inconsistência MDM (clientes/contas)'
    ]);
    createList('kpis',[
      '% domínios com steward (≥80%/6m)',
      'Incidentes de dados/mês (−40%/9m)',
      'Tempo ciclo pedido dados (−30%)',
      '% datasets classificados (≥95%)'
    ]);

    const KEY='gsd_onepager_v2';

    function readForm(){
      return {
        org: $$('#org').value.trim(),
        sponsor: $$('#sponsor').value.trim(),
        objetivo: $$('#objetivo').value.trim(),
        resumo: $$('#resumo').value.trim(),
        beneficios: getList('beneficios'),
        riscos: getList('riscos'),
        kpis: getList('kpis')
      }
    }
    function writeForm(d){
      $$('#org').value = d.org || '';
      $$('#sponsor').value = d.sponsor || '';
      $$('#objetivo').value = d.objetivo || '';
      $$('#resumo').value = d.resumo || '';
      setList('beneficios', d.beneficios || []);
      setList('riscos', d.riscos || []);
      setList('kpis', d.kpis || []);
      render();
    }

    // ===== Markdown & Preview =====
    function toMarkdown(d){
      const org = d.org || '—';
      const list = (a)=> (a||[]).map(v=>`- ${v}`).join('\n');
      return `# One-Pager — Business Case (${org})

**Objetivo do Programa**  
${d.objetivo || ''}

**Sponsor Executivo**  
${d.sponsor || ''}

${d.resumo ? `**Resumo Executivo**\n${d.resumo}\n` : ''}**Benefícios (4)**  
${list(d.beneficios)}

**Riscos a Mitigar (4)**  
${list(d.riscos)}

**Métricas de Sucesso — KPIs (4)**  
${list(d.kpis)}

---

**Notas**  
- Estruturado à luz de John Ladley (Business Case): visão, riscos, custos da má qualidade, oportunidades, *data debt*, impactos e mudanças.  
- Enquadramento: ISO/IEC 27001 (controlos), ISO 27005 (risco) e RGPD (privacy-by-design).`;
    }
    function markdownToHtml(md){
      // Conversor mínimo (headers + bold + listas)
      let html = md
        .replace(/^# (.*)$/gim,'<h1>$1</h1>')
        .replace(/^\*\*(.*?)\*\*/gm,'<strong>$1</strong>')
        .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
        .replace(/^(?:- |\u2022 )(.*)$/gim,'<li>$1</li>');
      html = html.replace(/(<li>.*<\/li>)/gims,'<ul>$1</ul>');
      html = html.replace(/\n{2,}/g,'<br/><br/>');
      return html;
    }
    function render(){
      const d = readForm();
      const md = toMarkdown(d);
      $$('#md').value = md;
      $$('#render').innerHTML = markdownToHtml(md);
    }

    // Eventos
    ['org','sponsor','objetivo','resumo'].forEach(id => $$('#'+id).addEventListener('input', render));
    ['beneficios','riscos','kpis'].forEach(id => $$('#'+id).addEventListener('input', render));

    // Ações
    $$('#btn-inovadata').addEventListener('click', ()=>{
      writeForm({
        org: 'INOVADATA Bank',
        sponsor: 'CRO + CDO Executivo',
        objetivo: 'Implementar programa corporativo de Governança de Dados para reduzir risco regulatório (RGPD/AML/BCBS), elevar a qualidade de dados críticos de cliente e acelerar o time-to-market analítico em 12 meses.',
        resumo: 'A governança de dados cria disciplina e confiança organizacional. Esta iniciativa reduz riscos regulatórios, melhora decisões e liberta valor dos dados. Envolve papéis claros (stewards), políticas pragmáticas e métricas de valor.',
        beneficios: [
          'Redução de 25% no retrabalho analítico (12m)',
          'Aumento de 20% na qualidade de dados KYC/AML',
          'Time-to-insight −35% em relatórios de gestão',
          'Conformidade RGPD/BCBS com evidências auditáveis'
        ],
        riscos: [
          'Acesso indevido a dados sensíveis (falta de MFA/SoD)',
          'DQ fraca em KYC → risco AML e decisões erradas',
          'Linhagem incompleta compromete auditorias',
          'MDM inconsistente entre clientes/contas'
        ],
        kpis: [
          '% domínios com steward (meta ≥80% em 6m)',
          'Incidentes de dados/mês (meta −40% em 9m)',
          'Tempo ciclo de pedidos (meta −30% em 12m)',
          '% datasets classificados (meta ≥95%)'
        ]
      });
    });

    $$('#btn-limpar').addEventListener('click', ()=>{
      writeForm({org:'', sponsor:'', objetivo:'', resumo:'', beneficios:['','','',''], riscos:['','','',''], kpis:['','','','']});
      localStorage.removeItem(KEY);
    });

    $$('#btn-guardar').addEventListener('click', ()=>{
      localStorage.setItem(KEY, JSON.stringify(readForm()));
      alert('Guardado no navegador.');
    });

    $$('#btn-md').addEventListener('click', ()=>{
      dl('onepager-business-case.md', $$('#md').value, 'text/markdown;charset=utf-8');
    });

    $$('#btn-json').addEventListener('click', ()=>{
      dl('onepager-business-case.json', JSON.stringify(readForm(), null, 2), 'application/json;charset=utf-8');
    });

    $$('#btn-copiar').addEventListener('click', async ()=>{
      await navigator.clipboard.writeText($$('#md').value);
      alert('Markdown copiado.');
    });

    $$('#btn-print').addEventListener('click', ()=> window.print());

    $$('#btn-doc').addEventListener('click', () => {
      const content = $$('#md').value;
      const htmlContent = `
        <html xmlns:o="urn:schemas-microsoft-com:office" xmlns:w="urn:schemas-microsoft-com:word" xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset="utf-8"></head>
        <body>${content.replace(/\n/g, '<br>')}</body>
        </html>
      `;
      const blob = new Blob([htmlContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'onepager-business-case.doc';
      a.click();
      URL.revokeObjectURL(url);
    });

    // Estado inicial — não carregar exemplo automaticamente
    const saved = localStorage.getItem(KEY);
    if (saved) {
      try {
        writeForm(JSON.parse(saved));
      } catch (e) {
        render();
      }
    } else {
      // Inicializa formulário com os inputs já criados; não carregar exemplo
      render();
    }
  </script>
</body>
</html>
