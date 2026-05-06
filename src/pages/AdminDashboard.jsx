import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Package, Upload, X, LogOut, ShoppingBag, Users as UsersIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/AppLayout';
import API_BASE from '../config/api';
import '../admin.css';

import { CATEGORY_STRUCTURE } from '../data/categories';

const API_URL = `${API_BASE}/api/products`;

function AdminDashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('inventory');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    reference: '',
    subtitle: '',
    category: Object.keys(CATEGORY_STRUCTURE)[0],
    subCategory: CATEGORY_STRUCTURE[Object.keys(CATEGORY_STRUCTURE)[0]].subCategories[0],
    description: '',
    price: 0,
    itemCode: '',
    color: '',
    hsnCode: '',
    gstPercentage: 18,
    dealerPrice: 0,
    mrp: 0,
    stock: 0
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Pagination and Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 500); // Debounce search

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedCategory, currentPage]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}?limit=${itemsPerPage}&page=${currentPage}&search=${searchQuery}&category=${selectedCategory === 'All Products' ? '' : selectedCategory}`);
      setProducts(res.data.products || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalProducts(res.data.totalProducts || 0);
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/orders/all`);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        name: product.name,
        reference: product.reference,
        subtitle: product.subtitle,
        category: product.category || Object.keys(CATEGORY_STRUCTURE)[0],
        subCategory: product.subCategory || CATEGORY_STRUCTURE[product.category || Object.keys(CATEGORY_STRUCTURE)[0]].subCategories[0],
        description: product.description || '',
        price: product.price || 0,
        itemCode: product.itemCode || '',
        color: product.color || '',
        hsnCode: product.hsnCode || '',
        gstPercentage: product.gstPercentage || 18,
        dealerPrice: product.dealerPrice || 0,
        mrp: product.mrp || 0,
        stock: product.stock || 0
      });
    } else {
      const defaultCat = Object.keys(CATEGORY_STRUCTURE)[0];
      setCurrentProduct(null);
      setFormData({
        name: '',
        reference: '',
        subtitle: '',
        category: defaultCat,
        subCategory: CATEGORY_STRUCTURE[defaultCat].subCategories[0],
        description: '',
        price: 0,
        itemCode: '',
        color: '',
        hsnCode: '',
        gstPercentage: 18,
        dealerPrice: 0,
        mrp: 0,
        stock: 0
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      // Reset subCategory when category changes
      setFormData({ 
        ...formData, 
        category: value, 
        subCategory: CATEGORY_STRUCTURE[value].subCategories[0] 
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
    <AppLayout isAdmin={true}>
      <div className="admin-body">
          <div className="admin-container">
            <header className="admin-header">
              <div>
                <h1 style={{ margin: 0, color: '#1e293b' }}>
                  {activeTab === 'inventory' ? 'Inventory Management' : 'Sales & Orders'}
                </h1>
                <p style={{ color: '#64748b', margin: '0.25rem 0 0 0' }}>
                  {activeTab === 'inventory' ? 'Manage your product catalog' : 'Track customer purchases'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  className={`admin-btn ${activeTab === 'inventory' ? 'admin-btn-primary' : ''}`} 
                  onClick={() => setActiveTab('inventory')}
                  style={{ background: activeTab === 'inventory' ? '' : '#f1f5f9' }}
                >
                  <Package size={20} /> Inventory
                </button>
                <button 
                  className={`admin-btn ${activeTab === 'orders' ? 'admin-btn-primary' : ''}`} 
                  onClick={() => setActiveTab('orders')}
                  style={{ background: activeTab === 'orders' ? '' : '#f1f5f9' }}
                >
                  <ShoppingBag size={20} /> Orders
                </button>
                <button 
                  className={`admin-btn ${activeTab === 'audit' ? 'admin-btn-primary' : ''}`} 
                  onClick={() => setActiveTab('audit')}
                  style={{ background: activeTab === 'audit' ? '' : '#f1f5f9' }}
                >
                  <Package size={20} /> Price List Audit
                </button>
              </div>
            </header>

            {activeTab === 'inventory' && (
              <div style={{ 
                marginBottom: '2rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap',
                background: 'white',
                padding: '1.5rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
              }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                  <input 
                    type="text" 
                    placeholder="Search by name, ref, or description..." 
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    style={{ 
                      width: '100%', 
                      padding: '0.85rem 1rem 0.85rem 3rem', 
                      borderRadius: '0.75rem', 
                      border: '1px solid #e2e8f0',
                      outline: 'none',
                      fontSize: '0.95rem'
                    }}
                  />
                  <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                  </div>
                </div>

                <div style={{ minWidth: '200px' }}>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                    style={{ 
                      width: '100%', 
                      padding: '0.85rem 1rem', 
                      borderRadius: '0.75rem', 
                      border: '1px solid #e2e8f0',
                      outline: 'none',
                      fontSize: '0.95rem',
                      background: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="All Products">All Categories</option>
                    {Object.keys(CATEGORY_STRUCTURE).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>
                    {totalProducts} Products Found
                  </span>
                  <button className="admin-btn admin-btn-primary" onClick={() => handleOpenModal()}>
                    <Plus size={20} /> Add Product
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'inventory' ? (
              <>
                <div className="admin-product-grid">
                  {products.map(product => (
                    <div key={product._id} className="admin-card admin-product-card">
                      <img src={product.image_url} alt={product.name} className="admin-product-img" />
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>{product.name}</h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                          {product.subtitle}
                        </p>
                        <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#475569', wordBreak: 'break-all' }}>
                          <strong>Ref:</strong> {product.reference} | <strong>Code:</strong> <span style={{ color: '#b23a86', fontWeight: '700' }}>{product.itemCode || 'N/A'}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '1rem' }}>
                          <div><strong>HSN:</strong> {product.hsnCode || '-'}</div>
                          <div><strong>GST:</strong> {product.gstPercentage}%</div>
                          <div><strong>Dealer:</strong> ₹{product.dealerPrice || 0}</div>
                          <div><strong>MRP:</strong> ₹{product.mrp || 0}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                        <button 
                          className="admin-btn" 
                          style={{ background: '#f1f5f9', color: '#1e293b', width: '100%', justifyContent: 'center' }}
                          onClick={() => handleOpenModal(product)}
                        >
                          <Edit size={16} /> Edit
                        </button>
                        <button 
                          className="admin-btn admin-btn-danger" 
                          style={{ width: '40px', padding: '0.5rem', justifyContent: 'center' }}
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div style={{ 
                    marginTop: '3rem', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '1.5rem',
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                  }}>
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className="admin-btn"
                      style={{ background: currentPage === 1 ? '#f1f5f9' : '#fff', border: '1px solid #e2e8f0', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                    >
                      Previous
                    </button>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {[...Array(totalPages)].map((_, i) => (
                        <button 
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '0.5rem', 
                            border: 'none',
                            fontWeight: '700',
                            cursor: 'pointer',
                            background: currentPage === i + 1 ? '#b23a86' : '#f1f5f9',
                            color: currentPage === i + 1 ? '#fff' : '#475569',
                            transition: 'all 0.2s'
                          }}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className="admin-btn"
                      style={{ background: currentPage === totalPages ? '#f1f5f9' : '#fff', border: '1px solid #e2e8f0', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : activeTab === 'audit' ? (
              <div className="admin-audit-section">
                <div className="admin-card" style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div>
                            <h2 style={{ margin: 0 }}>Delta Plus Price List Audit (2026)</h2>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Tracking products across database vs. official catalog.</p>
                        </div>
                        <button 
                            className="admin-btn admin-btn-primary"
                            onClick={() => {
                                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
                                    missing: ["RIMFIPO", "RIMFIMI", "PACAYLVFU", "PACAYLVIN", "PACAYBLIN", "PACAYNOFU", "PACAYSTIN", "PACAYSTFU", "PACAYLVSTIN", "HELI2DE", "FUJI2NDIN", "FUJI2NDOR", "MEIAIN", "MEIAFU", "MILOIN", "MILOFU", "BRAV2IN", "BRAV2FU", "BRAV2INAB", "KILIMGRIN", "KILIMNOFU100", "KILIMGRINAB", "LIPA2BLIN", "LIPA2T5", "PITO2IN", "LUCERNEIN100", "ASO2IN", "ASO2FU", "IRAZUIN", "GALERVI", "RUIZ1VI", "EGONGRIN", "EGONGRFU", "FILMG", "HARUNIN", "HEKL2IN", "COLTAAINOMI", "COLTAAIGRMI", "COLTAAINOSH", "COLTAAIBMSH", "COLTAAIBM", "COLTAAIJAFL", "FUEGOARIN", "HARNE4"],
                                    timestamp: new Date().toISOString()
                                }, null, 4));
                                const downloadAnchorNode = document.createElement('a');
                                downloadAnchorNode.setAttribute("href", dataStr);
                                downloadAnchorNode.setAttribute("download", "missing_products_report.json");
                                document.body.appendChild(downloadAnchorNode);
                                downloadAnchorNode.click();
                                downloadAnchorNode.remove();
                            }}
                        >
                            Export Missing List
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#1e293b' }}>50</div>
                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total in Price List</div>
                        </div>
                        <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#16a34a' }}>6</div>
                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Found in Database</div>
                        </div>
                        <div style={{ background: '#fef2f2', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#dc2626' }}>44</div>
                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Missing / Pending</div>
                        </div>
                    </div>

                    <h3 style={{ marginBottom: '1rem' }}>Missing Items (Eye & Head Protection)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                        {["RIMFIPO", "RIMFIMI", "PACAYLVFU", "PACAYLVIN", "PACAYBLIN", "PACAYNOFU", "PACAYSTIN", "PACAYSTFU", "PACAYLVSTIN", "HELI2DE", "FUJI2NDIN", "FUJI2NDOR", "MEIAIN", "MEIAFU", "MILOIN", "MILOFU", "BRAV2IN", "BRAV2FU", "BRAV2INAB", "KILIMGRIN", "KILIMNOFU100", "KILIMGRINAB", "LIPA2BLIN", "LIPA2T5", "PITO2IN", "LUCERNEIN100", "ASO2IN", "ASO2FU", "IRAZUIN", "GALERVI", "RUIZ1VI", "EGONGRIN", "EGONGRFU", "FILMG", "HARUNIN", "HEKL2IN", "COLTAAINOMI", "COLTAAIGRMI", "COLTAAINOSH", "COLTAAIBMSH", "COLTAAIBM", "COLTAAIJAFL", "FUEGOARIN", "HARNE4"].map(code => (
                            <div key={code} style={{ background: '#fff', border: '1px solid #f1f5f9', padding: '1rem', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#b23a86' }}>{code}</span>
                                <span style={{ fontSize: '0.7rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', fontWeight: '600' }}>PENDING</span>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            ) : (
              <div className="admin-order-list">
                {orders.length === 0 ? (
                    <div className="admin-card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <ShoppingBag size={48} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                        <p style={{ color: '#64748b', fontWeight: '500' }}>No orders found yet.</p>
                    </div>
                ) : orders.map(order => (
                  <div key={order._id} className="admin-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #2563eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ margin: 0 }}>Order #{order._id.slice(-6).toUpperCase()}</h3>
                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span style={{ 
                        padding: '0.35rem 0.75rem', 
                        borderRadius: '2rem', 
                        fontSize: '0.75rem', 
                        fontWeight: '700',
                        background: '#eff6ff',
                        color: '#2563eb'
                      }}>
                        {order.status}
                      </span>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <UsersIcon size={20} color="#475569" />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: '700', fontSize: '0.95rem' }}>{order.user?.name}</p>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{order.user?.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="order-items">
                      {order.items.map(item => (
                        <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                          <span>{item.product?.name || 'Unknown Product'} x {item.quantity}</span>
                          <span style={{ fontWeight: '600' }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px dashed #f1f5f9' }}>
                      <span style={{ fontWeight: '800' }}>Total Amount</span>
                      <span style={{ fontWeight: '800', color: '#2563eb', fontSize: '1.25rem' }}>₹{order.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#1e293b' }}>{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Product Name</label>
                <input name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="admin-form-group">
                <label>Reference</label>
                <input name="reference" value={formData.reference} onChange={handleInputChange} required />
              </div>
              <div className="admin-form-group">
                <label>Subtitle</label>
                <input name="subtitle" value={formData.subtitle} onChange={handleInputChange} required />
              </div>
              <div className="admin-form-group">
                <label>Main Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  {Object.keys(CATEGORY_STRUCTURE).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group">
                  <label>Item Code (Price List Code)</label>
                  <input name="itemCode" value={formData.itemCode} onChange={handleInputChange} placeholder="e.g. RIMFIPO" />
                </div>
                <div className="admin-form-group">
                  <label>Color</label>
                  <input name="color" value={formData.color} onChange={handleInputChange} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group">
                  <label>HSN Code</label>
                  <input name="hsnCode" value={formData.hsnCode} onChange={handleInputChange} />
                </div>
                <div className="admin-form-group">
                  <label>GST %</label>
                  <input type="number" name="gstPercentage" value={formData.gstPercentage} onChange={handleInputChange} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group">
                  <label>Dealer Price</label>
                  <input type="number" name="dealerPrice" value={formData.dealerPrice} onChange={handleInputChange} />
                </div>
                <div className="admin-form-group">
                  <label>MRP</label>
                  <input type="number" name="mrp" value={formData.mrp} onChange={handleInputChange} />
                </div>
                <div className="admin-form-group">
                  <label>Stock Qty</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Sub Category</label>
                <select name="subCategory" value={formData.subCategory} onChange={handleInputChange}>
                  {CATEGORY_STRUCTURE[formData.category].subCategories.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
              <div className="admin-form-group">
                <label>Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" />
              </div>
              <div className="admin-form-group">
                <label>Product Image</label>
                <div style={{ 
                  border: '2px dashed #e2e8f0', 
                  padding: '2rem', 
                  borderRadius: '0.5rem', 
                  textAlign: 'center',
                  background: '#f8fafc',
                  cursor: 'pointer'
                }} onClick={() => document.getElementById('fileInput').click()}>
                  <Upload size={32} style={{ color: '#64748b', marginBottom: '0.5rem' }} />
                  <p style={{ margin: 0, color: '#64748b' }}>
                    {imageFile ? imageFile.name : 'Click to upload image'}
                  </p>
                  <input id="fileInput" type="file" hidden onChange={handleFileChange} />
                </div>
              </div>
              
              <button className="admin-btn admin-btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Processing...' : (currentProduct ? 'Update Product' : 'Add Product')}
              </button>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

export default AdminDashboard;
