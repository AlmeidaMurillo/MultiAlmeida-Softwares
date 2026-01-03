import { useCallback, useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import useSeo from '../../../utils/useSeo';
import styles from './ContratosModelo.module.css';
import { apiFetch } from '../../../utils/auth';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const DOCS_ORDER = [
  'contract_site_sale',
  'contract_subscription',
  'terms_of_use',
  'privacy_policy',
];

function sortDocs(docs) {
  const rank = new Map(DOCS_ORDER.map((k, i) => [k, i]));
  return [...docs].sort((a, b) => {
    const ra = rank.has(a.doc_key) ? rank.get(a.doc_key) : 999;
    const rb = rank.has(b.doc_key) ? rank.get(b.doc_key) : 999;
    if (ra !== rb) return ra - rb;
    return String(a.doc_key).localeCompare(String(b.doc_key));
  });
}

function ContratosModelo() {
  useSeo({
    title: 'Editar Contratos | Admin | MultiAlmeida Softwares',
    description: 'Edição dos modelos de contrato e documentos legais.',
    noindex: true,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [docs, setDocs] = useState([]);

  const [selectedKey, setSelectedKey] = useState('contract_site_sale');

  const [form, setForm] = useState({ title: '', version: '', content: '' });

  const loadDocs = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch(`/api/legal/admin/documents`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Erro ao listar documentos.');
      const nextDocs = sortDocs(Array.isArray(data) ? data : []);
      setDocs(nextDocs);
      setSelectedKey((prev) => {
        if (!nextDocs.length) return prev;
        const exists = nextDocs.some((d) => d.doc_key === prev);
        return exists ? prev : nextDocs[0].doc_key;
      });
    } catch (e) {
      setError(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocs();
  }, [loadDocs]);

  useEffect(() => {
    if (!selectedKey) return;

    // Para editar, vamos buscar o documento completo (content)
    let alive = true;
    async function loadFull() {
      try {
        setError('');
        const res = await fetch(`${API_BASE}/api/legal/documents/${selectedKey}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'Erro ao carregar documento.');
        if (!alive) return;
        setForm({
          title: data?.title || '',
          version: data?.version || '',
          content: data?.content || '',
        });
      } catch (e) {
        if (alive) setError(String(e?.message || e));
      }
    }

    loadFull();
    return () => {
      alive = false;
    };
  }, [selectedKey]);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!selectedKey) return;
    setSaving(true);
    setError('');
    try {
      if (!form.title.trim()) throw new Error('Informe o título.');
      if (!form.content.trim()) throw new Error('Informe o conteúdo.');

      const res = await apiFetch(`/api/legal/admin/documents/${selectedKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          version: form.version || undefined,
          content: form.content,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Erro ao salvar documento.');

      await loadDocs();
      setForm({
        title: data?.title || form.title,
        version: data?.version || form.version,
        content: data?.content || form.content,
      });
    } catch (e) {
      setError(String(e?.message || e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Sidebar>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Editar Contratos</h1>
            <p className={styles.subtitle}>
              Edite os modelos de contrato. O envio automático de contrato será usado apenas para venda de sites.
            </p>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {loading && <div className={styles.loading}>Carregando…</div>}

        <div className={styles.card}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Documento</label>
              <select
                className={styles.input}
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                disabled={loading || saving}
              >
                {docs.map((d) => (
                  <option key={d.doc_key} value={d.doc_key}>
                    {d.title || d.doc_key}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Versão</label>
              <input
                className={styles.input}
                value={form.version}
                onChange={(e) => setField('version', e.target.value)}
                placeholder="Ex.: 2026-01-03"
                disabled={loading || saving}
              />
              <div className={styles.hint}>Se vazio, salva com a data de hoje.</div>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Título</label>
            <input
              className={styles.input}
              value={form.title}
              onChange={(e) => setField('title', e.target.value)}
              disabled={loading || saving}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Conteúdo (texto)</label>
            <textarea
              className={styles.textarea}
              value={form.content}
              onChange={(e) => setField('content', e.target.value)}
              rows={18}
              disabled={loading || saving}
            />
            <div className={styles.hint}>
              Placeholders disponíveis (nos contratos): {`{{clientLabel}}`} {`{{companyBlock}}`} {`{{scope}}`} etc.
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryBtn} onClick={handleSave} disabled={loading || saving}>
              {saving ? 'Salvando…' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default ContratosModelo;
