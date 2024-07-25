import React from 'react';

const FilterInput = ({ value, onChange, disabled }) => {
	return (
		<input
			type="text"
			onChange={onChange}
			placeholder="Параметр"
			disabled={disabled}
			value={value}
			style={{ width: '100%', padding: '10px' }}
		/>
	);
};

export default FilterInput;