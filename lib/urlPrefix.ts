export function getUrlPrefix(): string {
  let prefix = '';

  if (process.env.GITHUB_ACTIONS) {
    prefix = '/' + (process.env.GITHUB_REPOSITORY ?? '').replace(/.*?\//, '');
  }

  return prefix;
}
