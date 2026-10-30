import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  History,
  RotateCcw,
  Target,
  X,
} from "lucide-react";
import {
  modules,
  moduleById,
  questions,
  questionById,
} from "../content/index.js";
import { percent, readableDate, scoreSession } from "../lib/study.js";
import {
  EmptyState,
  ModulePicker,
  PageHeading,
  ProgressBar,
  SourceRefs,
} from "../components/UI.jsx";

export function PracticePage({
  progress,
  initialModule,
  navigate,
  startSession,
}) {
  const [selected, setSelected] = useState(
    initialModule ? [initialModule] : modules.map((m) => m.id),
  );
  const [mode, setMode] = useState("practice");
  const [count, setCount] = useState(10);
  const [onlyWrong, setOnlyWrong] = useState(false);
  const [error, setError] = useState("");
  const pool = questions.filter(
    (q) =>
      selected.includes(q.moduleId) &&
      (!onlyWrong || progress.latestAnswers[q.id]?.correct === false),
  );
  const unfinished = Object.values(progress.sessions)
    .filter((s) => !s.completed)
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt));
  const begin = () => {
    setError("");
    try {
      startSession({ moduleIds: selected, count, mode, onlyWrong });
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
      <PageHeading
        eyebrow="APRENDER FAZENDO"
        title="Sua prática, do seu jeito."
        text="Misture assuntos, descubra o que já sabe e encontre o que merece mais atenção."
      />
      {unfinished.length > 0 && (
        <div className="resume-banner">
          <span className="stat-icon sage">
            <History size={21} />
          </span>
          <div>
            <strong>Vamos terminar o que começamos?</strong>
            <p>
              {Object.keys(unfinished[0].answers).length} de{" "}
              {unfinished[0].questionIds.length} respostas ·{" "}
              {unfinished[0].mode === "exam" ? "Simulado" : "Prática guiada"} ·{" "}
              {readableDate(unfinished[0].startedAt)}
            </p>
          </div>
          <button
            className="button secondary"
            onClick={() => navigate("sessao", unfinished[0].id)}
          >
            Retomar
            <ArrowRight size={17} />
          </button>
        </div>
      )}
      <div className="practice-layout">
        <section className="panel practice-setup">
          <div className="section-heading compact">
            <div>
              <h2>Monte sua sessão</h2>
              <p>Você escolhe os assuntos. Nós organizamos as questões.</p>
            </div>
            <ClipboardCheck size={25} />
          </div>
          <div className="practice-modes">
            <button
              className={mode === "practice" ? "active" : ""}
              aria-pressed={mode === "practice"}
              onClick={() => setMode("practice")}
            >
              <CircleHelp size={22} />
              <strong>Prática guiada</strong>
              <span>Entenda a resposta a cada questão.</span>
            </button>
            <button
              className={mode === "exam" ? "active" : ""}
              aria-pressed={mode === "exam"}
              onClick={() => setMode("exam")}
            >
              <Target size={22} />
              <strong>Simulado</strong>
              <span>Veja a correção ao terminar.</span>
            </button>
          </div>
          <ModulePicker
            modules={modules}
            selected={selected}
            onChange={setSelected}
          />
          <div className="practice-options">
            <label className="count-select">
              <span className="field-label">Quantidade de questões</span>
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              >
                {[5, 10, 15, 20, 30, 50].map((n) => (
                  <option key={n} value={n}>
                    {n} questões
                  </option>
                ))}
              </select>
            </label>
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={onlyWrong}
                onChange={(e) => setOnlyWrong(e.target.checked)}
              />
              <span>
                Revisar só meus erros
                <small>Usa a última resposta de cada questão.</small>
              </span>
            </label>
          </div>
          {error && (
            <p className="inline-error" role="alert">
              {error}
            </p>
          )}
          <div className="setup-bottom">
            <span>
              {pool.length}{" "}
              {pool.length === 1
                ? "questão disponível"
                : "questões disponíveis"}
              {pool.length > 0 && count > pool.length
                ? ` · serão usadas ${pool.length}`
                : ""}
            </span>
            <button
              className="button primary"
              disabled={!pool.length}
              onClick={begin}
            >
              {mode === "exam" ? "Iniciar simulado" : "Começar prática"}
              <ArrowRight size={18} />
            </button>
          </div>
          {!pool.length && (
            <p className="help-text">
              {!selected.length
                ? "Selecione pelo menos um módulo."
                : onlyWrong
                  ? "Nenhum erro registrado nos módulos selecionados. Desmarque a revisão de erros para praticar."
                  : "Não há questões disponíveis nesta seleção."}
            </p>
          )}
        </section>
        <aside className="practice-aside">
          <div className="note-card">
            <BookOpen size={24} />
            <h3>
              Mais que acertar:
              <br />
              entender o porquê.
            </h3>
            <p>
              Cada questão tem explicação e referência ao material. Use os erros
              como um mapa para a próxima revisão.
            </p>
            <div className="note-divider" />
            <span>
              <CheckCircle2 size={15} />
              Questões dos 8 módulos
            </span>
            <span>
              <CheckCircle2 size={15} />
              Referências por página
            </span>
            <span>
              <CheckCircle2 size={15} />
              Retomada automática
            </span>
          </div>
          <p className="quiet-caption">
            Questões autorais de estudo, elaboradas a partir das apostilas. Não
            são questões oficiais da instituição.
          </p>
        </aside>
      </div>
    </>
  );
}

export function SessionPage({
  sessionId,
  progress,
  record,
  navigate,
  startSession,
}) {
  const session = progress.sessions[sessionId];
  const bank = useMemo(
    () =>
      (session?.questionIds || [])
        .map((id) => questionById[id])
        .filter(Boolean),
    [session?.questionIds],
  );
  const [index, setIndex] = useState(() =>
    Math.max(
      0,
      bank.findIndex((q) => session?.answers[q.id] === undefined),
    ),
  );
  const [choice, setChoice] = useState(null);
  useEffect(() => setChoice(null), [index, sessionId]);
  if (!session || !bank.length)
    return (
      <EmptyState
        title="Esta sessão não está neste navegador"
        text="Importe seu backup ou comece uma nova prática."
      >
        <button className="button primary" onClick={() => navigate("praticar")}>
          Montar uma sessão
        </button>
      </EmptyState>
    );
  if (session.completed)
    return (
      <SessionResult
        session={session}
        bank={bank}
        navigate={navigate}
        startSession={startSession}
      />
    );
  const question = bank[Math.min(index, bank.length - 1)];
  const answered = session.answers[question.id] !== undefined;
  const selected = answered ? session.answers[question.id] : choice;
  const reveal = session.mode === "practice" && answered;
  const totalAnswered = bank.filter(
    (q) => session.answers[q.id] !== undefined,
  ).length;
  const confirm = () => {
    if (selected === null || answered) return;
    record("answer", question.id, {
      sessionId,
      choice: selected,
      correct: selected === question.answer,
      moduleId: question.moduleId,
      mode: session.mode,
    });
  };
  const finish = () => {
    record("session_finish", sessionId);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const next = () => {
    setIndex((index + 1) % bank.length);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  return (
    <div className="question-session">
      <div className="session-topline">
        <button className="back-link" onClick={() => navigate("praticar")}>
          <ArrowLeft size={16} />
          Sair por agora
        </button>
        <span>{session.mode === "exam" ? "SIMULADO" : "PRÁTICA GUIADA"}</span>
      </div>
      <div className="question-progress">
        <ProgressBar
          value={percent(totalAnswered, bank.length)}
          label="Questões respondidas"
        />
        <span>
          {totalAnswered} de {bank.length} respondidas
        </span>
      </div>
      <div className="question-nav" aria-label="Navegar entre questões">
        {bank.map((q, i) => (
          <button
            key={q.id}
            className={`${index === i ? "active" : ""} ${session.answers[q.id] !== undefined ? "answered" : ""}`}
            aria-label={`Questão ${i + 1}${session.answers[q.id] !== undefined ? ", respondida" : ""}`}
            aria-current={index === i ? "step" : undefined}
            onClick={() => setIndex(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <section className="panel question-panel">
        <div className="question-kicker">
          <span className="subtle-badge">
            QUESTÃO {String(index + 1).padStart(2, "0")}
          </span>
          <span>
            Mód. {moduleById[question.moduleId].source.topic} ·{" "}
            {moduleById[question.moduleId].shortTitle}
          </span>
        </div>
        <h1>{question.prompt}</h1>
        <fieldset className="answer-options">
          <legend className="sr-only">Escolha uma alternativa</legend>
          {question.choices.map((text, i) => {
            let status = "";
            if (reveal && i === question.answer) status = "correct";
            else if (reveal && i === selected) status = "wrong";
            return (
              <label
                key={i}
                className={`answer-option ${selected === i ? "selected" : ""} ${status} ${answered ? "locked" : ""}`}
              >
                <input
                  type="radio"
                  name={`${sessionId}-${question.id}`}
                  value={i}
                  checked={selected === i}
                  disabled={answered}
                  onChange={() => setChoice(i)}
                />
                <span className="answer-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{text}</span>
                {status === "correct" && <CheckCircle2 size={20} />}
                {status === "wrong" && <X size={20} />}
              </label>
            );
          })}
        </fieldset>
        {reveal && (
          <div
            className={`answer-feedback ${selected === question.answer ? "positive" : "learning"}`}
            role="status"
          >
            <strong>
              {selected === question.answer ? (
                <>
                  <CheckCircle2 size={19} />
                  Isso mesmo!
                </>
              ) : (
                <>
                  <BookOpen size={19} />
                  Um conceito para revisar
                </>
              )}
            </strong>
            <p>{question.explanation}</p>
            <SourceRefs
              module={moduleById[question.moduleId]}
              refs={question.refs}
            />
          </div>
        )}
        {answered && session.mode === "exam" && (
          <p className="answer-saved">
            <CheckCircle2 size={16} />
            Resposta guardada. A correção aparece ao finalizar.
          </p>
        )}
        <div className="question-actions">
          <button
            className="button secondary"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            <ArrowLeft size={16} />
            Anterior
          </button>
          {!answered ? (
            <button
              className="button primary"
              disabled={selected === null}
              onClick={confirm}
            >
              Confirmar resposta
              <Check size={18} />
            </button>
          ) : totalAnswered === bank.length ? (
            <button className="button primary" onClick={finish}>
              Ver resultado
              <ArrowRight size={18} />
            </button>
          ) : (
            <button className="button primary" onClick={next}>
              Próxima questão
              <ArrowRight size={18} />
            </button>
          )}
        </div>
        <p className="question-save-note">
          As respostas confirmadas ficam salvas e não podem ser alteradas nesta
          sessão.
        </p>
      </section>
    </div>
  );
}

function SessionResult({ session, bank, navigate, startSession }) {
  const score = scoreSession(bank, session.answers);
  const wrong = bank.filter((q) => session.answers[q.id] !== q.answer);
  const byModule = [...new Set(bank.map((q) => q.moduleId))].map((id) => ({
    module: moduleById[id],
    score: scoreSession(
      bank.filter((q) => q.moduleId === id),
      session.answers,
    ),
  }));
  return (
    <>
      <PageHeading
        eyebrow="MAIS UM PASSO NA SUA TRILHA"
        title="Cada tentativa ensina."
        text="Olhe o que já está firme e o que pode ganhar uma nova revisão."
      />
      <div className="result-hero panel">
        <span
          className="result-ring"
          style={{ "--score": `${score.percent}%` }}
        >
          <span>
            <strong>{score.percent}%</strong>
            <small>de acertos</small>
          </span>
        </span>
        <div>
          <span className="eyebrow">
            {session.mode === "exam"
              ? "SIMULADO CONCLUÍDO"
              : "PRÁTICA CONCLUÍDA"}
          </span>
          <h2>
            {score.percent >= 80
              ? "Você está construindo uma boa base."
              : score.percent >= 50
                ? "Seu conhecimento está crescendo."
                : "Você encontrou por onde continuar."}
          </h2>
          <p>
            {score.correct}{" "}
            {score.correct === 1 ? "resposta correta" : "respostas corretas"} em{" "}
            {score.total} questões · {bank.length - score.correct} para revisar
          </p>
          <div className="result-buttons">
            {wrong.length > 0 && (
              <button
                className="button primary"
                onClick={() =>
                  startSession({
                    moduleIds: [...new Set(wrong.map((q) => q.moduleId))],
                    count: wrong.length,
                    mode: "practice",
                    pool: wrong,
                  })
                }
              >
                <RotateCcw size={17} />
                Revisar meus erros
              </button>
            )}
            <button
              className="button secondary"
              onClick={() => navigate("praticar")}
            >
              Nova sessão
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
      <section className="panel module-results">
        <h3>Como foi em cada módulo</h3>
        {byModule.map(({ module, score: s }) => (
          <div className="module-result-row" key={module.id}>
            <span className="small-number">{module.source.topic}</span>
            <span>{module.shortTitle}</span>
            <ProgressBar
              value={s.percent}
              label={`Acertos em ${module.shortTitle}`}
            />
            <strong>
              {s.correct}/{s.total}
            </strong>
          </div>
        ))}
      </section>
      <section className="result-review">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ENTENDER PARA AVANÇAR</span>
            <h2>Reveja suas respostas</h2>
            <p>Abra uma questão para ver a explicação e a fonte.</p>
          </div>
        </div>
        {bank.map((q, i) => {
          const correct = session.answers[q.id] === q.answer;
          return (
            <details key={q.id} className="review-question">
              <summary>
                <span
                  className={
                    correct ? "review-status correct" : "review-status wrong"
                  }
                >
                  {correct ? <Check size={17} /> : <RotateCcw size={17} />}
                </span>
                <span>
                  <small>
                    QUESTÃO {i + 1} · MÓDULO{" "}
                    {moduleById[q.moduleId].source.topic}
                  </small>
                  {q.prompt}
                </span>
                <ArrowRight size={17} />
              </summary>
              <div className="review-question-body">
                <p
                  className={
                    !correct ? "your-answer wrong-text" : "your-answer"
                  }
                >
                  <strong>Sua resposta:</strong>{" "}
                  {q.choices[session.answers[q.id]] || "Não respondida"}
                </p>
                {!correct && (
                  <p className="correct-text">
                    <strong>Resposta correta:</strong> {q.choices[q.answer]}
                  </p>
                )}
                <p>{q.explanation}</p>
                <SourceRefs module={moduleById[q.moduleId]} refs={q.refs} />
              </div>
            </details>
          );
        })}
      </section>
    </>
  );
}
