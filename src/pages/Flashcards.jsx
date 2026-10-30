import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Layers,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { moduleById } from "../content/index.js";
import { useCourse } from "../hooks/useCourse.jsx";
import { nextReview, shuffle, percent } from "../lib/study.js";
import {
  EmptyState,
  Modal,
  ModulePicker,
  PageHeading,
  ProgressBar,
  SourceRefs,
} from "../components/UI.jsx";

export function FlashcardsPage({ progress, record, initialModule }) {
  const { modules, flashcards } = useCourse();
  const [selected, setSelected] = useState(
    initialModule ? [initialModule] : modules.map((m) => m.id),
  );
  const [onlyDue, setOnlyDue] = useState(true);
  const [picker, setPicker] = useState(false);
  const [deck, setDeck] = useState(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionRatings, setSessionRatings] = useState([]);
  const pool = useMemo(
    () => flashcards.filter((c) => selected.includes(c.moduleId)),
    [selected, flashcards],
  );
  const due = pool.filter(
    (c) =>
      !progress.reviews[c.id] ||
      new Date(progress.reviews[c.id].dueAt) <= new Date(),
  );
  const ready = onlyDue ? due : pool;
  const start = () => {
    if (!ready.length) return;
    setDeck(shuffle(ready));
    setIndex(0);
    setFlipped(false);
    setSessionRatings([]);
  };
  const rate = (rating) => {
    const card = deck[index];
    if (
      !record("review", card.id, {
        ...nextReview(rating, progress.reviews[card.id]),
        moduleId: card.moduleId,
      })
    )
      return;
    setSessionRatings([...sessionRatings, rating]);
    setIndex(index + 1);
    setFlipped(false);
  };
  return (
    <>
      <PageHeading
        eyebrow="REVISÃO ATIVA"
        title="Um cartão. Uma descoberta."
        text="Tente lembrar antes de virar. É assim que o conceito encontra seu lugar."
      />
      {picker && (
        <Modal title="Escolher módulos" onClose={() => setPicker(false)}>
          <ModulePicker
            modules={modules}
            selected={selected}
            onChange={setSelected}
          />
          <button
            className="button primary full-width"
            onClick={() => setPicker(false)}
          >
            Usar seleção
            <CheckCircle2 size={17} />
          </button>
        </Modal>
      )}
      {!deck ? (
        <>
          <div className="flash-setup panel">
            <div className="flash-setup-top">
              <span className="stat-icon sage">
                <Layers size={24} />
              </span>
              <div>
                <h2>Sua próxima revisão</h2>
                <p>Escolha os assuntos e reserve alguns minutos para você.</p>
              </div>
            </div>
            <button
              className="selection-button"
              onClick={() => setPicker(true)}
            >
              <SlidersHorizontal size={17} />
              {selected.length === 8
                ? "Todos os módulos"
                : `${selected.length} ${selected.length === 1 ? "módulo selecionado" : "módulos selecionados"}`}
              <ChevronDown size={17} />
            </button>
            <div className="mode-switch">
              <button
                className={onlyDue ? "active" : ""}
                aria-pressed={onlyDue}
                onClick={() => setOnlyDue(true)}
              >
                Para hoje <span>{due.length}</span>
              </button>
              <button
                className={!onlyDue ? "active" : ""}
                aria-pressed={!onlyDue}
                onClick={() => setOnlyDue(false)}
              >
                Todos os cartões <span>{pool.length}</span>
              </button>
            </div>
            <div className="flash-ready">
              <strong>{ready.length}</strong>
              <span>cartões para {onlyDue ? "revisar hoje" : "explorar"}</span>
            </div>
            {ready.length ? (
              <button className="button primary full-width" onClick={start}>
                Começar revisão
                <ArrowRight size={18} />
              </button>
            ) : (
              <EmptyState
                icon={CheckCircle2}
                title={
                  selected.length ? "Revisão em dia!" : "Escolha um módulo"
                }
                text={
                  selected.length
                    ? "Os próximos cartões aparecem aqui quando chegar a hora. Você também pode revisar todos os cartões."
                    : "Selecione um ou mais assuntos para montar sua revisão."
                }
              >
                {selected.length > 0 && (
                  <button
                    className="button secondary"
                    onClick={() => setOnlyDue(false)}
                  >
                    Explorar todos os cartões
                  </button>
                )}
              </EmptyState>
            )}
          </div>
          <div className="quiet-explainer">
            <Sparkles size={18} />
            <p>
              <strong>Pequenas revisões, memória mais forte.</strong> Sua
              avaliação agenda o próximo encontro com cada conceito. Os estudos
              ficam salvos neste navegador.
            </p>
          </div>
        </>
      ) : index >= deck.length ? (
        <div className="panel review-complete">
          <span className="success-circle">
            <CheckCircle2 size={42} />
          </span>
          <span className="eyebrow">UM PASSO A MAIS</span>
          <h2>Revisão concluída!</h2>
          <p>Você se dedicou a {deck.length} conceitos nesta rodada.</p>
          <div className="review-totals">
            <div>
              <strong>
                {
                  sessionRatings.filter((r) => r === "good" || r === "easy")
                    .length
                }
              </strong>
              <span>Lembrados com segurança</span>
            </div>
            <div>
              <strong>
                {
                  sessionRatings.filter((r) => r === "again" || r === "hard")
                    .length
                }
              </strong>
              <span>Para encontrar de novo</span>
            </div>
          </div>
          <button className="button primary" onClick={() => setDeck(null)}>
            Voltar aos cartões
            <ArrowRight size={17} />
          </button>
        </div>
      ) : (
        <div className="flash-session">
          <div className="session-topline">
            <button className="back-link" onClick={() => setDeck(null)}>
              <ArrowLeft size={16} />
              Encerrar revisão
            </button>
            <span>
              {index + 1} de {deck.length} cartões
            </span>
          </div>
          <ProgressBar
            value={percent(index, deck.length)}
            label="Progresso da revisão"
          />
          <button
            className={`flashcard ${flipped ? "flipped" : ""}`}
            onClick={() => setFlipped(!flipped)}
            aria-label={
              flipped
                ? "Ver pergunta novamente"
                : "Virar cartão e revelar resposta"
            }
          >
            <span className="flashcard-module">
              MÓDULO {moduleById[deck[index].moduleId].source.topic} ·{" "}
              {moduleById[deck[index].moduleId].shortTitle}
            </span>
            <span className="flashcard-side">
              {flipped ? "RESPOSTA" : "TENTE LEMBRAR"}
            </span>
            <span className="flashcard-text">
              {flipped ? deck[index].back : deck[index].front}
            </span>
            <span className="flip-hint">
              <RotateCcw size={16} />
              {flipped
                ? "Toque para ver a pergunta"
                : "Toque para revelar a resposta"}
            </span>
          </button>
          {flipped ? (
            <>
              <SourceRefs
                module={moduleById[deck[index].moduleId]}
                refs={deck[index].refs}
              />
              <div className="rating-heading">Como foi lembrar?</div>
              <div className="rating-buttons">
                {[
                  ["again", "Ainda não", "10 minutos"],
                  ["hard", "Com esforço", "1 dia ou mais"],
                  ["good", "Lembrei", "1 dia ou mais"],
                  ["easy", "Foi fácil", "4 dias ou mais"],
                ].map(([id, label, hint]) => (
                  <button
                    key={id}
                    className={`rating ${id}`}
                    onClick={() => rate(id)}
                  >
                    <strong>{label}</strong>
                    <span>{hint}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="flash-prompt">
              Pense na sua resposta antes de virar. Sem pressa.
            </p>
          )}
        </div>
      )}
    </>
  );
}
