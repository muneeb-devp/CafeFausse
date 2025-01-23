import { type Award } from '../types/award'

const AwardCard: React.FC<{ award: Award }> = ({ award }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <div className="text-5xl mb-4" role="img" aria-label="Award icon">
      🏆
    </div>{' '}
    {/* Emoji icon */}
    <h3 className="text-2xl font-bold text-gray-800 mb-2">{award.title}</h3>
    <p className="text-gray-600 text-lg">{award.year}</p>
  </div>
)

export default AwardCard
