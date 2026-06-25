import React, { useState, useRef } from 'react';
import { Tutor, Review, RatingCriteria } from '../types';
import { ArrowLeft, BookOpen, Star, Camera, Check, Send, Sparkles, AlertCircle, X, Image as ImageIcon } from 'lucide-react';

interface RatingsRateTutorFormProps {
  tutor: Tutor;
  onBack: () => void;
  onSubmitReview: (review: Omit<Review, 'id' | 'ratingDate'>) => void;
}

export default function RatingsRateTutorForm({ tutor, onBack, onSubmitReview }: RatingsRateTutorFormProps) {
  const [ratings, setRatings] = useState<RatingCriteria>({
    quality: 0,
    punctuality: 0,
    attitude: 0,
    support: 0
  });

  const [feedback, setFeedback] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Criteria definition for clean loop in stars
  const criteriaList: { key: keyof RatingCriteria; label: string }[] = [
    { key: 'quality', label: 'Chất lượng giảng dạy' },
    { key: 'punctuality', label: 'Đúng giờ & Tác phong' },
    { key: 'attitude', label: 'Thái độ học thuật' },
    { key: 'support', label: 'Mức độ hỗ trợ' }
  ];

  // Calculate dynamic average score of selected rating stars
  const calculateLiveAverage = () => {
    const values = Object.values(ratings) as number[];
    const nonZeroValues = values.filter(v => v > 0);
    if (nonZeroValues.length === 0) return '0.0';
    const sum = nonZeroValues.reduce((a, b) => a + b, 0);
    return (sum / nonZeroValues.length).toFixed(1);
  };

  const liveAverage = calculateLiveAverage();

  const handleStarClick = (criterion: keyof RatingCriteria, val: number) => {
    setRatings(prev => ({
      ...prev,
      [criterion]: val
    }));
    setErrorMsg(null);
  };

  // Simulated drop and file triggers
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as File[];
      filesArray.forEach(file => {
        if (!file.type.startsWith('image/')) {
          setErrorMsg('Chỉ cho phép đính kèm ảnh (JPG, PNG)');
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          setErrorMsg('Ảnh tải lên phải dưới 10MB');
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setAttachments(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteAttachment = (idxToRemove: number) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verification - make sure at least one star rating is filled
    const values = Object.values(ratings) as number[];
    const ratedCount = values.filter(v => v > 0).length;
    if (ratedCount === 0) {
      setErrorMsg('Vui lòng chọn ít nhất một sao đánh giá trước khi gửi.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!feedback.trim()) {
      setErrorMsg('Vui lòng viết nhận xét ngắn về trải nghiệm học tập của bạn.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    // Simulate sending progress activity
    setTimeout(() => {
      onSubmitReview({
        tutorId: tutor.id,
        ratings,
        averageScore: Number(liveAverage),
        feedback,
        anonymous,
        attachments
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-brand-background pb-32 text-left">
      {/* Top sticky app header */}
      <header className="sticky top-0 z-45 w-full bg-brand-background/95 backdrop-blur-md border-b border-brand-outline-variant/30 flex justify-between items-center px-4 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            id="back-top-arrow"
            onClick={onBack}
            className="hover:bg-brand-surface-container transition-colors p-2 rounded-full active:scale-95 duration-150 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-brand-primary" />
          </button>
          <h1 className="font-display font-semibold text-lg text-brand-primary">Đánh giá Gia sư</h1>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full border border-brand-outline-variant overflow-hidden p-0.5 bg-white">
            <img
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover"
              src={tutor.avatar}
              alt={tutor.name}
            />
          </div>
        </div>
      </header>

      {/* Main Form Fields */}
      <main className="max-w-md mx-auto px-4 pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Top dynamic Tutor Info Card */}
          <section className="p-4 bg-brand-surface-container-lowest rounded-2xl border border-brand-surface-container-highest shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <h2 id="tutor-card-title" className="font-display font-bold text-base text-brand-on-surface mb-1">
                  {tutor.name}
                </h2>
                <p id="tutor-card-subject" className="text-xs text-brand-on-surface-variant flex items-center gap-1.5 font-medium">
                  <BookOpen className="w-3.5 h-3.5 text-brand-primary" />
                  {tutor.subject}
                </p>
              </div>
              
              {/* Massive Orange score highlight */}
              <div className="flex flex-col items-end">
                <span
                  id="average-score-indicator"
                  className={`font-display text-2xl font-black text-brand-secondary-container transition-transform duration-200 ${
                    Number(liveAverage) > 0 ? 'scale-110 drop-shadow-3xs' : 'scale-100'
                  }`}
                >
                  {liveAverage}
                </span>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-brand-outline mt-0.5 whitespace-nowrap">
                  Điểm Đánh Giá
                </span>
              </div>
            </div>
          </section>

          {/* Validation Error Alerts */}
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-start gap-2 animate-bounce">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Star selector sections group */}
          <section className="space-y-6">
            {criteriaList.map(criterion => (
              <div
                id={`rating-group-${criterion.key}`}
                key={criterion.key}
                className="space-y-2"
              >
                <label className="font-display font-bold text-sm text-brand-on-surface block">
                  {criterion.label}
                </label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map(starValue => {
                    const isActive = starValue <= ratings[criterion.key];
                    return (
                      <button
                        id={`star-${criterion.key}-${starValue}`}
                        key={starValue}
                        type="button"
                        onClick={() => handleStarClick(criterion.key, starValue)}
                        className="transition-transform duration-100 hover:scale-125 focus:outline-none cursor-pointer group"
                      >
                        <Star
                          className={`w-10 h-10 transition-all ${
                            isActive
                              ? 'fill-brand-secondary-container stroke-brand-secondary-container'
                              : 'text-brand-outline-variant hover:text-brand-secondary-container/60'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>

          {/* Share Experience textarea comment box */}
          <section className="space-y-2">
            <label className="font-display font-bold text-sm text-brand-on-surface block mt-4">
              Chia sẻ trải nghiệm học tập của bạn...
            </label>
            <div className="relative">
              <textarea
                id="experience-textbox"
                className="w-full min-h-[160px] p-4 rounded-2xl border border-brand-outline-variant focus:border-brand-primary placeholder-brand-outline bg-brand-surface-container-lowest text-brand-on-surface text-xs leading-relaxed transition-all outline-none resize-none"
                placeholder={`Buổi học cùng gia sư ${tutor.name} diễn ra như thế nào? Thầy/Cô giảng dạy có dễ hiểu và hỗ trợ nhiệt tình không?`}
                value={feedback}
                onChange={(e) => {
                  setFeedback(e.target.value);
                  setErrorMsg(null);
                }}
              />
              <span className="absolute bottom-3 right-3 text-[10px] text-brand-outline bg-brand-surface-container-low px-1.5 py-0.5 rounded-md font-semibold">
                {feedback.length} ký tự
              </span>
            </div>
          </section>

          {/* Attachements with simulated real image preview and file triggers */}
          <section className="space-y-2">
            <label className="font-display font-bold text-sm text-brand-on-surface block">
              Ảnh minh chứng buổi học (Không bắt buộc)
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="hidden"
            />
            
            {/* Clickable Cargo drag zone */}
            <div
              id="attachment-cargo"
              onClick={handleFileSelect}
              className="border-2 border-dashed border-brand-outline-variant rounded-2xl p-6 flex flex-col items-center justify-center bg-brand-surface-container-low hover:bg-brand-surface-container transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-brand-on-surface-variant text-center max-w-[240px]">
                Nhấn vào đây để tải lên hình chụp màn hình lớp học trực tuyến hoặc bài giải
              </p>
              <span className="text-[10px] text-brand-outline mt-1 block">
                JPG, PNG tối đa 10MB
              </span>
            </div>

            {/* Local image thumbnail list */}
            {attachments.length > 0 && (
              <div className="mt-3 grid grid-cols-4 gap-2.5">
                {attachments.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-brand-outline-variant/60 group">
                    <img
                      referrerPolicy="no-referrer"
                      src={src}
                      alt="Thumbnail proof"
                      className="w-full h-full object-cover"
                    />
                    <button
                      id={`delete-attachment-${i}`}
                      type="button"
                      onClick={() => handleDeleteAttachment(i)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Anonymity settings check */}
          <section className="py-2">
            <label className="flex items-center gap-3 cursor-pointer select-none group">
              <div className="relative flex items-center">
                <input
                  id="anonymous-checkbox"
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-brand-outline-variant transition-all checked:bg-brand-primary checked:border-brand-primary checked:scale-x-100 outline-none"
                />
                <Check className="absolute text-white stroke-[4] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none left-1/2 -translate-x-1/2 w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-brand-on-surface-variant group-hover:text-brand-on-surface transition-colors">
                Gửi đánh giá ẩn danh
              </span>
            </label>
          </section>
        </form>
      </main>

      {/* Sticky Action Footer Bar */}
      <footer className="fixed bottom-0 left-0 w-full glass-morphism p-4 z-40">
        <div className="max-w-md mx-auto">
          <button
            id="btn-submit-review"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full text-white font-display font-semibold text-base py-3.5 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isSubmitting
                ? 'bg-brand-outline cursor-wait opacity-80'
                : 'bg-brand-primary hover:bg-brand-primary-container active:scale-[0.98]'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Đang gửi đánh giá...</span>
              </>
            ) : (
              <>
                <span>Gửi đánh giá</span>
                <Send className="w-4 h-4 translate-x-0.5" />
              </>
            )}
          </button>
        </div>
      </footer>

      {/* Achievement modal on successful submit */}
      {submitSuccess && (
        <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-brand-surface-container-lowest border border-brand-outline-variant p-6 text-center shadow-2xl space-y-4 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-brand-tertiary/10 text-brand-tertiary flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-lg text-brand-on-surface">
                Gửi Đánh Giá Thành Công!
              </h3>
              <p className="text-xs text-brand-outline font-medium">
                Đánh giá của bạn đã được lưu trữ an toàn trong danh mục đối sánh gia sư của hệ thống.
              </p>
            </div>

            <div className="p-4 bg-brand-surface-container-low rounded-xl border border-brand-surface-container-high text-left flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-brand-outline uppercase tracking-wider font-bold">GIA SƯ NHẬN</span>
                <h4 className="text-xs font-bold text-brand-on-surface truncate">{tutor.name}</h4>
                <p className="text-[10px] text-brand-on-surface-variant font-medium mt-0.5">{tutor.subject}</p>
              </div>
              <div className="bg-brand-surface-container-highest px-3 py-1.5 rounded-lg text-brand-secondary-container font-black text-sm flex flex-col items-center justify-center">
                <span>{liveAverage}</span>
                <span className="text-[8px] uppercase font-bold tracking-wider text-brand-outline">ĐIỂM SỐ</span>
              </div>
            </div>

            <button
              id="success-dismiss-btn"
              onClick={onBack}
              className="w-full bg-brand-primary hover:bg-brand-primary-container text-white text-xs font-bold py-3 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Xem danh mục gia sư
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
