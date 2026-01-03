import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

function Loading({ children }) {
	console.log('Loading');
	const ctx = useContext(UserContext);

	if (ctx.loading) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: 180,
				}}>
				<CircularProgress />
				<div style={{ marginTop: 12 }}>Cargando...</div>
			</div>
		);
	} else if (!ctx.user?.usuario) {
		return <div style={{ padding: 20, color: 'red', textAlign: 'center' }}>❌ Back End no accesible.</div>;
	}
	return <>{children}</>;
}

Loading.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Loading;
