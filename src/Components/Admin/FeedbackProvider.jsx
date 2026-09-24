import { useCallback, useEffect, useRef, useState } from "react";
import { LuCircleCheck, LuTriangleAlert } from "react-icons/lu";
import { ConfirmContext, ToastContext } from "./feedback";
import { Button } from "./ui";

// Reemplaza alert() y confirm() del navegador, que bloquean la página.
export default function FeedbackProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [question, setQuestion] = useState(null);
  const dialogRef = useRef(null);

  const toast = useCallback((message, type = "success") => {
    const id = crypto.randomUUID();
    setToasts((list) => [...list, { id, message, type }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 4000);
  }, []);

  const confirm = useCallback(
    (message, { confirmLabel = "Eliminar" } = {}) =>
      new Promise((resolve) => setQuestion({ message, confirmLabel, resolve })),
    []
  );

  useEffect(() => {
    if (question) dialogRef.current?.showModal();
  }, [question]);

  const answer = (result) => {
    question?.resolve(result);
    dialogRef.current?.close();
    setQuestion(null);
  };

  return (
    <ToastContext.Provider value={toast}>
      <ConfirmContext.Provider value={confirm}>
        {children}

        <div
          aria-live="polite"
          className="fixed top-4 right-4 left-4 z-[1100] flex flex-col items-end gap-2 lg:top-20"
        >
          {toasts.map((t) => (
            <p
              key={t.id}
              role={t.type === "error" ? "alert" : "status"}
              className={`flex max-w-sm items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-lg ${
                t.type === "error" ? "bg-red-700" : "bg-green-700"
              }`}
            >
              {t.type === "error" ? (
                <LuTriangleAlert aria-hidden="true" className="size-5 shrink-0" />
              ) : (
                <LuCircleCheck aria-hidden="true" className="size-5 shrink-0" />
              )}
              {t.message}
            </p>
          ))}
        </div>

        <dialog
          ref={dialogRef}
          onCancel={(e) => {
            e.preventDefault();
            answer(false);
          }}
          className="m-auto w-[min(26rem,calc(100%-2rem))] rounded-2xl border border-line bg-card p-6 text-ink backdrop:bg-black/50 dark:border-line-dark dark:bg-card-dark dark:text-ink-dark"
        >
          <p className="mb-6 font-semibold whitespace-pre-line">{question?.message}</p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => answer(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={() => answer(true)}>
              {question?.confirmLabel}
            </Button>
          </div>
        </dialog>
      </ConfirmContext.Provider>
    </ToastContext.Provider>
  );
}
