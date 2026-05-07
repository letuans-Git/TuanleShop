import Papa from 'papaparse';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  videoUrl?: string;
  originalPrice: number;
  discountPrice: number;
  affiliateUrl: string;
  category: string;
  badges: ('Deal hot' | 'Bán chạy' | 'Giảm sâu')[];
}

export const CATEGORIES = ['Tất cả', 'Điện tử', 'Thời trang', 'Gia dụng', 'Làm đẹp', 'Đồ chơi'];

const DEFAULT_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRYpIYBUU8ML9SFUwA_Knulkw_5ugEFFgO0Niousiff9fvzSHtHsW-wPac3FGJ8FPsz7EQ6ZT3zVwS5/pub?gid=0&single=true&output=csv';
const SHEET_URL = import.meta.env.VITE_SHEET_URL || DEFAULT_SHEET_URL;

const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  // Remove "đ", dots, and spaces
  const cleaned = priceStr.replace(/[^\d]/g, '');
  return parseInt(cleaned, 10) || 0;
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // Add timestamp to bypass cache for "tốc độ cập nhật"
    const timestamp = new Date().getTime();
    const response = await fetch(`${SHEET_URL}${SHEET_URL.includes('?') ? '&' : '?'}t=${timestamp}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    const csvContent = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const products: Product[] = results.data.map((row: any, index: number) => ({
            id: `sheet-${index}`,
            name: row['Tên sản phẩm'] || '',
            description: '', // Sheet doesn't have description column in sample
            image: row['Ảnh sản phẩm'] || '',
            videoUrl: row['Video sản phẩm'] || '',
            originalPrice: parsePrice(row['Giá gốc']),
            discountPrice: parsePrice(row['Giá ưu đãi']),
            affiliateUrl: row['Link Affiliate'] || '',
            category: row['Hạng mục (Category)'] || 'Khác',
            badges: index % 3 === 0 ? ['Deal hot'] : index % 3 === 1 ? ['Bán chạy'] : ['Giảm sâu'], // Rotating badges as placeholder
          }));
          resolve(products);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Tai nghe Bluetooth Không Dây SONY WH-1000XM5',
    description: 'Chống ồn đỉnh cao, âm thanh sắc nét.',
    image: 'https://images.unsplash.com/photo-1648447226600-24467d020d82?q=80&w=600&auto=format&fit=crop',
    originalPrice: 8500000,
    discountPrice: 6990000,
    affiliateUrl: 'https://shopee.vn',
    category: 'Điện tử',
    badges: ['Deal hot', 'Bán chạy'],
  },
  {
    id: '2',
    name: 'Robot Hút Bụi Lau Nhà Xiaomi Vacuum Mop 2',
    description: 'Lực hút mạnh mẽ, bản quốc tế cực bền.',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop',
    originalPrice: 7200000,
    discountPrice: 4950000,
    affiliateUrl: 'https://shopee.vn',
    category: 'Gia dụng',
    badges: ['Giảm sâu'],
  },
  {
    id: '3',
    name: 'Áo Khoác Nam Bomber Basic - Đen Tuyển',
    description: 'Chất liệu vải kaki cao cấp, tôn dáng.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    originalPrice: 450000,
    discountPrice: 289000,
    affiliateUrl: 'https://shopee.vn',
    category: 'Thời trang',
    badges: ['Bán chạy'],
  },
  {
    id: '4',
    name: 'Bàn Phím Cơ Không Dây Keychron K2 V2',
    description: 'Gõ cực sướng, kết nối đa thiết bị.',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=600&auto=format&fit=crop',
    originalPrice: 2100000,
    discountPrice: 1650000,
    affiliateUrl: 'https://shopee.vn',
    category: 'Điện tử',
    badges: ['Deal hot'],
  },
  {
    id: '5',
    name: 'Nồi Chiên Không Dầu Philips 4.1L HD9200',
    description: 'Nấu ăn tốt cho sức khỏe, dễ vệ sinh.',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=600&auto=format&fit=crop',
    originalPrice: 3200000,
    discountPrice: 1790000,
    affiliateUrl: 'https://shopee.vn',
    category: 'Gia dụng',
    badges: ['Giảm sâu', 'Bán chạy'],
  },
  {
    id: '6',
    name: 'Serum Vitamin C Klairs Freshly Juiced Vitamin',
    description: 'Làm sáng da, mờ thâm hiệu quả.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
    originalPrice: 420000,
    discountPrice: 345000,
    affiliateUrl: 'https://shopee.vn',
    category: 'Làm đẹp',
    badges: ['Deal hot'],
  },
  {
    id: '7',
    name: 'Giày Sneaker Unisex Converse Chuck Taylor 70s',
    description: 'Phong cách vintage, dễ phối đồ.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop',
    originalPrice: 1950000,
    discountPrice: 1450000,
    affiliateUrl: 'https://shopee.vn',
    category: 'Thời trang',
    badges: ['Bán chạy'],
  },
  {
    id: '8',
    name: 'Loa Bluetooth Marshall Emberton II',
    description: 'Âm thanh Marshall đặc trưng, nhỏ gọn.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop',
    originalPrice: 4500000,
    discountPrice: 3890000,
    affiliateUrl: 'https://shopee.vn',
    category: 'Điện tử',
    badges: ['Deal hot', 'Giảm sâu'],
  },
  {
    id: '9',
    name: 'Kem Chống Nắng La Roche-Posay Anthelios',
    description: 'Chống nắng tối ưu cho da nhạy cảm.',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop',
    originalPrice: 520000,
    discountPrice: 468000,
    affiliateUrl: 'https://shopee.vn',
    category: 'Làm đẹp',
    badges: ['Bán chạy'],
  },
];
