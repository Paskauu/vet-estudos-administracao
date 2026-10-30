import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "./disciplines.css";
const App = React.lazy(() => import("./App.jsx"));

class ErrorBoundary extends React.Component {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <div className="fatal-error">
        <h1>Não foi possível abrir a página</h1>
        <p>
          Não foi possível abrir esta tela. Recarregue a página para tentar
          novamente. Seus registros salvos são preservados.
        </p>
        <button onClick={() => location.reload()}>Recarregar</button>
      </div>
    ) : (
      this.props.children
    );
  }
}
createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <React.Suspense
      fallback={
        <div className="loading-screen">
          <img src="./icon.svg" alt="" />
          <p>Carregando…</p>
        </div>
      }
    >
      <App />
    </React.Suspense>
  </ErrorBoundary>,
);
