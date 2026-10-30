import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Layers,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { moduleById } from "../content/index.js";
import { useCourse } from "../hooks/useCourse.jsx";
import { shuffle, percent } from "../lib/study.js";
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
  const [onlyUnreviewed, setOnlyUnreviewed] = useState(true);
  const [picker, setPicker] = useState(false);
  const [deck, setDeck] = useState(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionReviewed, setSessionReviewed] = useState(() => new Set());
  const pool = useMemo(
    () => flashcards.filter((c) => selected.includes(c.moduleId)),
    [selected, flashcards],
  );
  const unreviewed = pool.filter((c) => !progress.reviews[c.id]);
  const ready = onlyUnreviewed ? unreviewed : pool;
  const start = () => {
    if (!ready.length) return;
    setDeck(shuffle(ready));
    setIndex(0);
    setFlipped(false);
    setSessionReviewed(new Set());
  };
  const flip = () => {
    const card = deck[index];
    if (
      !flipped &&
      !sessionReviewed.has(card.id) &&
      record("review", card.id, { moduleId: card.moduleId })
    )
      setSessionReviewed((previous) => new Set(previous).add(card.id));
    setFlipped(!flipped);
  };
  const move = (step) => {
    setIndex((current) => Math.max(0, Math.min(deck.length, current + step)));
    setFlipped(false);
  };
  return (
    <>
      <PageHeading
        title="Flashcards"
        text="Toque no cartão para ver a resposta."
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
                <h2>Selecionar cartões</h2>
                <p>Escolha os módulos para revisar.</p>
              </div>
            </div>
            <button
              className="selection-button"
              onClick={() => setPicker(true)}
            >
              <SlidersHorizontal size={17} />
              {selected.length === modules.length
                ? "Todos os módulos"
                : `${selected.length} ${selected.length === 1 ? "módulo selecionado" : "módulos selecionados"}`}
              <ChevronDown size={17} />
            </button>
            <div className="mode-switch">
              <button
                className={onlyUnreviewed ? "active" : ""}
                aria-pressed={onlyUnreviewed}
                onClick={() => setOnlyUnreviewed(true)}
              >
                Não revisados <span>{unreviewed.length}</span>
              </button>
              <button
                className={!onlyUnreviewed ? "active" : ""}
                aria-pressed={!onlyUnreviewed}
                onClick={() => setOnlyUnreviewed(false)}
              >
                Todos os cartões <span>{pool.length}</span>
              </button>
            </div>
            <div className="flash-ready">
              <strong>{ready.length}</strong>
              <span>cartões para {onlyUnreviewed ? "revisar" : "explorar"}</span>
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
                  selected.length ? "Nenhum cartão pendente" : "Escolha um módulo"
                }
                text={
                  selected.length
                    ? "Use Todos os cartões para revisar novamente."
                    : "Selecione ao menos um módulo."
                }
              >
                {selected.length > 0 && (
                  <button
                    className="button secondary"
                    onClick={() => setOnlyUnreviewed(false)}
                  >
                    Explorar todos os cartões
                  </button>
                )}
              </EmptyState>
            )}
          </div>
          <div className="quiet-explainer">
            <Layers size={18} />
            <p>
              Revelar a resposta registra a revisão neste navegador.
            </p>
          </div>
        </>
      ) : index >= deck.length ? (
        <div className="panel review-complete">
          <span className="success-circle">
            <CheckCircle2 size={42} />
          </span>
          <h2>Rodada concluída</h2>
          <p>{deck.length} cartões na seleção.</p>
          <div className="review-totals">
            <div>
              <strong>{sessionReviewed.size}</strong>
              <span>Revisados nesta rodada</span>
            </div>
            <div>
              <strong>{deck.length - sessionReviewed.size}</strong>
              <span>Sem revisão registrada</span>
            </div>
          </div>
          <div className="flash-navigation">
            <button className="button secondary" onClick={() => move(-1)}>
              <ArrowLeft size={17} />
              Voltar
            </button>
            <button className="button primary" onClick={() => setDeck(null)}>
              Escolher cartões
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flash-session">
          <div className="session-topline">
            <button className="back-link" onClick={() => setDeck(null)}>
              <ArrowLeft size={16} />
              Encerrar revisão
            </button>
            <span aria-live="polite" aria-atomic="true">
              {index + 1} de {deck.length} cartões
            </span>
          </div>
          <ProgressBar
            value={percent(index, deck.length)}
            label="Progresso da revisão"
          />
          <button
            className={`flashcard ${flipped ? "flipped" : ""}`}
            onClick={flip}
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
              {flipped ? "RESPOSTA" : "PERGUNTA"}
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
          <nav className="flash-navigation" aria-label="Navegação dos cartões">
            <button
              className="button secondary"
              onClick={() => move(-1)}
              disabled={index === 0}
            >
              <ArrowLeft size={17} />
              Voltar
            </button>
            <button className="button primary" onClick={() => move(1)}>
              Avançar
              <ArrowRight size={17} />
            </button>
          </nav>
          {flipped ? (
            <SourceRefs
              module={moduleById[deck[index].moduleId]}
              refs={deck[index].refs}
            />
          ) : (
            <p className="flash-prompt">
              Toque no cartão para revelar a resposta.
            </p>
          )}
        </div>
      )}
    </>
  );
}
