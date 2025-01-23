import type { Review } from '../types/review'

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <p className="text-gray-700 italic text-lg mb-4">"{review.quote}"</p>
    <p className="text-gray-900 font-semibold text-right">- {review.author}</p>
  </div>
)

export default ReviewCard
