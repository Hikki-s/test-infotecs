import React, { useState } from 'react';
import './UsersTable.css';

const UserDetailModal = ({ user, open, onClose }) => {
	if (!open) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<h2>Подробная информация о пользователе</h2>
				{user && (
					<>
						<p>ФИО: {`${user.firstName} ${user.lastName} ${user.maidenName}`}</p>
						<p>Возраст: {user.age}</p>
						<p>Рост: {user.height} см</p>
						<p>Вес: {user.weight} кг</p>
						<p>Телефон: {user.phone}</p>
						<p>Email: {user.email}</p>
						<p>Адрес: {`${user.address.city}, ${user.address.address}`}</p>
					</>
				)}
				<button onClick={onClose}>Закрыть</button>
			</div>
		</div>
	);
};

const UsersTable = ({ users }) => {
	const [selectedRows, setSelectedRows] = useState([]);
	const [sortConfig, setSortConfig] = useState([]);

	const getCombinedParameters = (users) => {
		return users.map(user => ({
			...user,
			fullName: `${user.firstName} ${user.lastName} ${user.maidenName}`,
			fullAddress: `${user.address.city}, ${user.address.address}`
		}));
	};

	const handleSort = (field) => {
		setSortConfig(prevConfig => {
			const existingIndex = prevConfig.findIndex(config => config.field === field);

			let newConfig = JSON.parse(JSON.stringify(prevConfig));

			if (existingIndex === -1) {
				newConfig.push({ field, direction: 'ascending' });
			} else {
				const currentDirection = newConfig[existingIndex].direction;

				if (currentDirection === 'ascending') {
					newConfig[existingIndex].direction = 'descending';
				} else if (currentDirection === 'descending') {
					newConfig.splice(existingIndex, 1);
				}
			}

			return newConfig;
		});
	};

	const sortedRows = React.useMemo(() => {
		let sortableRows = [...getCombinedParameters(users)];

		if (sortConfig.length) {
			sortableRows.sort((a, b) => {
				for (let config of sortConfig) {
					let aValue = a[config.field];
					let bValue = b[config.field];

					let comparison = 0;
					if (typeof aValue === 'string' && typeof bValue === 'string') {
						comparison = aValue.localeCompare(bValue);
					} else {
						comparison = aValue - bValue;
					}
					if (comparison !== 0) {
						return config.direction === 'ascending' ? comparison : -comparison;
					}
				}
				return 0;
			});
		}
		return sortableRows;
	}, [users, sortConfig]);

	const columns = [
		{ field: 'id', headerName: 'ID'},
		{ field: 'fullName', headerName: 'ФИО'},
		{ field: 'age', headerName: 'Возраст'},
		{ field: 'gender', headerName: 'Пол'},
		{ field: 'phone', headerName: 'Телефон', sortable: false },
		{ field: 'fullAddress', headerName: 'Адрес' },
	];

	const handleRowClick = (row) => {
		setSelectedRows([row]);
	};

	const handleModalClose = () => {
		setSelectedRows([]);
	};

	return (
	<div>
		<div className="users_table_container">
				<table className="table">
					<thead>
					<tr>
						{columns.map(col => (
							<th key={col.field} className="th" onClick={() => col.sortable !== false ? handleSort(col.field) : null}>
								<p>
									{col.headerName}
									{sortConfig.map(config => config.field === col.field && (config.direction === 'ascending' ? ' 🔼' : ' 🔽'))}
								</p>
							</th>
						))}
					</tr>
					</thead>
					<tbody>
					{sortedRows.map(row => (
						<tr key={row.id} onClick={() => handleRowClick(row)} className="tr">
							{columns.map(col => (
								<td key={col.field} className="td">{row[col.field]}</td>
							))}
						</tr>
					))}
					</tbody>
				</table>
			</div>
		<UserDetailModal user={selectedRows.length > 0 ? selectedRows[0] : null} open={selectedRows.length > 0} onClose={handleModalClose} />
	</div>
	);
};

export default UsersTable;