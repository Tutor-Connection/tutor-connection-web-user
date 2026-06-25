import React, { useState } from 'react';
import { Tutor, Review } from '../types';
import { Search, Sparkles, BookOpen, Star, ChevronRight, GraduationCap } from 'lucide-react';

interface RatingsExploreViewProps {
  tutors: Tutor[];
  reviews: Review[];
  onSelectTutor: (id: string, view: 'ratings-details' | 'ratings-rate') => void;
}

export default function RatingsExploreView({ tutors, reviews, onSelectTutor }: RatingsExploreViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  // Categories based on subjects in main app
  const categories = ['Tất cả', 'Toán học', 'Vật lý', 'Hóa học', 'Tiếng Anh', 'Ngữ văn', 'Tin học'];

  // Helper to compute live tutoring stats
  const getTutorStats = (tutor: Tutor) => {
    const tutorReviews = reviews.filter(r => r.tutorId === tutor.id);
    const initialReviewsCount = tutor.reviewsCount || 0;
    const totalCount = initialReviewsCount + tutorReviews.length;
    
    // Sum of all average ratings
    const userReviewsSum = tutorReviews.reduce((sum, r) => sum + r.averageScore, 0);
    const initialSum = (tutor.rating || 0) * initialReviewsCount;
    
    const average = totalCount > 0 ? (initialSum + userReviewsSum) / totalCount : 0;
    
    return {
      average: Number(average.toFixed(1)),
      count: totalCount
    };
  };

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tutor.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (tutor.bio && tutor.bio.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'Tất cả' || 
                            tutor.subject.toLowerCase().includes(activeCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-left">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-primary/95 to-brand-primary-container p-6 md:p-10 text-white shadow-md mb-10">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-brand-surface-container-lowest mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Đồng hành cùng sự tiến bộ của học viên
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-3">
            Hệ thống Đánh giá Gia sư
          </h1>
          <p className="text-sm md:text-base text-brand-surface-container/90 leading-relaxed max-w-xl">
            Cơ chế khớp gia sư thông minh và minh bạch. Nhận xét sau mỗi buổi học, chia sẻ trải nghiệm của bạn và giúp các bạn học viên khác tìm kiếm người thầy lý tưởng.
          </p>
        </div>
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
      </div>

      {/* Control Bar: Search and Category Pills */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-outline w-5 h-5" />
          <input
            id="tutor-search-input"
            type="text"
            placeholder="Tìm tên gia sư, môn học chuyên môn hoặc từ khóa..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-brand-outline-variant bg-brand-surface-container-lowest text-brand-on-surface placeholder-brand-outline focus:border-brand-primary focus:ring-2 focus:ring-brand-surface-container-high outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
          {categories.map(cat => (
            <button
              id={`cat-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-brand-surface-container-lowest text-brand-on-surface-variant border border-brand-outline-variant hover:border-brand-primary/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tutor Catalogue Grid */}
      {filteredTutors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredTutors.map(tutor => {
            const stats = getTutorStats(tutor);
            return (
              <div
                id={`tutor-card-${tutor.id}`}
                key={tutor.id}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-brand-surface-container-lowest border border-brand-outline-variant/60 shadow-xs hover:shadow-md hover:border-brand-primary/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-start gap-4">
                    {/* Portrait Avatar */}
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-brand-outline-variant bg-brand-surface-container-low flex-shrink-0">
                      <img
                        referrerPolicy="no-referrer"
                        src={tutor.avatar}
                        alt={`Photo of ${tutor.name}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Tutor Core Meta */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-lg text-brand-on-surface truncate group-hover:text-brand-primary transition-colors">
                        {tutor.name}
                      </h3>
                      <p className="text-xs font-semibold text-brand-on-surface-variant flex items-center gap-1.5 mt-0.5">
                        <BookOpen className="w-3.5 h-3.5 text-brand-primary" />
                        {tutor.subject}
                      </p>
                      <p className="text-[11px] text-brand-outline mt-0.5 flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" /> {tutor.degree || 'Gia sư'} tại {tutor.university || 'Đại học đối tác'}
                      </p>
                    </div>

                    {/* Overall Rating Badge */}
                    <div className="flex flex-col items-end flex-shrink-0">
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-surface-container text-brand-secondary-container font-extrabold text-sm shadow-2xs">
                        <Star className="w-3.5 h-3.5 fill-brand-secondary-container text-brand-secondary-container" />
                        <span>{stats.average === 0 ? 'N/A' : stats.average.toFixed(1)}</span>
                      </div>
                      <span className="text-[10px] text-brand-outline font-medium tracking-wider mt-1 uppercase">
                        {stats.count} đánh giá
                      </span>
                    </div>
                  </div>

                  {/* Summary Biography */}
                  {tutor.bio && (
                    <p className="text-xs text-brand-on-surface-variant line-clamp-2 mt-4 leading-relaxed">
                      {tutor.bio}
                    </p>
                  )}
                </div>

                {/* Footer Interactions */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-brand-surface-container-low">
                  <button
                    id={`btn-rate-now-${tutor.id}`}
                    onClick={() => onSelectTutor(tutor.id, 'ratings-rate')}
                    className="px-4 py-2 text-xs font-bold text-brand-secondary-container hover:bg-brand-secondary-container/5 rounded-lg border border-brand-secondary-container/20 transition-all cursor-pointer"
                  >
                    Đánh giá Buổi học
                  </button>
                  <button
                    id={`btn-view-profile-${tutor.id}`}
                    onClick={() => onSelectTutor(tutor.id, 'ratings-details')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:text-brand-primary-container transition-colors group/btn cursor-pointer"
                  >
                    Xem đánh giá chi tiết
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center bg-brand-surface-container-lowest border border-brand-outline-variant/50 rounded-2xl">
          <BookOpen className="w-12 h-12 text-brand-outline-variant mx-auto mb-3" />
          <h3 className="text-base font-semibold text-brand-on-surface">Không tìm thấy gia sư</h3>
          <p className="text-xs text-brand-outline mt-1">Hãy thử đổi từ khóa tìm kiếm hoặc lọc chủ đề khác.</p>
        </div>
      )}
    </div>
  );
}
