import { useState } from 'react';
import ReactGA from 'react-ga4';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { EmailShareButton, WhatsappShareButton } from 'react-share';
import { Box } from '@mui/material';
import { Copy, Dots, Mail, Share, WhatsApp } from '@psycron/components/icons';
import { Tooltip } from '@psycron/components/tooltip/Tooltip';
import { useAlert } from '@psycron/context/alert/AlertContext';

import type { IShareButton } from './ShareButton.types';
import { ShareButtonsWrapper } from './ShareButtong.styles';

export const ShareButton = ({ titleKey, textKey, url }: IShareButton) => {
	const { t } = useTranslation();
	const { locale } = useParams<{ locale: string }>();

	const [openShareButton, setOpenShareButton] = useState<boolean>(false);

	const { showAlert } = useAlert();

	const link = `http://psycron.app/${locale}/${url}`;

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

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(link);
			trackShareEvent('copy', 'success');
			showAlert({
				message: t('components.share-button.alert.success-copy'),
				severity: 'success',
			});
		} catch (err) {
			trackShareEvent('copy', 'error');
			showAlert({
				message: t('components.share-button.alert.error-copy'),
				severity: 'error',
			});
		}
	};

	const handleNativeShare = async () => {
		const shareData = {
			title: titleKey,
			text: textKey,
			url: link ? link : window.location.href,
		};

		if (navigator.share) {
			try {
				await navigator.share(shareData);
				trackShareEvent('native', 'success');
				showAlert({
					message: t('components.share-button.alert.success'),
					severity: 'success',
				});
			} catch (error) {
				trackShareEvent('native', 'erro');
				showAlert({
					message: t('components.share-button.alert.error'),
					severity: 'error',
				});
			}
		} else {
			try {
				await navigator.clipboard.writeText(shareData.url);
				trackShareEvent('clipboard', 'copied');
				showAlert({
					message: t('components.share-button.alert.success-copy'),
					severity: 'success',
				});
			} catch (error) {
				trackShareEvent('clipboard', 'error-copy');
				showAlert({
					message: t('components.share-button.alert.error-copy'),
					severity: 'error',
				});
			}
		}
	};

	return (
		<Box>
			<Tooltip
				title={t('components.share-button.tooltip-tile', {
					with: t('components.share-button.share-with-patients'),
				})}
				placement='left'
				onClick={() => setOpenShareButton((prev) => !prev)}
			>
				<Share />
			</Tooltip>
			{openShareButton ? (
				<ShareButtonsWrapper>
					<WhatsappShareButton url={link} title={titleKey}>
						<Tooltip title='Whatsapp'>
							<WhatsApp />
						</Tooltip>
					</WhatsappShareButton>
					<EmailShareButton url={link} subject={titleKey} body={textKey}>
						<Tooltip title='Email'>
							<Mail />
						</Tooltip>
					</EmailShareButton>
					<Tooltip title='Copy' onClick={handleCopy}>
						<Copy />
					</Tooltip>
					<Tooltip title='More' onClick={handleNativeShare}>
						<Dots />
					</Tooltip>
				</ShareButtonsWrapper>
			) : null}
		</Box>
	);
};
