// https://stackoverflow.com/a/65996386/1927589
export async function copyToClipboardAsync(textToCopy) {
  // Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy);
      
  } else {
    // You can't use navigator.clipboard when using http://
    // Use the old 'out of viewport hidden text area' trick
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
        
    // Move textarea out of the viewport so it's not visible
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";
        
    document.body.prepend(textArea);
    textArea.select();

    try {
      // Deprecated method:
      // https://developer.mozilla.org/en-US/docs/Web/API/Document/  execCommand#browser_compatibility
      document.execCommand('copy');
    } catch (error) {
      console.error(error);
    } finally {
      textArea.remove();
    }
  }
}