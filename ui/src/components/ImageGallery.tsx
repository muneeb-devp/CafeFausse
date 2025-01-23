import React, { useState } from 'react'

const ImageGallery: React.FC<{ images: string[] }> = ({ images }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')

    const openLightbox = (image: string) => {
        setSelectedImage(image)
        setLightboxOpen(true)
    }

    const closeLightbox = () => {
        setLightboxOpen(false)
        setSelectedImage('')
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {images.map((image, index) => (
                <div
                    key={index}
                    className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
                    onClick={() => openLightbox(image)}
                >
                    <img
                        src={image}
                        alt={`Café Fausse image ${index + 1}`}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/600x400/cccccc/333333?text=Image+Error`
                        }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg font-bold">
                            View Full Image
                        </span>
                    </div>
                </div>
            ))}

            {lightboxOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100] p-4"
                    onClick={closeLightbox}
                >
                    <div className="relative max-w-4xl max-h-full">
                        <img
                            src={selectedImage}
                            alt="Enlarged view"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onError={(e) => {
                                e.currentTarget.src = `https://placehold.co/800x600/cccccc/333333?text=Image+Error`
                            }}
                        />
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 text-white text-4xl font-bold bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageGallery
