export function disabledPathname(pathname: string) {
  if (pathname === '/mais-resgatados') {
    return true;
  }
  if (pathname === '/') {
    return true;
  }
  if (pathname === '/ranking') {
    return true;
  }
  if (pathname === '/mais-recentes') {
    return true;
  }
  return false;
}
