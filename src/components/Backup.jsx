import React, { useRef, useState } from "react";
import { CheckCircle2, Download, HardDrive, Upload } from "lucide-react";
import { Modal } from "./UI.jsx";
import {
  modules,
  questions,
  allLessons,
  flashcards,
} from "../content/index.js";
import { makeBackup } from "../lib/storage.js";

function download(data, filename) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
export function Backup({ study, onClose }) {
  const input = useRef(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMessage("");
    setError("");
    try {
      if (file.size > 10 * 1024 * 1024)
        throw new Error("Escolha um backup de até 10 MB.");
      let data;
      try {
        data = JSON.parse(await file.text());
      } catch {
        throw new Error("O arquivo não contém um backup JSON legível.");
      }
      const total = study.restore(data, {
        modules: modules.map((m) => m.id),
        questions: questions.map((q) => q.id),
        lessons: allLessons.map((l) => l.id),
        cards: flashcards.map((c) => c.id),
        moduleCourses: Object.fromEntries(modules.map((m) => [m.id, m.courseId])),
        questionModules: Object.fromEntries(questions.map((q) => [q.id, q.moduleId])),
      });
      setMessage(
        `Backup importado. ${total} registros estão disponíveis neste navegador.`,
      );
    } catch (err) {
      setError(err.message);
    }
    e.target.value = "";
  };
  return (
    <Modal title="Seu progresso, bem guardado" onClose={onClose}>
      <div className="backup-intro">
        <span className="stat-icon sage">
          <HardDrive size={24} />
        </span>
        <p>
          Seu estudo é salvo automaticamente <strong>neste navegador</strong>.
          Para continuar em outro dispositivo, exporte e depois importe o
          arquivo de backup. O arquivo inclui as duas disciplinas; os estudos continuam separados em cada área.
        </p>
      </div>
      <div className="backup-actions">
        <button
          className="backup-action"
          onClick={() => {
            download(
              makeBackup(study.events),
              `vet-estudos-backup-${new Date().toISOString().slice(0, 10)}.json`,
            );
            setMessage(
              "Backup preparado para download. Guarde o arquivo em um lugar acessível.",
            );
            setError("");
          }}
        >
          <Download size={23} />
          <span>
            <strong>Exportar meu progresso</strong>
            <small>Leituras, revisões, respostas e sessões.</small>
          </span>
        </button>
        <button className="backup-action" onClick={() => input.current.click()}>
          <Upload size={23} />
          <span>
            <strong>Importar um backup</strong>
            <small>Mescla os registros sem apagar seu estudo atual.</small>
          </span>
        </button>
        <input
          ref={input}
          className="sr-only"
          type="file"
          accept=".json,application/json"
          aria-label="Selecionar arquivo de backup"
          onChange={upload}
        />
      </div>
      {message && (
        <p className="success-message" role="status">
          <CheckCircle2 size={18} />
          {message}
        </p>
      )}
      {error && (
        <p className="inline-error" role="alert">
          {error}
        </p>
      )}
      <div className="source-note">
        A transferência é manual. Limpar os dados do navegador, usar uma aba
        anônima ou mudar o endereço do site pode deixar o progresso anterior
        indisponível. Mantenha um backup atualizado.
      </div>
      <p className="quiet-caption">
        {study.events.length} registros salvos ·{" "}
        {study.savedAt
          ? `última alteração às ${new Date(study.savedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
          : "armazenamento local"}
      </p>
    </Modal>
  );
}
