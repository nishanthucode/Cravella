
export default function Policy({ title, content }) {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">{title}</h1>
            <div className="prose max-w-none text-gray-600 space-y-6">
                {content}
            </div>
        </div>
    );
}
