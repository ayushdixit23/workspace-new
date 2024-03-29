"use client";
import React, { useState } from 'react';
import MembershipPopup from './MembershipPopup';
import { FaCrown } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { LoadThis } from '../redux/slice/userData';

const BlurredComponent = ({ width, height }) => {
	const [pop, setPop] = useState(false)
	const dispatch = useDispatch()
	return (
		<>
			{pop &&
				<div className='fixed inset-0 z-50 w-screen flex justify-center items-center bg-black/50 sm:h-screen'>
					<MembershipPopup setPop={setPop} />
				</div>
			}
			<div onClick={() => { setPop(true); dispatch(LoadThis(true)) }} className=" h-[100%] flex justify-center items-center z-40 w-full">
				<div className='w-full h-full flex flex-col justify-center items-center'>
					<div className="font-semibold">
						Buy Membership to Unlock this section
					</div>
					<FaCrown className='text-2xl' />
				</div>
			</div>

		</>
	);
};

export default BlurredComponent;
