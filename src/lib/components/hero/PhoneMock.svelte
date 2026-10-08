<script>
	import BarnScene from './BarnScene.svelte';
	import Logo from '../Logo.svelte';
	import Icon from '../Icon.svelte';

	/**
	 * Telefoon met een Telegram-achtige chat. Bij fase 5 komt de melding binnen:
	 * eerst een pushbericht bovenin, daarna de foto en de videoclip in de chat.
	 */
	let {
		scene = 'heat',
		phase = 0,
		label = '',
		title = '',
		body = '',
		clock = '02:14',
		status = '',
		now = 'now',
		clip = 'Video clip'
	} = $props();

	const arrived = $derived(phase >= 5);
	const emoji = $derived(scene === 'heat' ? '🐄' : '🐮');
</script>

<div class="phone" class:arrived>
	<div class="device">
		<div class="screen">
			<div class="island"></div>

			<div class="statusbar">
				<span class="time">{clock}</span>
				<span class="sb-icons" aria-hidden="true">
					<svg viewBox="0 0 18 12"><path d="M1 11h2V8H1Zm4 0h2V6H5Zm4 0h2V4H9Zm4 0h2V1h-2Z" /></svg>
					<svg viewBox="0 0 26 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3" class="batt" /><rect x="2" y="2" width="16" height="8" rx="1.5" /><rect x="23.5" y="4" width="2" height="4" rx="1" /></svg>
				</span>
			</div>

			<div class="banner" class:show={arrived}>
				<Logo size={22} wordmark={false} />
				<div class="banner-text">
					<span class="banner-top"><b>CowCatcher AI</b><span>{now}</span></span>
					<span class="banner-msg">{emoji} {title}</span>
				</div>
			</div>

			<div class="chat-head">
				<Icon name="arrow-left" size={14} stroke={2} />
				<Logo size={24} wordmark={false} />
				<span class="who"><b>CowCatcher AI</b><small>bot</small></span>
			</div>

			<div class="chat">
				<span class="sys">{status}</span>

				<div class="bubble photo" class:show={arrived}>
					<div class="thumb">
						{#key scene}
							<BarnScene {scene} phase={5} {label} still />
						{/key}
					</div>
					<div class="msg">
						<b>{emoji} {title}</b>
						<p>{body}</p>
						<span class="meta">
							<span class="conf">{label}</span>
							<span>{clock} ✓✓</span>
						</span>
					</div>
				</div>

				<div class="bubble clip" class:show={arrived}>
					<span class="clip-thumb"><Icon name="play" size={12} /></span>
					<span>{clip} · 0:08</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.phone {
		container-type: inline-size;
	}

	.device {
		position: relative;
		aspect-ratio: 9 / 18.6;
		padding: 3.2cqw;
		border-radius: 15cqw;
		background: linear-gradient(160deg, #2c332e, #121612);
		box-shadow:
			inset 0 0 0 0.8cqw #3c453e,
			inset 0 0 0 1.4cqw #0c0f0c,
			0 2px 6px oklch(15% 0.03 150 / 0.3),
			0 30px 60px -18px oklch(15% 0.04 150 / 0.55);
	}

	.arrived .device {
		animation: buzz 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0.1s;
	}

	.screen {
		position: relative;
		height: 100%;
		overflow: hidden;
		border-radius: 12cqw;
		background: #e6ede4;
		display: flex;
		flex-direction: column;
		font-family: var(--font-body);
		color: #18201a;
	}

	.island {
		position: absolute;
		top: 2.6cqw;
		left: 50%;
		width: 28cqw;
		height: 7.5cqw;
		margin-left: -14cqw;
		border-radius: 10cqw;
		background: #0b0d0b;
		z-index: 3;
	}

	.statusbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 3.6cqw 8cqw 1.5cqw 10cqw;
		font-size: 4.6cqw;
		font-weight: 600;
		background: #f7faf6;
	}

	.sb-icons {
		display: inline-flex;
		gap: 1.6cqw;
	}

	.sb-icons svg {
		height: 3.6cqw;
		width: auto;
		fill: currentColor;
	}

	.sb-icons .batt {
		fill: none;
		stroke: currentColor;
		stroke-width: 1;
		opacity: 0.5;
	}

	.chat-head {
		display: flex;
		align-items: center;
		gap: 2.6cqw;
		padding: 2cqw 4cqw 3cqw;
		background: #f7faf6;
		border-bottom: 1px solid oklch(22% 0.02 145 / 0.08);
		color: var(--primary);
	}

	.who {
		display: flex;
		flex-direction: column;
		line-height: 1.15;
		color: #18201a;
	}

	.who b {
		font-size: 4.8cqw;
		font-weight: 600;
	}

	.who small {
		font-size: 3.8cqw;
		color: #6c7a6f;
	}

	.chat {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 2.4cqw;
		padding: 3cqw 3.4cqw 6cqw;
		background:
			radial-gradient(circle at 20% 20%, oklch(100% 0 0 / 0.5) 0 1px, transparent 1.5px) 0 0 / 9cqw 9cqw,
			linear-gradient(180deg, #dfe9dc, #cfdecb);
	}

	.sys {
		align-self: center;
		margin-bottom: auto;
		margin-top: 2cqw;
		padding: 1.2cqw 3cqw;
		border-radius: 10cqw;
		background: oklch(22% 0.03 150 / 0.35);
		color: #fff;
		font-size: 3.5cqw;
		text-align: center;
		line-height: 1.3;
	}

	.bubble {
		max-width: 92%;
		border-radius: 4.5cqw 4.5cqw 4.5cqw 1.2cqw;
		background: #fff;
		box-shadow: 0 1px 1px oklch(22% 0.03 150 / 0.12);
		opacity: 0;
		transform: translateY(8cqw) scale(0.94);
		transform-origin: bottom left;
		transition:
			opacity 0.4s var(--ease-out),
			transform 0.6s var(--ease-spring);
	}

	.bubble.show {
		opacity: 1;
		transform: none;
	}

	.photo.show {
		transition-delay: 0.45s;
	}

	.clip.show {
		transition-delay: 1.1s;
	}

	.photo {
		padding: 1.2cqw;
	}

	.thumb {
		aspect-ratio: 16 / 10;
		overflow: hidden;
		border-radius: 3.4cqw 3.4cqw 1.2cqw 1.2cqw;
		background: #222;
	}

	.msg {
		padding: 2cqw 2cqw 1cqw;
		line-height: 1.3;
	}

	.msg b {
		display: block;
		font-size: 4.6cqw;
		font-weight: 600;
	}

	.msg p {
		margin-top: 0.8cqw;
		font-size: 3.9cqw;
		color: #3c4a40;
	}

	.meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2cqw;
		margin-top: 1.8cqw;
		font-size: 3.3cqw;
		color: #6c7a6f;
	}

	.conf {
		padding: 0.4cqw 1.6cqw;
		border-radius: 1.2cqw;
		background: var(--amber-soft);
		color: var(--amber-ink);
		font-family: var(--font-mono);
		font-weight: 700;
		white-space: nowrap;
	}

	.clip {
		display: flex;
		align-items: center;
		gap: 2.4cqw;
		padding: 1.6cqw 3.4cqw 1.6cqw 1.6cqw;
		font-size: 3.8cqw;
		font-weight: 500;
	}

	.clip-thumb {
		display: grid;
		place-items: center;
		width: 11cqw;
		height: 11cqw;
		border-radius: 2.4cqw;
		background: var(--forest);
		color: #fff;
	}

	/* Pushmelding die even bovenin het scherm verschijnt. */
	.banner {
		position: absolute;
		top: 11cqw;
		left: 3cqw;
		right: 3cqw;
		z-index: 4;
		display: flex;
		align-items: center;
		gap: 2.6cqw;
		padding: 2.6cqw 3.2cqw;
		border-radius: 5cqw;
		background: oklch(99% 0.004 145 / 0.92);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		box-shadow: 0 6px 20px oklch(15% 0.04 150 / 0.25);
		opacity: 0;
		transform: translateY(-140%);
	}

	.banner.show {
		animation: banner 3.4s var(--ease-spring) forwards;
	}

	.banner-text {
		display: flex;
		flex-direction: column;
		min-width: 0;
		line-height: 1.25;
	}

	.banner-top {
		display: flex;
		justify-content: space-between;
		gap: 2cqw;
		font-size: 3.6cqw;
		color: #6c7a6f;
	}

	.banner-top b {
		color: #18201a;
		font-weight: 600;
	}

	.banner-msg {
		font-size: 4.2cqw;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@keyframes banner {
		0% {
			opacity: 0;
			transform: translateY(-140%);
		}
		14%,
		78% {
			opacity: 1;
			transform: none;
		}
		100% {
			opacity: 0;
			transform: translateY(-140%);
		}
	}

	@keyframes buzz {
		10%,
		90% {
			transform: translateX(-1px) rotate(-0.6deg);
		}
		20%,
		80% {
			transform: translateX(2px) rotate(0.8deg);
		}
		30%,
		50%,
		70% {
			transform: translateX(-3px) rotate(-1deg);
		}
		40%,
		60% {
			transform: translateX(3px) rotate(1deg);
		}
	}
</style>
