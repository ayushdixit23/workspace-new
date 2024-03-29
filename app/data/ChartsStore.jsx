"use client"
import React from 'react';
import {
	Bar,
	BarChart,

	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';

const ChartsStore = ({ data }) => {
	const reversedData = data.reverse()

	const calculateYAxisDomain = (data) => {
		const allValues = data.reduce((acc, entry) => {
			const membersValue = parseInt(entry.Sales);

			if (!isNaN(membersValue)) {
				acc.push(membersValue);
			}
			return acc;
		}, []);

		const highestValue = Math.max(...allValues);
		return [0, parseInt(highestValue * 2)];
	};
	return (
		<div>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart width={730} height={250} data={reversedData}>
					<XAxis dataKey="Dates" className='text-xs' />
					<YAxis domain={calculateYAxisDomain(reversedData)} className='text-xs' />
					<Tooltip cursor={{ fill: '#171717' }} />
					<Bar dataKey="Sales" fill="#5a6acf" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ChartsStore;
