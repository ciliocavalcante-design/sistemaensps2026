// Módulo extraído de assets/js/index.js
// Mantém escopo global do sistema ENSPS 2026.

  // ============================================================
  // ABA 1 – AGENDA ESCOLAR
  // ============================================================
  const agendaHorarios = {
    '6ano': {
      'segunda': [{ materia:'Ciências',professor:'Elayne'},{ materia:'Inglês',professor:'Michael'},{ materia:'Ed. Física M.',professor:'Bruno'}],
      'terca':   [{ materia:'LPT',professor:'Márcia'},{ materia:'Matemática',professor:'Eduardo'},{ materia:'Filosofia',professor:'Michael'}],
      'quarta':  [{ materia:'Avaliação',professor:''},{ materia:'Geografia',professor:'Silânia'},{ materia:'Matemática',professor:'Eduardo'},{ materia:'Ed. Física F.',professor:'Bruno'}],
      'quinta':  [{ materia:'Gramática',professor:'Márcia'},{ materia:'História',professor:'Alexandre'},{ materia:'Paradidat.',professor:'Márcia'}],
      'sexta':   [{ materia:'Matemática',professor:'Eduardo'},{ materia:'Geografia',professor:'Silânia'},{ materia:'Ciências',professor:'Elayne'}]
    },
    '7ano': {
      'segunda': [{ materia:'Paradidat.',professor:'Márcia'},{ materia:'História',professor:'Alexandre'},{ materia:'Ciências',professor:'Elayne'},{ materia:'Ed. Física M.',professor:'Bruno'}],
      'terca':   [{ materia:'Inglês',professor:'Michael'},{ materia:'Filosofia',professor:'Fabíola'},{ materia:'Gramática',professor:'Márcia'}],
      'quarta':  [{ materia:'Avaliação',professor:''},{ materia:'Matemática',professor:'Eduardo'},{ materia:'Ciências',professor:'Elayne'},{ materia:'Ed. Física F.',professor:'Bruno'}],
      'quinta':  [{ materia:'Inglês',professor:'Michael'},{ materia:'Matemática',professor:'Eduardo'},{ materia:'LPT',professor:'Márcia'}],
      'sexta':   [{ materia:'Geografia',professor:'Silânia'},{ materia:'História',professor:'Alexandre'},{ materia:'Matemática',professor:'Eduardo'}]
    },
    '8ano': {
      'segunda': [{ materia:'LPT',professor:'Thayna'},{ materia:'Gramática',professor:'Márcia'},{ materia:'História',professor:'Alexandre'}],
      'terca':   [{ materia:'Matemática',professor:'Eduardo'},{ materia:'Filosofia',professor:'Fabíola'},{ materia:'Ed. Física',professor:'Bruno'}],
      'quarta':  [{ materia:'Avaliação',professor:''},{ materia:'Ciências',professor:'Elayne'},{ materia:'Paradidat.',professor:'Márcia'},{ materia:'Geografia',professor:'Silânia'}],
      'quinta':  [{ materia:'Matemática',professor:'Eduardo'},{ materia:'Inglês',professor:'Michael'},{ materia:'Geografia',professor:'Silânia'}],
      'sexta':   [{ materia:'Ciências',professor:'Elayne'},{ materia:'Matemática',professor:'Eduardo'},{ materia:'História',professor:'Alexandre'}]
    },
    '9ano': {
      'segunda': [{ materia:'Matemática',professor:'Helly'},{ materia:'Paradidat.',professor:'Márcia'},{ materia:'LPT',professor:'Thayna'},{ materia:'Biologia',professor:'Silânia'}],
      'terca':   [{ materia:'Química',professor:'Elayne'},{ materia:'Inglês',professor:'Michael'},{ materia:'Física',professor:'Helly'},{ materia:'Filosofia',professor:'Fabíola'},{ materia:'Matemática',professor:'Helly'}],
      'quarta':  [{ materia:'Avaliação',professor:''},{ materia:'Gramática',professor:'Márcia'},{ materia:'Biologia',professor:'Silânia'}],
      'quinta':  [{ materia:'Matemática',professor:'Helly'},{ materia:'Física',professor:'Helly'},{ materia:'Inglês',professor:'Michael'},{ materia:'Ed. Física',professor:'Bruno'}],
      'sexta':   [{ materia:'História',professor:'Alexandre'},{ materia:'Química',professor:'Elayne'},{ materia:'Geografia',professor:'Silânia'}]
    },
    '1em': {
      'segunda': [{ materia:'Biologia',professor:'Isadora'},{ materia:'Sociologia',professor:'Fabíola'},{ materia:'Filosofia',professor:'Fabíola'},{ materia:'Física',professor:'Helly'},{ materia:'Literatura',professor:'Thayna'}],
      'terca':   [{ materia:'Gramática',professor:'Jordan'},{ materia:'Matemática',professor:'Diogo'},{ materia:'História',professor:'Alexandre'},{ materia:'Química',professor:'Amanda'}],
      'quarta':  [{ materia:'Geografia',professor:'Rafaely'},{ materia:'História',professor:'Alexandre'},{ materia:'Matemática',professor:'Diogo'},{ materia:'Inglês',professor:'Michael'},{ materia:'Química 3',professor:'Amanda'}],
      'quinta':  [{ materia:'Biologia',professor:'Isadora'},{ materia:'Interpret',professor:'Thamyres'},{ materia:'Redação',professor:'Ravena'},{ materia:'Prat Prod Txt',professor:'Ravena'},{ materia:'Ed. Física',professor:'Bruno'}],
      'sexta':   [{ materia:'Mat. Fundam.',professor:'Diogo'},{ materia:'Trilha Mat.',professor:'Diogo'},{ materia:'Física',professor:'Helly'},{ materia:'Geografia',professor:'Rafaely'},{ materia:'História',professor:'Alexandre'}]
    },
    '2em': {
      'segunda': [{ materia:'Proj. de Vida',professor:'Fabíola'},{ materia:'Física',professor:'Helly'},{ materia:'História',professor:'Alexandre'},{ materia:'Filosofia',professor:'Fabíola'},{ materia:'Biologia',professor:'Isadora'}],
      'terca':   [{ materia:'Química',professor:'Amanda'},{ materia:'Gramática',professor:'Jordan'},{ materia:'Sociologia',professor:'Fabíola'}],
      'quarta':  [{ materia:'Trilha L.C.',professor:'Marcos'},{ materia:'História',professor:'Alexandre'},{ materia:'Inglês',professor:'Marcos'},{ materia:'Matemática',professor:'Diogo'}],
      'quinta':  [{ materia:'Interpret',professor:'Thamyres'},{ materia:'Literatura',professor:'Thamyres'},{ materia:'Redação',professor:'Ravena'},{ materia:'Prat Prod Txt',professor:'Ravena'},{ materia:'Biologia',professor:'Isadora'},{ materia:'História',professor:'Alexandre'},{ materia:'Ed. Física',professor:'Bruno'}],
      'sexta':   [{ materia:'Geografia',professor:'Rafaely'},{ materia:'Física',professor:'Helly'},{ materia:'Matemática',professor:'Diogo'}]
    },
    '3em': {
      'segunda': [{ materia:'História 2',professor:'Alexandre'},{ materia:'Biologia 1',professor:'Isadora'},{ materia:'Biologia 2',professor:'Isadora'},{ materia:'Trilha Geo',professor:'Silânia'},{ materia:'Filosofia',professor:'Fabíola'},{ materia:'Física 1',professor:'Helly'},{ materia:'Física 2',professor:'Helly'}],
      'terca':   [{ materia:'Matemática 1',professor:'Diogo'},{ materia:'Matemática 2',professor:'Diogo'},{ materia:'Química 1',professor:'Amanda'},{ materia:'Química 2',professor:'Amanda'},{ materia:'Gramática',professor:'Jordan'},{ materia:'Sociologia',professor:'Fabíola'}],
      'quarta':  [{ materia:'Trilha Quím',professor:'Amanda'},{ materia:'Matemática 3',professor:'Diogo'},{ materia:'Inglês',professor:'Marcos'},{ materia:'História 1',professor:'Alexandre'},{ materia:'Química 3',professor:'Amanda'}],
      'quinta':  [{ materia:'Redação',professor:'Ravena'},{ materia:'Biologia 3',professor:'Isadora'},{ materia:'Trilha Biol.',professor:'Isadora'},{ materia:'Literatura',professor:'Thamyres'},{ materia:'Interpret',professor:'Thamyres'}],
      'sexta':   [{ materia:'Física 3',professor:'Helly'},{ materia:'Geografia 1',professor:'Rafaely'},{ materia:'Geografia 2',professor:'Rafaely'},{ materia:'Trilha Física',professor:'Helly'},{ materia:'Matemática 4',professor:'Diogo'},{ materia:'Matemática 5',professor:'Diogo'}]
    }
  };

  const agendaDiasSemana = ['domingo','segunda','terca','quarta','quinta','sexta','sabado'];

  const agendaNomesSeries = {
    '6ano':'6º ANO','7ano':'7º ANO','8ano':'8º ANO','9ano':'9º ANO',
    '1em':'1º ANO','2em':'2º ANO','3em':'3º ANO'
  };


  function agendaGerar() {
    const serie = document.getElementById('agenda-serie').value;
    const data  = document.getElementById('agenda-data').value;

    if (!serie) { agendaMostrarAviso('Por favor, selecione uma série.'); return; }
    if (!data)  { agendaMostrarAviso('Por favor, selecione uma data.'); return; }

    const dataObj  = new Date(data + 'T00:00:00');
    const diaSemana = agendaDiasSemana[dataObj.getDay()];

    if (diaSemana === 'domingo' || diaSemana === 'sabado') {
      agendaMostrarAviso('Não há aulas aos finais de semana.');
      return;
    }

    const aulasDoDia = agendaHorarios[serie][diaSemana];
    if (!aulasDoDia || aulasDoDia.length === 0) {
      agendaMostrarAviso('Não há aulas cadastradas para este dia.');
      return;
    }

    const dia = String(dataObj.getDate()).padStart(2,'0');
    const mes = String(dataObj.getMonth()+1).padStart(2,'0');
    const dataFormatada = `${dia}/${mes}`;

    let html = `<div class="agenda-title">AGENDA ENSPS ${agendaNomesSeries[serie]} - ${dataFormatada}</div>`;

    const aulasProcessadas = agendaProcessarAulas(aulasDoDia);

    aulasProcessadas.forEach(aula => {
      html += `<div class="subject-block">
        <div class="subject-name">${aula.materia}</div>
        <div class="subject-detail">Conteúdo:</div>
        <div class="subject-detail">Classe:</div>
        <div class="subject-detail">Casa:</div>
      </div>`;
    });

    document.getElementById('agenda-preview').innerHTML = html;
    document.getElementById('agenda-outputContainer').classList.add('show');

    const btnCopy = document.getElementById('agenda-btnCopy');
    btnCopy.disabled = false;
    btnCopy.dataset.serie = agendaNomesSeries[serie];
    btnCopy.dataset.data  = dataFormatada;
    btnCopy.dataset.aulas = JSON.stringify(aulasProcessadas);

    document.getElementById('agenda-warningMsg').classList.remove('show');
  }

  function agendaProcessarAulas(aulas) {
    const unicas = [];
    const adicionadas = new Set();
    aulas.forEach(aula => {
      if (aula.materia.toLowerCase().includes('ed. física') ||
          aula.materia.toLowerCase().includes('educação física')) return;
      const chave = `${aula.materia}_${aula.professor}`;
      if (adicionadas.has(chave)) return;
      unicas.push(aula);
      adicionadas.add(chave);
    });
    return unicas;
  }

  async function agendaCopiar() {
    const btn   = document.getElementById('agenda-btnCopy');
    const serie = btn.dataset.serie;
    const data  = btn.dataset.data;
    const aulas = JSON.parse(btn.dataset.aulas);

    let htmlContent = `<p><b>AGENDA ENSPS ${serie} - ${data}</b></p><p></p>`;
    let textoSimples = `AGENDA ENSPS ${serie} - ${data}\n\n`;

    aulas.forEach(aula => {
      htmlContent  += `<p><b>${aula.materia}</b><br>Conteúdo:<br>Classe:<br>Casa:</p><p></p>`;
      textoSimples += `${aula.materia}\nConteúdo:\nClasse:\nCasa:\n\n`;
    });

    try {
      const clipItem = new ClipboardItem({
        'text/html':  new Blob([htmlContent],  { type: 'text/html' }),
        'text/plain': new Blob([textoSimples], { type: 'text/plain' })
      });
      await navigator.clipboard.write([clipItem]);
    } catch(e) {
      await navigator.clipboard.writeText(textoSimples);
    }

    const msg = document.getElementById('agenda-successMsg');
    msg.classList.add('show');
    setTimeout(() => msg.classList.remove('show'), 3000);
  }

  function agendaMostrarAviso(mensagem) {
    const w = document.getElementById('agenda-warningMsg');
    w.textContent = mensagem;
    w.classList.add('show');
    setTimeout(() => w.classList.remove('show'), 4000);
  }

  // ============================================================
  // ABA 2 – ENTREGA DE MATERIAIS
  // ============================================================
  const matTeachersData = {
    'Prof. Helly':     ['Matemática','Física'],
    'Prof. Jordan':    ['Gramática','PPT','Literatura','Arte','Interpretação de Texto'],
    'Prof. Silânia':   ['Geografia','Trilha Geografia','Trilha Química','Biologia'],
    'Prof. Amanda':    ['Química'],
    'Prof. Isadora':   ['Biologia'],
    'Prof. Bruno':     ['Educação Física'],
    'Prof. Thamyres':  ['Gramática','LPT','Literatura','Arte','Interpretação de Texto'],
    'Prof. Fabíola':   ['Filosofia','Sociologia'],
    'Prof. Diogo':     ['Matemática','Trilha Matemática','Matemática Fundamental'],
    'Prof. Thayna':    ['Gramática','LPT','Literatura'],
    'Prof. Márcia':    ['Gramática','LPT','Paradidático'],
    'Prof. Rafaely':   ['Geografia'],
    'Prof. Elayne':    ['Ciências','Química'],
    'Prof. Michael':   ['Inglês','Filosofia'],
    'Prof. Alexandre': ['História'],
    'Prof. Eduardo':   ['Matemática'],
    'Prof. Ravena':    ['Redação','PPT']
  };

  const matDeliveryMaterials = [
    { name: 'Roteiros',                stages: ['1ª Etapa','2ª Etapa','3ª Etapa','4ª Etapa'] },
    { name: 'Avaliações Parciais',     stages: ['1ª Etapa','2ª Etapa','3ª Etapa','4ª Etapa'] },
    { name: 'Avaliações Bimestrais',   stages: ['1ª Etapa','2ª Etapa','3ª Etapa','4ª Etapa'] },
    { name: 'Avaliações de Recuperação' },
    { name: 'TD de Recuperação' },
    { name: 'Diário' },
    { name: 'Planejamento',            stages: ['1ª Etapa','2ª Etapa','3ª Etapa','4ª Etapa'] }
  ];

  let matCurrentFilter = { type:'all', material:'all-materials', status:'all-status', stage:'all-stages' };

  
  function matPopulateMaterialSelect() {
    const sel = document.getElementById('mat-material-select');
    sel.innerHTML = '<option value="all-materials">Todos os Materiais</option>';
    matDeliveryMaterials.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.name;
      opt.textContent = m.name;
      sel.appendChild(opt);
    });
  }

  function matLoadDeliveries(professor) {
    const deliveries = obterDeliveriesMateriais();
    return deliveries[professor] ? { ...deliveries[professor] } : {};
  }

  function matSaveDeliveries(professor, deliveries) {
    const all = obterDeliveriesMateriais();
    all[professor] = { ...deliveries };
    enspsDB.professoresMateriais = { deliveries: all };
    persistirENSPSDB();
  }

  function matGetVisibleCols() {
    // Returns array of {key, matName, stageName} for visible columns based on detail filter
    const material = matCurrentFilter.material;
    const stage    = matCurrentFilter.stage;
    const cols = [];
    matDeliveryMaterials.forEach(m => {
      if (material !== 'all-materials' && m.name !== material) return;
      if (m.stages) {
        m.stages.forEach(s => {
          if (stage !== 'all-stages' && s !== stage) return;
          cols.push({ key: `${m.name}-${s}`, matName: m.name, stageName: s, hasStages: true });
        });
      } else {
        cols.push({ key: m.name, matName: m.name, stageName: null, hasStages: false });
      }
    });
    return cols;
  }

  function matApplyFilter() {
    const material = document.getElementById('mat-material-select').value;
    const status   = document.getElementById('mat-status-select').value;
    const stage    = document.getElementById('mat-stage-select').value;

    matCurrentFilter.material = material;
    matCurrentFilter.status   = status;
    matCurrentFilter.stage    = stage;

    // Show/hide etapa select
    const selMat = matDeliveryMaterials.find(m => m.name === material);
    const stageSelect = document.getElementById('mat-stage-select');
    if (selMat && selMat.stages) {
      stageSelect.style.display = 'inline-block';
    } else {
      stageSelect.style.display = 'none';
      stageSelect.value = 'all-stages';
      matCurrentFilter.stage = 'all-stages';
    }

    matRenderHeaders();
    matRenderTable();
  }

  function matRenderHeaders() {
    const mainRow  = document.getElementById('mat-main-headers');
    const stageRow = document.getElementById('mat-stage-headers');
    while (mainRow.children.length > 1) mainRow.removeChild(mainRow.lastChild);
    stageRow.innerHTML = '';

    const cols = matGetVisibleCols();

    // Group cols by matName for colspan
    const groups = {};
    cols.forEach(c => {
      if (!groups[c.matName]) groups[c.matName] = [];
      groups[c.matName].push(c);
    });

    Object.entries(groups).forEach(([name, items]) => {
      const th = document.createElement('th');
      th.textContent = name;
      th.classList.add('material-header');
      if (items[0].hasStages) {
        th.colSpan = items.length;
        mainRow.appendChild(th);
        items.forEach(c => {
          const sTh = document.createElement('th');
          sTh.textContent = c.stageName;
          sTh.classList.add('stage-header');
          stageRow.appendChild(sTh);
        });
      } else {
        th.rowSpan = 2;
        mainRow.appendChild(th);
      }
    });
  }

  function matRenderTable() {
    const tbody    = document.querySelector('#mat-deliveries-table tbody');
    const totalRow = document.getElementById('mat-total-row');

    tbody.innerHTML = '';
    totalRow.innerHTML = '<td class="professor-name">Total de Entregas:</td>';

    const cols = matGetVisibleCols();
    const status = matCurrentFilter.status;

    const counts = {};
    cols.forEach(c => counts[c.key] = 0);

    const sorted = Object.keys(matTeachersData).sort();
    let visible = 0;

    sorted.forEach(prof => {
      const deliveries = matLoadDeliveries(prof);
      const isChecked  = k => deliveries[k] === true;

      // Row visibility: quick-filter buttons filter by row status across visible cols
      let show = true;
      if (matCurrentFilter.type === 'pending-any') {
        show = cols.some(c => !isChecked(c.key));
      } else if (matCurrentFilter.type === 'complete-all') {
        show = cols.every(c => isChecked(c.key));
      } else if (status === 'pending') {
        show = cols.some(c => !isChecked(c.key));
      } else if (status === 'complete') {
        show = cols.every(c => isChecked(c.key));
      }

      if (!show) return;
      visible++;

      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      nameCell.classList.add('professor-name');
      nameCell.textContent = prof;
      row.appendChild(nameCell);

      cols.forEach(col => {
        const cell = document.createElement('td');
        cell.classList.add('checkbox-cell');
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = isChecked(col.key);
        if (cb.checked) counts[col.key]++;
        cb.addEventListener('change', e => {
          deliveries[col.key] = e.target.checked;
          matSaveDeliveries(prof, deliveries);
          matRenderTable();
        });
        cell.appendChild(cb);
        row.appendChild(cell);
      });

      tbody.appendChild(row);
    });

    cols.forEach(col => {
      const td = document.createElement('td');
      td.classList.add('checkbox-cell');
      td.textContent = counts[col.key];
      totalRow.appendChild(td);
    });

    document.getElementById('mat-no-results').style.display = visible === 0 ? 'block' : 'none';
  }

  // Quick-filter buttons (filter rows, show all columns)
  document.querySelectorAll('#mat-quick-filters button').forEach(btn => {
    btn.addEventListener('click', e => {
      document.querySelectorAll('#mat-quick-filters button').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      matCurrentFilter.type = e.target.id.replace('mat-filter-', '');
      matRenderTable();
    });
  });

  // Material select → show/hide stage select immediately
  document.getElementById('mat-material-select').addEventListener('change', function() {
    const selMat = matDeliveryMaterials.find(m => m.name === this.value);
    const stageSelect = document.getElementById('mat-stage-select');
    if (selMat && selMat.stages) {
      stageSelect.style.display = 'inline-block';
    } else {
      stageSelect.style.display = 'none';
      stageSelect.value = 'all-stages';
    }
  });

  document.getElementById('mat-btn-aplicar').addEventListener('click', matApplyFilter);

  document.getElementById('mat-btn-limpar-filtros').addEventListener('click', function() {
    document.getElementById('mat-material-select').value = 'all-materials';
    document.getElementById('mat-status-select').value   = 'all-status';
    document.getElementById('mat-stage-select').value    = 'all-stages';
    document.getElementById('mat-stage-select').style.display = 'none';
    matCurrentFilter = { type:'all', material:'all-materials', status:'all-status', stage:'all-stages' };
    document.querySelectorAll('#mat-quick-filters button').forEach(b => b.classList.remove('active'));
    document.getElementById('mat-filter-all').classList.add('active');
    matRenderHeaders();
    matRenderTable();
  });

  document.getElementById('mat-clear-btn').addEventListener('click', () => {
    if (confirm('Tem certeza que deseja limpar TODAS as entregas de TODOS os professores? Esta ação não pode ser desfeita.')) {
      enspsDB.professoresMateriais = { deliveries: {} };
      persistirENSPSDB();
      matApplyFilter();
      alert('Todas as entregas foram limpas com sucesso!');
    }
  });

  // ============================================================
  // ABA 3 – FREQUÊNCIA / FOLHA DE PAGAMENTO
  // ============================================================
  const freqProfessores = [
    'Helly','Jordan','Silânia','Amanda','Isadora','Bruno','Marcos',
    'Substituto','Fabíola','Diogo','Thayna','Márcia','Rafaely','Elayne',
    'Michael','Thamyres','Alexandre','Eduardo','Ravena'
  ];

  let freqCurrentDate = new Date();
  let freqSubstCounter = 0;

  function freqGetAllFrequencyRecords() {
    return obterFolhaProfessores().frequencyRecords;
  }

  function freqSetAllFrequencyRecords(records) {
    obterFolhaProfessores().frequencyRecords = records;
    persistirENSPSDB();
  }

  function freqGetAllExtraAvulsaRecords() {
    return obterFolhaProfessores().extraAvulsaRecords;
  }

  function freqSetAllExtraAvulsaRecords(records) {
    obterFolhaProfessores().extraAvulsaRecords = records;
    persistirENSPSDB();
  }

  function freqGetMonthYearString(date) {
    const s = date.toLocaleDateString('pt-BR', { month:'long', year:'numeric' });
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function freqSetCurrentMonthDisplay() {
    const s = freqGetMonthYearString(freqCurrentDate);
    document.getElementById('freq-currentMonthYear').textContent = s;
    document.getElementById('freq-printMonthYear').textContent   = s;
  }

  function freqPopulateProfessorSelects() {
    const sorted = [...freqProfessores].sort();
    ['freq-professorFalta','freq-professorExtra'].forEach(id => {
      const sel = document.getElementById(id);
      while (sel.children.length > 1) sel.removeChild(sel.lastChild);
      sorted.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p; opt.textContent = p;
        sel.appendChild(opt);
      });
    });
  }

  function freqAddSubstituicaoItem() {
    freqSubstCounter++;
    const sorted = [...freqProfessores].sort();
    let opts = '<option value="">Nenhum</option><option value="Sem substituto">Sem substituto</option>';
    sorted.forEach(p => { opts += `<option value="${p}">${p}</option>`; });

    const div = document.createElement('div');
    div.classList.add('substituicao-item');
    div.dataset.id = freqSubstCounter;
    div.innerHTML = `
      <div class="form-group">
        <label>Professor Substituto:</label>
        <select class="subst-professor">${opts}</select>
      </div>
      <div class="form-group">
        <label>Ensino:</label>
        <select class="subst-ensino">
          <option value="">Selecione</option>
          <option value="EF">Fundamental</option>
          <option value="EM">Médio</option>
        </select>
      </div>
      <div class="form-group">
        <label>Qtde:</label>
        <input type="number" class="subst-qtde" min="0" value="1">
      </div>
      <button type="button" class="remove-substituicao-btn">X</button>
    `;
    div.querySelector('.remove-substituicao-btn').addEventListener('click', () => {
      div.remove();
      const list = document.getElementById('freq-substituicoesList');
      if (list.children.length === 0) freqAddSubstituicaoItem();
    });
    document.getElementById('freq-substituicoesList').appendChild(div);
  }

  document.getElementById('freq-addSubstBtn').addEventListener('click', freqAddSubstituicaoItem);

  function freqLoadFrequencyRecords() {
    const all = freqGetAllFrequencyRecords();
    const cm  = freqCurrentDate.getMonth();
    const cy  = freqCurrentDate.getFullYear();

    const faltas = all.filter(r => {
      if (r.tipo !== 'falta') return false;
      const p = r.dia.split('/');
      return p.length === 3 && parseInt(p[1])-1 === cm && parseInt(p[2]) === cy;
    });

    const tbody = document.getElementById('freq-faltasTableBody');
    tbody.innerHTML = '';
    faltas.forEach(r => freqAddFaltaToTable(r));
    document.getElementById('freq-emptyFaltas').style.display = tbody.children.length === 0 ? 'block' : 'none';

    freqUpdatePrintSummary();
    freqUpdatePrintExtrasAvulsas();
  }

  function freqSaveFrequencyRecord(record) {
    const all = [...freqGetAllFrequencyRecords()];
    all.push(record);
    freqSetAllFrequencyRecords(all);
  }

  function freqAddFaltaToTable(record) {
    const tbody = document.getElementById('freq-faltasTableBody');
    const row = tbody.insertRow();
    row.insertCell(0).textContent = record.dia;
    row.insertCell(1).textContent = record.falta || '';
    row.insertCell(2).textContent = record.substExtra || '';
    row.insertCell(3).textContent = record.fiiEm || '';
    row.insertCell(4).textContent = record.motivo;
    row.insertCell(5).textContent = record.qtde !== undefined ? record.qtde : '';
    const actCell = row.insertCell(6);
    const delBtn  = document.createElement('button');
    delBtn.textContent = 'Excluir';
    Object.assign(delBtn.style, { backgroundColor:'#dc3545', padding:'5px 10px', fontSize:'0.8rem', marginTop:'0', width:'auto' });
    delBtn.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja excluir este registro?')) freqDeleteRecord(record);
    });
    actCell.appendChild(delBtn);
  }

  function freqDeleteRecord(rec) {
    let all = [...freqGetAllFrequencyRecords()];
    all = all.filter(r => !(r.dia===rec.dia && r.falta===rec.falta && r.substExtra===rec.substExtra &&
                            r.fiiEm===rec.fiiEm && r.motivo===rec.motivo && r.qtde===rec.qtde && r.tipo===rec.tipo));
    freqSetAllFrequencyRecords(all);
    freqLoadFrequencyRecords();
  }

  document.getElementById('freq-form').addEventListener('submit', e => {
    e.preventDefault();
    const diaInput = document.getElementById('freq-dia').value;
    const tipo     = document.querySelector('input[name="freq-tipoOcorrencia"]:checked').value;
    const motivo   = document.getElementById('freq-motivo').value;
    if (!diaInput) { alert('Por favor, selecione o dia.'); return; }

    const [y,m,d] = diaInput.split('-');
    const dia = `${d}/${m}/${y}`;

    if (tipo === 'falta') {
      const profFalta = document.getElementById('freq-professorFalta').value;
      if (!profFalta) { alert('Por favor, selecione o professor que faltou.'); return; }

      const substs = Array.from(document.querySelectorAll('#freq-substituicoesList .substituicao-item')).map(item => ({
        professor: item.querySelector('.subst-professor').value,
        ensino:    item.querySelector('.subst-ensino').value,
        qtde:      parseInt(item.querySelector('.subst-qtde').value) || 0
      }));

      let totalEF = 0, totalEM = 0, totalGeral = 0;
      substs.filter(s => s.ensino && s.qtde > 0).forEach(s => {
        if (s.ensino === 'EF') totalEF += s.qtde;
        else if (s.ensino === 'EM') totalEM += s.qtde;
        totalGeral += s.qtde;
      });

      let ensinoConsolidado = '';
      if (totalEF > 0 && totalEM > 0) ensinoConsolidado = `${totalEF}EF/${totalEM}EM`;
      else if (totalEF > 0) ensinoConsolidado = `${totalEF}EF`;
      else if (totalEM > 0) ensinoConsolidado = `${totalEM}EM`;

      freqSaveFrequencyRecord({ tipo:'falta', dia, falta:profFalta, substExtra:'', fiiEm:ensinoConsolidado, motivo, qtde: totalGeral > 0 ? totalGeral : '' });

      substs.filter(s => s.professor && s.professor !== 'Sem substituto' && s.ensino && s.qtde > 0).forEach(s => {
        freqSaveFrequencyRecord({ tipo:'falta', dia, falta:'', substExtra:s.professor, fiiEm:s.ensino, motivo:'Extra', qtde:s.qtde });
      });

    } else {
      const profExtra = document.getElementById('freq-professorExtra').value;
      const fiiEm    = document.getElementById('freq-fiiEmExtra').value;
      const qtde     = document.getElementById('freq-qtde').value;
      if (!profExtra) { alert('Por favor, selecione o professor que fez a aula extra.'); return; }
      if (!fiiEm)    { alert('Por favor, selecione o ensino da extra.'); return; }
      freqSaveFrequencyRecord({ tipo:'extra', dia, falta:'', substExtra:profExtra, fiiEm, motivo, qtde:parseInt(qtde)||1 });
    }

    freqLoadFrequencyRecords();
    document.getElementById('freq-form').reset();
    freqResetFormToFalta();
  });

  function freqResetFormToFalta() {
    document.querySelector('input[name="freq-tipoOcorrencia"][value="falta"]').checked = true;
    document.getElementById('freq-professorFaltaGroup').style.display   = 'flex';
    document.getElementById('freq-substituicoesContainer').style.display = 'block';
    document.getElementById('freq-professorExtraGroup').style.display   = 'none';
    document.getElementById('freq-ensinoExtraGroup').style.display      = 'none';
    document.getElementById('freq-qtdeGroup').style.display             = 'none';
    document.getElementById('freq-substituicoesList').innerHTML = '';
    freqAddSubstituicaoItem();
  }

  document.querySelectorAll('input[name="freq-tipoOcorrencia"]').forEach(radio => {
    radio.addEventListener('change', e => {
      const isFalta = e.target.value === 'falta';
      document.getElementById('freq-professorFaltaGroup').style.display    = isFalta ? 'flex'  : 'none';
      document.getElementById('freq-substituicoesContainer').style.display = isFalta ? 'block' : 'none';
      document.getElementById('freq-professorExtraGroup').style.display    = isFalta ? 'none'  : 'flex';
      document.getElementById('freq-ensinoExtraGroup').style.display       = isFalta ? 'none'  : 'flex';
      document.getElementById('freq-qtdeGroup').style.display              = isFalta ? 'none'  : 'flex';
      if (isFalta && document.getElementById('freq-substituicoesList').children.length === 0) freqAddSubstituicaoItem();
    });
  });

  document.getElementById('freq-prevMonth').addEventListener('click', () => {
    freqCurrentDate.setMonth(freqCurrentDate.getMonth()-1);
    freqSetCurrentMonthDisplay();
    freqLoadFrequencyRecords();
    freqLoadExtraAvulsaRecords();
  });

  document.getElementById('freq-nextMonth').addEventListener('click', () => {
    freqCurrentDate.setMonth(freqCurrentDate.getMonth()+1);
    freqSetCurrentMonthDisplay();
    freqLoadFrequencyRecords();
    freqLoadExtraAvulsaRecords();
  });

  function freqClearAllFrequencyRecords() {
    if (confirm('Tem certeza que deseja limpar TODOS os registros de frequência de TODOS os meses?')) {
      freqSetAllFrequencyRecords([]);
      freqLoadFrequencyRecords();
    }
  }

  function freqExportFrequencyToCSV() {
    const all = freqGetAllFrequencyRecords();
    if (all.length === 0) { alert('Não há registros para exportar.'); return; }
    let csv = 'data:text/csv;charset=utf-8,Tipo,Dia,Falta,Subst/Extra,Ensino,Motivo,Qtde\n';
    all.forEach(r => {
      csv += `${r.tipo||'falta'},${r.dia},"${r.falta||''}","${r.substExtra||''}",${r.fiiEm||''},"${r.motivo||''}",${r.qtde!==undefined?r.qtde:''}\n`;
    });
    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = `frequencia_${new Date().toLocaleDateString('pt-BR').replace(/\//g,'-')}.csv`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  }

  function freqSaveCompleteRecord() {
    const cm  = freqCurrentDate.getMonth();
    const cy  = freqCurrentDate.getFullYear();
    const key = `${cy}-${cm}`;
    const all = freqGetAllFrequencyRecords();
    const monthRecords = all.filter(r => {
      const p = r.dia.split('/');
      return p.length===3 && parseInt(p[1])-1===cm && parseInt(p[2])===cy;
    });
    const allEA = freqGetAllExtraAvulsaRecords();
    const data  = { month: freqGetMonthYearString(freqCurrentDate), monthKey: key, frequencyRecords: monthRecords, extraAvulsaRecords: allEA[key]||{}, exportDate: new Date().toLocaleString('pt-BR') };
    const blob  = new Blob([JSON.stringify(data,null,2)], { type:'application/json' });
    const url   = URL.createObjectURL(blob);
    const link  = document.createElement('a');
    link.href = url; link.download = `registro_${key}_${Date.now()}.json`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert('Registro salvo com sucesso!');
  }

  function freqImportCompleteRecord(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      try {
        const imported = JSON.parse(ev.target.result);
        if (!imported.frequencyRecords || !imported.extraAvulsaRecords) {
          alert('Arquivo inválido!'); return;
        }
        const replace = confirm(`Substituir todos os dados?\n\nMês: ${imported.month}\nExportado: ${imported.exportDate}\n\nOK = Substituir | Cancelar = Mesclar`);
        if (replace) {
          freqSetAllFrequencyRecords(imported.frequencyRecords);
          const ea = {}; ea[imported.monthKey] = imported.extraAvulsaRecords;
          freqSetAllExtraAvulsaRecords(ea);
        } else {
          let existF = [...freqGetAllFrequencyRecords()];
          let existEA = { ...freqGetAllExtraAvulsaRecords() };
          imported.frequencyRecords.forEach(r => {
            if (!existF.some(e => e.dia===r.dia && e.falta===r.falta && e.substExtra===r.substExtra && e.motivo===r.motivo)) existF.push(r);
          });
          if (!existEA[imported.monthKey]) existEA[imported.monthKey] = imported.extraAvulsaRecords;
          freqSetAllFrequencyRecords(existF);
          freqSetAllExtraAvulsaRecords(existEA);
        }
        freqLoadFrequencyRecords();
        freqLoadExtraAvulsaRecords();
        event.target.value = '';
        alert('Importação concluída!');
      } catch(err) { alert('Erro ao importar: ' + err.message); }
    };
    reader.readAsText(file);
  }

  // Extras Avulsas
  function freqNormalizeCategoryName(name) {
    return name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_]/g,'').toLowerCase();
  }

  function freqGetMonthKey() {
    return `${freqCurrentDate.getFullYear()}-${freqCurrentDate.getMonth()}`;
  }

  function freqLoadExtraAvulsaRecords() {
    try {
      const all  = freqGetAllExtraAvulsaRecords();
      const data = all[freqGetMonthKey()] || {};
      const listDiv = document.getElementById('freq-extraAvulsaList');
      listDiv.innerHTML = '';
      Object.keys(data).sort().forEach(catKey => {
        const profsData = data[catKey];
        const catName = profsData.length > 0 ? (profsData[0].originalCategoryName || catKey.replace(/_/g,' ')) : catKey.replace(/_/g,' ');
        freqRenderExtraAvulsaCategory(catName, catKey, profsData);
      });
      freqUpdateEmptyExtraAvulsaMsg();
      freqUpdatePrintExtrasAvulsas();
    } catch(e) { console.error(e); }
  }

  function freqSaveExtraAvulsaRecord(originalName, professor, qtdeEF, qtdeEM, action='add_category', keyToDelete=null) {
    const catKey = action === 'delete_category' && keyToDelete ? keyToDelete : freqNormalizeCategoryName(originalName);
    try {
      let all = { ...freqGetAllExtraAvulsaRecords() };
      const mk = freqGetMonthKey();
      if (!all[mk]) all[mk] = {};

      if (action === 'add_category') {
        if (all[mk][catKey]) { alert(`A categoria "${originalName}" já existe.`); return; }
        all[mk][catKey] = [];
      } else if (action === 'add_professor') {
        if (!all[mk][catKey]) return;
        if (all[mk][catKey].find(i => i.professor === professor)) { alert(`${professor} já está nesta categoria.`); return; }
        all[mk][catKey].push({ professor, qtdeEF, qtdeEM, originalCategoryName: originalName });
      } else if (action === 'delete_professor') {
        if (all[mk][catKey]) {
          all[mk][catKey] = all[mk][catKey].filter(i => !(i.professor===professor && i.qtdeEF===qtdeEF && i.qtdeEM===qtdeEM));
          if (all[mk][catKey].length === 0) delete all[mk][catKey];
        }
      } else if (action === 'delete_category') {
        delete all[mk][catKey];
      }
      freqSetAllExtraAvulsaRecords(all);
      freqLoadExtraAvulsaRecords();
    } catch(e) { console.error(e); }
  }

  function freqRenderExtraAvulsaCategory(catName, catKey, profsData) {
    const sorted = [...freqProfessores].sort();
    const div = document.createElement('div');
    div.classList.add('extra-avulsa-item');
    div.dataset.categoryKey = catKey;

    const h3 = document.createElement('h3');
    h3.textContent = catName;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Excluir Categoria';
    delBtn.classList.add('delete-category-btn');
    delBtn.addEventListener('click', () => {
      if (confirm(`Excluir categoria "${catName}"?`)) freqSaveExtraAvulsaRecord(catName, null, null, null, 'delete_category', catKey);
    });
    h3.appendChild(delBtn);
    div.appendChild(h3);

    const ul = document.createElement('ul');
    ul.classList.add('extra-avulsa-professor-list');
    if (profsData && profsData.length > 0) {
      profsData.forEach(item => {
        const li  = document.createElement('li');
        li.classList.add('professor-entry');
        const ef = item.qtdeEF || 0, em = item.qtdeEM || 0;
        let txt = `${item.professor} – `;
        if (ef > 0 && em > 0) txt += `${ef}EF/${em}EM`;
        else if (ef > 0) txt += `${ef}EF`;
        else if (em > 0) txt += `${em}EM`;
        else txt += '0 aulas';
        li.innerHTML = `<span>${txt}</span>`;
        const xBtn = document.createElement('button');
        xBtn.textContent = 'X';
        xBtn.addEventListener('click', () => {
          if (confirm(`Remover ${item.professor} de "${catName}"?`)) freqSaveExtraAvulsaRecord(catName, item.professor, item.qtdeEF, item.qtdeEM, 'delete_professor', catKey);
        });
        li.appendChild(xBtn);
        ul.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = 'Nenhum professor adicionado ainda.';
      li.style.fontStyle = 'italic'; li.style.color = '#777';
      ul.appendChild(li);
    }
    div.appendChild(ul);

    const addForm = document.createElement('div');
    addForm.classList.add('add-professor-extra-avulsa');
    addForm.innerHTML = `
      <div class="form-group">
        <label>Professor:</label>
        <select id="profSel-${catKey}">
          <option value="">Selecione</option>
          ${sorted.map(p => `<option value="${p}">${p}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Qtde EF:</label>
        <input type="number" id="qtdeEF-${catKey}" min="0" value="0">
      </div>
      <div class="form-group">
        <label>Qtde EM:</label>
        <input type="number" id="qtdeEM-${catKey}" min="0" value="0">
      </div>
      <button type="button">Adicionar Professor</button>
    `;
    addForm.querySelector('button').addEventListener('click', () => {
      const prof  = document.getElementById(`profSel-${catKey}`).value;
      const qtEF  = parseInt(document.getElementById(`qtdeEF-${catKey}`).value) || 0;
      const qtEM  = parseInt(document.getElementById(`qtdeEM-${catKey}`).value) || 0;
      if (prof && (qtEF > 0 || qtEM > 0)) {
        freqSaveExtraAvulsaRecord(catName, prof, qtEF, qtEM, 'add_professor', catKey);
      } else alert('Selecione um professor e informe pelo menos uma quantidade.');
    });
    div.appendChild(addForm);
    document.getElementById('freq-extraAvulsaList').appendChild(div);
  }

  document.getElementById('freq-extraAvulsaForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('freq-extraAvulsaCategoria').value.trim();
    if (name) { freqSaveExtraAvulsaRecord(name, null, null, null, 'add_category'); document.getElementById('freq-extraAvulsaCategoria').value = ''; }
    else alert('Por favor, insira o nome da categoria.');
  });

  function freqUpdateEmptyExtraAvulsaMsg() {
    const all  = freqGetAllExtraAvulsaRecords();
    const data = all[freqGetMonthKey()] || {};
    document.getElementById('freq-emptyExtraAvulsa').style.display = Object.keys(data).length === 0 ? 'block' : 'none';
  }

  function freqClearAllExtraAvulsaRecords() {
    if (confirm('Limpar TODAS as Extras Avulsas de TODOS os meses?')) {
      freqSetAllExtraAvulsaRecords({});
      freqLoadExtraAvulsaRecords();
    }
  }

  function freqExportExtraAvulsaToCSV() {
    const all = freqGetAllExtraAvulsaRecords();
    if (Object.keys(all).length === 0) { alert('Não há registros para exportar.'); return; }
    let csv = 'data:text/csv;charset=utf-8,Mês,Categoria,Professor,Qtde EF,Qtde EM\n';
    for (const mk in all) {
      const [yr, mi] = mk.split('-').map(Number);
      const monthName = new Date(yr, mi).toLocaleDateString('pt-BR', { month:'long', year:'numeric' });
      for (const ck in all[mk]) {
        const pds = all[mk][ck];
        const cn  = pds.length > 0 ? (pds[0].originalCategoryName || ck.replace(/_/g,' ')) : ck.replace(/_/g,' ');
        if (pds.length > 0) pds.forEach(p => { csv += `"${monthName}","${cn}","${p.professor}",${p.qtdeEF||0},${p.qtdeEM||0}\n`; });
        else csv += `"${monthName}","${cn}",,0,0\n`;
      }
    }
    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = `extras_avulsas_${new Date().toLocaleDateString('pt-BR').replace(/\//g,'-')}.csv`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  }

  function freqUpdatePrintExtrasAvulsas() {
    const all  = freqGetAllExtraAvulsaRecords();
    const data = all[freqGetMonthKey()] || {};
    const cont = document.getElementById('freq-printExtrasAvulsasContent');
    cont.innerHTML = '';
    const keys = Object.keys(data).sort();
    if (keys.length > 0) {
      keys.forEach(ck => {
        const pds = data[ck];
        const cn  = pds.length > 0 ? (pds[0].originalCategoryName || ck.replace(/_/g,' ')) : ck.replace(/_/g,' ');
        let ef=0, em=0; pds.forEach(p => { ef += p.qtdeEF||0; em += p.qtdeEM||0; });
        const d = document.createElement('div');
        d.classList.add('print-extras-category');
        d.innerHTML = `<h3>${cn} (Total: ${ef}EF / ${em}EM)</h3>
          <table><thead><tr><th>Professor</th><th>EF</th><th>EM</th><th>Total</th></tr></thead>
          <tbody>${pds.map(p=>`<tr><td>${p.professor}</td><td>${p.qtdeEF||0}</td><td>${p.qtdeEM||0}</td><td>${(p.qtdeEF||0)+(p.qtdeEM||0)}</td></tr>`).join('')}</tbody></table>`;
        cont.appendChild(d);
      });
    } else cont.innerHTML = '<p style="text-align:center;color:#777;font-style:italic;">Nenhuma extra avulsa registrada para este mês.</p>';
  }

  function freqUpdatePrintSummary() {
    const stats = freqCalculateStats('current');
    const tbody = document.getElementById('freq-printSummaryTableBody');
    tbody.innerHTML = '';
    let hasData = false;
    Object.keys(stats.professorStats).sort().forEach(prof => {
      const d = stats.professorStats[prof];
      const total = d.extrasComuns + d.extrasAvulsas.total;
      if (d.faltas > 0 || total > 0) {
        hasData = true;
        const saldo = total - d.faltas;
        const row = tbody.insertRow();
        row.insertCell(0).textContent = prof;
        row.insertCell(1).textContent = d.diasFaltados;
        row.insertCell(2).textContent = d.faltas;
        row.insertCell(3).textContent = d.extrasComuns;
        row.insertCell(4).textContent = d.extrasAvulsas.total > 0 ? `${d.extrasAvulsas.total} (${d.extrasAvulsas.EF}EF/${d.extrasAvulsas.EM}EM)` : '0';
        const sc = row.insertCell(5);
        sc.textContent = saldo >= 0 ? `+${saldo}` : saldo;
        sc.className = saldo >= 0 ? 'positive' : 'negative';
      }
    });
    if (!hasData) {
      const row = tbody.insertRow();
      const cell = row.insertCell(0);
      cell.colSpan = 6;
      cell.textContent = 'Nenhum professor com faltas ou extras neste mês.';
      cell.style.textAlign = 'center'; cell.style.fontStyle = 'italic'; cell.style.color = '#777';
    }
  }

  // Estatísticas
  function freqOpenStatsModal() {
    document.getElementById('freq-statsModal').classList.add('active');
    freqPopulateFilterProfessor();
    freqUpdateStats();
  }

  function freqCloseStatsModal() {
    document.getElementById('freq-statsModal').classList.remove('active');
  }

  document.addEventListener('click', e => {
    const modal = document.getElementById('freq-statsModal');
    if (e.target === modal) freqCloseStatsModal();
  });

  function freqSwitchStatsTab(event, tabName) {
    document.querySelectorAll('#freq-statsModal .stats-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('#freq-statsModal .stats-content').forEach(c => c.classList.remove('active'));
    event.target.classList.add('active');
    const id = `freq-stats${tabName.charAt(0).toUpperCase()+tabName.slice(1)}Content`;
    document.getElementById(id).classList.add('active');
    freqUpdateStats();
  }

  function freqPopulateFilterProfessor() {
    const sel = document.getElementById('freq-filterProfessor');
    sel.innerHTML = '<option value="">Todos</option>';
    [...freqProfessores].sort().forEach(p => {
      const opt = document.createElement('option');
      opt.value = p; opt.textContent = p;
      sel.appendChild(opt);
    });
  }

  function freqUpdateStats() {
    const period    = document.getElementById('freq-statsPeriod').value;
    const filterProf = document.getElementById('freq-filterProfessor').value;
    const stats     = freqCalculateStats(period);
    freqRenderStatsSummary(stats);
    freqRenderGeralTable(stats, filterProf);
    freqRenderProfessorDetailed(stats, filterProf);
    freqRenderAvulsasDetailed(stats);
  }

    function freqCalculateStats(period) {
    const allF  = freqGetAllFrequencyRecords();
    const allEA = freqGetAllExtraAvulsaRecords();
    const cm = freqCurrentDate.getMonth(), cy = freqCurrentDate.getFullYear();

    let filtF = period === 'current'
      ? allF.filter(r => { const p=r.dia.split('/'); return p.length===3 && parseInt(p[1])-1===cm && parseInt(p[2])===cy; })
      : allF;

    let filtEA = period === 'current' ? { [`${cy}-${cm}`]: allEA[`${cy}-${cm}`]||{} } : allEA;

    const pStats = {};
    freqProfessores.forEach(p => {
      pStats[p] = { faltas:0, diasFaltados:0, diasSet:new Set(), extrasComuns:0,
        extrasAvulsas:{EF:0,EM:0,total:0}, detalhes:{faltas:[],extrasComuns:[],extrasAvulsas:[]} };
    });

    filtF.forEach(r => {
      if (r.falta && pStats[r.falta]) {
        const q = parseInt(r.qtde)||1;
        pStats[r.falta].faltas += q;
        pStats[r.falta].diasSet.add(r.dia);
        pStats[r.falta].detalhes.faltas.push({ dia:r.dia, motivo:r.motivo, qtde:q });
      }
      if (r.substExtra && pStats[r.substExtra]) {
        const q = parseInt(r.qtde)||1;
        pStats[r.substExtra].extrasComuns += q;
        pStats[r.substExtra].detalhes.extrasComuns.push({ dia:r.dia, ensino:r.fiiEm, qtde:q });
      }
    });

    freqProfessores.forEach(p => {
      pStats[p].diasFaltados = pStats[p].diasSet.size;
      delete pStats[p].diasSet;
    });

    for (const mk in filtEA) {
      for (const ck in filtEA[mk]) {
        const pds = filtEA[mk][ck];
        const cn  = pds.length > 0 ? (pds[0].originalCategoryName || ck.replace(/_/g,' ')) : ck.replace(/_/g,' ');
        pds.forEach(item => {
          if (pStats[item.professor]) {
            const ef = item.qtdeEF||0, em = item.qtdeEM||0;
            pStats[item.professor].extrasAvulsas.EF    += ef;
            pStats[item.professor].extrasAvulsas.EM    += em;
            pStats[item.professor].extrasAvulsas.total += (ef+em);
            pStats[item.professor].detalhes.extrasAvulsas.push({ categoria:cn, qtdeEF:ef, qtdeEM:em });
          }
        });
      }
    }

    return { professorStats: pStats, extraAvulsas: filtEA };
  }

  function freqRenderStatsSummary(stats) {
    let tF=0, tD=0, tEC=0, tEA=0;
    for (const p in stats.professorStats) {
      tF  += stats.professorStats[p].faltas;
      tD  += stats.professorStats[p].diasFaltados;
      tEC += stats.professorStats[p].extrasComuns;
      tEA += stats.professorStats[p].extrasAvulsas.total;
    }
    document.getElementById('freq-statsSummary').innerHTML = `
      <div class="stats-card faltas">
        <h3>Total de Faltas</h3>
        <p class="number">${tF}</p>
        <p class="subtitle">${tD} dias faltados</p>
      </div>
      <div class="stats-card extras">
        <h3>Extras Comuns</h3>
        <p class="number">${tEC}</p>
      </div>
      <div class="stats-card avulsas">
        <h3>Extras Avulsas</h3>
        <p class="number">${tEA}</p>
      </div>
    `;
  }

  function freqRenderGeralTable(stats, filterProf) {
    const tbody = document.getElementById('freq-statsGeralTableBody');
    tbody.innerHTML = '';
    Object.keys(stats.professorStats).sort().forEach(prof => {
      if (filterProf && prof !== filterProf) return;
      const d     = stats.professorStats[prof];
      const saldo = (d.extrasComuns + d.extrasAvulsas.total) - d.faltas;
      const row   = tbody.insertRow();
      if (saldo < 0) row.classList.add('highlight');
      row.insertCell(0).textContent = prof;
      row.insertCell(1).textContent = d.diasFaltados;
      row.insertCell(2).textContent = d.faltas;
      row.insertCell(3).textContent = d.extrasComuns;
      row.insertCell(4).textContent = `${d.extrasAvulsas.total} (${d.extrasAvulsas.EF}EF/${d.extrasAvulsas.EM}EM)`;
      const sc = row.insertCell(5);
      sc.textContent  = saldo >= 0 ? `+${saldo}` : saldo;
      sc.style.color  = saldo >= 0 ? '#28a745' : '#dc3545';
      sc.style.fontWeight = 'bold';
    });
  }

  function freqRenderProfessorDetailed(stats, filterProf) {
    const div = document.getElementById('freq-professorDetailedStats');
    div.innerHTML = '';
    const list = filterProf ? [filterProf] : Object.keys(stats.professorStats).sort();
    list.forEach(prof => {
      const d     = stats.professorStats[prof];
      const saldo = (d.extrasComuns + d.extrasAvulsas.total) - d.faltas;
      const pDiv  = document.createElement('div');
      pDiv.classList.add('category-stats');
      pDiv.innerHTML = `
        <div class="category-stats-header">
          <span>${prof}</span>
          <span>Saldo: <strong style="color:${saldo>=0?'#28a745':'#dc3545'}">${saldo>=0?'+':''}${saldo}</strong></span>
        </div>
        <div class="category-stats-body">
          <h4>Faltas (${d.diasFaltados} dias / ${d.faltas} aulas)</h4>
          ${d.detalhes.faltas.length > 0
            ? `<ul>${d.detalhes.faltas.map(f=>`<li>${f.dia} - ${f.motivo} (${f.qtde} aulas)</li>`).join('')}</ul>`
            : '<p style="color:#999;font-style:italic;">Nenhuma falta registrada</p>'}
          <h4>Extras Comuns (${d.extrasComuns})</h4>
          ${d.detalhes.extrasComuns.length > 0
            ? `<ul>${d.detalhes.extrasComuns.map(e=>`<li>${e.dia} - ${e.ensino} (${e.qtde} aulas)</li>`).join('')}</ul>`
            : '<p style="color:#999;font-style:italic;">Nenhuma extra comum registrada</p>'}
          <h4>Extras Avulsas (${d.extrasAvulsas.total})</h4>
          ${d.detalhes.extrasAvulsas.length > 0
            ? `<ul>${d.detalhes.extrasAvulsas.map(a=>`<li>${a.categoria} - ${a.qtdeEF>0?a.qtdeEF+'EF':''}${a.qtdeEF>0&&a.qtdeEM>0?'/':''}${a.qtdeEM>0?a.qtdeEM+'EM':''}</li>`).join('')}</ul>`
            : '<p style="color:#999;font-style:italic;">Nenhuma extra avulsa registrada</p>'}
        </div>
      `;
      div.appendChild(pDiv);
    });
  }

  function freqRenderAvulsasDetailed(stats) {
    const div = document.getElementById('freq-avulsasDetailedStats');
    div.innerHTML = '';
    for (const mk in stats.extraAvulsas) {
      const [yr, mi] = mk.split('-').map(Number);
      const monthName = new Date(yr, mi).toLocaleDateString('pt-BR', { month:'long', year:'numeric' });
      for (const ck in stats.extraAvulsas[mk]) {
        const pds = stats.extraAvulsas[mk][ck];
        const cn  = pds.length > 0 ? (pds[0].originalCategoryName || ck.replace(/_/g,' ')) : ck.replace(/_/g,' ');
        let ef=0, em=0; pds.forEach(p => { ef += p.qtdeEF||0; em += p.qtdeEM||0; });
        const catDiv = document.createElement('div');
        catDiv.classList.add('category-stats');
        catDiv.innerHTML = `
          <div class="category-stats-header">
            <span>${cn} (${monthName})</span>
            <span>Total: ${ef}EF / ${em}EM</span>
          </div>
          <div class="category-stats-body">
            <table class="professor-stats-table">
              <thead><tr><th>Professor</th><th>EF</th><th>EM</th><th>Total</th></tr></thead>
              <tbody>
                ${pds.map(p=>`<tr><td>${p.professor}</td><td>${p.qtdeEF||0}</td><td>${p.qtdeEM||0}</td><td>${(p.qtdeEF||0)+(p.qtdeEM||0)}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        `;
        div.appendChild(catDiv);
      }
    }
    if (div.children.length === 0) {
      div.innerHTML = '<p class="empty-message">Nenhuma extra avulsa registrada no período selecionado.</p>';
    }
  }

  document.getElementById('freq-printPdfBtn').addEventListener('click', () => {
    document.body.classList.add('print-active-freq');
    const cleanupPrintFreq = () => document.body.classList.remove('print-active-freq');
    window.addEventListener('afterprint', cleanupPrintFreq, { once: true });
    window.print();
    setTimeout(cleanupPrintFreq, 1500);
  });

