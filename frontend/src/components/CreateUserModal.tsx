




const CreateUserModal = () => {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
                <form className="space-y-3">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"

                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"

                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"

                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"

                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"

                        className="w-full border p-2 rounded"
                        required
                    />
                    <select
                        name="role"

                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>
                    <input
                        type="text"
                        name="department"
                        placeholder="Department"

                        className="w-full border p-2 rounded"
                        required
                    />

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"

                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUserModal