import React from 'react';

const MySelect = ({ options, value, onChange }) => {
	return (
		<select onChange={onChange} value={value}>
			<option value="">Фильтровать по</option>
			{options.map((option) => (
				<option key={option.id} value={option.id}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default MySelect;