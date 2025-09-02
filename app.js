const { useState } = React;

function TabButton({ id, label, current, setTab }) {
  return (
    React.createElement('button', {
      onClick: () => setTab(id),
      className: `px-3 py-1 rounded ${current===id? 'bg-blue-600 text-white':'bg-gray-200'}`
    }, label)
  );
}

function Quiz() {
  const quizData = [
    {
      q: 'Qual a principal diferença entre programa e projeto de Governação de Dados?',
      options: [
        'Programa é contínuo e estratégico; projeto é temporário',
        'Programa é menor que projeto',
        'Não há diferença'
      ],
      correct: 0
    },
    {
      q: 'Qual deles foca em benefícios de negócio sustentados?',
      options: ['Projeto', 'Programa', 'Ambos'],
      correct: 1
    },
    {
      q: 'Quem deve aprovar um programa de DG?',
      options: ['Apenas a equipa de TI', 'Direção / patrocinador executivo', 'Qualquer utilizador'],
      correct: 1
    }
  ];
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const choose = (qi, oi) => {
    if (submitted) return;
    const a = [...answers];
    a[qi] = oi;
    setAnswers(a);
  };

  const score = answers.reduce((s, a, i) => s + (a === quizData[i].correct ? 1 : 0), 0);

  return React.createElement('div', {className:'space-y-2'},
    React.createElement('h2', {className:'text-xl font-semibold'}, 'Quiz: Programa vs Projeto'),
    quizData.map((q, qi) => React.createElement('div', {key: qi},
      React.createElement('p', {className:'font-medium'}, `${qi+1}. ${q.q}`),
      q.options.map((opt, oi) => React.createElement('button', {
        key: oi,
        onClick: () => choose(qi, oi),
        className:`block text-left border rounded p-2 mt-1 ${answers[qi]===oi? 'bg-blue-100':'bg-white'}`
      }, opt)),
      submitted && React.createElement('p', {className:'text-sm mt-1'},
        q.correct === answers[qi] ? '✅ Correto' : `❌ Correto: ${q.options[q.correct]}`)
    )),
    !submitted ? React.createElement('button', {className:'mt-2 px-3 py-1 bg-blue-600 text-white rounded', onClick:()=>setSubmitted(true)}, 'Submeter')
               : React.createElement('p', {className:'mt-2 font-semibold'}, `Pontuação: ${score}/${quizData.length}`)
  );
}

function RolePlay() {
  const options = [
    {text:'DG garante conformidade e reduz multas', strong:true},
    {text:'DG adiciona burocracia desnecessária', strong:false},
    {text:'DG impulsiona inovação por dados de qualidade', strong:true},
    {text:'DG é responsabilidade exclusiva de TI', strong:false}
  ];
  const [feedback, setFeedback] = useState('');
  return React.createElement('div', {className:'space-y-2 mt-6'},
    React.createElement('h2', {className:'text-xl font-semibold'}, 'Role Play: reunião com direção'),
    React.createElement('p', null, 'Escolhe o argumento mais forte:'),
    options.map((o,i)=>React.createElement('button', {
      key:i,
      onClick:()=>setFeedback(o.strong? '👍 Argumento forte': '⚠️ Argumento fraco'),
      className:'block text-left border rounded p-2 mt-1 hover:bg-gray-100'
    }, o.text)),
    feedback && React.createElement('p', {className:'mt-2'}, feedback)
  );
}

function BusinessBrief() {
  const [form, setForm] = useState({objetivo:'', beneficios:'', riscos:'', pedido:''});
  const [generated, setGenerated] = useState('');
  const update = e => setForm({...form, [e.target.name]: e.target.value});
  const generate = () => {
    const text = `Business Brief\nObjetivo: ${form.objetivo}\nBenefícios: ${form.beneficios}\nRiscos: ${form.riscos}\nPedido: ${form.pedido}`;
    setGenerated(text);
    const blob = new Blob([text], {type:'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'business_brief.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return React.createElement('div', {className:'mt-6 space-y-2'},
    React.createElement('h2', {className:'text-xl font-semibold'}, 'Artefacto: Business Brief'),
    React.createElement('input', {className:'border p-2 w-full', placeholder:'Objetivo', name:'objetivo', value:form.objetivo, onChange:update}),
    React.createElement('textarea', {className:'border p-2 w-full', placeholder:'Benefícios', name:'beneficios', value:form.beneficios, onChange:update}),
    React.createElement('textarea', {className:'border p-2 w-full', placeholder:'Riscos', name:'riscos', value:form.riscos, onChange:update}),
    React.createElement('input', {className:'border p-2 w-full', placeholder:'Pedido de aprovação', name:'pedido', value:form.pedido, onChange:update}),
    React.createElement('button', {className:'px-3 py-1 bg-green-600 text-white rounded', onClick:generate}, 'Gerar Brief'),
    generated && React.createElement('pre', {className:'whitespace-pre-wrap bg-gray-100 p-2 rounded'}, generated)
  );
}

function Initiation() {
  return React.createElement('div', {className:'space-y-6'},
    React.createElement(Quiz),
    React.createElement(RolePlay),
    React.createElement(BusinessBrief)
  );
}

function ElevatorPitch() {
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState('');
  const check = () => {
    const t = text.toLowerCase();
    const missing = [];
    if(!t.includes('valor')) missing.push('valor');
    if(!t.includes('contro')) missing.push('controlo');
    if(!t.includes('alin')) missing.push('alinhamento');
    setFeedback(missing.length? `⚠️ Falta incluir: ${missing.join(', ')}` : '✅ Inclui os elementos essenciais.');
  };
  return React.createElement('div', {className:'space-y-2'},
    React.createElement('h2', {className:'text-xl font-semibold'}, 'Elevator Pitch'),
    React.createElement('textarea', {className:'border p-2 w-full', rows:3, placeholder:'Escreve 3 frases...', value:text, onChange:e=>setText(e.target.value)}),
    React.createElement('button', {className:'px-3 py-1 bg-blue-600 text-white rounded', onClick:check}, 'Validar'),
    feedback && React.createElement('p', {className:'mt-2'}, feedback)
  );
}

function DragUnits() {
  const units = ['Marketing','Finanças','IT','Risco'];
  const [assigned, setAssigned] = useState([]);
  const handleDrag = unit => e => { e.dataTransfer.setData('text', unit); };
  const handleDrop = e => {
    e.preventDefault();
    const unit = e.dataTransfer.getData('text');
    if(!assigned.includes(unit)) setAssigned([...assigned, unit]);
  };
  return React.createElement('div', {className:'mt-6'},
    React.createElement('h2', {className:'text-xl font-semibold'}, 'Associar unidades do Inovadata'),
    React.createElement('div', {className:'flex gap-4'},
      React.createElement('ul', {className:'border p-2 w-1/2 min-h-[6rem]'},
        units.map(u=>React.createElement('li', {key:u, draggable:true, onDragStart:handleDrag(u), className:'p-1 border-b'}, u))
      ),
      React.createElement('div', {className:'border p-2 w-1/2 min-h-[6rem]', onDragOver:e=>e.preventDefault(), onDrop:handleDrop},
        React.createElement('p', {className:'text-sm text-gray-500'}, 'Arrasta aqui'),
        assigned.map(u=>React.createElement('div', {key:u, className:'p-1'}, u))
      )
    ),
    assigned.length===units.length && React.createElement('p', {className:'mt-2 text-green-700'}, 'Todas as unidades ligadas!')
  );
}

function CapabilityChecklist() {
  const caps = ['Políticas de Dados','Qualidade de Dados','Gestão de Metadados','Segurança','Arquitetura','Literacia'];
  const [sel, setSel] = useState([]);
  const toggle = cap => setSel(sel.includes(cap)? sel.filter(c=>c!==cap): [...sel, cap]);
  return React.createElement('div', {className:'mt-6'},
    React.createElement('h2', {className:'text-xl font-semibold'}, 'Capacidades que precisam de DG'),
    caps.map(c=>React.createElement('label', {key:c, className:'block'},
      React.createElement('input', {type:'checkbox', className:'mr-2', checked:sel.includes(c), onChange:()=>toggle(c)}), c
    )),
    React.createElement('p', {className:'mt-2'}, `Selecionadas: ${sel.length}`)
  );
}

function Definition() {
  return React.createElement('div', {className:'space-y-6'},
    React.createElement(ElevatorPitch),
    React.createElement(DragUnits),
    React.createElement(CapabilityChecklist)
  );
}

function ScenarioSim() {
  const scenarios = {
    compliance:{name:'Compliance', desc:'Foco em regulamentos', constr:'Prazo curto, auditorias'},
    mdm:{name:'MDM', desc:'Gestão de dados mestre', constr:'Integração com sistemas legados'},
    analytics:{name:'Analytics', desc:'Suporte a BI/AI', constr:'Necessidade de dados de qualidade'}
  };
  const [sel, setSel] = useState('compliance');
  return React.createElement('div', {className:'space-y-2'},
    React.createElement('h2', {className:'text-xl font-semibold'}, 'Seleciona o cenário'),
    React.createElement('div', {className:'flex gap-4'},
      Object.keys(scenarios).map(k=>React.createElement('label', {key:k, className:'flex items-center gap-1'},
        React.createElement('input', {type:'radio', name:'scenario', value:k, checked:sel===k, onChange:()=>setSel(k)}),
        scenarios[k].name
      ))
    ),
    React.createElement('p', null, scenarios[sel].desc),
    React.createElement('p', {className:'text-sm text-gray-600'}, `Restrições: ${scenarios[sel].constr}`)
  );
}

function ScopeMatrix() {
  const [inp, setInp] = useState({in:'', out:''});
  const update = e => setInp({...inp, [e.target.name]:e.target.value});
  const download = () => {
    const text = `In Scope:\n${inp.in}\n\nRestrições:\n${inp.out}`;
    const blob = new Blob([text], {type:'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'scope_constraints.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return React.createElement('div', {className:'mt-6'},
    React.createElement('h2', {className:'text-xl font-semibold'}, 'Matriz Scope & Constraints'),
    React.createElement('div', {className:'grid md:grid-cols-2 gap-2'},
      React.createElement('textarea', {className:'border p-2', name:'in', placeholder:'In Scope', value:inp.in, onChange:update}),
      React.createElement('textarea', {className:'border p-2', name:'out', placeholder:'Restrições', value:inp.out, onChange:update})
    ),
    React.createElement('button', {className:'mt-2 px-3 py-1 bg-green-600 text-white rounded', onClick:download}, 'Exportar')
  );
}

function Scope() {
  return React.createElement('div', {className:'space-y-6'},
    React.createElement(ScenarioSim),
    React.createElement(ScopeMatrix)
  );
}

function Assessment() {
  const questions = [
    'Existem políticas publicadas de dados?',
    'Há padrões de qualidade de dados?',
    'Existem processos documentados para partilha de dados?',
    'Os dados são usados regularmente em decisões de negócio?',
    'Existem métricas de desempenho baseadas em dados?',
    'Há cultura de responsabilização pelos dados?',
    'Existem mecanismos para evitar shadow IT?',
    'Os utilizadores têm literacia de dados suficiente?',
    'A tecnologia suporta integração e rastreabilidade?',
    'Existem papéis formais de stewardship?'
  ];
  const [ans, setAns] = useState(Array(10).fill(3));
  const [res, setRes] = useState(null);
  const change = (i,v)=>{const a=[...ans]; a[i]=Number(v); setAns(a);};

  const submit = () => {
    const avg = ans.reduce((s,v)=>s+v,0)/ans.length;
    let cmmi='Initial';
    if(avg>=2 && avg<3) cmmi='Repeatable';
    else if(avg>=3 && avg<4) cmmi='Defined';
    else if(avg>=4 && avg<4.6) cmmi='Managed';
    else if(avg>=4.6) cmmi='Optimized';

    const tdwiMap = {
      Awareness:[3,4,7],
      Organization:[2],
      Policies:[0],
      Stewardship:[5,9],
      'Data Quality':[1],
      Architecture:[6,8]
    };
    const tdwiDims={};
    Object.entries(tdwiMap).forEach(([k,arr])=>{
      tdwiDims[k]=arr.reduce((s,i)=>s+ans[i],0)/arr.length;
    });
    const damaMap = {
      Metadata:[2],
      'Data Quality':[1],
      Security:[6],
      BI:[3,4]
    };
    const dama={};
    Object.entries(damaMap).forEach(([k,arr])=>{
      dama[k]=arr.reduce((s,i)=>s+ans[i],0)/arr.length;
    });
    setRes({avg, cmmi, tdwiDims, dama});
    setTimeout(()=>renderChart(tdwiDims),0);
  };

  return React.createElement('div', {className:'space-y-2'},
    React.createElement('h2', {className:'text-xl font-semibold'}, 'Maturity Assessment'),
    questions.map((q,i)=>React.createElement('div', {key:i},
      React.createElement('p', null, `${i+1}. ${q}`),
      React.createElement('select', {className:'border p-1', value:ans[i], onChange:e=>change(i,e.target.value)},
        [1,2,3,4,5].map(n=>React.createElement('option', {key:n, value:n}, n))
      )
    )),
    React.createElement('button', {className:'mt-2 px-3 py-1 bg-blue-600 text-white rounded', onClick:submit}, 'Calcular'),
    res && React.createElement('div', {className:'mt-4 space-y-2'},
      React.createElement('p', null, `Média: ${res.avg.toFixed(1)} → CMMI: `, React.createElement('strong', null, res.cmmi)),
      React.createElement('canvas', {id:'radar', width:300, height:300}),
      React.createElement('div', null,
        React.createElement('h3', {className:'font-medium'}, 'TDWI Dimensões'),
        React.createElement('ul', {className:'list-disc pl-5'},
          Object.entries(res.tdwiDims).map(([k,v])=>React.createElement('li', {key:k}, `${k}: ${v.toFixed(1)}`))
        )
      ),
      React.createElement('div', null,
        React.createElement('h3', {className:'font-medium'}, 'DAMA Áreas'),
        React.createElement('ul', {className:'list-disc pl-5'},
          Object.entries(res.dama).map(([k,v])=>React.createElement('li', {key:k}, `${k}: ${v.toFixed(1)}`))
        )
      ),
      React.createElement('button', {className:'px-3 py-1 bg-green-600 text-white rounded', onClick:()=>downloadReport(res)}, 'Download Report')
    )
  );
}

function renderChart(tdwi) {
  const ctx = document.getElementById('radar');
  if(!ctx) return;
  new Chart(ctx, {
    type:'radar',
    data:{
      labels:Object.keys(tdwi),
      datasets:[{
        label:'TDWI',
        data:Object.values(tdwi),
        backgroundColor:'rgba(37,99,235,0.2)',
        borderColor:'rgba(37,99,235,1)'
      }]
    },
    options:{scales:{r:{min:0,max:5}}}
  });
}

function downloadReport(res) {
  let text = `Média: ${res.avg.toFixed(1)}\nCMMI: ${res.cmmi}\n\nTDWI:\n`;
  Object.entries(res.tdwiDims).forEach(([k,v])=>{text+=`${k}: ${v.toFixed(1)}\n`;});
  text += '\nDAMA:\n';
  Object.entries(res.dama).forEach(([k,v])=>{text+=`${k}: ${v.toFixed(1)}\n`;});
  const blob = new Blob([text], {type:'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'maturity_report.txt';
  a.click();
  URL.revokeObjectURL(a.href);
}

function CardSorting() {
  const benefits = ['Redução de riscos','Melhor qualidade de dados','Suporte a analytics','Confiança regulatória'];
  const caps = ['Políticas de Dados','Catálogo de Dados','Literacia de Dados','Gestão de Metadados','Segurança'];
  const [map, setMap] = useState({});
  const update = (b,c)=>setMap({...map, [b]:c});
  return React.createElement('div', {className:'space-y-2'},
    React.createElement('h2', {className:'text-xl font-semibold'}, 'Card Sorting'),
    benefits.map(b=>React.createElement('div', {key:b},
      React.createElement('span', null, `${b} → `),
      React.createElement('select', {className:'border p-1', value:map[b]||'', onChange:e=>update(b,e.target.value)},
        React.createElement('option', {value:''}, 'Seleciona capacidade'),
        caps.map(c=>React.createElement('option', {key:c, value:c}, c))
      )
    )),
    React.createElement('p', {className:'text-sm text-gray-600'}, `Ligados: ${Object.keys(map).length}/${benefits.length}`)
  );
}

function RequirementsTable() {
  const [rows, setRows] = useState([]);
  const [curr, setCurr] = useState({cap:'', need:'', benefit:''});
  const add = () => {
    if(!curr.cap) return;
    setRows([...rows, curr]);
    setCurr({cap:'', need:'', benefit:''});
  };
  const download = () => {
    const header = 'Capability,Requirement,Benefit\n';
    const lines = rows.map(r=>`${r.cap},${r.need},${r.benefit}`).join('\n');
    const blob = new Blob([header+lines], {type:'text/csv'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'preliminary_requirements.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return React.createElement('div', {className:'mt-6'},
    React.createElement('h2', {className:'text-xl font-semibold'}, 'Preliminary DG Requirements'),
    React.createElement('div', {className:'grid md:grid-cols-3 gap-2'},
      React.createElement('input', {className:'border p-2', placeholder:'Capability', value:curr.cap, onChange:e=>setCurr({...curr, cap:e.target.value})}),
      React.createElement('input', {className:'border p-2', placeholder:'Requirement', value:curr.need, onChange:e=>setCurr({...curr, need:e.target.value})}),
      React.createElement('input', {className:'border p-2', placeholder:'Benefit', value:curr.benefit, onChange:e=>setCurr({...curr, benefit:e.target.value})})
    ),
    React.createElement('button', {className:'mt-2 px-3 py-1 bg-blue-600 text-white rounded', onClick:add}, 'Adicionar'),
    React.createElement('table', {className:'mt-2 w-full text-sm border'},
      React.createElement('thead', null,
        React.createElement('tr', null,
          ['Capability','Requirement','Benefit'].map(h=>React.createElement('th', {key:h, className:'border p-1'}, h))
        )
      ),
      React.createElement('tbody', null,
        rows.map((r,i)=>React.createElement('tr', {key:i},
          React.createElement('td', {className:'border p-1'}, r.cap),
          React.createElement('td', {className:'border p-1'}, r.need),
          React.createElement('td', {className:'border p-1'}, r.benefit)
        ))
      )
    ),
    rows.length>0 && React.createElement('button', {className:'mt-2 px-3 py-1 bg-green-600 text-white rounded', onClick:download}, 'Exportar CSV')
  );
}

function FutureVision() {
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState('');
  const check = () => {
    const t = text.toLowerCase();
    const missing = [];
    ['catálogo','qualidade','responsabilidade'].forEach(k=>{if(!t.includes(k)) missing.push(k);});
    setFeedback(missing.length? `Considera incluir: ${missing.join(', ')}` : '👍 Boa visão!');
  };
  return React.createElement('div', {className:'mt-6'},
    React.createElement('h2', {className:'text-xl font-semibold'}, 'Future DG Vision'),
    React.createElement('textarea', {className:'border p-2 w-full', rows:4, placeholder:'Descreve um dia na vida do Inovadata...', value:text, onChange:e=>setText(e.target.value)}),
    React.createElement('button', {className:'mt-2 px-3 py-1 bg-blue-600 text-white rounded', onClick:check}, 'Validar'),
    feedback && React.createElement('p', {className:'mt-2'}, feedback)
  );
}

function VisionPlan() {
  return React.createElement('div', {className:'space-y-6'},
    React.createElement(CardSorting),
    React.createElement(RequirementsTable),
    React.createElement(FutureVision)
  );
}

function App() {
  const [tab, setTab] = useState('init');
  return React.createElement('div', {className:'max-w-4xl mx-auto p-4'},
    React.createElement('h1', {className:'text-2xl font-bold mb-4'}, 'Programa de Engagement — Banco Inovadata'),
    React.createElement('nav', {className:'flex flex-wrap gap-2 mb-4'},
      React.createElement(TabButton, {id:'init', label:'1. Iniciação', current:tab, setTab}),
      React.createElement(TabButton, {id:'def', label:'2. Definição', current:tab, setTab}),
      React.createElement(TabButton, {id:'scope', label:'3. Âmbito', current:tab, setTab}),
      React.createElement(TabButton, {id:'assess', label:'4. Avaliação', current:tab, setTab}),
      React.createElement(TabButton, {id:'vision', label:'5. Visão & Plano', current:tab, setTab})
    ),
    tab==='init' && React.createElement(Initiation),
    tab==='def' && React.createElement(Definition),
    tab==='scope' && React.createElement(Scope),
    tab==='assess' && React.createElement(Assessment),
    tab==='vision' && React.createElement(VisionPlan)
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
