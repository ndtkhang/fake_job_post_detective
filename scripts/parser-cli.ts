#!/usr/bin/env node
/*
  CLI wrapper for the server parser.
  Usage:
    # with ts-node
    npx ts-node scripts/parser-cli.ts

    # or compile+node
    node dist/scripts/parser-cli.js
*/
import path from "path";

(async () => {
  // Ensure TS path resolution works when running via ts-node from project root
  // Import the TS source directly using relative path.
  const parserPath = path.join(__dirname, "../src/server/ml/parser");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { main } = require(parserPath) as { main: () => Promise<number> };

  try {
    const code = await main();
    process.exit(code);
  } catch (err: any) {
    console.error("CLI failed:", err?.message ?? err);
    process.exit(1);
  }
})();
