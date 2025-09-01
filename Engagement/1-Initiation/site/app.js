// Lightweight MD renderer (headings, lists, bold/italic, code fences)
function mdToHtml(md){
  // Code fences
  md = md.replace(/```([\s\S]*?)```/g, (_,code)=> `<pre><code>${escapeHtml(code)}</code></pre>`);
  // Headings
  md = md.replace(/^###### (.*)$/gm, '<h6>$1</h6>')
         .replace(/^##### (.*)$/gm, '<h5>$1</h5>')
         .replace(/^#### (.*)$/gm, '<h4>$1</h4>')
         .replace(/^### (.*)$/gm, '<h3>$1</h3>')
         .replace(/^## (.*)$/gm, '<h2>$1</h2>')
         .replace(/^# (.*)$/gm, '<h1>$1</h1>');
  // Bold / Italic
  md = md.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
         .replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Lists
  md = md.replace(/(^|\n)- (.+)/g, '$1<li>$2</li>');
  md = md.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  // Paragraphs (naive)
  md = md.split(/\n{2,}/).map(block => {
    if (/^<h\d|^<ul|^<pre/.test(block.trim())) return block;
    return `<p>${block.replace(/\n/g,'<br/>')}</p>`;
  }).join('\n');
  return md;
}
function escapeHtml(s){ return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])) }

// CSV helpers
function parseCSV(text){
  // minimal CSV parser (handles simple quotes and commas)
  const rows=[]; let row=[], cell='', inQ=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i], next=text[i+1];
    if(ch==='\"'){
      if(inQ && next==='\"'){ cell+='\"'; i++; }
      else inQ=!inQ;
    } else if(ch===',' && !inQ){ row.push(cell); cell=''; }
      else if((ch==='\n' || ch==='\r') && !inQ){
        if(ch==='\r' && next==='\n'){ i++; }
        row.push(cell); rows.push(row); row=[]; cell='';
      } else { cell+=ch; }
  }
  if(cell.length>0 || row.length>0){ row.push(cell); rows.push(row); }
  return rows;
}
function toCSV(rows){
  return rows.map(r=> r.map(c=> {
    if(/[",\n\r]/.test(c)) return `"${c.replace(/"/g,'""')}"`;
    return c;
  }).join(',')).join('\n');
}

const viewer = document.getElementById('viewer');
const statusEl = document.getElementById('status');
const downloadBtn = document.getElementById('downloadBtn');
let currentType = null;
let currentPath = null;
let currentData = null; // {text} for md; {rows} for csv

async function fetchText(path){
  const res = await fetch(path);
  if(!res.ok) throw new Error(`Falha ao carregar: ${path}`);
  return await res.text();
}

function setStatus(msg){ statusEl.textContent = msg; setTimeout(()=> statusEl.textContent='', 3000); }

async function loadMd(path){
  const text = await fetchText(path);
  currentType = 'md'; currentPath = path; currentData = { text };
  viewer.innerHTML = `
    <div class="toolbar">
      <button id="editMd">Editar</button>
      <button id="previewMd" disabled>Pré-visualizar</button>
    </div>
    <div id="mdWrap"><div id="mdPreview">${mdToHtml(text)}</div></div>
  `;
  downloadBtn.disabled = false;
  document.getElementById('editMd').onclick = () => {
    const ta = document.createElement('textarea');
    ta.value = currentData.text;
    ta.style.width='100%'; ta.style.minHeight='320px';
    ta.addEventListener('input', ()=> { currentData.text = ta.value; });
    const wrap = document.getElementById('mdWrap');
    wrap.innerHTML=''; wrap.appendChild(ta);
    document.getElementById('editMd').disabled = true;
    document.getElementById('previewMd').disabled = false;
  };
  document.getElementById('previewMd').onclick = () => {
    const wrap = document.getElementById('mdWrap');
    wrap.innerHTML = `<div id="mdPreview">${mdToHtml(currentData.text)}</div>`;
    document.getElementById('previewMd').disabled = true;
    document.getElementById('editMd').disabled = false;
  };
}

async function loadCsv(path){
  const text = await fetchText(path);
  currentType = 'csv'; currentPath = path; currentData = { rows: parseCSV(text) };
  renderCsv();
  downloadBtn.disabled = false;
}

function renderCsv(){
  const rows = currentData.rows;
  const header = rows[0] || [];
  const body = rows.slice(1);
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const trH = document.createElement('tr');
  header.forEach(h=> { const th=document.createElement('th'); th.textContent = h; trH.appendChild(th); });
  const thActions = document.createElement('th'); thActions.textContent=''; trH.appendChild(thActions);
  thead.appendChild(trH);
  const tbody = document.createElement('tbody');
  body.forEach((r,ri)=>{
    const tr=document.createElement('tr');
    header.forEach((_,ci)=>{
      const td=document.createElement('td'); td.contentEditable='true'; td.className='cell-edit'; td.textContent = r[ci] ?? '';
      td.addEventListener('input', ()=> { currentData.rows[ri+1][ci] = td.textContent; });
      tr.appendChild(td);
    });
    const tdAct=document.createElement('td');
    const del = document.createElement('button'); del.textContent='Remover'; del.onclick=()=>{ currentData.rows.splice(ri+1,1); renderCsv(); }
    tdAct.appendChild(del); tr.appendChild(tdAct);
    tbody.appendChild(tr);
  });
  table.appendChild(thead); table.appendChild(tbody);

  const toolbar = document.createElement('div');
  toolbar.className='toolbar';
  const addRow = document.createElement('button'); addRow.textContent='Adicionar linha'; addRow.onclick = ()=>{ currentData.rows.push(Array(header.length).fill('')); renderCsv(); };
  const addCol = document.createElement('button'); addCol.textContent='Adicionar coluna'; addCol.onclick = ()=>{ currentData.rows = currentData.rows.map(r=> r.concat('')); renderCsv(); };
  toolbar.appendChild(addRow); toolbar.appendChild(addCol);

  viewer.innerHTML='';
  viewer.appendChild(toolbar);
  viewer.appendChild(table);
}

document.querySelectorAll('nav button[data-view]').forEach(btn => {
  btn.addEventListener('click', async () => {
    try{
      const kind = btn.getAttribute('data-view');
      const path = btn.getAttribute('data-path');
      if(kind==='md') await loadMd(path);
      else await loadCsv(path);
      setStatus(`Carregado: ${path.replace('../','')}`);
    }catch(err){ viewer.innerHTML = `<p>Erro: ${err.message}</p>`; }
  });
});

// Download updates
downloadBtn.addEventListener('click', () => {
  if(!currentType) return;
  if(currentType==='md'){
    const blob = new Blob([currentData.text], {type:'text/markdown;charset=utf-8;'});
    triggerDownload(blob, fileNameFromPath(currentPath) || 'document.md');
  } else if(currentType==='csv'){
    const csv = toCSV(currentData.rows);
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    triggerDownload(blob, fileNameFromPath(currentPath) || 'data.csv');
  }
});

function triggerDownload(blob, name){
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
  setStatus(`Descarregado: ${name}`);
}
function fileNameFromPath(p){ return (p||'').split('/').pop(); }

// Open local file
document.getElementById('openLocal').addEventListener('change', (e) => {
  const f = e.target.files[0]; if(!f) return;
  const reader = new FileReader();
  if(f.name.endsWith('.md')){
    reader.onload = ev => { currentType='md'; currentPath=f.name; currentData={text:ev.target.result}; loadMdFromText(ev.target.result); };
    reader.readAsText(f);
  } else if(f.name.endsWith('.csv')){
    reader.onload = ev => { currentType='csv'; currentPath=f.name; currentData={rows: parseCSV(ev.target.result)}; renderCsv(); };
    reader.readAsText(f);
  } else {
    setStatus('Tipo de ficheiro não suportado.');
  }
});
function loadMdFromText(text){
  viewer.innerHTML = `
    <div class="toolbar">
      <button id="editMd" disabled>Editar</button>
      <button id="previewMd">Pré-visualizar</button>
    </div>
    <div id="mdWrap"><textarea style="width:100%;min-height:320px">${text}</textarea></div>`;
  const ta = viewer.querySelector('textarea');
  ta.addEventListener('input', ()=> { currentData.text = ta.value; });
  document.getElementById('previewMd').onclick = () => {
    const wrap = document.getElementById('mdWrap');
    wrap.innerHTML = `<div id="mdPreview">${mdToHtml(currentData.text)}</div>`;
    document.getElementById('previewMd').disabled = true;
    document.getElementById('editMd').disabled = false;
    document.getElementById('editMd').onclick = () => loadMdFromText(currentData.text);
  };
  downloadBtn.disabled = false;
}
