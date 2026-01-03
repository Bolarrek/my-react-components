// import React from 'react';
import { APP_TITLE } from '../../config/apiConfig.jsx';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const Footer = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Box
			component='footer'
			sx={{
				mt: 0,
				py: { xs: 2, sm: 2.5 },
				px: { xs: 3, sm: 4, md: 6 },
				textAlign: 'center',
				background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)', // Mismo gradiente que header
				color: 'common.white',
				borderRadius: 0,
				width: '100%',
				boxSizing: 'border-box',
				flexShrink: 0,
				boxShadow: '0 -4px 20px rgba(46, 125, 50, 0.3)', // Sombra hacia arriba
				position: 'relative',
				overflow: 'hidden',

				// Efecto de brillo sutil en la parte superior
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: '2px',
					background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
				},
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 1,
					zIndex: 2,
					position: 'relative',
				}}
			>
				<Typography
					variant='body2'
					sx={{
						fontSize: { xs: '0.8rem', sm: '0.9rem' },
						lineHeight: { xs: 1.4, sm: 1.5 },
						wordBreak: 'break-word',
						hyphens: 'auto',
						fontWeight: 500,
						letterSpacing: '0.02em',
						textShadow: '0 1px 2px rgba(0,0,0,0.2)',
					}}
				>
					© {new Date().getFullYear()} Caja Rural de Aragón
					{isMobile ? (
						<>
							<br />
							<Box
								component='span'
								sx={{
									fontSize: '0.75rem',
									opacity: 0.9,
									fontWeight: 400,
								}}
							>
								{APP_TITLE}
							</Box>
						</>
					) : (
						<>
							{' · '}
							<Box
								component='span'
								sx={{
									fontSize: '0.85rem',
									opacity: 0.9,
									fontWeight: 400,
								}}
							>
								{APP_TITLE}
							</Box>
						</>
					)}
				</Typography>

				{/* Línea decorativa opcional */}
				<Box
					sx={{
						width: { xs: 60, sm: 80 },
						height: 2,
						background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
						borderRadius: 1,
						mt: 0.5,
					}}
				/>
			</Box>
		</Box>
	);
};

export default Footer;
