import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Selected = ({ state, setState, data }) => {
	return (
		<div className="">
			<Select
				className="dark:text-white dark:bg-[#323b4e] dark:border-none "
				// defaultValue={state.name}

				onValueChange={(selectedValue) => {
					const selectedData = data.find(
						(item) => item.id === selectedValue
					);
					if (selectedData) {
						setState({
							id: selectedData.id,
							topics: selectedData.topics,
							dp: selectedData.dps,
							name: selectedData.name,
							engagementrate: selectedData.engagementrate,
							members: selectedData.members,
							category: selectedData.category,
							desc: selectedData.desc,
							topic: selectedData.topic || [],
							ismonetized: selectedData.ismonetized,
							type: selectedData.type || "",
							status: selectedData.monstatus || "",
							reason: selectedData.reason || "",
							earnings: selectedData.topic.reduce((total, item) => total + (item.earnings || 0), 0),
							reapplydate: selectedData.reapplydate || "",
						});
					}
				}}

			>
				<SelectTrigger className="w-[150px] dark:text-white dark:bg-[#323b4e] dark:border-none ">
					<SelectValue
						// placeholder={state.name}
						placeholder={
							<div className="flex justify-center gap-2 items-center w-full">
								<div>
									<img
										src={state?.dp}
										className="max-w-[30px] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
										alt="image"
									/>
								</div>
								<div className="flex flex-col">
									<div className="text-xs">{state?.name?.length > 8 ? `${state?.name?.slice(0, 8)}...` : state?.name}</div>
								</div>
							</div>
						}
						className="dark:text-white dark:bg-[#323b4e] dark:border-none "
					/>
				</SelectTrigger>
				<SelectContent className="dark:text-white dark:bg-[#323b4e] dark:border-none ">
					<SelectGroup className="max-h-[200px] gap-1 w-full flex flex-col justify-center items-center">
						{data?.map((d, i) => (
							<SelectItem
								value={
									`${d?.id}`
								}
								key={i}
								className=" "
							>

								<div className="flex justify-center gap-2 items-center w-full">
									<div>
										<img
											src={d?.dps}
											className="max-w-[30px] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
											alt="image"
										/>
									</div>
									<div className="flex flex-col">
										<div className="text-xs">{d?.name?.length > 8 ? `${d?.name?.slice(0, 8)}...` : d?.name}</div>
									</div>
								</div>

							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>

		</div>
	)
}

export default Selected