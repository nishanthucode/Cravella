
export default function Stores() {
    const stores = [
        {
            city: 'Mumbai',
            address: '123 Bakery Street, Bandra West, Mumbai 400050',
            phone: '+91 98765 43210',
            hours: '9:00 AM - 10:00 PM'
        },
        {
            city: 'Delhi',
            address: '456 Sweet Lane, Connaught Place, New Delhi 110001',
            phone: '+91 98765 43211',
            hours: '9:00 AM - 10:00 PM'
        },
        {
            city: 'Bangalore',
            address: '789 Dessert Road, Indiranagar, Bangalore 560038',
            phone: '+91 98765 43212',
            hours: '10:00 AM - 11:00 PM'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8 text-gray-900">Our Stores</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stores.map((store, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">{store.city}</h2>
                        <div className="space-y-3 text-gray-600">
                            <p className="flex items-start gap-2">
                                <span className="font-semibold w-16">Address:</span>
                                <span>{store.address}</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="font-semibold w-16">Phone:</span>
                                <span>{store.phone}</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="font-semibold w-16">Hours:</span>
                                <span>{store.hours}</span>
                            </p>
                        </div>
                        <button className="mt-6 w-full py-2 border border-black rounded-lg hover:bg-black hover:text-white transition">
                            Get Directions
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
