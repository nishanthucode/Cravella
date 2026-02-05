import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiUpload, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Cakes',
        featured: 'false',
        variants: [{ name: '', price: '', stock: '', originalPrice: '' }]
    });
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Variant Change
    const handleVariantChange = (index, e) => {
        const newVariants = [...formData.variants];
        newVariants[index][e.target.name] = e.target.value;
        setFormData({ ...formData, variants: newVariants });
    };

    // Add Variant
    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { name: '', price: '', stock: '', originalPrice: '' }]
        });
    };

    // Remove Variant
    const removeVariant = (index) => {
        const newVariants = formData.variants.filter((_, i) => i !== index);
        setFormData({ ...formData, variants: newVariants });
    };

    // Handle Image Upload
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const urls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('featured', formData.featured);
        data.append('variants', JSON.stringify(formData.variants));

        images.forEach(image => {
            data.append('images', image);
        });

        try {
            await axios.post('/api/admin/products', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Product added successfully!');

            // Reset form
            setFormData({
                name: '',
                description: '',
                category: 'Cakes',
                featured: 'false',
                variants: [{ name: '', price: '', stock: '', originalPrice: '' }]
            });
            setImages([]);
            setPreviewUrls([]);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g. Chocolate Truffle Cake"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Product description..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="Cakes">Cakes</option>
                            <option value="Pastries">Pastries</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Snacks">Snacks</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Featured Product</label>
                        <select
                            name="featured"
                            value={formData.featured}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                </div>

                {/* Variants Section */}
                <div className="border-t border-gray-100 pt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Variants</h3>
                        <button
                            type="button"
                            onClick={addVariant}
                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            <FiPlus /> Add Variant
                        </button>
                    </div>

                    <div className="space-y-4">
                        {formData.variants.map((variant, index) => (
                            <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
                                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        value={variant.name}
                                        onChange={(e) => handleVariantChange(index, e)}
                                        placeholder="Variant Name (e.g. 1kg)"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        value={variant.price}
                                        onChange={(e) => handleVariantChange(index, e)}
                                        placeholder="Price (₹)"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        type="number"
                                        name="originalPrice"
                                        value={variant.originalPrice}
                                        onChange={(e) => handleVariantChange(index, e)}
                                        placeholder="Original Price (Optional)"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        type="number"
                                        name="stock"
                                        value={variant.stock}
                                        onChange={(e) => handleVariantChange(index, e)}
                                        placeholder="Stock Qty"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 outline-none"
                                    />
                                </div>
                                {formData.variants.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                                    >
                                        <FiTrash2 />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image Upload */}
                <div className="border-t border-gray-100 pt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                        <div className="space-y-1 text-center">
                            <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                    <span>Upload files</span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="sr-only"
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                    </div>

                    {/* Image Previews */}
                    {previewUrls.length > 0 && (
                        <div className="mt-4 grid grid-cols-4 gap-4">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                                    <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
                    >
                        {loading ? 'Creating Product...' : 'Create Product'}
                    </button>
                </div>

            </form>
        </div>
    );
}
