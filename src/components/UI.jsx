import React, { useEffect, useRef } from "react";
import { ArrowUpRight, BookOpen, Check, X, ChevronRight } from "lucide-react";

export function SourceRefs({ module, refs }) {
  return (
    <div className="source-refs">
      {refs.map((r, i) => (
        <a
          key={`${r.page}-${i}`}
          href={`${import.meta.env.BASE_URL}fontes/${module.id}.pdf#page=${r.page}`}
          target="_blank"
          rel="noreferrer"
          title={`${module.source.filename} · ${r.section} · página ${r.page}`}
        >
          <BookOpen size={13} />
          <span>{`Mód. ${module.source.topic} · p. ${r.page}`}</span>
          <ArrowUpRight size={12} />
          <span className="sr-only">
            {" "}
            · {r.section} · abre o PDF em outra aba
          </span>
        </a>
      ))}
    </div>
  );
}

export function Modal({ title, children, onClose, wide = false }) {
  const dialog = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const element = dialog.current;
    if (!element.open) element.showModal();
    const close = (e) => {
      e.preventDefault();
      onClose();
    };
    element.addEventListener("cancel", close);
    return () => {
      element.removeEventListener("cancel", close);
      if (element.open) element.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      className={`modal ${wide ? "wide" : ""}`}
      ref={dialog}
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === dialog.current) {
          const r = dialog.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <div className="modal-head">
        <h2 id="modal-title">{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Fechar janela"
        >
          <X size={20} />
        </button>
      </div>
      {children}
    </dialog>
  );
}

export function EmptyState({ icon: Icon = BookOpen, title, text, children }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Icon size={30} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}

export function ProgressBar({ value, label, className = "" }) {
  return (
    <div
      className={`progress-track ${className}`}
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${value}%` }} />
    </div>
  );
}

export function ModulePicker({ modules, selected, onChange }) {
  return (
    <fieldset className="module-picker">
      <legend className="field-label">Selecionar módulos</legend>
      <div className="picker-actions">
        <button
          type="button"
          className="text-button"
          onClick={() => onChange(modules.map((m) => m.id))}
        >
          Selecionar todos
        </button>
        <button
          type="button"
          className="text-button muted"
          onClick={() => onChange([])}
        >
          Limpar
        </button>
      </div>
      <div className="module-options">
        {modules.map((m) => (
          <label
            key={m.id}
            className={`module-option ${selected.includes(m.id) ? "selected" : ""}`}
          >
            <input
              type="checkbox"
              checked={selected.includes(m.id)}
              onChange={() =>
                onChange(
                  selected.includes(m.id)
                    ? selected.filter((id) => id !== m.id)
                    : [...selected, m.id],
                )
              }
            />
            <span className="option-number">
              {m.source.topic}
            </span>
            <span>{m.shortTitle}</span>
            {selected.includes(m.id) && <Check size={16} />}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function PageHeading({ eyebrow, title, text, children }) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
      {children}
    </div>
  );
}

export function ArrowLink({ children, onClick }) {
  return (
    <button className="arrow-link" onClick={onClick}>
      {children}
      <ChevronRight size={17} />
    </button>
  );
}
