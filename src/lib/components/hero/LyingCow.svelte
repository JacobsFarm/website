<svelte:options namespace="svg" />

<script>
	/**
	 * Liggende koe in zijaanzicht, kop links en achterhand rechts.
	 * Lokale coördinaten: de grond ligt op y = 0, de vulva rond (214, -56).
	 *
	 * @property {string}  uid      - Unieke prefix voor de clipPath-id.
	 * @property {boolean} labour   - Weeën: staart omhoog, kop iets geheven.
	 * @property {boolean} waterBag - Waterblaas zichtbaar.
	 * @property {boolean} legs     - Voorpootjes van het kalf zichtbaar.
	 * @property {boolean} calf     - Kop en lichaam van het kalf komen eruit.
	 */
	let { uid, labour = false, waterBag = false, legs = false, calf = false } = $props();

	const body =
		'M28,-62 C26,-90 64,-100 116,-98 C166,-96 204,-88 212,-62 C218,-36 206,-12 182,-8 L58,-8 C36,-8 30,-32 28,-62 Z';
</script>

<g class="lying" class:labour class:water-bag={waterBag} class:legs class:calf-out={calf}>
	<defs>
		<clipPath id="{uid}-clip"><path d={body} /></clipPath>
	</defs>

	<ellipse class="ground-shadow" cx="118" cy="1" rx="122" ry="8" />

	<!-- Het kalf ligt achter de romp. Eerst schuiven de pootjes naar buiten,
	     daarna glijdt het hele kalf (kop op de pootjes) schuin naar beneden. -->
	<g class="calf-all" style="transform-origin: 214px -56px">
		<g class="calf-legs">
			<g transform="rotate(8 210 -62)">
				<rect x="190" y="-67" width="58" height="9" rx="4.5" class="calf" />
				<rect x="242" y="-68.5" width="13" height="12" rx="3.5" class="calf-hoof" />
			</g>
			<g transform="rotate(22 210 -54)">
				<rect x="190" y="-58" width="52" height="9" rx="4.5" class="calf" />
				<rect x="236" y="-59.5" width="13" height="12" rx="3.5" class="calf-hoof" />
			</g>
		</g>

		<g class="calf-body">
			<ellipse cx="146" cy="-62" rx="38" ry="18" class="calf" />
			<ellipse cx="140" cy="-70" rx="12" ry="7" class="calf-patch" />
			<path d="M168,-70 C170,-80 186,-80 194,-72 L202,-62 C205,-57 201,-52 195,-53 L178,-56 C170,-58 166,-63 168,-70 Z" class="calf" />
			<ellipse cx="172" cy="-75" rx="6" ry="3.5" class="calf-patch" transform="rotate(-25 172 -75)" />
			<circle cx="185" cy="-69" r="1.8" class="eye" />
			<ellipse cx="199" cy="-57" rx="3" ry="2.4" class="calf-nose" />
		</g>
	</g>

	<!-- Staart -->
	<g class="tail" style="transform-origin: 211px -76px">
		<path d="M211,-76 C224,-64 226,-38 222,-14" class="tail-line" />
		<path d="M216,-20 C212,-6 222,2 228,-8 C230,-14 224,-22 216,-20 Z" class="patch" />
	</g>

	<g class="torso" style="transform-origin: 120px 0px">
		<path d={body} class="hide" />
		<g clip-path="url(#{uid}-clip)">
			<path d="M60,-104 C92,-106 108,-86 98,-70 C88,-56 60,-62 52,-78 C46,-90 48,-102 60,-104 Z" class="patch" />
			<path d="M128,-104 C160,-104 190,-96 196,-78 C186,-62 156,-60 140,-70 C128,-80 122,-96 128,-104 Z" class="patch" />
			<path d="M30,-50 C46,-54 58,-40 52,-26 C40,-18 26,-28 26,-40 Z" class="patch" />
		</g>
		<path d="M146,-18 C146,-46 172,-64 204,-58" class="contour" />
	</g>

	<!-- Gevouwen poten -->
	<path d="M118,-14 C140,-18 176,-16 198,-12 C206,-10 206,0 198,0 L122,0 C114,0 112,-12 118,-14 Z" class="hide" />
	<rect x="192" y="-11" width="12" height="11" rx="3" class="hoof" />
	<path d="M40,-12 L88,-10 C94,-10 96,0 88,0 L44,0 C36,0 34,-10 40,-12 Z" class="hide-far" />
	<rect x="82" y="-10" width="11" height="10" rx="3" class="hoof" />

	<!-- Waterblaas -->
	<g class="bag" style="transform-origin: 213px -56px">
		<ellipse cx="228" cy="-50" rx="16" ry="20" class="bag-fill" />
		<ellipse cx="222" cy="-58" rx="4.5" ry="6.5" class="bag-shine" />
	</g>

	<!-- Nek en kop (gespiegeld ten opzichte van de staande koe) -->
	<g class="head" style="transform-origin: 54px -70px">
		<path d="M72,-88 C52,-100 30,-108 14,-104 L2,-84 C16,-70 40,-62 60,-58 Z" class="hide" />
		<g transform="translate(14,-114) scale(-1,1)">
			<path d="M0,2 C-12,-4 -21,0 -18,7 C-12,10 -4,8 0,6 Z" class="hide-far" />
			<path d="M8,-8 C7,-14 11,-17 15,-14" class="horn" />
			<path d="M-2,-4 C6,-14 24,-14 32,-2 L41,26 C43,36 35,42 25,40 L13,38 C3,36 -3,26 -3,14 Z" class="hide" />
			<path d="M-3,10 C-2,-6 10,-15 25,-12 C22,0 16,12 6,22 C0,24 -3,18 -3,10 Z" class="patch" />
			<ellipse cx="31" cy="33" rx="11" ry="8" class="pink" />
			<ellipse cx="36" cy="32" rx="2" ry="1.4" class="hoof" />
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

	.patch,
	.eye {
		fill: var(--cow-patch);
	}

	.pink {
		fill: var(--cow-pink);
	}

	.hoof {
		fill: var(--cow-hoof);
	}

	.calf {
		fill: var(--calf-leg);
	}

	.calf-patch {
		fill: oklch(48% 0.04 70);
	}

	.calf-nose {
		fill: var(--cow-pink);
	}

	.calf-hoof {
		fill: var(--calf-hoof);
	}

	.horn,
	.contour {
		fill: none;
		stroke: var(--cow-hide-far);
		stroke-width: 2.5;
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
	}

	.bag-fill {
		fill: var(--water-bag);
	}

	.bag-shine {
		fill: oklch(100% 0 0 / 0.55);
	}

	/* Ademhaling */
	.torso {
		animation: breathe 3.6s ease-in-out infinite;
	}

	.tail,
	.head {
		transition: transform 0.9s var(--ease-spring);
	}

	.labour .tail {
		transform: rotate(-38deg);
	}

	.labour .head {
		transform: rotate(-7deg);
	}

	.bag {
		transform: scale(0);
		opacity: 0;
		transition:
			transform 1s var(--ease-spring),
			opacity 0.4s var(--ease-out);
	}

	.water-bag .bag {
		transform: scale(1);
		opacity: 1;
	}

	.calf-legs {
		transform: translateX(-46px);
		transition: transform 1.1s var(--ease-spring);
	}

	.legs .calf-legs {
		transform: none;
	}

	.calf-all {
		transition: transform 1.6s var(--ease-spring);
	}

	.calf-out .calf-all {
		transform: translate(62px, 8px) rotate(16deg);
	}

	/* De waterblaas is gebroken zodra het kalf eruit komt. */
	.calf-out .bag {
		transform: scale(0.3);
		opacity: 0;
	}

	@keyframes breathe {
		0%,
		100% {
			transform: scaleY(1);
		}
		50% {
			transform: scaleY(1.025);
		}
	}
</style>
