<svelte:options namespace="svg" />

<script>
	/**
	 * Staande Holstein-koe in zijaanzicht, kijkend naar rechts.
	 * Lokale coördinaten: de grond ligt op y = 0, de achterpoten rond x = 48.
	 *
	 * @property {string}  uid      - Unieke prefix voor de clipPath-id.
	 * @property {'a'|'b'} variant  - Ander vlekkenpatroon.
	 * @property {boolean} walking  - Poten bewegen (lopen).
	 * @property {boolean} mounting - Voorpoten naar voren (bespringen).
	 */
	/** @type {{ uid: string, variant?: 'a'|'b', walking?: boolean, mounting?: boolean }} */
	let { uid, variant = 'a', walking = false, mounting = false } = $props();

	const body =
		'M16,-100 C14,-118 32,-124 56,-122 L138,-122 C160,-123 176,-112 178,-94 L178,-70 C178,-56 168,-50 152,-50 L42,-50 C24,-50 14,-62 14,-78 Z';

	const patches = {
		a: [
			'M44,-128 C72,-132 86,-108 74,-92 C64,-80 42,-86 34,-100 C28,-112 32,-124 44,-128 Z',
			'M108,-128 C132,-124 142,-102 130,-86 C118,-74 96,-86 98,-104 C99,-116 100,-126 108,-128 Z',
			'M150,-92 C166,-94 180,-80 174,-64 C162,-54 146,-64 148,-78 Z',
			'M16,-80 C30,-82 40,-66 34,-54 L10,-54 Z'
		],
		b: [
			'M8,-132 L66,-132 C78,-110 66,-80 36,-74 C16,-72 4,-92 8,-132 Z',
			'M92,-128 C122,-130 152,-122 162,-102 C152,-80 122,-70 102,-82 C88,-92 84,-112 92,-128 Z',
			'M60,-64 C78,-70 96,-62 92,-48 L56,-48 Z'
		]
	};
</script>

<g class="cow" class:walking class:mounting>
	<defs>
		<clipPath id="{uid}-clip"><path d={body} /></clipPath>
	</defs>

	<ellipse class="ground-shadow" cx="96" cy="2" rx="98" ry="7" />

	<!-- Poten aan de verre kant -->
	<g class="leg leg-a hind" style="transform-origin: 30px -60px">
		<rect x="24" y="-62" width="13" height="58" rx="5" class="hide-far" />
		<rect x="24" y="-8" width="13" height="8" rx="2" class="hoof" />
	</g>
	<g class="leg leg-b front" style="transform-origin: 138px -60px">
		<rect x="132" y="-62" width="12" height="58" rx="5" class="hide-far" />
		<rect x="132" y="-8" width="12" height="8" rx="2" class="hoof" />
	</g>

	<!-- Staart -->
	<g class="tail" style="transform-origin: 16px -104px">
		<path d="M16,-104 C2,-96 -2,-70 2,-38" class="tail-line" />
		<path d="M-4,-44 C-9,-30 2,-21 7,-32 C9,-38 4,-46 -4,-44 Z" class="patch" />
	</g>

	<!-- Romp met vlekken -->
	<path d={body} class="hide" />
	<g clip-path="url(#{uid}-clip)">
		{#each patches[variant] as d}
			<path {d} class="patch" />
		{/each}
	</g>
	<path d="M26,-112 C34,-120 46,-121 54,-118" class="contour" />

	<ellipse cx="62" cy="-50" rx="15" ry="8" class="pink" />
	<rect x="54" y="-46" width="4" height="7" rx="2" class="pink" />
	<rect x="66" y="-46" width="4" height="7" rx="2" class="pink" />

	<!-- Poten aan de nabije kant -->
	<g class="leg leg-b hind" style="transform-origin: 49px -62px">
		<rect x="42" y="-64" width="14" height="60" rx="6" class="hide" />
		<rect x="42" y="-8" width="14" height="8" rx="2" class="hoof" />
	</g>
	<g class="leg leg-a front" style="transform-origin: 159px -62px">
		<rect x="152" y="-64" width="14" height="60" rx="6" class="hide" />
		<rect x="152" y="-8" width="14" height="8" rx="2" class="hoof" />
	</g>

	<!-- Nek en kop -->
	<g class="head" style="transform-origin: 176px -104px">
		<path d="M158,-120 C176,-129 194,-127 203,-114 L207,-92 C199,-82 182,-79 168,-78 Z" class="hide" />
		{#if variant === 'b'}
			<path d="M160,-121 C176,-128 192,-127 200,-118 L196,-96 C184,-92 172,-96 166,-104 Z" class="patch" />
		{/if}
		<g transform="translate(196,-120)">
			<path d="M0,2 C-12,-4 -21,0 -18,7 C-12,10 -4,8 0,6 Z" class="hide" />
			<path d="M-3,3 C-10,0 -15,2 -14,5 C-10,6 -6,5 -3,4 Z" class="pink" />
			<path d="M8,-8 C7,-14 11,-17 15,-14" class="horn" />
			<path d="M-2,-4 C6,-14 24,-14 32,-2 L41,26 C43,36 35,42 25,40 L13,38 C3,36 -3,26 -3,14 Z" class="hide" />
			{#if variant === 'b'}
				<path d="M-3,10 C-2,-6 10,-15 25,-12 C22,0 16,12 6,22 C0,24 -3,18 -3,10 Z" class="patch" />
			{:else}
				<path d="M20,-12 C28,-10 33,0 34,6 C28,6 22,0 20,-12 Z" class="patch" />
			{/if}
			<ellipse cx="31" cy="33" rx="11" ry="8" class="pink" />
			<ellipse cx="36" cy="32" rx="2" ry="1.4" class="nostril" />
			<circle cx="19" cy="8" r="2.6" class="eye" />
		</g>
	</g>
</g>

<style>
	.hide {
		fill: var(--cow-hide);
	}

	.hide-far {
		fill: var(--cow-hide-far);
	}

	.patch {
		fill: var(--cow-patch);
	}

	.pink {
		fill: var(--cow-pink);
	}

	.hoof,
	.nostril {
		fill: var(--cow-hoof);
	}

	.eye {
		fill: var(--cow-patch);
	}

	.horn {
		fill: none;
		stroke: var(--cow-hide-far);
		stroke-width: 3;
		stroke-linecap: round;
	}

	.contour {
		fill: none;
		stroke: var(--cow-hide-far);
		stroke-width: 2;
		stroke-linecap: round;
	}

	.tail-line {
		fill: none;
		stroke: var(--cow-hide);
		stroke-width: 4;
		stroke-linecap: round;
	}

	.ground-shadow {
		fill: oklch(0% 0 0 / 0.3);
		transition: opacity 0.3s var(--ease-out);
	}

	.leg,
	.head,
	.tail {
		transition: transform 0.7s var(--ease-spring);
	}

	/* Rustig staartzwiepen en af en toe een hoofdknik. */
	.tail {
		animation: tail-swish 3.4s ease-in-out infinite;
	}

	.head {
		animation: head-nod 5.2s ease-in-out infinite;
	}

	.walking .leg-a {
		animation: step 0.55s ease-in-out infinite alternate;
	}

	.walking .leg-b {
		animation: step 0.55s ease-in-out infinite alternate-reverse;
	}

	.mounting .front {
		animation: none;
		transform: rotate(-38deg);
	}

	.mounting .hind {
		animation: none;
		transform: rotate(20deg);
	}

	.mounting .ground-shadow {
		opacity: 0;
	}

	.mounting .head {
		animation: none;
		transform: rotate(18deg);
	}

	@keyframes tail-swish {
		0%,
		100% {
			transform: rotate(0deg);
		}
		40% {
			transform: rotate(14deg);
		}
		60% {
			transform: rotate(-5deg);
		}
	}

	@keyframes head-nod {
		0%,
		70%,
		100% {
			transform: rotate(0deg);
		}
		80% {
			transform: rotate(5deg);
		}
	}

	@keyframes step {
		from {
			transform: rotate(-13deg);
		}
		to {
			transform: rotate(13deg);
		}
	}
</style>
