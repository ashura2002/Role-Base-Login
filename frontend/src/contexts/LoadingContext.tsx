import { createContext } from "react";

type LoadingContextType = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    isShowModal: boolean;
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
};
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
export default LoadingContext