# AI Movie Matcher - Design Guidelines

## Design Approach
**System-Based with Creative Enhancements**: Following a utility-first minimalist approach with strategic visual moments. The design prioritizes clarity and speed while creating emotional connections through the mood selection interface.

## Core Design Principles
- **Minimalist Clarity**: Every element serves a purpose, no decorative bloat
- **Mood-Driven Color**: Emotion expressed through strategic gradient use
- **Dark Elegance**: Sophisticated dark theme that focuses attention
- **Instant Response**: Fast, smooth interactions with minimal loading states

## Color Palette

### Base Colors (Dark Mode)
- **Primary Background**: 10 10% 6% (nearly black #0a0a0a)
- **Secondary Background**: 10 10% 10% (dark gray #1a1a1a)
- **Card Background**: 0 0% 12% (elevated surface)
- **Text Primary**: 0 0% 100% (pure white)
- **Text Secondary**: 0 0% 70% (muted white)
- **Border**: 0 0% 16% (#2a2a2a)

### Accent Colors
- **Primary Accent**: 239 84% 67% (indigo #6366f1)
- **Secondary Accent**: 38 92% 50% (amber #f59e0b)

### Mood Button Gradients
- **Positive Moods**: from-yellow-400 to-amber-500 (warm, inviting)
- **Energetic Moods**: from-red-500 to-red-600 (intense, dynamic)
- **Thoughtful Moods**: from-indigo-400 to-indigo-600 (contemplative)
- **Emotional Moods**: from-blue-400 to-blue-600 (deep, resonant)
- **Special Moods**: from-emerald-400 to-emerald-600 (unique, fresh)

## Typography
- **Font Family**: Inter for UI, SF Pro Display fallback
- **Logo**: text-5xl md:text-6xl font-bold (48-64px)
- **Page Headings**: text-3xl md:text-4xl font-semibold (32-40px)
- **Movie Title**: text-2xl md:text-3xl font-bold
- **Body Text**: text-base md:text-lg (16-18px)
- **Button Text**: text-base font-semibold
- **Mood Button Labels**: text-sm md:text-base font-medium
- **Emoji Size**: text-2xl (24px) within buttons

## Layout System
**Spacing Units**: Use Tailwind spacing of 4, 6, 8, 12, 16, 24 units consistently
- **Section Padding**: py-12 md:py-16 lg:py-24
- **Card Padding**: p-6 md:p-8
- **Button Padding**: px-6 py-3
- **Grid Gaps**: gap-4 (mood buttons)

**Container Widths**:
- Main page mood grid: max-w-6xl mx-auto
- Movie card: max-w-4xl mx-auto
- Mobile: px-4, Tablet: px-6, Desktop: px-8

## Component Library

### Main Page Components
**Logo Section**: Centered, top-positioned with generous vertical spacing (pt-16 md:pt-24)

**Mood Button Grid**:
- Desktop: grid-cols-4 (4 columns)
- Tablet: grid-cols-2 (2 columns)
- Mobile: grid-cols-1 (single column)
- Each button: Full gradient background, white text, emoji on left, rounded-xl
- Height: h-14 md:h-16
- Hover: scale-105 transform, shadow-lg, brightness-110
- Transition: transition-all duration-200 ease-out

### Movie Page Components
**Movie Card**: 
- Layout: Flex column on mobile, flex row on desktop (md:flex-row)
- Poster: w-full md:w-80, aspect-[2/3], rounded-lg, shadow-2xl
- Info Section: flex-1, space-y-4 md:space-y-6
- Background: bg-zinc-900/50 backdrop-blur, rounded-2xl, border border-zinc-800

**Info Elements**:
- Rating: Flex row with star icon, large text-lg font-semibold, amber color
- Genre Tags: Inline flex, rounded-full px-3 py-1, bg-zinc-800, text-sm
- Description: text-zinc-400, leading-relaxed, max 4 lines with truncation

**Action Buttons Bar**:
- Flex row, justify-between on desktop, stack on mobile
- Primary Button (Watch): bg-indigo-600 hover:bg-indigo-700, full width on mobile
- Secondary Buttons: bg-zinc-800 hover:bg-zinc-700
- All buttons: rounded-lg, px-6 py-3, font-semibold

### Loading States
- Skeleton Screen: Pulse animation, bg-zinc-800/50
- Loading Text: "Подбираем фильм под ваше настроение..." with animated dots
- Spinner: Indigo color, centered

### Error States
- Error Card: bg-red-900/20, border-red-800, rounded-xl, p-6
- Retry Button: bg-red-600 hover:bg-red-700

## Animations
**Minimal & Purposeful**:
- Mood buttons: scale(1.05) and shadow on hover only
- Page transitions: 300ms fade-in for movie card
- Button states: 200ms ease-out transitions
- No scroll animations, no complex interactions

## Mobile Responsiveness
- All grids collapse to single column on mobile
- Movie card stacks poster above info
- Buttons go full-width on mobile
- Touch-friendly: minimum 44px tap targets
- Generous spacing on small screens

## Images
**Movie Posters**: 
- Aspect ratio 2:3 (standard movie poster)
- Use kinopoisk.dev API poster URLs
- Object-fit: cover
- Loading: Blur-up effect with skeleton

**No Hero Image**: The main page uses the mood button grid as the primary visual element, no traditional hero section needed