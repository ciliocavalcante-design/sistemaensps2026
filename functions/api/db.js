const DEFAULT_DB_PATH = 'storage/ensps_db.json';
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

function getConfig(env) {
  const owner = env.GITHUB_OWNER || 'ciliocavalcante-design';
  const repo = env.GITHUB_REPO || 'sistemaensps2026';
  const branch = env.GITHUB_BRANCH || 'main';
  const path = env.GITHUB_DB_PATH || DEFAULT_DB_PATH;
  const token = env.GITHUB_TOKEN;

  if (!token) throw new Error('Secret GITHUB_TOKEN não configurado no Cloudflare.');

  return { owner, repo, branch, path, token };
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
    throw new Error(payload.message || `GitHub PUT falhou (${resposta.status})`);
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
    const config = getConfig(context.env);
    const arquivo = await buscarArquivo(config);

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
    const config = getConfig(context.env);
    const body = await context.request.json();
    const db = body?.db;
    const shaInformado = body?.sha || '';
    const reason = body?.reason || 'Atualiza banco ENSPS';

    if (!db || typeof db !== 'object') {
      return json({ ok: false, error: 'Corpo inválido. Envie { db }.' }, 400);
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
