# Exemplo 4

<!doctype html>
<html lang="pt">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Exemplo — One-Pager do Business Case (Cadeia de Supermercados)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
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
          <h1 class="text-xl font-semibold">One-Pager — Business Case (Cadeia de Supermercados)</h1>
        </div>

        <!-- CONTROLOS GERAIS -->
        <div class="grid md:grid-cols-4 gap-3 mb-4">
          <div class="md:col-span-2">
            <label class="block font-bold">Organização</label>
            <input id="org" class="mt-1 w-full rounded-lg border-slate-300" placeholder="Ex.: Cadeia de Supermercados ABC" />
          </div>
          <div>
            <label class="block font-bold">Sponsor (Direção Geral)</label>
            <input id="sponsor" class="mt-1 w-full rounded-lg border-slate-300" placeholder="Ex.: CEO + CIO + CDO" />
          </div>
          <div class="flex items-end gap-2">
            <button id="btn-supermercados" class="rounded-lg bg-slate-200 hover:bg-slate-300 px-3 py-2 w-full">
              Carregar exemplo SUPERMERCADOS
            </button>
            <button id="btn-limpar"  class="rounded-lg bg-white border px-3 py-2 w-full">Limpar</button>
          </div>
        </div>

        <form id="form" class="space-y-6">
          <!-- Objetivo + Resumo executivo -->
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold req">Objetivo do programa</label>
              <textarea id="objetivo" rows="4" class="mt-1 w-full rounded-lg border-slate-300" placeholder="Ex.: Implementar governança de dados..."></textarea>
              <p class="hint mt-1">Alinhar com estratégia de crescimento, eficiência e experiência cliente.</p>
            </div>
            <div>
              <label class="block font-bold">Resumo executivo (opcional)</label>
              <textarea id="resumo" rows="4" class="mt-1 w-full rounded-lg border-slate-300" placeholder="Elevator pitch..."></textarea>
              <p class="hint mt-1">Mensagem em 3–4 frases para Conselho de Administração.</p>
            </div>
          </div>

          <!-- Benefícios / Riscos / KPIs -->
          <div class="grid md:grid-cols-3 gap-4">
            <div class="p-4 rounded-lg border">
              <label class="block font-bold req mb-2">4 Benefícios principais</label>
              <div id="beneficios" class="space-y-2"></div>
              <p class="hint mt-2">Eficiência, vendas, experiência, compliance.</p>
            </div>
            <div class="p-4 rounded-lg border">
              <label class="block font-bold req mb-2">4 Riscos a mitigar</label>
              <div id="riscos" class="space-y-2"></div>
              <p class="hint mt-2">Dados clientes, inventário, fraudes, privacidade.</p>
            </div>
            <div class="p-4 rounded-lg border">
              <label class="block font-bold req mb-2">4 Métricas de sucesso (KPIs)</label>
              <div id="kpis" class="space-y-2"></div>
              <p class="hint mt-2">% redução perdas, margem, satisfação, % conformidade.</p>
            </div>
          </div>

          <p class="hint">(Sem guardar automático — exemplo só ao clicar.)</p>
        </form>

        <hr class="my-6"/>

        <details class="mt-2">
          <summary class="cursor-pointer font-medium">Guião (Ladley) & Enquadramento (ISO/RGPD)</summary>
          <ul class="list-disc pl-6 mt-2 text-sm leading-6">
            <li><strong>Ladley — Business Case</strong>: visão, riscos de não agir, custos da má qualidade, oportunidades, <em>data debt</em>, impactos e mudanças.</li>
            <li><strong>ISO/IEC 27001 & 27005</strong>: avaliação de risco, controlos (acessos, classificação, retenção, logs, segregação).</li>
            <li><strong>RGPD</strong>: dados pessoais, consentimentos, minimização, AIPD quando necessário.</li>
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
    © GSD Academy — exemplo “One-Pager do Business Case (Cadeia de Supermercados)”.
  </footer>

  <script>
    const $ = s => document.querySelector(s);

    // Helpers listas
    const createInput = (ph) => {
      const i = document.createElement('input');
      i.type='text';
      i.placeholder=ph;
      i.className='w-full rounded-lg border-slate-300';
      i.addEventListener('input', render);
      return i;
    };
    const createList = (id, phs=[]) => {
      const wrap = $('#'+id); wrap.innerHTML='';
      phs.forEach(ph => wrap.appendChild(createInput(ph)));
      while (wrap.children.length < 4) wrap.appendChild(createInput(id+' '+(wrap.children.length+1)));
    };
    const getList = id => [...document.querySelectorAll('#'+id+' input')].map(i=>i.value.trim()).filter(Boolean);
    const setList = (id, arr=[]) => {
      const inputs = document.querySelectorAll('#'+id+' input');
      inputs.forEach((i,ix)=> i.value = arr[ix] ?? '');
    };

    // Listas vazias
    createList('beneficios');
    createList('riscos');
    createList('kpis');

    function readForm(){
      return {
        org: $('#org').value.trim(),
        sponsor: $('#sponsor').value.trim(),
        objetivo: $('#objetivo').value.trim(),
        resumo: $('#resumo').value.trim(),
        beneficios: getList('beneficios'),
        riscos: getList('riscos'),
        kpis: getList('kpis')
      };
    }
    function writeForm(d){
      $('#org').value = d.org || '';
      $('#sponsor').value = d.sponsor || '';
      $('#objetivo').value = d.objetivo || '';
      $('#resumo').value = d.resumo || '';
      setList('beneficios', d.beneficios || []);
      setList('riscos', d.riscos || []);
      setList('kpis', d.kpis || []);
      render();
    }

    function toMarkdown(d){
      const list = a => (a||[]).map(v=>`- ${v}`).join('\n');
      return `# One-Pager — Business Case (${d.org || '—'})

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
- Estruturado à luz de John Ladley (Business Case).`;
    }

    function markdownToHtml(md){
      let html = md
        .replace(/^# (.*)$/gim,'<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
        .replace(/^(?:- )(.*)$/gim,'<li>$1</li>');
      html = html.replace(/(<li>.*<\/li>)/gims,'<ul>$1</ul>');
      html = html.replace(/\n{2,}/g,'<br/><br/>');
      return html;
    }

    function render(){
      const d = readForm();
      const md = toMarkdown(d);
      $('#md').value = md;
      $('#render').innerHTML = markdownToHtml(md);
    }

    // Eventos
    ['org','sponsor','objetivo','resumo'].forEach(id => $('#'+id).addEventListener('input', render));
    ['beneficios','riscos','kpis'].forEach(id => $('#'+id).addEventListener('input', render));

    // Carregar exemplo (Cadeia de Supermercados) apenas ao clicar
    $('#btn-supermercados').addEventListener('click', ()=>{
      writeForm({
        org: 'Cadeia de Supermercados ABC',
        sponsor: 'CEO + CIO + CDO',
        objetivo: 'Implementar governança de dados para otimizar inventário, personalizar ofertas, garantir compliance e aumentar eficiência operacional em 12 meses.',
        resumo: 'Foco em qualidade de dados para reduzir perdas, melhorar experiência cliente e suportar decisões estratégicas. Estrutura papéis de stewards, políticas de classificação e catálogo de dados.',
        beneficios: [
          'Redução de perdas por inventário impreciso +20%',
          'Aumento de vendas por personalização +15%',
          'Melhoria na experiência cliente (fidelização)',
          'Conformidade RGPD e segurança de dados'
        ],
        riscos: [
          'Exposição de dados pessoais de clientes',
          'Inventário inconsistente e perdas financeiras',
          'Fraudes e acessos não autorizados',
          'Lacunas em classificação e retenção de dados'
        ],
        kpis: [
          '% redução perdas inventário (meta −20% /6m)',
          'Aumento margem vendas (meta +10% /12m)',
          'Satisfação cliente (meta +15% /9m)',
          '% dados classificados e conformes (≥95%)'
        ]
      });
    });

    $('#btn-limpar').addEventListener('click', ()=>{
      writeForm({org:'', sponsor:'', objetivo:'', resumo:'', beneficios:['','','',''], riscos:['','','',''], kpis:['','','','']});
    });

    // Estado inicial vazio
    render();
  </script>
</body>
</html>