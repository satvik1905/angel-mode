import {Composition} from 'remotion';
import {MyComposition} from './Composition';
import './style.css';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="AngelModeIntro"
				component={MyComposition}
				durationInFrames={240}
				fps={60}
				width={1080}
				height={1920}
			/>
		</>
	);
};
