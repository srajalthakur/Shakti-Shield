import React from 'react';
import PropTypes from 'prop-types';
import { Star, Sparkles, Heart } from 'lucide-react';

/**
 * ✨ TestimonialCard ✨
 * A vibrant card that displays user testimonials with delightful animations
 * 
 * @param {Object} props
 * @param {string} props.name    - Name of the testimonial author
 * @param {string} props.content - Testimonial text
 * @param {number} [props.rating=5] - Star rating (1-5)
 */
const TestimonialCard = ({ name, content, rating = 5 }) => (
  <div className="relative w-full md:w-5/12 p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-opacity-20 border-purple-200">
    {/* Decorative elements */}
    <Sparkles className="absolute top-2 left-2 w-4 h-4 text-yellow-400 animate-spin opacity-60" />
    <Heart className="absolute bottom-2 right-2 w-4 h-4 text-pink-400 animate-pulse opacity-60" />
    
    {/* Floating stars background */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <Star
          key={i}
          className={`absolute w-3 h-3 ${i % 2 ? 'text-purple-300' : 'text-pink-300'} opacity-40`}
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            transform: `scale(${Math.random() * 0.5 + 0.5})`
          }}
        />
      ))}
    </div>

    {/* Rating stars */}
    <div className="flex justify-center mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>

    {/* Quotation */}
    <blockquote className="relative mb-8 text-gray-800 text-center">
      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-7xl text-pink-300 opacity-20 font-serif">"</span>
      <p className="relative z-10 px-6 py-2 text-lg leading-relaxed bg-gradient-to-r from-pink-100 to-purple-100 bg-opacity-50 rounded-xl">
        {content}
      </p>
      <span className="absolute -bottom-8 right-1/2 transform translate-x-1/2 text-7xl text-purple-300 opacity-20 font-serif">"</span>
    </blockquote>

    {/* Author */}
    <div className="text-center mt-6">
      <div className="inline-block bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">
        <h3 className="text-xl font-bold text-transparent">{name}</h3>
      </div>
      <p className="text-sm text-gray-500 mt-1 flex items-center justify-center">
        <span className="inline-flex items-center">
          <Sparkles className="w-3 h-3 text-yellow-400 mr-1" />
          Verified User
        </span>
      </p>
    </div>
  </div>
);

TestimonialCard.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  rating: PropTypes.number,
};

export default TestimonialCard;