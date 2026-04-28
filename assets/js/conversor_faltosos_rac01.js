// ===== conversor-faltosos-rac01.html | script inline 1 =====
const $ = sel => document.querySelector(sel);
    const arquivo = $('#arquivo'), texto = $('#texto'), statusBox = $('#status'), tbody = $('#tbody'), btnBaixar = $('#baixar'), btnCopiar = $('#copiar');
    let csvAtual = '', nomeBase = 'faltosos';

    function setStatus(msg, tipo=''){
      statusBox.className = 'status' + (tipo ? ' ' + tipo : '');
      statusBox.textContent = msg;
    }

    function csvEscape(v){
      const s = String(v ?? '');
      return /[",\n\r;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }

    function dataBRparaISO(dia, mes, ano){ return `${ano}-${mes}-${dia}`; }

    function extrairDataRelatorio(txt){
      const m = String(txt || '').match(/Ausentes\s+em:\s*(\d{2})\/(\d{2})\/(\d{4})/i)
        || String(txt || '').match(/Rela[çc][ãa]o\s+de\s+Ausentes\s+em:\s*(\d{2})\/(\d{2})\/(\d{4})/i);
      return m ? dataBRparaISO(m[1], m[2], m[3]) : '';
    }

    function nomeArquivoData(dataISO){
      if(!dataISO) return 'faltosos.csv';
      const [a,m,d] = dataISO.split('-');
      return `faltosos_${d}-${m}-${a}.csv`;
    }

    function limparNomeAluno(nome){
      return String(nome || '')
        .replace(/\s+/g, ' ')
        .replace(/\b(?:Página|RAC01|ESCOLA|Emitida|Total)\b.*$/i, '')
        .trim();
    }

    function adicionarItem(lista, vistos, codigo, aluno, matricula, data){
      aluno = limparNomeAluno(aluno);
      matricula = String(matricula || '').trim();
      codigo = String(codigo || '').trim();
      if(!codigo || !aluno || !/^\d{7}$/.test(matricula)) return;

      // O código da primeira coluna identifica uma única linha do relatório.
      // Se o PDF gerar uma leitura duplicada, mantemos apenas o melhor registro,
      // evitando capturar nome de responsável como se fosse parte do aluno.
      const idx = lista.findIndex(x => x.codigo === codigo);
      if(idx >= 0){
        const atual = lista[idx];
        const novo = { codigo, aluno, matricula, data, status: 'falta' };
        const atualTemNomeGrande = atual.aluno.length > 45;
        const novoMaisCurto = novo.aluno.length < atual.aluno.length;
        const matriculaDiferente = atual.matricula !== novo.matricula;
        if((atualTemNomeGrande && novoMaisCurto) || matriculaDiferente){
          lista[idx] = novo;
        }
        return;
      }

      const chave = `${codigo}|${data}`;
      if(vistos.has(chave)) return;
      vistos.add(chave);
      lista.push({ codigo, aluno, matricula, data, status: 'falta' });
    }

    function extrairFaltosos(txt){
      const data = extrairDataRelatorio(txt);
      const bruto = String(txt || '');
      const itens = [];
      const vistos = new Set();

      // Estratégia principal: dividir o texto por cada código de linha do relatório.
      // Isso impede que o conversor confunda o responsável/telefone com outro aluno.
      // O aluno é sempre o texto entre o código e a primeira matrícula de 7 dígitos.
      const codigoRe = /\b\d{5}[A-Z]\d{5}\b/g;
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

        const mat = bloco.match(/\b(\d{7})\b/);
        if(!mat) continue;

        const aluno = bloco.slice(0, mat.index).trim();
        adicionarItem(itens, vistos, atual.codigo, aluno, mat[1], data);
      }

      // Estratégia reserva: algumas extrações de PDF podem perder quebras entre códigos.
      // Ainda assim, só aceita registros quando não houver outro código dentro do nome.
      const compacto = bruto.replace(/\s+/g, ' ').trim();
      const reGlobal = /(\d{5}[A-Z]\d{5})\s+([^\d]+?)\s+(\d{7})\b/g;
      let g;
      while((g = reGlobal.exec(compacto)) !== null){
        const nomePossivel = g[2].trim();
        if(/\d{5}[A-Z]\d{5}/.test(nomePossivel)) continue;
        adicionarItem(itens, vistos, g[1], nomePossivel, g[3], data);
      }

      // Ordena pela ordem do código do relatório para facilitar conferência.
      itens.sort((a,b) => a.codigo.localeCompare(b.codigo, 'pt-BR'));
      return { data, itens };
    }
    function gerarCSV(itens){
      const header = ['Matricula','Aluno','Data','Status','Codigo'];
      const linhas = [header.join(',')];
      for(const i of itens){
        linhas.push([i.matricula, i.aluno, i.data, i.status, i.codigo].map(csvEscape).join(','));
      }
      return linhas.join('\n') + '\n';
    }

    function renderTabela(itens){
      if(!itens.length){
        tbody.innerHTML = '<tr><td colspan="5" class="muted">Nenhum aluno convertido ainda.</td></tr>';
        return;
      }
      tbody.innerHTML = itens.map((i, idx) => `<tr>
        <td>${idx+1}</td><td>${i.matricula}</td><td>${i.aluno}</td><td>${i.data || '-'}</td><td>${i.codigo}</td>
      </tr>`).join('');
    }

    function converterTexto(){
      const txt = texto.value || '';
      const {data, itens} = extrairFaltosos(txt);
      if(!txt.trim()){
        setStatus('Cole o texto ou selecione um arquivo primeiro.', 'warn');
        return;
      }
      if(!itens.length){
        csvAtual = '';
        btnBaixar.disabled = true; btnCopiar.disabled = true;
        renderTabela([]);
        setStatus('Não encontrei linhas de alunos nesse modelo. Verifique se o texto é do relatório RAC01 - Relação de Ausentes.', 'err');
        return;
      }
      csvAtual = gerarCSV(itens);
      btnBaixar.disabled = false; btnCopiar.disabled = false;
      renderTabela(itens);
      nomeBase = nomeArquivoData(data);
      setStatus(`✅ Conversão concluída.\nData identificada: ${data || 'não encontrada'}\nAlunos encontrados: ${itens.length}\nArquivo pronto para importar no sistema.`, 'ok');
    }

    async function extrairTextoPDF(file){
      if(!window.pdfjsLib){
        throw new Error('PDF.js não carregou. Verifique a internet ou converta o PDF para TXT.');
      }
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({data: buffer}).promise;
      const todasLinhas = [];
      const fluxoTokens = [];

      for(let p=1; p<=pdf.numPages; p++){
        const page = await pdf.getPage(p);
        const content = await page.getTextContent();
        const itens = content.items
          .map(item => ({
            x: item.transform[4],
            y: item.transform[5],
            str: String(item.str || '').trim()
          }))
          .filter(item => item.str);

        // Agrupamento por tolerância de Y. O arredondamento simples perdia linhas
        // quando o PDF colocava partes da mesma linha com pequenas diferenças de altura.
        itens.sort((a,b) => (b.y - a.y) || (a.x - b.x));
        const grupos = [];
        for(const item of itens){
          let grupo = grupos.find(g => Math.abs(g.y - item.y) <= 2.5);
          if(!grupo){
            grupo = { y: item.y, items: [] };
            grupos.push(grupo);
          }
          grupo.items.push(item);
          fluxoTokens.push(item.str);
        }

        const linhasPagina = grupos
          .sort((a,b)=>b.y-a.y)
          .map(g => g.items
            .sort((a,b)=>a.x-b.x)
            .map(i=>i.str)
            .join(' ')
            .replace(/\s+/g,' ')
            .trim())
          .filter(Boolean);

        todasLinhas.push(...linhasPagina);
      }

      // Inclui as linhas reconstituídas e também um fluxo contínuo de tokens.
      // O parser usa os dois formatos para evitar perder alunos no PDF direto.
      return todasLinhas.join('\n') + '\n\n--- FLUXO CONTINUO ---\n' + fluxoTokens.join(' ');
    }

    arquivo.addEventListener('change', async e => {
      const file = e.target.files && e.target.files[0];
      if(!file) return;
      setStatus('Lendo arquivo...', 'warn');
      try{
        if(/\.pdf$/i.test(file.name) || file.type === 'application/pdf'){
          const txt = await extrairTextoPDF(file);
          texto.value = txt;
        }else{
          texto.value = await file.text();
        }
        converterTexto();
      }catch(err){
        setStatus('Não consegui ler o PDF diretamente. Alternativa: abra o PDF, copie o texto e cole no campo da esquerda.\n\nDetalhe: ' + err.message, 'err');
      }finally{
        arquivo.value = '';
      }
    });

    $('#converter').addEventListener('click', converterTexto);
    $('#limpar').addEventListener('click', () => {
      texto.value = ''; csvAtual = ''; renderTabela([]); btnBaixar.disabled = true; btnCopiar.disabled = true; setStatus('Aguardando arquivo ou texto do relatório.');
    });
    btnBaixar.addEventListener('click', () => {
      if(!csvAtual) return;
      const blob = new Blob([csvAtual], {type:'text/csv;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = nomeBase || 'faltosos.csv'; document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    });
    btnCopiar.addEventListener('click', async () => {
      if(!csvAtual) return;
      await navigator.clipboard.writeText(csvAtual);
      setStatus('CSV copiado para a área de transferência.', 'ok');
    });

