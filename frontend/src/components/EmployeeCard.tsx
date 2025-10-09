interface EmployeeCardProps {
    role: string;
    email: string;
    firstName: string;
    lastName: string;
}

const EmployeeCard = ({ email, role, firstName, lastName }: EmployeeCardProps) => {
    return (
        <div
            className="bg-zinc-800 border border-gray-700 p-4 rounded-lg w-[300px]
      hover:border-gray-400 hover:shadow-md hover:shadow-gray-600 
      duration-300 transition ease-in-out text-gray-200"
        >
            <h1 className="font-medium">Fullname: {`${firstName} ${lastName}`}</h1>
            <h1>Email: {email}</h1>
            <h1>Role: {role}</h1>
        </div>
    );
};

export default EmployeeCard;
