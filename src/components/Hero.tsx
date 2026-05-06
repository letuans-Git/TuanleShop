import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-[300px] w-full overflow-hidden bg-gray-900 md:h-[350px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2000&auto=format&fit=crop"
          alt="Banner Background"
          className="h-full w-full object-cover opacity-60 transition-transform duration-1000 hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/80 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto flex h-full items-center px-4">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-shopee/20 px-4 py-1 backdrop-blur-md border border-shopee/30"
          >
            <ShoppingBag className="text-shopee" size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-shopee">CHUYÊN DEAL SHOPEE CHỌN LỌC</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="mb-2 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              TUANLE <span className="text-shopee">Shop</span>
            </h1>
            <p className="mb-6 max-w-lg text-base text-gray-300 md:text-xl">
              Tổng hợp sản phẩm tốt, giá ưu đãi đậm sâu từ các cửa hàng uy tín trên Shopee.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#catalog"
              className="group flex items-center gap-2 rounded-full bg-shopee px-6 py-3 text-base font-bold text-white transition-all hover:bg-shopee-hover hover:shadow-[0_0_15px_rgba(238,77,45,0.4)] active:scale-95"
            >
              Săn Deal Ngay
              <ChevronRight className="transition-transform group-hover:translate-x-1" size={20} />
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute right-0 bottom-0 z-0 hidden lg:block">
        <motion.div 
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="relative mr-10 mb-10 h-32 w-32 rounded-2xl bg-shopee/10 backdrop-blur-3xl border border-white/10 shadow-2xl"
        >
          <div className="absolute inset-0 flex items-center justify-center text-shopee/20 italic font-black text-4xl select-none">
            SALE
          </div>
        </motion.div>
      </div>
    </section>
  );
};
