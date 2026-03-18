#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SKILL_NAME = 'create-marigold-app';
const SKILL_DIR = path.join(os.homedir(), '.claude', 'skills', SKILL_NAME);
const SOURCE = path.join(__dirname, 'SKILL.md');

// Show version
const arg = process.argv[2];
if (arg === '--version' || arg === '-v') {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')
  );
  console.log(pkg.version);
  process.exit(0);
}

if (arg === '--help' || arg === '-h') {
  console.log(`
Usage: npx create-marigold-app

Installs the create-marigold-app skill for Claude Code.
After installation, use /create-marigold-app in any Claude Code session
to scaffold a new Marigold Design System app.

Options:
  -h, --help      Show this help message
  -v, --version   Show version number
  --uninstall     Remove the skill from Claude Code
`);
  process.exit(0);
}

// Uninstall
if (arg === '--uninstall') {
  if (fs.existsSync(SKILL_DIR)) {
    fs.rmSync(SKILL_DIR, { recursive: true });
    console.log(
      `\x1b[32m✔ Skill "${SKILL_NAME}" removed from Claude Code.\x1b[0m`
    );
  } else {
    console.log(`Skill "${SKILL_NAME}" is not installed.`);
  }
  process.exit(0);
}

// Install
fs.mkdirSync(SKILL_DIR, { recursive: true });
fs.copyFileSync(SOURCE, path.join(SKILL_DIR, 'SKILL.md'));

console.log(
  `\x1b[32m✔ Skill "${SKILL_NAME}" installed for Claude Code!\x1b[0m`
);
console.log();
console.log('Usage: In any Claude Code session, run:');
console.log(`  \x1b[36m/create-marigold-app my-app\x1b[0m`);
console.log();
console.log(`Installed to: ${SKILL_DIR}`);
