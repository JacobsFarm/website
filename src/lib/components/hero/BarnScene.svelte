<script>
	import Cow from './Cow.svelte';
	import LyingCow from './LyingCow.svelte';

	/**
	 * Het camerabeeld: een stal met koeien, plus de detectie-overlay van de AI.
	 *
	 * Fases (0–5):
	 *   0 rust · 1 actie begint · 2 gedrag zichtbaar · 3 AI tekent kader
	 *   4 foto vastgelegd · 5 melding verstuurd
	 *
	 * @property {'heat'|'calving'} scene
	 * @property {number}  phase
	 * @property {string}  label  - Tekst in het detectielabel, bijv. "mounting 0.92".
	 * @property {boolean} still  - Geen beweging (miniatuur op de telefoon).
	 */
	let { scene = 'heat', phase = 0, label = '', still = false } = $props();

	const uid = $props.id();

	// Vaste "willekeurige" strohalmen, zodat server en browser hetzelfde tekenen.
	const straw = Array.from({ length: 64 }, (_, i) => {
		const r = (/** @type {number} */ n) => {
			const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
			return x - Math.floor(x);
		};
		const x = r(1) * 660 - 10;
		const y = 300 + r(2) * 100;
		const len = 10 + r(3) * 18;
		const angle = (r(4) - 0.5) * 1.4;
		return {
			x1: x,
			y1: y,
			x2: x + Math.cos(angle) * len,
			y2: y + Math.sin(angle) * len,
			o: 0.25 + r(5) * 0.45
		};
	});

	const box = $derived(
		scene === 'heat'
			? { x: 186, y: 136, w: 306, h: 210 }
			: { x: 296, y: 228, w: 120, h: 102 }
	);
</script>

<svg
	class="scene"
	class:still
	viewBox="0 0 640 400"
	preserveAspectRatio="xMidYMid slice"
	aria-hidden="true"
	data-phase={phase}
>
	<defs>
		<linearGradient id="{uid}-wall" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="var(--scene-roof)" />
			<stop offset="0.5" stop-color="var(--scene-wall)" />
			<stop offset="1" stop-color="var(--scene-wall-low)" />
		</linearGradient>
		<linearGradient id="{uid}-floor" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="var(--scene-floor)" />
			<stop offset="1" stop-color="var(--scene-floor-low)" />
		</linearGradient>
		<radialGradient id="{uid}-lamp" cx="0.5" cy="0.5" r="0.5">
			<stop offset="0" stop-color="var(--scene-light)" stop-opacity="0.45" />
			<stop offset="1" stop-color="var(--scene-light)" stop-opacity="0" />
		</radialGradient>
		<radialGradient id="{uid}-heat-lamp" cx="0.5" cy="0.5" r="0.5">
			<stop offset="0" stop-color="var(--scene-heat-lamp)" stop-opacity="0.5" />
			<stop offset="1" stop-color="var(--scene-heat-lamp)" stop-opacity="0" />
		</radialGradient>
		<radialGradient id="{uid}-vignette" cx="0.5" cy="0.5" r="0.75">
			<stop offset="0.55" stop-color="#000" stop-opacity="0" />
			<stop offset="1" stop-color="#000" stop-opacity="0.55" />
		</radialGradient>
		<linearGradient id="{uid}-sweep" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="var(--detect)" stop-opacity="0" />
			<stop offset="0.85" stop-color="var(--detect)" stop-opacity="0.16" />
			<stop offset="1" stop-color="var(--detect)" stop-opacity="0.5" />
		</linearGradient>
		<pattern id="{uid}-scan" width="4" height="4" patternUnits="userSpaceOnUse">
			<rect width="4" height="1" fill="#fff" fill-opacity="0.035" />
		</pattern>
	</defs>

	<!-- ── Stal ── -->
	<rect width="640" height="400" fill="url(#{uid}-wall)" />
	<path d="M0,0 H640 V46 L320,18 L0,46 Z" class="roof" />
	<path d="M0,46 L320,18 L640,46" class="truss" />
	<path d="M80,39 V60 M240,25 V60 M400,25 V60 M560,39 V60" class="truss" />
	<rect x="0" y="62" width="640" height="10" class="light-strip" />
	{#each [0, 1, 2, 3, 4, 5, 6, 7] as i}
		<rect x={8 + i * 80} y="84" width="64" height="38" rx="2" class="window" />
	{/each}
	<circle cx="200" cy="96" r="150" fill="url(#{uid}-lamp)" />
	<circle cx="500" cy="96" r="130" fill="url(#{uid}-lamp)" />

	{#if scene === 'heat'}
		<!-- Ligboxbeugels op de achtergrond -->
		<path d="M0,236 H640" class="rail" />
		{#each [0, 1, 2, 3, 4, 5, 6, 7, 8] as i}
			<path
				d="M{i * 76 - 6},300 V256 C{i * 76 - 6},236 {i * 76 + 8},228 {i * 76 + 30},228 H{i * 76 + 54} C{i * 76 + 62},228 {i * 76 + 66},234 {i * 76 + 66},244"
				class="rail"
			/>
		{/each}
		{#each [110, 300, 490] as x}
			<rect {x} y="60" width="9" height="244" class="post" />
		{/each}

		<rect y="296" width="640" height="104" fill="url(#{uid}-floor)" />
		{#each [312, 330, 352, 380] as y}
			<path d="M0,{y} H640" class="slat" />
		{/each}

		<!-- Koeien op de achtergrond -->
		<g class="far" transform="translate(22,300) scale(0.5)">
			<LyingCow uid="{uid}-bg1" />
		</g>
		<g class="far" transform="translate(632,300) scale(-0.56,0.56)">
			<Cow uid="{uid}-bg2" variant="b" />
		</g>

		<!-- Koe die besprongen wordt -->
		<g transform="translate(244,338)">
			<Cow uid="{uid}-a" variant="a" />
		</g>

		<!-- Koe die springt -->
		<g transform="translate(-4,342)">
			<g class="mover">
				<g class="rear" style="transform-origin: 48px 0px">
					<Cow uid="{uid}-b" variant="b" walking={!still && phase === 1} mounting={phase >= 2} />
				</g>
			</g>
		</g>
	{:else}
		<!-- Afkalfhok met infraroodlamp en stro -->
		<circle cx="170" cy="120" r="190" fill="url(#{uid}-heat-lamp)" />
		<path d="M170,0 V70" class="wire" />
		<path d="M150,70 H190 L182,90 H158 Z" class="lamp" />
		<ellipse cx="170" cy="92" rx="10" ry="3" class="lamp-glow" />

		{#each [60, 330, 600] as x}
			<rect {x} y="150" width="10" height="150" class="post" />
		{/each}
		{#each [178, 206, 234, 262] as y}
			<path d="M0,{y} H640" class="rail" />
		{/each}

		<rect y="290" width="640" height="110" class="straw-bed" />
		{#each straw as s}
			<path d="M{s.x1},{s.y1} L{s.x2},{s.y2}" class="straw" style="opacity: {s.o}" />
		{/each}

		<g transform="translate(84,352) scale(1.15)">
			<LyingCow uid="{uid}-calving" labour={phase >= 1} waterBag={phase >= 2} legs={phase >= 4} />
		</g>
	{/if}

	<!-- ── Camerabeeld ── -->
	<rect width="640" height="400" fill="url(#{uid}-vignette)" />
	<rect width="640" height="400" fill="url(#{uid}-scan)" />

	{#if !still}
		<rect class="sweep" class:on={phase < 4} x="0" y="0" width="640" height="70" fill="url(#{uid}-sweep)" />
	{/if}

	<!-- ── Detectie ── -->
	<g class="detection" class:on={phase >= 3}>
		<rect x={box.x} y={box.y} width={box.w} height={box.h} rx="3" class="det-fill" />
		<path d="M{box.x},{box.y} h{box.w} v{box.h} h-{box.w} Z" pathLength="100" class="det-box" />
		<g class="det-label">
			<rect x={box.x - 1.5} y={box.y - 23} width={label.length * 8.6 + 16} height="23" rx="3" class="det-tag" />
			<text x={box.x + 7} y={box.y - 7} class="det-text">{label}</text>
		</g>
	</g>

	{#if !still}
		<rect width="640" height="400" class="flash" class:on={phase >= 4} />
	{/if}
</svg>

<style>
	.scene {
		--scene-roof: #1d2620;
		--scene-wall: #3b4a3f;
		--scene-wall-low: #34413a;
		--scene-floor: #4d5248;
		--scene-floor-low: #33372f;
		--scene-light: #f3ead0;
		--scene-heat-lamp: #f0a640;
		--scene-steel: #8c998f;

		--cow-hide: #f1efe7;
		--cow-hide-far: #cfcbbe;
		--cow-patch: #1b201c;
		--cow-pink: #d8a294;
		--cow-hoof: #3a3631;
		--calf-leg: #e6d6b0;
		--calf-hoof: #fbf3dc;
		--water-bag: oklch(82% 0.06 85 / 0.85);
		--detect: var(--accent-amber);

		display: block;
		width: 100%;
		height: 100%;
	}

	.roof {
		fill: #161d18;
	}

	.truss {
		fill: none;
		stroke: #2c3830;
		stroke-width: 5;
	}

	.light-strip {
		fill: var(--scene-light);
		opacity: 0.22;
	}

	.window {
		fill: var(--scene-light);
		opacity: 0.07;
	}

	.rail {
		fill: none;
		stroke: var(--scene-steel);
		stroke-width: 4;
		stroke-linecap: round;
		opacity: 0.75;
	}

	.post {
		fill: #6b766d;
	}

	.slat {
		stroke: #000;
		stroke-opacity: 0.22;
		stroke-width: 2;
	}

	.far {
		filter: brightness(0.62) saturate(0.8);
	}

	.wire {
		stroke: #11160f;
		stroke-width: 2;
	}

	.lamp {
		fill: #2a2a26;
	}

	.lamp-glow {
		fill: #ffcf7a;
	}

	.straw-bed {
		fill: #5d4f33;
	}

	.straw {
		stroke: #c9a865;
		stroke-width: 2;
		stroke-linecap: round;
	}

	/* De koe die springt: eerst naar voren lopen, dan omhoog. */
	.mover {
		transition: transform 1.3s cubic-bezier(0.45, 0, 0.25, 1);
	}

	.rear {
		transition: transform 0.9s var(--ease-spring);
	}

	[data-phase='1'] .mover,
	[data-phase='2'] .mover,
	[data-phase='3'] .mover,
	[data-phase='4'] .mover,
	[data-phase='5'] .mover {
		transform: translateX(168px);
	}

	[data-phase='2'] .rear,
	[data-phase='3'] .rear,
	[data-phase='4'] .rear,
	[data-phase='5'] .rear {
		transform: rotate(-28deg);
	}

	/* Scanlijn: de AI bekijkt het beeld om de paar seconden. */
	.sweep {
		opacity: 0;
		transform: translateY(-80px);
	}

	.sweep.on {
		animation: sweep 2.6s cubic-bezier(0.45, 0, 0.55, 1) infinite;
	}

	@keyframes sweep {
		0% {
			transform: translateY(-80px);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		75% {
			opacity: 1;
		}
		100% {
			transform: translateY(400px);
			opacity: 0;
		}
	}

	/* Detectiekader tekent zichzelf, daarna verschijnt het label. */
	.det-box {
		fill: none;
		stroke: var(--detect);
		stroke-width: 3;
		stroke-dasharray: 100;
		stroke-dashoffset: 100;
		transition: stroke-dashoffset 0.8s var(--ease-out);
	}

	.det-fill {
		fill: var(--detect);
		opacity: 0;
		transition: opacity 0.6s var(--ease-out) 0.4s;
	}

	.det-label {
		opacity: 0;
		transform: translateY(6px);
		transition:
			opacity 0.4s var(--ease-out) 0.55s,
			transform 0.5s var(--ease-spring) 0.55s;
	}

	.det-tag {
		fill: var(--detect);
	}

	.det-text {
		fill: #14180f;
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 700;
	}

	.detection.on .det-box {
		stroke-dashoffset: 0;
	}

	.detection.on .det-fill {
		opacity: 0.08;
	}

	.detection.on .det-label {
		opacity: 1;
		transform: none;
	}

	.flash {
		fill: #fff;
		opacity: 0;
		pointer-events: none;
	}

	.flash.on {
		animation: flash 0.55s var(--ease-out);
	}

	@keyframes flash {
		0% {
			opacity: 0;
		}
		15% {
			opacity: 0.55;
		}
		100% {
			opacity: 0;
		}
	}

	/* Miniatuur en reduced motion: alles staat stil op de eindstand. */
	.still :global(*),
	.still :global(*)::before {
		animation: none !important;
		transition: none !important;
	}
</style>
