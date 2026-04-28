// Módulo extraído de assets/js/index.js
// Mantém escopo global do sistema ENSPS 2026.

  // ============================================================
  // INICIALIZAÇÃO GERAL
  // ============================================================
  (function initProfessores() {
    // Agenda
    document.getElementById('agenda-data').valueAsDate = new Date();

    // Materiais
    matRenderHeaders();
    matPopulateMaterialSelect();
    document.getElementById('mat-filter-all').classList.add('active');
    matApplyFilter();

    // Frequência
    freqPopulateProfessorSelects();
    freqSetCurrentMonthDisplay();
    freqLoadFrequencyRecords();
    freqLoadExtraAvulsaRecords();
    freqResetFormToFalta();

    document.getElementById('freq-dia').addEventListener('focus', function() {
      if (!this.value) {
        const y  = freqCurrentDate.getFullYear();
        const m  = String(freqCurrentDate.getMonth()+1).padStart(2,'0');
        this.value = `${y}-${m}-01`;
      }
    });
  })();

  

  // ============================================================
  // ABA: ATIVIDADE DE DETENÇÃO
  // ============================================================
  let detTipo = 1; // 1 = Atividade 1, 2 = Pauta Dupla

  function detSetTipo(t) {
    detTipo = t;
    const b1 = document.getElementById('det-tipo-btn-1');
    const b2 = document.getElementById('det-tipo-btn-2');
    if(t === 1) {
      b1.style.background = 'var(--brand)'; b1.style.borderColor = 'var(--brand)'; b1.style.color = '#fff';
      b2.style.background = 'transparent'; b2.style.borderColor = 'var(--border)'; b2.style.color = 'var(--muted)';
    } else {
      b2.style.background = 'var(--brand)'; b2.style.borderColor = 'var(--brand)'; b2.style.color = '#fff';
      b1.style.background = 'transparent'; b1.style.borderColor = 'var(--border)'; b1.style.color = 'var(--muted)';
    }
    detUpdate();
  }

  (function detInit() {
    const dl = document.getElementById('det-alunosList');
    if(dl && typeof alunosDB !== 'undefined') {
      alunosDB.forEach(a => { const opt = document.createElement('option'); opt.value = a.nome; dl.appendChild(opt); });
    }
    const d = document.getElementById('det-data');
    if(d) d.valueAsDate = new Date();
    detUpdate();
  })();

  document.getElementById('det-aluno').addEventListener('input', function(){
    if(typeof alunosDB === 'undefined') return;
    const txt = this.value.trim().toUpperCase();
    const aluno = alunosDB.find(a => a.nome.toUpperCase() === txt);
    document.getElementById('det-serie').value = aluno ? aluno.serie + ' / ' + aluno.turma : '';
    detUpdate();
  });

  function detUpdate() {
    const esp        = parseInt(document.getElementById('det-espacamento').value);
    const segundaPag = document.getElementById('det-segunda-pag').checked;
    const mostrarCab = document.getElementById('det-mostrar-logo').checked;
    document.getElementById('det-esp-val').textContent = esp + 'px';

    const aluno      = document.getElementById('det-aluno').value || '';
    const serie      = document.getElementById('det-serie').value || '';
    const dataVal    = document.getElementById('det-data').value || '';
    const professor  = document.getElementById('det-professor').value || '';
    const disciplina = document.getElementById('det-disciplina').value || '';
    const motivo     = document.getElementById('det-motivo').value || '';

    const fmtDate = d => { if(!d) return ''; const [y,m,dd] = d.split('-'); return dd+'/'+m+'/'+y; };

    // ── Cálculo de linhas por página ──
    const usableH_mm = detTipo === 2 ? 284 : 294;
    const cabH_mm    = mostrarCab ? 44 : 9;
    const colH1 = Math.round((usableH_mm - cabH_mm) * 3.7795) - 8;
    const colH2 = Math.round((usableH_mm - 9) * 3.7795) - 8;

    // Para pauta dupla: cada grupo = esp (3 zonas) + gap (espaço entre grupos)
    const gap2   = Math.round(esp * 0.5);
    const lineH  = detTipo === 2 ? (esp + gap2) : (esp + 1);
    const nLinhas  = Math.max(3, Math.floor(colH1 / lineH));
    const nLinhas2 = Math.max(3, Math.floor(colH2 / lineH));

    // ── Cabeçalho ──
    const tituloSimples = `<div class="det-titulo-simples">Atividade de Detenção</div>`;
    const cabHtml = mostrarCab ? `
      <div class="det-header">
        <img src="https://raw.githubusercontent.com/ciliocavalcante-design/ensps/main/LOGO%20ENSPS%202024.5.png" class="det-header-logo" onerror="this.style.display='none'">
        <div class="det-titulo">Atividade de Detenção</div>
        <div class="det-escola">Escola Nossa Senhora<br>do Perpétuo Socorro</div>
      </div>
      <div class="det-campos">
        <div class="det-campo"><strong>Aluno(a):</strong><span>${aluno}</span></div>
        <div class="det-campo"><strong>Série/Turma:</strong><span>${serie}</span></div>
        <div class="det-campo"><strong>Data:</strong><span>${fmtDate(dataVal)}</span></div>
        <div class="det-campo"><strong>Professor(a):</strong><span>${professor}</span></div>
        <div class="det-campo"><strong>Disciplina:</strong><span>${disciplina}</span></div>
        <div class="det-campo"><strong>Motivo:</strong><span>${motivo}</span></div>
      </div>
      <div class="det-instrucao">Copie o texto abaixo nas linhas indicadas com atenção e capricho.</div>
    ` : tituloSimples;

    // ── Construir colunas ──
    const buildCols = (n) => {
      let lhs = '';
      if(detTipo === 1) {
        // Atividade 1: linhas simples
        lhs = Array(n).fill(0)
          .map(() => `<span class="det-ln" style="height:${esp}px;min-height:${esp}px;"></span>`)
          .join('');
      } else {
        // Pauta dupla de caligrafia: grupo de 4 linhas (3 zonas: haste/corpo/cauda)
        // Usa padding-bottom em vez de height (resiste ao reset height:auto!important do print)
        const hasteH = Math.round(esp * 2 / 6.5);
        const corpoH = Math.round(esp * 3 / 6.5);
        const caudaH = esp - hasteH - corpoH;
        const gapH   = Math.round(esp * 0.5);
        lhs = Array(n).fill(0)
          .map(() => `<div class="det-pauta-group" style="padding-bottom:${gapH}px;">
            <div class="det-pz" style="padding-bottom:${hasteH}px;"></div>
            <div class="det-pz" style="padding-bottom:${corpoH}px;"></div>
            <div class="det-pz" style="padding-bottom:${caudaH}px;"></div>
          </div>`)
          .join('');
      }
      return `<div class="det-cols2"><div class="det-col">${lhs}</div><div class="det-col">${lhs}</div></div>`;
    };

    document.getElementById('det-preview').innerHTML =
      `<div class="det-pagina">${cabHtml}${buildCols(nLinhas)}</div>` +
      (segundaPag ? `<div class="det-pagina det-pag2">${tituloSimples}${buildCols(nLinhas2)}</div>` : '');

  }
  function detExecutarImpressao() {
    const preview = document.getElementById('det-preview');
    if (!preview) return;

    const html = preview.innerHTML.trim();
    if (!html) return;

    const win = window.open('', '_blank', 'width=900,height=1200');
    if (!win) {
      alert('Não foi possível abrir a janela de impressão. Verifique se o navegador bloqueou pop-ups.');
      return;
    }

    win.document.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Impressão - Atividade de Detenção</title>
  <style>
    @page { size: A4 portrait; margin: 0; }
    html, body { margin: 0; padding: 0; background: #fff; }
    body { font-family: Verdana, Arial, sans-serif; color: #000; }
    .det-pagina {
      background: #fff;
      width: 210mm;
      height: 297mm;
      margin: 0;
      padding: 8mm 12mm 0;
      color: #000;
      box-sizing: border-box;
      overflow: hidden;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .det-pagina:not(:last-child) {
      break-after: page;
      page-break-after: always;
    }
    .det-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #000;
      padding-bottom: 6px;
      margin-bottom: 8px;
    }
    .det-header-logo { height: 44px; object-fit: contain; }
    .det-titulo {
      font-size: 16px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .04em;
      text-decoration: underline;
      text-align: center;
      flex: 1;
    }
    .det-escola {
      font-size: 8px;
      font-weight: 700;
      text-transform: uppercase;
      text-align: right;
      max-width: 120px;
      line-height: 1.3;
    }
    .det-titulo-simples {
      text-align: center;
      font-weight: 800;
      font-size: 14px;
      text-transform: uppercase;
      text-decoration: underline;
      letter-spacing: .04em;
      border-bottom: 2px solid #000;
      padding-bottom: 5px;
      margin-bottom: 8px;
    }
    .det-cols2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 4px;
    }
    .det-col {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .det-ln {
      border-bottom: 1px solid #000;
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
    .det-pauta-group {
      display: block;
      width: 100%;
      box-sizing: border-box;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .det-pz {
      display: block;
      width: 100%;
      border-bottom: 1px solid #000;
      box-sizing: border-box;
    }
    .det-campos {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2px 12px;
      margin-bottom: 6px;
      font-size: 8px;
    }
    .det-campo {
      display: flex;
      align-items: baseline;
      gap: 4px;
      border-bottom: 1px solid #000;
      padding-bottom: 2px;
    }
    .det-campo strong { white-space: nowrap; font-size: 8px; }
    .det-campo span { flex: 1; font-size: 8px; min-height: 10px; }
    .det-instrucao {
      font-size: 8px;
      margin-bottom: 6px;
      line-height: 1.35;
      text-align: center;
      font-style: italic;
    }
    * { box-shadow: none; }
  </style>
</head>
<body>${html}</body>
</html>`);
    win.document.close();

    const doPrint = () => {
      win.focus();
      win.print();
      setTimeout(() => win.close(), 300);
    };

    if (win.document.readyState === 'complete') {
      doPrint();
    } else {
      win.onload = doPrint;
    }
  }
  function detImprimir() {
    detUpdate();
    detExecutarImpressao();
  }

  async function detBaixarPDF() {
    detUpdate();
    await pdfBaixarPaginas([...document.querySelectorAll('#det-preview .det-pagina')], 'atividade_detencao.pdf');
  }

  // ============================================================
  // GEMINI API
  // ============================================================
  const GEMINI_MODEL = 'gemini-2.0-flash';
  const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  const GROQ_MODEL = 'llama-3.3-70b-versatile';
  const GROQ_URL   = 'https://api.groq.com/openai/v1/chat/completions';

  function geminiGetKey() {
    return localStorage.getItem('groq_api_key') || '';
  }

  function geminiAbrirModal() {
    const modal = document.getElementById('gemini-modal');
    modal.style.display = 'flex';
    const input = document.getElementById('gemini-key-input');
    const saved = geminiGetKey();
    input.value = saved ? saved : '';
    const status = document.getElementById('gemini-key-status');
    status.textContent = saved ? '✅ Chave salva neste dispositivo.' : '';
    status.style.color = '#4ade80';
    const btnRemover = document.getElementById('btn-remover-chave');
    if (btnRemover) btnRemover.style.display = saved ? 'block' : 'none';
  }

  function geminiRemoverChave() {
    if (!confirm('Tem certeza que deseja remover a chave da API Groq?')) return;
    localStorage.removeItem('groq_api_key');
    document.getElementById('gemini-key-input').value = '';
    const status = document.getElementById('gemini-key-status');
    status.textContent = '🗑️ Chave removida com sucesso.';
    status.style.color = '#ef4444';
    const btnRemover = document.getElementById('btn-remover-chave');
    if (btnRemover) btnRemover.style.display = 'none';
  }

  function geminiFecharModal() {
    document.getElementById('gemini-modal').style.display = 'none';
  }

  function geminiSalvarChave() {
    const key = document.getElementById('gemini-key-input').value.trim();
    if (!key) { alert('Cole sua chave primeiro.'); return; }
    localStorage.setItem('groq_api_key', key);
    const status = document.getElementById('gemini-key-status');
    status.textContent = '✅ Chave salva com sucesso!';
    status.style.color = '#4ade80';
    setTimeout(() => geminiFecharModal(), 1200);
  }

  // Init folha de redação on page load
  window.addEventListener('load', function() {
    setTimeout(() => { redUpdate(); redPopularAlunos(); }, 500);
    // also keep red-alunos in sync when det-alunos changes
    const detDl = document.getElementById('det-alunosList');
    if (detDl) {
      new MutationObserver(() => redPopularAlunos()).observe(detDl, { childList: true });
    }
    // red-aluno field: auto-fill serie
    const redAluno = document.getElementById('red-aluno');
    if (redAluno) {
      redAluno.addEventListener('input', function() {
        if (typeof alunosDB === 'undefined') {
          redUpdate();
          return;
        }
        const nome = this.value.trim().toUpperCase();
        const found = alunosDB.find(a => a.nome.toUpperCase() === nome);
        const s = document.getElementById('red-serie');
        if (s) {
          s.value = found ? `${found.serie || ''} / ${found.turma || ''}`.replace(/\s*\/\s*$/, '') : '';
        }
        redUpdate();
      });
    }
  });

  document.getElementById('gemini-modal').addEventListener('click', function(e) {
    if (e.target === this) geminiFecharModal();
  });

  async function geminiRequest(prompt) {
    const key = geminiGetKey();
    if (!key) {
      geminiAbrirModal();
      throw new Error('Chave não configurada');
    }
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
        max_tokens: 1200
      })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || 'Erro na API Groq');
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  }

  function geminiSetLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = loading;
    if (loading) {
      btn.textContent = '⏳ Gerando...';
    } else if (btnId === 'btnGeminiAdv') {
      btn.textContent = '✨ Sugerir texto (IA)';
    } else if (btnId === 'btnMelhorarComunicadoIA') {
      btn.textContent = '✨ Melhorar Comunicado';
    } else {
      btn.textContent = '✨ Gerar com IA';
    }
  }

  async function geminiMelhorarComunicado() {
    const titulo = document.getElementById('com-titulo')?.value.trim() || 'Sem título';
    const categoria = document.getElementById('com-categoria')?.value.trim() || 'Não informada';
    const publico = document.getElementById('com-publico')?.value.trim() || 'Não informado';
    const data = document.getElementById('com-data')?.value || '';
    const texto = document.getElementById('com-texto')?.value.trim() || '';
    const instrucao = document.getElementById('com-instrucao-ia')?.value.trim() || '';

    if (!texto) {
      alert('Escreva ou cole o comunicado antes de pedir a melhoria pela IA.');
      return;
    }

    geminiSetLoading('btnMelhorarComunicadoIA', true);
    try {
      const prompt = `Você é um(a) coordenador(a) escolar experiente. Reescreva e melhore um comunicado interno/educacional, preservando sua intenção principal e deixando o texto mais claro, organizado e profissional.

DADOS DO COMUNICADO:
- Título: ${titulo}
- Categoria: ${categoria}
- Público: ${publico}
${data ? `- Data de referência: ${data}` : ''}
- Texto original:
${texto}
${instrucao ? `- Orientação específica do usuário: ${instrucao}` : ''}

INSTRUÇÕES:
- Priorize rigorosamente a orientação específica do usuário
- Mantenha o conteúdo essencial e o objetivo do comunicado
- Reescreva com clareza, boa organização e tom institucional apropriado
- Se necessário, melhore coesão, ortografia, pontuação e objetividade
- Não invente informações novas que não estejam no texto ou na orientação
- Não use markdown, bullets ou títulos extras, a menos que o usuário peça explicitamente
- Entregue somente a versão final melhorada do comunicado`;

      const melhorado = await geminiRequest(prompt);
      const campoTexto = document.getElementById('com-texto');
      if (campoTexto) campoTexto.value = melhorado.trim();
    } catch(e) {
      if (e.message !== 'Chave não configurada') alert('Erro: ' + e.message);
    } finally {
      geminiSetLoading('btnMelhorarComunicadoIA', false);
    }
  }

  const btnMelhorarComunicadoIA = document.getElementById('btnMelhorarComunicadoIA');
  if(btnMelhorarComunicadoIA) btnMelhorarComunicadoIA.addEventListener('click', geminiMelhorarComunicado);

  // ── ADVERTÊNCIA ──
  async function geminiGerarAdvertencia() {
    const aluno     = document.getElementById('aluno')?.value || '—';
    const serie     = document.getElementById('serie')?.value || '—';
    const natureza  = document.getElementById('natureza')?.value || '—';
    const motivos   = [...document.querySelectorAll('#motivosBox input[type=checkbox]:checked')].map(i => i.value);
    const tipo      = document.getElementById('tipoDocumento')?.value || 'Advertência Escolar';

    if (!aluno || aluno === '—') { alert('Selecione o aluno primeiro.'); return; }

    const instrucaoAdv = document.getElementById('instrucaoAdv')?.value?.trim() || '';
    geminiSetLoading('btnGeminiAdv', true);
    try {
      const motivosFormatados = motivos.length > 0
        ? motivos.map((m, i) => `${i + 1}. ${m}`).join('\n')
        : 'não especificado';

      const prompt = `Você é um(a) coordenador(a) pedagógico(a) experiente de uma escola. Redija o texto de descrição para um documento escolar oficial do tipo "${tipo}".

DADOS DO OCORRIDO:
- Aluno(a): ${aluno}
- Série/Turma: ${serie}
- Natureza da ocorrência: ${natureza}
- Motivos/infrações identificadas:
${motivosFormatados}
${instrucaoAdv ? `- Orientação específica: ${instrucaoAdv}` : ''}

INSTRUÇÕES DE REDAÇÃO:
- Priorize rigorosamente a orientação específica informada pelo educador; se houver conflito entre esta orientação e qualquer instrução genérica, siga a orientação específica
- Escreva em linguagem pedagógica institucional, formal, clara e natural, sem soar mecânico
- NÃO force um parágrafo para cada motivo
- Organize o texto na quantidade de parágrafos que fizer mais sentido para o caso, normalmente entre 1 e 3 parágrafos
- Se houver poucos motivos ou orientação para objetividade, prefira 1 parágrafo bem construído
- Se houver muitos motivos ou a orientação pedir mais detalhamento, use 2 ou 3 parágrafos, sem exagerar
- Descreva os comportamentos observados, seus impactos no ambiente escolar e a postura esperada do aluno
- Se for adequado, encerre com uma frase breve de orientação pedagógica ou compromisso institucional
- NÃO use markdown, bullets, títulos ou numeração
- Não invente fatos, reincidência, datas ou consequências que não estejam sugeridas nos dados ou na instrução do educador
- Entregue somente o texto final, pronto para colar no campo descrição
- Tamanho sugerido: entre 450 e 900 caracteres, ajustando pela complexidade do caso`;

      const texto = await geminiRequest(prompt);
      const desc = document.getElementById('descricao');
      if (desc) {
        desc.value = texto.trim();
        renderPreview();
      }
    } catch(e) {
      if (e.message !== 'Chave não configurada') alert('Erro: ' + e.message);
    } finally {
      geminiSetLoading('btnGeminiAdv', false);
    }
  }

  // ── RELATÓRIO PEDAGÓGICO ──
  async function geminiGerarRelatorio() {
    const aluno  = document.getElementById('alunoRelatorio')?.value || '—';
    const serie  = document.getElementById('serieRelatorio')?.value || '—';
    const ensino = document.getElementById('ensinoRelatorio')?.value || '—';

    if (!aluno || aluno === '—') { alert('Selecione o aluno primeiro.'); return; }

    // Coletar tópicos já preenchidos
    const topicos = [];
    document.querySelectorAll('.resposta-item').forEach(item => {
      const titulo = item.querySelector('.resposta-titulo')?.value?.trim();
      const texto  = item.querySelector('.resposta-texto')?.value?.trim();
      if (titulo) topicos.push(`${titulo}: ${texto || 'não informado'}`);
    });

    geminiSetLoading('btnGeminiRel', true);
    try {
      const instrucaoRel = document.getElementById('instrucaoRel')?.value?.trim() || '';
      const topicosTexto = topicos.length > 0
        ? topicos.map((t, i) => `${i + 1}. ${t}`).join('\n')
        : 'Nenhuma observação registrada.';
      const prompt = `Você é um(a) coordenador(a) pedagógico(a) experiente. Elabore um relatório pedagógico oficial, claro e bem fundamentado para uso da escola.

DADOS DO ALUNO:
- Nome: ${aluno}
- Série: ${serie}
- Modalidade de ensino: ${ensino}

TÓPICOS E OBSERVAÇÕES COLETADAS:
${topicosTexto}
${instrucaoRel ? `ORIENTAÇÃO ESPECÍFICA DO EDUCADOR: ${instrucaoRel}` : ''}

INSTRUÇÕES DE REDAÇÃO:
- Priorize rigorosamente a orientação específica do educador; se ela pedir foco, tom, tamanho ou estrutura, siga isso acima das instruções genéricas
- Escreva em tom formal, pedagógico, profissional e humano, evitando texto artificial
- NÃO force um parágrafo para cada tópico
- Organize o relatório na quantidade de parágrafos que fizer sentido, normalmente entre 2 e 4 parágrafos
- Se houver poucos tópicos ou pedido de objetividade, use menos parágrafos
- Se houver mais informações relevantes ou pedido de detalhamento, use mais parágrafos, sem prolixidade
- Considere os tópicos informados como base principal do texto, mas sintetize quando necessário em vez de repetir mecanicamente item por item
- Inclua observações pedagógicas, impactos percebidos e encaminhamentos compatíveis com o que foi informado
- Não invente diagnóstico, laudo, fato, reincidência ou informação não presente nos dados ou na orientação do educador
- NÃO use markdown, bullets, títulos ou numeração
- Entregue somente o texto final, pronto para colar no relatório
- Tamanho sugerido: entre 550 e 1100 caracteres, ajustando à quantidade de informações`;

      const texto = await geminiRequest(prompt);

      // Add as a new topic in the report
      const container = document.getElementById('respostasContainer');
      if (container) {
        const div = document.createElement('div');
        div.className = 'resposta-item';
        div.dataset.index = contadorRespostas++;
        div.innerHTML = `
          <label>Tópico / Pergunta</label>
          <input type="text" class="resposta-titulo" value="Análise Pedagógica (IA)" />
          <label>Resposta / Observação</label>
          <textarea class="resposta-texto">${texto.trim()}</textarea>
          <button type="button" class="btn-danger btn-small" onclick="removerResposta(${contadorRespostas-1})" style="margin-top:8px">🗑️ Remover</button>
        `;
        container.appendChild(div);
        renderRelatorioPreview();
      }
    } catch(e) {
      if (e.message !== 'Chave não configurada') alert('Erro: ' + e.message);
    } finally {
      geminiSetLoading('btnGeminiRel', false);
    }
  }

  // ── ATIVIDADE DE DETENÇÃO ──
  async function geminiGerarDetencao() {
    const aluno      = document.getElementById('det-aluno')?.value || '—';
    const disciplina = document.getElementById('det-disciplina')?.value || '—';
    const motivo     = document.getElementById('det-motivo')?.value || '—';

    if (!aluno || aluno === '—') { alert('Preencha o nome do aluno primeiro.'); return; }

    const btn = document.querySelector('[onclick="geminiGerarDetencao()"]');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Gerando...'; }

    const instrucaoDet = document.getElementById('instrucaoDet')?.value?.trim() || '';
    try {
      const prompt = `Você é um(a) professor(a) experiente. Crie um texto reflexivo e educativo para que o aluno copie como atividade de detenção.

DADOS:
- Nome do aluno: ${aluno}
- Disciplina: ${disciplina}
- Motivo da detenção: ${motivo}
${instrucaoDet ? `- Orientação do professor: ${instrucaoDet}` : ''}

INSTRUÇÕES DE REDAÇÃO:
- Escreva um texto em primeira pessoa (como se o próprio aluno estivesse refletindo e se comprometendo)
- Desenvolva 3 a 4 parágrafos curtos e claros, cada um abordando um aspecto diferente: reconhecimento do erro, impacto do comportamento nos colegas e na aula, compromisso de mudança, e um fechamento positivo de autoencourajamento
- Use linguagem simples, direta e adequada para a faixa etária escolar
- O texto deve ser adequado para cópia manual, fluido e sem repetições
- NÃO use markdown, bullets, títulos ou numeração — apenas texto corrido
- O texto deve ter entre 400 e 700 caracteres`;

      const texto = await geminiRequest(prompt);
      const box = document.getElementById('det-texto-ia');
      if (box) {
        box.textContent = texto.trim();
        box.style.display = 'block';
      }
    } catch(e) {
      if (e.message !== 'Chave não configurada') alert('Erro: ' + e.message);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = '✨ Gerar texto de detenção com IA'; }
    }
  }

  // ── ABAS INTERNAS DETENÇÃO ──
  function detAbaAtiva(aba) {
    ['atividade','temas','redacao'].forEach(id => {
      const panel = document.getElementById('det-aba-' + id);
      const btn   = document.getElementById('det-aba-btn-' + id);
      if (!panel || !btn) return;
      const ativo = id === aba;
      panel.style.display = ativo ? 'block' : 'none';
      btn.style.borderBottomColor = ativo ? 'var(--brand)' : 'transparent';
      btn.style.color = ativo ? 'var(--ink)' : 'var(--muted)';
      btn.style.fontWeight = ativo ? '600' : '500';
    });
  }

  // ── FOLHA DE REDAÇÃO ──
  function redUpdate() {
    const aluno    = (document.getElementById('red-aluno')?.value || '').trim();
    const serie    = (document.getElementById('red-serie')?.value || '').trim();
    const data     = document.getElementById('red-data')?.value || '';
    const prof     = (document.getElementById('red-professor')?.value || '').trim();
    const tema     = (document.getElementById('red-tema')?.value || '').trim();
    const nLinhas  = parseInt(document.getElementById('red-linhas')?.value || 30);
    const segundaPag = document.getElementById('red-segunda-pag')?.checked;
    const logo     = document.getElementById('red-mostrar-logo')?.checked;

    // update display labels
    const lv = document.getElementById('red-linhas-val');
    if (lv) lv.textContent = nLinhas;

    const dataFmt = data ? new Date(data + 'T12:00:00').toLocaleDateString('pt-BR') : '';
    const logoSrc = document.getElementById('det-preview')?.querySelector('img')?.src || '';
    const usableH_mm = 296;
    const fixedBlock_mm = logo ? 58 : 40;
    const temaBlock_mm = tema ? 18 : 10;
    const esp = Math.max(20, Math.floor(((usableH_mm - fixedBlock_mm - temaBlock_mm) / nLinhas) * 3.7795));

    // build header
    let cabHtml = '';
    if (logo) {
      cabHtml = `<div class="red-header">
        ${logoSrc ? `<img src="${logoSrc}" style="height:44px;object-fit:contain;">` : '<div style="width:44px;"></div>'}
        <div class="red-titulo">Folha de Redação</div>
        <div class="red-escola">ENSPS<br>2026</div>
      </div>`;
    } else {
      cabHtml = `<div class="red-titulo" style="border-bottom:2px solid #000;padding-bottom:5px;margin-bottom:10px;">Folha de Redação</div>`;
    }

    // campos
    const camposHtml = `<div class="red-campos">
      <div class="red-campo"><strong>Aluno(a):</strong><span>${aluno}</span></div>
      <div class="red-campo"><strong>Série/Turma:</strong><span>${serie}</span></div>
      <div class="red-campo"><strong>Data:</strong><span>${dataFmt}</span></div>
      <div class="red-campo"><strong>Professor(a):</strong><span>${prof}</span></div>
    </div>`;

    // tema box
    const temaHtml = `<div class="red-tema-box">
      <div class="red-tema-label">Tema:</div>
      <div style="font-size:9px;line-height:1.5;">${tema.replace(/\n/g,'<br>') || '&nbsp;'}</div>
    </div>`;

    // linhas
    const buildLinhasHtml = (startAt = 1) => '<div class="red-linhas">' +
      Array.from({ length: nLinhas }, (_, idx) =>
        `<div class="red-ln" style="height:${esp}px;min-height:${esp}px;">
          <span class="red-ln-num">${startAt + idx}</span>
          <span class="red-ln-rule"></span>
        </div>`
      ).join('') + '</div>';

    const linhasHtml = buildLinhasHtml(1);

    document.getElementById('red-preview').innerHTML =
      `<div class="red-pagina">${cabHtml}${camposHtml}${temaHtml}${linhasHtml}</div>` +
      (segundaPag ? `<div class="red-pagina"><div class="red-titulo" style="border-bottom:2px solid #000;padding-bottom:5px;margin-bottom:10px;">Folha de Redação</div>${buildLinhasHtml(nLinhas + 1)}</div>` : '');
  }

  function redExecutarImpressao() {
    const preview = document.getElementById('red-preview');
    if (!preview) return;

    const html = preview.innerHTML.trim();
    if (!html) return;

    const win = window.open('', '_blank', 'width=900,height=1200');
    if (!win) {
      alert('Não foi possível abrir a janela de impressão. Verifique se o navegador bloqueou pop-ups.');
      return;
    }

    win.document.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Impressão - Folha de Redação</title>
  <style>
    @page { size: A4 portrait; margin: 0; }
    html, body { margin: 0; padding: 0; background: #fff; }
    body { font-family: Verdana, Arial, sans-serif; color: #000; }
    .red-pagina {
      background: #fff;
      width: 210mm;
      min-height: 297mm;
      margin: 0;
      padding: 8mm 10mm 0;
      color: #000;
      box-sizing: border-box;
      overflow: hidden;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .red-pagina:not(:last-child) {
      break-after: page;
      page-break-after: always;
    }
    .red-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #000;
      padding-bottom: 6px;
      margin-bottom: 10px;
    }
    .red-titulo {
      font-size: 15px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: .04em;
      text-decoration: underline;
      text-align: center;
      flex: 1;
    }
    .red-escola {
      font-size: 8px;
      font-weight: 700;
      text-transform: uppercase;
      text-align: right;
      max-width: 120px;
      line-height: 1.3;
    }
    .red-campos {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3px 12px;
      margin-bottom: 8px;
      font-size: 9px;
    }
    .red-campo {
      display: flex;
      align-items: baseline;
      gap: 4px;
      border-bottom: 1px solid #000;
      padding-bottom: 2px;
    }
    .red-campo strong { white-space: nowrap; font-size: 9px; }
    .red-campo span { flex: 1; font-size: 9px; min-height: 12px; }
    .red-tema-box {
      border: 1px solid #000;
      padding: 6px 8px;
      margin-bottom: 10px;
      font-size: 9px;
      line-height: 1.5;
      min-height: 36px;
    }
    .red-tema-label {
      font-size: 8px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .red-linhas { display: flex; flex-direction: column; margin-top: 4px; }
    .red-ln {
      width: 100%;
      display: flex;
      align-items: flex-end;
      gap: 6px;
      box-sizing: border-box;
    }
    .red-ln-num {
      width: 18px;
      font-size: 8px;
      font-weight: 800;
      color: #000;
      line-height: 1;
      text-align: right;
      flex-shrink: 0;
    }
    .red-ln-rule {
      flex: 1;
      border-bottom: 2px solid #000;
      height: 100%;
      display: block;
      box-sizing: border-box;
    }
    * { box-shadow: none; }
  </style>
</head>
<body>${html}</body>
</html>`);
    win.document.close();

    const doPrint = () => {
      win.focus();
      win.print();
      setTimeout(() => win.close(), 300);
    };

    if (win.document.readyState === 'complete') {
      doPrint();
    } else {
      win.onload = doPrint;
    }
  }

  function redImprimir() {
    redUpdate();
    redExecutarImpressao();
  }

  async function redBaixarPDF() {
    redUpdate();
    await pdfBaixarPaginas([...document.querySelectorAll('#red-preview .red-pagina')], 'folha_redacao.pdf');
  }

  // populate red-alunos datalist from caderno de alunos
  function redPopularAlunos() {
    const dl = document.getElementById('red-alunosList');
    const src = document.getElementById('det-alunosList');
    if (!dl || !src) return;
    dl.innerHTML = src.innerHTML;
  }

  // ── TEMAS DE REDAÇÃO ──
  async function geminiGerarTemas() {
    const serie       = document.getElementById('tema-serie')?.value || '';
    const tipoTexto   = document.getElementById('tema-tipo-texto')?.value || 'qualquer';
    const quantidade  = document.getElementById('tema-quantidade')?.value || '5';
    const instrucao   = document.getElementById('tema-instrucao-livre')?.value?.trim() || '';
    const categorias  = [...document.querySelectorAll('#tema-checkboxes input[type=checkbox]:checked')].map(i => i.value);

    if (!categorias.length && !instrucao) {
      alert('Marque pelo menos uma categoria ou escreva uma instrução livre.');
      return;
    }

    const btn = document.getElementById('btnGerarTemas');
    btn.disabled = true;
    btn.innerHTML = '⏳ Gerando temas...';

    try {
      const categoriasTexto = categorias.length > 0
        ? categorias.map((c, i) => `${i + 1}. ${c}`).join('\n')
        : '';

      const prompt = `Você é um(a) professor(a) experiente de Língua Portuguesa. Crie ${quantidade} temas de redação originais, instigantes e bem elaborados para uso em atividade escolar.

CONFIGURAÇÕES:
- Série / Faixa etária: ${serie || 'não especificada (use linguagem acessível para ensino fundamental/médio)'}
- Tipo de texto: ${tipoTexto}
${categoriasTexto ? `- Categorias temáticas solicitadas:\n${categoriasTexto}` : ''}
${instrucao ? `- Instrução específica do professor: ${instrucao}` : ''}

INSTRUÇÕES DE CRIAÇÃO:
- Crie exatamente ${quantidade} temas numerados
- Cada tema deve ter: um TÍTULO curto e impactante + uma PROPOSTA completa de 2 a 3 linhas explicando o contexto, o que deve ser abordado e o que se espera do aluno
- Os temas devem ser variados entre si, mesmo que pertençam à mesma categoria
- Use linguagem clara, motivadora e adequada à faixa etária indicada
- Distribua os temas entre as categorias marcadas de forma equilibrada
- Ao final de cada tema, indique entre parênteses a categoria a que pertence

FORMATO DE RESPOSTA — siga EXATAMENTE este modelo para cada tema:
TEMA [número]: [Título do tema]
[Proposta completa em 2 a 3 linhas]
([Categoria])

Separe cada tema com uma linha em branco. Sem markdown, sem bullets extras.`;

      const texto = await geminiRequest(prompt);
      renderTemasResultado(texto.trim(), parseInt(quantidade));
    } catch(e) {
      if (e.message !== 'Chave não configurada') alert('Erro: ' + e.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = '✨ Gerar Temas com IA';
    }
  }

  function renderTemasResultado(texto, quantidade) {
    const resultado = document.getElementById('temas-resultado');
    const lista = document.getElementById('temas-lista');
    resultado.style.display = 'block';
    lista.innerHTML = '';

    // Quebrar por "TEMA X:" ou linha em branco dupla
    const blocos = texto.split(/\n\s*\n/).filter(b => b.trim());

    blocos.forEach((bloco, idx) => {
      const linhas = bloco.trim().split('\n');
      const tituloLinha = linhas[0] || '';
      const corpo = linhas.slice(1).join('\n').trim();

      const card = document.createElement('div');
      card.style.cssText = 'background:var(--card);border:1px solid var(--border);border-radius:10px;padding:16px;position:relative;';

      const numMatch = tituloLinha.match(/TEMA\s*(\d+)\s*[:\-]?\s*(.*)/i);
      const numero = numMatch ? numMatch[1] : (idx + 1);
      const titulo = numMatch ? numMatch[2].trim() : tituloLinha.trim();

      card.innerHTML = `
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="background:var(--brand);color:#fff;font-size:.72rem;font-weight:700;padding:3px 8px;border-radius:20px;flex-shrink:0;">Tema ${numero}</span>
            <strong style="font-size:.92rem;color:var(--ink);">${titulo}</strong>
          </div>
          <button onclick="temasCopiarUm(this)" data-texto="${(titulo + '\n' + corpo).replace(/"/g,'&quot;')}"
            style="background:var(--card2);border:1px solid var(--border);color:var(--muted);border-radius:6px;padding:4px 10px;font-size:.74rem;cursor:pointer;flex-shrink:0;">
            📋 Copiar
          </button>
        </div>
        <p style="font-size:.84rem;color:var(--muted);line-height:1.6;margin:0;">${corpo.replace(/\n/g,'<br>')}</p>
      `;
      lista.appendChild(card);
    });

    resultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function temasCopiarUm(btn) {
    const texto = btn.dataset.texto;
    navigator.clipboard.writeText(texto).then(() => {
      const orig = btn.textContent;
      btn.textContent = '✅ Copiado!';
      setTimeout(() => btn.textContent = orig, 1500);
    });
  }

  function temasCopiarTodos() {
    const cards = document.querySelectorAll('#temas-lista [data-texto]');
    const texto = [...cards].map((b, i) => `--- Tema ${i+1} ---\n` + b.dataset.texto).join('\n\n');
    navigator.clipboard.writeText(texto).then(() => alert('Todos os temas copiados!'));
  }

  function temasSalvarTxt() {
    const cards = document.querySelectorAll('#temas-lista [data-texto]');
    const texto = [...cards].map((b, i) => `--- Tema ${i+1} ---\n` + b.dataset.texto).join('\n\n');
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'temas_redacao.txt';
    a.click();
  }

  const iniciarBancoRemotoQuandoPossivel = () => {
    try {
      inicializarBancoRemoto();
    } catch (erro) {
      console.warn('ENSPS: falha ao iniciar banco remoto.', erro);
    }
  };

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => iniciarBancoRemotoQuandoPossivel(), { timeout: 2000 });
  } else {
    setTimeout(() => iniciarBancoRemotoQuandoPossivel(), 1200);
  }
  window.addEventListener('focus', () => {
    sincronizarBancoRemotoEmSegundoPlano('Verificação ao voltar para a janela');
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      sincronizarBancoRemotoEmSegundoPlano('Verificação ao voltar para a aba');
    }
  });
  setInterval(() => {
    sincronizarBancoRemotoEmSegundoPlano('Verificação periódica entre dispositivos');
  }, 30000);

