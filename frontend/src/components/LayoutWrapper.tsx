
interface LayoutProps {
    children?: React.ReactNode
}


const LayoutWrapper = ({ children }: LayoutProps) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default LayoutWrapper