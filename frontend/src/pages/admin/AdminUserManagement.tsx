import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: string;
  department: string;
}

const AdminUserManagement = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
    password: "",
    role: "",
    department: "",
  })
  return (
    <div>AdminUserManagement</div>
  )
}

export default AdminUserManagement