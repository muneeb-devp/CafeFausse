import AwardCard from '../components/AwardCard'
import ImageGallery from '../components/ImageGallery'
import ReviewCard from '../components/ReviewCard'
import type { Award } from '../types/award'
import type { Review } from '../types/review'

const GalleryPage: React.FC = () => {
  const galleryImages = [
    '/gallery-cafe-interior.webp',
    '/gallery-ribeye-steak.webp',
    '/gallery-special-event.webp',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop&auto=format&q=80',
  ]

  const awards: Award[] = [
    { title: 'Culinary Excellence Award', year: '2022' },
    { title: 'Restaurant of the Year', year: '2023' },
    { title: 'Best Fine Dining Experience', year: 'Foodie Magazine, 2023' },
  ]

  const reviews: Review[] = [
    {
      quote: 'Exceptional ambiance and unforgettable flavors.',
      author: 'Gourmet Review',
    },
    {
      quote: 'A must-visit restaurant for food enthusiasts.',
      author: 'The Daily Bite',
    },
    {
      quote: 'Every dish is a masterpiece, truly a culinary gem!',
      author: 'Local Food Critic',
    },
    {
      quote:
        'The service was impeccable, and the atmosphere was perfect for a special evening.',
      author: 'Happy Diner',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      <h1 className="text-5xl font-serif text-center text-gray-900 mb-12">
        Our Gallery & Accolades
      </h1>

      {/* Image Gallery Section (FR-12, FR-13) */}
      <section className="mb-12">
        <h2 className="text-4xl font-serif text-orange-600 border-b-2 border-orange-600 pb-4 mb-8 text-center md:text-left">
          Visual Feast
        </h2>
        <ImageGallery images={galleryImages} />
      </section>

      {/* Awards Section (FR-14) */}
      <section className="mb-12">
        <h2 className="text-4xl font-serif text-orange-600 border-b-2 border-orange-600 pb-4 mb-8 text-center md:text-left">
          Our Awards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <AwardCard key={index} award={award} />
          ))}
        </div>
      </section>

      {/* Customer Reviews Section (FR-14) */}
      <section>
        <h2 className="text-4xl font-serif text-orange-600 border-b-2 border-orange-600 pb-4 mb-8 text-center md:text-left">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </section>
    </div>
  )
}
export default GalleryPage
