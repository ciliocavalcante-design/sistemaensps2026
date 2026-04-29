// Módulo extraído de assets/js/index.js
// Mantém escopo global do sistema ENSPS 2026.

    // =========================
    // SISTEMA DE FREQUÊNCIA
    // =========================
    let registrosFrequencia = Array.isArray(enspsDB.frequenciaAlunos) ? enspsDB.frequenciaAlunos : [];
    let advertenciasSalvas = Array.isArray(enspsDB.advertencias) ? enspsDB.advertencias : [];
    let comunicadosRegistros = Array.isArray(enspsDB.comunicadosProfessores) ? enspsDB.comunicadosProfessores : [];
    let comunicadoAtualId = null;
    let uniformeModalContexto = null;
    const uniformeOcorrenciaLabels = {
      'a-paisana': 'À paisana',
      'farda-ed-fisica-dia-inapropriado': 'Farda de Educação Física em dia inapropriado',
      'sem-farda-ed-fisica-com-farda-normal': 'Sem fardamento de Educação Física com farda normal',
      'sem-farda-ed-fisica-a-paisana': 'Sem fardamento de Educação Física e à paisana',
      'blusa-feira-dia-inapropriado': 'Blusa da feira em dia inapropriado',
      'a-paisana-justificado': 'À paisana justificado pelos pais',
      'fardamento-misturado': 'Fardamento misturado com roupa',
      'calcado-inapropriado-justificado': 'Calçado inapropriado justificado pelos pais'
    };
    const uniformeCalcadoLabels = {
      chinela: 'Calçado inapropriado: chinela',
      crocs: 'Calçado inapropriado: crocs',
      'sapato-cor-inadequada': 'Calçado inapropriado: sapato de cor inadequada'
    };
    advertenciasSalvas = advertenciasSalvas.map(adv => {
      const temCampoLinhas = Object.prototype.hasOwnProperty.call(adv, 'usaLinhasAssinatura');
      const temCampoPendencia = Object.prototype.hasOwnProperty.call(adv, 'pendenciaAssinatura');
      const assinaturaRecebidaEm = adv.assinaturaRecebidaEm || '';
      const usaLinhasAssinatura = temCampoLinhas ? !!adv.usaLinhasAssinatura : true;
      const pendenciaAssinatura = (!temCampoLinhas && !assinaturaRecebidaEm)
        ? true
        : (temCampoPendencia ? !!adv.pendenciaAssinatura : !!usaLinhasAssinatura);

      return {
        ...adv,
        usaLinhasAssinatura,
        pendenciaAssinatura,
        assinaturaRecebidaEm
      };
    });
    enspsDB.frequenciaAlunos = registrosFrequencia;
    enspsDB.advertencias = advertenciasSalvas;
    enspsDB.comunicadosProfessores = comunicadosRegistros;

    document.getElementById('dataFreq').valueAsDate = new Date();

    document.getElementById('aluno').addEventListener('input', function(){
      const txt = this.value.trim().toUpperCase();
      const aluno = alunosDB.find(a => a.nome.toUpperCase() === txt);
      document.getElementById('matricula').value = aluno ? aluno.matricula : '';
      document.getElementById('serie').value = aluno ? aluno.serie : '';
      document.getElementById('turma').value = aluno ? aluno.turma : '';
      const badge = document.getElementById('adv-historico-badge');
      if(aluno){
        const total = advertenciasSalvas.filter(a => a.aluno === aluno.nome).length;
        if(total > 0){
          badge.textContent = '⚠️ Este aluno já possui ' + total + ' registro' + (total>1?'s':'') + ' de advertência/ocorrência.';
          badge.style.display = 'block';
        } else {
          badge.textContent = '✅ Nenhum registro anterior para este aluno.';
          badge.style.background = 'var(--success-dim)';
          badge.style.borderColor = 'var(--success)';
          badge.style.color = '#4ade80';
          badge.style.display = 'block';
        }
      } else {
        badge.style.display = 'none';
      }
      renderPreview();
    });

    document.getElementById('alunoRelatorio').addEventListener('input', function(){
      const txt = this.value.trim().toUpperCase();
      const aluno = alunosDB.find(a => a.nome.toUpperCase() === txt);
      document.getElementById('serieRelatorio').value = aluno ? aluno.serie : '';
      if(aluno){
        const ensino = aluno.serie.includes('EF') ? 'Ensino Fundamental' : 
                      aluno.serie.includes('EM') ? 'Ensino Médio' : '';
        document.getElementById('ensinoRelatorio').value = ensino;
      }
      renderRelatorioPreview();
    });

    document.getElementById('alunoGestor').addEventListener('input', function(){
      const txt = this.value.trim().toUpperCase();
      const aluno = alunosDB.find(a => a.nome.toUpperCase() === txt);
      document.getElementById('matriculaGestor').value = aluno ? aluno.matricula : '';
    });

    function obterResumoDetalhesUniforme(detalhes = {}){
      const itens = Array.isArray(detalhes.itens) ? detalhes.itens : [];
      const partes = itens.map(item => uniformeOcorrenciaLabels[item]).filter(Boolean);
      if(detalhes.calcadoInapropriado && detalhes.calcadoTipo && uniformeCalcadoLabels[detalhes.calcadoTipo]){
        partes.push(uniformeCalcadoLabels[detalhes.calcadoTipo]);
      }
      return partes.join('; ');
    }

    function resetarModalUniforme(){
      document.querySelectorAll('#uniformeOpcoesGrid input[type="checkbox"]').forEach(input => {
        input.checked = false;
      });
      document.querySelectorAll('#uniformeOpcoesGrid input[type="radio"]').forEach(input => {
        input.checked = false;
      });
      const preview = document.getElementById('uniformeResumoPreview');
      if(preview) preview.textContent = 'Nenhuma opção selecionada ainda.';
    }

    function atualizarResumoModalUniforme(){
      const detalhes = coletarDetalhesModalUniforme();
      const preview = document.getElementById('uniformeResumoPreview');
      if(!preview) return;
      const resumo = obterResumoDetalhesUniforme(detalhes);
      preview.textContent = resumo || 'Nenhuma opção selecionada ainda.';
    }

    function coletarDetalhesModalUniforme(){
      const itens = [...document.querySelectorAll('#uniformeOpcoesGrid input[type="checkbox"][value]:checked')].map(input => input.value);
      const calcadoInapropriado = !!document.getElementById('uniformeCalcadoInapropriado')?.checked;
      const calcadoTipo = document.querySelector('input[name="uniformeCalcadoTipo"]:checked')?.value || '';
      return { itens, calcadoInapropriado, calcadoTipo };
    }

    function preencherModalUniforme(detalhes = {}){
      resetarModalUniforme();
      const itens = Array.isArray(detalhes.itens) ? detalhes.itens : [];
      itens.forEach(item => {
        const input = document.querySelector(`#uniformeOpcoesGrid input[type="checkbox"][value="${item}"]`);
        if(input) input.checked = true;
      });
      const calcadoInput = document.getElementById('uniformeCalcadoInapropriado');
      if(calcadoInput) calcadoInput.checked = !!detalhes.calcadoInapropriado;
      if(detalhes.calcadoTipo){
        const radio = document.querySelector(`input[name="uniformeCalcadoTipo"][value="${detalhes.calcadoTipo}"]`);
        if(radio) radio.checked = true;
      }
      atualizarResumoModalUniforme();
    }

    window.abrirModalUniforme = function(nomeAluno){
      const data = document.getElementById('dataFreq').value;
      if(!data){
        alert('Selecione uma data!');
        return;
      }

      const registroAtual = registrosFrequencia.find(r => r.aluno === nomeAluno && r.data === data);
      uniformeModalContexto = { nomeAluno, data };
      preencherModalUniforme(registroAtual?.uniformeDetalhes || {});

      const info = document.getElementById('uniformeModalAlunoInfo');
      if(info) info.textContent = `${nomeAluno} · ${fmtData(data)} · selecione uma ou mais ocorrências.`;
      document.getElementById('uniformeModal')?.classList.add('active');
    };

    window.fecharModalUniforme = function(){
      uniformeModalContexto = null;
      document.getElementById('uniformeModal')?.classList.remove('active');
    };

    window.salvarDetalhesUniforme = function(){
      if(!uniformeModalContexto) return;
      const detalhes = coletarDetalhesModalUniforme();
      if(!detalhes.itens.length && !detalhes.calcadoInapropriado){
        alert('Selecione pelo menos uma ocorrência.');
        return;
      }
      if(detalhes.calcadoInapropriado && !detalhes.calcadoTipo){
        alert('Selecione a subopção de calçado inapropriado.');
        return;
      }

      registrosFrequencia = registrosFrequencia.filter(r => !(r.aluno === uniformeModalContexto.nomeAluno && r.data === uniformeModalContexto.data));
      registrosFrequencia.push({
        id: Date.now(),
        aluno: uniformeModalContexto.nomeAluno,
        data: uniformeModalContexto.data,
        status: 'sem-fardamento',
        justificativa: obterResumoDetalhesUniforme(detalhes),
        uniformeDetalhes: detalhes
      });

      fecharModalUniforme();
      renderTabelaFrequencia();
    };

    function normalizarTextoBusca(texto){
      return String(texto || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    }

    function renderTabelaFrequencia(){
      const tbody = document.querySelector('#tabelaFrequencia tbody');
      const serie = document.getElementById('filtroSerie').value;
      const ensino = document.getElementById('filtroEnsino').value;
      const data = document.getElementById('dataFreq').value;
      const buscaAluno = normalizarTextoBusca(document.getElementById('buscaAlunoFreq')?.value || '');

      tbody.innerHTML = '';

      let alunosFiltrados = alunosDB;
      if(serie) alunosFiltrados = alunosFiltrados.filter(a => a.serie === serie);
      if(ensino) alunosFiltrados = alunosFiltrados.filter(a => a.serie.includes(ensino));
      if(buscaAluno) alunosFiltrados = alunosFiltrados.filter(a => normalizarTextoBusca(a.nome).includes(buscaAluno));

      if(!alunosFiltrados.length){
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center" class="muted">Nenhum aluno encontrado para os filtros informados.</td></tr>';
        return;
      }

      alunosFiltrados.forEach((aluno, idx) => {
        const tr = document.createElement('tr');

        const registro = registrosFrequencia.find(r => 
          r.aluno === aluno.nome && r.data === data
        );
        const statusAtual = registro ? registro.status : 'presente';

        tr.innerHTML = `
          <td>${idx + 1}</td>
          <td>${aluno.nome}</td>
          <td>${aluno.serie}</td>
          <td>${aluno.serie.includes('EF') ? 'Fund.' : 'Médio'}</td>
          <td>
            <div class="presenca-btns">
              <button class="presenca-btn ${statusAtual === 'presente' ? 'presente' : ''}" 
                      onclick="marcarPresenca('${aluno.nome}', 'presente')">
                ✓ P
              </button>
              <button class="presenca-btn ${statusAtual === 'falta' ? 'falta' : ''}"
                      onclick="marcarPresenca('${aluno.nome}', 'falta')">
                ✗ F
              </button>
              <button class="presenca-btn ${statusAtual === 'segunda-chamada' ? 'segunda-chamada' : ''}"
                      onclick="marcarPresenca('${aluno.nome}', 'segunda-chamada')">
                2ª CH
              </button>
              <button class="presenca-btn ${statusAtual === 'justificada' ? 'justificada' : ''}"
                      onclick="marcarPresenca('${aluno.nome}', 'justificada')">
                📝 J
              </button>
              <button class="presenca-btn ${statusAtual === 'sem-fardamento' ? 'sem-fardamento' : ''}" 
                      onclick="abrirModalUniforme('${aluno.nome.replace(/'/g, "\\'")}')">
                👕 SF
              </button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    function obterAlunoPorNome(nomeAluno){
      return alunosDB.find(a => a.nome === nomeAluno)
        || alunosDB.find(a => normalizarTextoBusca(a.nome) === normalizarTextoBusca(nomeAluno));
    }

    function provaFundamentalAtiva(){
      return !!document.getElementById('checkProvaFundamental')?.checked;
    }

    function provaMedioAtiva(){
      return !!document.getElementById('checkProvaMedio')?.checked;
    }

    function alunoEhFundamental(aluno){
      return !!aluno && String(aluno.serie || '').includes('EF');
    }

    function alunoEhMedio(aluno){
      return !!aluno && String(aluno.serie || '').includes('EM');
    }

    function obterStatusComRegraProva(nomeAluno, status){
      if(status !== 'falta') return status;
      const aluno = typeof nomeAluno === 'object' ? nomeAluno : obterAlunoPorNome(nomeAluno);
      if(alunoEhFundamental(aluno) && provaFundamentalAtiva()) return 'segunda-chamada';
      if(alunoEhMedio(aluno) && provaMedioAtiva()) return 'segunda-chamada';
      return status;
    }

    function aplicarRegraProvaNaDataAtual(){
      const data = document.getElementById('dataFreq')?.value;
      if(!data) return;

      let alterados = 0;
      registrosFrequencia.forEach(reg => {
        if(reg.data !== data || reg.status !== 'falta') return;
        const novoStatus = obterStatusComRegraProva(reg.aluno, 'falta');
        if(novoStatus === 'segunda-chamada'){
          reg.status = 'segunda-chamada';
          reg.segundaChamadaSituacao = reg.segundaChamadaSituacao || 'pendente';
          reg.segundaChamadaOrigem = reg.segundaChamadaOrigem || 'prova';
          alterados++;
        }
      });

      if(alterados){
        sincronizarBancoPrincipal('Regra de prova aplicada na frequência diária');
        renderTabelaFrequencia();
        atualizarFaltasAcumuladas();
        renderTabelaSegundaChamadaPorDia();
        renderRelatorioSegundaChamada();
        atualizarDashboardGestor();
      }
    }

    window.marcarPresenca = function(nomeAluno, status){
      const data = document.getElementById('dataFreq').value;
      if(!data){
        alert('Selecione uma data!');
        return;
      }

      status = obterStatusComRegraProva(nomeAluno, status);

      registrosFrequencia = registrosFrequencia.filter(r => 
        !(r.aluno === nomeAluno && r.data === data)
      );

      registrosFrequencia.push({
        id: Date.now(),
        aluno: nomeAluno,
        data,
        status,
        justificativa: '',
        uniformeDetalhes: null,
        segundaChamadaSituacao: status === 'segunda-chamada' ? 'pendente' : undefined,
        segundaChamadaOrigem: status === 'segunda-chamada' ? 'prova' : undefined
      });

      renderTabelaFrequencia();
    };

    document.getElementById('btnSalvarFrequencias').addEventListener('click', function(){
      sincronizarBancoPrincipal();
      alert('✅ Frequências salvas com sucesso!');
      atualizarFaltasAcumuladas();
      renderTabelaSegundaChamadaPorDia();
      atualizarDashboardGestor();
      renderRelatorioSegundaChamada();
    });

    function atualizarFaltasAcumuladas(){
      const tbody = document.querySelector('#tabelaFaltasAcumuladas tbody');
      tbody.innerHTML = '';

      const estatisticas = {};

      alunosDB.forEach(aluno => {
        const registros = registrosFrequencia.filter(r => r.aluno === aluno.nome);
        const faltas = registros.filter(r => r.status === 'falta').length;
        const segundaChamada = registros.filter(r => r.status === 'segunda-chamada').length;
        const justificadas = registros.filter(r => r.status === 'justificada').length;
        const semFardamento = registros.filter(r => r.status === 'sem-fardamento').length;

        if(faltas > 0 || segundaChamada > 0 || justificadas > 0 || semFardamento > 0){
          estatisticas[aluno.nome] = {
            serie: aluno.serie,
            faltas,
            segundaChamada,
            justificadas,
            semFardamento
          };
        }
      });

      const ordenado = Object.entries(estatisticas).sort((a,b) => b[1].faltas - a[1].faltas);

      ordenado.forEach(([nome, stats]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${nome}</td>
          <td>${stats.serie}</td>
          <td><span class="badge badge-falta">${stats.faltas}</span></td>
          <td><span class="badge badge-segunda-chamada">${stats.segundaChamada}</span></td>
          <td><span class="badge badge-justificada">${stats.justificadas}</span></td>
          <td><span class="badge badge-sem-fardamento">${stats.semFardamento}</span></td>
        `;
        tbody.appendChild(tr);
      });
    }

    const segundaChamadaSituacoes = {
      pendente: { label: 'Pendente', badgeClass: 'badge-segunda-pendente' },
      realizada: { label: 'Realizada', badgeClass: 'badge-segunda-realizada' },
      zero: { label: 'Zero', badgeClass: 'badge-segunda-zero' }
    };

    function obterSituacaoSegundaChamada(registro){
      if(!registro || registro.status !== 'segunda-chamada') return '';
      return registro.segundaChamadaSituacao || 'pendente';
    }

    function obterRegistrosSegundaChamada(){
      const filtroAluno = (document.getElementById('filtroAlunoSegundaChamada')?.value || '').trim().toUpperCase();

      return registrosFrequencia
        .filter(reg => reg.status === 'segunda-chamada')
        .filter(reg => !filtroAluno || reg.aluno.toUpperCase() === filtroAluno)
        .map(reg => {
          const alunoInfo = alunosDB.find(aluno => aluno.nome === reg.aluno);
          const situacao = obterSituacaoSegundaChamada(reg);
          return {
            ...reg,
            serie: alunoInfo ? alunoInfo.serie : 'Sem série',
            turma: alunoInfo ? alunoInfo.turma : '',
            situacao,
            arquivada: !!reg.segundaChamadaArquivada,
            boletim: obterEventosBoletimNaData(reg.data)
          };
        })
        .sort((a, b) => {
          const diffArquivada = Number(a.arquivada) - Number(b.arquivada);
          if(diffArquivada !== 0) return diffArquivada;
          const ordemSituacao = { pendente: 0, realizada: 1, zero: 2 };
          const diffSituacao = (ordemSituacao[a.situacao] ?? 9) - (ordemSituacao[b.situacao] ?? 9);
          if(diffSituacao !== 0) return diffSituacao;
          const diffData = new Date(b.data) - new Date(a.data);
          if(diffData !== 0) return diffData;
          return a.aluno.localeCompare(b.aluno, 'pt-BR');
        });
    }

    function obterResumoSegundaChamadaPorDia(){
      const agrupado = {};

      obterRegistrosSegundaChamada().filter(reg => !reg.arquivada).forEach(reg => {
        if(!agrupado[reg.data]){
          agrupado[reg.data] = {
            data: reg.data,
            total: 0,
            pendentes: 0,
            realizadas: 0,
            zero: 0,
            alunos: []
          };
        }

        agrupado[reg.data].total++;
        if(reg.situacao === 'pendente') agrupado[reg.data].pendentes++;
        if(reg.situacao === 'realizada') agrupado[reg.data].realizadas++;
        if(reg.situacao === 'zero') agrupado[reg.data].zero++;
        agrupado[reg.data].alunos.push(reg);
      });

      return Object.values(agrupado).sort((a,b) => new Date(b.data) - new Date(a.data));
    }

    function eventoBoletimEhRelevante(texto = ''){
      return /(avali|prova|simulad|recupera|2ª chamada|segunda chamada|teste|trabalho|semin[aá]rio)/i.test(String(texto));
    }

    function obterEventosBoletimNaData(dateKey){
      const boletimDb = obterBancoBoletim();
      if(!boletimDb || !Array.isArray(boletimDb.calendars)) return [];

      const calendarios = boletimDb.calendars;
      const ativo = calendarios.find(calendar => calendar.id === boletimDb.activeCalendarId);
      const listaBase = ativo ? [ativo, ...calendarios.filter(calendar => calendar.id !== ativo.id)] : calendarios;

      const eventos = [];
      listaBase.forEach(calendar => {
        const dayEvents = Array.isArray(calendar?.events?.[dateKey]) ? calendar.events[dateKey] : [];
        dayEvents.forEach(eventObj => {
          const texto = typeof eventObj?.text === 'string' ? eventObj.text.trim() : '';
          if(!texto) return;
          if(eventObj?.color === 'holiday') return;
          if(eventObj?.color === 'non-school-day') return;
          if(/dia n[aã]o letivo/i.test(texto)) return;
          eventos.push(texto);
        });
      });

      const unicos = [...new Set(eventos)];
      const relevantes = unicos.filter(eventoBoletimEhRelevante);
      return relevantes.length ? relevantes : unicos;
    }

    function atualizarResumoSegundaChamada(){
      const registros = obterRegistrosSegundaChamada();
      const ativos = registros.filter(reg => !reg.arquivada);
      const pendentes = ativos.filter(reg => reg.situacao === 'pendente').length;
      const realizadas = ativos.filter(reg => reg.situacao === 'realizada').length;
      const zero = ativos.filter(reg => reg.situacao === 'zero').length;
      const arquivadas = registros.filter(reg => reg.arquivada).length;

      const elPendentes = document.getElementById('segundaChamadaPendentes');
      const elRealizadas = document.getElementById('segundaChamadaRealizadas');
      const elZero = document.getElementById('segundaChamadaZero');
      const elArquivadas = document.getElementById('segundaChamadaArquivadas');
      if(elPendentes) elPendentes.textContent = pendentes;
      if(elRealizadas) elRealizadas.textContent = realizadas;
      if(elZero) elZero.textContent = zero;
      if(elArquivadas) elArquivadas.textContent = arquivadas;
    }

    function renderTabelaSegundaChamadaPorDia(){
      const tbody = document.querySelector('#tabelaSegundaChamadaPorDia tbody');
      if(!tbody) return;

      const registros = obterRegistrosSegundaChamada();
      const ativos = registros.filter(reg => !reg.arquivada);
      const arquivados = registros.filter(reg => reg.arquivada);
      const modoVisualizacao = document.getElementById('filtroVisualizacaoSegundaChamada')?.value || 'ativas';
      tbody.innerHTML = '';
      atualizarResumoSegundaChamada();

      if(!registros.length){
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center" class="muted">Nenhum registro de 2ª chamada ainda</td></tr>';
        return;
      }

      const renderGrupoRegistros = (titulo, lista, arquivada = false) => {
        if(!lista.length) return;

        const trSecao = document.createElement('tr');
        trSecao.innerHTML = `<td colspan="6" style="background:var(--card2);font-weight:700;color:var(--ink);">${titulo}</td>`;
        tbody.appendChild(trSecao);

        const gruposPorSerie = {};
        lista.forEach(reg => {
          if(!gruposPorSerie[reg.serie]) gruposPorSerie[reg.serie] = [];
          gruposPorSerie[reg.serie].push(reg);
        });

        Object.keys(gruposPorSerie).sort().forEach(serie => {
          const trSerie = document.createElement('tr');
          trSerie.innerHTML = `<td colspan="6" style="background:var(--surface);font-weight:700;color:var(--ink);">${serie}</td>`;
          tbody.appendChild(trSerie);

          gruposPorSerie[serie].forEach(reg => {
            const configSituacao = segundaChamadaSituacoes[reg.situacao] || segundaChamadaSituacoes.pendente;
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${fmtData(reg.data)}</td>
              <td>${reg.aluno}${reg.turma ? ` (${reg.turma})` : ''}</td>
              <td>${reg.serie}</td>
              <td><span class="badge ${configSituacao.badgeClass}">${configSituacao.label}</span></td>
              <td>${reg.boletim.length ? reg.boletim.join('; ') : '—'}</td>
              <td>
                <div class="segunda-chamada-actions">
                  <button class="${reg.situacao === 'realizada' ? 'btn-success' : 'btn-ghost'} btn-small" onclick="atualizarBaixaSegundaChamada(${reg.id}, 'realizada')">Fez</button>
                  <button class="${reg.situacao === 'zero' ? 'btn-danger' : 'btn-ghost'} btn-small" onclick="atualizarBaixaSegundaChamada(${reg.id}, 'zero')">Zero</button>
                  <button class="${reg.situacao === 'pendente' ? 'btn-warning' : 'btn-ghost'} btn-small" onclick="atualizarBaixaSegundaChamada(${reg.id}, 'pendente')">Pendente</button>
                  ${arquivada
                    ? `<button class="btn-ghost btn-small" onclick="alternarArquivoSegundaChamada(${reg.id}, false)">Desarquivar</button>`
                    : `<button class="btn-ghost btn-small" onclick="alternarArquivoSegundaChamada(${reg.id}, true)" ${reg.situacao === 'pendente' ? 'disabled title="Só é possível arquivar quem já fez ou recebeu zero"' : ''}>Arquivar</button>`}
                </div>
              </td>
            `;
            tbody.appendChild(tr);
          });
        });
      };

      if(modoVisualizacao === 'ativas' || modoVisualizacao === 'todas') {
        renderGrupoRegistros('Ativas', ativos, false);
      }
      if(modoVisualizacao === 'arquivadas' || modoVisualizacao === 'todas') {
        renderGrupoRegistros('Arquivadas', arquivados, true);
      }

      if(!tbody.innerHTML.trim()){
        const mensagem = modoVisualizacao === 'arquivadas'
          ? 'Nenhum registro arquivado encontrado.'
          : modoVisualizacao === 'ativas'
            ? 'Nenhum registro ativo encontrado.'
            : 'Nenhum registro encontrado.';
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center" class="muted">${mensagem}</td></tr>`;
      }
    }

    window.atualizarBaixaSegundaChamada = function(id, situacao){
      const registro = registrosFrequencia.find(reg => reg.id === id && reg.status === 'segunda-chamada');
      if(!registro) return;

      registro.segundaChamadaSituacao = situacao;
      registro.segundaChamadaAtualizadaEm = new Date().toISOString();
      sincronizarBancoPrincipal('Atualização de baixa da 2ª chamada');
      renderTabelaSegundaChamadaPorDia();
      renderRelatorioSegundaChamada();
    };

    window.alternarArquivoSegundaChamada = function(id, arquivar){
      const registro = registrosFrequencia.find(reg => reg.id === id && reg.status === 'segunda-chamada');
      if(!registro) return;
      if(arquivar && obterSituacaoSegundaChamada(registro) === 'pendente'){
        alert('Só é possível arquivar alunos que já fizeram a 2ª chamada ou receberam zero.');
        return;
      }

      registro.segundaChamadaArquivada = arquivar;
      registro.segundaChamadaArquivadaEm = arquivar ? new Date().toISOString() : '';
      sincronizarBancoPrincipal(arquivar ? 'Arquivamento de 2ª chamada' : 'Desarquivamento de 2ª chamada');
      renderTabelaSegundaChamadaPorDia();
      renderRelatorioSegundaChamada();
    };

    function arquivarEncerradosSegundaChamada(){
      let totalArquivados = 0;
      registrosFrequencia.forEach(registro => {
        if(registro.status !== 'segunda-chamada') return;
        const situacao = obterSituacaoSegundaChamada(registro);
        if((situacao === 'realizada' || situacao === 'zero') && !registro.segundaChamadaArquivada){
          registro.segundaChamadaArquivada = true;
          registro.segundaChamadaArquivadaEm = new Date().toISOString();
          totalArquivados++;
        }
      });

      if(!totalArquivados){
        alert('Nenhum registro encerrado disponível para arquivar.');
        return;
      }

      sincronizarBancoPrincipal('Arquivamento em lote de 2ª chamada');
      renderTabelaSegundaChamadaPorDia();
      renderRelatorioSegundaChamada();
      alert(`✅ ${totalArquivados} registro(s) arquivado(s).`);
    }

    function obterDadosRelatorioSegundaChamada(){
      const registros = obterRegistrosSegundaChamada().filter(reg => !reg.arquivada && reg.situacao === 'pendente');
      const agrupadoPorSituacao = {
        pendente: {},
        realizada: {},
        zero: {}
      };

      registros.forEach(reg => {
        if(!agrupadoPorSituacao[reg.situacao][reg.serie]) agrupadoPorSituacao[reg.situacao][reg.serie] = {};
        if(!agrupadoPorSituacao[reg.situacao][reg.serie][reg.data]){
          agrupadoPorSituacao[reg.situacao][reg.serie][reg.data] = {
            data: reg.data,
            boletim: reg.boletim,
            alunos: []
          };
        }

        agrupadoPorSituacao[reg.situacao][reg.serie][reg.data].alunos.push({
          nome: reg.aluno,
          turma: reg.turma,
          justificativa: reg.justificativa || ''
        });
      });

      return Object.keys(agrupadoPorSituacao).map(situacao => ({
        situacao,
        label: segundaChamadaSituacoes[situacao].label,
        badgeClass: segundaChamadaSituacoes[situacao].badgeClass,
        series: Object.keys(agrupadoPorSituacao[situacao]).sort().map(serie => ({
          serie,
          dias: Object.values(agrupadoPorSituacao[situacao][serie]).sort((a, b) => new Date(a.data) - new Date(b.data))
        }))
      }));
    }

    function renderRelatorioSegundaChamada(){
      const preview = document.getElementById('relatorioSegundaChamadaPreview');
      if(!preview) return;

      const gruposPorSituacao = obterDadosRelatorioSegundaChamada();
      const totalRegistros = gruposPorSituacao.reduce((acc, grupo) => acc + grupo.series.reduce((sumSeries, serie) => sumSeries + serie.dias.reduce((sumDias, dia) => sumDias + dia.alunos.length, 0), 0), 0);
      const totalPendentes = gruposPorSituacao.find(grupo => grupo.situacao === 'pendente')?.series.reduce((sumSeries, serie) => sumSeries + serie.dias.reduce((sumDias, dia) => sumDias + dia.alunos.length, 0), 0) || 0;
      const totalRealizadas = gruposPorSituacao.find(grupo => grupo.situacao === 'realizada')?.series.reduce((sumSeries, serie) => sumSeries + serie.dias.reduce((sumDias, dia) => sumDias + dia.alunos.length, 0), 0) || 0;
      const totalZero = gruposPorSituacao.find(grupo => grupo.situacao === 'zero')?.series.reduce((sumSeries, serie) => sumSeries + serie.dias.reduce((sumDias, dia) => sumDias + dia.alunos.length, 0), 0) || 0;

      if(!totalRegistros){
        preview.innerHTML = `
          <header>
            <div>
              <h3>Relatório de 2ª Chamada</h3>
              <small>ENSPS 2026</small>
            </div>
          </header>
          <h2>Relatório por Série e Dia</h2>
          <p class="kv">Nenhum registro de 2ª chamada encontrado.</p>
        `;
        return;
      }

      const blocos = gruposPorSituacao.map(grupo => {
        const totalGrupo = grupo.series.reduce((sumSeries, serie) => sumSeries + serie.dias.reduce((sumDias, dia) => sumDias + dia.alunos.length, 0), 0);
        if(!totalGrupo) return '';

        return `
          <div style="margin-top:18px;">
            <div class="section-title">${grupo.label}</div>
            <p class="kv"><strong>Total nesta situação:</strong> ${totalGrupo}</p>
            ${grupo.series.map(serie => `
              <div style="margin-top:14px;">
                <div class="section-title">${serie.serie}</div>
                ${serie.dias.map(dia => `
                  <div style="margin-top:10px;padding:10px 12px;border:1px solid #d1d5db;border-radius:10px;">
                    <div style="font-weight:700;font-size:.92rem;margin-bottom:6px;">${fmtData(dia.data)} · ${dia.alunos.length} aluno(s)</div>
                    <div style="font-size:.84rem;line-height:1.6;">
                      ${dia.alunos.map(aluno => `${aluno.nome}${aluno.turma ? ` (${aluno.turma})` : ''}${aluno.justificativa ? ` - ${aluno.justificativa}` : ''}`).join('<br>')}
                    </div>
                    <div style="margin-top:8px;font-size:.8rem;color:#374151;">
                      <strong>Boletim:</strong> ${dia.boletim.length ? dia.boletim.join('; ') : '—'}
                    </div>
                  </div>
                `).join('')}
              </div>
            `).join('')}
          </div>
        `;
      }).join('');

      preview.innerHTML = `
        <header>
          <div>
            <h3>Relatório de 2ª Chamada</h3>
            <small>Escola Nossa Senhora do Perpétuo Socorro</small>
          </div>
        </header>
        <h2>Relatório por Série e Dia</h2>
        <p class="kv"><strong>Data de emissão:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
        <p class="kv"><strong>Total de registros:</strong> ${totalRegistros}</p>
        <p class="kv"><strong>Pendentes:</strong> ${totalPendentes}</p>
        <p class="kv"><strong>Realizadas:</strong> ${totalRealizadas}</p>
        <p class="kv"><strong>Zero por não fazer:</strong> ${totalZero}</p>
        ${blocos}
      `;
    }

    function imprimirRelatorioSegundaChamada(){
      renderRelatorioSegundaChamada();
      const preview = document.getElementById('relatorioSegundaChamadaPreview');
      if(!preview) return;

      const win = window.open('', '_blank', 'width=900,height=1200');
      if(!win){
        alert('Não foi possível abrir a janela de impressão.');
        return;
      }

      win.document.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Relatório de 2ª Chamada</title>
  <style>
    body { font-family: Arial, sans-serif; background:#fff; color:#000; margin:0; padding:24px; }
    .doc { max-width: 760px; margin: 0 auto; }
    header { display:flex; align-items:center; gap:14px; padding-bottom:10px; border-bottom:2px solid #000; }
    h2 { font-size:1.2rem; text-align:center; margin:12px 0 14px; }
    h3 { margin:0; font-size:1.1rem; text-transform:uppercase; }
    small { display:block; color:#333; }
    .kv { margin:8px 0; line-height:1.6; font-size:.9rem; }
    .kv strong { display:inline-block; min-width:160px; }
    .section-title { margin:12px 0 4px; font-weight:700; text-transform:uppercase; font-size:.85rem; }
    @page { size:A4 portrait; margin:10mm; }
  </style>
</head>
<body><div class="doc">${preview.innerHTML}</div></body>
</html>`);
      win.document.close();
      win.onload = () => {
        win.focus();
        win.print();
      };
    }

    document.getElementById('btnExportarDia').addEventListener('click', function(){
      const data = document.getElementById('dataFreq').value;
      const serie = document.getElementById('filtroSerie').value;

      if(!data){
        alert('Selecione uma data para exportar.');
        return;
      }

      const registrosDia = registrosFrequencia.filter(r => r.data === data);

      let csv = 'Aluno,Série,Data,Status\n';
      registrosDia.forEach(r => {
        const aluno = alunosDB.find(a => a.nome === r.aluno);
        if(!serie || (aluno && aluno.serie === serie)){
          csv += `"${String(r.aluno).replace(/"/g, '""')}","${aluno ? String(aluno.serie).replace(/"/g, '""') : ''}","${r.data}","${r.status}"\n`;
        }
      });

      baixarArquivo(csv, `frequencia_${data}.csv`, 'text/csv');
    });

    function parseCSVFrequenciaDia(texto){
      const linhas = [];
      let campo = '';
      let linha = [];
      let entreAspas = false;

      for(let i = 0; i < texto.length; i++){
        const char = texto[i];
        const prox = texto[i + 1];

        if(char === '"'){
          if(entreAspas && prox === '"'){
            campo += '"';
            i++;
          } else {
            entreAspas = !entreAspas;
          }
        } else if(char === ',' && !entreAspas){
          linha.push(campo);
          campo = '';
        } else if((char === '\n' || char === '\r') && !entreAspas){
          if(char === '\r' && prox === '\n') i++;
          linha.push(campo);
          if(linha.some(valor => String(valor).trim() !== '')) linhas.push(linha);
          linha = [];
          campo = '';
        } else {
          campo += char;
        }
      }

      if(campo || linha.length){
        linha.push(campo);
        if(linha.some(valor => String(valor).trim() !== '')) linhas.push(linha);
      }

      return linhas;
    }

    function importarFrequenciaDiaCSV(texto){
      const linhas = parseCSVFrequenciaDia(texto);
      if(linhas.length < 2){
        alert('Arquivo vazio ou sem registros de frequência.');
        return;
      }

      const cabecalho = linhas[0].map(col => normalizarTextoBusca(col));
      const idxAluno = cabecalho.indexOf('aluno');
      const idxData = cabecalho.indexOf('data');
      const idxStatus = cabecalho.indexOf('status');

      if(idxAluno === -1 || idxData === -1 || idxStatus === -1){
        alert('CSV inválido. Use o arquivo gerado em “Exportar Dia”, com as colunas Aluno, Série, Data e Status.');
        return;
      }

      const statusValidos = ['presente', 'falta', 'segunda-chamada', 'justificada', 'sem-fardamento'];
      const registrosImportados = [];

      linhas.slice(1).forEach(linha => {
        const aluno = String(linha[idxAluno] || '').trim();
        const data = String(linha[idxData] || '').trim();
        const status = String(linha[idxStatus] || '').trim();
        if(!aluno || !data || !statusValidos.includes(status)) return;

        const statusAjustado = obterStatusComRegraProva(aluno, status);
        registrosImportados.push({
          id: Date.now() + registrosImportados.length,
          aluno,
          data,
          status: statusAjustado,
          justificativa: '',
          uniformeDetalhes: null,
          segundaChamadaSituacao: statusAjustado === 'segunda-chamada' ? 'pendente' : undefined,
          segundaChamadaOrigem: statusAjustado === 'segunda-chamada' ? 'prova' : undefined
        });
      });

      if(!registrosImportados.length){
        alert('Nenhum registro válido foi encontrado no arquivo.');
        return;
      }

      const datasImportadas = [...new Set(registrosImportados.map(r => r.data))];
      const dataSelecionada = document.getElementById('dataFreq').value;
      if(datasImportadas.length > 1 && !confirm(`O arquivo contém ${datasImportadas.length} datas. Deseja importar todas e substituir os registros dessas datas?`)){
        return;
      }
      if(dataSelecionada && datasImportadas.length === 1 && dataSelecionada !== datasImportadas[0]){
        if(!confirm(`A data selecionada (${fmtData(dataSelecionada)}) é diferente da data do arquivo (${fmtData(datasImportadas[0])}). Deseja importar mesmo assim?`)){
          return;
        }
      }

      registrosFrequencia = registrosFrequencia.filter(r => !datasImportadas.includes(r.data));
      registrosFrequencia.push(...registrosImportados);

      document.getElementById('dataFreq').value = datasImportadas[0];
      sincronizarBancoPrincipal('Importação de frequência diária');
      renderTabelaFrequencia();
      atualizarFaltasAcumuladas();
      renderTabelaSegundaChamadaPorDia();
      renderRelatorioSegundaChamada();
      atualizarDashboardGestor();

      alert(`✅ Importação concluída: ${registrosImportados.length} registro(s) em ${datasImportadas.length} dia(s).`);
    }

    function separarCSVRelatorioFaltosos(texto){
      const linhas = parseCSVFrequenciaDia(texto);
      if(!linhas.length) return [];
      const cabecalho = linhas[0].map(col => normalizarTextoBusca(col));
      const idxMatricula = cabecalho.findIndex(col => ['matricula','matrícula'].includes(col));
      const idxAluno = cabecalho.findIndex(col => ['aluno','nome','aluno(a)','nome do aluno'].includes(col));
      const idxData = cabecalho.findIndex(col => ['data','dia'].includes(col));
      if(idxMatricula === -1 && idxAluno === -1) return [];

      return linhas.slice(1).map(linha => ({
        matricula: idxMatricula >= 0 ? String(linha[idxMatricula] || '').replace(/\D/g, '').slice(0, 7) : '',
        nomeRelatorio: idxAluno >= 0 ? String(linha[idxAluno] || '').trim() : '',
        data: idxData >= 0 ? normalizarDataRelatorioFaltosos(linha[idxData]) : ''
      })).filter(item => item.matricula || item.nomeRelatorio);
    }

    function normalizarDataRelatorioFaltosos(valor){
      const texto = String(valor || '').trim();
      const br = texto.match(/(\d{2})\/(\d{2})\/(\d{4})/);
      if(br) return `${br[3]}-${br[2]}-${br[1]}`;
      const iso = texto.match(/(\d{4})-(\d{2})-(\d{2})/);
      if(iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
      return '';
    }

    function extrairDataRelatorioFaltosos(texto){
      const match = String(texto || '').match(/Ausentes\s+em:\s*(\d{2})\/(\d{2})\/(\d{4})/i)
        || String(texto || '').match(/Rela[çc][ãa]o\s+de\s+Ausentes\s+em:\s*(\d{2})\/(\d{2})\/(\d{4})/i);
      return match ? `${match[3]}-${match[2]}-${match[1]}` : '';
    }

    function limparNomeAlunoRelatorioFaltosos(nome){
      return String(nome || '')
        .replace(/\s+/g, ' ')
        .replace(/\b(?:Página|RAC01|ESCOLA|Emitida|Total)\b.*$/i, '')
        .trim();
    }

    function adicionarItemRelatorioFaltosos(lista, vistos, codigo, nomeRelatorio, matricula, data){
      codigo = String(codigo || '').trim();
      nomeRelatorio = limparNomeAlunoRelatorioFaltosos(nomeRelatorio);
      matricula = String(matricula || '').trim();
      if(!codigo || !nomeRelatorio || !/^\d{7}$/.test(matricula)) return;

      const idx = lista.findIndex(item => item.codigo === codigo);
      if(idx >= 0){
        const atual = lista[idx];
        // O código do relatório é único. Se já existe um item para o mesmo código,
        // mantemos o primeiro registro confiável para evitar que uma segunda leitura
        // do PDF troque a matrícula correta por telefone ou junte nome do responsável.
        const mesmoAluno = atual.matricula === matricula;
        const nomeNovoMaisLimpo = mesmoAluno && atual.nomeRelatorio.length > 45 && nomeRelatorio.length < atual.nomeRelatorio.length;
        if(nomeNovoMaisLimpo){
          lista[idx] = { codigo, nomeRelatorio, matricula, data: data || atual.data || '' };
        }
        return;
      }

      const chave = `${codigo}|${data || ''}`;
      if(vistos.has(chave)) return;
      vistos.add(chave);
      lista.push({ codigo, nomeRelatorio, matricula, data: data || '' });
    }

    function separarTextoRelatorioFaltosos(texto){
      const bruto = String(texto || '');
      const data = extrairDataRelatorioFaltosos(bruto);
      const itens = [];
      const vistos = new Set();

      const codigoRe = /\d{5}[A-Z]\d{5}/g;
      const marcas = [];
      let cm;
      while((cm = codigoRe.exec(bruto)) !== null){
        marcas.push({ codigo: cm[0], index: cm.index });
      }

      for(let i = 0; i < marcas.length; i++){
        const atual = marcas[i];
        const prox = marcas[i + 1] ? marcas[i + 1].index : bruto.length;
        let bloco = bruto.slice(atual.index + atual.codigo.length, prox);
        bloco = bloco.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
        const mat = bloco.match(/(\d{7})/);
        if(!mat) continue;
        const nomeRelatorio = bloco.slice(0, mat.index).trim();
        adicionarItemRelatorioFaltosos(itens, vistos, atual.codigo, nomeRelatorio, mat[1], data);
      }

      const compacto = bruto.replace(/\s+/g, ' ').trim();
      const reGlobal = /(\d{5}[A-Z]\d{5})\s*([^\d]+?)\s*(\d{7})/g;
      let g;
      while((g = reGlobal.exec(compacto)) !== null){
        const nomePossivel = g[2].trim();
        if(/\d{5}[A-Z]\d{5}/.test(nomePossivel)) continue;
        adicionarItemRelatorioFaltosos(itens, vistos, g[1], nomePossivel, g[3], data);
      }

      itens.sort((a,b) => String(a.codigo || '').localeCompare(String(b.codigo || ''), 'pt-BR'));
      return itens;
    }

    async function extrairTextoPDFRelatorioFaltosos(arquivo){
      if(!window.pdfjsLib){
        throw new Error('A biblioteca de leitura de PDF não carregou. Verifique a internet ou importe o TXT/CSV.');
      }
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const buffer = await arquivo.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      const todasLinhas = [];
      const linhasEstruturadas = [];
      const fluxoTokens = [];

      function dividirTokenPDF(token){
        const texto = String(token.str || '').trim();
        if(!texto) return [];
        const partes = texto.split(/\s+/).filter(Boolean);
        if(partes.length <= 1) return [{ ...token, str: texto }];
        const largura = Number(token.width || 0);
        let cursorX = token.x;
        const totalLetras = partes.reduce((s, p) => s + p.length, 0) || partes.length;
        return partes.map(parte => {
          const proporcao = largura ? (parte.length / totalLetras) : 0;
          const item = { ...token, x: cursorX, str: parte };
          cursorX += largura ? (largura * proporcao) + 3 : 6;
          return item;
        });
      }

      for(let p = 1; p <= pdf.numPages; p++){
        const page = await pdf.getPage(p);
        const content = await page.getTextContent();
        const tokens = content.items
          .map(item => ({
            x: item.transform[4],
            y: item.transform[5],
            str: String(item.str || '').trim(),
            width: Number(item.width || 0)
          }))
          .filter(item => item.str)
          .flatMap(dividirTokenPDF);

        tokens.sort((a,b) => (b.y - a.y) || (a.x - b.x));
        const grupos = [];
        for(const token of tokens){
          let grupo = grupos.find(g => Math.abs(g.y - token.y) <= 2.8);
          if(!grupo){ grupo = { y: token.y, items: [] }; grupos.push(grupo); }
          grupo.items.push(token);
          fluxoTokens.push(token.str);
        }

        const linhasPagina = grupos
          .sort((a,b) => b.y - a.y)
          .map(g => {
            const itens = g.items.sort((a,b) => a.x - b.x);
            const linha = itens.map(i => i.str).join(' ').replace(/\s+/g, ' ').trim();

            const codigoItem = itens.find(i => /^\d{5}[A-Z]\d{5}$/.test(i.str));
            if(codigoItem){
              const codigo = codigoItem.str;
              const matriculaItem = itens.find(i => i.x >= 315 && i.x <= 390 && /^\d{7}$/.test(i.str));
              const nomeItens = itens
                .filter(i => i.x > codigoItem.x + 35 && i.x >= 85 && i.x < 330)
                .filter(i => !/^\d+$/.test(i.str))
                .map(i => i.str);
              if(matriculaItem && nomeItens.length){
                linhasEstruturadas.push(`${codigo} ${nomeItens.join(' ')} ${matriculaItem.str}`);
              }
            }

            return linha;
          })
          .filter(Boolean);
        todasLinhas.push(...linhasPagina);
      }

      // As linhas estruturadas são colocadas primeiro porque usam as colunas reais do PDF
      // (código, nome e matrícula). Isso evita confundir telefone ou responsável com aluno.
      return linhasEstruturadas.join('\n')
        + '\n\n--- LINHAS DO PDF ---\n'
        + todasLinhas.join('\n')
        + '\n\n--- FLUXO CONTINUO ---\n'
        + fluxoTokens.join(' ');
    }

    function localizarAlunoRelatorioFaltosos(item){
      const matricula = String(item.matricula || '').replace(/\D/g, '').slice(0, 7);
      if(matricula){
        const porMatricula = alunosDB.find(a => String(a.matricula || '').trim() === matricula);
        if(porMatricula) return porMatricula;
      }

      const nomeRelatorio = normalizarTextoBusca(item.nomeRelatorio || '');
      if(!nomeRelatorio) return null;

      return alunosDB.find(a => normalizarTextoBusca(a.nome) === nomeRelatorio)
        || alunosDB.find(a => {
          const nomeAluno = normalizarTextoBusca(a.nome);
          return nomeAluno.startsWith(nomeRelatorio) || nomeRelatorio.startsWith(nomeAluno);
        })
        || null;
    }

    let ultimoRelatorioImportacaoFaltosos = null;
    const ENSPS_ULTIMA_IMPORTACAO_FALTOSOS_KEY = 'ensps_ultima_importacao_faltosos_v1';

    function obterUltimaImportacaoFaltosos(){
      try {
        const bruto = localStorage.getItem(ENSPS_ULTIMA_IMPORTACAO_FALTOSOS_KEY);
        return bruto ? JSON.parse(bruto) : null;
      } catch { return null; }
    }
    function salvarUltimaImportacaoFaltosos(payload){
      try { localStorage.setItem(ENSPS_ULTIMA_IMPORTACAO_FALTOSOS_KEY, JSON.stringify(payload)); }
      catch (erro) { console.warn('ENSPS: não foi possível salvar o histórico para desfazer importação.', erro); }
      atualizarCardDesfazerImportacaoFaltosos();
    }
    function limparUltimaImportacaoFaltosos(){
      localStorage.removeItem(ENSPS_ULTIMA_IMPORTACAO_FALTOSOS_KEY);
      atualizarCardDesfazerImportacaoFaltosos();
    }
    function atualizarCardDesfazerImportacaoFaltosos(){
      const card = document.getElementById('desfazerImportacaoCard');
      const resumo = document.getElementById('desfazerImportacaoResumo');
      const btnTopo = document.getElementById('btnDesfazerUltimaImportacao');
      const payload = obterUltimaImportacaoFaltosos();
      const existe = !!(payload && payload.dataArquivo && Array.isArray(payload.registrosAntes));
      if(btnTopo){ btnTopo.disabled = !existe; btnTopo.title = existe ? 'Desfaz a última importação de faltosos registrada neste navegador' : 'Nenhuma importação de faltosos disponível para desfazer'; }
      if(!card || !resumo) return;
      if(!existe){ card.style.display = 'none'; resumo.textContent = 'Nenhuma importação disponível para desfazer.'; return; }
      card.style.display = 'flex';
      const quando = payload.criadoEm ? new Date(payload.criadoEm).toLocaleString('pt-BR') : 'data não registrada';
      resumo.textContent = `Disponível: ${payload.nomeArquivo || 'relatório importado'} em ${fmtData(payload.dataArquivo)} · ${payload.importados || 0} lançamento(s) criados · ${payload.registrosAntes.length} registro(s) anteriores preservados · ${quando}.`;
    }
    function registrarSnapshotDesfazerImportacaoFaltosos(dataArquivo, nomeArquivo, relatorioImportacao, registrosAntes, registrosDepois){
      salvarUltimaImportacaoFaltosos({ tipo:'importacao-faltosos', versao:1, criadoEm:new Date().toISOString(), dataArquivo, nomeArquivo:nomeArquivo || '', relatorio:relatorioImportacao || null, registrosAntes:clonarJSONSeguro(registrosAntes || []), registrosDepois:clonarJSONSeguro(registrosDepois || []), importados:Array.isArray(registrosDepois) ? registrosDepois.length : 0 });
    }
    function desfazerUltimaImportacaoFaltosos(){
      const payload = obterUltimaImportacaoFaltosos();
      if(!payload || !payload.dataArquivo || !Array.isArray(payload.registrosAntes)){ alert('Não há importação de faltosos disponível para desfazer neste navegador.'); atualizarCardDesfazerImportacaoFaltosos(); return; }
      const data = payload.dataArquivo;
      const atuaisDaData = registrosFrequencia.filter(r => r.data === data).length;
      const confirmar = confirm(`Desfazer a última importação de faltosos do dia ${fmtData(data)}?\n\nRegistros atuais nesta data: ${atuaisDaData}\nRegistros que serão restaurados: ${payload.registrosAntes.length}\n\nEssa ação restaura a frequência desse dia exatamente como estava antes da importação.`);
      if(!confirmar) return;
      const backup = montarBackupCompleto('antes_de_desfazer_importacao_faltosos');
      baixarArquivo(JSON.stringify(backup, null, 2), nomeArquivoBackup('backup_antes_desfazer_importacao'), 'application/json');
      registrosFrequencia = registrosFrequencia.filter(r => r.data !== data);
      registrosFrequencia.push(...clonarJSONSeguro(payload.registrosAntes));
      sincronizarBancoPrincipal(`Desfazer importação de faltosos - ${data}`);
      document.getElementById('dataFreq').value = data;
      renderTabelaFrequencia(); atualizarFaltasAcumuladas(); renderTabelaSegundaChamadaPorDia(); renderRelatorioSegundaChamada(); atualizarDashboardGestor();
      limparUltimaImportacaoFaltosos();
      alert(`✅ Importação desfeita. A frequência de ${fmtData(data)} foi restaurada.`);
    }


    function escaparHTMLRelatorioFaltosos(valor){
      return String(valor ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function obterSegmentoRelatorioFaltosos(aluno){
      if(!aluno) return '';
      return String(aluno.serie || '').includes('EM') ? 'Ensino Médio' : 'Ensino Fundamental';
    }

    function formatarItemRelatorioFaltosos(item){
      const partes = [];
      if(item.codigo) partes.push(item.codigo);
      if(item.nomeRelatorio) partes.push(item.nomeRelatorio);
      if(item.matricula) partes.push('matrícula ' + item.matricula);
      return partes.join(' · ') || 'Aluno sem identificação';
    }

    function statusLegivelRelatorioFaltosos(status){
      if(status === 'segunda-chamada') return '2ª Chamada';
      if(status === 'falta') return 'F';
      if(status === 'presente') return 'P';
      return status || '';
    }

    function gerarNomeArquivoRelatorioImportacao(extensao){
      const rel = ultimoRelatorioImportacaoFaltosos;
      const data = rel?.dataArquivo || document.getElementById('dataFreq')?.value || new Date().toISOString().slice(0,10);
      return `relatorio_importacao_faltosos_${data}.${extensao}`;
    }

    function relatorioImportacaoFaltososParaCSV(rel){
      if(!rel) return '';
      const linhas = [];
      const csv = valor => `"${String(valor ?? '').replace(/"/g, '""')}"`;
      linhas.push(['tipo','codigo_relatorio','nome_relatorio','matricula_relatorio','nome_sistema','matricula_sistema','serie','segmento','status_lancado','observacao'].map(csv).join(','));
      rel.encontrados.forEach(item => {
        linhas.push([
          'encontrado', item.codigo, item.nomeRelatorio, item.matriculaRelatorio,
          item.nomeSistema, item.matriculaSistema, item.serie, item.segmento,
          statusLegivelRelatorioFaltosos(item.status), item.observacao || ''
        ].map(csv).join(','));
      });
      rel.naoEncontrados.forEach(item => {
        linhas.push([
          'nao_encontrado', item.codigo, item.nomeRelatorio, item.matricula, '', '', '', '', '', item.motivo || 'Não localizado no cadastro interno'
        ].map(csv).join(','));
      });
      rel.duplicadosIgnorados.forEach(item => {
        linhas.push([
          'duplicado_ignorado', item.codigo, item.nomeRelatorio, item.matricula, '', '', '', '', '', 'Registro duplicado no relatório'
        ].map(csv).join(','));
      });
      return linhas.join('\n');
    }

    function relatorioImportacaoFaltososParaTXT(rel){
      if(!rel) return '';
      const linhas = [];
      linhas.push('RELATÓRIO DA IMPORTAÇÃO DE FALTOSOS');
      linhas.push('Arquivo: ' + (rel.nomeArquivo || 'sem nome'));
      linhas.push('Data do relatório: ' + fmtData(rel.dataArquivo));
      linhas.push('Gerado em: ' + new Date(rel.geradoEm).toLocaleString('pt-BR'));
      linhas.push('');
      linhas.push(`Total lido no arquivo: ${rel.totalLidos}`);
      linhas.push(`Encontrados no sistema: ${rel.totalEncontrados}`);
      linhas.push(`Não encontrados: ${rel.totalNaoEncontrados}`);
      linhas.push(`Duplicados ignorados: ${rel.totalDuplicadosIgnorados}`);
      linhas.push(`Registros antigos substituídos na data: ${rel.registrosSubstituidos}`);
      linhas.push(`Lançados como F: ${rel.totalFaltas}`);
      linhas.push(`Lançados como 2ª Chamada: ${rel.totalSegundaChamada}`);
      linhas.push('');
      linhas.push('ENCONTRADOS');
      rel.encontrados.forEach((item, idx) => {
        linhas.push(`${idx+1}. ${item.nomeSistema} | Matrícula: ${item.matriculaSistema || item.matriculaRelatorio || '-'} | ${item.serie || '-'} | ${statusLegivelRelatorioFaltosos(item.status)}`);
      });
      if(rel.naoEncontrados.length){
        linhas.push('');
        linhas.push('NÃO ENCONTRADOS');
        rel.naoEncontrados.forEach((item, idx) => linhas.push(`${idx+1}. ${formatarItemRelatorioFaltosos(item)}`));
      }
      if(rel.duplicadosIgnorados.length){
        linhas.push('');
        linhas.push('DUPLICADOS IGNORADOS');
        rel.duplicadosIgnorados.forEach((item, idx) => linhas.push(`${idx+1}. ${formatarItemRelatorioFaltosos(item)}`));
      }
      return linhas.join('\n');
    }

    function renderRelatorioImportacaoFaltosos(rel){
      ultimoRelatorioImportacaoFaltosos = rel || ultimoRelatorioImportacaoFaltosos;
      rel = ultimoRelatorioImportacaoFaltosos;
      const card = document.getElementById('relatorioImportacaoFaltososCard');
      const subtitulo = document.getElementById('relatorioImportacaoFaltososSubtitulo');
      const resumo = document.getElementById('relatorioImportacaoFaltososResumo');
      const detalhes = document.getElementById('relatorioImportacaoFaltososDetalhes');
      if(!card || !resumo || !detalhes || !rel) return;

      card.style.display = 'block';
      if(subtitulo){
        subtitulo.textContent = `${rel.nomeArquivo || 'Arquivo importado'} · ${fmtData(rel.dataArquivo)} · ${new Date(rel.geradoEm).toLocaleString('pt-BR')}`;
      }

      const cards = [
        ['Lidos no arquivo', rel.totalLidos],
        ['Encontrados', rel.totalEncontrados],
        ['Não encontrados', rel.totalNaoEncontrados],
        ['Duplicados ignorados', rel.totalDuplicadosIgnorados],
        ['Como F', rel.totalFaltas],
        ['Como 2ª Chamada', rel.totalSegundaChamada],
        ['Substituídos da data', rel.registrosSubstituidos],
        ['Data importada', fmtData(rel.dataArquivo)]
      ];
      resumo.innerHTML = cards.map(([label, valor]) => `
        <div class="relatorio-importacao-metrica">
          <strong>${escaparHTMLRelatorioFaltosos(valor)}</strong>
          <span>${escaparHTMLRelatorioFaltosos(label)}</span>
        </div>
      `).join('');

      const naoEncontradosHtml = rel.naoEncontrados.length ? `
        <details class="relatorio-importacao-bloco" open>
          <summary>Não encontrados no cadastro (${rel.naoEncontrados.length})</summary>
          <div class="table-container relatorio-importacao-tabela-wrap">
            <table class="relatorio-importacao-tabela">
              <thead><tr><th>Código</th><th>Nome no relatório</th><th>Matrícula</th><th>Motivo</th></tr></thead>
              <tbody>
                ${rel.naoEncontrados.map(item => `
                  <tr>
                    <td>${escaparHTMLRelatorioFaltosos(item.codigo || '')}</td>
                    <td>${escaparHTMLRelatorioFaltosos(item.nomeRelatorio || '')}</td>
                    <td>${escaparHTMLRelatorioFaltosos(item.matricula || '')}</td>
                    <td>${escaparHTMLRelatorioFaltosos(item.motivo || 'Não localizado no cadastro interno')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </details>
      ` : `<div class="relatorio-importacao-ok">✅ Todos os alunos do relatório foram localizados no cadastro.</div>`;

      const encontradosHtml = `
        <details class="relatorio-importacao-bloco">
          <summary>Alunos lançados (${rel.encontrados.length})</summary>
          <div class="table-container relatorio-importacao-tabela-wrap">
            <table class="relatorio-importacao-tabela">
              <thead><tr><th>Aluno no sistema</th><th>Matrícula</th><th>Série</th><th>Segmento</th><th>Status</th></tr></thead>
              <tbody>
                ${rel.encontrados.map(item => `
                  <tr>
                    <td>${escaparHTMLRelatorioFaltosos(item.nomeSistema || '')}</td>
                    <td>${escaparHTMLRelatorioFaltosos(item.matriculaSistema || item.matriculaRelatorio || '')}</td>
                    <td>${escaparHTMLRelatorioFaltosos(item.serie || '')}</td>
                    <td>${escaparHTMLRelatorioFaltosos(item.segmento || '')}</td>
                    <td><span class="relatorio-importacao-status ${item.status === 'segunda-chamada' ? 'segunda' : 'falta'}">${escaparHTMLRelatorioFaltosos(statusLegivelRelatorioFaltosos(item.status))}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </details>
      `;

      const duplicadosHtml = rel.duplicadosIgnorados.length ? `
        <details class="relatorio-importacao-bloco">
          <summary>Duplicados ignorados (${rel.duplicadosIgnorados.length})</summary>
          <ul class="relatorio-importacao-lista">
            ${rel.duplicadosIgnorados.map(item => `<li>${escaparHTMLRelatorioFaltosos(formatarItemRelatorioFaltosos(item))}</li>`).join('')}
          </ul>
        </details>
      ` : '';

      detalhes.innerHTML = naoEncontradosHtml + encontradosHtml + duplicadosHtml;
      card.scrollIntoView({behavior:'smooth', block:'start'});
    }

    function importarRelatorioFaltosos(texto, nomeArquivo = ''){
      let itens = separarCSVRelatorioFaltosos(texto);
      if(!itens.length) itens = separarTextoRelatorioFaltosos(texto);

      if(!itens.length){
        alert('Não encontrei alunos no arquivo. Para PDF, primeiro converta/salve como TXT ou CSV; depois importe aqui.');
        return;
      }

      const dataCabecalho = extrairDataRelatorioFaltosos(texto);
      const dataArquivo = itens.find(item => item.data)?.data || dataCabecalho || document.getElementById('dataFreq').value;
      if(!dataArquivo){
        alert('Não consegui identificar a data do relatório. Selecione a data na tela e tente novamente.');
        return;
      }

      const registrosImportados = [];
      const encontrados = [];
      const naoEncontrados = [];
      const duplicadosIgnorados = [];
      const jaIncluidos = new Set();
      const registrosAntesDaImportacao = clonarJSONSeguro(registrosFrequencia.filter(r => r.data === dataArquivo));
      const registrosSubstituidos = registrosAntesDaImportacao.length;

      itens.forEach(item => {
        const aluno = localizarAlunoRelatorioFaltosos(item);
        if(!aluno){
          naoEncontrados.push({
            codigo: item.codigo || '',
            nomeRelatorio: item.nomeRelatorio || '',
            matricula: item.matricula || '',
            motivo: 'Não localizado no cadastro interno'
          });
          return;
        }
        const chave = `${dataArquivo}|${aluno.nome}`;
        if(jaIncluidos.has(chave)){
          duplicadosIgnorados.push({
            codigo: item.codigo || '',
            nomeRelatorio: item.nomeRelatorio || aluno.nome || '',
            matricula: item.matricula || aluno.matricula || ''
          });
          return;
        }
        jaIncluidos.add(chave);
        const statusImportado = obterStatusComRegraProva(aluno, 'falta');
        registrosImportados.push({
          id: Date.now() + registrosImportados.length,
          aluno: aluno.nome,
          data: dataArquivo,
          status: statusImportado,
          justificativa: '',
          uniformeDetalhes: null,
          origem: 'relatorio-faltosos',
          segundaChamadaSituacao: statusImportado === 'segunda-chamada' ? 'pendente' : undefined,
          segundaChamadaOrigem: statusImportado === 'segunda-chamada' ? 'prova' : undefined
        });
        encontrados.push({
          codigo: item.codigo || '',
          nomeRelatorio: item.nomeRelatorio || '',
          matriculaRelatorio: item.matricula || '',
          nomeSistema: aluno.nome,
          matriculaSistema: aluno.matricula || '',
          serie: aluno.serie || '',
          segmento: obterSegmentoRelatorioFaltosos(aluno),
          status: statusImportado,
          observacao: statusImportado === 'segunda-chamada' ? 'Lançado como 2ª Chamada por regra de prova marcada' : 'Lançado como falta'
        });
      });

      if(!registrosImportados.length){
        const relatorioVazio = {
          nomeArquivo,
          dataArquivo,
          geradoEm: new Date().toISOString(),
          totalLidos: itens.length,
          totalEncontrados: 0,
          totalNaoEncontrados: naoEncontrados.length,
          totalDuplicadosIgnorados: duplicadosIgnorados.length,
          totalFaltas: 0,
          totalSegundaChamada: 0,
          registrosSubstituidos,
          encontrados,
          naoEncontrados,
          duplicadosIgnorados
        };
        renderRelatorioImportacaoFaltosos(relatorioVazio);
        alert('Nenhum aluno do relatório foi localizado no banco de alunos do sistema. O relatório detalhado foi exibido na tela.');
        return;
      }

      const totalFaltas = registrosImportados.filter(r => r.status === 'falta').length;
      const totalSegundaChamada = registrosImportados.filter(r => r.status === 'segunda-chamada').length;
      const relatorioImportacao = {
        nomeArquivo,
        dataArquivo,
        geradoEm: new Date().toISOString(),
        totalLidos: itens.length,
        totalEncontrados: encontrados.length,
        totalNaoEncontrados: naoEncontrados.length,
        totalDuplicadosIgnorados: duplicadosIgnorados.length,
        totalFaltas,
        totalSegundaChamada,
        registrosSubstituidos,
        encontrados,
        naoEncontrados,
        duplicadosIgnorados
      };

      const textoNaoEncontrados = naoEncontrados.length ? `\n\nAtenção: ${naoEncontrados.length} aluno(s) não foram encontrados e não serão importados. O relatório detalhado será exibido após a importação.` : '';
      const textoSegunda = totalSegundaChamada ? `\n2ª Chamada: ${totalSegundaChamada}` : '';
      const confirmar = confirm(`Importar ${registrosImportados.length} registro(s) para ${fmtData(dataArquivo)}?\n\nLidos no arquivo: ${itens.length}\nEncontrados: ${encontrados.length}\nFaltas: ${totalFaltas}${textoSegunda}\nDuplicados ignorados: ${duplicadosIgnorados.length}\nRegistros antigos da data que serão substituídos: ${registrosSubstituidos}\n\nOs registros já existentes dessa data serão substituídos pelo relatório de faltosos.${textoNaoEncontrados}`);
      if(!confirmar) return;

      registrosFrequencia = registrosFrequencia.filter(r => r.data !== dataArquivo);
      registrosFrequencia.push(...registrosImportados);
      registrarSnapshotDesfazerImportacaoFaltosos(dataArquivo, nomeArquivo, relatorioImportacao, registrosAntesDaImportacao, registrosImportados);

      document.getElementById('dataFreq').value = dataArquivo;
      sincronizarBancoPrincipal(`Importação de relatório de faltosos${nomeArquivo ? ' - ' + nomeArquivo : ''}`);
      renderTabelaFrequencia();
      atualizarFaltasAcumuladas();
      renderTabelaSegundaChamadaPorDia();
      renderRelatorioSegundaChamada();
      atualizarDashboardGestor();
      renderRelatorioImportacaoFaltosos(relatorioImportacao);

      alert(`✅ Relatório importado em ${fmtData(dataArquivo)}.\n\nLidos: ${itens.length}\nLançados: ${registrosImportados.length}\nF: ${totalFaltas}\n2ª Chamada: ${totalSegundaChamada}\nNão encontrados: ${naoEncontrados.length}\nDuplicados ignorados: ${duplicadosIgnorados.length}`);
    }

    document.getElementById('checkProvaFundamental')?.addEventListener('change', aplicarRegraProvaNaDataAtual);
    document.getElementById('checkProvaMedio')?.addEventListener('change', aplicarRegraProvaNaDataAtual);

    document.getElementById('btnImportarRelatorioFaltosos')?.addEventListener('click', function(){
      document.getElementById('inputImportarRelatorioFaltosos')?.click();
    });

    document.getElementById('inputImportarRelatorioFaltosos')?.addEventListener('change', async function(event){
      const arquivo = event.target.files && event.target.files[0];
      if(!arquivo) return;

      try{
        let texto = '';
        if(/\.pdf$/i.test(arquivo.name) || arquivo.type === 'application/pdf'){
          texto = await extrairTextoPDFRelatorioFaltosos(arquivo);
        }else{
          texto = await arquivo.text();
        }
        importarRelatorioFaltosos(texto || '', arquivo.name || '');
      }catch(erro){
        alert('Não foi possível ler/importar o arquivo selecionado.\n\nDetalhe: ' + (erro && erro.message ? erro.message : erro));
      }finally{
        event.target.value = '';
      }
    });

    document.getElementById('btnBaixarRelatorioImportacaoCSV')?.addEventListener('click', function(){
      if(!ultimoRelatorioImportacaoFaltosos){
        alert('Ainda não há relatório de importação para baixar.');
        return;
      }
      baixarArquivo(relatorioImportacaoFaltososParaCSV(ultimoRelatorioImportacaoFaltosos), gerarNomeArquivoRelatorioImportacao('csv'), 'text/csv;charset=utf-8');
    });

    document.getElementById('btnBaixarRelatorioImportacaoTXT')?.addEventListener('click', function(){
      if(!ultimoRelatorioImportacaoFaltosos){
        alert('Ainda não há relatório de importação para baixar.');
        return;
      }
      baixarArquivo(relatorioImportacaoFaltososParaTXT(ultimoRelatorioImportacaoFaltosos), gerarNomeArquivoRelatorioImportacao('txt'), 'text/plain;charset=utf-8');
    });

    document.getElementById('btnFecharRelatorioImportacao')?.addEventListener('click', function(){
      const card = document.getElementById('relatorioImportacaoFaltososCard');
      if(card) card.style.display = 'none';
    });

    document.getElementById('btnDesfazerUltimaImportacao')?.addEventListener('click', desfazerUltimaImportacaoFaltosos);
    document.getElementById('btnDesfazerUltimaImportacaoCard')?.addEventListener('click', desfazerUltimaImportacaoFaltosos);
    document.getElementById('btnLimparHistoricoDesfazerImportacao')?.addEventListener('click', function(){
      const ok = confirm('Limpar o histórico local da última importação? Isso não altera nenhuma frequência, apenas remove a opção de desfazer.');
      if(ok) limparUltimaImportacaoFaltosos();
    });
    atualizarCardDesfazerImportacaoFaltosos();

    document.getElementById('btnApagarFrequenciaDia')?.addEventListener('click', function(){
      const data = document.getElementById('dataFreq').value;
      if(!data){
        alert('Selecione uma data para apagar a frequência do dia.');
        return;
      }

      const total = registrosFrequencia.filter(r => r.data === data).length;
      if(!total){
        alert(`Não há registros de frequência em ${fmtData(data)}.`);
        return;
      }

      const confirmar = confirm(`Apagar ${total} registro(s) de frequência do dia ${fmtData(data)}?\n\nEssa ação remove somente esta data. As outras frequências serão mantidas.`);
      if(!confirmar) return;

      registrosFrequencia = registrosFrequencia.filter(r => r.data !== data);
      sincronizarBancoPrincipal(`Frequência apagada do dia ${data}`);
      renderTabelaFrequencia();
      atualizarFaltasAcumuladas();
      renderTabelaSegundaChamadaPorDia();
      renderRelatorioSegundaChamada();
      atualizarDashboardGestor();
      alert(`✅ Frequência do dia ${fmtData(data)} apagada com sucesso.`);
    });

    document.getElementById('btnImportarDia')?.addEventListener('click', function(){
      document.getElementById('inputImportarDia')?.click();
    });

    document.getElementById('inputImportarDia')?.addEventListener('change', function(event){
      const arquivo = event.target.files && event.target.files[0];
      if(!arquivo) return;

      const leitor = new FileReader();
      leitor.onload = function(e){
        importarFrequenciaDiaCSV(e.target.result || '');
        event.target.value = '';
      };
      leitor.onerror = function(){
        alert('Não foi possível ler o arquivo selecionado.');
        event.target.value = '';
      };
      leitor.readAsText(arquivo, 'UTF-8');
    });

document.getElementById('btnExportarMes').addEventListener('click', function(){
      const mes = prompt('Digite o mês (formato: YYYY-MM, ex: 2026-01):');
      if(!mes) return;

      const registrosMes = registrosFrequencia.filter(r => r.data.startsWith(mes));

      let csv = 'Aluno,Série,Data,Status\n';
      registrosMes.forEach(r => {
        const aluno = alunosDB.find(a => a.nome === r.aluno);
        csv += `"${r.aluno}","${aluno ? aluno.serie : ''}","${r.data}","${r.status}"\n`;
      });

      baixarArquivo(csv, `frequencia_${mes}.csv`, 'text/csv');
    });

    const filtroAlunoSegundaChamada = document.getElementById('filtroAlunoSegundaChamada');
    if(filtroAlunoSegundaChamada){
      filtroAlunoSegundaChamada.addEventListener('input', function(){
        renderTabelaSegundaChamadaPorDia();
        renderRelatorioSegundaChamada();
      });
    }

    const filtroVisualizacaoSegundaChamada = document.getElementById('filtroVisualizacaoSegundaChamada');
    if(filtroVisualizacaoSegundaChamada){
      filtroVisualizacaoSegundaChamada.addEventListener('change', function(){
        renderTabelaSegundaChamadaPorDia();
      });
    }

    const btnExportarSegundaChamadaJson = document.getElementById('btnExportarSegundaChamadaJson');
    if(btnExportarSegundaChamadaJson){
      btnExportarSegundaChamadaJson.addEventListener('click', function(){
        const registros = obterRegistrosSegundaChamada().map(reg => ({
          id: reg.id,
          aluno: reg.aluno,
          serie: reg.serie,
          turma: reg.turma,
          data: reg.data,
          status: reg.status,
          situacao: reg.situacao,
          arquivada: reg.arquivada,
          boletim: reg.boletim,
          justificativa: reg.justificativa || '',
          atualizadoEm: reg.segundaChamadaAtualizadaEm || '',
          arquivadaEm: reg.segundaChamadaArquivadaEm || ''
        }));

        if(!registros.length){
          alert('Nenhum registro de 2ª chamada encontrado para exportar.');
          return;
        }

        const payload = {
          exportadoEm: new Date().toISOString(),
          total: registros.length,
          filtroAluno: filtroAlunoSegundaChamada?.value?.trim() || '',
          registros
        };

        baixarArquivo(
          JSON.stringify(payload, null, 2),
          `segunda_chamada_${new Date().toISOString().split('T')[0]}.json`,
          'application/json'
        );
      });
    }

    const btnArquivarEncerradosSegundaChamada = document.getElementById('btnArquivarEncerradosSegundaChamada');
    if(btnArquivarEncerradosSegundaChamada){
      btnArquivarEncerradosSegundaChamada.addEventListener('click', arquivarEncerradosSegundaChamada);
    }

    const btnGerarRelatorioSegundaChamada = document.getElementById('btnGerarRelatorioSegundaChamada');
    if(btnGerarRelatorioSegundaChamada){
      btnGerarRelatorioSegundaChamada.addEventListener('click', renderRelatorioSegundaChamada);
    }

    const btnImprimirRelatorioSegundaChamada = document.getElementById('btnImprimirRelatorioSegundaChamada');
    if(btnImprimirRelatorioSegundaChamada){
      btnImprimirRelatorioSegundaChamada.addEventListener('click', imprimirRelatorioSegundaChamada);
    }

    const btnBaixarPdfRelatorioSegundaChamada = document.getElementById('btnBaixarPdfRelatorioSegundaChamada');
    if(btnBaixarPdfRelatorioSegundaChamada){
      btnBaixarPdfRelatorioSegundaChamada.addEventListener('click', async function(){
        renderRelatorioSegundaChamada();
        await pdfBaixarBloco(document.getElementById('relatorioSegundaChamadaPreview'), 'relatorio_segunda_chamada.pdf', 0, { a4Doc: true });
      });
    }

    document.getElementById('btnAlunosFaltosos').addEventListener('click', function(){
      const alunosFaltosos = [];

      alunosDB.forEach(aluno => {
        const registros = registrosFrequencia
          .filter(r => r.aluno === aluno.nome)
          .sort((a,b) => new Date(a.data) - new Date(b.data));

        let faltasConsecutivas = 0;
        let maxConsecutivas = 0;

        registros.forEach(r => {
          if(r.status === 'falta' || r.status === 'segunda-chamada'){
            faltasConsecutivas++;
            maxConsecutivas = Math.max(maxConsecutivas, faltasConsecutivas);
          } else {
            faltasConsecutivas = 0;
          }
        });

        if(maxConsecutivas >= 3){
          alunosFaltosos.push({
            nome: aluno.nome,
            serie: aluno.serie,
            consecutivas: maxConsecutivas
          });
        }
      });

      if(alunosFaltosos.length === 0){
        alert('✅ Nenhum aluno com 3 ou mais faltas consecutivas.');
        return;
      }

      let relatorio = 'ALUNOS COM 3+ FALTAS CONSECUTIVAS\n\n';
      alunosFaltosos.forEach(a => {
        relatorio += `${a.nome} (${a.serie}) - ${a.consecutivas} faltas seguidas\n`;
      });

      alert(relatorio);
    });

    document.getElementById('btnExportarBackup').addEventListener('click', function(){
      exportarBackupCompleto('backup_ensps_completo', 'exportação manual');
    });

    const btnBaixarBancoAtual = document.getElementById('btnBaixarBancoAtual');
    if (btnBaixarBancoAtual) {
      btnBaixarBancoAtual.addEventListener('click', function(){
        baixarBancoAtualJSON();
      });
    }

    document.getElementById('btnImportarBackup').addEventListener('click', function(){
      document.getElementById('fileImportBackup').click();
    });

    document.getElementById('fileImportBackup').addEventListener('change', function(e){
      const file = e.target.files[0];
      if(!file) return;

      const reader = new FileReader();
      reader.onload = async function(event){
        try {
          const backup = JSON.parse(event.target.result);
          const novoBanco = extrairBancoDeArquivoBackup(backup);
          const resumoNovo = contarItensBackup(novoBanco);
          const mensagem = [
            '⚠️ Restaurar este backup vai substituir os dados atuais do sistema.',
            '',
            'Resumo do arquivo selecionado:',
            formatarResumoBackup(resumoNovo),
            '',
            'Antes de substituir, o sistema baixará um backup de segurança do estado atual.',
            '',
            'Continuar?'
          ].join('\n');

          if(confirm(mensagem)){
            exportarBackupCompleto('backup_antes_da_restauracao', 'segurança antes da restauração');
            aplicarBancoRestaurado(novoBanco);
            registrarEventoBackup('backup restaurado', { arquivo: file.name, resumo: resumoNovo });
            if (remotoInicializado) await salvarBancoRemoto({ force: true, reason: 'Restauração manual de backup', silent: true });
            alert('✅ Backup restaurado com sucesso! O banco também foi preparado para sincronizar com o Cloudflare/GitHub.');
          }
        } catch(err) {
          alert('❌ Erro ao restaurar backup: ' + err.message);
        } finally {
          e.target.value = '';
        }
      };
      reader.readAsText(file);
    });

    const btnSincronizarGitHub = document.getElementById('btnSincronizarGitHub');
    if (btnSincronizarGitHub) {
      btnSincronizarGitHub.addEventListener('click', async function(){
        sincronizarBancoPrincipal('Sincronização manual solicitada pelo usuário');
        await salvarBancoRemoto({ force: true, reason: 'Sincronização manual solicitada pelo usuário', silent: false });
      });
    }

    document.getElementById('btnLimparFrequencias').addEventListener('click', function(){
      if(confirm('⚠️ Tem certeza que deseja apagar TODAS as frequências registradas? Esta ação não pode ser desfeita.')){
        registrosFrequencia = [];
        sincronizarBancoPrincipal();
        renderTabelaFrequencia();
        atualizarFaltasAcumuladas();
        renderTabelaSegundaChamadaPorDia();
        atualizarDashboardGestor();
        renderRelatorioSegundaChamada();
        alert('✅ Todas as frequências foram apagadas.');
      }
    });

    atualizarResumoBackupCentral();
    atualizarUltimoBackupNaTela();

    // =========================
    // COMUNICADOS - PROFESSORES
    // =========================
    function enviarComunicadosParaBoletim(){
      const frame = document.getElementById('boletimIntegradoFrame');
      if (!frame || !frame.contentWindow) return;
      const itens = Array.isArray(comunicadosRegistros) ? comunicadosRegistros : [];
      const hash = serializarSeguro(itens);
      if (hash === ultimoHashComunicadosEnviado) return;
      ultimoHashComunicadosEnviado = hash;
      try {
        frame.contentWindow.__ENSPS_BOOTSTRAP_COMUNICADOS__ = itens;
        frame.contentWindow.dispatchEvent(new frame.contentWindow.CustomEvent('ensps-bootstrap-comunicados'));
      } catch {}
      frame.contentWindow.postMessage({ type: 'ensps:comunicadosSync', items: itens }, '*');
    }

    function salvarComunicadosRegistros(){
      sincronizarBancoPrincipal();
      enviarComunicadosParaBoletim();
    }

    function comunicadosLimparFormulario(){
      comunicadoAtualId = null;
      ['com-titulo', 'com-categoria', 'com-publico', 'com-data', 'com-texto', 'com-instrucao-ia'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.value = '';
      });
    }

    function comunicadosCarregar(id){
      const comunicado = comunicadosRegistros.find(item => item.id === id);
      if(!comunicado) return;
      comunicadoAtualId = id;
      document.getElementById('com-titulo').value = comunicado.titulo || '';
      document.getElementById('com-categoria').value = comunicado.categoria || '';
      document.getElementById('com-publico').value = comunicado.publico || '';
      document.getElementById('com-data').value = comunicado.data || '';
      document.getElementById('com-texto').value = comunicado.texto || '';
      document.getElementById('com-instrucao-ia').value = '';
    }

    function renderComunicadosLista(){
      enviarComunicadosParaBoletim();
      const lista = document.getElementById('comunicadosLista');
      const total = document.getElementById('com-total-registros');
      if(!lista || !total) return;

      total.textContent = `${comunicadosRegistros.length} comunicado(s)`;

      if(!comunicadosRegistros.length){
        lista.innerHTML = '<div class="muted" style="font-size:.88rem;">Nenhum comunicado salvo ainda.</div>';
        return;
      }

      const ordenados = [...comunicadosRegistros].sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));
      lista.innerHTML = ordenados.map(item => `
        <div style="border:1px solid var(--border);border-radius:10px;padding:14px;background:var(--surface);">
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;flex-wrap:wrap;">
            <div>
              <div style="font-size:.96rem;font-weight:700;color:var(--ink);">${item.titulo || 'Sem título'}</div>
              <div class="muted" style="font-size:.78rem;margin-top:4px;">
                ${(item.categoria || 'Sem categoria')}${item.publico ? ` • ${item.publico}` : ''}${item.data ? ` • ${fmtData(item.data)}` : ''}
              </div>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              <button class="btn-ghost btn-small" onclick="comunicadosCarregar(${item.id})">Abrir</button>
              <button class="btn-danger btn-small" onclick="comunicadosExcluir(${item.id})">Excluir</button>
            </div>
          </div>
          <div style="margin-top:10px;white-space:pre-wrap;line-height:1.6;font-size:.84rem;color:var(--ink);">${item.texto || ''}</div>
        </div>
      `).join('');
    }

    window.comunicadosCarregar = comunicadosCarregar;

    window.comunicadosExcluir = function(id){
      if(!confirm('Deseja excluir este comunicado?')) return;
      comunicadosRegistros = comunicadosRegistros.filter(item => item.id !== id);
      if(comunicadoAtualId === id) comunicadosLimparFormulario();
      salvarComunicadosRegistros();
      renderComunicadosLista();
    };

    const btnSalvarComunicado = document.getElementById('btnSalvarComunicado');
    if(btnSalvarComunicado){
      btnSalvarComunicado.addEventListener('click', function(){
        const titulo = document.getElementById('com-titulo')?.value.trim() || '';
        const categoria = document.getElementById('com-categoria')?.value.trim() || '';
        const publico = document.getElementById('com-publico')?.value.trim() || '';
        const data = document.getElementById('com-data')?.value || '';
        const texto = document.getElementById('com-texto')?.value.trim() || '';

        if(!titulo && !texto){
          alert('Preencha pelo menos o título ou o texto do comunicado.');
          return;
        }

        const agora = new Date().toISOString();
        if(comunicadoAtualId){
          const existente = comunicadosRegistros.find(item => item.id === comunicadoAtualId);
          if(existente){
            existente.titulo = titulo;
            existente.categoria = categoria;
            existente.publico = publico;
            existente.data = data;
            existente.texto = texto;
            existente.updatedAt = agora;
          }
        } else {
          comunicadoAtualId = Date.now();
          comunicadosRegistros.push({
            id: comunicadoAtualId,
            titulo,
            categoria,
            publico,
            data,
            texto,
            createdAt: agora,
            updatedAt: agora
          });
        }

        salvarComunicadosRegistros();
        renderComunicadosLista();
        alert('✅ Comunicado salvo com sucesso!');
      });
    }

    const btnNovoComunicado = document.getElementById('btnNovoComunicado');
    if(btnNovoComunicado) btnNovoComunicado.addEventListener('click', comunicadosLimparFormulario);

    const btnCopiarComunicado = document.getElementById('btnCopiarComunicado');
    if(btnCopiarComunicado){
      btnCopiarComunicado.addEventListener('click', async function(){
        const texto = document.getElementById('com-texto')?.value.trim() || '';
        if(!texto){
          alert('Escreva ou carregue um comunicado primeiro.');
          return;
        }
        try {
          await navigator.clipboard.writeText(texto);
          alert('✅ Comunicado copiado!');
        } catch {
          alert('Não foi possível copiar automaticamente.');
        }
      });
    }

    function baixarArquivo(conteudo, nomeArquivo, tipo){
      const blob = new Blob([conteudo], {type: tipo});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = nomeArquivo;
      a.click();
      URL.revokeObjectURL(url);
    }

    function pdfGarantirBibliotecas() {
      if (!window.html2canvas) {
        alert('A biblioteca de captura ainda não foi carregada. Tente novamente em instantes.');
        return false;
      }
      if (!window.jspdf || !window.jspdf.jsPDF) {
        alert('A biblioteca de PDF ainda não foi carregada. Tente novamente em instantes.');
        return false;
      }
      return true;
    }

    function pdfEsperarRender() {
      return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }

    async function pdfEsperarImagens(el) {
      const imgs = [...el.querySelectorAll('img')];
      await Promise.all(imgs.map(img => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));
      await pdfEsperarRender();
    }

    function pdfCriarHostTemporario(nodes) {
      const host = document.createElement('div');
      host.style.cssText = 'position:fixed;left:-20000px;top:0;z-index:-1;background:#fff;padding:0;margin:0;';
      document.body.appendChild(host);

      const clones = nodes.map(node => {
        const wrap = document.createElement('div');
        wrap.style.cssText = 'background:#fff;margin:0;padding:0;';
        const clone = node.cloneNode(true);
        clone.style.display = 'block';
        clone.style.visibility = 'visible';
        clone.style.marginLeft = '0';
        clone.style.marginRight = '0';
        wrap.appendChild(clone);
        host.appendChild(wrap);
        return clone;
      });

      return { host, clones };
    }

    async function pdfBaixarPaginas(nodes, nomeArquivo) {
      if (!pdfGarantirBibliotecas()) return;
      const pages = (nodes || []).filter(Boolean);
      if (!pages.length) {
        alert('Nenhuma página foi encontrada para gerar o PDF.');
        return;
      }

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const { host, clones } = pdfCriarHostTemporario(pages);

      try {
        for (let i = 0; i < clones.length; i++) {
          const clone = clones[i];
          await pdfEsperarImagens(clone);
          const canvas = await html2canvas(clone, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
          const imgData = canvas.toDataURL('image/jpeg', 0.98);
          const ratio = Math.min(pageW / canvas.width, pageH / canvas.height);
          const imgW = canvas.width * ratio;
          const imgH = canvas.height * ratio;
          const x = (pageW - imgW) / 2;
          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, 'JPEG', x, 0, imgW, imgH, undefined, 'FAST');
        }

        pdf.save(nomeArquivo);
      } finally {
        host.remove();
      }
    }

    async function pdfBaixarBloco(node, nomeArquivo, margemMm = 0, options = {}) {
      if (!pdfGarantirBibliotecas()) return;
      if (!node) {
        alert('Não foi possível localizar o conteúdo para gerar o PDF.');
        return;
      }

      const { jsPDF } = window.jspdf;
      const { host, clones } = pdfCriarHostTemporario([node]);
      const clone = clones[0];

      if (options.a4Doc) {
        host.style.left = '-40000px';
        host.style.width = '210mm';
        host.style.maxWidth = '210mm';
        host.style.overflow = 'visible';
        clone.style.width = '210mm';
        clone.style.maxWidth = '210mm';
        clone.style.padding = '4mm';
        clone.style.margin = '0';
        clone.style.boxSizing = 'border-box';
        clone.style.background = '#fff';
        clone.style.border = 'none';
        clone.style.borderRadius = '0';
        clone.style.boxShadow = 'none';
        clone.style.color = '#000';

        [...clone.children].forEach(el => {
          el.style.width = '100%';
          el.style.maxWidth = '100%';
          el.style.margin = '0';
          el.style.boxSizing = 'border-box';
          el.style.background = '#fff';
          el.style.border = 'none';
          el.style.borderRadius = '0';
          el.style.boxShadow = 'none';
          el.style.color = '#000';
        });

        clone.querySelectorAll('.doc, .adv-page-wrap').forEach(el => {
          el.style.maxWidth = '100%';
          el.style.width = '100%';
          el.style.margin = '0';
          el.style.padding = '0';
          el.style.boxSizing = 'border-box';
          el.style.background = '#fff';
          el.style.border = 'none';
          el.style.borderRadius = '0';
          el.style.boxShadow = 'none';
          el.style.color = '#000';
        });

        clone.querySelectorAll('.doc header').forEach(el => {
          el.style.marginTop = '0';
        });

        clone.querySelectorAll('*').forEach(el => {
          if (el.tagName !== 'IMG') {
            el.style.color = '#000';
            el.style.opacity = '1';
            el.style.textShadow = 'none';
            el.style.filter = 'none';
          }
        });
      }

      try {
        await pdfEsperarImagens(clone);
        const canvas = await html2canvas(clone, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        const usableW = pageW - (margemMm * 2);
        const usableH = pageH - (margemMm * 2);
        const pxPerMm = canvas.width / usableW;
        const pageHeightPx = Math.max(1, Math.floor(usableH * pxPerMm));
        let offsetY = 0;
        let pageIndex = 0;

        while (offsetY < canvas.height) {
          const sliceHeight = Math.min(pageHeightPx, canvas.height - offsetY);
          const slice = document.createElement('canvas');
          slice.width = canvas.width;
          slice.height = sliceHeight;
          const ctx = slice.getContext('2d');
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, slice.width, slice.height);
          ctx.drawImage(canvas, 0, offsetY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

          const imgData = slice.toDataURL('image/jpeg', 0.98);
          const sliceHeightMm = sliceHeight / pxPerMm;
          if (pageIndex > 0) pdf.addPage();
          pdf.addImage(imgData, 'JPEG', margemMm, margemMm, usableW, sliceHeightMm, undefined, 'FAST');

          offsetY += sliceHeight;
          pageIndex += 1;
        }

        pdf.save(nomeArquivo);
      } finally {
        host.remove();
      }
    }

    document.getElementById('filtroSerie').addEventListener('change', renderTabelaFrequencia);
    document.getElementById('filtroEnsino').addEventListener('change', renderTabelaFrequencia);
    document.getElementById('buscaAlunoFreq')?.addEventListener('input', renderTabelaFrequencia);
    document.getElementById('dataFreq').addEventListener('change', renderTabelaFrequencia);
    document.querySelectorAll('#uniformeOpcoesGrid input').forEach(input => {
      input.addEventListener('change', atualizarResumoModalUniforme);
    });
    document.getElementById('uniformeModal')?.addEventListener('click', function(event){
      if(event.target.id === 'uniformeModal') fecharModalUniforme();
    });

    function configurarRecolhedorListaAlunosMobile(){
      const card = document.getElementById("frequenciaListaCard");
      const botao = document.getElementById("btnToggleListaAlunos");
      if(!card || !botao) return;

      const atualizarTexto = () => {
        const recolhida = card.classList.contains("is-collapsed");
        botao.textContent = recolhida ? "Mostrar lista" : "Recolher lista";
        botao.setAttribute("aria-expanded", recolhida ? "false" : "true");
      };

      botao.addEventListener("click", () => {
        card.classList.toggle("is-collapsed");
        atualizarTexto();
      });

      atualizarTexto();
    }

    configurarRecolhedorListaAlunosMobile();

    renderTabelaFrequencia();
    atualizarFaltasAcumuladas();
