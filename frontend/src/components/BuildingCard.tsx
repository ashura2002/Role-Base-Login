import React from 'react'
import type { Building } from '../pages/admin/AdminBuildinManagement'
import { Edit2Icon, Trash2Icon } from 'lucide-react'

interface BuildingProps extends Building {
    onShow: () => void
}

const BuildingCard: React.FC<BuildingProps> = ({ buildingName, onShow }) => {
    return (
        <div className='border border-gray-700
        hover:border-gray-200 transition ease-in-out duration-300 p-5 rounded-md flex flex-col gap-3'>
            <div className='flex  w-full items-center justify-end gap-2 cursor-pointer'>
                <Edit2Icon className='size-5' />
                <Trash2Icon className='size-5' onClick={onShow} />
            </div>
            <div>
                <h1 className='font-medium'>{buildingName}</h1>
            </div>
        </div>
    )
}

export default BuildingCard