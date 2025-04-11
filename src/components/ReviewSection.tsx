import React, { useState } from 'react';
import { Star, ThumbsUp, Image as ImageIcon } from 'lucide-react';
import { Review } from '../types';

interface ReviewSectionProps {
  reviews: Review[];
  productId: string;
  onAddReview: (review: Omit<Review, 'id' | 'createdAt' | 'helpful'>) => Promise<void>;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews,
  productId,
  onAddReview,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [filter, setFilter] = useState<number | null>(null);

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const filteredReviews = filter
    ? reviews.filter(review => review.rating === filter)
    : reviews;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddReview({
      userId: 'current-user-id',
      userName: 'John Doe',
      productId,
      rating,
      comment,
      images,
    });
    setRating(5);
    setComment('');
    setImages([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="flex items-start gap-8 mb-8 p-6 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
          <div className="flex items-center justify-center text-yellow-400 my-2">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= averageRating ? 'fill-current' : ''
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">{reviews.length} reviews</div>
        </div>

        <div className="flex-1">
          {[5, 4, 3, 2, 1].map(stars => (
            <div key={stars} className="flex items-center gap-4 mb-2">
              <div className="flex items-center text-yellow-400">
                {[...Array(stars)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{
                    width: `${((ratingCounts[stars] || 0) / reviews.length) * 100}%`,
                  }}
                />
              </div>
              <div className="text-sm text-gray-600 w-12">
                {ratingCounts[stars] || 0}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter(null)}
          className={`px-4 py-2 rounded-full text-sm ${
            filter === null
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {[5, 4, 3, 2, 1].map(stars => (
          <button
            key={stars}
            onClick={() => setFilter(stars)}
            className={`px-4 py-2 rounded-full text-sm ${
              filter === stars
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {stars} Stars
          </button>
        ))}
      </div>

      {/* Review List */}
      <div className="space-y-6 mb-8">
        {filteredReviews.map(review => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">
                    {review.userName[0]}
                  </span>
                </div>
                <span className="font-medium">{review.userName}</span>
              </div>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? 'fill-current' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">{review.comment}</p>
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    alt={`Review ${i + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(review.createdAt).toLocaleDateString()}</span>
              <button className="flex items-center gap-1 text-gray-600 hover:text-purple-600">
                <ThumbsUp className="h-4 w-4" />
                Helpful ({review.helpful})
              </button>
            </div>
            {review.reply && (
              <div className="mt-4 ml-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{review.reply}</p>
                <p className="text-xs text-gray-500 mt-2">Seller's Response</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold">Write a Review</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-yellow-400 focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${star <= rating ? 'fill-current' : ''}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Share your experience with this product..."
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add Photos
          </label>
          <button
            type="button"
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
          >
            <ImageIcon className="h-5 w-5" />
            Upload Images
          </button>
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};