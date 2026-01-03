import { useEffect, useMemo, useState } from 'react';
import UserContext from './UserContext.jsx';
import PropTypes from 'prop-types';
import api_usuario from '../services/api/api_usuarioService.js';
//import api_permisos from '../services/api/api_permisosService.js';
import { ACTIONS } from '../constants/permissions.js';
import { parsePerms, has } from '../services/utils/permissions.util.js';

function UserProvider({ children }) {
	const [state, setState] = useState({
		loading: true,
		user: null,
		rawPerms: '',
		perms: new Set(),
		isAdmin: false,
	});
	console.log('UserProvider');
	useEffect(() => {
		(async () => {
			try {
				const userObj = await api_usuario.getUsuarioActual();

				if (!userObj?.usuario)
					throw new Error('❌ No se pudo obtener el usuario');

				// 👇 ahora buscamos sus datos completos
				const userDetailsResp = await api_usuario.getUsuario(userObj.usuario);

				// 🎯 Acceder correctamente a los datos del usuario
				const userDetails = userDetailsResp?.data?.[0]; // 👈 primer objeto del array
				const ncompleto = userDetails?.NCOMPLETO || userObj.usuario;

				console.log('👤 Usuario obtenido en Context:', userObj.usuario);
				console.log('📋 Nombre completo en Context:', ncompleto);

				const perms = parsePerms(userObj.nivel_permiso);

				setState({
					loading: false,
					user: {
						...userObj,
						nombreCompleto: ncompleto, // 👈 usar el NCOMPLETO extraído
						codigoUsuario: userObj.usuario, // 👈 mantener el código original
						usuario: userDetails?.EMPLEADO || userObj.usuario,
						es_admin: userDetails?.ADMIN === 'Y',
					},
					rawPerms: userObj.nivel_permiso,
					perms,
					isAdmin: perms.has(ACTIONS.ADMIN),
				});

				console.log('✅ Estado del usuario actualizado:', {
					codigo: userObj.usuario,
					nombreCompleto: ncompleto,
					esAdmin: userDetails?.ADMIN === 'Y',
				});
			} catch (err) {
				console.error('❌ Error en UserProvider:', err);
				setState(s => ({ ...s, loading: false }));
			}
		})();
	}, []);

	const value = useMemo(
		() => ({
			loading: state.loading,
			user: state.user,
			rawPerms: state.rawPerms,
			perms: state.perms,
			isAdmin: state.isAdmin,
			canRead: () => has(state.perms, ACTIONS.READ),
			canWrite: () => has(state.perms, ACTIONS.WRITE),
			canDelete: () => has(state.perms, ACTIONS.DELETE),
			canAdmin: () => has(state.perms, ACTIONS.ADMIN),
		}),
		[state],
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
export default UserProvider;
