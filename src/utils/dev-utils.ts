import { isDev } from '~/consts';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debugLog(...data: any[]): void {
  if (isDev) {
    console.log(...data);
  }
}
