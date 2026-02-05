
import Policy from '../components/Policy';

export default function Privacy() {
    const content = (
        <>
            <p>Last updated: February 2026</p>
            <p>Cravella respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>

            <h3 className="text-xl font-bold text-gray-800 mt-6">1. Information We Collect</h3>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows: Identity Data, Contact Data, Financial Data, and Transaction Data.</p>

            <h3 className="text-xl font-bold text-gray-800 mt-6">2. How We Use Your Data</h3>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to process your orders and manage our relationship with you.</p>
        </>
    );

    return <Policy title="Privacy Policy" content={content} />;
}
