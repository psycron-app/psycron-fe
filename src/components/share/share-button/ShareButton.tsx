import ReactGA from 'react-ga4';
import { Box } from '@mui/material';
import { Share } from '@psycron/components/icons';
import { Tooltip } from '@psycron/components/tooltip/Tooltip';
import { useAlert } from '@psycron/context/alert/AlertContext';

export const ShareButton = () => {
	const { showAlert } = useAlert();

	const trackShareEvent = (method: string, errorMessage?: string) => {
		ReactGA.event({
			category: 'Engagement',
			action: 'Share',
			label: method,
			nonInteraction: false,
		});
		if (errorMessage) {
			ReactGA.event({
				category: 'Error',
				action: 'Share Failed',
				label: errorMessage,
				nonInteraction: true,
			});
		}
	};

	const handleShare = async () => {
		const shareData = {
			title: 'Meu App PWA',
			text: 'Dá uma olhada neste app incrível!',
			url: window.location.href,
		};

		if (navigator.share) {
			try {
				await navigator.share(shareData);
				trackShareEvent('native', 'sucesso');
				showAlert({
					message: 'Compartilhado com sucesso!',
					severity: 'success',
				});
			} catch (error) {
				trackShareEvent('native', 'erro');
				alert('Erro ao compartilhar.');
				showAlert({
					message: 'Erro ao compartilhar.',
					severity: 'error',
				});
			}
		} else {
			try {
				await navigator.clipboard.writeText(shareData.url);
				trackShareEvent('clipboard', 'copiado');
				alert('Link copiado para a área de transferência!');
			} catch (error) {
				trackShareEvent('clipboard', 'erro');
				alert('Erro ao copiar link.');
			}
		}
	};

	return (
		<Box>
			<Tooltip
				title='share with your patients'
				placement='left'
				onClick={handleShare}
			>
				<Share />
			</Tooltip>
		</Box>
	);
};
