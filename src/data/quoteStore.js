export const STORAGE_KEY = "ma_quotes_v1";

export const SERVICE_TYPES = {
  site: "Site Institucional",
  sistema: "Sistema Personalizado",
  manutencao: "Manutenção & Suporte",
};

export const BUDGET_LABELS = {
  "ate-5k": "Até R$ 5k",
  "5k-10k": "R$ 5k - 10k",
  "10k-20k": "R$ 10k - 20k",
  "20k-50k": "R$ 20k - 50k",
  "acima-50k": "Acima de R$ 50k",
  "a-definir": "A definir",
};

export const DEADLINE_LABELS = {
  urgente: "Urgente, até 1 mês",
  "1-3meses": "1 a 3 meses",
  "3-6meses": "3 a 6 meses",
  flexivel: "Flexível",
};

export const STATUS_CONFIG = {
  novo: {
    label: "Novo",
    description: "Solicitação recebida e ainda sem resposta.",
  },
  aguardando_cliente: {
    label: "Aguardando Cliente",
    description: "Resposta enviada e aguardando retorno do cliente.",
  },
  aceito: {
    label: "Aceito",
    description: "Cliente aprovou a proposta.",
  },
  recusado: {
    label: "Recusado",
    description: "Cliente recusou ou pausou a contratação.",
  },
};

export const STATUS_ORDER = ["novo", "aguardando_cliente", "aceito", "recusado"];

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function normalizeQuote(quote) {
  return {
    id: quote.id || createId(),
    createdAt: quote.createdAt || new Date().toISOString(),
    updatedAt: quote.updatedAt || quote.createdAt || new Date().toISOString(),
    status: STATUS_CONFIG[quote.status] ? quote.status : "novo",
    nome: quote.nome || "",
    email: quote.email || "",
    telefone: quote.telefone || "",
    empresa: quote.empresa || "",
    tipoServico: quote.tipoServico || "",
    descricao: quote.descricao || "",
    orcamento: quote.orcamento || "",
    prazo: quote.prazo || "",
    responses: Array.isArray(quote.responses) ? quote.responses : [],
  };
}

function readStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const data = safeJsonParse(raw, null);

  if (!data || typeof data !== "object" || !Array.isArray(data.items)) {
    return { version: 1, items: [] };
  }

  return {
    version: 1,
    items: data.items.map(normalizeQuote),
  };
}

function writeStorage(items) {
  const data = {
    version: 1,
    items: items.map(normalizeQuote),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("ma_quotes_updated"));
  return data.items;
}

export function loadQuotes() {
  return readStorage().items;
}

export function saveQuotes(items) {
  return writeStorage(items);
}

export function createQuote(payload) {
  const items = loadQuotes();
  const now = new Date().toISOString();

  const quote = normalizeQuote({
    ...payload,
    id: createId(),
    createdAt: now,
    updatedAt: now,
    status: "novo",
    responses: [],
  });

  writeStorage([quote, ...items]);
  return quote;
}

export function getQuoteById(id) {
  return loadQuotes().find((quote) => quote.id === id) || null;
}

export function updateQuote(id, updates) {
  let updatedQuote = null;
  const now = new Date().toISOString();

  const items = loadQuotes().map((quote) => {
    if (quote.id !== id) return quote;

    updatedQuote = normalizeQuote({
      ...quote,
      ...updates,
      updatedAt: now,
    });

    return updatedQuote;
  });

  writeStorage(items);
  return updatedQuote;
}

export function changeQuoteStatus(id, status) {
  if (!STATUS_CONFIG[status]) {
    return null;
  }

  return updateQuote(id, { status });
}

export function addQuoteResponse(id, response) {
  const quote = getQuoteById(id);

  if (!quote) {
    return null;
  }

  const nextResponse = {
    id: createId(),
    createdAt: new Date().toISOString(),
    channel: response.channel || "E-mail",
    message: response.message || "",
  };

  const nextStatus =
    quote.status === "novo" ? "aguardando_cliente" : quote.status;

  return updateQuote(id, {
    status: nextStatus,
    responses: [nextResponse, ...quote.responses],
  });
}

export function deleteQuote(id) {
  const nextItems = loadQuotes().filter((quote) => quote.id !== id);
  writeStorage(nextItems);
}

export function seedDemoQuotes() {
  const now = Date.now();
  const demoQuotes = [
    {
      nome: "Marina Costa",
      email: "marina@costadesign.com",
      telefone: "(11) 97054-3189",
      empresa: "Costa Design",
      tipoServico: "site",
      descricao:
        "Preciso de um site institucional com páginas de serviços, portfólio e formulário de contato para captação de novos clientes.",
      orcamento: "5k-10k",
      prazo: "1-3meses",
      status: "novo",
      createdAt: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      nome: "Rafael Lima",
      email: "rafael@rlgestao.com",
      telefone: "(21) 98888-1020",
      empresa: "RL Gestão",
      tipoServico: "sistema",
      descricao:
        "Sistema web para controle de clientes, contratos, pagamentos e relatórios mensais da operação.",
      orcamento: "20k-50k",
      prazo: "3-6meses",
      status: "aguardando_cliente",
      responses: [
        {
          id: createId(),
          createdAt: new Date(now - 22 * 60 * 60 * 1000).toISOString(),
          channel: "WhatsApp",
          message:
            "Enviamos uma proposta inicial com escopo, prazo estimado e próximos passos para validação.",
        },
      ],
      createdAt: new Date(now - 28 * 60 * 60 * 1000).toISOString(),
    },
    {
      nome: "Bianca Martins",
      email: "contato@bmloja.com",
      telefone: "(31) 97777-4400",
      empresa: "BM Loja",
      tipoServico: "manutencao",
      descricao:
        "Manutenção corretiva, revisão de performance e melhorias em páginas de produto.",
      orcamento: "ate-5k",
      prazo: "urgente",
      status: "aceito",
      createdAt: new Date(now - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      nome: "Eduardo Nunes",
      email: "eduardo@nunesdigital.com",
      telefone: "(41) 96666-2200",
      empresa: "Nunes Digital",
      tipoServico: "site",
      descricao:
        "Landing page para campanha comercial com integração simples para WhatsApp.",
      orcamento: "ate-5k",
      prazo: "flexivel",
      status: "recusado",
      createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ].map(normalizeQuote);

  writeStorage([...demoQuotes, ...loadQuotes()]);
  return demoQuotes;
}

export function clearQuotes() {
  writeStorage([]);
}

export function getQuoteStatsFromItems(items) {
  const counts = STATUS_ORDER.reduce(
    (acc, status) => ({ ...acc, [status]: 0 }),
    { total: items.length }
  );

  for (const quote of items) {
    if (counts[quote.status] !== undefined) {
      counts[quote.status] += 1;
    }
  }

  const decisions = counts.aceito + counts.recusado;
  const acceptanceRate = decisions > 0 ? counts.aceito / decisions : null;
  const pendingRate =
    counts.total > 0
      ? (counts.novo + counts.aguardando_cliente) / counts.total
      : null;

  return {
    counts,
    acceptanceRate,
    pendingRate,
    latestQuote: items[0] || null,
  };
}

export function getQuoteStats() {
  return getQuoteStatsFromItems(loadQuotes());
}

export function serviceTypeLabel(value) {
  return SERVICE_TYPES[value] || value || "Não informado";
}

export function budgetLabel(value) {
  return BUDGET_LABELS[value] || value || "Não informado";
}

export function deadlineLabel(value) {
  return DEADLINE_LABELS[value] || value || "Não informado";
}

export function statusLabel(value) {
  return STATUS_CONFIG[value]?.label || value || "Não informado";
}

export function formatDateTimePtBR(iso) {
  if (!iso) return "Não informado";

  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return String(iso);
  }
}
