// ============================================================
// RELATÓRIOS GERAIS - ENSPS 2026
// ============================================================
(function(){
  let ultimoRelatorioGeral = null;

  function el(id){ return document.getElementById(id); }
  function textoNormalizadoRelatorios(texto){
    if (typeof normalizarTextoBusca === 'function') return normalizarTextoBusca(texto);
    return String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }
  function dataPt(data){
    if (typeof fmtData === 'function') return fmtData(data);
    if (!data) return '';
    const partes = String(data).split('-');
    return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : data;
  }
  function statusLegivelRelatorios(status){
    const mapa = {
      'presente': 'Presente',
      'falta': 'Falta',
      'segunda-chamada': '2ª Chamada',
      'justificada': 'Justificada',
      'sem-fardamento': 'Sem fardamento'
    };
    return mapa[status] || status || '—';
  }
  function alunoPorNomeRelatorios(nome){
    const normalizado = textoNormalizadoRelatorios(nome);
    return (Array.isArray(alunosDB) ? alunosDB : []).find(a => a.nome === nome)
      || (Array.isArray(alunosDB) ? alunosDB : []).find(a => textoNormalizadoRelatorios(a.nome) === normalizado)
      || null;
  }
  function obterFiltrosRelatorios(){
    return {
      inicio: el('relGeralDataInicio')?.value || '',
      fim: el('relGeralDataFim')?.value || '',
      serie: el('relGeralSerie')?.value || '',
      ensino: el('relGeralEnsino')?.value || '',
      status: el('relGeralStatus')?.value || '',
      busca: textoNormalizadoRelatorios(el('relGeralBuscaAluno')?.value || '')
    };
  }
  function filtrarRegistrosRelatorios(){
    const filtros = obterFiltrosRelatorios();
    const fonte = Array.isArray(registrosFrequencia) ? registrosFrequencia : [];
    return fonte
      .map(reg => ({ ...reg, alunoInfo: alunoPorNomeRelatorios(reg.aluno) }))
      .filter(reg => {
        if (filtros.inicio && reg.data < filtros.inicio) return false;
        if (filtros.fim && reg.data > filtros.fim) return false;
        if (filtros.status && reg.status !== filtros.status) return false;
        if (filtros.serie && reg.alunoInfo?.serie !== filtros.serie) return false;
        if (filtros.ensino && !String(reg.alunoInfo?.serie || '').includes(filtros.ensino)) return false;
        if (filtros.busca && !textoNormalizadoRelatorios(reg.aluno).includes(filtros.busca)) return false;
        return true;
      });
  }
  function criaContadorBase(){ return { registros:0, falta:0, segunda:0, justificada:0, semFardamento:0, presente:0 }; }
  function acumularStatus(contador, status){
    contador.registros += 1;
    if (status === 'falta') contador.falta += 1;
    else if (status === 'segunda-chamada') contador.segunda += 1;
    else if (status === 'justificada') contador.justificada += 1;
    else if (status === 'sem-fardamento') contador.semFardamento += 1;
    else if (status === 'presente') contador.presente += 1;
  }
  function montarRelatorioGeral(){
    const registros = filtrarRegistrosRelatorios().sort((a,b) => String(a.data).localeCompare(String(b.data)) || String(a.aluno).localeCompare(String(b.aluno)));
    const totais = criaContadorBase();
    const porSerie = new Map();
    const porAluno = new Map();
    const porDia = new Map();
    registros.forEach(reg => {
      const serie = reg.alunoInfo?.serie || 'Sem série';
      const chaveAluno = reg.aluno || 'Aluno não informado';
      const dia = reg.data || 'Sem data';
      acumularStatus(totais, reg.status);
      if (!porSerie.has(serie)) porSerie.set(serie, criaContadorBase());
      acumularStatus(porSerie.get(serie), reg.status);
      if (!porDia.has(dia)) porDia.set(dia, criaContadorBase());
      acumularStatus(porDia.get(dia), reg.status);
      if (!porAluno.has(chaveAluno)) porAluno.set(chaveAluno, { ...criaContadorBase(), aluno: chaveAluno, serie });
      acumularStatus(porAluno.get(chaveAluno), reg.status);
    });
    const serieRows = [...porSerie.entries()].sort((a,b) => a[0].localeCompare(b[0]));
    const alunoRows = [...porAluno.values()].sort((a,b) => (b.falta + b.segunda + b.justificada + b.semFardamento) - (a.falta + a.segunda + a.justificada + a.semFardamento) || a.aluno.localeCompare(b.aluno)).slice(0, 100);
    const diaRows = [...porDia.entries()].sort((a,b) => a[0].localeCompare(b[0]));
    return { filtros: obterFiltrosRelatorios(), registros, totais, serieRows, alunoRows, diaRows, geradoEm: new Date().toISOString() };
  }
  function linhaVazia(colspan, texto){ return `<tr><td colspan="${colspan}" style="text-align:center" class="muted">${texto}</td></tr>`; }
  function renderMetricas(rel){
    const wrap = el('relGeralMetricas');
    if (!wrap) return;
    const cards = [['Registros', rel.totais.registros], ['Faltas', rel.totais.falta], ['2ª Chamada', rel.totais.segunda], ['Justificadas', rel.totais.justificada], ['Sem fardamento', rel.totais.semFardamento], ['Presenças lançadas', rel.totais.presente]];
    wrap.innerHTML = cards.map(([label, valor]) => `<div class="relatorios-metrica-card"><span>${label}</span><strong>${valor}</strong></div>`).join('');
  }
  function renderTabelaSeries(rel){
    const tbody = document.querySelector('#relGeralTabelaSeries tbody');
    if (!tbody) return;
    tbody.innerHTML = rel.serieRows.length ? rel.serieRows.map(([serie, s]) => `<tr><td>${serie}</td><td>${s.registros}</td><td>${s.falta}</td><td>${s.segunda}</td><td>${s.justificada}</td><td>${s.semFardamento}</td></tr>`).join('') : linhaVazia(6, 'Nenhum registro encontrado.');
  }
  function renderTabelaAlunos(rel){
    const tbody = document.querySelector('#relGeralTabelaAlunos tbody');
    if (!tbody) return;
    tbody.innerHTML = rel.alunoRows.length ? rel.alunoRows.map(a => `<tr><td>${a.aluno}</td><td>${a.serie}</td><td>${a.falta}</td><td>${a.segunda}</td><td>${a.justificada}</td><td>${a.semFardamento}</td></tr>`).join('') : linhaVazia(6, 'Nenhum aluno encontrado.');
  }
  function renderTabelaDias(rel){
    const tbody = document.querySelector('#relGeralTabelaDias tbody');
    if (!tbody) return;
    tbody.innerHTML = rel.diaRows.length ? rel.diaRows.map(([dia, d]) => `<tr><td>${dataPt(dia)}</td><td>${d.registros}</td><td>${d.falta}</td><td>${d.segunda}</td><td>${d.justificada}</td><td>${d.semFardamento}</td></tr>`).join('') : linhaVazia(6, 'Nenhum dia encontrado.');
  }
  function renderTabelaDetalhada(rel){
    const tbody = document.querySelector('#relGeralTabelaDetalhada tbody');
    if (!tbody) return;
    const linhas = rel.registros.slice(0, 500).map(reg => `<tr><td>${dataPt(reg.data)}</td><td>${reg.aluno || ''}</td><td>${reg.alunoInfo?.serie || ''}</td><td>${statusLegivelRelatorios(reg.status)}</td><td>${reg.justificativa || reg.segundaChamadaSituacao || ''}</td></tr>`).join('');
    tbody.innerHTML = linhas || linhaVazia(5, 'Nenhum registro detalhado encontrado.');
  }
  function atualizarInfoRelatorios(rel){
    const info = el('relGeralInfo');
    if (!info) return;
    const partes = [];
    if (rel.filtros.inicio) partes.push(`de ${dataPt(rel.filtros.inicio)}`);
    if (rel.filtros.fim) partes.push(`até ${dataPt(rel.filtros.fim)}`);
    if (rel.filtros.serie) partes.push(`série ${rel.filtros.serie}`);
    if (rel.filtros.ensino) partes.push(rel.filtros.ensino === 'EF' ? 'Ensino Fundamental' : 'Ensino Médio');
    if (rel.filtros.status) partes.push(statusLegivelRelatorios(rel.filtros.status));
    info.textContent = `Relatório gerado com ${rel.totais.registros} registro(s)` + (partes.length ? ` — filtros: ${partes.join(', ')}.` : '.');
  }
  function atualizarRelatoriosGerais(){
    ultimoRelatorioGeral = montarRelatorioGeral();
    renderMetricas(ultimoRelatorioGeral);
    renderTabelaSeries(ultimoRelatorioGeral);
    renderTabelaAlunos(ultimoRelatorioGeral);
    renderTabelaDias(ultimoRelatorioGeral);
    renderTabelaDetalhada(ultimoRelatorioGeral);
    atualizarInfoRelatorios(ultimoRelatorioGeral);
  }
  function relatorioParaCSV(rel){
    const csv = v => '"' + String(v ?? '').replace(/"/g,'""') + '"';
    const linhas = [];
    linhas.push(['tipo','data','aluno','serie','status','observacao','registros','faltas','segunda_chamada','justificadas','sem_fardamento'].map(csv).join(','));
    rel.serieRows.forEach(([serie, s]) => linhas.push(['resumo_serie','', '', serie, '', '', s.registros, s.falta, s.segunda, s.justificada, s.semFardamento].map(csv).join(',')));
    rel.diaRows.forEach(([dia, d]) => linhas.push(['resumo_dia',dia, '', '', '', '', d.registros, d.falta, d.segunda, d.justificada, d.semFardamento].map(csv).join(',')));
    rel.registros.forEach(r => linhas.push(['detalhe', r.data || '', r.aluno || '', r.alunoInfo?.serie || '', statusLegivelRelatorios(r.status), r.justificativa || r.segundaChamadaSituacao || '', '', '', '', '', ''].map(csv).join(',')));
    return linhas.join('\n');
  }
  function relatorioParaTXT(rel){
    const linhas = [];
    linhas.push('RELATÓRIOS GERAIS - ENSPS 2026');
    linhas.push('Gerado em: ' + new Date(rel.geradoEm).toLocaleString('pt-BR'));
    linhas.push('');
    linhas.push(`Registros: ${rel.totais.registros}`);
    linhas.push(`Faltas: ${rel.totais.falta}`);
    linhas.push(`2ª Chamada: ${rel.totais.segunda}`);
    linhas.push(`Justificadas: ${rel.totais.justificada}`);
    linhas.push(`Sem fardamento: ${rel.totais.semFardamento}`);
    linhas.push('');
    linhas.push('RESUMO POR SÉRIE');
    rel.serieRows.forEach(([serie, s]) => linhas.push(`${serie}: registros ${s.registros} | F ${s.falta} | 2ª Ch. ${s.segunda} | Just. ${s.justificada} | SF ${s.semFardamento}`));
    linhas.push('');
    linhas.push('RESUMO POR DIA');
    rel.diaRows.forEach(([dia, d]) => linhas.push(`${dataPt(dia)}: registros ${d.registros} | F ${d.falta} | 2ª Ch. ${d.segunda} | Just. ${d.justificada} | SF ${d.semFardamento}`));
    linhas.push('');
    linhas.push('ALUNOS COM MAIS OCORRÊNCIAS');
    rel.alunoRows.forEach(a => linhas.push(`${a.aluno} (${a.serie}): F ${a.falta} | 2ª Ch. ${a.segunda} | Just. ${a.justificada} | SF ${a.semFardamento}`));
    return linhas.join('\n');
  }
  function nomeRelatorio(ext){ return `relatorios_gerais_ensps_${new Date().toISOString().slice(0,10)}.${ext}`; }
  function baixarRelatorioCSV(){ if (!ultimoRelatorioGeral) atualizarRelatoriosGerais(); baixarArquivo(relatorioParaCSV(ultimoRelatorioGeral), nomeRelatorio('csv'), 'text/csv;charset=utf-8'); }
  function baixarRelatorioTXT(){ if (!ultimoRelatorioGeral) atualizarRelatoriosGerais(); baixarArquivo(relatorioParaTXT(ultimoRelatorioGeral), nomeRelatorio('txt'), 'text/plain;charset=utf-8'); }
  function imprimirRelatoriosGerais(){
    atualizarRelatoriosGerais();
    document.body.classList.add('print-active-relatorios-gerais');
    const cleanupPrintRelatorios = () => document.body.classList.remove('print-active-relatorios-gerais');
    window.addEventListener('afterprint', cleanupPrintRelatorios, { once: true });
    window.print();
    setTimeout(cleanupPrintRelatorios, 1500);
  }
  function inicializarRelatoriosGerais(){
    const hoje = new Date().toISOString().slice(0,10);
    if (el('relGeralDataFim') && !el('relGeralDataFim').value) el('relGeralDataFim').value = hoje;
    el('btnAtualizarRelatoriosGerais')?.addEventListener('click', atualizarRelatoriosGerais);
    el('btnRelatoriosGeraisCSV')?.addEventListener('click', baixarRelatorioCSV);
    el('btnRelatoriosGeraisTXT')?.addEventListener('click', baixarRelatorioTXT);
    el('btnImprimirRelatoriosGerais')?.addEventListener('click', imprimirRelatoriosGerais);
    ['relGeralDataInicio','relGeralDataFim','relGeralSerie','relGeralEnsino','relGeralStatus','relGeralBuscaAluno'].forEach(id => {
      const campo = el(id);
      if (!campo) return;
      campo.addEventListener(campo.tagName === 'INPUT' ? 'input' : 'change', () => {
        if (document.getElementById('relatorios-gerais')?.classList.contains('active')) atualizarRelatoriosGerais();
      });
    });
    document.querySelectorAll('[data-section="relatorios-gerais"]').forEach(item => item.addEventListener('click', () => setTimeout(atualizarRelatoriosGerais, 80)));
    atualizarRelatoriosGerais();
  }
  window.atualizarRelatoriosGerais = atualizarRelatoriosGerais;
  inicializarRelatoriosGerais();
})();
