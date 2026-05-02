exports.extractPublicId = (url) => {
  const parts = url.split('/');
  const filename = parts.pop();
  return filename.split('.')[0];
};