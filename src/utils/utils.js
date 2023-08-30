export const utilsToggleTheme = () => {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
};

/**
 * Scroll to a target position, default the top of the page.
 * @param {number} [target=0] - The target position to scroll to.
 */
export const scrollTo = (target = 0) =>
  window.scroll({
    top: target,
    left: 0,
    behavior: "smooth",
  });

export function convertSizeToReadable(sizeInBytes) {
  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;

  if (sizeInBytes >= GB) {
    return (sizeInBytes / GB).toFixed(2) + " GB";
  } else if (sizeInBytes >= MB) {
    return (sizeInBytes / MB).toFixed(2) + " MB";
  } else if (sizeInBytes >= KB) {
    return (sizeInBytes / KB).toFixed(2) + " KB";
  } else {
    return sizeInBytes + " bytes";
  }
}
