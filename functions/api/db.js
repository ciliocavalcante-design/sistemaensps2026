const DEFAULT_DB_PATH = 'storage/ensps_db.json';
const DEFAULT_DB_PATHS = {
  core: 'storage/ensps_db_core.json',
  horarios: 'storage/ensps_db_horarios.json',
  boletim: 'storage/ensps_db_boletim.json'
};
const REMOTE_SCOPES = ['core', 'horarios', 'boletim'];
const GITHUB_API_BASE = 'https://api.github.com';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

function getConfig(env, request) {
  const url = new URL(request.url);
  const scope = (url.searchParams.get('scope') || '').trim().toLowerCase();
  const owner = env.GITHUB_OWNER || 'ciliocavalcante-design';
  const repo = env.GITHUB_REPO || 'sistemaensps2026';
  const branch = env.GITHUB_BRANCH || 'main';
  const path = scope && DEFAULT_DB_PATHS[scope]
    ? (env[`GITHUB_DB_PATH_${scope.toUpperCase()}`] || DEFAULT_DB_PATHS[scope])
    : (env.GITHUB_DB_PATH || DEFAULT_DB_PATH);
  const token = env.GITHUB_TOKEN;

  if (!token) throw new Error('Secret GITHUB_TOKEN não configurado no Cloudflare.');

  return { owner, repo, branch, path, token, scope };
}

function encodeBase64Utf8(texto) {
  const bytes = new TextEncoder().encode(texto);
  let binario = '';
  for (const byte of bytes) binario += String.fromCharCode(byte);
  return btoa(binario);
}

function decodeBase64Utf8(base64) {
  const binario = atob(base64.replace(/\n/g, ''));
  const bytes = Uint8Array.from(binario, char => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function githubRequest(config, url, init = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${config.token}`,
      'User-Agent': 'ensps-cloudflare-sync',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.headers || {})
    }
  });

  return response;
}

async function baixarTextoBruto(config, url) {
  const resposta = await githubRequest(config, url, {
    headers: {
      'Accept': 'application/vnd.github.raw'
    }
  });

  if (!resposta.ok) {
    const erro = await resposta.text();
    throw new Error(`GitHub RAW falhou (${resposta.status}): ${erro}`);
  }

  return resposta.text();
}

async function buscarArquivo(config) {
  const url = `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${config.path}?ref=${encodeURIComponent(config.branch)}`;
  const resposta = await githubRequest(config, url);

  if (resposta.status === 404) return null;

  if (!resposta.ok) {
    const erro = await resposta.text();
    throw new Error(`GitHub GET falhou (${resposta.status}): ${erro}`);
  }

  const payload = await resposta.json();
  let content = '{}';

  if (typeof payload.content === 'string' && payload.content.trim()) {
    content = decodeBase64Utf8(payload.content);
  } else if (typeof payload.download_url === 'string' && payload.download_url) {
    content = await baixarTextoBruto(config, payload.download_url);
  } else if (typeof payload.git_url === 'string' && payload.git_url) {
    const blobResposta = await githubRequest(config, payload.git_url);
    if (!blobResposta.ok) {
      const erro = await blobResposta.text();
      throw new Error(`GitHub BLOB falhou (${blobResposta.status}): ${erro}`);
    }

    const blobPayload = await blobResposta.json();
    if (typeof blobPayload.content === 'string' && blobPayload.content.trim()) {
      content = decodeBase64Utf8(blobPayload.content);
    } else {
      content = await baixarTextoBruto(config, `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${config.path}?ref=${encodeURIComponent(config.branch)}`);
    }
  }

  return {
    sha: payload.sha || '',
    path: payload.path || config.path,
    data: JSON.parse(content || '{}')
  };
}

function extrairEscopoDoLegado(scope, data) {
  if (!scope || !data || typeof data !== 'object') return data;
  if (scope === 'core') {
    const { schemaVersion, frequenciaAlunos, advertencias, comunicadosProfessores, professoresMateriais, professoresFolha } = data;
    return {
      schemaVersion,
      frequenciaAlunos,
      advertencias,
      comunicadosProfessores,
      professoresMateriais,
      professoresFolha
    };
  }
  if (scope === 'horarios') return data.horarios || {};
  if (scope === 'boletim') return data.boletimInformativo ?? null;
  return data;
}

function montarBancoUnificado(partes = {}) {
  const core = partes.core && typeof partes.core === 'object' ? partes.core : {};
  const horarios = partes.horarios && typeof partes.horarios === 'object' ? partes.horarios : {};
  const boletim = Object.prototype.hasOwnProperty.call(partes, 'boletim') ? partes.boletim : null;
  return {
    schemaVersion: core.schemaVersion || 2,
    frequenciaAlunos: Array.isArray(core.frequenciaAlunos) ? core.frequenciaAlunos : [],
    advertencias: Array.isArray(core.advertencias) ? core.advertencias : [],
    comunicadosProfessores: Array.isArray(core.comunicadosProfessores) ? core.comunicadosProfessores : [],
    horarios,
    boletimInformativo: boletim,
    professoresMateriais: core.professoresMateriais && typeof core.professoresMateriais === 'object'
      ? core.professoresMateriais
      : { deliveries: {} },
    professoresFolha: core.professoresFolha && typeof core.professoresFolha === 'object'
      ? core.professoresFolha
      : { frequencyRecords: [], extraAvulsaRecords: {} }
  };
}

function dividirBancoUnificado(db = {}) {
  return {
    core: {
      schemaVersion: db.schemaVersion || 2,
      frequenciaAlunos: Array.isArray(db.frequenciaAlunos) ? db.frequenciaAlunos : [],
      advertencias: Array.isArray(db.advertencias) ? db.advertencias : [],
      comunicadosProfessores: Array.isArray(db.comunicadosProfessores) ? db.comunicadosProfessores : [],
      professoresMateriais: db.professoresMateriais && typeof db.professoresMateriais === 'object'
        ? db.professoresMateriais
        : { deliveries: {} },
      professoresFolha: db.professoresFolha && typeof db.professoresFolha === 'object'
        ? db.professoresFolha
        : { frequencyRecords: [], extraAvulsaRecords: {} }
    },
    horarios: db.horarios && typeof db.horarios === 'object' ? db.horarios : {},
    boletim: typeof db.boletimInformativo === 'undefined' ? null : db.boletimInformativo
  };
}

function manifestoSplit() {
  return {
    schemaVersion: 3,
    storageMode: 'split',
    files: { ...DEFAULT_DB_PATHS },
    note: 'Banco remoto modular. A API junta/divide os arquivos automaticamente.'
  };
}

function configForScope(config, scope, env) {
  return {
    ...config,
    scope,
    path: env[`GITHUB_DB_PATH_${scope.toUpperCase()}`] || DEFAULT_DB_PATHS[scope]
  };
}

async function buscarBancoModular(config, env) {
  const resultados = await Promise.all(REMOTE_SCOPES.map(async scope => {
    const scopedConfig = configForScope(config, scope, env);
    const arquivo = await buscarArquivo(scopedConfig);
    if (arquivo) {
      return { scope, arquivo, fromLegacy: false };
    }
    const legadoConfig = { ...config, scope: '', path: env.GITHUB_DB_PATH || DEFAULT_DB_PATH };
    const legado = await buscarArquivo(legadoConfig);
    if (legado) {
      return {
        scope,
        arquivo: {
          sha: '',
          path: scopedConfig.path,
          data: extrairEscopoDoLegado(scope, legado.data)
        },
        fromLegacy: true
      };
    }
    return { scope, arquivo: null, fromLegacy: false };
  }));

  const encontrados = resultados.filter(item => item.arquivo);
  if (!encontrados.length) return null;

  const partes = {};
  const shas = {};
  const paths = {};
  resultados.forEach(item => {
    if (!item.arquivo) return;
    partes[item.scope] = item.arquivo.data;
    shas[item.scope] = item.fromLegacy ? '' : (item.arquivo.sha || '');
    paths[item.scope] = item.arquivo.path;
  });

  return {
    data: montarBancoUnificado(partes),
    sha: shas,
    path: paths
  };
}

async function salvarArquivo(config, db, sha, reason) {
  const url = `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${config.path}`;
  const mensagem = reason || 'Atualiza banco ENSPS pelo Cloudflare';
  const conteudo = JSON.stringify(db, null, 2);
  const corpo = {
    message: mensagem,
    content: encodeBase64Utf8(conteudo),
    branch: config.branch
  };
  if (sha) corpo.sha = sha;

  const resposta = await githubRequest(config, url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(corpo)
  });

  const payload = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    const mensagem = payload.message || `GitHub PUT falhou (${resposta.status})`;
    const isShaConflict = resposta.status === 409 || /expected\s+[a-f0-9]{40}/i.test(mensagem) || /does not match/i.test(mensagem);
    if (isShaConflict) {
      const atual = await buscarArquivo(config);
      const shaAtual = atual?.sha || '';
      if (shaAtual && shaAtual !== sha) {
        return salvarArquivo(config, db, shaAtual, reason);
      }
    }
    throw new Error(mensagem);
  }

  return {
    ok: true,
    sha: payload.content?.sha || '',
    path: payload.content?.path || config.path
  };
}

export async function onRequestOptions() {
  return json({ ok: true });
}

export async function onRequestGet(context) {
  try {
    const config = getConfig(context.env, context.request);

    if (!config.scope) {
      const modular = await buscarBancoModular(config, context.env);
      if (modular) {
        return json({
          ok: true,
          data: modular.data,
          sha: modular.sha,
          path: modular.path,
          branch: config.branch,
          storageMode: 'split'
        });
      }
    }

    let arquivo = await buscarArquivo(config);

    if (!arquivo && config.scope) {
      const legadoConfig = { ...config, path: context.env.GITHUB_DB_PATH || DEFAULT_DB_PATH, scope: '' };
      const legado = await buscarArquivo(legadoConfig);
      if (legado) {
        return json({
          ok: true,
          data: extrairEscopoDoLegado(config.scope, legado.data),
          sha: '',
          path: legado.path,
          branch: legado.branch,
          fromLegacy: true
        });
      }
    }

    if (!arquivo) {
      return json({
        ok: false,
        notFound: true,
        path: config.path,
        branch: config.branch
      }, 404);
    }

    return json({
      ok: true,
      data: arquivo.data,
      sha: arquivo.sha,
      path: arquivo.path,
      branch: config.branch
    });
  } catch (error) {
    return json({
      ok: false,
      error: error.message || 'Erro ao carregar banco remoto'
    }, 500);
  }
}

export async function onRequestPost(context) {
  try {
    const config = getConfig(context.env, context.request);
    const body = await context.request.json();
    const db = body?.db;
    const shaInformado = body?.sha || '';
    const reason = body?.reason || 'Atualiza banco ENSPS';

    if (typeof db === 'undefined') {
      return json({ ok: false, error: 'Corpo inválido. Envie { db }.' }, 400);
    }

    if (!config.scope) {
      const partes = dividirBancoUnificado(db);
      const shaMap = shaInformado && typeof shaInformado === 'object' ? shaInformado : {};
      const resultados = {};

      for (const scope of REMOTE_SCOPES) {
        const scopedConfig = configForScope(config, scope, context.env);
        let sha = typeof shaMap[scope] === 'string' ? shaMap[scope] : '';
        if (!sha) {
          const atual = await buscarArquivo(scopedConfig);
          sha = atual?.sha || '';
        }
        resultados[scope] = await salvarArquivo(scopedConfig, partes[scope], sha, `${reason} [${scope}]`);
      }

      const manifestConfig = { ...config, path: context.env.GITHUB_DB_PATH || DEFAULT_DB_PATH };
      let manifestSha = '';
      const manifestAtual = await buscarArquivo(manifestConfig);
      manifestSha = manifestAtual?.sha || '';
      const manifestSalvo = await salvarArquivo(manifestConfig, manifestoSplit(), manifestSha, `${reason} [manifest]`);

      return json({
        ok: true,
        sha: Object.fromEntries(REMOTE_SCOPES.map(scope => [scope, resultados[scope].sha])),
        path: {
          manifest: manifestSalvo.path,
          ...Object.fromEntries(REMOTE_SCOPES.map(scope => [scope, resultados[scope].path]))
        },
        storageMode: 'split'
      });
    }

    let sha = shaInformado;
    if (!sha) {
      const atual = await buscarArquivo(config);
      sha = atual?.sha || '';
    }

    const salvo = await salvarArquivo(config, db, sha, reason);
    return json(salvo);
  } catch (error) {
    return json({
      ok: false,
      error: error.message || 'Erro ao salvar banco remoto'
    }, 500);
  }
}
