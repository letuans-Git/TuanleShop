import { ExternalLink, Tag, TrendingUp, Percent } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'Deal hot': return <Tag size={12} />;
      case 'Bán chạy': return <TrendingUp size={12} />;
      case 'Giảm sâu': return <Percent size={12} />;
      default: return null;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=600&auto=format&fit=crop'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=600&auto=format&fit=crop';
          }}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-1 rounded-md bg-shopee/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm"
            >
              {getBadgeIcon(badge)}
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 text-xs font-medium text-shopee">{product.category}</div>
        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 group-hover:text-shopee transition-colors">
          {product.name}
        </h3>
        <p className="mb-4 line-clamp-2 text-xs text-gray-500">
          {product.description || `Sản phẩm chất lượng từ danh mục ${product.category}`}
        </p>
        
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.discountPrice)}
            </span>
          </div>
          
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-28 items-center justify-center gap-1.5 rounded-lg bg-shopee text-sm font-bold text-white transition-all hover:bg-shopee-hover active:scale-95"
          >
            Mua Ngay
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};
