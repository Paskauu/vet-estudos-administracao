import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Layers,
  Search,
  Stethoscope,
  Target,
} from "lucide-react";
import { useCourse } from "../hooks/useCourse.jsx";
import { percent } from "../lib/study.js";
import { ProgressBar } from "../components/UI.jsx";

function GardenArt() {
  return (
    <svg
      className="garden-art"
      viewBox="0 0 300 290"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="162" cy="142" r="111" fill="#ffffff" opacity=".055" />
      <circle
        cx="162"
        cy="142"
        r="84"
        stroke="#a5c9b3"
        opacity=".22"
        strokeDasharray="3 8"
      />
      <path
        d="M219 220c-1-46 9-67 37-94M227 174c-27-2-39-15-37-36 27 1 38 14 37 36M239 150c0-22 12-36 35-39 0 23-12 37-35 39M222 200c-24 0-37-10-39-28 24-2 37 8 39 28M246 221c-7-31-5-54 8-72"
        stroke="#9aba9d"
        strokeWidth="2"
      />
      <path
        d="M68 210c-9-43-8-79 9-111M68 166c-22-5-32-19-28-39 24 5 33 18 28 39M74 137c-4-25 2-42 23-51 8 24 1 42-23 51M68 190c-19-4-28-14-28-31 22 2 31 12 28 31"
        fill="#acc9a1"
        opacity=".62"
      />
      <path d="m91 114 76-17 62 28-6 104-67 9-70-29Z" fill="#123d34" />
      <path d="m94 115 63 7 60-9v103l-59 12-65-13Z" fill="#eeeadd" />
      <path d="m97 108 60 10 58-16v108l-57 16-61-13Z" fill="#f6f2e6" />
      <path d="M157 119v105" stroke="#c9c9b5" strokeWidth="2" />
      <path
        d="m107 135 35 6m-35 7 35 6m-35 7 27 5m-27 8 35 6m-35 8 35 6"
        stroke="#b3bfa8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M181 149c-15 3-22 23-6 26 6 1 8-4 13-4s10 1 13-5c5-10-11-20-20-17"
        fill="#65937e"
      />
      <ellipse
        cx="173"
        cy="139"
        rx="5"
        ry="7"
        transform="rotate(-25 173 139)"
        fill="#65937e"
      />
      <ellipse cx="185" cy="134" rx="5" ry="7" fill="#65937e" />
      <ellipse
        cx="196"
        cy="137"
        rx="4.5"
        ry="6"
        transform="rotate(20 196 137)"
        fill="#65937e"
      />
      <ellipse
        cx="204"
        cy="147"
        rx="4"
        ry="5.5"
        transform="rotate(30 204 147)"
        fill="#65937e"
      />
      <path
        d="m174 193 27-6m-27 14 20-5"
        stroke="#bac5ad"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M170 74c0-16 9-26 25-28-1 17-9 26-25 28M169 76c-15-1-23-9-24-22 15 0 23 8 24 22"
        fill="#acc9a1"
      />
      <path d="M170 80V64" stroke="#acc9a1" strokeWidth="2" />
      <path d="m115 69 3-7 3 7 7 3-7 3-3 7-3-7-7-3Z" fill="#d9c39b" />
      <circle cx="250" cy="91" r="3" fill="#d9c39b" />
      <circle cx="62" cy="87" r="2" fill="#d9c39b" />
    </svg>
  );
}

export function Home({ progress, navigate, modulesOnly = false }) {
  const { modules, allLessons, flashcards, course } = useCourse();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const readCount = allLessons.filter((l) => progress.readLessons[l.id]).length;
  const nextModule =
    modules.find((m) => m.lessons.some((l) => !progress.readLessons[l.id])) ||
    modules[0];
  const normalize = (s) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const shown = useMemo(
    () =>
      modules.filter(
        (m) =>
          (filter === "all" ||
            m.category === filter) &&
          normalize(`${m.title} ${m.description}`).includes(normalize(query)),
      ),
    [filter, query, modules],
  );
  return (
    <>
      {!modulesOnly && (
        <>
          <section className="study-hero">
            <div className="hero-copy">
              <span className="hero-kicker">
                <Stethoscope size={15} /> MEDICINA VETERINÁRIA
              </span>
              <h1>Meu estudo</h1>
              <p>Módulos, flashcards, questões e simulados.</p>
              <button
                className="button cream"
                onClick={() => navigate("modulo", nextModule.id)}
              >
                {readCount ? "Continuar de onde parei" : "Começar a estudar"}
                <ArrowRight size={18} />
              </button>
              <span className="hero-footnote">
                {course.title}
              </span>
            </div>
            <GardenArt />
          </section>
          <div className="stat-grid home-stats">
            <div className="stat-card">
              <span className="stat-icon sage">
                <BookOpen size={20} />
              </span>
              <div>
                <strong>
                  {readCount}
                  <small> / {allLessons.length}</small>
                </strong>
                <span>Etapas estudadas</span>
              </div>
              <ProgressBar
                value={percent(readCount, allLessons.length)}
                label="Etapas estudadas"
              />
            </div>
            <div className="stat-card">
              <span className="stat-icon sand">
                <Layers size={20} />
              </span>
              <div>
                <strong>
                  {Object.keys(progress.reviews).length}
                  <small> / {flashcards.length}</small>
                </strong>
                <span>Flashcards revisados</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon lilac">
                <Target size={20} />
              </span>
              <div>
                <strong>
                  {progress.answered
                    ? `${percent(progress.correct, progress.answered)}%`
                    : "—"}
                </strong>
                <span>
                  {progress.answered
                    ? `Acertos em ${progress.answered} respostas`
                    : "Nenhuma resposta registrada"}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
      <section className="modules-section">
        <div className="section-heading">
          <div>
            <h2>
              {modulesOnly ? "Biblioteca de módulos" : "Módulos"}
            </h2>
          </div>
          <span className="subtle-badge">{modules.length} módulos</span>
        </div>
        <div className="library-tools">
          <div className="filter-tabs" aria-label="Filtrar módulos">
            {course.filters.map(([id, label]) => (
              <button
                key={id}
                className={filter === id ? "active" : ""}
                aria-pressed={filter === id}
                onClick={() => setFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="search-field">
            <Search size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar um assunto"
              aria-label="Buscar módulo"
            />
          </label>
        </div>
        {course.id === "epidemiologia" && <p className="course-material-note">7 aulas disponíveis: 01, 02, 03, 05, 06, 07 e 08. O material da aula 04 não foi fornecido.</p>}
        <div className="module-grid">
          {shown.map((m) => {
            const done = m.lessons.filter(
              (l) => progress.readLessons[l.id],
            ).length;
            const complete = done === m.lessons.length;
            return (
              <button
                key={m.id}
                className={`module-card ${complete ? "is-complete" : ""}`}
                onClick={() => navigate("modulo", m.id)}
              >
                <div className="module-top">
                  <span className={`module-number tone-${(m.order - 1) % 4}`}>
                    {m.source.topic}
                  </span>
                  <span className="module-category">
                    {m.category.toLocaleUpperCase("pt-BR")}
                  </span>
                  {complete ? (
                    <span className="done-mark">
                      <Check size={15} />
                    </span>
                  ) : (
                    <ChevronRight className="card-chevron" size={18} />
                  )}
                </div>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
                <div className="module-bottom">
                  <span>
                    <BookOpen size={13} />
                    {m.lessons.length} etapas
                  </span>
                  <span>
                    <Layers size={13} />
                    {m.flashcards.length} cartões
                  </span>
                  <span>{m.source.pages} págs.</span>
                </div>
                <div className="module-progress">
                  <ProgressBar
                    value={percent(done, m.lessons.length)}
                    label={`Progresso de ${m.shortTitle}`}
                  />
                  <span>
                    {complete
                      ? "Concluído"
                      : done
                        ? `${done}/${m.lessons.length} etapas`
                        : "Começar"}
                    {!complete && <ArrowRight size={13} />}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        {!shown.length && (
          <div className="empty-state">
            <Search size={28} />
            <h3>Nenhum módulo encontrado</h3>
            <p>Tente buscar por um termo mais curto.</p>
          </div>
        )}
      </section>
      {!modulesOnly && (
        <div className="study-tip">
          <span className="tip-icon">
            <Layers size={23} />
          </span>
          <div>
            <strong>Flashcards</strong>
            <p>Revise perguntas e respostas dos módulos.</p>
          </div>
          <button
            className="text-button"
            onClick={() => navigate("flashcards")}
          >
            Revisar agora
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </>
  );
}
