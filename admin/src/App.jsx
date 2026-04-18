import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Package, Upload, X } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/products';

function App() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    reference: '',
    subtitle: '',
    category: 'Skull protection',
    description: '',
    price: 0
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        name: product.name,
        reference: product.reference,
        subtitle: product.subtitle,
        category: product.category,
        description: product.description || '',
        price: product.price || 0
      });
    } else {
      setCurrentProduct(null);
      setFormData({
        name: '',
        reference: '',
        subtitle: '',
        category: 'Skull protection',
        description: '',
        price: 0
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);

    try {
      if (currentProduct) {
        await axios.put(`${API_URL}/${currentProduct._id}`, data);
      } else {
        await axios.post(API_URL, data);
      }
      fetchProducts();
      setIsModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product", err);
      }
    }
  };

  return (
    <div className="admin-container">
      <header className="header">
        <div>
          <h1 style={{ margin: 0 }}>Product Inventory</h1>
          <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>Manage your catalog</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={20} /> Add Product
        </button>
      </header>

      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="card product-card">
            <img src={product.image_url} alt={product.name} className="product-img" />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{product.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {product.subtitle}
              </p>
              <div style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                <strong>Ref:</strong> {product.reference} | <strong>Cat:</strong> {product.category}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <button 
                className="btn" 
                style={{ background: '#f1f5f9', color: 'var(--text-main)', width: '100%', justifyContent: 'center' }}
                onClick={() => handleOpenModal(product)}
              >
                <Edit size={16} /> Edit
              </button>
              <button 
                className="btn btn-danger" 
                style={{ width: '40px', padding: '0.5rem', justifyContent: 'center' }}
                onClick={() => handleDelete(product._id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product Name</label>
                <input name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Reference</label>
                <input name="reference" value={formData.reference} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Subtitle</label>
                <input name="subtitle" value={formData.subtitle} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <option>Skull protection</option>
                  <option>Hearing protection</option>
                  <option>Protective eyewear</option>
                  <option>Respiratory protection</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" />
              </div>
              <div className="form-group">
                <label>Product Image</label>
                <div style={{ 
                  border: '2px dashed var(--border)', 
                  padding: '2rem', 
                  borderRadius: '0.5rem', 
                  textAlign: 'center',
                  background: '#f8fafc',
                  cursor: 'pointer'
                }} onClick={() => document.getElementById('fileInput').click()}>
                  <Upload size={32} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                    {imageFile ? imageFile.name : 'Click to upload image'}
                  </p>
                  <input id="fileInput" type="file" hidden onChange={handleFileChange} />
                </div>
              </div>
              
              <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Processing...' : (currentProduct ? 'Update Product' : 'Add Product')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
