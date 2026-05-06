import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, Footer, Features } from './components/Common';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { fetchProducts, Product } from './data/products';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const loadProducts = async (silent = false) => {
    if (!silent) setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    // Initial load
    loadProducts();

    // Set up auto-refresh every 5 minutes
    const interval = setInterval(() => {
      console.log('Auto-refreshing data from Google Sheet...');
      loadProducts(true); // Silent refresh
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleHomeClick = () => {
    setActiveCategory('Tất cả');
    loadProducts();
  };

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['Tất cả', ...Array.from(cats).sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== 'Tất cả') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery, products]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onHomeClick={handleHomeClick} onSearch={setSearchQuery} />
      
      <main className="flex-1 pt-16">
        <Hero />
        
        {/* Catalog Section */}
        <section id="catalog" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Danh Mục Sản Phẩm 
                  <span className="ml-3 inline-block align-middle text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                    {filteredProducts.length}
                  </span>
                </h2>
                <p className="mt-2 text-gray-600">Săn tìm những món hời nhất được chia theo danh mục</p>
              </div>
              
              {/* Category Filter */}
              <div className="flex w-full flex-nowrap items-center gap-2 overflow-x-auto pb-4 scrollbar-hide md:w-auto md:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all active:scale-95 ${
                      activeCategory === category
                        ? 'bg-shopee text-white shadow-md shadow-orange-100'
                        : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-shopee border border-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-shopee border-t-transparent" />
                  <p className="font-medium text-gray-500">Đang cập nhật deal ngon...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                {filteredProducts.length === 0 && (
                  <div className="flex h-64 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 text-center">
                    <p className="text-lg font-medium text-gray-500">Chưa có sản phẩm nào trong mục này</p>
                    <button 
                      onClick={() => setActiveCategory('Tất cả')}
                      className="mt-4 text-shopee font-bold hover:underline"
                    >
                      Quay lại xem tất cả
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
        
        <div id="features">
          <Features />
        </div>
      </main>
      
      <Footer onHomeClick={handleHomeClick} />
    </div>
  );
}

