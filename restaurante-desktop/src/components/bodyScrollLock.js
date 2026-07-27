let activeLocks = 0;
let bodyHadLockClass = false;

function lockBodyScroll() {
  if (typeof document === "undefined") return () => {};

  if (activeLocks === 0) {
    bodyHadLockClass = document.body.classList.contains("rs-scroll-lock");
    document.body.classList.add("rs-scroll-lock");
  }

  activeLocks += 1;
  let released = false;

  return () => {
    if (released) return;

    released = true;
    activeLocks = Math.max(0, activeLocks - 1);

    if (activeLocks === 0) {
      if (!bodyHadLockClass) {
        document.body.classList.remove("rs-scroll-lock");
      }
      bodyHadLockClass = false;
    }
  };
}

export default lockBodyScroll;
