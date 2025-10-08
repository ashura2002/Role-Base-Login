import React, { createContext } from "react";

interface Approvers {
    approvers: string;
    _id: string;
    role: string;
    sequence: number;
    status: string;
}
export interface RequestFormInterface {
    CalculateDays: number;
    startDate: string;
    endDate: string;
    requestType: string;
    reason: string;
    overAllStatus: {
        status: string
    }
    approvals: Approvers[]
    _id: string;
}

interface FormRequestContextType {
    requests: RequestFormInterface[]
    setRequest: React.Dispatch<React.SetStateAction<RequestFormInterface[]>>
}

export const RequestContext = createContext<FormRequestContextType | undefined>(undefined)