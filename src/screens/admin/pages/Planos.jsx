import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import useSeo from "../../../utils/useSeo";
import styles from "./Planos.module.css";
import { Edit, Trash2, Plus, Users, Calendar, Search, Shield } from "lucide-react";
import { apiFetch } from "../../../utils/auth";

function formatBRLFromCents(cents) {
  if (cents == null) return "—";
  const value = Number(cents) / 100;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function toNumberOrNull(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  const normalized = raw.replace(/\./g, "").replace(",", ".");
  const n = Number(normalized);
  if (!Number.isFinite(n)) return null;
  return n;
}

function centsInputToPayload(value) {
  const n = toNumberOrNull(value);
  if (n == null) return null;
  return Math.round(n * 100);
}

const SYSTEM_OPTIONS = [
  { label: "E-commerce", key: "ecommerce", icon: "🛒" },
  { label: "Sistemas (Sob Medida)", key: "sistemas-personalizados", icon: "🧩" },
  { label: "Sistema de Agendamento", key: "sistema-agendamento", icon: "📅" },
  { label: "Sistema de Delivery", key: "sistema-delivery", icon: "🛵" },
  { label: "Sites Institucionais", key: "sites-institucionais", icon: "🏢" },
  { label: "Manutenção & Suporte", key: "manutencao-suporte", icon: "🛠️" },
];

const MODEL_OPTIONS = [
  { key: "rental", label: "Aluguel (Assinatura)" },
  { key: "sale", label: "Venda (Projeto fechado)" },
  { key: "addon", label: "Adicional (Suporte/Manutenção)" },
];

const SYSTEM_LABEL = Object.fromEntries(SYSTEM_OPTIONS.map((o) => [o.key, o.label]));
const MODEL_LABEL = Object.fromEntries(MODEL_OPTIONS.map((o) => [o.key, o.label]));

const PERMISSOES_SISTEMA = [
  {
    categoria: "Empresas",
    permissoes: [
      { key: "max_empresas", label: "Quantidade máxima de empresas", tipo: "numero", valor: 1 },
      { key: "criar_empresas", label: "Criar novas empresas", tipo: "boolean" },
      { key: "editar_empresas", label: "Editar empresas", tipo: "boolean" },
      { key: "excluir_empresas", label: "Excluir empresas", tipo: "boolean" },
    ],
  },
  {
    categoria: "Funcionários",
    permissoes: [
      { key: "max_funcionarios", label: "Quantidade máxima de funcionários", tipo: "numero", valor: 5 },
      { key: "criar_funcionarios", label: "Criar funcionários", tipo: "boolean" },
      { key: "editar_funcionarios", label: "Editar funcionários", tipo: "boolean" },
      { key: "excluir_funcionarios", label: "Excluir funcionários", tipo: "boolean" },
      { key: "definir_permissoes_funcionarios", label: "Definir permissões de funcionários", tipo: "boolean" },
    ],
  },
  {
    categoria: "Produtos",
    permissoes: [
      { key: "max_produtos", label: "Quantidade máxima de produtos", tipo: "numero", valor: 100 },
      { key: "criar_produtos", label: "Criar produtos", tipo: "boolean" },
      { key: "editar_produtos", label: "Editar produtos", tipo: "boolean" },
      { key: "excluir_produtos", label: "Excluir produtos", tipo: "boolean" },
      { key: "importar_produtos", label: "Importar produtos em lote", tipo: "boolean" },
      { key: "exportar_produtos", label: "Exportar produtos", tipo: "boolean" },
    ],
  },
  {
    categoria: "Vendas",
    permissoes: [
      { key: "realizar_vendas", label: "Realizar vendas", tipo: "boolean" },
      { key: "cancelar_vendas", label: "Cancelar vendas", tipo: "boolean" },
      { key: "aplicar_descontos", label: "Aplicar descontos", tipo: "boolean" },
      { key: "max_desconto_percentual", label: "Desconto máximo (%)", tipo: "numero", valor: 10 },
      { key: "vendas_a_prazo", label: "Vendas a prazo", tipo: "boolean" },
    ],
  },
  {
    categoria: "Estoque",
    permissoes: [
      { key: "controle_estoque", label: "Controle de estoque", tipo: "boolean" },
      { key: "ajustar_estoque", label: "Ajustar estoque manualmente", tipo: "boolean" },
      { key: "alertas_estoque_baixo", label: "Alertas de estoque baixo", tipo: "boolean" },
      { key: "transferencia_estoque", label: "Transferência entre estoques", tipo: "boolean" },
    ],
  },
  {
    categoria: "Relatórios",
    permissoes: [
      { key: "relatorios_basicos", label: "Relatórios básicos", tipo: "boolean" },
      { key: "relatorios_avancados", label: "Relatórios avançados", tipo: "boolean" },
      { key: "relatorios_personalizados", label: "Relatórios personalizados", tipo: "boolean" },
      { key: "exportar_relatorios", label: "Exportar relatórios (PDF/Excel)", tipo: "boolean" },
      { key: "relatorios_financeiros", label: "Relatórios financeiros", tipo: "boolean" },
    ],
  },
  {
    categoria: "Financeiro",
    permissoes: [
      { key: "contas_pagar", label: "Contas a pagar", tipo: "boolean" },
      { key: "contas_receber", label: "Contas a receber", tipo: "boolean" },
      { key: "fluxo_caixa", label: "Fluxo de caixa", tipo: "boolean" },
      { key: "conciliacao_bancaria", label: "Conciliação bancária", tipo: "boolean" },
    ],
  },
  {
    categoria: "Cupons e Promoções",
    permissoes: [
      { key: "criar_cupons", label: "Criar cupons de desconto", tipo: "boolean" },
      { key: "gerenciar_promocoes", label: "Gerenciar promoções", tipo: "boolean" },
      { key: "programa_fidelidade", label: "Programa de fidelidade", tipo: "boolean" },
    ],
  },
  {
    categoria: "Fiscal",
    permissoes: [
      { key: "emitir_nfe", label: "Emitir NF-e", tipo: "boolean" },
      { key: "emitir_nfce", label: "Emitir NFC-e", tipo: "boolean" },
      { key: "emitir_sat", label: "Emitir SAT", tipo: "boolean" },
      { key: "gestao_tributaria", label: "Gestão tributária", tipo: "boolean" },
    ],
  },
  {
    categoria: "Sistema",
    permissoes: [
      { key: "api_access", label: "Acesso à API", tipo: "boolean" },
      { key: "integracao_terceiros", label: "Integrações com terceiros", tipo: "boolean" },
      { key: "suporte_prioritario", label: "Suporte prioritário", tipo: "boolean" },
      { key: "backup_automatico", label: "Backup automático", tipo: "boolean" },
      { key: "personalizacao_interface", label: "Personalização de interface", tipo: "boolean" },
    ],
  },
];

function buildHighlights(plan) {
  const lines = [];
  if (plan?.short_description) lines.push(String(plan.short_description));
  if (plan?.description) {
    String(plan.description)
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .forEach((l) => lines.push(l));
  }
  return lines.slice(0, 6);
}

function Planos() {
  useSeo({
    title: "MultiAlmeida | Planos Admin",
    description: "Cadastro e gestão de planos (aluguel, venda e adicionais).",
    noindex: true,
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [busca, setBusca] = useState("");

  const [modal, setModal] = useState(false);
  const [modalPermissoes, setModalPermissoes] = useState(false);
  const [planoPermissoes, setPlanoPermissoes] = useState(null);
  const [editId, setEditId] = useState(null);

  const [permissoesPorPlano, setPermissoesPorPlano] = useState({});

  const [form, setForm] = useState({
    name: "",
    slug: "",
    model: "rental",
    system_key: "ecommerce",
    short_description: "",
    description: "",
    price_monthly: "",
    price_setup: "",
    price_one_time: "",
    support_monthly: "",
    maintenance_monthly: "",
    active: true,
  });

  const isSale = form.model === "sale";
  const isRental = form.model === "rental";
  const isAddon = form.model === "addon";

  useEffect(() => {
    if (form.model === "sale" && form.system_key !== "sites-institucionais") {
      setForm((prev) => ({ ...prev, system_key: "sites-institucionais" }));
    }
  }, [form.model, form.system_key]);

  async function carregarPlanos() {
    setLoading(true);
    setError("");
    try {
      const res = await apiFetch(`/api/plans`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Erro ao carregar planos");
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    document.title = "MultiAlmeida | Planos Admin";
    carregarPlanos();
  }, []);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleModelChange(value) {
    setForm((prev) => {
      const next = { ...prev, model: value };

      if (value === "sale") {
        next.system_key = "sites-institucionais";
        next.price_monthly = "";
        next.price_setup = "";
        next.support_monthly = "";
      }

      if (value === "rental") {
        next.price_one_time = "";
      }

      if (value === "addon") {
        next.price_one_time = "";
        next.price_setup = "";
      }

      return next;
    });
  }

  function abrirModal(plano = null) {
    if (plano) {
      setEditId(plano.id);
      setForm({
        name: plano.name || "",
        slug: plano.slug || "",
        model: plano.model || "rental",
        system_key: plano.system_key || "ecommerce",
        short_description: plano.short_description || "",
        description: plano.description || "",
        price_monthly: plano.price_monthly_cents != null ? String(plano.price_monthly_cents / 100).replace(".", ",") : "",
        price_setup: plano.price_setup_cents != null ? String(plano.price_setup_cents / 100).replace(".", ",") : "",
        price_one_time: plano.price_one_time_cents != null ? String(plano.price_one_time_cents / 100).replace(".", ",") : "",
        support_monthly: plano.support_monthly_cents != null ? String(plano.support_monthly_cents / 100).replace(".", ",") : "",
        maintenance_monthly:
          plano.maintenance_monthly_cents != null ? String(plano.maintenance_monthly_cents / 100).replace(".", ",") : "",
        active: Boolean(plano.active),
      });
    } else {
      setEditId(null);
      setForm({
        name: "",
        slug: "",
        model: "rental",
        system_key: "ecommerce",
        short_description: "",
        description: "",
        price_monthly: "",
        price_setup: "",
        price_one_time: "",
        support_monthly: "",
        maintenance_monthly: "",
        active: true,
      });
    }
    setModal(true);
  }

  function fecharModal() {
    setModal(false);
  }

  useEffect(() => {
    if (!modal) return;
    function onKeyDown(e) {
      if (e.key === "Escape" && !saving) {
        fecharModal();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modal, saving]);

  function abrirModalPermissoes(plano) {
    setPlanoPermissoes(plano);

    if (!permissoesPorPlano[plano.id]) {
      const permissoesIniciais = {};
      PERMISSOES_SISTEMA.forEach((cat) => {
        cat.permissoes.forEach((perm) => {
          if (perm.tipo === "boolean") {
            permissoesIniciais[perm.key] = false;
          } else if (perm.tipo === "numero") {
            permissoesIniciais[perm.key] = { ativo: false, valor: perm.valor || 0 };
          }
        });
      });
      setPermissoesPorPlano((prev) => ({ ...prev, [plano.id]: permissoesIniciais }));
    }

    setModalPermissoes(true);
  }

  function fecharModalPermissoes() {
    setModalPermissoes(false);
    setPlanoPermissoes(null);
  }

  function alterarPermissao(key, value) {
    if (!planoPermissoes) return;
    setPermissoesPorPlano((prev) => ({
      ...prev,
      [planoPermissoes.id]: {
        ...(prev[planoPermissoes.id] || {}),
        [key]: value,
      },
    }));
  }

  function salvarPermissoes() {
    // Placeholder: apenas mantém em memória no estado do React.
    // (Sem integração com backend por enquanto.)
    alert("Permissões salvas localmente (não integrado ao backend ainda).");
    fecharModalPermissoes();
  }

  async function salvar() {
    setSaving(true);
    setError("");
    try {
      if (!form.name.trim()) throw new Error("Informe o nome do plano.");
      if (!form.model) throw new Error("Informe o tipo.");
      if (!form.system_key) throw new Error("Informe o sistema.");

      if (form.model === "sale" && form.system_key !== "sites-institucionais") {
        throw new Error("Planos de Venda são apenas para Sites Institucionais.");
      }

      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim() || undefined,
        model: form.model,
        system_key: form.system_key,
        short_description: form.short_description.trim() || null,
        description: form.description.trim() || null,
        price_monthly_cents: centsInputToPayload(form.price_monthly),
        price_setup_cents: centsInputToPayload(form.price_setup),
        price_one_time_cents: centsInputToPayload(form.price_one_time),
        support_monthly_cents: centsInputToPayload(form.support_monthly),
        maintenance_monthly_cents: centsInputToPayload(form.maintenance_monthly),
        active: form.active ? 1 : 0,
      };

      const url = editId ? `/api/plans/${editId}` : `/api/plans`;
      const method = editId ? "PUT" : "POST";

      const res = await apiFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Erro ao salvar plano");

      await carregarPlanos();
      fecharModal();
    } catch (e) {
      setError(String(e?.message || e));
    } finally {
      setSaving(false);
    }
  }

  async function excluir(planoId) {
    if (!window.confirm("Deseja realmente excluir o plano?")) return;
    setSaving(true);
    setError("");
    try {
      const res = await apiFetch(`/api/plans/${planoId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Erro ao excluir");
      await carregarPlanos();
    } catch (e) {
      setError(String(e?.message || e));
    } finally {
      setSaving(false);
    }
  }

  const planosFiltrados = useMemo(() => {
    const term = busca.trim().toLowerCase();
    if (!term) return items;
    return items.filter((p) => {
      const name = String(p?.name || "").toLowerCase();
      const system = String(SYSTEM_LABEL[p?.system_key] || p?.system_key || "").toLowerCase();
      const model = String(MODEL_LABEL[p?.model] || p?.model || "").toLowerCase();
      return name.includes(term) || system.includes(term) || model.includes(term);
    });
  }, [items, busca]);

  const planosPorSistema = useMemo(() => {
    return SYSTEM_OPTIONS.reduce((acc, s) => {
      acc[s.key] = planosFiltrados.filter((p) => p.system_key === s.key);
      return acc;
    }, {});
  }, [planosFiltrados]);

  return (
    <Sidebar>
      <div className={styles.planosContent}>
        <div className={styles.titleRow}>
          <h1>Gerenciar Planos</h1>
          <button className={styles.btnAdd} onClick={() => abrirModal()} disabled={loading || saving}>
            <Plus size={18} /> Novo Plano
          </button>
        </div>

        <div className={styles.searchBox}>
          <Search size={18} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Pesquisar planos..." />
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {(loading || saving) && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>{loading ? "Carregando planos..." : "Salvando..."}</p>
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className={styles.emptyState}>
            <Calendar size={48} />
            <p>Nenhum plano cadastrado ainda</p>
            <button className={styles.btnAddEmpty} onClick={() => abrirModal()} disabled={saving}>
              <Plus size={18} /> Criar Primeiro Plano
            </button>
          </div>
        )}

        {items.length > 0 && (
          <div className={styles.periodosContainer}>
            {SYSTEM_OPTIONS.map((sistema) => {
              const planosNoSistema = planosPorSistema[sistema.key] || [];
              if (planosNoSistema.length === 0) return null;

              return (
                <div key={sistema.key} className={styles.blocoperiodo}>
                  <div className={styles.periodoHeader}>
                    <span className={styles.periodoIcon}>{sistema.icon}</span>
                    <h2 className={styles.periodoTitle}>{sistema.label}</h2>
                    <span className={styles.periodoCount} data-periodo={sistema.key}>
                      {planosNoSistema.length} {planosNoSistema.length === 1 ? "plano" : "planos"}
                    </span>
                  </div>

                  <div className={styles.cardsGrid}>
                    {planosNoSistema.map((plano) => {
                      const precoPrincipal =
                        plano.model === "sale"
                          ? formatBRLFromCents(plano.price_one_time_cents)
                          : formatBRLFromCents(plano.price_monthly_cents);

                      const highlights = buildHighlights(plano);

                      return (
                        <div key={plano.id} className={styles.planoCard}>
                          <div className={styles.cardHeader}>
                            <h3 className={styles.planoNome}>{plano.name}</h3>
                            <div className={styles.planoBadge} data-periodo={plano.model}>
                              {MODEL_LABEL[plano.model] || plano.model}
                            </div>
                          </div>

                          <div className={styles.precoContainer}>
                            <span className={styles.precoValor}>{precoPrincipal}</span>
                            <span className={styles.precoPeriodo}>{plano.model === "sale" ? "" : "/mês"}</span>
                          </div>

                          <div className={styles.duracaoInfo}>
                            <Calendar size={14} />
                            <span>{plano.active ? "Ativo" : "Inativo"}</span>
                          </div>

                          <ul className={styles.beneficiosList}>
                            {highlights.length > 0 ? highlights.map((b, i) => <li key={i}>{b}</li>) : <li>Sem descrição.</li>}
                          </ul>

                          <div className={styles.cardFooter}>
                            <div className={styles.empresasBox}>
                              <Users size={16} />
                              <span>{SYSTEM_LABEL[plano.system_key] || plano.system_key}</span>
                            </div>
                            <div className={styles.actions}>
                              <button
                                className={styles.btnEdit}
                                onClick={() => abrirModal(plano)}
                                disabled={loading || saving}
                                title="Editar plano"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className={styles.btnPermissoes}
                                onClick={() => abrirModalPermissoes(plano)}
                                disabled={loading || saving}
                                title="Gerenciar permissões (não funcional ainda)"
                              >
                                <Shield size={16} />
                              </button>
                              <button
                                className={styles.btnDelete}
                                onClick={() => excluir(plano.id)}
                                disabled={loading || saving}
                                title="Excluir plano"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {modal && (
          <div className={styles.modalBg} onMouseDown={() => (!saving ? fecharModal() : null)}>
            <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>{editId ? `Editar Plano - ${form.name}` : "Novo Plano"}</h2>
                <button className={styles.btnFecharModal} onClick={fecharModal} disabled={saving} aria-label="Fechar modal">
                  ✕
                </button>
              </div>
              {error && <div className={styles.modalError}>{error}</div>}

              <input
                placeholder="Nome do plano"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                disabled={saving}
              />

              <select value={form.model} onChange={(e) => handleModelChange(e.target.value)} disabled={saving}>
                {MODEL_OPTIONS.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </select>

              <select
                value={form.system_key}
                onChange={(e) => setField("system_key", e.target.value)}
                disabled={saving || isSale}
              >
                {SYSTEM_OPTIONS.filter((o) => (isSale ? o.key === "sites-institucionais" : true)).map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>

              <input
                placeholder="Slug (opcional)"
                value={form.slug}
                onChange={(e) => setField("slug", e.target.value)}
                disabled={saving}
              />

              <input
                placeholder="Descrição curta (opcional)"
                value={form.short_description}
                onChange={(e) => setField("short_description", e.target.value)}
                disabled={saving}
              />

              {isRental && (
                <>
                  <input
                    placeholder="Mensalidade (R$)"
                    value={form.price_monthly}
                    onChange={(e) => setField("price_monthly", e.target.value)}
                    disabled={saving}
                    inputMode="decimal"
                  />
                  <input
                    placeholder="Setup/Implantação (R$)"
                    value={form.price_setup}
                    onChange={(e) => setField("price_setup", e.target.value)}
                    disabled={saving}
                    inputMode="decimal"
                  />
                </>
              )}

              {isSale && (
                <input
                  placeholder="Valor de venda (R$)"
                  value={form.price_one_time}
                  onChange={(e) => setField("price_one_time", e.target.value)}
                  disabled={saving}
                  inputMode="decimal"
                />
              )}

              {isAddon && (
                <input
                  placeholder="Mensalidade (R$)"
                  value={form.price_monthly}
                  onChange={(e) => setField("price_monthly", e.target.value)}
                  disabled={saving}
                  inputMode="decimal"
                />
              )}

              <input
                placeholder="Suporte mensal (R$)"
                value={form.support_monthly}
                onChange={(e) => setField("support_monthly", e.target.value)}
                disabled={saving}
                inputMode="decimal"
              />
              <input
                placeholder="Manutenção mensal (R$)"
                value={form.maintenance_monthly}
                onChange={(e) => setField("maintenance_monthly", e.target.value)}
                disabled={saving}
                inputMode="decimal"
              />

              <textarea
                rows={6}
                placeholder="Descrição completa (opcional)"
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                disabled={saving}
              />

              <label className={styles.activeLabel}>
                <input
                  type="checkbox"
                  className={styles.activeCheckbox}
                  checked={form.active}
                  onChange={(e) => setField("active", e.target.checked)}
                  disabled={saving}
                />
                <span>Ativo</span>
              </label>

              <div className={styles.modalBtns}>
                <button onClick={salvar} disabled={saving}>
                  {saving ? "Salvando..." : "Salvar"}
                </button>
                <button className={styles.btnCancel} onClick={fecharModal} disabled={saving}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {modalPermissoes && planoPermissoes && (
          <div className={styles.modalBg}>
            <div className={styles.modalPermissoes}>
              <div className={styles.modalPermissoesHeader}>
                <div>
                  <h2>Permissões do Plano</h2>
                  <p className={styles.planoNomeModal}>
                    {planoPermissoes.name} — {MODEL_LABEL[planoPermissoes.model] || planoPermissoes.model}
                  </p>
                </div>
                <button className={styles.btnFecharModal} onClick={fecharModalPermissoes} disabled={saving}>
                  ✕
                </button>
              </div>

              <div className={styles.permissoesContent}>
                {PERMISSOES_SISTEMA.map((categoria) => (
                  <div key={categoria.categoria} className={styles.categoriaPermissoes}>
                    <h3 className={styles.categoriaTitulo}>
                      <span className={styles.categoriaIcon}>📋</span>
                      {categoria.categoria}
                    </h3>

                    <div className={styles.permissoesGrid}>
                      {categoria.permissoes.map((perm) => {
                        const valorAtual = permissoesPorPlano[planoPermissoes.id]?.[perm.key];

                        return (
                          <div key={perm.key} className={styles.permissaoItem}>
                            {perm.tipo === "boolean" ? (
                              <label className={styles.permissaoLabel}>
                                <div className={styles.checkboxWrapper}>
                                  <input
                                    type="checkbox"
                                    checked={!!valorAtual}
                                    onChange={(e) => alterarPermissao(perm.key, e.target.checked)}
                                    className={styles.permissaoCheckbox}
                                  />
                                  <span className={styles.checkmark}></span>
                                </div>
                                <span className={styles.permissaoTexto}>{perm.label}</span>
                              </label>
                            ) : (
                              <div className={styles.permissaoComValor}>
                                <label className={styles.permissaoLabel}>
                                  <div className={styles.checkboxWrapper}>
                                    <input
                                      type="checkbox"
                                      checked={!!valorAtual?.ativo}
                                      onChange={(e) =>
                                        alterarPermissao(perm.key, {
                                          ...(valorAtual || { valor: perm.valor || 0 }),
                                          ativo: e.target.checked,
                                        })
                                      }
                                      className={styles.permissaoCheckbox}
                                    />
                                    <span className={styles.checkmark}></span>
                                  </div>
                                  <span className={styles.permissaoTexto}>{perm.label}</span>
                                </label>

                                {valorAtual?.ativo && (
                                  <input
                                    type="number"
                                    min="0"
                                    value={valorAtual?.valor || 0}
                                    onChange={(e) =>
                                      alterarPermissao(perm.key, {
                                        ...valorAtual,
                                        valor: parseInt(e.target.value, 10) || 0,
                                      })
                                    }
                                    className={styles.numeroInputInline}
                                    placeholder="0"
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.modalPermissoesBtns}>
                <button onClick={salvarPermissoes} disabled={saving} className={styles.btnSalvarPermissoes}>
                  {saving ? "Salvando..." : "Salvar Permissões"}
                </button>
                <button className={styles.btnCancelarPermissoes} onClick={fecharModalPermissoes} disabled={saving}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
}

export default Planos;
