import React from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Download,
  Layers,
  Target,
  TrendingUp,
} from "lucide-react";
import { questionById } from "../content/index.js";
import { useCourse } from "../hooks/useCourse.jsx";
import { percent, readableDate, scoreSession } from "../lib/study.js";
import { EmptyState, PageHeading, ProgressBar } from "../components/UI.jsx";

export function ProgressPage({ progress, navigate, openBackup }) {
  const { modules, allLessons, flashcards } = useCourse();
  const read = allLessons.filter((l) => progress.readLessons[l.id]).length;
  const complete = Object.values(progress.sessions)
    .filter((s) => s.completed)
    .sort((a, b) => b.finishedAt.localeCompare(a.finishedAt));
  return (
    <>
      <PageHeading
        eyebrow="SEU CAMINHO ATÉ AQUI"
        title="Todo avanço conta."
        text="Um retrato dos seus estudos, para escolher o próximo passo com mais clareza."
      >
        <button className="button secondary" onClick={openBackup}>
          <Download size={17} />
          Meu backup
        </button>
      </PageHeading>
      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-icon sage">
            <BookOpen size={21} />
          </span>
          <div>
            <strong>
              {read}
              <small> / {allLessons.length}</small>
            </strong>
            <span>Etapas estudadas</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon sand">
            <Layers size={21} />
          </span>
          <div>
            <strong>
              {Object.keys(progress.reviews).length}
              <small> / {flashcards.length}</small>
            </strong>
            <span>Cartões revisados</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon lilac">
            <Target size={21} />
          </span>
          <div>
            <strong>
              {progress.answered
                ? `${percent(progress.correct, progress.answered)}%`
                : "—"}
            </strong>
            <span>{progress.answered} respostas registradas</span>
          </div>
        </div>
      </div>
      <section className="panel progress-modules">
        <div className="section-heading compact">
          <div>
            <h2>Seu progresso por módulo</h2>
            <p>Leitura e prática se complementam.</p>
          </div>
          <TrendingUp size={25} />
        </div>
        {modules.map((m) => {
          const done = m.lessons.filter(
            (l) => progress.readLessons[l.id],
          ).length;
          const answers = progress.attempts.filter((a) => a.moduleId === m.id);
          return (
            <button
              className="progress-module-row"
              key={m.id}
              onClick={() => navigate("modulo", m.id)}
            >
              <span className={`module-number tone-${(m.order - 1) % 4}`}>
                {m.source.topic}
              </span>
              <span className="progress-module-name">
                <strong>{m.shortTitle}</strong>
                <span>
                  {done} de {m.lessons.length} etapas estudadas
                  {answers.length
                    ? ` · ${percent(answers.filter((a) => a.correct).length, answers.length)}% de acertos`
                    : ""}
                </span>
              </span>
              <ProgressBar
                value={percent(done, m.lessons.length)}
                label={`Leitura de ${m.shortTitle}`}
              />
              <span className="progress-module-value">
                {percent(done, m.lessons.length)}%
              </span>
              <ArrowRight size={17} />
            </button>
          );
        })}
      </section>
      <section className="history-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">PRATICAR, PERCEBER, EVOLUIR</span>
            <h2>Suas últimas sessões</h2>
          </div>
          <span className="subtle-badge">{complete.length} concluídas</span>
        </div>
        {complete.length ? (
          <div className="history-grid">
            {complete.slice(0, 8).map((s) => {
              const bank = s.questionIds
                .map((id) => questionById[id])
                .filter(Boolean);
              const score = scoreSession(bank, s.answers);
              return (
                <button
                  className="history-card"
                  key={s.id}
                  onClick={() => navigate("sessao", s.id)}
                >
                  <span className="history-icon">
                    <CheckCircle2 size={20} />
                  </span>
                  <div>
                    <strong>
                      {s.mode === "exam" ? "Simulado" : "Prática guiada"}
                    </strong>
                    <span>
                      {readableDate(s.finishedAt)} · {score.total} questões
                    </span>
                  </div>
                  <span className="history-score">
                    {score.percent}%<ArrowRight size={15} />
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={Target}
            title="Sua primeira sessão começa com uma tentativa"
            text="Escolha um módulo e pratique. Seu histórico aparecerá aqui."
          >
            <button
              className="button primary"
              onClick={() => navigate("praticar")}
            >
              Começar uma prática
              <ArrowRight size={17} />
            </button>
          </EmptyState>
        )}
      </section>
      <div className="backup-banner">
        <Download size={25} />
        <div>
          <strong>Leve seu progresso com você.</strong>
          <p>
            Os estudos ficam neste navegador. Exporte um backup para guardar ou
            continuar em outro dispositivo.
          </p>
        </div>
        <button className="button secondary" onClick={openBackup}>
          Gerenciar backup
          <ArrowRight size={16} />
        </button>
      </div>
    </>
  );
}
