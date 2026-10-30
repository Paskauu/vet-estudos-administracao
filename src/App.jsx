import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  CircleHelp,
  Download,
  FolderOpen,
  HardDrive,
  House,
  Layers,
  Leaf,
  Library,
  Menu,
  Stethoscope,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { modules, questions, moduleById } from "./content/index.js";
import { useStudy } from "./hooks/useStudy.js";
import { selectQuestions } from "./lib/study.js";
import { createId } from "./lib/id.js";
import { Modal, EmptyState } from "./components/UI.jsx";
import { Backup } from "./components/Backup.jsx";
import { Home } from "./pages/Home.jsx";
import { ModulePage } from "./pages/Module.jsx";
import { FlashcardsPage } from "./pages/Flashcards.jsx";
import { PracticePage, SessionPage } from "./pages/Practice.jsx";
import { ProgressPage } from "./pages/Progress.jsx";

const readRoute = () => {
  const [page = "inicio", id = ""] = location.hash
    .replace(/^#\/?/, "")
    .split("/");
  return { page: page || "inicio", id };
};
const nav = [
  { page: "inicio", label: "Meu estudo", icon: House },
  { page: "modulos", label: "Módulos", icon: BookOpen },
  { page: "flashcards", label: "Flashcards", icon: Layers },
  { page: "praticar", label: "Praticar", icon: Target },
  { page: "progresso", label: "Meu progresso", icon: TrendingUp },
];

export default function App() {
  const study = useStudy();
  const [route, setRoute] = useState(readRoute);
  const [modal, setModal] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  useEffect(() => {
    const change = () => {
      setRoute(readRoute());
      setMobileMenu(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  const navigate = (page, id = "") => {
    location.hash = `/${page}${id ? `/${id}` : ""}`;
  };
  const startSession = ({
    moduleIds,
    count,
    mode,
    onlyWrong = false,
    pool,
  }) => {
    const candidates =
      pool ||
      questions.filter(
        (q) =>
          !onlyWrong || study.progress.latestAnswers[q.id]?.correct === false,
      );
    const chosen = selectQuestions(candidates, moduleIds, count);
    if (!chosen.length) throw new Error("Não há questões nesta seleção.");
    const id = createId();
    if (
      study.record("session_start", id, {
        questionIds: chosen.map((q) => q.id),
        moduleIds,
        mode,
      })
    )
      navigate("sessao", id);
  };
  const active =
    route.page === "modulo"
      ? "modulos"
      : route.page === "sessao"
        ? "praticar"
        : route.page;
  let content;
  if (route.page === "inicio" || route.page === "modulos")
    content = (
      <Home
        progress={study.progress}
        navigate={navigate}
        modulesOnly={route.page === "modulos"}
      />
    );
  else if (route.page === "modulo" && moduleById[route.id])
    content = (
      <ModulePage
        key={route.id}
        module={moduleById[route.id]}
        progress={study.progress}
        record={study.record}
        navigate={navigate}
      />
    );
  else if (route.page === "flashcards")
    content = (
      <FlashcardsPage
        key={`cards-${route.id}`}
        progress={study.progress}
        record={study.record}
        initialModule={moduleById[route.id] ? route.id : null}
      />
    );
  else if (route.page === "praticar")
    content = (
      <PracticePage
        key={`practice-${route.id}`}
        progress={study.progress}
        initialModule={moduleById[route.id] ? route.id : null}
        navigate={navigate}
        startSession={startSession}
      />
    );
  else if (route.page === "sessao")
    content = (
      <SessionPage
        key={route.id}
        sessionId={route.id}
        progress={study.progress}
        record={study.record}
        navigate={navigate}
        startSession={startSession}
      />
    );
  else if (route.page === "progresso")
    content = (
      <ProgressPage
        progress={study.progress}
        navigate={navigate}
        openBackup={() => setModal("backup")}
      />
    );
  else
    content = (
      <EmptyState
        title="Vamos voltar à sua trilha"
        text="Este endereço não corresponde a uma área do seu estudo."
      >
        <button className="button primary" onClick={() => navigate("inicio")}>
          Ir para meu estudo
          <ArrowRight size={17} />
        </button>
      </EmptyState>
    );
  return (
    <>
      <a
        className="skip-link"
        href="#conteudo"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("conteudo").focus();
        }}
      >
        Pular para o conteúdo
      </a>
      <aside className={`sidebar ${mobileMenu ? "mobile-open" : ""}`}>
        <button
          className="brand"
          onClick={() => navigate("inicio")}
          aria-label="Vet Estudos, página inicial"
        >
          <img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" />
          <span>
            vet<span className="brand-light">estudos</span>
            <small>ESPAÇO DE APRENDIZAGEM</small>
          </span>
        </button>
        <div className="sidebar-course">
          <span className="course-icon">
            <Stethoscope size={19} />
          </span>
          <span>
            Medicina Veterinária<small>Administração e Aspectos Legais</small>
          </span>
        </div>
        <span className="sidebar-label">SEU ESPAÇO</span>
        <nav aria-label="Navegação principal">
          {nav.map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              className={active === page ? "active" : ""}
              aria-current={active === page ? "page" : undefined}
              onClick={() => navigate(page)}
            >
              <Icon size={20} />
              <span>{label}</span>
              {active === page && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="sidebar-help" onClick={() => setModal("sources")}>
            <Library size={18} />
            Materiais de consulta
            <ChevronRight size={15} />
          </button>
          <button className="sidebar-help" onClick={() => setModal("help")}>
            <CircleHelp size={18} />
            Como estudar por aqui
            <ChevronRight size={15} />
          </button>
          <div className="sidebar-quote">
            <Leaf size={23} />
            <p>
              Cuidar começa
              <br />
              por conhecer.
            </p>
            <span>Cultive seu conhecimento.</span>
          </div>
          <button className="storage-label" onClick={() => setModal("backup")}>
            <span className="status-dot" />
            Salvo neste navegador
            <HardDrive size={13} />
          </button>
        </div>
      </aside>
      <div className="app-body">
        <header className="app-header">
          <div className="header-breadcrumb">
            <button
              className="mobile-menu-toggle icon-button"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label={mobileMenu ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenu}
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
            <span className="header-brand" onClick={() => navigate("inicio")}>
              vet<span>estudos</span>
            </span>
            <span className="desktop-breadcrumb">
              Meu espaço <ChevronRight size={13} />
              <strong>
                {nav.find((n) => n.page === active)?.label || "Estudar"}
              </strong>
            </span>
          </div>
          <div className="header-actions">
            <span className="header-course">
              Administração e Aspectos Legais
            </span>
            <button
              className="icon-button"
              onClick={() => setModal("sources")}
              aria-label="Abrir materiais de consulta"
              title="Materiais de consulta"
            >
              <FolderOpen size={20} />
            </button>
            <button
              className="backup-header-button"
              onClick={() => setModal("backup")}
              aria-label="Gerenciar backup do progresso"
            >
              <Download size={17} />
              <span>Meu backup</span>
            </button>
            <span
              className="profile-badge"
              aria-label="Espaço de estudo de Medicina Veterinária"
            >
              <Stethoscope size={20} />
            </span>
          </div>
        </header>
        <main id="conteudo" tabIndex={-1}>
          {study.error && (
            <div className="global-error" role="alert">
              <span>{study.error}</span>
              <button
                className="icon-button"
                onClick={() => study.setError("")}
                aria-label="Fechar aviso"
              >
                <X size={17} />
              </button>
            </div>
          )}
          {content}
          <footer className="main-footer">
            <span>
              <Leaf size={13} />
              Feito para aprender com calma.
            </span>
            <button onClick={() => setModal("sources")}>
              8 módulos · Referências em cada conceito
              <BookOpen size={13} />
            </button>
          </footer>
        </main>
      </div>
      <nav className="bottom-nav" aria-label="Navegação no tablet e celular">
        {nav
          .filter((n) => n.page !== "modulos")
          .map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              className={
                active === page || (page === "inicio" && active === "modulos")
                  ? "active"
                  : ""
              }
              aria-current={active === page ? "page" : undefined}
              onClick={() => navigate(page)}
            >
              <Icon size={21} />
              <span>
                {page === "inicio"
                  ? "Estudar"
                  : page === "progresso"
                    ? "Progresso"
                    : label}
              </span>
            </button>
          ))}
      </nav>
      {mobileMenu && (
        <button
          className="sidebar-scrim"
          onClick={() => setMobileMenu(false)}
          aria-label="Fechar menu"
        />
      )}
      {modal === "backup" && (
        <Backup study={study} onClose={() => setModal(null)} />
      )}
      {modal === "sources" && (
        <Modal
          title="A fonte de cada descoberta"
          onClose={() => setModal(null)}
          wide
        >
          <p className="modal-intro">
            Todo o conteúdo de estudo foi elaborado exclusivamente a partir
            destas oito apostilas. As referências usam a página física do PDF,
            contada a partir de 1.
          </p>
          <div className="sources-list">
            {modules.map((m) => (
              <a
                key={m.id}
                href={`${import.meta.env.BASE_URL}fontes/${m.id}.pdf`}
                target="_blank"
                rel="noreferrer"
              >
                <span className={`module-number tone-${(m.order - 1) % 4}`}>
                  {m.source.topic}
                </span>
                <span>
                  <strong>{m.title}</strong>
                  <small>
                    {m.source.pages} páginas · {m.source.filename}
                  </small>
                </span>
                <ArrowRight size={17} />
              </a>
            ))}
          </div>
          <div className="source-note">
            Os arquivos fornecidos são apostilas, sem identificação consistente
            de slides. Algumas figuras anunciadas estão ausentes nos originais;
            esses trechos não foram reconstruídos com fontes externas.
          </div>
        </Modal>
      )}
      {modal === "help" && (
        <Modal
          title="Seu estudo, um passo de cada vez"
          onClose={() => setModal(null)}
        >
          <ol className="how-to">
            <li>
              <span>01</span>
              <div>
                <h3>Entenda um conceito</h3>
                <p>
                  Escolha um módulo e leia uma etapa. Use as referências para
                  voltar à página original.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Tente lembrar</h3>
                <p>
                  Revise os flashcards sem consultar a resposta. Avalie como foi
                  lembrar para agendar a próxima revisão.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Coloque em prática</h3>
                <p>
                  Faça uma prática com explicação imediata ou um simulado com
                  correção ao final. Você pode misturar módulos.
                </p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <h3>Cuide do seu progresso</h3>
                <p>
                  As respostas ficam neste navegador. Exporte um backup para
                  guardar ou continuar em outro dispositivo.
                </p>
              </div>
            </li>
          </ol>
          <button
            className="button primary full-width"
            onClick={() => setModal(null)}
          >
            Vamos estudar
            <ArrowRight size={17} />
          </button>
        </Modal>
      )}
    </>
  );
}
