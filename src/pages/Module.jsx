import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Layers,
  Lightbulb,
} from "lucide-react";
import { SourceRefs, ProgressBar } from "../components/UI.jsx";
import { percent } from "../lib/study.js";

export function ModulePage({ module, progress, record, navigate }) {
  const [index, setIndex] = useState(() =>
    Math.max(
      0,
      module.lessons.findIndex((l) => !progress.readLessons[l.id]),
    ),
  );
  const lesson = module.lessons[index];
  const done = module.lessons.filter((l) => progress.readLessons[l.id]).length;
  const card = module.flashcards[index % module.flashcards.length];
  const next = () => {
    if (!record("lesson_read", lesson.id, { moduleId: module.id, read: true }))
      return;
    if (index < module.lessons.length - 1) {
      setIndex(index + 1);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else navigate("modulos");
  };
  return (
    <>
      <button className="back-link" onClick={() => navigate("modulos")}>
        <ArrowLeft size={17} />
        Todos os módulos
      </button>
      <div className="module-page-head">
        <span className="eyebrow">
          MÓDULO {module.source.topic} ·{" "}
          {module.category.toLocaleUpperCase("pt-BR")}
        </span>
        <h1>{module.title}</h1>
        <p>{module.description}</p>
        <div className="reader-meta">
          <span>
            <BookOpen size={15} />
            {module.lessons.length} etapas
          </span>
          <span>
            <Layers size={15} />
            {module.flashcards.length} cartões
          </span>
          <a
            href={`${import.meta.env.BASE_URL}fontes/${module.id}.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            Abrir apostila original
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
      <div className="reader-layout">
        <aside className="lesson-outline">
          <div className="outline-heading">
            <strong>Neste módulo</strong>
            <span>
              {done}/{module.lessons.length}
            </span>
          </div>
          <ProgressBar
            value={percent(done, module.lessons.length)}
            label="Progresso do módulo"
          />
          <ol>
            {module.lessons.map((l, i) => (
              <li key={l.id}>
                <button
                  className={index === i ? "active" : ""}
                  aria-current={index === i ? "step" : undefined}
                  onClick={() => {
                    setIndex(i);
                    window.scrollTo({ top: 0, behavior: "instant" });
                  }}
                >
                  <span
                    className={`step-number ${progress.readLessons[l.id] ? "complete" : ""}`}
                  >
                    {progress.readLessons[l.id] ? <Check size={13} /> : i + 1}
                  </span>
                  <span>{l.title}</span>
                  {index === i && <ChevronRight size={14} />}
                </button>
              </li>
            ))}
          </ol>
          <div className="outline-note">
            <Lightbulb size={17} />
            <p>Após a leitura, responda sem consultar.</p>
          </div>
        </aside>
        <article className="lesson-content" key={lesson.id}>
          <div className="lesson-header">
            <span className="eyebrow">
              ETAPA {String(index + 1).padStart(2, "0")} DE{" "}
              {module.lessons.length}
            </span>
            {progress.readLessons[lesson.id] && (
              <span className="completed-label">
                <CheckCircle2 size={14} />
                Estudada
              </span>
            )}
          </div>
          <h2>{lesson.title}</h2>
          <p className="lesson-intro">{lesson.intro}</p>
          {module.courseId === "administracao" && module.order > 6 && (
            <div className="source-note">
              Síntese da apostila fornecida para esta disciplina. Os conceitos e
              exemplos jurídicos seguem esse material.
            </div>
          )}
          {lesson.blocks.map((b, i) => (
            <section className="concept-block" key={`${lesson.id}-${i}`}>
              <span className="concept-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
                {b.bullets?.length > 0 && (
                  <ul>
                    {b.bullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                )}
                <SourceRefs module={module} refs={b.refs} />
              </div>
            </section>
          ))}
          <details className="memory-check">
            <summary>
              <Lightbulb size={20} />
              <span>
                Revisão<strong>{card.front}</strong>
              </span>
              <ChevronRight size={18} />
            </summary>
            <div>
              <p>{card.back}</p>
              <SourceRefs module={module} refs={card.refs} />
            </div>
          </details>
          <div className="lesson-actions">
            {index > 0 ? (
              <button
                className="button secondary"
                onClick={() => {
                  setIndex(index - 1);
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
              >
                <ArrowLeft size={16} />
                Anterior
              </button>
            ) : (
              <span />
            )}
            <button className="button primary" onClick={next}>
              <CheckCircle2 size={17} />
              {index === module.lessons.length - 1
                ? "Concluir módulo"
                : "Concluir e continuar"}
              <ArrowRight size={17} />
            </button>
          </div>
          <div className="reader-reference">
            <BookOpen size={15} />
            <span>
              Referências indicam a página do PDF, contada a partir de 1. Toque
              na referência para consultar a fonte.
            </span>
          </div>
        </article>
      </div>
      <div className="module-next-step">
        <div>
          <strong>Revisão do módulo</strong>
          <p>Revise os cartões ou responda às questões.</p>
        </div>
        <button
          className="button secondary"
          onClick={() => navigate("flashcards", module.id)}
        >
          <Layers size={17} />
          Flashcards
        </button>
        <button
          className="button primary"
          onClick={() => navigate("praticar", module.id)}
        >
          Praticar
          <ArrowRight size={17} />
        </button>
      </div>
    </>
  );
}
