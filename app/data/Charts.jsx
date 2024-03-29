"use client"
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

const Charts = ({ data }) => {
	console.log(data, "ds")
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

	return (
		<div className='w-full h-full z-10'>
			<ResponsiveContainer width="100%" height={300}  >
				<BarChart className='w-full relative -left-9 sm:-left-7 top-3' width={730} height={250} data={reversedData}>
					<CartesianGrid strokeDasharray="3" vertical={false} />
					{getDeviceWidth() > 810 && < XAxis dataKey="X" className='text-xs' />}
					{getDeviceWidth() < 810 && <XAxis dataKey="X" className='text-xs' axisLine={false} tick={null} />}
					<YAxis axisLine={false} domain={calculateYAxisDomain(reversedData)} allowDecimals={false} fill="#000000" className='text-xs' />
					<Tooltip cursor={{ fill: '#f7f7f7' }} />
					<Bar dataKey="members" fill="#40CAB0" />
					<Bar dataKey="visitors" fill="#7765d4" />
					<Bar dataKey="leave" fill="#ff718b" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Charts;