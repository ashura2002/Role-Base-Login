
interface LayoutProps {
    children?: React.ReactNode
}


const LayoutWrapper = ({ children }: LayoutProps) => {
    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {children}
            </div>
        </div>
    )
}

export default LayoutWrapper