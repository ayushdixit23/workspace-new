"use client"
import { useTheme } from 'next-themes';
import React from 'react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';

const Charts = ({ data, uniqueMonths }) => {
	const { theme } = useTheme()
	function getDeviceWidth() {
		return window.screen.width;
	}

	const reversedData = data.reverse()

	const calculateYAxisDomain = (data) => {
		const allValues = data.reduce((acc, entry) => {
			const membersValue = parseInt(entry.members);
			const visitorsValue = parseInt(entry.visitors)

			if (!isNaN(membersValue)) {
				acc.push(membersValue);
			}

			if (!isNaN(visitorsValue)) {
				acc.push(visitorsValue);
			}

			return acc;
		}, []);

		const highestValue = Math.max(...allValues);

		return [0, parseInt(highestValue * 1.3)];
	};

	const months = uniqueMonths.reverse()

	return (
		<div className='w-full h-full'>
			<ResponsiveContainer width="100%" height={300}  >
				<BarChart className='w-full relative -left-9 sm:-left-7 top-3' width={730} height={250} data={reversedData}>
					<CartesianGrid strokeDasharray="3" vertical={false} />
					{getDeviceWidth() > 810 && < XAxis dataKey="X" className='text-xs' />}
					{getDeviceWidth() < 810 && <XAxis dataKey="X" className='text-xs' axisLine={false} tick={null} />}
					<YAxis axisLine={false} domain={calculateYAxisDomain(reversedData)} allowDecimals={false} fill="#000000" className='text-xs' />
					<Tooltip contentStyle={{
						backgroundColor: theme === "dark" ? "#273142" : "#f1f1f1",
						border: "none"
					}} cursor={{ fill: theme === "light" ? "#f8f9fc" : '#1B2431' }} />



					<Bar dataKey="members" fill="#40CAB0" />
					<Bar dataKey="visitors" fill="#7765d4" />
					<Bar dataKey="leave" fill="#ff718b" />
				</BarChart>
			</ResponsiveContainer>
			<div className="flex justify-center gap-2 text-sm items-center">
				{months.map((month, index) => (
					<React.Fragment key={index}>
						<div>{month}</div>
						{index !== months.length - 1 && <div className="separator">-</div>}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default Charts;