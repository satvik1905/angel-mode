import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile} from 'remotion';

export const myCompSchema = undefined;

export const MyComposition: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Spring entrance: frames 0–30
	const springScale = spring({
		frame,
		fps,
		from: 0.5,
		to: 1.0,
		config: {stiffness: 180, damping: 28},
	});

	// Breathing pulse: 1.0 → 1.08, starts at 1.0 when frame === 30
	// cos(0) = 1 → 1 - cos(0) = 0, so scale starts at 1.0 with no jump
	const breathPeriod = 75; // 2.5s at 30fps
	const pulseScale = 1.0 + 0.04 * (1 - Math.cos(((frame - 30) / breathPeriod) * 2 * Math.PI));

	// Blend from spring → pulse between frames 25–40 for a smooth handoff
	const blend = interpolate(frame, [25, 40], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const logoScale = springScale * (1 - blend) + pulseScale * blend;

	// Text appears around frame 45: slide up + fade in
	const textOpacity = interpolate(frame, [45, 65], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const textY = interpolate(frame, [45, 65], [20, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{backgroundColor: '#000000'}}
			className="items-center justify-center"
		>
			{/* Logo */}
			<div style={{transform: `scale(${logoScale})`}}>
				<Img src={staticFile('Avatar.svg')} width={380} height={380} />
			</div>

			{/* Text */}
			<div
				style={{
					opacity: textOpacity,
					transform: `translateY(${textY}px)`,
					color: '#F5F5F5',
				}}
				className="text-8xl font-bold tracking-tighter mt-4"
			>
				Angel Mode
			</div>
		</AbsoluteFill>
	);
};
