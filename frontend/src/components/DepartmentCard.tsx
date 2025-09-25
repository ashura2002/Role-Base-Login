

interface DepartmentProps {
    departmentName: string;
    descriptions: string;
}

const DepartmentCard = ({ departmentName, descriptions }: DepartmentProps) => {
    return (
        <div className="border border-gray-700 p-2 rounded-lg w-[300px] *:
        hover:border-gray-200 hover:shadow hover:shadow-gray-500 duration-300 transition ease-in-out ">
            <h1 className="font-medium text-2xl">{departmentName}</h1>
            <h1>{descriptions}</h1>
        </div>
    )
}

export default DepartmentCard