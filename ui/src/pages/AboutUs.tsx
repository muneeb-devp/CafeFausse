const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      <h1 className="text-5xl font-serif text-center text-gray-900 mb-12">
        About Café Fausse
      </h1>

      <section className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mb-12">
        <h2 className="text-4xl font-serif text-orange-600 mb-6 text-center">
          Our Story
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez,
          Café Fausse blends traditional Italian flavors with modern culinary
          innovation. Our mission is to provide an unforgettable dining
          experience that reflects both quality and creativity.
        </p>
        <p className="text-lg leading-relaxed">
          Our commitment extends to sourcing locally grown ingredients whenever
          possible, ensuring the freshest and most vibrant flavors in every
          dish. We believe that exceptional food, combined with a warm and
          inviting atmosphere, creates truly memorable moments for our guests.
        </p>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-4xl font-serif text-orange-600 mb-8 text-center">
          Meet Our Founders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Chef Antonio Rossi"
              className="rounded-full mx-auto mb-4 w-48 h-48 object-cover shadow-md"
            />
            <h3 className="text-3xl font-serif font-semibold text-gray-900 mb-2">
              Chef Antonio Rossi
            </h3>
            <p className="text-lg text-gray-700">
              A culinary visionary, Chef Antonio brings years of experience from
              Michelin-starred kitchens across Italy. His passion for authentic
              flavors and innovative techniques defines Café Fausse's unique
              menu.
            </p>
          </div>
          <div className="text-center">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Maria Lopez"
              className="rounded-full mx-auto mb-4 w-48 h-48 object-cover shadow-md"
            />
            <h3 className="text-3xl font-serif font-semibold text-gray-900 mb-2">
              Maria Lopez
            </h3>
            <p className="text-lg text-gray-700">
              With a keen eye for hospitality and a dedication to customer
              satisfaction, Maria ensures every guest at Café Fausse feels
              welcomed and cherished, creating an unforgettable dining
              atmosphere.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUsPage
