
import Policy from '../components/Policy';

export default function Terms() {
    const content = (
        <>
            <p>Welcome to Cravella. By accessing this website we assume you accept these terms and conditions. Do not continue to use Cravella if you do not agree to take all of the terms and conditions stated on this page.</p>

            <h3 className="text-xl font-bold text-gray-800 mt-6">1. License</h3>
            <p>Unless otherwise stated, Cravella and/or its licensors own the intellectual property rights for all material on Cravella. All intellectual property rights are reserved.</p>

            <h3 className="text-xl font-bold text-gray-800 mt-6">2. Order Acceptance</h3>
            <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order.</p>
        </>
    );

    return <Policy title="Terms & Conditions" content={content} />;
}
