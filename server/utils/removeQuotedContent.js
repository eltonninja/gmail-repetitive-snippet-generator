function removeQuotedContent(email) {
  const quotedIndex = email.indexOf("\r\nOn ");
  if (quotedIndex === -1) return email;
  return email.slice(0, quotedIndex);
}

module.exports = {
  removeQuotedContent,
};
