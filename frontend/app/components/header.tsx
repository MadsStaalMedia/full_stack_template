export function Header() {
    return (
        <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-left z-10 h-16">

            <img src="/logo.svg" alt="Company logo" width={40} height={40} />
            <p className="text-xl font-semibold text-gray-900 ml-1">Persigt</p>

            <div className="ml-auto">
                <p className="text-xl text-gray-900">Din oversigt over personalet</p>
            </div>

        </header>
    );
}