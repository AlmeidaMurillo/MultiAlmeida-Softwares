import Sidebar from "../../../components/Sidebar/Sidebar";
import useSeo from "../../../utils/useSeo";
import styles from "./LogoutTest.module.css";
import { logout } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LogoutTest() {
  useSeo({
    title: "Logout | Admin | MultiAlmeida Softwares",
    description: "Tela simples para testar logout.",
    noindex: true,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setLoading(true);
    setError("");
    try {
      await logout();
      navigate("/admin/login", { replace: true });
    } catch (e) {
      setError(String(e?.message || e));
      setLoading(false);
    }
  }

  return (
    <Sidebar>
      <div className={styles.page}>
        <h1 className={styles.title}>Logout (teste)</h1>
        <p className={styles.subtitle}>Use esta tela para testar o logout via cookie.</p>

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.button} onClick={handleLogout} disabled={loading}>
          {loading ? "Saindo…" : "Logout"}
        </button>
      </div>
    </Sidebar>
  );
}

export default LogoutTest;
