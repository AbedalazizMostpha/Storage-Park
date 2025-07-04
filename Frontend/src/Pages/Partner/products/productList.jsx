import { useState, useEffect } from 'react';
import { usePartnerStore } from '../../../stores/usePartnerStore';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-hot-toast';
import axios from '../../../../lib/axios'
import { useUserStore } from '../../../stores/useUserStore';
const ProductList = () => {
const { user } = useUserStore();

const MySwal = withReactContent(Swal);

const handleSetDiscount = async (productId) => {
  const { value: discount } = await MySwal.fire({
    title: 'Set Discount (%)',
    input: 'number',
    inputLabel: 'Discount percentage (0-100)',
    inputAttributes: {
      min: 0,
      max: 100,
      step: 1
    },
    showCancelButton: true,
    confirmButtonText: 'Apply',
    confirmButtonColor: '#FF8B13',
    cancelButtonText: 'Cancel',
    inputValidator: (value) => {
      if (!value && value !== "0") {
        return 'Please enter a discount value';
      }
      if (value < 0 || value > 100) {
        return 'Discount must be between 0 and 100';
      }
    }
  });
  if (discount !== undefined) {
    try {
      await axios.put('/products/discount', { itemId: productId, discount: Number(discount) });
      usePartnerStore.setState((state) => ({
  partnerItems: state.partnerItems.map((p) =>
    p._id === productId ? { ...p, discount: Number(discount) } : p
  )
}));
    const product = usePartnerStore.getState().partnerItems.find(p => p._id === productId);
    await axios.post('/admins/logs', {
        action: "Set Discount",
        user: user?._id,
        role: user?.role,
        details: `Product: ${product?.productName}, Discount: ${discount}%`
      });
      toast.success("Discount updated!");
    } catch (error) {
      toast.error("Failed to update discount.");
    }
  }
};

  const partnerId = localStorage.getItem('partnerId');
  const { partnerItems, getPartnerItems, toggleProductStatus,loading } = usePartnerStore();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      await getPartnerItems(partnerId ?? null);
    };
    fetchData();
  }, []);

  // Filter products based on search query
  const filteredProducts = partnerItems.filter(product => 
    product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

    if (loading) {
    return <LoadingSpinner />
  }
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar /> */}
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-orange-500 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Product List</h1>
              <p className="text-sm opacity-90">Detailed information about your products</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 text-gray-900 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-white/70"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black/90 cursor-pointer"
                onClick={() => navigate('/partner/products/productForm')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Product
              </button>
            </div>
          </div>
        </div>

        {/* Tabs and Table */}
        <div className="p-6">
          {/* Table */}
          <div className="bg-white rounded-lg shadow">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Product name</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Brand</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Stock</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Units Sold</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Price</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Discount</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b last:border-b-0">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={product.imageProduct} alt={product.productName} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium text-gray-900">{product.productName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-500">{product.brand}</td>
                    <td className="py-4 px-6 text-gray-500">{product.quantity}</td>
                    <td className="py-4 px-6 text-gray-500">{product?.timesBought}</td>
<td className="py-4 px-6 text-gray-500">
  {product.discount && product.discount > 0 ? (
    <div>
      <span className="line-through text-gray-400 mr-2">${product.pricePerUnit.toFixed(2)}</span>
      <span className="text-green-600 font-bold">
        ${(product.pricePerUnit * (1 - product.discount / 100)).toFixed(2)}
      </span>
      <span className="ml-2 text-xs text-orange-500">-{product.discount}%</span>
    </div>
  ) : (
    <>${product.pricePerUnit.toFixed(2)}</>
  )}
</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleProductStatus(product._id)}
                        disabled={product.quantity === 0}
                        className={`w-12 h-6 rounded-full ${
                          product.quantity === 0 
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : product.isActive 
                              ? 'bg-orange-500' 
                              : 'bg-gray-200'
                        } relative transition-colors duration-300 ${product.quantity === 0 ? '' : 'cursor-pointer'}`}
                        title={product.quantity === 0 
                          ? "Cannot toggle: Product is out of stock" 
                          : product.isActive 
                            ? "Click to deactivate" 
                            : "Click to activate"}
                      >
                        <div 
                          className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all duration-300 shadow-sm ${
                            product.isActive ? 'left-6' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </td>
<td className="py-4 px-6">
  <button
    onClick={() => handleSetDiscount(product._id)}
    className="text-blue-500 hover:text-blue-700 cursor-pointer"
    title="Set Discount"
  >
    %
  </button>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;