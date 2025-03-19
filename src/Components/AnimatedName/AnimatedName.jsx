import React, { useEffect } from "react";
import anime from "animejs";

const AnimatedName = () => {
  useEffect(() => {
    const letterTime = 2000;

    const lineDrawing = anime({
      targets: "path",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutCubic",
      duration: letterTime,
      delay: (el, i) => letterTime * i,
      begin: () => {
        document.querySelectorAll("path").forEach((letter) => {
          letter.setAttribute("stroke", "black");
          letter.setAttribute("fill", "none");
        });
      },
      update: (anim) => {
        if (anim.currentTime >= letterTime) {
          document.querySelector(".letter-H").setAttribute("fill", "#e91e63");
        }
        if (anim.currentTime >= 2 * letterTime) {
          document.querySelector(".letter-R").setAttribute("fill", "#3F51B5");
        }
        if (anim.currentTime >= 3 * letterTime) {
          document.querySelector(".letter-e").setAttribute("fill", "#8BC34A");
        }
        if (anim.currentTime >= 4 * letterTime) {
          document.querySelector(".letter-y").setAttribute("fill", "#FF5722");
        }
        if (anim.currentTime >= 5 * letterTime) {
          document.querySelector(".letter-y").setAttribute("fill", "#795548");
        }
      },
      autoplay: false,
    });

    document.querySelector(".play-drawing").addEventListener("click", () => {
      lineDrawing.restart();
    });

    return () => {
      document
        .querySelector(".play-drawing")
        .removeEventListener("click", () => {
          lineDrawing.restart();
        });
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div id="anime-demo" style={{ position: "relative" }}>
        <svg width="600" height="300" viewBox="0 0 800 400">
          <path
            className="letter-H"
            d="M50,50 L50,200 Q80,220 100,200 L100,140 L140,140 L140,200 Q160,220 190,200 L190,50 L150,50 L150,120 L100,120 L100,50 Z"
            stroke="black"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="letter-R"
            d="M220,50 L220,200 L270,200 Q310,200 310,160 Q310,140 290,130 Q320,120 320,90 Q320,50 270,50 Z M250,80 L270,80 Q280,80 280,90 Q280,100 270,100 L250,100 Z M250,120 L270,120 Q290,120 290,140 Q290,160 270,160 L250,160 Z"
            stroke="black"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="letter-e"
            d="M360,150 Q360,200 410,200 Q460,200 460,150 L360,150 Z M370,130 Q370,90 410,90 Q450,90 450,130 L370,130 Z"
            stroke="black"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="letter-y"
            d="M500,50 L540,140 L580,50 L620,50 L560,200 L520,200 L460,50 Z"
            stroke="black"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="letter-y"
            d="M584.6226329803,149.6182594299l26,85l-44,111.99999999999997l45,1l12,-115.99999999999997l114,-159l-53,0l-52,114.00000000000003l-15,-67.00000000000001Z"
            stroke="none"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </div>

      <button className="play-drawing" style={buttonStyle}>
        Write the Name
      </button>
    </div>
  );
};

// Estilos en JavaScript
const buttonStyle = {
  background: "orange",
  color: "white",
  margin: "5px",
  padding: "10px",
  borderRadius: "4px",
  fontFamily: "Lato",
  cursor: "pointer",
  border: "none",
  outline: "none",
};

export default AnimatedName;
