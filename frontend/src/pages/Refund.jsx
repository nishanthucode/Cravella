
import Policy from '../components/Policy';

export default function Refund() {
    const content = (
        <>
            <p>We want you to be completely satisfied with your purchase. However, since our products are perishable food items, we have specific guidelines for returns and refunds.</p>

            <h3 className="text-xl font-bold text-gray-800 mt-6">1. Damage or Issues</h3>
            <p>Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.</p>

            <h3 className="text-xl font-bold text-gray-800 mt-6">2. Refunds</h3>
            <p>For valid quality complaints reported within 24 hours of delivery, we will process a refund or send a replacement. Refunds will be automatically refunded on your original payment method.</p>
        </>
    );

    return <Policy title="Return & Refund Policy" content={content} />;
}
