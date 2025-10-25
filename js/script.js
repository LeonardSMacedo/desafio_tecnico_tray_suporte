document.addEventListener("DOMContentLoaded", () => {

  // Função de digitação
  function typeEffect(element, callback) {
    const text = element.getAttribute("data-text") || element.textContent.trim();
    element.setAttribute("data-text", text);
    element.textContent = "";
    let i = 0;

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, 10);
      } else if (callback) {
        callback();
      }
    }

    type();
  }

  // Prepara os elementos .typing (evita piscadas)
  const allTyping = document.querySelectorAll(".typing");
  allTyping.forEach(el => {
    const text = el.textContent.trim();
    el.setAttribute("data-text", text);
    el.textContent = "";
  });

  // === INDEX e PROBLEMA ===
  if (document.querySelector(".cmd") || document.querySelector(".center")) {
    const elements = Array.from(allTyping);
    let index = 0;

    function typeNext() {
      if (index < elements.length) {
        typeEffect(elements[index], () => {
          index++;
          setTimeout(typeNext, 800);
        });
      } else {
        // exibe o botão no final
        const btn = document.querySelector(".btn");
        if (btn) btn.style.display = "inline-block";
      }
    }

    const btn = document.querySelector(".btn");
    if (btn) btn.style.display = "none";

    typeNext();
  }

  // === RESPOSTA ===
  if (document.querySelector(".email-container")) {
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");
    const next1 = document.getElementById("next1");
    const next2 = document.getElementById("next2");

    step1.classList.add("active");
    typeEffect(document.getElementById("email1"), () => {
      next1.style.display = "inline-flex";
    });

    next1.addEventListener("click", () => {
      step2.classList.add("active");
      typeEffect(document.getElementById("email2"), () => {
        next2.style.display = "inline-flex";
      });
      next1.style.display = "none";
    });

    next2.addEventListener("click", () => {
      step3.classList.add("active");
      typeEffect(document.getElementById("email3"), () => {
        // ✅ Exibe o botão "Obrigado" após o último e-mail
        const btnThanks = document.createElement("button");
        btnThanks.textContent = "Obrigado";
        btnThanks.className = "btn";
        btnThanks.style.marginTop = "30px";
        btnThanks.onclick = () => window.location.href = "fim.html";
        document.querySelector(".email-container").appendChild(btnThanks);
      });
      next2.style.display = "none";
    });
  }
});
