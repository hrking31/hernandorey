import { Fragment, useRef } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

// Texto cuyas palabras suben desde una ranura al abrir la página y cada vez
// que entra en pantalla. `delay` retrasa el inicio (en pasos de 90 ms) para
// encadenar varios títulos. Estilos: .rv-word en index.css.
export default function RevealText({ children, delay = 0 }) {
  const ref = useRef(null);
  const text = String(children);
  useScrollReveal(ref, [text], { onLoad: true });

  return (
    <span ref={ref} data-reveal>
      {text.split(" ").map((word, k) => (
        <Fragment key={k}>
          {k > 0 && " "}
          <span className="rv-word">
            <span style={{ "--k": k + delay }}>{word}</span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}
