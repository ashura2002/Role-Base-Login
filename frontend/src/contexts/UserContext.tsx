import React, { createContext } from "react";

export interface Users {
    _id: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    role: string;
    fullname: string;
}

interface UserContextType {
    users: Users[];
    setUsers: React.Dispatch<React.SetStateAction<Users[]>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)