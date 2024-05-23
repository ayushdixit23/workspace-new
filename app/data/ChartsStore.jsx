"use client"
import { useTheme } from 'next-themes';
import React from 'react';
import {
	Bar,
	BarChart,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';

const ChartsStore = ({ data }) => {
	const { theme } = useTheme()
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
					<Tooltip contentStyle={{
						backgroundColor: theme === "dark" ? "#273142" : "#f1f1f1",
						border: "none"
					}} cursor={{ fill: theme === "light" ? "#f8f9fc" : '#1B2431' }} />
					<Bar dataKey="Sales" fill="#5a6acf" />

				</BarChart>
			</ResponsiveContainer>
		</div>
	);
	
};

export default ChartsStore;
