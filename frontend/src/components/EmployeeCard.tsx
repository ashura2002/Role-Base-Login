

interface EmployeeCardProps {
    role: string;
    email: string;
    firstName: string;
    lastName: string;
}

const EmployeeCard = ({ email, role, firstName, lastName }: EmployeeCardProps) => {
    return (
        <div className="border border-gray-700 p-2 rounded-lg w-[300px] *:
        hover:border-gray-200 hover:shadow hover:shadow-gray-500 duration-300 transition ease-in-out ">
            <h1>Fullname: {`${firstName} ${lastName}`}</h1>
            <h1>Email: {email}</h1>
            <h1>Role: {role}</h1>
        </div>
    )
}

export default EmployeeCard