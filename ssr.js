import { reqHandler } from './dist/obsidian-reader/server/server.mjs';

export default function handler(req, res) {
  return reqHandler(req, res);
}
