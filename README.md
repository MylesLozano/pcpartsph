# PCPartsPH - PC Builder Website

A React-based web application for PC building and price comparison in the Philippines, inspired by PCPartPicker.

![PCPartsPH Build Guide](./public/mockData/images/screenshot.webp)

## Features

- **Home Page**: Showcases featured PC builds, trending components, and a shopping cart feature
- **Build Guide**: Browse community-created PC builds with filterable categories by purpose, price range, and performance
- **PC Builder**: Interactive component selector with real-time compatibility checking
- **Price Comparison**: Compare component prices across different local retailers
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop

## Project Structure

- `/src/pages` - Main application pages:
  - `Home.jsx` - Landing page with featured builds and components
  - `BuildGuide.jsx` - PC build showcases with filtering and detailed views
  - `PartSelector.jsx` - Interactive PC building tool
  - `Compare.jsx` - Component price comparison tool
- `/src/components` - Reusable UI components:

  - `partsList/` - Components for displaying PC parts
  - `compatibility/` - Component compatibility checking
  - `priceComparison/` - Price comparison tools

- `/public/mockData/` - Mock data JSON files for development:
  - `builds.json` - Pre-configured PC builds
  - `components.json` - PC parts database
  - `retailers.json` - Retailer information
- `/scripts/` - Utility scripts:
  - `convert-images.js` - WebP image conversion tool

## Mock Data Structure

The application uses structured mock data to simulate a production database:

- **Components**: Detailed component specifications, pricing, compatibility info
- **Builds**: Pre-configured PC builds with component lists, performance scores
- **Retailers**: Local retailer information with pricing data

## Image Handling

The project uses WebP images for optimal performance:

- Smaller file sizes (25-35% less than equivalent JPG/PNG)
- Maintained image quality
- Alpha transparency support
- Use the included image conversion script to convert JPG/PNG to WebP

## Technologies Used

- **React** - UI framework
- **React Router** - Navigation and routing
- **TailwindCSS** - Styling and responsive design
- **Vite** - Development server and build tool

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. To convert images: `node scripts/convert-images.js`

## Future Improvements

- User authentication system
- Saved builds feature
- Real-time price tracking
- Integration with actual retailer APIs
- User reviews and ratings
- Build export/sharing capabilities
