'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Hero carousel images (no longer used in hero, but kept for possible future use)
  const heroSlides = [
    {
      image: 'https://ext.same-assets.com/3040939488/1684695165.webp',
      alt: 'Kitchen showcase'
    },
    {
      image: 'https://ext.same-assets.com/3040939488/2513592458.webp',
      alt: 'Bath showcase'
    },
    {
      image: 'https://ext.same-assets.com/3040939488/1907666183.webp',
      alt: 'Countertops showcase'
    },
    {
      image: 'https://ext.same-assets.com/3040939488/16831045.webp',
      alt: 'Appliances showcase'
    },
    {
      image: 'https://ext.same-assets.com/3040939488/1916374771.webp',
      alt: 'Accessories showcase'
    }
  ];

  useEffect(() => {
    // Ensure we're on the client side to prevent hydration mismatch
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only show popup after ensuring we're on client side
    if (!isClient) return;
    
    // Show popup after 2 seconds to improve UX
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isClient]);

  useEffect(() => {
    // Auto-advance carousel (not used in new hero, but kept for possible future use)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <>
      <Header />
      
      {/* Popup Modal */}
      {isClient && (
        <Dialog open={showPopup} onOpenChange={setShowPopup}>
          <DialogContent className="max-w-2xl p-8 bg-white">
            <DialogHeader>
              <DialogTitle className="text-center text-3xl font-bold">
                Get Exclusive Promotions & Updates
              </DialogTitle>
            </DialogHeader>
            
            <button
              onClick={() => setShowPopup(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
            
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Sign up to receive tailored offers and exclusive updates straight to your
                inbox. Select the types of promotions & products that interest you most!
                From special online deals to updates from your local branches.
              </p>
              
              <div className="space-y-3 pt-4">
                <Button
                  className="w-full max-w-md bg-[#e74c4c] hover:bg-[#d63838] text-white font-semibold py-6 text-lg rounded-full"
                  asChild
                >
                  <a href="https://mailchi.mp/181a7ef3cee4/send-me-offers" target="_blank" rel="noopener noreferrer">
                    Send Me Offers
                  </a>
                </Button>
                
                <Button
                  className="w-full max-w-md bg-[#e74c4c] hover:bg-[#d63838] text-white font-semibold py-6 text-lg rounded-full"
                  asChild
                >
                  <a href="https://homeimprovementsupply.com" target="_blank" rel="noopener noreferrer">
                    Shop HIS Online
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Hero Section with Video */}
      <section className="relative h-[500px] lg:h-[600px] overflow-hidden bg-gray-100">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/mbs-hero-video.mp4" type="video/mp4" />
          {/* Fallback to image if video doesn't load */}
          <Image
            src="https://ext.same-assets.com/3040939488/2513592458.webp"
            alt="MBS Mobile Display Trailer showcasing kitchen and bath products"
            fill
            className="object-cover"
          />
        </video>
        
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* MBS Logo and text overlay */}
        <div className="absolute top-8 left-8 text-white z-10">
          <div className="text-[#e74c4c] text-3xl font-bold italic drop-shadow-lg">Modern Builders Supply, Inc.</div>
          <div className="text-2xl italic drop-shadow-lg">Since 1944</div>
        </div>
        
        {/* Discrete Admin Button - bottom right of hero */}
        <Link
          href="/admin"
          className="absolute bottom-4 right-4 z-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white/70 hover:text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 border border-white/10"
        >
          <Settings className="h-3.5 w-3.5" />
          <span>Admin Portal</span>
        </Link>
      </section>

      <Footer />
    </>
  );
}