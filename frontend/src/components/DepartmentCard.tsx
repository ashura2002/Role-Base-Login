import { Edit3Icon, Trash2Icon } from "lucide-react";
import type React from "react";


interface DepartmentProps {
    departmentName: string;
    descriptions: string;
    onDelete: () => void
    onEdit: () => void
}

const DepartmentCard: React.FC<DepartmentProps> = ({
    departmentName, descriptions, onDelete, onEdit
}) => {


    return (
        <div className="border border-gray-700 p-2 rounded-lg w-[300px] *:
        hover:border-gray-200 hover:shadow hover:shadow-gray-500 duration-300 transition ease-in-out ">
            <div className="flex items-center justify-between">
                <h1 className="font-medium text-2xl">{departmentName}</h1>
                <div className="flex items-center gap-2">
                    <Edit3Icon
                        onClick={onEdit}
                        className="size-5 text-gray-400 cursor-pointer" />

                    <Trash2Icon
                        onClick={onDelete}
                        className="size-5 text-gray-400 cursor-pointer" />
                </div>
            </div>

            <h1>{descriptions}</h1>
        </div>
    )
}

export default DepartmentCard