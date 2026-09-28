// Piezas de formulario del panel de administración.

const controlClass =
  "w-full rounded-lg border border-line bg-surface px-3 text-[15px] text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 dark:border-line-dark dark:bg-surface-dark dark:text-ink-dark";

const variants = {
  primary: "bg-brand-strong text-white hover:brightness-110",
  secondary:
    "border-[1.5px] border-line hover:border-brand dark:border-line-dark",
  danger: "bg-red-700 text-white hover:bg-red-800",
  ghost: "text-muted hover:text-brand-strong dark:text-muted-dark dark:hover:text-brand",
};

export function Button({ variant = "primary", className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-extrabold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function Card({ as: Tag = "section", className = "", children, ...props }) {
  return (
    <Tag
      className={`rounded-2xl border border-line bg-card p-5 md:p-6 dark:border-line-dark dark:bg-card-dark ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

// Etiqueta + control. `hint` es un texto de ayuda bajo el campo.
export function Field({ label, hint, warning, className = "", children }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-sm font-bold">{label}</span>
      {children}
      {hint && <span className="text-xs text-muted dark:text-muted-dark">{hint}</span>}
      {warning && (
        <span className="text-xs font-bold text-amber-800 dark:text-amber-300">{warning}</span>
      )}
    </label>
  );
}

export function Input({ className = "", ...props }) {
  return <input className={`h-11 ${controlClass} ${className}`} {...props} />;
}

export function TextArea({ className = "", rows = 3, ...props }) {
  return <textarea rows={rows} className={`py-2 ${controlClass} ${className}`} {...props} />;
}

export function Select({ className = "", children, ...props }) {
  return (
    <select className={`h-11 ${controlClass} ${className}`} {...props}>
      {children}
    </select>
  );
}

export function Checkbox({ label, ...props }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-bold">
      <input type="checkbox" className="size-5 accent-brand-strong" {...props} />
      {label}
    </label>
  );
}
