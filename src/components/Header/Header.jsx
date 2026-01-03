import PropTypes from 'prop-types';
import { useContext, useMemo } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import CRA from '../../public/assets/CRA.png';
import UserContext from '../../context/UserContext';
//import UserOptionsMenu from './UserOptionsMenu';
//import { parsePerms } from '../../services/utils/permissions.util';

const Header = ({ title = '', onAssign, onEdit }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const isTablet = useMediaQuery(theme.breakpoints.down('md'));

	const ctx = useContext(UserContext) ?? {};
	const user = ctx.user ?? ctx;
	const raw = ctx.rawPerms ?? ctx.perms ?? '';
	//	const permsSet = useMemo(() => parsePerms(raw), [raw]);

	//	const isAdmin = useMemo(() => permsSet.has('Y'), [permsSet]);

	const displayName = ctx.loading
		? 'Cargando...'
		: user?.nombreCompleto || user?.usuario || user?.USUARIO || 'Invitado';

	return (
		<Box
			sx={{
				background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
				color: '#fff',
				borderRadius: 0,
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				alignItems: 'center',
				justifyContent: 'space-between',
				px: { xs: 3, sm: 4, md: 6 },
				py: { xs: 2.5, sm: 2, md: 2.5 },
				mb: 0,
				gap: { xs: 2, sm: 3 },
				minHeight: { xs: 80, sm: 90, md: 100 },
				width: '100%',
				boxSizing: 'border-box',
				flexShrink: 0,
				boxShadow: '0 4px 20px rgba(46, 125, 50, 0.3)', // Sombra verde suave
				position: 'relative',
				overflow: 'hidden',

				// Efecto de brillo sutil
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: '2px',
					background:
						'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
				},
			}}
		>
			{/* Logo y título */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: { xs: 2.5, sm: 3, md: 4 },
					justifyContent: { xs: 'center', sm: 'flex-start' },
					zIndex: 2,
				}}
			>
				<Box
					sx={{
						p: 1,
						borderRadius: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',

						transition: 'all 0.3s ease',
					}}
				>
					<img
						src={CRA}
						alt='Caja Rural de Aragón'
						style={{
							height: isMobile ? 45 : isTablet ? 50 : 55,
							filter: 'brightness(0) invert(1)', // 👈 convierte el logo a blanco
							flexShrink: 0,
						}}
					/>
				</Box>

				<Typography
					variant='h4'
					sx={{
						fontWeight: 800,
						fontSize: { xs: '1.4rem', sm: '1.7rem', md: '2rem' },
						textAlign: { xs: 'center', sm: 'left' },
						lineHeight: 1.2,
						letterSpacing: '-0.02em',
						textShadow: '0 2px 4px rgba(0,0,0,0.2)',
						background: 'linear-gradient(45deg, #ffffff, #e8f5e8)',
						backgroundClip: 'text',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
					}}
				>
					{title}
				</Typography>
			</Box>

			{/* Usuario y opciones */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: { xs: 2, sm: 2.5, md: 3 },
					justifyContent: { xs: 'center', sm: 'flex-end' },
					flexShrink: 0,
					zIndex: 2,
				}}
			>
				<Box
					sx={{
						px: { xs: 2, sm: 3 },
						py: { xs: 1, sm: 1.5 },
						borderRadius: '25px',
						backgroundColor: 'rgba(255, 255, 255, 0.15)',
						backdropFilter: 'blur(10px)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						transition: 'all 0.3s ease',
						'&:hover': {
							backgroundColor: 'rgba(255, 255, 255, 0.2)',
						},
					}}
				>
					<Typography
						variant='h6'
						sx={{
							fontWeight: 600,
							fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
							textAlign: 'center',
							letterSpacing: '0.01em',
						}}
					>
						{ctx.loading ? 'Cargando...' : displayName}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

Header.propTypes = {
	title: PropTypes.string,
	onAssign: PropTypes.func,
	onEdit: PropTypes.func,
};

export default Header;
