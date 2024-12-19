export default function validateURL(url: string) {
  const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
  return urlPattern.test(url);
}
