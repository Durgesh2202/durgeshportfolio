// Smooth line-by-line terminal reveal and command typing effect
document.addEventListener('DOMContentLoaded', function() {
  const terminalBody = document.querySelector('.terminal-body');
  if (!terminalBody) return;

  const lines = Array.from(terminalBody.children);
  let i = 0;

  function revealNext() {
    if (i < lines.length) {
      const el = lines[i];
      el.classList.add('visible');

      // Typing animation for .command elements in .line divs
      if (el.classList.contains('line')) {
        const commandEl = el.querySelector('.command');
        if (commandEl) {
          const fullText = commandEl.textContent;
          commandEl.textContent = '';
          let charIdx = 0;
          function typeChar() {
            if (charIdx < fullText.length) {
              commandEl.textContent += fullText.charAt(charIdx);
              charIdx++;
              setTimeout(typeChar, 25 + Math.random() * 15); // 25-40ms per char (faster typing)
            }
          }
          typeChar();
        }
      }

      // Much faster delays for all elements
      let delay = 500; // Default fast delay
      if (el.classList.contains('output') && el.classList.contains('multiline')) delay = 600; // Reduced from 1700 to 600
      if (el.classList.contains('line') && el.querySelector('.command')) delay = 550; // Reduced from 1100 to 550

      i++;
      setTimeout(revealNext, delay);
    }
  }

  revealNext();
});
