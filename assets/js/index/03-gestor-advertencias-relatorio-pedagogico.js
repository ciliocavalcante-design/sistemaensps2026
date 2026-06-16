// Módulo extraído de assets/js/index.js
// Mantém escopo global do sistema ENSPS 2026.

    // =========================
    // GERADOR DE CREDENCIAIS - VERSÃO CORRIGIDA
    // =========================
    function gerarUsuarioSAS(nomeCompleto){
      const ignorar = ['de', 'da', 'do', 'dos', 'das', 'e'];
      const palavras = nomeCompleto.trim().split(' ').filter(n => n.length > 0);

      const palavrasValidas = [];
      for(let palavra of palavras){
        if(palavrasValidas.length >= 3) break;
        if(!ignorar.includes(palavra.toLowerCase())){
          palavrasValidas.push(palavra);
        }
      }

      const usuario = palavrasValidas.join('');

      return usuario
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ç/g, 'c');
    }

    document.getElementById('btnGerarCredenciais').addEventListener('click', function(){
      const nomeAluno = document.getElementById('alunoGestor').value.trim();
      const matricula = document.getElementById('matriculaGestor').value.trim();

      if(!nomeAluno || !matricula){
        alert('⚠️ Selecione um aluno primeiro!');
        return;
      }

      const usuarioSAS = gerarUsuarioSAS(nomeAluno);

      // Atualizar visualização na tela
      document.getElementById('credMatricula').textContent = matricula;
      document.getElementById('credSenha').textContent = matricula;
      document.getElementById('credUsuarioSAS').textContent = usuarioSAS;
      document.getElementById('credenciaisContainer').style.display = 'block';

      // Atualizar versão para impressão
      document.getElementById('printAlunoNome').textContent = nomeAluno;
      document.getElementById('printMatricula').textContent = matricula;
      document.getElementById('printMatriculaENSPS').textContent = matricula;
      document.getElementById('printSenhaENSPS').textContent = matricula;
      document.getElementById('printUsuarioSAS').textContent = usuarioSAS;
    });

    document.getElementById('btnImprimirCredenciais').addEventListener('click', function(){
      const container = document.getElementById('credenciaisContainer');
      if(container.style.display === 'none'){
        alert('⚠️ Gere as credenciais primeiro!');
        return;
      }
      window.print();
    });

    document.getElementById('btnBaixarPDFCredenciais').addEventListener('click', async function(){
      const container = document.getElementById('credenciaisContainer');
      if(container.style.display === 'none'){
        alert('⚠️ Gere as credenciais primeiro!');
        return;
      }
      await pdfBaixarPaginas([document.getElementById('credenciaisImpressao')], 'credenciais_plataformas_digitais.pdf');
    });

    function copiarTextoCredenciais(texto, mensagemSucesso){
      navigator.clipboard.writeText(texto).then(() => {
        alert(mensagemSucesso);
      }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = texto;
        ta.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try {
          document.execCommand('copy');
          alert(mensagemSucesso);
        } catch(e) {
          alert('Copie manualmente:\n\n' + texto);
        }
        document.body.removeChild(ta);
      });
    }

    function obterCredenciaisGestorAtuais(){
      const matricula = document.getElementById('credMatricula').textContent;
      const usuarioSAS = document.getElementById('credUsuarioSAS').textContent;
      const nomeAluno = document.getElementById('alunoGestor').value.trim();

      if(matricula === '—'){
        alert('⚠️ Gere as credenciais primeiro!');
        return null;
      }

      return { matricula, usuarioSAS, nomeAluno };
    }

    document.getElementById('btnCopiarCredenciais').addEventListener('click', function(){
      const dados = obterCredenciaisGestorAtuais();
      if(!dados) return;
      const { matricula, usuarioSAS, nomeAluno } = dados;
      const texto = `Aluno
${nomeAluno}
Matrícula
${matricula}

Plataformas Digitais

📱 Plataforma ENSPS
Aplicativo: Gestor Escolar
Escola: 19
Matrícula: ${matricula}
Senha: ${matricula}

🎓 Plataforma SAS
Aplicativo: SAS Educação
Site: https://app.portalsaseducacao.com.br/
Usuário: ${usuarioSAS}
Senha temporária: ensps2026`;

      copiarTextoCredenciais(texto, '✅ Credenciais copiadas para a área de transferência!');
    });

    document.getElementById('btnCopiarCredenciaisENSPS').addEventListener('click', function(){
      const dados = obterCredenciaisGestorAtuais();
      if(!dados) return;
      const { matricula, nomeAluno } = dados;
      const texto = `Aluno
${nomeAluno}
Matrícula
${matricula}

📱 Plataforma ENSPS
Aplicativo: Gestor Escolar
Escola: 19
Matrícula: ${matricula}
Senha: ${matricula}`;
      copiarTextoCredenciais(texto, '✅ Dados da Plataforma ENSPS copiados!');
    });

    document.getElementById('btnCopiarCredenciaisSAS').addEventListener('click', function(){
      const dados = obterCredenciaisGestorAtuais();
      if(!dados) return;
      const { matricula, usuarioSAS, nomeAluno } = dados;
      const texto = `Aluno
${nomeAluno}
Matrícula
${matricula}

🎓 Plataforma SAS
Aplicativo: SAS Educação
Site: https://app.portalsaseducacao.com.br/
Usuário: ${usuarioSAS}
Senha temporária: ensps2026`;
      copiarTextoCredenciais(texto, '✅ Dados da Plataforma SAS copiados!');
    });

    // =========================
    // SISTEMA DE ADVERTÊNCIAS
    // =========================
    const motivosPadrao = [
      {
        label: "Uso de celular em sala",
        sugestao: "O(A) estudante fez uso de aparelho celular durante as atividades escolares, mesmo após ser orientado(a) sobre a necessidade de foco e respeito à dinâmica pedagógica."
      },
            {
        label: "Falta de respeito",
        sugestao: "O(A) estudante manifestou comportamento inadequado de falta de respeito com colegas e/ou equipe escolar, contrariando os princípios de convivência harmônica e respeito mútuo incentivados pela escola."
      },
      {
        label: "Falta de respeito grave para com o professor",
        sugestao: "O(A) estudante demonstrou falta de respeito grave em relação ao(à) professor(a), desconsiderando orientações, adotando postura desrespeitosa e, em determinados momentos, prejudicando o ambiente de ensino-aprendizagem e a autoridade do docente."
      },
      {
        label: "Desobediência às orientações",
        sugestao: "O(A) estudante descumpriu orientações dadas pelos educadores, comprometendo o andamento das atividades e a disciplina no ambiente escolar."
      },
      {
        label: "Não realizou atividades/tarefas",
        sugestao: "O(A) estudante não realizou as atividades/tarefas propostas, mesmo após incentivo e disponibilidade de apoio pedagógico."
      },
      {
        label: "Atraso recorrente",
        sugestao: "O(A) estudante compareceu repetidas vezes com atraso para as aulas ou atividades, sem justificativa adequada, prejudicando o andamento das atividades e planejamento da turma."
      },
      {
        label: "Conversa demasiada em sala de aula",
        sugestao: "O(A) estudante manteve conversas em volume elevado, interrompendo atividades e atrapalhando o andamento da aula, mesmo após ser alertado(a)."
      },
      {
        label: "Gestos obscenos/palavras de baixo calão",
        sugestao: "O(A) estudante fez uso de gestos obscenos e/ou palavras de baixo calão em ambiente escolar, desrespeitando colegas e membros da equipe escolar."
      },
      {
        label: "Danos ao patrimônio",
        sugestao: "O(A) estudante foi identificado(a) causando danos ao patrimônio escolar, ferindo as normas de respeito ao espaço coletivo."
      },
      {
        label: "Fardamento em desacordo com normas",
        sugestao: "O(A) estudante apresentou-se na escola portando vestimentas em desacordo com o padrão de fardamento institucional exigido."
      }
    ];

    let motivosExtras = [];
    const $ = (s,el=document)=>el.querySelector(s);
    const $$ = (s,el=document)=>[...el.querySelectorAll(s)];

    function refreshMotivosBox(){
      const box = $("#motivosBox");
      if(!box) return;
      box.innerHTML="";
      motivosPadrao.concat(motivosExtras).forEach((motivo, idx)=>{
        const div = document.createElement("div");
        div.className = "topico-item";

        const safeLabel = motivo.label.replace(/"/g,"&quot;");
        div.innerHTML = `
          <label>${motivo.label}</label>
          <div class="topico-opcoes">
            <label>
              <input type="checkbox" value="${safeLabel}" data-idx="${idx}">
              <span>Selecionar motivo</span>
            </label>
            ${motivo.sugestao ? '<button type="button" class="motivo-sugerir">Usar sugestão</button>' : ''}
          </div>
        `;

        if(motivo.sugestao){
          const btn = div.querySelector('.motivo-sugerir');
          if (btn) {
            btn.onclick = function(){
              const textarea = $("#descricao");
              if(!textarea) return;
              let val = textarea.value.trim();
              if(val && !val.endsWith('\n')) val += '\n';
              textarea.value = val + motivo.sugestao;
              renderPreview();
            };
          }
        }

        box.appendChild(div);
      });
    }

    const btnAddMotivo = $("#btnAddMotivo");
    if(btnAddMotivo){
      btnAddMotivo.onclick = function(){
        const inputNovo = $("#motivoNovo");
        if(!inputNovo) return;
        const val = inputNovo.value.trim();
        if(val && !motivosPadrao.concat(motivosExtras).some(m=>m.label.toLowerCase()===val.toLowerCase())){
          motivosExtras.push({label:val});
          inputNovo.value="";
          refreshMotivosBox();
        }
      };
    }

    // Logo preview advertência
    let logoFile=null, logoDataUrl="https://raw.githubusercontent.com/ciliocavalcante-design/ensps/main/LOGO%20ENSPS%202024.5.png";
    const assinaturaAdvertenciaUrl = "https://raw.githubusercontent.com/ciliocavalcante-design/ensps/main/Aviso%20oficial%20da%20escola.png";
    const assinaturaRelatorioUrl = "https://raw.githubusercontent.com/ciliocavalcante-design/ensps/main/Assinatura%20corrigida%20de%20Ci%CC%81lio%20Cavalcante.png";
    // Logo carregada automaticamente do GitHub

    const MESES=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
    const cidadeFixa = "Fortaleza/CE";
    const enderecoFixo = "Rua Estrada do Pici, 1290, (85) 3290 4621";

    const fmtData = d => d ? (() => {
      const [yy, mm, dd] = d.split('-');
      if(!yy||!mm||!dd) return "";
      return `${dd}/${mm}/${yy}`;
    })() : "";

    const linhaCidadeData = (cidade,data)=>{
      const d = data
        ? (() => {
            const [yy, mm, dd] = data.split('-');
            return new Date(Number(yy), Number(mm) - 1, Number(dd));
          })()
        : new Date();
      return `${cidadeFixa}, ${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`
    };

    renderComunicadosLista();

    function buildCopy(label){
      const aluno = $("#aluno") ? $("#aluno").value || "—" : "—";
      const data = $("#data") ? $("#data").value || "" : "";
      const turma = $("#turma") ? $("#turma").value || "—" : "—";
      const serie = $("#serie") ? $("#serie").value || "—" : "—";
      const turno = $("#turno") ? $("#turno").value || "—" : "—";
      const matricula = $("#matricula") ? $("#matricula").value || "—" : "—";
      const natureza = $("#natureza") ? $("#natureza").value || "—" : "—";
      const desc = $("#descricao") ? $("#descricao").value || "" : "";
      const motivosMarcados = [];
      $$("#motivosBox input[type=checkbox]:checked").forEach(i=>motivosMarcados.push(i.value));
      const escola = "ESCOLA NOSSA SENHORA DO PERPÉTUO SOCORRO";
      const div=document.createElement("div");

      let motivosHTML = "";
      if(motivosMarcados.length){
        motivosHTML = `<div class="kv"><strong>Motivos:</strong>
        <pre class="motivos-pre">${motivosMarcados.map(m=>"• "+m).join("\n")}</pre>
        </div>`;
      }

      const exibirLinhasAssinatura = !!(document.getElementById("mostrarAssinaturas") && document.getElementById("mostrarAssinaturas").checked);
      const exibirAssinaturaAdvertencia = !!(document.getElementById("mostrarAssinaturaAdvertencia") && document.getElementById("mostrarAssinaturaAdvertencia").checked);
      const assinaturaAdvertenciaHtml = exibirAssinaturaAdvertencia
        ? `<img class="signature-image signature-image-adv" src="${assinaturaAdvertenciaUrl}" alt="Assinatura da advertência">`
        : "";

      div.innerHTML=
      `<header>${logoDataUrl?`<img class="logo" src="${logoDataUrl}">`:""}<div><h3>${escola}</h3>
        <span class="endereco-fixo">${enderecoFixo}</span>
        </div>
        <div style="margin-left:auto;text-align:right"><small>${label}</small></div>
        </header>
      <h2>${(document.getElementById("tipoDocumento")||{value:"Advertência Escolar"}).value}</h2>
      <div class="kv"><strong>Aluno(a):</strong> ${aluno}</div>
      <div class="kv"><strong>Matrícula:</strong> ${matricula}</div>
      <div class="kv"><strong>Série/Turma/Turno:</strong> ${serie}/${turma}/${turno}</div>
      <div class="kv"><strong>Data:</strong> ${fmtData(data)}</div>
      <div class="kv"><strong>Natureza:</strong> ${natureza}</div>
      ${motivosHTML}
      <div class="section-title">Descrição</div><div style="white-space:pre-wrap">${desc}</div>
      ${exibirLinhasAssinatura
        ? `<div class="signs"><div class="sign-slot"><div class="line">Responsável</div></div><div class="sign-slot">${assinaturaAdvertenciaHtml}<div class="line">Escola</div></div></div>`
        : `<div class="signs signs-single"><div class="sign-slot">${assinaturaAdvertenciaHtml}<div class="line">Escola</div></div></div>` }
      <div class="adv-data-extenso">${linhaCidadeData(cidadeFixa,data)}</div>`;
      return div;
    }

    function getAdvertenciasPendentesAssinatura(){
      return advertenciasSalvas
        .filter(adv => adv.pendenciaAssinatura)
        .sort((a, b) => new Date(a.data || 0) - new Date(b.data || 0));
    }

    function atualizarBadgePendenciasAssinatura(){
      const pendentes = getAdvertenciasPendentesAssinatura();
      const total = pendentes.length;
      const desktopLabel = document.querySelector('.menu-item[data-section="advertencia"] span:last-child');
      if (desktopLabel) {
        const baseText = desktopLabel.dataset.baseLabel || desktopLabel.textContent.replace(/\s*\d+ pend\.?$/i, '').trim();
        desktopLabel.dataset.baseLabel = baseText;
        desktopLabel.innerHTML = total > 0
          ? `${baseText}<span class="menu-badge">${total}</span>`
          : baseText;
      }

      const mobileItem = document.querySelector('.bottom-nav-item[data-section="advertencia"]');
      const mobileLabel = mobileItem?.querySelector('.bnav-label');
      if (mobileLabel) {
        mobileLabel.textContent = mobileLabel.dataset.baseLabel || mobileLabel.textContent.replace(/\s*\d+ pend\.?$/i, '').trim();
        mobileLabel.dataset.baseLabel = mobileLabel.textContent;
      }
      if (mobileItem) {
        mobileItem.querySelector('.bottom-nav-badge')?.remove();
        if (total > 0) {
          const badge = document.createElement('span');
          badge.className = 'bottom-nav-badge';
          badge.textContent = String(total);
          mobileItem.appendChild(badge);
        }
      }
    }

    function renderPendenciasAssinatura(){
      const resumo = document.getElementById('pendenciasAssinaturaResumo');
      const tabela = document.getElementById('pendenciasAssinaturaTabela');
      if(!resumo || !tabela) return;

      const pendentes = getAdvertenciasPendentesAssinatura();
      const alunosUnicos = new Set(pendentes.map(adv => adv.aluno)).size;
      resumo.innerHTML = `
        <div class="pendencias-chip">${pendentes.length} advertência(s) pendente(s)</div>
        <div class="pendencias-chip">${alunosUnicos} aluno(s) aguardando assinatura</div>
      `;

      if(!pendentes.length){
        tabela.innerHTML = '<div class="pendencias-vazio">Nenhuma assinatura pendente no momento.</div>';
        atualizarBadgePendenciasAssinatura();
        return;
      }

      tabela.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Aluno</th>
              <th>Série/Turma</th>
              <th>Natureza</th>
              <th>Motivos</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            ${pendentes.map(adv => `
              <tr>
                <td>${fmtData(adv.data)}</td>
                <td>${adv.aluno}</td>
                <td>${[adv.serie, adv.turma].filter(Boolean).join(' / ') || '—'}</td>
                <td>${adv.natureza || '—'}</td>
                <td>${(adv.motivos || []).join(', ') || '—'}</td>
                <td><button class="btn-success btn-small" onclick="advDarBaixaAssinatura(${adv.id})">✅ Dar baixa</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      atualizarBadgePendenciasAssinatura();
    }

    function alertarPendenciasAssinaturaDiarias(){
      const pendentes = getAdvertenciasPendentesAssinatura();
      if(!pendentes.length) return;
      const hoje = new Date().toISOString().split('T')[0];
      const chave = 'ensps_alerta_assinaturas_data';
      if(localStorage.getItem(chave) === hoje) return;
      localStorage.setItem(chave, hoje);
      const nomes = [...new Set(pendentes.map(adv => adv.aluno))];
      const listaNomes = nomes.slice(0, 8).join('\n- ');
      const resto = nomes.length > 8 ? `\n- e mais ${nomes.length - 8} aluno(s)` : '';
      alert(`⚠️ Você tem ${pendentes.length} advertência(s) aguardando assinatura dos pais.\n\nAlunos para cobrar hoje:\n- ${listaNomes}${resto}`);
    }

    window.advDarBaixaAssinatura = function(id){
      const adv = advertenciasSalvas.find(item => item.id === id);
      if(!adv) return;
      adv.usaLinhasAssinatura = true;
      adv.pendenciaAssinatura = false;
      adv.assinaturaRecebidaEm = new Date().toISOString();
      sincronizarBancoPrincipal();
      renderPendenciasAssinatura();
      const btnBusca = document.getElementById('btnBuscarHist');
      const alunoHist = document.getElementById('alunoHist');
      if(btnBusca && alunoHist && alunoHist.value.trim().toUpperCase() === (adv.aluno || '').toUpperCase()) btnBusca.click();
    };

    function renderPreview(){
      const c = $("#docPreview");
      if(!c) return;
      c.innerHTML="";
      const escola = document.getElementById('viaEscola') && document.getElementById('viaEscola').checked;
      const pais   = document.getElementById('viaPais')   && document.getElementById('viaPais').checked;
      if(escola) c.appendChild(buildCopy("Via: Escola"));
      if(pais)   c.appendChild(buildCopy("Via: Pais"));
      if(!escola && !pais) c.appendChild(buildCopy(""));
    }

    const btnSalvarAdvertencia = document.getElementById('btnSalvarAdvertencia');
    if(btnSalvarAdvertencia){
      btnSalvarAdvertencia.addEventListener('click', function(){
        const alunoEl = $("#aluno");
        const dataEl = $("#data");
        if(!alunoEl || !dataEl){
          alert('Campos de advertência não encontrados.');
          return;
        }
        const multi = document.getElementById('modoMultiplos')?.checked;
        const aluno = alunoEl.value.trim();
        const data = dataEl.value;
        const natureza = $("#natureza") ? $("#natureza").value : "";
        const descricao = $("#descricao") ? $("#descricao").value.trim() : "";

        if((!multi && !aluno) || !data){
          alert('Preencha pelo menos aluno e data!');
          return;
        }

        if(multi && advMultiAlunos.length === 0){
          alert('Adicione pelo menos um aluno na lista de múltiplos alunos.');
          return;
        }

        const motivosMarcados = [];
        $$("#motivosBox input[type=checkbox]:checked").forEach(i=>motivosMarcados.push(i.value));

        const criarAdvertencia = (dadosAluno) => ({
          id: Date.now() + Math.floor(Math.random() * 1000),
          aluno: dadosAluno.nome,
          matricula: dadosAluno.matricula || "",
          serie: dadosAluno.serie || "",
          turma: dadosAluno.turma || "",
          turno: $("#turno") ? $("#turno").value : "",
          data,
          hora: $("#hora") ? $("#hora").value : "",
          natureza,
          motivos: motivosMarcados,
          descricao,
          responsavel: $("#responsavel") ? $("#responsavel").value : "",
          usaLinhasAssinatura: !!(document.getElementById('mostrarAssinaturas') && document.getElementById('mostrarAssinaturas').checked),
          pendenciaAssinatura: !!(document.getElementById('mostrarAssinaturas') && document.getElementById('mostrarAssinaturas').checked),
          assinaturaRecebidaEm: ""
        });

        const registrosParaSalvar = multi
          ? advMultiAlunos.map(a => criarAdvertencia(a))
          : [criarAdvertencia({
              nome: aluno,
              matricula: $("#matricula") ? $("#matricula").value : "",
              serie: $("#serie") ? $("#serie").value : "",
              turma: $("#turma") ? $("#turma").value : ""
            })];

        advertenciasSalvas.push(...registrosParaSalvar);
        sincronizarBancoPrincipal();
        renderPendenciasAssinatura();

        alert(multi
          ? `✅ ${registrosParaSalvar.length} advertência(s) salva(s) com sucesso!`
          : '✅ Advertência salva com sucesso!');
      });
    }

    async function exportPNGAdvertencia(){
      if(!window.html2canvas) return;
      const cont = $("#docPreview");
      if(!cont) return;
      const canvas = await html2canvas(cont,{scale:2});
      canvas.toBlob(b=>{
        const a=document.createElement("a");
        a.href=URL.createObjectURL(b);
        a.download="advertencia.png";
        a.click();
      });
    }

    // =========================
    // MÚLTIPLOS ALUNOS - ADVERTÊNCIA
    // =========================
    let advMultiAlunos = []; // [{nome, matricula, serie, turma}]

    // Populate multi datalist
    (function() {
      const dl = document.getElementById('alunosListMulti');
      if(dl) alunosDB.forEach(a => {
        const o = document.createElement('option'); o.value = a.nome; dl.appendChild(o);
      });
    })();

    function advToggleModoMultiplos() {
      const multi = document.getElementById('modoMultiplos').checked;
      document.getElementById('adv-multi-lista').style.display  = multi ? 'block' : 'none';
      document.getElementById('adv-aluno-single').style.display = multi ? 'none'  : '';
      document.getElementById('adv-multi-count').style.display  = multi ? 'inline' : 'none';
      document.getElementById('btnImprimir').style.display       = multi ? 'none'  : '';
      document.getElementById('btnImprimirMulti').style.display  = multi ? ''      : 'none';
      document.getElementById('btnBaixarPDF').style.display      = multi ? 'none'  : '';
      document.getElementById('btnBaixarPDFMulti').style.display = multi ? ''      : 'none';
      advAtualizarTagsPreview();
    }

    function advAdicionarMulti() {
      const input = document.getElementById('adv-multi-input');
      const nome  = input.value.trim().toUpperCase();
      if(!nome) return;
      const aluno = alunosDB.find(a => a.nome.toUpperCase() === nome);
      if(!aluno) { alert('Aluno não encontrado no banco de dados.'); return; }
      if(advMultiAlunos.find(a => a.nome === aluno.nome)) { input.value=''; return; }
      advMultiAlunos.push(aluno);
      input.value = '';
      advAtualizarTagsPreview();
    }

    // Allow Enter key on multi input
    document.getElementById('adv-multi-input').addEventListener('keydown', function(e){
      if(e.key === 'Enter') { e.preventDefault(); advAdicionarMulti(); }
    });

    function advAtualizarTagsPreview() {
      const container = document.getElementById('adv-multi-tags');
      const count     = document.getElementById('adv-multi-count');
      container.innerHTML = '';
      advMultiAlunos.forEach((a, i) => {
        const tag = document.createElement('div');
        tag.style.cssText = 'display:flex;align-items:center;gap:4px;background:var(--brand);color:#fff;border-radius:20px;padding:2px 10px 2px 8px;font-size:.75rem;font-weight:600;';
        tag.innerHTML = `<span>${a.nome}</span><button type="button" onclick="advRemoverMulti(${i})" style="background:none;border:none;color:#fff;cursor:pointer;font-size:.9rem;padding:0;margin-left:2px;line-height:1;">×</button>`;
        container.appendChild(tag);
      });
      count.textContent = advMultiAlunos.length > 0 ? `${advMultiAlunos.length} aluno(s) adicionado(s)` : '';
      // Update preview with first aluno
      if(advMultiAlunos.length > 0) {
        const a = advMultiAlunos[0];
        document.getElementById('aluno').value    = a.nome;
        document.getElementById('matricula').value = a.matricula;
        document.getElementById('serie').value     = a.serie;
        document.getElementById('turma').value     = a.turma;
        renderPreview();
      }
    }

    function advRemoverMulti(i) {
      advMultiAlunos.splice(i, 1);
      advAtualizarTagsPreview();
      if(advMultiAlunos.length === 0) renderPreview();
    }

    function advExecutarImpressao(onAfterPrint) {
      const styleId = 'adv-print-page-style';
      let style = document.getElementById(styleId);
      if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        style.media = 'print';
        style.textContent = '@page { size: A4 portrait; margin: 0 !important; }';
        document.head.appendChild(style);
      }

      let cleaned = false;
      const cleanup = () => {
        if (cleaned) return;
        cleaned = true;
        const liveStyle = document.getElementById(styleId);
        if (liveStyle) liveStyle.remove();
        if (typeof onAfterPrint === 'function') onAfterPrint();
      };

      window.addEventListener('afterprint', cleanup, { once: true });
      window.print();
      setTimeout(cleanup, 1500);
    }

    function advMontarPreviewTodos() {
      if(advMultiAlunos.length === 0) { alert('Adicione pelo menos um aluno.'); return null; }
      const c        = $('#docPreview');
      const escola   = document.getElementById('viaEscola').checked;
      const pais     = document.getElementById('viaPais').checked;
      const origNome = document.getElementById('aluno').value;
      const origMat  = document.getElementById('matricula').value;
      const origSerie= document.getElementById('serie').value;
      const origTurma= document.getElementById('turma').value;

      c.innerHTML = '';
      advMultiAlunos.forEach((a, idx) => {
        document.getElementById('aluno').value     = a.nome;
        document.getElementById('matricula').value = a.matricula;
        document.getElementById('serie').value     = a.serie;
        document.getElementById('turma').value     = a.turma;
        const isLast = idx === advMultiAlunos.length - 1;

        if(escola) {
          const d = buildCopy('Via: Escola');
          const w = document.createElement('div');
          w.className = 'adv-page-wrap';
          if(!isLast || pais) w.style.pageBreakAfter = 'always';
          w.appendChild(d);
          c.appendChild(w);
        }
        if(pais) {
          const d = buildCopy('Via: Pais');
          const w = document.createElement('div');
          w.className = 'adv-page-wrap';
          if(!isLast) w.style.pageBreakAfter = 'always';
          w.appendChild(d);
          c.appendChild(w);
        }
      });

      document.getElementById('aluno').value     = origNome;
      document.getElementById('matricula').value = origMat;
      document.getElementById('serie').value     = origSerie;
      document.getElementById('turma').value     = origTurma;
      return c;
    }

    function advImprimirTodos() {
      const preview = advMontarPreviewTodos();
      if(!preview) return;
      advExecutarImpressao(() => renderPreview());
    }

    async function advBaixarTodosPDF() {
      const preview = advMontarPreviewTodos();
      if(!preview) return;
      try {
        await pdfBaixarBloco(preview, 'advertencias_multiplas.pdf', 0, { a4Doc: true });
      } finally {
        renderPreview();
      }
    }

        const btnAtualizar = $("#btnAtualizar");
    if(btnAtualizar) btnAtualizar.onclick = ()=>renderPreview();

    const btnImprimir = $("#btnImprimir");
    if(btnImprimir) btnImprimir.onclick = ()=>{renderPreview(); advExecutarImpressao();};

    const btnBaixarPDF = $("#btnBaixarPDF");
    if(btnBaixarPDF) btnBaixarPDF.onclick = async ()=>{renderPreview(); await pdfBaixarBloco(document.getElementById('docPreview'), 'advertencia_escolar.pdf', 0, { a4Doc: true });};

    const btnPNG = $("#btnPNG");
    if(btnPNG) btnPNG.onclick = ()=>{renderPreview(); exportPNGAdvertencia();};

    refreshMotivosBox();
    renderPreview();

    const motivosBox = $("#motivosBox");
    if(motivosBox) motivosBox.addEventListener("change",()=>renderPreview());
    const descEl = $("#descricao");
    if(descEl) descEl.addEventListener("input",()=>renderPreview());
    $$("#aluno,#serie,#turma,#turno,#data,#natureza").forEach(i=>i.addEventListener("input",renderPreview));

    // =========================
    // RELATÓRIO PEDAGÓGICO + TÓPICOS PRONTOS
    // =========================
    let contadorRespostas = 1;
    let logoRelatorioDataUrl = "https://raw.githubusercontent.com/ciliocavalcante-design/ensps/main/LOGO%20ENSPS%202024.5.png";

    const perguntasPadrao = [
      {
        label: "Desatenção e Erros",
        nao: "• Apresenta atenção adequada, minimizando erros por descuido durante as atividades propostas.",
        sim: "• Demonstra desatenção frequente, resultando em erros e omissões por descuido nas tarefas.",
        name: "q1"
      },
      {
        label: "Dificuldade de Concentração",
        nao: "• Mantém foco nas atividades, mesmo diante de possíveis distrações ao redor.",
        sim: "• Enfrenta dificuldade para manter a concentração nas tarefas, facilmente se dispersando no ambiente escolar.",
        name: "q2"
      },
      {
        label: "Desatenção ao Ser Abordado",
        nao: "• Responde de forma atenta e receptiva quando é chamado ou direcionado pela equipe escolar.",
        sim: "• Frequentemente não percebe ou demora a responder ao ser chamado ou abordado por professores.",
        name: "q3"
      },
      {
        label: "Dificuldade de Seguir Instruções",
        nao: "• Compreende e segue orientações e rotinas propostas com autonomia.",
        sim: "• Apresenta dificuldade em compreender e cumprir rotinas e instruções, necessitando de acompanhamento constante.",
        name: "q4"
      },
      {
        label: "Problemas de Organização",
        nao: "• Organiza de maneira satisfatória seu material, tarefas e espaço escolar.",
        sim: "• Apresenta desorganização frequente com seus pertences e materiais, impactando seu rendimento.",
        name: "q5"
      },
      {
        label: "Resistência a Tarefas Prolongadas",
        nao: "• Executa tarefas prolongadas com persistência, mesmo diante de desafios.",
        sim: "• Demonstra resistência ou cansaço ao realizar tarefas que demandam tempo e continuidade.",
        name: "q6"
      },
      {
        label: "Facilidade de Distração",
        nao: "• Consegue concentrar-se mesmo com estímulos externos no ambiente.",
        sim: "• Mostra-se facilmente distraído(a) por estímulos do ambiente ou interações paralelas.",
        name: "q7"
      },
      {
        label: "Esquecimento",
        nao: "• Lembra-se de suas responsabilidades e compromissos escolares com regularidade.",
        sim: "• Demonstra esquecimento frequente de atividades, materiais ou recados importantes.",
        name: "q8"
      },
      {
        label: "Respostas Abruptas",
        nao: "• Responde de maneira respeitosa e adequada em situações cotidianas.",
        sim: "• Apresenta respostas abruptas ou inadequadas quando interpelado(a), podendo soar ríspido(a).",
        name: "q9"
      },
      {
        label: "Dificuldade em Esperar a Vez",
        nao: "• Aguarda com paciência sua vez em filas, brincadeiras e atividades de grupo.",
        sim: "• Demonstra impaciência ou ansiedade, tendo dificuldade para esperar sua vez em diferentes situações.",
        name: "q10"
      },
      {
        label: "Irritabilidade",
        nao: "• Lida bem com frustrações, demonstrando equilíbrio emocional.",
        sim: "• Apresenta irritabilidade em situações de frustração ou quando contrariado(a).",
        name: "q11"
      },
      {
        label: "Relacionamento com Colegas",
        nao: "• Relaciona-se de forma harmoniosa e cooperativa com os colegas.",
        sim: "• Demonstra dificuldades de socialização, podendo se envolver em conflitos ou se isolar.",
        name: "q12"
      },
      {
        label: "Adaptação a Mudanças de Rotina",
        nao: "• Adapta-se bem a mudanças e novos comandos no ambiente escolar.",
        sim: "• Enfrenta dificuldades diante de alterações de rotina, mostrando resistência ou desorganização.",
        name: "q13"
      },
      {
        label: "Iniciativa nas Atividades",
        nao: "• Demonstra iniciativa para iniciar e concluir tarefas com autonomia.",
        sim: "• Necessita de incentivo constante para começar ou finalizar atividades.",
        name: "q14"
      },
      {
        label: "Cumprimento de Regras",
        nao: "• Cumpre as regras estabelecidas, respeitando combinados e limites.",
        sim: "• Apresenta dificuldades em cumprir regras, necessitando de orientações frequentes.",
        name: "q15"
      }
    ];

    function renderizarTopicos(){
      const container = document.getElementById('topicosContainer');
      if(!container) return;
      container.innerHTML = '';
      perguntasPadrao.forEach(pergunta => {
        const div = document.createElement('div');
        div.className = 'topico-item';
        div.innerHTML = `
          <label>${pergunta.label}</label>
          <div class="topico-opcoes">
            <label>
              <input type="radio" name="${pergunta.name}" value="nao" />
              <span>Não</span>
            </label>
            <label>
              <input type="radio" name="${pergunta.name}" value="sim" />
              <span>Sim</span>
            </label>
            <label>
              <input type="radio" name="${pergunta.name}" value="" checked />
              <span style="color:var(--muted)">Não incluir</span>
            </label>
          </div>
        `;
        container.appendChild(div);
      });
    }

    const btnAddSelecionados = document.getElementById('btnAdicionarSelecionados');
    if(btnAddSelecionados){
      btnAddSelecionados.addEventListener('click', function(){
        const container = document.getElementById('respostasContainer');
        if(!container) return;

        let adicionados = 0;

        perguntasPadrao.forEach(pergunta => {
          const selecionado = document.querySelector(`input[name="${pergunta.name}"]:checked`)?.value;
          if(selecionado === 'sim' || selecionado === 'nao'){
            const texto = selecionado === 'sim' ? pergunta.sim : pergunta.nao;
            const div = document.createElement('div');
            div.className = 'resposta-item';
            div.dataset.index = contadorRespostas;
            div.innerHTML = `
              <label>Tópico / Pergunta</label>
              <input type="text" class="resposta-titulo" value="${pergunta.label}" />
              <label>Resposta / Observação</label>
              <textarea class="resposta-texto">${texto}</textarea>
              <button type="button" class="btn-danger btn-small" onclick="removerResposta(${contadorRespostas})" style="margin-top:8px">🗑️ Remover</button>
            `;
            container.appendChild(div);
            contadorRespostas++;
            adicionados++;
          }
        });

        if(adicionados > 0){
          alert(`✅ ${adicionados} tópico(s) adicionado(s) ao relatório!`);
          renderRelatorioPreview();
          perguntasPadrao.forEach(p => {
            const radio = document.querySelector(`input[name="${p.name}"][value=""]`);
            if(radio) radio.checked = true;
          });
        } else {
          alert('⚠️ Selecione pelo menos um tópico (Sim ou Não).');
        }
      });
    }

    // Logo do relatório carregada automaticamente do GitHub

    const btnAddResposta = document.getElementById('btnAddResposta');
    if(btnAddResposta){
      btnAddResposta.addEventListener('click', function(){
        const container = document.getElementById('respostasContainer');
        if(!container) return;
        const div = document.createElement('div');
        div.className = 'resposta-item';
        div.dataset.index = contadorRespostas;
        div.innerHTML = `
          <label>Tópico / Pergunta</label>
          <input type="text" class="resposta-titulo" placeholder="Ex: Desempenho em Matemática" />
          <label>Resposta / Observação</label>
          <textarea class="resposta-texto" placeholder="Descreva aqui..."></textarea>
          <button type="button" class="btn-danger btn-small" onclick="removerResposta(${contadorRespostas})" style="margin-top:8px">🗑️ Remover</button>
        `;
        container.appendChild(div);
        contadorRespostas++;
        renderRelatorioPreview();
      });
    }

    window.removerResposta = function(index){
      const item = document.querySelector(`.resposta-item[data-index="${index}"]`);
      if(item) item.remove();
      renderRelatorioPreview();
    };

    function renderRelatorioPreview(){
      const preview = document.getElementById('docRelatorioPreview');
      if(!preview) return;
      const aluno = document.getElementById('alunoRelatorio') ? (document.getElementById('alunoRelatorio').value || '—') : '—';
      const serie = document.getElementById('serieRelatorio') ? (document.getElementById('serieRelatorio').value || '—') : '—';
      const ensino = document.getElementById('ensinoRelatorio') ? (document.getElementById('ensinoRelatorio').value || '—') : '—';
      const data = document.getElementById('dataRelatorio') ? (document.getElementById('dataRelatorio').value || '') : '';
      const escola = "ESCOLA NOSSA SENHORA DO PERPÉTUO SOCORRO";
      const exibirAssinaturaRelatorio = !!(document.getElementById('mostrarAssinaturaRelatorio') && document.getElementById('mostrarAssinaturaRelatorio').checked);
      const ocultarDirecaoRelatorio = !!(document.getElementById('ocultarDirecaoRelatorio') && document.getElementById('ocultarDirecaoRelatorio').checked);
      const assinaturaRelatorioHtml = exibirAssinaturaRelatorio
        ? `<img class="signature-image signature-image-rel" src="${assinaturaRelatorioUrl}" alt="Assinatura do relatório">`
        : '';

      const respostas = [];
      document.querySelectorAll('.resposta-item').forEach(item => {
        const titulo = item.querySelector('.resposta-titulo').value.trim();
        const texto = item.querySelector('.resposta-texto').value.trim();
        if(titulo || texto){
          respostas.push({titulo, texto});
        }
      });

      let respostasHTML = '';
      respostas.forEach((r, idx) => {
        respostasHTML += `
          <div style="margin-top:20px">
            <div class="section-title">${r.titulo || `Tópico ${idx + 1}`}</div>
            <div style="white-space:pre-wrap; line-height:1.6; margin-top:8px">${r.texto}</div>
          </div>
        `;
      });

      preview.innerHTML = `
        <div class="doc relatorio-doc" style="margin-top:0">
          <header>
            ${logoRelatorioDataUrl ? `<img class="logo" src="${logoRelatorioDataUrl}">` : ''}
            <div>
              <h3>${escola}</h3>
              <span class="endereco-fixo">${enderecoFixo}</span>
              <span class="endereco-fixo relatorio-meta-linha">RESOLUÇÃO: 486/2020 &nbsp;|&nbsp; CNPJ:&nbsp;04.670.359/0001-27 &nbsp;|&nbsp; INEP:&nbsp;23076259</span>
            </div>
            <div style="margin-left:auto;text-align:right">
              <small>Relatório Pedagógico</small>
            </div>
          </header>

          <h2>Relatório Pedagógico Individual</h2>

          <div class="kv"><strong>Aluno(a):</strong> ${aluno}</div>
          <div class="kv"><strong>Ano/Série:</strong> ${serie}</div>
          <div class="kv"><strong>Ensino:</strong> ${ensino}</div>
          <div class="kv"><strong>Data:</strong> ${fmtData(data)}</div>

          ${respostasHTML}

          <div class="signs ${ocultarDirecaoRelatorio ? 'signs-single' : ''}">
            <div class="sign-slot">${assinaturaRelatorioHtml}<div class="line">Professor(a) / Coordenador(a)</div></div>
            ${ocultarDirecaoRelatorio ? '' : '<div class="sign-slot"><div class="line">Direção</div></div>'}
          </div>

          <div class="adv-data-extenso">${linhaCidadeData(cidadeFixa, data)}</div>
        </div>
      `;
    }

    const btnAtualizarRel = document.getElementById('btnAtualizarRelatorio');
    if(btnAtualizarRel) btnAtualizarRel.addEventListener('click', renderRelatorioPreview);

    const btnImprimirRel = document.getElementById('btnImprimirRelatorio');
    if(btnImprimirRel) btnImprimirRel.addEventListener('click', function(){
      renderRelatorioPreview();
      advExecutarImpressao();
    });

    const btnBaixarPDFRel = document.getElementById('btnBaixarPDFRelatorio');
    if(btnBaixarPDFRel) btnBaixarPDFRel.addEventListener('click', async function(){
      renderRelatorioPreview();
      await pdfBaixarBloco(document.getElementById('docRelatorioPreview'), 'relatorio_pedagogico.pdf', 0, { a4Doc: true });
    });

    const btnPNGRel = document.getElementById('btnGerarPNGRelatorio');
    if(btnPNGRel){
      btnPNGRel.addEventListener('click', async function(){
        if(!window.html2canvas) return;
        renderRelatorioPreview();
        const cont = document.getElementById('docRelatorioPreview');
        const canvas = await html2canvas(cont, {scale: 2});
        canvas.toBlob(b => {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(b);
          a.download = 'relatorio_pedagogico.png';
          a.click();
        });
      });
    }

    const alunoRelEl = document.getElementById('alunoRelatorio');
    if(alunoRelEl) alunoRelEl.addEventListener('input', renderRelatorioPreview);
    const ensinoRelEl = document.getElementById('ensinoRelatorio');
    if(ensinoRelEl) ensinoRelEl.addEventListener('change', renderRelatorioPreview);
    const dataRelEl = document.getElementById('dataRelatorio');
    if(dataRelEl) dataRelEl.addEventListener('change', renderRelatorioPreview);
    const respContainer = document.getElementById('respostasContainer');
    if(respContainer) respContainer.addEventListener('input', renderRelatorioPreview);

    renderizarTopicos();
    renderRelatorioPreview();
    renderPendenciasAssinatura();
    setTimeout(alertarPendenciasAssinaturaDiarias, 900);

    // =========================
    // HISTÓRICO
    // =========================
    const btnBuscarHist = document.getElementById('btnBuscarHist');
    if(btnBuscarHist){
      btnBuscarHist.addEventListener('click', function(){
        const input = document.getElementById('alunoHist');
        if(!input){
          alert('Campo de busca não encontrado.');
          return;
        }
        const nomeAluno = input.value.trim().toUpperCase();

        if(!nomeAluno){
          alert('Digite o nome do aluno!');
          return;
        }

        const freqAluno = registrosFrequencia.filter(r => 
          r.aluno.toUpperCase() === nomeAluno
        );

        const advAluno = advertenciasSalvas.filter(a =>
          a.aluno.toUpperCase() === nomeAluno
        );

        const faltas = freqAluno.filter(r => r.status === 'falta').length;
        const segundaChamada = freqAluno.filter(r => r.status === 'segunda-chamada').length;
        const justificadas = freqAluno.filter(r => r.status === 'justificada').length;
        const semFardamento = freqAluno.filter(r => r.status === 'sem-fardamento').length;

        const statAdv = document.getElementById('statAdvertencias');
        const statFaltas = document.getElementById('statFaltas');
        const statSegundaChamada = document.getElementById('statSegundaChamada');
        const statJust = document.getElementById('statJustificadas');
        const statSF = document.getElementById('statSemFardamento');
        if(statAdv) statAdv.textContent = advAluno.length;
        if(statFaltas) statFaltas.textContent = faltas;
        if(statSegundaChamada) statSegundaChamada.textContent = segundaChamada;
        if(statJust) statJust.textContent = justificadas;
        if(statSF) statSF.textContent = semFardamento;

        const statsContainer = document.getElementById('statsContainer');
        const histDetalhes = document.getElementById('historicoDetalhes');
        if(statsContainer) statsContainer.style.display = 'grid';
        if(histDetalhes) histDetalhes.style.display = 'block';

        const conteudo = document.getElementById('historicoConteudo');
        if(!conteudo) return;
        conteudo.innerHTML = '';

        if(advAluno.length > 0){
          conteudo.innerHTML += '<h3>Advertências</h3>';
          const table = document.createElement('table');
          table.innerHTML = `
            <thead>
              <tr>
                <th>Data</th>
                <th>Natureza</th>
                <th>Motivos</th>
                <th>Assinatura</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody></tbody>
          `;

          advAluno.forEach(adv => {
            const statusAssinatura = adv.pendenciaAssinatura
              ? '<span class="badge badge-pendente-assinatura">Enviada (pendente)</span>'
              : (adv.usaLinhasAssinatura
                  ? '<span class="badge badge-presente">Recebida / com assinatura</span>'
                  : '<span class="badge badge-presente">Recebida / sem assinatura</span>');
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${fmtData(adv.data)}</td>
              <td>${adv.natureza}</td>
              <td>${adv.motivos.join(', ') || '—'}</td>
              <td>${statusAssinatura}</td>
              <td>
                ${adv.pendenciaAssinatura ? `<button class="btn-success btn-small" onclick="advDarBaixaAssinatura(${adv.id})">✅</button>` : ''}
                <button class="btn-danger btn-small" onclick="excluirAdvertencia(${adv.id})">🗑️</button>
              </td>
            `;
            table.querySelector('tbody').appendChild(tr);
          });

          conteudo.appendChild(table);
        }

        if(freqAluno.length > 0){
          conteudo.innerHTML += '<h3 style="margin-top:24px">Registros de Frequência</h3>';
          const table = document.createElement('table');
          table.innerHTML = `
            <thead>
              <tr>
                <th>Data</th>
                <th>Status</th>
                <th>Justificativa</th>
              </tr>
            </thead>
            <tbody></tbody>
          `;

          freqAluno.sort((a,b) => new Date(b.data) - new Date(a.data)).forEach(reg => {
            const tr = document.createElement('tr');
            let badgeClass, statusText;
            if(reg.status === 'presente'){
              badgeClass = 'badge-presente'; statusText = 'Presente';
            } else if(reg.status === 'falta'){
              badgeClass = 'badge-falta'; statusText = 'Falta';
            } else if(reg.status === 'segunda-chamada'){
              badgeClass = 'badge-segunda-chamada'; statusText = '2ª Chamada';
            } else if(reg.status === 'justificada'){
              badgeClass = 'badge-justificada'; statusText = 'Justificada';
            } else {
              badgeClass = 'badge-sem-fardamento'; statusText = 'Presente (sem fardamento)';
            }

            tr.innerHTML = `
              <td>${fmtData(reg.data)}</td>
              <td><span class="badge ${badgeClass}">${statusText}</span></td>
              <td>${reg.justificativa || '—'}</td>
            `;
            table.querySelector('tbody').appendChild(tr);
          });

          conteudo.appendChild(table);
        }

        if(advAluno.length === 0 && freqAluno.length === 0){
          conteudo.innerHTML = '<p class="muted">Nenhum registro encontrado para este aluno.</p>';
        }
      });
    }

    window.excluirAdvertencia = function(id){
      if(confirm('Deseja realmente excluir esta advertência?')){
        advertenciasSalvas = advertenciasSalvas.filter(a => a.id !== id);
        sincronizarBancoPrincipal();
        renderPendenciasAssinatura();
        alert('✅ Advertência excluída!');
        const btn = document.getElementById('btnBuscarHist');
        if(btn) btn.click();
      }
    };

    const alunosListFiltroSegundaChamada = document.getElementById('alunosListFiltroSegundaChamada');
    if(alunosListFiltroSegundaChamada){
      alunosListFiltroSegundaChamada.innerHTML = '';
      alunosDB.forEach(aluno => {
        const option = document.createElement('option');
        option.value = aluno.nome;
        alunosListFiltroSegundaChamada.appendChild(option);
      });
    }

    // =========================
    // DASHBOARD DO GESTOR
    // =========================
    const dashboardCollapseStateKey = 'ensps-dashboard-collapse-state';
    const dashboardCollapseDefaults = {
      top10AdvertenciasContainer: false,
      top10FaltasContainer: false,
      segundaChamadaContainer: true,
      relatorioSegundaChamadaContainer: true
    };

    function carregarEstadoColapsadoDashboard(){
      try {
        return JSON.parse(localStorage.getItem(dashboardCollapseStateKey) || '{}');
      } catch (error) {
        return {};
      }
    }

    function salvarEstadoColapsadoDashboard(state){
      try {
        localStorage.setItem(dashboardCollapseStateKey, JSON.stringify(state));
      } catch (error) {
        // Ignora falhas de armazenamento para nao quebrar a interface.
      }
    }

    function atualizarBotaoColapsavel(botao, expandido){
      if(!botao) return;
      botao.setAttribute('aria-expanded', String(expandido));
      const label = botao.querySelector('.collapse-toggle-label');
      if(label) label.textContent = expandido ? 'Recolher' : 'Expandir';
    }

    function definirEstadoColapsavelDashboard(targetId, expandido){
      const conteudo = document.getElementById(targetId);
      const botao = document.querySelector(`.collapse-toggle[data-target="${targetId}"]`);
      if(!conteudo || !botao) return;

      conteudo.classList.toggle('is-collapsed', !expandido);
      conteudo.setAttribute('aria-hidden', String(!expandido));
      atualizarBotaoColapsavel(botao, expandido);

      const state = carregarEstadoColapsadoDashboard();
      state[targetId] = expandido;
      salvarEstadoColapsadoDashboard(state);
    }

    function inicializarCardsColapsaveisDashboard(){
      const state = carregarEstadoColapsadoDashboard();
      document.querySelectorAll('.collapse-toggle[data-target]').forEach(botao => {
        const targetId = botao.dataset.target;
        const expandido = Object.prototype.hasOwnProperty.call(state, targetId)
          ? state[targetId]
          : dashboardCollapseDefaults[targetId] !== false;

        botao.onclick = () => {
          const estaExpandido = botao.getAttribute('aria-expanded') === 'true';
          definirEstadoColapsavelDashboard(targetId, !estaExpandido);
        };

        definirEstadoColapsavelDashboard(targetId, expandido);
      });
    }

    function atualizarDashboardGestor(){
      const totalAlunosEl = document.getElementById('totalAlunos');
      const totalAdvEl = document.getElementById('totalAdvertencias');
      const totalFaltasEl = document.getElementById('totalFaltas');
      const totalSegundaChamadaEl = document.getElementById('totalSegundaChamada');
      if(totalAlunosEl) totalAlunosEl.textContent = alunosDB.length;
      if(totalAdvEl) totalAdvEl.textContent = advertenciasSalvas.length;
      if(totalFaltasEl) totalFaltasEl.textContent = registrosFrequencia.filter(r => r.status === 'falta').length;
      if(totalSegundaChamadaEl) totalSegundaChamadaEl.textContent = registrosFrequencia.filter(r => r.status === 'segunda-chamada').length;

      const estatisticasAlunos = {};

      alunosDB.forEach(aluno => {
        const faltas = registrosFrequencia.filter(r => 
          r.aluno === aluno.nome && r.status === 'falta'
        ).length;

        const advertencias = advertenciasSalvas.filter(a =>
          a.aluno === aluno.nome
        ).length;

        if(faltas > 0 || advertencias > 0){
          estatisticasAlunos[aluno.nome] = {
            serie: aluno.serie,
            faltas,
            advertencias
          };
        }
      });

      const top10Advertencias = Object.entries(estatisticasAlunos)
        .sort((a,b) => b[1].advertencias - a[1].advertencias || b[1].faltas - a[1].faltas)
        .slice(0, 10);

      const top10Faltas = Object.entries(estatisticasAlunos)
        .sort((a,b) => b[1].faltas - a[1].faltas || b[1].advertencias - a[1].advertencias)
        .slice(0, 10);

      const tbodyAdv = document.querySelector('#tabelaTop10Advertencias tbody');
      const tbodyFaltas = document.querySelector('#tabelaTop10Faltas tbody');
      if(!tbodyAdv || !tbodyFaltas) return;

      tbodyAdv.innerHTML = '';
      top10Advertencias.forEach(([nome, stats], idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${idx + 1}º</td>
          <td>${nome}</td>
          <td>${stats.serie}</td>
          <td><span class="badge badge-warning">${stats.advertencias}</span></td>
          <td><span class="badge badge-falta">${stats.faltas}</span></td>
        `;
        tbodyAdv.appendChild(tr);
      });

      if(top10Advertencias.length === 0){
        tbodyAdv.innerHTML = '<tr><td colspan="5" style="text-align:center" class="muted">Nenhum registro ainda</td></tr>';
      }

      tbodyFaltas.innerHTML = '';
      top10Faltas.forEach(([nome, stats], idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${idx + 1}º</td>
          <td>${nome}</td>
          <td>${stats.serie}</td>
          <td><span class="badge badge-falta">${stats.faltas}</span></td>
          <td><span class="badge badge-warning">${stats.advertencias}</span></td>
        `;
        tbodyFaltas.appendChild(tr);
      });

      if(top10Faltas.length === 0){
        tbodyFaltas.innerHTML = '<tr><td colspan="5" style="text-align:center" class="muted">Nenhum registro ainda</td></tr>';
      }

      renderTabelaSegundaChamadaPorDia();
      renderRelatorioSegundaChamada();
    }

    inicializarCardsColapsaveisDashboard();

    const btnRelatorioCompleto = document.getElementById('btnRelatorioCompleto');
    if(btnRelatorioCompleto){
      btnRelatorioCompleto.addEventListener('click', function(){
        let relatorio = 'RELATÓRIO COMPLETO - ENSPS\n';
        relatorio += '='.repeat(60) + '\n\n';
        relatorio += `Data de Geração: ${new Date().toLocaleString('pt-BR')}\n\n`;

        relatorio += `ESTATÍSTICAS GERAIS\n`;
        relatorio += `-`.repeat(60) + '\n';
        relatorio += `Total de Alunos: ${alunosDB.length}\n`;
        relatorio += `Total de Advertências: ${advertenciasSalvas.length}\n`;
        relatorio += `Total de Faltas Registradas: ${registrosFrequencia.filter(r => r.status === 'falta').length}\n`;
        relatorio += `Total de 2ª Chamada: ${registrosFrequencia.filter(r => r.status === 'segunda-chamada').length}\n`;
        relatorio += `Total de Faltas Justificadas: ${registrosFrequencia.filter(r => r.status === 'justificada').length}\n`;
        relatorio += `Total de Presenças sem Fardamento: ${registrosFrequencia.filter(r => r.status === 'sem-fardamento').length}\n\n`;

        const segundaChamadaPorDia = obterResumoSegundaChamadaPorDia();
        if(segundaChamadaPorDia.length){
          relatorio += `CONTROLE DE 2ª CHAMADA\n`;
          relatorio += `-`.repeat(60) + '\n';
          segundaChamadaPorDia.forEach(item => {
            relatorio += `${fmtData(item.data)} - total ${item.total} | pendentes ${item.pendentes} | realizaram ${item.realizadas} | zero ${item.zero}\n`;
          });
          relatorio += '\n';
        }

        relatorio += `ALUNOS COM MAIS FALTAS\n`;
        relatorio += `-`.repeat(60) + '\n';

        const estatisticas = {};
        alunosDB.forEach(aluno => {
          const faltas = registrosFrequencia.filter(r => 
            r.aluno === aluno.nome && r.status === 'falta'
          ).length;

          if(faltas > 0){
            estatisticas[aluno.nome] = {serie: aluno.serie, faltas};
          }
        });

        Object.entries(estatisticas)
          .sort((a,b) => b[1].faltas - a[1].faltas)
          .slice(0, 20)
          .forEach(([nome, stats]) => {
            relatorio += `${nome} (${stats.serie}) - ${stats.faltas} faltas\n`;
          });

        relatorio += `\n${'='.repeat(60)}\n`;
        relatorio += `Fim do Relatório\n`;

        baixarArquivo(relatorio, `relatorio_completo_${new Date().toISOString().split('T')[0]}.txt`, 'text/plain');
      });
    }

    const btnExpAdv = document.getElementById('btnExportarAdvertencias');
    if(btnExpAdv){
      btnExpAdv.addEventListener('click', function(){
        if(advertenciasSalvas.length === 0){
          alert('Nenhuma advertência registrada ainda.');
          return;
        }

        let csv = 'Data,Aluno,Matrícula,Série,Turma,Natureza,Motivos,Descrição,Responsável\n';

        advertenciasSalvas.forEach(adv => {
          const motivos = adv.motivos.join('; ').replace(/"/g, '""');
          const descricao = (adv.descricao || '').replace(/"/g, '""').replace(/\n/g, ' ');

          csv += `"${adv.data}","${adv.aluno}","${adv.matricula}","${adv.serie}","${adv.turma}",`;
          csv += `"${adv.natureza}","${motivos}","${descricao}","${adv.responsavel || ''}"\n`;
        });

        baixarArquivo(csv, `advertencias_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
      });
    }

    const btnExpFreqGeral = document.getElementById('btnExportarFrequenciaGeral');
    if(btnExpFreqGeral){
      btnExpFreqGeral.addEventListener('click', function(){
        if(registrosFrequencia.length === 0){
          alert('Nenhuma frequência registrada ainda.');
          return;
        }

        let csv = 'Data,Aluno,Série,Status,Justificativa\n';

        registrosFrequencia.forEach(reg => {
          const aluno = alunosDB.find(a => a.nome === reg.aluno);
          const serie = aluno ? aluno.serie : '';
          const just = (reg.justificativa || '').replace(/"/g, '""');

          csv += `"${reg.data}","${reg.aluno}","${serie}","${reg.status}","${just}"\n`;
        });

        baixarArquivo(csv, `frequencia_geral_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
      });
    }

    // =========================
    // INICIALIZAÇÃO FINAL
    // =========================
    const hoje = new Date().toISOString().split('T')[0];
    const dataAdv = document.getElementById('data');
    if(dataAdv) dataAdv.value = hoje;
    const dataRel = document.getElementById('dataRelatorio');
    if(dataRel) dataRel.value = hoje;

    atualizarDashboardGestor();
  
