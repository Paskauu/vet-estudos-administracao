import { useCallback, useEffect, useMemo, useState } from "react";
import { reduceProgress } from "../lib/events.js";
import {
  createLocalLog,
  importBackup,
  getBrowserStorage,
} from "../lib/storage.js";
import { createId } from "../lib/id.js";

export function useStudy() {
  const browserStorage = useMemo(() => getBrowserStorage(), []);
  const log = useMemo(
    () => createLocalLog(browserStorage.storage, "guest"),
    [browserStorage],
  );
  const [error, setError] = useState(browserStorage.error);
  const [events, setEvents] = useState(() => {
    try {
      return log.read().events;
    } catch {
      return [];
    }
  });
  const [savedAt, setSavedAt] = useState(null);
  useEffect(() => {
    try {
      setEvents(log.read().events);
    } catch (e) {
      setError(e.message);
    }
    const onStorage = (e) => {
      if (e.key === log.key || e.key?.startsWith(log.eventPrefix)) {
        try {
          setEvents(log.read().events);
        } catch (err) {
          setError(err.message);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [log]);
  const record = useCallback(
    (type, itemId, payload = {}) => {
      try {
        const event = {
          id: createId(),
          type,
          itemId,
          payload,
          at: new Date().toISOString(),
        };
        setEvents(log.append(event).events);
        setSavedAt(event.at);
        return event;
      } catch (e) {
        setError(e.message);
        return null;
      }
    },
    [log],
  );
  const restore = useCallback(
    (backup, known) => {
      const result = importBackup(log, backup, known);
      setEvents(result.events);
      setSavedAt(new Date().toISOString());
      return result.events.length;
    },
    [log],
  );
  const progress = useMemo(() => reduceProgress(events), [events]);
  return { events, progress, record, error, setError, savedAt, restore, log };
}
