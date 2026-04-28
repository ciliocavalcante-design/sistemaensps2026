// Módulo extraído de assets/js/index.js
// Mantém escopo global do sistema ENSPS 2026.

  // ============================================================
  // ABA 4 – PLANILHA DE NOTAS
  // ============================================================
  const PLAN_ANO         = 2026;
  const PLAN_NOME_COLEGIO = 'Escola Nossa Senhora do Perpétuo Socorro';
  const PLAN_LOGO_URL    = 'https://raw.githubusercontent.com/ciliocavalcante-design/ensps/main/LOGO%20ENSPS%202024.5.png';

  const PLAN_SERIES = {
    '6ano':'6º Ano EF','7ano':'7º Ano EF','8ano':'8º Ano EF','9ano':'9º Ano EF',
    'm1':'1º Ano EM','m2':'2º Ano EM','m3':'3º Ano EM'
  };

  const PLAN_ALUNOS = {
    '6ano': [
      'AGNES MARIA DE OLIVEIRA CARVALHO','ALICE CORDOVIL DOS SANTOS CARVALHO',
      'ANTONIO EDGAR ALVES DE ARAUJO','ANTONIO GUSTAVO FERREIRA COSTA',
      'BERNARD BRAZ QUEIROGA SABINO','BIANCA RIOS OLIVEIRA',
      'EDUARDO LEVY FERREIRA DA SILVA','EMILY SOUSA BRAGA','ESTHER MARTINS GADELHA',
      'JOAO LUCAS CAETANO CISNE','JOAO LUCAS MAIA ARAGAO',
      'JOAO MIGUEL DE ARAUJO MARÇAL LIMA','JOAO MIGUEL OLIVERIA BEZERRA',
      'JOSÉ FLAVIO BEZERRA LOPES FILHO','JOSE VICTOR GOMES VIANA PAES',
      'JULIO LEVI ABREU MIRANDA DA ROCHA','LAIS MONTE DAVID CERQUEIRA',
      'LIZ MARIA BEZERRA GOMES','MARIA ALICE CAVALCANTE LIMA',
      'MARIA CLARA DOS SANTOS NASCIMENTO','MARIA CLARA GOMES ABREU',
      'MARIA ELENA MENDONÇA MAGALHÃES','MARIA HELOISA MENESES DA ROCHA',
      'MARIA LIVIA SILVA DE ANDRADE','MARIA LUIZA DE FREITAS HOLANDA',
      'MARIA YASMIN SANTOS COSTA','MARIANA DE SOUZA FELIX','MIGUEL ARAUJO COELHO',
      'PAULO VICTOR CUSTODIO DE OLIVEIRA','RAFAEL HOLANDA BAIMA JUNIOR',
      'RAFAELA SILVA LOBO','RAYZON DE AMORIM MONTE','REBEKA BRISENO FERREIRA',
      'SOPHIA MARIAH FERREIRA DO NASCIMENTO','VALENTINA LIMA FERREIRA GOMES',
      'VINICIUS DAMASCENO RODRIGUES','YASMIN SOUZA BARROS'
    ],
    '7ano': [
      'ABINER SOARES BRAGA','ALEXIA MARIA SOUSA','ANA CECILIA CAVALCANTE PONTES',
      'ANA LETICIA NOGUEIRA DO CARMO','ANA LETICIA RIBEIRO OLIVEIRA',
      'ANA LUIZA OLIVEIRA CAVALCANTE','ANA SOPHIA ANASTACIO DE ABREU',
      'ANA VITORIA FERREIRA DE ALMEIDA','BIANCA BESSA DE QUEIROZ',
      'BIANCA VIEIRA MENDES','CARLOS EDUARDO ALENCAR COSTA','DAVI DE OLIVEIRA COSTA',
      'EDUARDO HERBERTE CORREIA DE ALENCAR','EMILLY OLIVEIRA GOMES',
      'ESTHER PEREIRA DA SILVA SIQUEIRA','FELIPE ROCHA CAVALCANTE',
      'FRANCISCO ODONOR PINHEIRO MARTINS','GIDEAO DOS SANTOS SAMPAIO',
      'GUSTAVO CORREIA MACIEL','GUSTAVO PINHEIRO MOREIRA','HIARLEY DUÓ DA SILVA',
      'JOAO ARTHUR ALVES MARTINS','JOAO LEVI MESQUITA ROCHA','JOAO LUCAS CUNHA VIANA',
      'JULIA ALMEIDA CARVALHO','LARA DE OLIVEIRA COLARES','LAURA LISE ARAUJO FREITAS',
      'LIVIA DE LIMA NOGUEIRA','LUCAS GABRIEL BRITO DE MOURA','LUCAS GONÇALVES MARTINS',
      'MARCIO MIGUEL LIMA SARAIVA','MARIA ALICE MENEZES DA ROCHA',
      'MARIA BIANKA VIANA BRASIL','MARIA LETICIA MARQUES VASCONCELOS',
      'MARIA MEL LIMA VASCONCEOS','MARIA VITORIA DE SOUSA BASTOS',
      'MARIANA BARROSO DE OLIVEIRA','MARINA SOARES ABREU','MELINA MARIA SANTOS DA SILVA',
      'MELISSA NASCIMENTO DE SOUSA','MIGUEL APOLLO CORREIA CAVALCANTE',
      'MIGUEL ALVES FREITAS','MIGUEL DO NASCIMENTO AGUIAR','PEDRO IAN RIBEIRO DA PAZ PERES',
      'PEDRO JORGE DA SILVA QUEIROZ DE ALMEIDA','PEDRO MIGUEL NASCIMENTO SOUSA'
    ],
    '8ano': [
      'ALEXANDRE GUILHERMINO MOREIRA MARQUES','ANA BEATRIZ DIAS CLEMENTE',
      'ANA CAROLINA LEAO FERREIRA PIRES','ANELIESE FERREIRA ALVES PEREIRA',
      'ANTONIO CAUE SILVEIRA BARBOZA','BENEDITO NOAN FEITOSA MONTEIRO',
      'CAIO AUDREY DE ALBUQUERQUE CASTRO','CAMILA MARIA SILVA LESSA',
      'CLARICE DE FREITAS MENESES NUNES','EMANUEL LOHAN SILVEIRA MARQUES',
      'EVELYN DE ALMEIDA ABREU','IAGO CAMOES BEZERRA DE SOUSA','ISABELLY SOUSA MARTINS',
      'JOAO LUCAS MARTINS DE QUEIROZ','JOSE GABRIEL SOUZA CLAUDIO',
      'LORENA DOMINGOS DE OLIVEIRA','LUCAS GABRIEL CASTRO ALBUQUERQUE LIMA',
      'LUIS GUSTAVO FONTENELE ALVES','LUIZ FERNANDO DA SILVA DO NASCIMENTO',
      'MARIA CLARA FARIAS AMORIM','MARIA EDUARDA TABOSA BRAGA',
      'MARIA JULIA RODRIGUES GOMES','MARIA LARA MESQUITA BELARMINO',
      'MARIA LUIZA DUARTE ANDRADE DOS SANTOS','MARIA LYVIA OLIVEIRA SOUZA',
      'MATEUS ARRAIS ALMEIDA','MIGUEL SILVA DO NASCIMENTO','MIGUEL VASCONCELOS FERNANDES',
      'MYKAELE RIBEIRO PEREIRA DOS SANTOS','NALU VIANA ALMEIDA MAIA',
      'PAULO CESAR DO NASCIMENTO RODRIGUES','PEDRO BENICIO DE OLIVEIRA LIMA',
      'PEDRO RICKSON DA COSTA ALMADA','PEDRO WILLIAM FAUSTINO ANASTACIO',
      'PIETRA DA SILVA SOUZA SUASSUNA','GIOVANA RIPARDO CORDEIRO VERÇOSA','RYAN ARAUJO DE LIRA','SAMUEL GOMES FREIRE',
      'SOPHIA AYLA MENDES BESSA','THAMYLLA GONÇALVES GAMA',
      'VITORIA JAMILLY RODRIGUES AGUIAR','YANNARA GONÇALVES BESERRA'
    ],
    '9ano': [
      'ALICE MARIA CRUZ LIMA','ANA CAROLINA CORREIA NOBRE PINHEIRO',
      'ANA ESTHER FERREIRA DOS SANTOS','ANA LIVIA MATIAS PINHEIRO',
      'ANDERSON DOS REIS CAVALCANTI','ANNA LIVIA BARROSO AZEVEDO',
      'ANTONIO MARQUES DOS SANTOS NETO','ARTHUR ABNER BARBOSA DA SILVA',
      'CATARYNE DIAS DE MACEDO','DANIEL MESQUITA DE OLIVEIRA',
      'DAVID ENZO MOREIRA ANDRADE','DEBORAH BRISENO FERREIRA',
      'FRANCISCO NILSON GOMES MARTINS NETO','IAN DA SILVA OLIVEIRA',
      'ISABELLE LOPES FERREIRA','JOSE KAEL OLIVEIRA PINHEIRO TAVARES',
      'LUCAS DOS SANTOS SAMPAIO','LUCAS EDUARDO RABELO ALVES',
      'LUIS OTAVIO COELHO DA SILVA','MARIA CLARA ARRAIS DO NASCIMENTO',
      'MARIA EDUARDA MOREIRA KLEN','MARIA EUGENIA TAVARES DE ALBUQUERQUE',
      'MARIA FERNANDA NASCIMENTO DA SILVA','MARIA HYLAIZ RIBEIRO DE ANDRADE',
      'MARIA JULIA CORREIA DE ALENCAR','MARIA JULIA FERREIRA DE SOUSA',
      'MARIA JULIA XIMENES BARROSO','MARIA LARA BRAZ SILVA','MARIA RITA ANTUNES FARIAS',
      'MARIANA DUARTE FERNANDES','PABLLO JHUAN MIGUEL ISIDORO',
      'PEDRO ANTONIO DA SILVA DE MORAIS','PEDRO ARTHUR BRAZ MARTINS',
      'RITA LAISE MILHOME CARRA TRAJANO','RUAN DE LIMA VIEIRA BARBOSA',
      'SOFIA OLIVEIRA DE CARVALHO','VICTOR GABRIEL CUSTODIO DE OLIVEIRA',
      'VICTOR KAUAN PEREIRA BARBOSA','VICTORIA LIMA FALCAO'
    ],
    'm1': [
      'ADRYEL LEITE RODRIGUES NUNES VIANA','ANA LIVIA NASCIMENTO FEITOSA',
      'ARIEL MELO PATRICIO','DAVIH MARIANO BARROS DE OLIVEIRA',
      'FERNANDA VIANA SA TEIXEIRA','ISADORA REBOUÇAS MILITÃO',
      'JAMILLY VITORIA RIBEIRO SILVA','JOAO VITOR MAIA ARAGAO',
      'JOSE THALYS FRAGA OLIVEIRA','KAYO JHEBERSON MAGALHAES SANTIAGO',
      'KLYSSIA DA SILVA BORGES','LARA CHRISTINE LIMA SALLES',
      'MAILY EVELY DOS SANTOS RIBEIRO','MARCIO WELLINGTON DA COSTA FILHO',
      'MARIA ISABEL DO NASCIMENTO BARBOSA','MARIA VITORIA BERNARDINO AGUIAR',
      'PEDRO VINICIUS BARROS LIMA','ROBERT DOUGLAS SAAD RODRIGUES FILHO',
      'SARA GABRIELE SILVA GOMES'
    ],
    'm2': [
      'ANA NICOLLY MEDEIROS MAIA','ANGELO VINICIUS LEITE SILVA FILHO',
      'ANITA GABRIELE SOARES MAGALHAES','BEATRIZ SOLANGE CHAVES MAGALHAES',
      'CAMILA MATOS NASCIMENTO','JAMES ALAN BARROS ALVES CAVALCANTE',
      'JOAO HENRIQUE FERNANDES PEREIRA','JUAN DAVY SOARES MACIEL',
      'KAUE NICOLAS FELIX NICOLAU','LAILA RIOS BRILHANTE','LANA NUNES DO NASCIMENTO',
      'LARISSA DIAS DUARTE','LARISSA DOS SANTOS ALCANTARA','LISLEY KATLYN MARTINS',
      'LIVIA IRIS RODRIGUES DE CASTRO','MARIA CLARA CAVALCANTE FRAGA',
      'MARIA JULIA DE ARAUJO CAVALCANTE','MARIANA DE FATIMA DE MATOS MESQUITA',
      'MOISES SOARES PESSOA NETO','NICOLLY SOUZA RABAY',
      'SAMUEL ANTONIO DE ABREU ALVES VIEIRA','SAMUEL FERNANDES DE OLIVEIRA',
      'SAYONARA EMILLY PEREIRA NERI','YAGO SA DE OLIVEIRA'
    ],
    'm3': [
      'ANA LETICIA GOMES FREIRE','ANNA CAROLINA QUEIROZ DE ARAUJO',
      'ARTHUR SILVA CAVALCANTE','ARTUR FERREIRA LOPES',
      'BRUNO VICTOR DE SOUSA CAVALCANTE','CARLOS ALBERTO DOS SANTOS GONÇALVES',
      'GABRIEL MARTINS ANDRADE','GABRIEL SILVA DE MOURA FREIRE',
      'GUILHERME DOS REIS CAVALCANTI','HEITOR LIMA MARTINS',
      'JOAO MARCELO RIOLO DA SILVA','LUIS FERNANDO CLAUDIO FERRO',
      'MARCOS VENICIOS SILVA FARIAS','MARIA CLARA PINTO RODRIGUES',
      'MARIA FERNANDA DE MESQUITA MENEZES','MARIA GABRIELA MADEIRO DE ALCANTARA',
      'MIRELLY EVELIN DA SILVA FERREIRA','NAYLA ARAUJO DE SOUSA',
      'OTAVIO MESSIAS PEREIRA GOMES','PEDRO HENRIQUE NASCIMENTO DE OLIVEIRA',
      'RAUAN DE AMORIM MONTE','REYNALDO DE ANIFA DOMINGOS FENIASSE',
      'RICARDO DA SILVA GONÇALVES FILHO','RYAN DELMAR SOUSA AUGUSTO ARISTOTELES',
      'RODRIGO DOS REIS GONDIM','SAULO MESQUITA ARAUJO','SILVIA CIBELE SILVA LIMA',
      'YASMIN LIMA FURTADO','YURI PEREIRA BARROSO'
    ]
  };

  const PLAN_TEACHERS = {
    'Helly':     ['Matemática 9º','Física 9º ao 3º','Trilha Física 3º'],
    'Jordan':    ['Gramática 1º ao 3º'],
    'Silânia':   ['Geografia 6º ao 9º','Trilha Geografia 3º','Biologia 9º'],
    'Amanda':    ['Química 1º ao 3º','Trilha Química 3º'],
    'Isadora':   ['Biologia 1º ao 3º','Trilha Biologia 1º ao 3º'],
    'Bruno':     ['Educação Física 6º ao 2º'],
    'Thamyres':  ['Laboratório de Redação 1º ao 3º','Literatura 1º ao 3º','Interpretação de Texto 1º ao 3º'],
    'Fabíola':   ['Filosofia 7º ao 3º','Sociologia 1º ao 3º','Projeto de Vida 2º'],
    'Diogo':     ['Matemática 1º ao 3º','Trilha Matemática 1º','Matemática Fundamental 1º'],
    'Márcia':    ['Gramática 6º ao 9º','LPT 6º e 7º','Paradidático 6º ao 9º'],
    'Rafaely':   ['Geografia 1º ao 3º'],
    'Elayne':    ['Ciências 6º ao 8º','Química 9º'],
    'Michael':   ['Inglês 6º ao 3º','Filosofia 6º','Trilha Linguagens 2º'],
    'Thayna':    ['LPT 8º e 9º','Literatura 1º'],
    'Alexandre': ['História 6º ao 3º'],
    'Eduardo':   ['Matemática 6º ao 8º'],
    'Ravena':    ['Redação 1º ao 3º']
  };

  function planExtrairFaixa(desc) {
    const m = desc.match(/(\d+º\s*(?:ao|e)\s*\d+º|\d+º)/);
    return m ? m[0].replace(/\s+/g,' ').trim() : '';
  }

  function planExtrairNome(desc) {
    const m = desc.match(/^(.+?)(\s*\d+º|$)/);
    return m ? m[1].trim() : desc.trim();
  }

  function planSeriesFromRange(txt) {
    txt = txt.trim();
    const map = {
      '6º ao 9º':['6ano','7ano','8ano','9ano'],
      '1º ao 3º':['m1','m2','m3'],
      '9º ao 3º':['9ano','m1','m2','m3'],
      '7º ao 3º':['7ano','8ano','9ano','m1','m2','m3'],
      '8º ao 3º':['8ano','9ano','m1','m2','m3'],
      '6º ao 3º':['6ano','7ano','8ano','9ano','m1','m2','m3'],
      '6º ao 8º':['6ano','7ano','8ano'],
      '6º ao 2º':['6ano','7ano','8ano','9ano','m1','m2'],
      '6º e 7º': ['6ano','7ano'],
      '8º e 9º': ['8ano','9ano'],
      '9º':['9ano'],'6º':['6ano'],'7º':['7ano'],'8º':['8ano'],
      '1º':['m1'],'2º':['m2'],'3º':['m3']
    };
    return map[txt] || [];
  }

  function planObterCapitulos(serie, etapa, modo) {
    if (modo === 'simples') return { rotulo:null, lista:[] };
    if (serie === 'm3') {
      const map = { '1':[1,2,3,4,5,6,7,8],'2':[9,10,11,12,13,14,15,16],'3':[17,18,19,20,21,22],'4':[23,24,25,26,27] };
      return { rotulo:'AULA', lista: map[etapa]||[] };
    }
    if (['6ano','7ano','8ano','9ano'].includes(serie)) {
      const map = { '1':[1,2,3,4,5],'2':[6,7,8,9,10],'3':[11,12,13],'4':[14,15,16] };
      return { rotulo:'CAP', lista: map[etapa]||[] };
    }
    if (serie === 'm1' || serie === 'm2') {
      const map = { '1':[1,2,3,4,5,6,7],'2':[8,9,10,11,12,13,14],'3':[15,16,17,18,19],'4':[20,21,22,23,24] };
      return { rotulo:'CAP', lista: map[etapa]||[] };
    }
    return { rotulo:null, lista:[] };
  }

  // Init selects Planilha
  (function planInit() {
    const selProf = document.getElementById('professorSelect');
    const selDisc = document.getElementById('disciplinaSelect');
    selProf.innerHTML = '<option value="">Selecione um professor (opcional)</option>';
    Object.keys(PLAN_TEACHERS).sort().forEach(nome => {
      const opt = document.createElement('option');
      opt.value = nome; opt.textContent = nome;
      selProf.appendChild(opt);
    });
    selProf.addEventListener('change', () => {
      const prof = selProf.value;
      selDisc.innerHTML = '';
      if (!prof) {
        selDisc.disabled = true;
        const opt = document.createElement('option');
        opt.value = ''; opt.textContent = 'Selecione um professor primeiro';
        selDisc.appendChild(opt);
        return;
      }
      (PLAN_TEACHERS[prof]||[]).forEach(d => {
        const opt = document.createElement('option');
        opt.value = d; opt.textContent = d;
        selDisc.appendChild(opt);
      });
      selDisc.disabled = false;
    });
  })();

  function planCriarPlanilha(serie, turma, alunos, etapa, modo, professor, disciplina) {
    const { rotulo, lista } = planObterCapitulos(serie, etapa, modo);
    const em = ['m1','m2','m3'].includes(serie);

    let th = `<th rowspan="2">#</th><th rowspan="2">NOME</th>`;
    let sub = '';

    if (lista.length > 0) {
      lista.forEach(c => {
        th  += `<th colspan="${em ? 2 : 3}">${rotulo} ${c}</th>`;
        sub += em ? '<th>LIV</th><th>ONL</th>' : '<th>LIV</th><th>AS</th><th>EUR</th>';
      });
    } else {
      th  += '<th colspan="4">ATIVIDADES / AVALIAÇÕES</th>';
      sub += '<th>ATV 1</th><th>ATV 2</th><th>ATV 3</th><th>ATV 4</th>';
    }

    th += '<th rowspan="2">TRAB</th><th rowspan="2">COMP</th><th rowspan="2">TDS</th><th rowspan="2">TOTAL</th>';

    let linhas = '';
    alunos.forEach((nome, i) => {
      let notas = '';
      if (lista.length > 0) {
        lista.forEach(() => {
          notas += em
            ? '<td class="nota" contenteditable></td><td class="nota" contenteditable></td>'
            : '<td class="nota" contenteditable></td><td class="nota" contenteditable></td><td class="nota" contenteditable></td>';
        });
      } else {
        notas = '<td class="nota" contenteditable></td><td class="nota" contenteditable></td><td class="nota" contenteditable></td><td class="nota" contenteditable></td>';
      }
      linhas += `
        <tr>
          <td class="num">${i+1}</td>
          <td class="nome">${nome}</td>
          ${notas}
          <td contenteditable></td><td contenteditable></td>
          <td contenteditable></td><td contenteditable></td>
        </tr>
      `;
    });

    const descricao = lista.length > 0
      ? `${etapa}ª Etapa – Planilha de 3ª Nota`
      : `${etapa}ª Etapa – Planilha de Atividades`;

    return `
      <div class="planilha">
        <div class="cab">
          <div class="cab-esq">
            <div class="colegio">${PLAN_NOME_COLEGIO}</div>
            <div class="turma">${turma}</div>
            <div class="etapa-label">${descricao}</div>
            <div class="linha">
              Professor: <span>${professor||''}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              Disciplina: <span>${disciplina||''}</span>
            </div>
          </div>
          <div class="cab-dir">
            <div class="ano-logo">
              <div class="ano-topo">${PLAN_ANO}</div>
              <img class="logo-planilha" src="${PLAN_LOGO_URL}" alt="Logo ENSPS" onerror="this.style.display='none'">
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>${th}</tr>
            <tr>${sub}</tr>
          </thead>
          <tbody>${linhas}</tbody>
        </table>
        <div class="descricao-nota">
          <div class="titulo">DESCREVA ABAIXO COMO SERÁ ATRIBUÍDA A 3ª NOTA NESTA ETAPA.</div>
          <div class="linha-desc">ATIVIDADES CASA: <span class="linha"></span> PONTOS</div>
          <div class="linha-desc">ATIVIDADES CLASSE: <span class="linha"></span> PONTOS</div>
          <div class="linha-desc">OUTRAS ATIVIDADES: <span class="linha"></span> PONTOS</div>
          <div class="linha-desc">COMPORTAMENTO: <span class="linha" style="min-width:80px;"></span></div>
          <div class="linha-desc" style="margin-top:4px;">Descreva suas atividades e/ou trabalhos:</div>
          <div class="linha-long"></div>
        </div>
      </div>
    `;
  }

  function planAjustarEstilo() {
    const lh       = document.getElementById('plan-lineheight').value;
    const fs       = document.getElementById('plan-fontsize').value;
    const truncate = document.getElementById('plan-truncate') && document.getElementById('plan-truncate').checked;
    document.getElementById('plan-lineheight-val').textContent = lh;
    document.getElementById('plan-fontsize-val').textContent   = fs;
    const truncateCSS = truncate
      ? `overflow: hidden !important; white-space: nowrap !important; text-overflow: ellipsis !important; max-width: 0 !important; width: 110px !important;`
      : `overflow: visible !important; white-space: normal !important;`;
    const rules = `
      .planilha td.nota { height: ${lh}px !important; }
      .planilha table { line-height: ${(lh / 13).toFixed(2)} !important; }
      .planilha td.nome { font-size: ${fs}px !important; ${truncateCSS} }
      .descricao-nota .linha-long { margin-top: 14px !important; }
      @media print {
        .planilha td.nota { height: ${lh}px !important; }
        .planilha table { line-height: ${(lh / 13).toFixed(2)} !important; }
        .planilha td.nome { font-size: ${fs}px !important; ${truncateCSS} }
        .descricao-nota .linha-long { margin-top: 14px !important; }
      }
    `;
    document.getElementById('planilha-ajustes').textContent = rules;
  }

  function planilhaGerar() {
    const etapa     = document.querySelector('#tab-planilha input[name=etapa]:checked').value;
    const modo      = document.querySelector('#tab-planilha input[name=modo]:checked').value;
    const professor = document.getElementById('professorSelect').value;
    const disciplina= document.getElementById('disciplinaSelect').value;
    let html = '';

    if (professor && disciplina) {
      const series = planSeriesFromRange(planExtrairFaixa(disciplina));
      if (series.length === 0) { alert('Não foi possível identificar a faixa de séries desta disciplina.'); return; }
      series.forEach(s => {
        if (PLAN_ALUNOS[s]) html += planCriarPlanilha(s, PLAN_SERIES[s], PLAN_ALUNOS[s], etapa, modo, professor, planExtrairNome(disciplina));
      });
    } else {
      const marcadas = [...document.querySelectorAll('#tab-planilha #controle input[type=checkbox]:checked')];
      if (marcadas.length === 0) { alert('Selecione ao menos uma série ou escolha um professor e disciplina.'); return; }
      marcadas.forEach(c => {
        if (PLAN_ALUNOS[c.value]) html += planCriarPlanilha(c.value, PLAN_SERIES[c.value], PLAN_ALUNOS[c.value], etapa, modo, '', '');
      });
    }

    document.getElementById('planilhas').innerHTML = html;
    setTimeout(() => window.print(), 300);
  }

  function planilhaGerarTodas() {
    const etapa = document.querySelector('#tab-planilha input[name=etapa]:checked').value;
    const modo  = document.querySelector('#tab-planilha input[name=modo]:checked').value;
    let html = '';
    Object.keys(PLAN_SERIES).forEach(s => {
      if (PLAN_ALUNOS[s]) html += planCriarPlanilha(s, PLAN_SERIES[s], PLAN_ALUNOS[s], etapa, modo, '', '');
    });
    document.getElementById('planilhas').innerHTML = html;
    setTimeout(() => window.print(), 300);
  }

  function planilhaGerarTodosProfessores() {
    const etapa = document.querySelector('#tab-planilha input[name=etapa]:checked').value;
    const modo  = document.querySelector('#tab-planilha input[name=modo]:checked').value;
    let html = '';
    Object.keys(PLAN_TEACHERS).sort().forEach(professor => {
      PLAN_TEACHERS[professor].forEach(disciplina => {
        const series = planSeriesFromRange(planExtrairFaixa(disciplina));
        const nome   = planExtrairNome(disciplina);
        series.forEach(s => {
          if (PLAN_ALUNOS[s]) html += planCriarPlanilha(s, PLAN_SERIES[s], PLAN_ALUNOS[s], etapa, modo, professor, nome);
        });
      });
    });
    if (!html) { alert('Nenhuma planilha gerada. Verifique o banco de professores.'); return; }
    document.getElementById('planilhas').innerHTML = html;
    setTimeout(() => window.print(), 300);
  }


