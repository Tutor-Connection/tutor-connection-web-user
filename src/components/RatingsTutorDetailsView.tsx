import React, { useState } from 'react';
import { Tutor, Review, RatingCriteria } from '../types';
import { 
  ArrowLeft, BookOpen, Star, Calendar, ShieldCheck, 
  User, Sparkles, Image as ImageIcon, ThumbsUp, MapPin, Award
} from 'lucide-react';

interface RatingsTutorDetailsViewProps {
  tutor: Tutor;
  reviews: Review[];
  onBack: () => void;
  onRateCurrent: () => void;
}

export default function RatingsTutorDetailsView({ tutor, reviews, onBack, onRateCurrent }: RatingsTutorDetailsViewProps) {
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Filter reviews belonging to this tutor
  const tutorReviews = reviews.filter(r => r.tutorId === tutor.id);

  // Helper calculation for individual categories and total average
  const calculateAggregateStats = () => {
    const initialReviewsCount = tutor.reviewsCount || 0;
    const totalCount = initialReviewsCount + tutorReviews.length;
    
    // Initial seeded ratings estimations (simulated base seed)
    let qualitySum = (tutor.rating || 4.8) * initialReviewsCount;
    let punctualitySum = (tutor.rating || 4.7) * initialReviewsCount;
    let attitudeSum = (tutor.rating || 4.9) * initialReviewsCount;
    let supportSum = (tutor.rating || 4.8) * initialReviewsCount;

    // Sum user ratings
    tutorReviews.forEach(r => {
      qualitySum += r.ratings.quality;
      punctualitySum += r.ratings.punctuality;
      attitudeSum += r.ratings.attitude;
      supportSum += r.ratings.support;
    });

    const avgQuality = totalCount > 0 ? qualitySum / totalCount : 0;
    const avgPunctuality = totalCount > 0 ? punctualitySum / totalCount : 0;
    const avgAttitude = totalCount > 0 ? attitudeSum / totalCount : 0;
    const avgSupport = totalCount > 0 ? supportSum / totalCount : 0;

    const aggregateAverage = (avgQuality + avgPunctuality + avgAttitude + avgSupport) / 4;

    return {
      quality: Number(avgQuality.toFixed(1)),
      punctuality: Number(avgPunctuality.toFixed(1)),
      attitude: Number(avgAttitude.toFixed(1)),
      support: Number(avgSupport.toFixed(1)),
      average: Number(aggregateAverage.toFixed(1)),
      totalReviews: totalCount
    };
  };

  const stats = calculateAggregateStats();

  const handleLikeReview = (reviewId: string) => {
    setLikedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Gần đây';
    }
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-left">
      {/* Top Navigation */}
      <button
        id="btn-back-to-explore"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-primary-container transition-colors mb-6 group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Quay lại danh sách
      </button>

      {/* Tutor Profile Header Card */}
      <div className="rounded-2xl bg-brand-surface-container-lowest border border-brand-outline-variant/60 shadow-xs p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar Container */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-primary/20 p-1 flex-shrink-0 bg-brand-surface-container-lowest">
            <img
              referrerPolicy="no-referrer"
              src={tutor.avatar}
              alt={tutor.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Details column */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-primary/10 text-brand-primary uppercase">
                GIA SƯ ĐẠT CHUẨN
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-tertiary">
                <Award className="w-3.5 h-3.5" /> Chuyên môn xuất sắc
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-brand-on-surface mt-1">
              {tutor.name}
            </h1>
            <p className="text-sm font-semibold text-brand-on-surface-variant flex items-center gap-2 mt-1">
              <BookOpen className="w-4 h-4 text-brand-primary" />
              {tutor.subject}
            </p>
            <p className="text-xs text-brand-outline mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {tutor.degree || 'Thạc sĩ'} • {tutor.university || 'Trường đại học đối tác'}
            </p>
          </div>

          {/* Aggregate Highlight Box */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto p-4 bg-brand-surface-container-low rounded-xl border border-brand-surface-container-high md:border-0 md:bg-transparent">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-brand-outline md:text-right">
                Điểm Đánh Giá Chung
              </p>
              <div className="flex items-baseline gap-1 md:justify-end mt-0.5">
                <span className="text-4xl font-display font-extrabold text-brand-secondary-container">
                  {stats.average}
                </span>
                <span className="text-sm text-brand-outline font-semibold">/5.0</span>
              </div>
            </div>
            <span className="text-xs text-brand-on-surface-variant font-medium md:mt-1">
              Dựa trên {stats.totalReviews} đánh giá
            </span>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-brand-surface-container" />

        {/* Biography */}
        <div>
          <h3 className="text-sm font-bold text-brand-on-surface uppercase tracking-wider mb-2">Phương châm giảng dạy</h3>
          <p className="text-sm text-brand-on-surface-variant leading-relaxed max-w-3xl">
            {tutor.bio || 'Luôn nỗ lực mang lại kiến thức thực tế, kích thích tư duy tự lập của học sinh.'}
          </p>
        </div>
      </div>

      {/* Main Stats and Action Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        
        {/* Aggregates Breakdown Column */}
        <div className="md:col-span-2 rounded-2xl bg-brand-surface-container-lowest border border-brand-outline-variant/60 shadow-xs p-6">
          <h3 className="font-display font-semibold text-base text-brand-on-surface mb-6">
            Đánh giá theo từng tiêu chí
          </h3>
          <div className="space-y-5">
            {[
              { label: 'Chất lượng giảng dạy', score: stats.quality, color: 'bg-brand-primary' },
              { label: 'Đúng giờ & Tác phong', score: stats.punctuality, color: 'bg-indigo-600' },
              { label: 'Thái độ học thuật', score: stats.attitude, color: 'bg-teal-600' },
              { label: 'Mức độ hỗ trợ', score: stats.support, color: 'bg-brand-secondary-container' }
            ].map(item => (
              <div id={`stat-progress-${item.label.toLowerCase().replace(/\s+/g, '-')}`} key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs md:text-sm font-semibold">
                  <span className="text-brand-on-surface-variant">{item.label}</span>
                  <div className="flex items-center gap-1 text-brand-on-surface">
                    <span className="font-bold text-brand-secondary-container">{item.score.toFixed(1)}</span>
                    <span className="text-[10px] text-brand-outline font-normal">/5.0</span>
                  </div>
                </div>
                {/* Horizontal Progress bar */}
                <div className="w-full h-2 rounded-full bg-brand-surface-container-low overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.color} transition-all duration-1000`} 
                    style={{ width: `${(item.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick CTA Box */}
        <div className="rounded-2xl bg-brand-surface-container/50 border border-brand-surface-container/80 p-6 flex flex-col justify-between text-center items-center">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-display font-bold text-base text-brand-on-surface leading-snug">
              Bạn đã học với {tutor.name}?
            </h3>
            <p className="text-xs text-brand-on-surface-variant font-medium leading-relaxed px-2">
              Chia sẻ đánh giá của bạn để giúp học viên khác tìm kiếm được gia sư chất lượng tốt nhất.
            </p>
          </div>

          <button
            id="btn-launch-review"
            onClick={onRateCurrent}
            className="w-full mt-6 bg-brand-primary hover:bg-brand-primary-container text-white text-xs font-bold py-3 px-4 rounded-xl shadow-xs active:scale-[0.98] transition-all cursor-pointer"
          >
            Đánh giá ngay buổi học
          </button>
        </div>
      </div>

      {/* Student Reviews Feed Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-lg text-brand-on-surface">
            Đánh giá từ Học viên ({stats.totalReviews})
          </h2>
          <span className="inline-flex items-center gap-1 text-xs text-brand-outline font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Xác thực độ tin cậy
          </span>
        </div>

        {/* Review list */}
        <div className="space-y-4">
          {/* User Reviews */}
          {tutorReviews.map(review => (
            <div
              id={`review-card-${review.id}`}
              key={review.id}
              className="p-5 rounded-xl bg-brand-surface-container-lowest border border-brand-outline-variant/50 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-3">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-surface-container-low border border-brand-surface-container-high flex items-center justify-center text-brand-outline">
                    {review.anonymous ? (
                      <span className="text-xs font-semibold">AS</span>
                    ) : (
                      <User className="w-4 h-4 text-brand-primary" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-on-surface flex items-center gap-1.5">
                      {review.anonymous ? 'Học viên ẩn danh' : 'Học viên đã xác thực'}
                      {review.anonymous && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-surface-container text-brand-outline-variant uppercase font-bold transform scale-90">
                          Ẩn danh
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-brand-outline flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {formatDate(review.ratingDate)}
                    </p>
                  </div>
                </div>

                {/* Stars Display on top right */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-brand-surface-container text-brand-secondary-container font-extrabold text-xs">
                  <Star className="w-3 h-3 fill-brand-secondary-container text-brand-secondary-container" />
                  <span>{review.averageScore.toFixed(1)}</span>
                </div>
              </div>

              {/* Feedback Content */}
              <p className="text-xs text-brand-on-surface-variant mt-4 leading-relaxed whitespace-pre-wrap">
                {review.feedback}
              </p>

              {/* Attached Images */}
              {review.attachments && review.attachments.length > 0 && (
                <div className="mt-4">
                  <span className="text-[10px] text-brand-outline font-semibold uppercase flex items-center gap-1 mb-2">
                    <ImageIcon className="w-3 h-3" /> Ảnh minh chứng buổi học:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {review.attachments.map((attach, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedPhoto(attach)}
                        className="w-16 h-16 rounded-lg overflow-hidden border border-brand-outline-variant/60 hover:ring-2 hover:ring-brand-primary transition-all cursor-zoom-in"
                      >
                        <img
                          referrerPolicy="no-referrer"
                          src={attach}
                          alt="Feedback attachment thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Interaction Row */}
              <div className="flex items-center gap-4 mt-5 pt-3 border-t border-brand-surface-container-low">
                <button
                  id={`btn-like-review-${review.id}`}
                  onClick={() => handleLikeReview(review.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    likedReviews[review.id]
                      ? 'bg-brand-primary/10 text-brand-primary'
                      : 'text-brand-on-surface-variant hover:bg-brand-surface-container-low'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{likedReviews[review.id] ? 'Đã thích' : 'Hữu ích (1)'}</span>
                </button>
              </div>
            </div>
          ))}

          {/* Seed Reviews */}
          {reviews.filter(r => r.tutorId === tutor.id && r.id.startsWith('rev-')).length === 0 && tutorReviews.length === 0 && (
            <div className="p-4 rounded-xl border border-dashed border-brand-outline-variant text-center text-brand-outline">
              <p className="text-xs">Chưa có đánh giá trực tiếp nào từ bạn. Hãy là học viên đầu tiên đánh giá gia sư này!</p>
            </div>
          )}

          {/* Render Default Seed Reviews directly in HTML style format */}
          {TUTOR_SEED_REVIEWS[tutor.id]?.map((review, i) => (
            <div
              key={`seed-key-${i}`}
              className="p-5 rounded-xl bg-brand-surface-container-lowest border border-brand-outline-variant/40 shadow-3xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 border border-brand-surface-container flex items-center justify-center text-brand-primary">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-on-surface">Học viên hệ thống</h4>
                    <p className="text-[10px] text-brand-outline flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {review.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-brand-surface-container text-brand-secondary-container font-extrabold text-xs">
                  <Star className="w-3 h-3 fill-brand-secondary-container text-brand-secondary-container" />
                  <span>{review.avg.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-xs text-brand-on-surface-variant mt-3 leading-relaxed">
                {review.text}
              </p>

              {/* Seed Rating breakdown summary */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 pt-2 text-[10px] text-brand-outline border-t border-brand-surface-container-low">
                <span>Chất lượng: <b>{review.ratings.quality}/5</b></span>
                <span>Đúng giờ: <b>{review.ratings.punctuality}/5</b></span>
                <span>Thái độ: <b>{review.ratings.attitude}/5</b></span>
                <span>Hỗ trợ: <b>{review.ratings.support}/5</b></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-quality Lightbox for zoom view of Proof attachments */}
      {selectedPhoto && (
        <div
          id="lightbox-backdrop"
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-2xl max-h-[85vh] overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800">
            <img
              referrerPolicy="no-referrer"
              src={selectedPhoto}
              alt="Zoomed attachment"
              className="w-full h-full object-contain"
            />
            <button
              id="btn-close-lightbox"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Temporary Seed feed data matching individual tutors perfectly
const TUTOR_SEED_REVIEWS: Record<string, { ratings: RatingCriteria; avg: number; date: string; text: string }[]> = {
  'tutor-1': [
    {
      ratings: { quality: 5, punctuality: 5, attitude: 5, support: 5 },
      avg: 5.0,
      date: '10 Tháng 6 2026',
      text: 'Thầy Nguyễn Văn A giảng dạy rất nhiệt huyết, phương pháp trực quan sinh động dễ hiểu. Nhờ thầy bồi dưỡng mà điểm toán hình lớp 12 của em tiến bộ vượt bậc.'
    },
    {
      ratings: { quality: 5, punctuality: 4, attitude: 5, support: 4 },
      avg: 4.5,
      date: '02 Tháng 6 2026',
      text: 'Thầy cho bài tập về nhà rất đa dạng và sửa bài kỹ càng. Đúng giờ và dạy học sinh rất tập trung vào phương pháp tư duy bản chất.'
    }
  ],
  'tutor-2': [
    {
      ratings: { quality: 5, punctuality: 5, attitude: 4, support: 5 },
      avg: 4.8,
      date: '12 Tháng 6 2026',
      text: 'Cô Lan Anh dạy học rất tận tình, luyện thi nói IELTS vô cùng tự tin, sửa phát âm cho em cực chuẩn.'
    }
  ],
  'tutor-3': [
    {
      ratings: { quality: 5, punctuality: 5, attitude: 5, support: 5 },
      avg: 5.0,
      date: '20 Tháng 6 2026',
      text: 'Thầy Hoàng cứu cánh môn Toán cao cấp bách khoa cho em rất kịp thời. Thầy chỉ công thức mẹo dễ nhớ và phương pháp tính nhanh vi phân rất đỉnh.'
    }
  ]
};
