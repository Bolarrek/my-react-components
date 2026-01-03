import PropTypes from 'prop-types';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const StyledMenu = styled(props => (
	<Menu
		elevation={0}
		anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 10,
		marginTop: theme.spacing(1),
		minWidth: 220,
		color: 'rgb(55,65,81)',
		// Aumentar z-index para asegurar que esté por encima de otros elementos
		zIndex: theme.zIndex.modal + 1,
		boxShadow:
			'rgb(255 255 255 / 0%) 0 0 0 0, rgb(0 0 0 / 5%) 0 0 0 1px, rgb(0 0 0 / 10%) 0 10px 15px -3px, rgb(0 0 0 / 5%) 0 4px 6px -2px',
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 20,
				marginRight: theme.spacing(1.5),
				color: theme.palette.text.secondary,
			},
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity,
				),
			},
		},
	},
}));

function UserOptionsMenu({ onAssign, onEdit }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const openMenu = e => setAnchorEl(e.currentTarget);
	const closeMenu = () => setAnchorEl(null);

	const handleAssign = () => {
		closeMenu();
		onAssign?.();
	};
	const handleEdit = () => {
		closeMenu();
		onEdit?.();
	};

	return (
		<div style={{ position: 'relative', zIndex: 1 }}>
			<Button
				variant='contained'
				color='inherit'
				onClick={openMenu}
				endIcon={<KeyboardArrowDownIcon />}
				sx={{
					color: '#2e7d32',
					fontWeight: 700,
					height: 36,
					borderRadius: 999,
					// Asegurar que el botón no interfiera
					position: 'relative',
					zIndex: 1,
				}}
			>
				Options
			</Button>

			<StyledMenu
				anchorEl={anchorEl}
				open={open}
				onClose={closeMenu}
				// Propiedades adicionales para mejorar el posicionamiento
				slotProps={{
					paper: {
						style: {
							zIndex: 1300, // Valor alto para estar por encima de otros elementos
						},
					},
				}}
			>
				<MenuItem onClick={handleAssign}>
					<PersonAddAltIcon />
					Asignar permiso a usuario
				</MenuItem>
				<MenuItem onClick={handleEdit}>
					<ManageAccountsIcon />
					Editar permiso usuario
				</MenuItem>
			</StyledMenu>
		</div>
	);
}

UserOptionsMenu.propTypes = {
	onAssign: PropTypes.func,
	onEdit: PropTypes.func,
};

export default UserOptionsMenu;
