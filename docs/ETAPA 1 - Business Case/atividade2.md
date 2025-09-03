# Atividade 2

Aqui está o conteúdo incorporado do arquivo `atividade2.html`:


<!doctype html>
<html lang="pt">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Atividade 2 — Cenários de Custo–Benefício (GSD Academy)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    .card{background:#fff;border:1px solid #e5e7eb;border-radius:1rem;box-shadow:0 4px 18px rgba(2,6,23,.06)}
    .kbd{border:1px solid #ddd;border-bottom-width:2px;border-right-width:2px;border-radius:.4rem;padding:.15rem .35rem;font-family:ui-monospace,Menlo,Consolas,monospace}
    .hint{font-size:.9rem;color:#475569}
    .mono{font-family:ui-monospace,Menlo,Consolas,monospace}
    textarea{resize:vertical}
    .req::after{content:" *";color:#dc2626;font-weight:700}
  </style>
</head>
<body class="bg-slate-50 text-slate-800">

<main class="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 2xl:grid-cols-3 gap-6">
  <!-- CONTROLOS GERAIS -->
  <section class="card p-5 2xl:col-span-3">
    <div class="grid md:grid-cols-4 gap-4">
      <div>
        <label class="block font-medium">Moeda</label>
        <input id="moeda" class="mt-1 w-full rounded-lg border-slate-300" value="€" aria-label="Moeda"/>
      </div>
      <div>
        <label class="block font-medium">Horizonte (meses)</label>
        <input id="horizonte" type="number" min="1" class="mt-1 w-full rounded-lg border-slate-300" value="12"/>
      </div>
      <div>
        <label class="block font-medium">Taxa de desconto (%) <span class="text-slate-400">(opcional)</span></label>
        <input id="taxa" type="number" step="0.1" class="mt-1 w-full rounded-lg border-slate-300" placeholder="ex.: 6"/>
      </div>
      <div class="flex items-end gap-2">
        <button id="btn-exemplo" class="rounded-lg bg-slate-200 hover:bg-slate-300 px-3 py-2">Preencher exemplo</button>
        <button id="btn-limpar" class="rounded-lg bg-white border px-3 py-2">Limpar</button>
        <button id="btn-guardar" class="rounded-lg bg-indigo-600 text-white px-3 py-2 hover:bg-indigo-700">Guardar</button>
      </div>
    </div>
    <p class="hint mt-2">Dados guardados no <strong>localStorage</strong> do navegador. Sem envio para servidor.</p>
  </section>

  <!-- FORMULÁRIO: 3 CENÁRIOS -->
  <section class="card p-5">
    <h2 class="text-lg font-semibold mb-2">Cenário — Conservador</h2>
    <div class="space-y-3">
      <label class="block req">Custos Estimados</label>
      <input id="c_custos" type="number" min="0" step="1000" class="w-full rounded-lg border-slate-300" placeholder="ex.: 50 000"/>

      <label class="block req">Benefícios Esperados (valor €)</label>
      <input id="c_beneficios" type="number" min="0" step="1000" class="w-full rounded-lg border-slate-300" placeholder="ex.: 80 000"/>

      <label class="block">Riscos Mitigados (3+)</label>
      <div id="c_riscos" class="space-y-2"></div>
      <button data-add="c_riscos" class="rounded bg-slate-100 px-2 py-1 text-sm">+ adicionar risco</button>

      <label class="block">Observações</label>
      <textarea id="c_obs" rows="3" class="w-full rounded-lg border-slate-300"></textarea>
    </div>
  </section>

  <section class="card p-5">
    <h2 class="text-lg font-semibold mb-2">Cenário — Base</h2>
    <div class="space-y-3">
      <label class="block req">Custos Estimados</label>
      <input id="b_custos" type="number" min="0" step="1000" class="w-full rounded-lg border-slate-300" placeholder="ex.: 120 000"/>

      <label class="block req">Benefícios Esperados (valor €)</label>
      <input id="b_beneficios" type="number" min="0" step="1000" class="w-full rounded-lg border-slate-300" placeholder="ex.: 220 000"/>

      <label class="block">Riscos Mitigados (3+)</label>
      <div id="b_riscos" class="space-y-2"></div>
      <button data-add="b_riscos" class="rounded bg-slate-100 px-2 py-1 text-sm">+ adicionar risco</button>

      <label class="block">Observações</label>
      <textarea id="b_obs" rows="3" class="w-full rounded-lg border-slate-300"></textarea>
    </div>
  </section>

  <section class="card p-5">
    <h2 class="text-lg font-semibold mb-2">Cenário — Ambicioso</h2>
    <div class="space-y-3">
      <label class="block req">Custos Estimados</label>
      <input id="a_custos" type="number" min="0" step="1000" class="w-full rounded-lg border-slate-300" placeholder="ex.: 300 000"/>

      <label class="block req">Benefícios Esperados (valor €)</label>
      <input id="a_beneficios" type="number" min="0" step="1000" class="w-full rounded-lg border-slate-300" placeholder="ex.: 700 000"/>

      <label class="block">Riscos Mitigados (3+)</label>
      <div id="a_riscos" class="space-y-2"></div>
      <button data-add="a_riscos" class="rounded bg-slate-100 px-2 py-1 text-sm">+ adicionar risco</button>

      <label class="block">Observações</label>
      <textarea id="a_obs" rows="3" class="w-full rounded-lg border-slate-300"></textarea>
    </div>
  </section>

  <!-- KPIs -->
  <section class="card p-5 2xl:col-span-2">
    <h2 class="text-lg font-semibold mb-2">KPIs (melhoria prevista em %)</h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
      <div><label class="block req">KPI 1</label><input id="k1" class="w-full rounded-lg border-slate-300" placeholder="% dados críticos com steward"/></div>
      <div><label class="block">Conservador</label><input id="k1c" type="number" step="1" class="w-full rounded-lg border-slate-300" placeholder="ex.: 40"/></div>
      <div><label class="block">Base</label><input id="k1b" type="number" step="1" class="w-full rounded-lg border-slate-300" placeholder="ex.: 65"/></div>
      <div><label class="block">Ambicioso</label><input id="k1a" type="number" step="1" class="w-full rounded-lg border-slate-300" placeholder="ex.: 85"/></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3 items-end mt-3">
      <div><label class="block req">KPI 2</label><input id="k2" class="w-full rounded-lg border-slate-300" placeholder="incidentes de qualidade/mês (↓)"/></div>
      <div><label class="block">Conservador</label><input id="k2c" type="number" step="1" class="w-full rounded-lg border-slate-300" placeholder="ex.: 10"/></div>
      <div><label class="block">Base</label><input id="k2b" type="number" step="1" class="w-full rounded-lg border-slate-300" placeholder="ex.: 6"/></div>
      <div><label class="block">Ambicioso</label><input id="k2a" type="number" step="1" class="w-full rounded-lg border-slate-300" placeholder="ex.: 3"/></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3 items-end mt-3">
      <div><label class="block req">KPI 3</label><input id="k3" class="w-full rounded-lg border-slate-300" placeholder="tempo de ciclo de pedidos (↓ %)"/></div>
      <div><label class="block">Conservador</label><input id="k3c" type="number" step="1" class="w-full rounded-lg border-slate-300" placeholder="ex.: 15"/></div>
      <div><label class="block">Base</label><input id="k3b" type="number" step="1" class="w-full rounded-lg border-slate-300" placeholder="ex.: 30"/></div>
      <div><label class="block">Ambicioso</label><input id="k3a" type="number" step="1" class="w-full rounded-lg border-slate-300" placeholder="ex.: 45"/></div>
    </div>
    <div class="mt-4"><canvas id="chart" height="120" aria-label="Gráfico de comparação de KPIs" role="img"></canvas></div>
  </section>

  <!-- RESULTADOS + EXPORT -->
  <section class="card p-5 2xl:col-span-1">
    <h2 class="text-lg font-semibold mb-2">Resultados</h2>
    <table class="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
      <thead class="bg-slate-100">
        <tr><th class="p-2 text-left">Cenário</th><th class="p-2 text-left">ROI</th><th class="p-2 text-left">BCR</th></tr>
      </thead>
      <tbody id="tbl" class="divide-y divide-slate-200"></tbody>
    </table>

    <div class="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
      <strong>Recomendação automática:</strong>
      <p id="reco" class="mt-1"></p>
    </div>

    <div class="mt-4 space-x-2">
      <button id="btn-md"   class="rounded-lg bg-emerald-600 text-white px-3 py-2 hover:bg-emerald-700">Exportar Markdown</button>
      <button id="btn-json" class="rounded-lg bg-teal-600 text-white px-3 py-2 hover:bg-teal-700">Exportar JSON</button>
      <button id="btn-copy" class="rounded-lg bg-yellow-500 text-white px-3 py-2 hover:bg-yellow-600">Copiar Markdown</button>
      <button id="btn-print"class="rounded-lg bg-slate-800 text-white px-3 py-2">Imprimir/PDF</button>
    </div>

    <div class="mt-4">
      <label class="block text-sm font-medium mb-1">Markdown gerado</label>
      <textarea id="md" rows="12" class="w-full rounded-lg border-slate-300 mono"></textarea>
    </div>
  </section>
</main>

<footer class="text-center text-sm text-slate-500 py-6">
  © GSD Academy — atividade “Análise de Cenários Custo–Benefício”. Sem recolha de dados pessoais.
</footer>

<script>
  const $ = sel => document.querySelector(sel);
  const KEY = 'gsd_cenarios_v1';

  function addRiskRow(containerId, placeholder='Descrição do risco mitigado'){
    const wrap = document.getElementById(containerId);
    const div = document.createElement('div');
    const input = document.createElement('input');
    input.className = 'w-full rounded-lg border-slate-300';
    input.placeholder = placeholder;
    input.addEventListener('input', render);
    div.appendChild(input); wrap.appendChild(div);
  }

  // inicializar 3 inputs de risco por cenário
  ['c_riscos','b_riscos','a_riscos'].forEach(id=>{
    for(let i=0;i<3;i++) addRiskRow(id);
  });
  document.querySelectorAll('button[data-add]').forEach(b=>{
    b.addEventListener('click', e => { e.preventDefault(); addRiskRow(b.dataset.add); });
  });

  function valNum(id){ const v=parseFloat($(id).value); return isNaN(v)?0:v; }
  function arrFrom(containerId){ return [...document.querySelectorAll('#'+containerId+' input')].map(i=>i.value.trim()).filter(Boolean); }

  function read(){
    return {
      moeda: $('#moeda').value || '€',
      horizonte: parseInt($('#horizonte').value || '12',10),
      taxa: parseFloat($('#taxa').value || '0') || 0,
      cenarios: {
        Conservador: { custos: valNum('#c_custos'), beneficios: valNum('#c_beneficios'), riscos: arrFrom('c_riscos'), obs: $('#c_obs').value.trim() },
        Base:        { custos: valNum('#b_custos'), beneficios: valNum('#b_beneficios'), riscos: arrFrom('b_riscos'), obs: $('#b_obs').value.trim() },
        Ambicioso:   { custos: valNum('#a_custos'), beneficios: valNum('#a_beneficios'), riscos: arrFrom('a_riscos'), obs: $('#a_obs').value.trim() }
      },
      kpis: [
        { nome: $('#k1').value.trim(), c: valNum('#k1c'), b: valNum('#k1b'), a: valNum('#k1a') },
        { nome: $('#k2').value.trim(), c: valNum('#k2c'), b: valNum('#k2b'), a: valNum('#k2a') },
        { nome: $('#k3').value.trim(), c: valNum('#k3c'), b: valNum('#k3b'), a: valNum('#k3a') }
      ]
    };
  }

  function fmtMoeda(v, m){ try{ return (m||'€')+' '+v.toLocaleString('pt-PT', {maximumFractionDigits:0}); } catch(e){ return (m||'€')+' '+v; } }
  function pct(n){ return isFinite(n)? (n*100).toFixed(1)+'%': '—'; }

  function calc(d){
    const res = {};
    for(const nome of Object.keys(d.cenarios)){
      const {custos, beneficios} = d.cenarios[nome];
      const bcr = custos>0 ? (beneficios/custos) : (beneficios>0?Infinity:0);
      const roi = custos>0 ? ((beneficios-custos)/custos) : 0;
      res[nome] = { bcr, roi };
    }
    // recomendar: maior BCR com ROI positivo
    const cand = Object.entries(res)
      .filter(([_,m])=>m.roi>0)
      .sort((a,b)=> b[1].bcr - a[1].bcr);
    const rec = cand.length? cand[0][0] : '—';
    return {res, rec};
  }

  function toMarkdown(d, m){
    const moeda = d.moeda || '€';
    const sec = (titulo, linhas)=> `**${titulo}**\n${linhas.map(l=>'- '+l).join('\n')}`;
    const linhas = (arr)=> (arr||[]).filter(Boolean);

    const mk = [];
    mk.push(`# Análise de Cenários Custo–Benefício (${d.horizonte} meses)`);
    mk.push(`Moeda: ${moeda}  \nTaxa de desconto (opcional): ${d.taxa || 0}%`);
    for(const nome of ['Conservador','Base','Ambicioso']){
      const c = d.cenarios[nome];
      mk.push(`\n## ${nome}`);
      mk.push(`Custos: ${fmtMoeda(c.custos, moeda)}  \nBenefícios: ${fmtMoeda(c.beneficios, moeda)}`);
      mk.push(sec('Riscos mitigados', linhas(c.riscos)));
      if(c.obs) mk.push(`> Observações: ${c.obs}`);
    }
    mk.push('\n## KPIs (melhoria prevista, %) ');
    d.kpis.filter(k=>k.nome).forEach(k=>{
      mk.push(`- ${k.nome}: Conservador ${k.c||0} | Base ${k.b||0} | Ambicioso ${k.a||0}`);
    });
    const {res, rec} = calc(d);
    mk.push('\n## Métricas');
    mk.push(`- ROI: Conservador ${pct(res.Conservador.roi)} | Base ${pct(res.Base.roi)} | Ambicioso ${pct(res.Ambicioso.roi)}`);
    mk.push(`- BCR: Conservador ${res.Conservador.bcr.toFixed(2)} | Base ${res.Base.bcr.toFixed(2)} | Ambicioso ${res.Ambicioso.bcr.toFixed(2)}`);
    mk.push(`\n**Recomendação automática:** ${rec}`);
    mk.push('\n> Nota: alinhado com Ladley (Business Case) e com ISO/IEC 27001 / RGPD (gestão de risco, benefícios e conformidade).');
    return mk.join('\n');
  }

  function render(){
    const d = read();
    const moeda = d.moeda;
    const {res, rec} = calc(d);

    // tabela
    const tbody = $('#tbl'); tbody.innerHTML='';
    for(const nome of ['Conservador','Base','Ambicioso']){
      const tr = document.createElement('tr');
      tr.innerHTML = `<td class="p-2">${nome}</td>
                      <td class="p-2">${pct(res[nome].roi)}</td>
                      <td class="p-2">${res[nome].bcr.toFixed(2)}</td>`;
      tbody.appendChild(tr);
    }
    $('#reco').textContent = rec==='—'
      ? 'Não há cenário com ROI positivo suficiente. Revise custos/benefícios.'
      : `Cenário ${rec} (maior BCR com ROI > 0).`;

    // markdown
    $('#md').value = toMarkdown(d);

    // gráfico KPIs
    updateChart(d);
  }

  // eventos
  document.querySelectorAll('input, textarea').forEach(el=> el.addEventListener('input', render));

  // ações
  $('#btn-exemplo').addEventListener('click', ()=>{
    $('#moeda').value='€'; $('#horizonte').value=12; $('#taxa').value='';
    $('#c_custos').value=50000;  $('#c_beneficios').value=80000;
    $('#b_custos').value=120000; $('#b_beneficios').value=220000;
    $('#a_custos').value=300000; $('#a_beneficios').value=700000;
    $('#k1').value='% domínios com steward nomeado'; $('#k1c').value=40; $('#k1b').value=65; $('#k1a').value=85;
    $('#k2').value='incidentes de qualidade/mês (↓)'; $('#k2c').value=10; $('#k2b').value=6; $('#k2a').value=3;
    $('#k3').value='tempo de ciclo de pedidos (↓ %)'; $('#k3c').value=15; $('#k3b').value=30; $('#k3a').value=45;
    ['c_riscos','b_riscos','a_riscos'].forEach(id=>{
      const inputs = document.querySelectorAll('#'+id+' input');
      const exemplos = [
        'Multas/penalizações (RGPD/BCBS)',
        'Acessos excessivos a dados sensíveis',
        'Inconsistência de dados mestres',
        'Falhas de linhagem e auditoria'
      ];
      inputs.forEach((i,ix)=> i.value = exemplos[ix] || '');
    });
    render();
  });
  $('#btn-limpar').addEventListener('click', ()=>{
    localStorage.removeItem(KEY); location.reload();
  });
  $('#btn-guardar').addEventListener('click', ()=>{
    localStorage.setItem(KEY, JSON.stringify(read())); alert('Guardado no navegador.');
  });
  $('#btn-md').addEventListener('click', ()=>{
    const blob = new Blob([$('#md').value], {type:'text/markdown;charset=utf-8'});
    const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='cenarios-custo-beneficio.md'; a.click(); URL.revokeObjectURL(a.href);
  });
  $('#btn-json').addEventListener('click', ()=>{
    const blob = new Blob([JSON.stringify(read(),null,2)], {type:'application/json;charset=utf-8'});
    const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='cenarios-custo-beneficio.json'; a.click(); URL.revokeObjectURL(a.href);
  });
  $('#btn-copy').addEventListener('click', async ()=>{
    await navigator.clipboard.writeText($('#md').value); alert('Markdown copiado.');
  });
  $('#btn-print').addEventListener('click', ()=> window.print());

  // chart
  let chart;
  function updateChart(d){
    const labels = d.kpis.map(k=>k.nome || '(KPI)');
    const ds = (label,vals)=>({label, data: vals, borderWidth:1});
    const data = {
      labels,
      datasets: [
        ds('Conservador', d.kpis.map(k=>k.c||0)),
        ds('Base',        d.kpis.map(k=>k.b||0)),
        ds('Ambicioso',   d.kpis.map(k=>k.a||0))
      ]
    };
    const cfg = {type:'bar', data, options:{responsive:true, scales:{y:{beginAtZero:true}}}};
    if(chart){ chart.data = data; chart.update(); }
    else { chart = new Chart($('#chart'), cfg); }
  }

  // carregar estado
  const saved = localStorage.getItem(KEY);
  if(saved){
    try{
      const d = JSON.parse(saved);
      $('#moeda').value = d.moeda || '€';
      $('#horizonte').value = d.horizonte || 12;
      $('#taxa').value = d.taxa || '';
      // riscos: garantir que existem inputs suficientes
      const fill = (id, arr=[])=>{
        const cur = document.querySelectorAll('#'+id+' input').length;
        for(let i=cur;i<Math.max(3,arr.length);i++) addRiskRow(id);
        document.querySelectorAll('#'+id+' input').forEach((i,ix)=> i.value = arr[ix] || '');
      };
      $('#c_custos').value=d.cenarios?.Conservador?.custos||'';
      $('#c_beneficios').value=d.cenarios?.Conservador?.beneficios||'';
      fill('c_riscos', d.cenarios?.Conservador?.riscos||[]);
      $('#c_obs').value=d.cenarios?.Conservador?.obs||'';

      $('#b_custos').value=d.cenarios?.Base?.custos||'';
      $('#b_beneficios').value=d.cenarios?.Base?.beneficios||'';
      fill('b_riscos', d.cenarios?.Base?.riscos||[]);
      $('#b_obs').value=d.cenarios?.Base?.obs||'';

      $('#a_custos').value=d.cenarios?.Ambicioso?.custos||'';
      $('#a_beneficios').value=d.cenarios?.Ambicioso?.beneficios||'';
      fill('a_riscos', d.cenarios?.Ambicioso?.riscos||[]);
      $('#a_obs').value=d.cenarios?.Ambicioso?.obs||'';

      const k = d.kpis || [];
      $('#k1').value=k[0]?.nome||''; $('#k1c').value=k[0]?.c||''; $('#k1b').value=k[0]?.b||''; $('#k1a').value=k[0]?.a||'';
      $('#k2').value=k[1]?.nome||''; $('#k2c').value=k[1]?.c||''; $('#k2b').value=k[1]?.b||''; $('#k2a').value=k[1]?.a||'';
      $('#k3').value=k[2]?.nome||''; $('#k3c').value=k[2]?.c||''; $('#k3b').value=k[2]?.b||''; $('#k3a').value=k[2]?.a||'';
    }catch(e){ /* ignore */ }
  }
  render();
</script>
</body>
</html>
