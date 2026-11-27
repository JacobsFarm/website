// Converts an .srt subtitle file to WebVTT for the <track> element.
//   node scripts/srt-to-vtt.mjs input.srt output.vtt
import { readFileSync, writeFileSync } from 'fs';

const [input, output] = process.argv.slice(2);
const srt = readFileSync(input, 'utf-8').replace(/^﻿/, '').replace(/\r\n?/g, '\n').trim();
const cues = srt
	.split(/\n{2,}/)
	.map((block) => block.split('\n').filter((line, i) => !(i === 0 && /^\d+$/.test(line.trim()))))
	.filter((lines) => lines.length > 1 && lines[0].includes('-->'))
	.map(([time, ...text]) => `${time.replace(/,/g, '.')}\n${text.join('\n')}`);
writeFileSync(output, `WEBVTT\n\n${cues.join('\n\n')}\n`);
console.log(`${output}: ${cues.length} cues`);
