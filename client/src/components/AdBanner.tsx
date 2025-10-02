import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { X } from "lucide-react";

interface BannerState {
  count: number;
  date: string;
}

const DELAYS = [3000, 7000, 15000];
const MAX_SHOWS_PER_DAY = 3;
const STORAGE_KEY = "adBannerState";

function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getBannerState(): BannerState {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return { count: 0, date: getTodayDate() };
    }
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { count: 0, date: getTodayDate() };
    
    const state: BannerState = JSON.parse(stored);
    const today = getTodayDate();
    
    if (state.date !== today) {
      return { count: 0, date: today };
    }
    
    return state;
  } catch {
    return { count: 0, date: getTodayDate() };
  }
}

function setBannerState(count: number): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    
    const state: BannerState = {
      count,
      date: getTodayDate()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function AdBanner() {
  const [location] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    setIsShown(false);
    
    const state = getBannerState();
    
    if (state.count >= MAX_SHOWS_PER_DAY) {
      return;
    }
    
    const delay = DELAYS[state.count] || DELAYS[DELAYS.length - 1];
    
    const showTimer = setTimeout(() => {
      setIsShown(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }, delay);

    return () => clearTimeout(showTimer);
  }, [location]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    setTimeout(() => {
      setIsShown(false);
      const state = getBannerState();
      setBannerState(state.count + 1);
    }, 300);
  };

  if (!isShown) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      data-testid="ad-banner"
    >
      <a
        href="https://my.saleads.pro/s/jfk31/2356?erid=2Vtzquiy38h"
        target="_blank"
        rel="noopener noreferrer"
        className="block relative group"
        data-testid="link-ad-banner"
      >
        <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-[2px] rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mx-4 sm:mx-0">
          <div className="bg-gray-900 rounded-2xl px-6 py-4 sm:px-8 sm:py-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 rounded-lg bg-gray-800/80 hover:bg-gray-700 transition-colors z-10"
              aria-label="Закрыть"
              data-testid="button-close-banner"
            >
              <X className="w-4 h-4 text-gray-300" />
            </button>

            <div className="relative flex flex-col gap-2 pr-8">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse [animation-delay:200ms]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse [animation-delay:400ms]" />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
                  РЕКЛАМА
                </span>
              </div>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-md sm:max-w-xl">
                Закончили смотреть кино и хочется освоить полезный навык?{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 font-semibold underline decoration-purple-400/50 decoration-2 underline-offset-2">
                  Курс «Веб‑разработчик»
                </span>{" "}
                с нуля
              </p>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs sm:text-sm text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
                  Узнать подробнее →
                </span>
              </div>

              <div className="text-[9px] sm:text-[10px] text-gray-500 mt-1">
                erid: 2Vtzquiy38h
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
