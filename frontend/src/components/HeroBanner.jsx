import { useState, useEffect } from 'react';

export default function HeroBanner({ products }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-rotate every 3 seconds
    useEffect(() => {
        if (!products || products.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [products]);

    if (!products || products.length === 0) {
        return (
            <div className="relative h-[320px] bg-gray-100">
                <img
                    src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1920&h=320&fit=crop&q=80"
                    alt="Delicious Cakes"
                    className="w-full h-full object-cover"
                />
            </div>
        );
    }

    return (
        <div className="relative h-[320px] bg-gray-100 overflow-hidden">
            {products.map((product, index) => (
                <div
                    key={product._id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
        </div>
    );
}
