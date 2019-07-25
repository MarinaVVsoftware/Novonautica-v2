function lowerCase(text) {
  const str = text.toLowerCase();
  return str.replace(/\s/g, "");
}

export default lowerCase;
