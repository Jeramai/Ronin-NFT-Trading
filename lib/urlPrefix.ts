export function getUrlPrefix(): string {
  let prefix = '';

  if (process.env.NODE_ENV !== 'development') {
    prefix = '/' + (process.env.GITHUB_REPOSITORY ?? '').replace(/.*?\//, '');
  }

  return prefix;
}
