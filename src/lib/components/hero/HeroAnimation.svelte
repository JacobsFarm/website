<script>
	import * as m from '$lib/paraglide/messages.js';
	import { untrack } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import BarnScene from './BarnScene.svelte';
	import PhoneMock from './PhoneMock.svelte';
	import Icon from '../Icon.svelte';

	/**
	 * De hero-animatie: een stalcamera ziet een koe springen of afkalven, de AI
	 * tekent een kader, en er komt een melding binnen op de telefoon.
	 *
	 * Draait alleen als hij in beeld is en het tabblad zichtbaar is. Onder
	 * `prefers-reduced-motion` toont hij direct de eindstand, zonder beweging.
	 */

	const SCENES = {
		heat: {
			steps: [700, 2000, 3300, 4400, 5000],
			duration: 10500,
			clock: 2 * 3600 + 14 * 60 + 3,
			cam: '03',
			conf: [0.92, 0.92],
			labels: ['mounting', 'mounting']
		},
		calving: {
			steps: [700, 1900, 3200, 4500, 5200],
			duration: 10500,
			clock: 4 * 3600 + 37 * 60 + 41,
			cam: '07',
			conf: [0.87, 0.91],
			labels: ['water bag', 'legs']
		}
	};

	const order = /** @type {const} */ (['heat', 'calving']);

	let scene = $state(/** @type {'heat'|'calving'} */ ('heat'));
	let phase = $state(0);
	let elapsed = $state(0);
	let ms = $state(38);
	let restart = $state(0);
	let runId = $state(0);

	let paused = $state(false);
	let inView = $state(false);
	let docVisible = $state(true);
	let reduced = $state(false);

	/** @type {HTMLElement} */
	let stage;

	const conf = new Tween(0, { duration: 750, easing: cubicOut });

	const cfg = $derived(SCENES[scene]);
	const running = $derived(inView && docVisible && !paused && !reduced);
	const shownPhase = $derived(reduced ? 5 : phase);
	const stageIndex = $derived(shownPhase >= 4 ? 1 : 0);
	const shownConf = $derived(reduced ? cfg.conf[1] : conf.current);
	const label = $derived(`${cfg.labels[stageIndex]} ${shownConf.toFixed(2)}`);
	const finalLabel = $derived(`${cfg.labels[1]} ${cfg.conf[1].toFixed(2)}`);

	const fmt = (/** @type {number} */ n) => String(n).padStart(2, '0');
	const clockSeconds = $derived(cfg.clock + elapsed);
	const clockText = $derived(
		`${fmt(Math.floor(clockSeconds / 3600) % 24)}:${fmt(Math.floor(clockSeconds / 60) % 60)}:${fmt(clockSeconds % 60)}`
	);
	const phoneClock = $derived(clockText.slice(0, 5));

	// Tijdlijn van één scène. Herstart bij een andere scène, na pauze of bij
	// een klik op het huidige tabblad.
	$effect(() => {
		if (!running) return;
		const current = scene;
		restart;

		const config = SCENES[current];
		untrack(() => {
			phase = 0;
			elapsed = 0;
			conf.set(0, { duration: 0 });
			runId += 1;
		});

		const timers = config.steps.map((t, i) => setTimeout(() => (phase = i + 1), t));
		timers.push(
			setTimeout(() => {
				scene = order[(order.indexOf(current) + 1) % order.length];
			}, config.duration)
		);
		const tick = setInterval(() => {
			elapsed += 1;
			ms = 35 + Math.round(Math.random() * 6);
		}, 1000);

		return () => {
			timers.forEach(clearTimeout);
			clearInterval(tick);
		};
	});

	// Zekerheid telt op zodra het kader verschijnt.
	$effect(() => {
		const p = phase;
		const c = SCENES[scene].conf;
		untrack(() => {
			if (p === 3) conf.target = c[0];
			if (p === 4) conf.target = c[1];
		});
	});

	$effect(() => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		reduced = motion.matches;
		const onMotion = () => (reduced = motion.matches);
		motion.addEventListener('change', onMotion);

		const onVisibility = () => (docVisible = document.visibilityState === 'visible');
		document.addEventListener('visibilitychange', onVisibility);

		const observer = new IntersectionObserver(([entry]) => (inView = entry.isIntersecting), {
			threshold: 0.2
		});
		observer.observe(stage);

		return () => {
			motion.removeEventListener('change', onMotion);
			document.removeEventListener('visibilitychange', onVisibility);
			observer.disconnect();
		};
	});

	/** @param {'heat'|'calving'} key */
	function select(key) {
		if (scene === key) restart += 1;
		else scene = key;
	}

	const tabLabel = (/** @type {string} */ key) => (key === 'heat' ? m.home_anim_tab_heat() : m.home_anim_tab_calving());
</script>

<figure class="stage" class:idle={!running} bind:this={stage}>
	<figcaption class="visually-hidden">{m.home_anim_label()}</figcaption>

	<div class="controls">
		<div class="tabs">
			{#each order as key (key)}
				<button
					type="button"
					class="tab"
					class:active={scene === key}
					aria-pressed={scene === key}
					onclick={() => select(key)}
				>
					<span class="tab-dot" aria-hidden="true"></span>
					{tabLabel(key)}
					{#if scene === key && running}
						{#key runId}
							<span class="tab-progress" style="animation-duration: {SCENES[key].duration}ms" aria-hidden="true"></span>
						{/key}
					{/if}
				</button>
			{/each}
		</div>

		{#if !reduced}
			<button
				type="button"
				class="pause"
				onclick={() => (paused = !paused)}
				aria-label={paused ? m.home_anim_play() : m.home_anim_pause()}
				title={paused ? m.home_anim_play() : m.home_anim_pause()}
			>
				<Icon name={paused ? 'play' : 'pause'} size={14} stroke={2.2} />
			</button>
		{/if}
	</div>

	<div class="frame" aria-hidden="true">
		<div class="monitor">
			<div class="screen">
				<BarnScene {scene} phase={shownPhase} {label} />

				<div class="hud">
					<div class="hud-row">
						<span class="pill rec"><i></i>REC</span>
						<span class="pill cam">
							CAM {cfg.cam} · {scene === 'heat' ? m.home_anim_cam_heat() : m.home_anim_cam_calving()}
						</span>
						<span class="pill clock">{clockText}</span>
					</div>

					<div class="hud-row bottom">
						<span class="pill status" class:sent={shownPhase >= 5}>
							{#if shownPhase >= 5}
								<Icon name="check" size={12} stroke={2.6} />
								{m.home_anim_sent()}
							{:else}
								<i class="pulse"></i>
								AI · {m.home_anim_analysing()}
							{/if}
						</span>
						<span class="pill frames">
							{m.home_anim_frames()}
							<span class="cells">
								{#each [0, 1, 2, 3] as i}
									<i class:on={shownPhase >= 3} style="transition-delay: {i * 170}ms"></i>
								{/each}
							</span>
						</span>
						<span class="pill ms">{ms} ms</span>
					</div>
				</div>
			</div>
		</div>

		<div class="phone-wrap">
			<PhoneMock
				{scene}
				phase={shownPhase}
				label={finalLabel}
				title={scene === 'heat' ? m.home_anim_heat_title() : m.home_anim_calving_title()}
				body={scene === 'heat' ? m.home_anim_heat_body() : m.home_anim_calving_body()}
				clock={phoneClock}
				status={m.home_anim_status()}
				now={m.home_anim_now()}
				clip={m.home_anim_clip()}
			/>
		</div>
	</div>
</figure>

<style>
	.stage {
		position: relative;
		margin: 0;
	}

	.idle :global(*) {
		animation-play-state: paused !important;
	}

	/* ── Bediening ── */
	.controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin-bottom: 0.85rem;
	}

	.tabs {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		padding: 0.3rem;
		border-radius: var(--radius-pill);
		background: oklch(22% 0.02 145 / 0.05);
		box-shadow: inset 0 0 0 1px var(--line);
	}

	.tab {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.95rem;
		border: 0;
		border-radius: var(--radius-pill);
		background: transparent;
		color: var(--text-muted);
		font-size: 0.85rem;
		font-weight: 500;
		cursor: pointer;
		overflow: hidden;
		transition:
			background-color var(--dur) var(--ease-spring),
			color var(--dur) var(--ease-spring),
			box-shadow var(--dur) var(--ease-spring);
	}

	.tab:hover {
		color: var(--text-main);
	}

	.tab.active {
		background: var(--card-bg);
		color: var(--text-main);
		box-shadow: var(--shadow-sm);
	}

	.tab-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--soft-gray);
		transition: background-color var(--dur) var(--ease-out);
	}

	.tab.active .tab-dot {
		background: var(--accent-amber);
	}

	.tab-progress {
		position: absolute;
		left: 0.95rem;
		right: 0.95rem;
		bottom: 0.28rem;
		height: 2px;
		border-radius: 2px;
		background: var(--accent-amber);
		transform-origin: left;
		animation: progress linear forwards;
		opacity: 0.7;
	}

	@keyframes progress {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}

	.pause {
		display: grid;
		place-items: center;
		width: 2.4rem;
		height: 2.4rem;
		flex-shrink: 0;
		border: 0;
		border-radius: 50%;
		background: transparent;
		color: var(--text-muted);
		box-shadow: inset 0 0 0 1px var(--line);
		cursor: pointer;
		transition:
			color var(--dur-fast) var(--ease-out),
			box-shadow var(--dur-fast) var(--ease-out);
	}

	.pause:hover {
		color: var(--text-main);
		box-shadow: inset 0 0 0 1px var(--line-strong);
	}

	/* ── Monitor + telefoon ── */
	.frame {
		position: relative;
		margin-bottom: 13%;
	}

	.monitor {
		padding: 0.5rem;
		border-radius: var(--radius-xl);
		background: linear-gradient(165deg, #2f3a32, #141a16);
		box-shadow:
			inset 0 1px 0 oklch(100% 0 0 / 0.08),
			inset 0 0 0 1px oklch(100% 0 0 / 0.04),
			var(--shadow-lg);
	}

	.screen {
		position: relative;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		border-radius: calc(var(--radius-xl) - 0.5rem);
		background: #1d2620;
		container-type: inline-size;
	}

	.phone-wrap {
		position: absolute;
		right: -3%;
		bottom: 0;
		width: 30%;
		transform: translateY(24%) rotate(2.5deg);
		filter: drop-shadow(0 20px 30px oklch(15% 0.04 150 / 0.25));
	}

	/* ── HUD over het camerabeeld ── */
	.hud {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 2.4cqw;
		font-family: var(--font-mono);
		font-size: clamp(8px, 1.75cqw, 12.5px);
		letter-spacing: 0.04em;
		color: #eef3ec;
		pointer-events: none;
	}

	.hud-row {
		display: flex;
		align-items: center;
		gap: 1.2cqw;
	}

	.hud-row.bottom {
		padding-right: 30cqw;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		padding: 0.45em 0.8em;
		border-radius: 0.5em;
		background: oklch(10% 0.02 150 / 0.55);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		white-space: nowrap;
	}

	.clock,
	.ms {
		margin-left: auto;
	}

	.rec i,
	.pulse {
		width: 0.65em;
		height: 0.65em;
		border-radius: 50%;
		background: var(--alert);
		animation: blink 1.4s steps(2, jump-none) infinite;
	}

	.pulse {
		background: var(--accent-amber);
		animation: pulse 1.2s ease-in-out infinite;
	}

	.status.sent {
		background: var(--primary);
		color: #fff;
	}

	.cells {
		display: inline-flex;
		gap: 0.3em;
	}

	.cells i {
		width: 0.75em;
		height: 0.75em;
		border-radius: 0.15em;
		background: oklch(100% 0 0 / 0.2);
		transition: background-color 0.25s var(--ease-out);
	}

	.cells i.on {
		background: var(--accent-amber);
	}

	@keyframes blink {
		50% {
			opacity: 0.2;
		}
	}

	@keyframes pulse {
		50% {
			transform: scale(0.6);
			opacity: 0.5;
		}
	}

	@media (max-width: 560px) {
		.controls {
			align-items: flex-start;
		}

		.tab {
			padding: 0.45rem 0.75rem;
			font-size: 0.78rem;
		}

		.cam,
		.ms {
			display: none;
		}

		.phone-wrap {
			width: 34%;
			right: -2%;
		}

		.hud-row.bottom {
			padding-right: 34cqw;
		}

		.frames {
			display: none;
		}
	}
</style>
