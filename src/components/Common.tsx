import { CheckCircle2, ShieldCheck, Zap, RefreshCw, Facebook, MessageCircle, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const featureList = [
  {
    icon: <CheckCircle2 className="text-shopee" size={32} />,
    title: 'Chọn lọc deal thật',
    description: 'Chúng tôi chỉ tổng hợp các sản phẩm có đánh giá cao và shop uy tín.'
  },
  {
    icon: <ShieldCheck className="text-shopee" size={32} />,
    title: 'Link Sản Phẩm Chính Hãng',
    description: 'Cam kết 100% link dẫn đến gian hàng Mall hoặc Shop yêu thích.'
  },
  {
    icon: <Zap className="text-shopee" size={32} />,
    title: 'Cập nhật hằng ngày',
    description: 'Liên tục cập nhật các chương trình khuyến mãi mới nhất từ Shopee.'
  },
  {
    icon: <RefreshCw className="text-shopee" size={32} />,
    title: 'Không tăng giá',
    description: 'Đảm bảo bạn mua được sản phẩm với mức giá ưu đãi nhất có thể.'
  }
];

export const Features = () => {
  return (
    <section className="bg-orange-50/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Lý do nên săn deal qua website này</h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-shopee" />
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featureList.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm border border-orange-100 transition-transform hover:-translate-y-1">
              <div className="mb-4 rounded-full bg-orange-50 p-4">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Footer = ({ onHomeClick, categories = [] }: { onHomeClick?: () => void, categories?: string[] }) => {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <Link 
              to="/"
              onClick={() => {
                onHomeClick?.();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mb-4 flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-shopee font-bold text-white">T</div>
              <span className="text-xl font-bold tracking-tight">TUANLE <span className="text-shopee text-sm">Shop</span></span>
            </Link>
            <p className="max-w-xs text-center text-sm text-gray-400 md:text-left">
              Website chia sẻ các sản phẩm chất lượng, với giá ưu đãi cực tốt từ Shopee Việt Nam.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-400">Hotline:</span>
                <a href="tel:0913.566.532" className="hover:text-shopee transition-colors">0913.566.532</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-400">Email:</span>
                <a href="mailto:letuans@gmail.com" className="hover:text-shopee transition-colors">letuans@gmail.com</a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center border-t border-gray-800 pt-8 md:items-end md:border-none md:pt-0">
            <div className="mb-4 text-sm font-medium text-gray-300">Kết nối với chúng tôi</div>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/letuans/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-shopee text-white" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://zalo.me/0913566532" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-shopee text-white" title="Zalo">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          <p className="mb-2 text-shopee/80 font-medium italic">
            Disclaimer: Website chia sẻ các sản phẩm chất lượng, với giá ưu đãi. Click vào link để mua hàng trực tiếp tại Shopee.
          </p>
          <p>&copy; {new Date().getFullYear()} TUANLE Shop. All rights reserved. No user data is collected.</p>
        </div>
      </div>
    </footer>
  );
};

export const Navbar = ({ onHomeClick, onSearch, categories = [] }: { onHomeClick?: () => void, onSearch?: (query: string) => void, categories?: string[] }) => {
  const [showCatalog, setShowCatalog] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Link 
            to="/"
            onClick={() => {
              onHomeClick?.();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer flex-shrink-0"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-shopee font-bold text-white">T</div>
            <span className="hidden text-xl font-bold tracking-tight text-gray-900 sm:block">TUANLE <span className="text-shopee text-sm">Shop</span></span>
          </Link>

          <div className="relative flex-1 max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              onChange={(e) => {
                onSearch?.(e.target.value);
                if (window.location.pathname !== '/') {
                  navigate('/');
                }
              }}
              className="block w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm transition-all focus:border-shopee focus:outline-none focus:ring-2 focus:ring-shopee/20"
            />
          </div>
        </div>
        
        <div className="hidden lg:block">
          <ul className="flex gap-8 text-sm font-medium text-gray-600">
            <li>
              <Link 
                to="/"
                onClick={() => {
                  onHomeClick?.();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-shopee transition-colors cursor-pointer px-4 py-1.5 rounded-full border-2 border-gray-100 font-bold block"
              >
                Trang chủ
              </Link>
            </li>
            <li className="relative">
              <motion.button 
                onMouseEnter={() => setShowCatalog(true)}
                onMouseLeave={() => setShowCatalog(false)}
                className="hover:text-shopee transition-colors flex items-center gap-1 px-4 py-1.5 rounded-full border-2 font-bold"
                animate={{ 
                  color: ['#4b5563', '#ee4d2d', '#4b5563'],
                  borderColor: ['rgba(238, 77, 45, 0)', 'rgba(238, 77, 45, 0.6)', 'rgba(238, 77, 45, 0)'],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Danh mục
                <ChevronDown size={14} className={`transition-transform ${showCatalog ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {showCatalog && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => setShowCatalog(true)}
                    onMouseLeave={() => setShowCatalog(false)}
                    className="absolute left-0 mt-1 w-48 rounded-2xl bg-white p-2 shadow-xl border border-gray-100"
                  >
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={category === 'Tất cả' ? '/' : `/category/${encodeURIComponent(category)}`}
                        className="block rounded-lg px-4 py-2 hover:bg-orange-50 hover:text-shopee transition-colors"
                        onClick={() => setShowCatalog(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li><a href="#features" className="hover:text-shopee transition-colors px-4 py-1.5 rounded-full border-2 border-gray-100 block font-bold">Về chúng tôi</a></li>
          </ul>
        </div>
        
        <div className="flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-[10px] font-bold text-shopee sm:text-xs">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-shopee" />
          MỚI CẬP NHẬT
        </div>
      </div>
    </nav>
  );
};
