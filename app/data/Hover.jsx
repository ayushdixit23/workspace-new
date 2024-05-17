import React from 'react'
import { FcInfo } from 'react-icons/fc'

const Hover = ({ text, para, mobile = "-left-[80px]", pc, w1 = "w-[250px]", w2 }) => {
	return (
		<div className='flex items-center gap-1'>
			<div>{text}</div>
			<div className="relative group cursor-pointer inline-block"><FcInfo />
				<div className={`hidden group-hover:block text-[14px] shadow-lg ${w1} ${w2} ${mobile} ${pc} font-semibold absolute top-0 z-10 mt-[20px] dark:bg-[#323d4e] bg-white text-black dark:text-white opacity-0 group-hover:opacity-100 transition p-3 rounded-lg`}>
					{para}
				</div>
			</div>
		</div>
	)
}

export default Hover