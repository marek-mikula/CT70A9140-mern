function Spinner() {
    return (
        <div className="flex items-center justify-center" role="status">
            <div className="relative w-10 h-10">
                <div className="w-full h-full rounded-full border-[3px] border-gray-100"></div>
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-[3px] border-transparent border-t-gray-900 border-r-gray-900/30 animate-spin"></div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
