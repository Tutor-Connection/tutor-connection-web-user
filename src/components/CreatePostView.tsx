/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserPost } from '../types';
import { ArrowLeft, BookOpen, CircleDollarSign, Compass, Info, ArrowRight, Save, BadgeCheck } from 'lucide-react';

interface CreatePostViewProps {
  onBack: () => void;
  onSubmit: (newPost: Omit<UserPost, 'id' | 'createdAt' | 'applicantsCount'>) => void;
}

export default function CreatePostView({ onBack, onSubmit }: CreatePostViewProps) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [feeInput, setFeeInput] = useState('');
  const [format, setFormat] = useState<'Online' | 'Tại nhà' | 'Cả hai'>('Online');
  const [description, setDescription] = useState('');
  const [schedule, setSchedule] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const [draftSaved, setSubmitted] = useState(false);

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value) {
      const formatted = new Intl.NumberFormat('vi-VN').format(Number(value));
      setFeeInput(formatted + 'đ/buổi');
    } else {
      setFeeInput('');
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!title.trim() || !subject) {
        alert('Vui lòng nhập đầy đủ tiêu đề và chọn môn học.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!description.trim() || !schedule.trim()) {
        alert('Vui lòng mô tả chi tiết yêu cầu cụ thể và lịch học dự kiến.');
        return;
      }
      setStep(3);
    }
  };

  const handleConfirmSubmit = () => {
    onSubmit({
      title,
      subject,
      fee: feeInput || 'Thỏa thuận',
      status: 'OPEN',
      description,
      schedule,
      format,
      tags: tags.length > 0 ? tags : [subject, format]
    });
    setSubmitted(true);
  };

  const handleSaveDraft = () => {
    alert('Đã lưu bài viết tạm thời vào Thư nháp thành công!');
    onBack();
  };

  if (draftSaved) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md text-center space-y-6 max-w-lg mx-auto my-12 animate-float">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <BadgeCheck className="w-10 h-10" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900">Đăng tin thành công!</h2>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            Yêu cầu tìm gia sư của bạn đã được đăng công khai trên Academic Confidence. Các gia sư đáp ứng điều kiện sẽ chủ động ứng tuyển trong vòng vài giờ tới.
          </p>
        </div>
        <button
          onClick={onBack}
          className="w-full py-3 bg-[#0037b0] text-on-primary font-semibold rounded-xl hover:bg-blue-800 transition-colors"
        >
          Quay về Thư mục của tôi
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden my-6">
      {/* Title block */}
      <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="font-[#0037b0] font-display font-bold text-lg text-gray-900">Tạo bài đăng tìm gia sư</h2>
        </div>
        <span className="text-xs text-gray-400 font-medium">Hỗ trợ? Liên hệ 1900 1234</span>
      </div>

      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-xs text-[#0037b0] font-bold uppercase tracking-wider">
                Bước {step} trên 3
              </p>
              <h3 className="font-display text-base font-bold text-gray-900">
                {step === 1 ? 'Thông tin chung' : step === 2 ? 'Chi tiết lớp học' : 'Xác nhận đăng bài'}
              </h3>
            </div>
            <span className="text-xs text-gray-500 font-sans font-medium">
              {step === 1 ? '33%' : step === 2 ? '66%' : '100%'} Hoàn tất
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0037b0] transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Multi-step Form content */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Tiêu đề bài đăng</label>
              <input
                type="text"
                placeholder="Ví dụ: Tìm gia sư Toán lớp 12 tại Quận 1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#0037b0] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              />
              <p className="text-xs text-gray-400">Tiêu đề rõ ràng giúp gia sư hiểu nhanh mong muốn và tính chất việc học của bạn.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">Môn học cần tìm</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#0037b0] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                >
                  <option value="">Chọn môn học...</option>
                  <option value="Toán học">Toán học</option>
                  <option value="Vật lý">Vật lý</option>
                  <option value="Hóa học">Hóa học</option>
                  <option value="Tiếng Anh">Tiếng Anh (IELTS/SAT)</option>
                  <option value="Ngữ văn">Ngữ văn</option>
                  <option value="Tin học">Tin học lập trình</option>
                  <option value="Sinh học">Sinh học</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">Mức phí mong muốn / buổi</label>
                <input
                  type="text"
                  placeholder="Ví dụ: 200.000đ/buổi"
                  value={feeInput}
                  onChange={handleFeeChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#0037b0] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>

            {/* Warning block */}
            <div className="bg-orange-50/70 border border-orange-200/50 p-4 rounded-xl flex gap-3 text-sm text-orange-950">
              <Info className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Bài đăng tìm gia sư sẽ tự động hết hạn và ẩn sau <strong>14 ngày</strong> kể từ khi xuất bản để làm sạch không gian yêu cầu lớp và đảm bảo tính cập nhật của ứng dụng.
              </p>
            </div>

            {/* Aesthetic helper block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-100 rounded-xl p-4 bg-gray-50/30">
              <div className="md:col-span-2 flex flex-col justify-center">
                <h4 className="font-display font-bold text-sm text-[#0037b0]">Bạn đang cần trợ giúp học tập?</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Academic Confidence có hơn 12,000+ hồ sơ gia sư uy tín chuyên sâu thạc sĩ, tiến sĩ đã sẵn sàng đồng hành hỗ trợ ôn thi thăng hạng điểm số cho con em bạn.
                </p>
              </div>
              <div className="relative h-24 rounded-lg overflow-hidden shrink-0 shadow-inner">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLJcQu0AxKWZTMV1wCE_CGPJVa0m1ifpyibdVVoaK9IUcXJvRJBSUpufeswO7OVfVbq02GBKW401wE0SeIA8q3fKgsit7mHDJhK2VsUSbaxIBDkY2gLZbJfxv6bXrJrR3AaMEz3NSaqttdm04Nm0oCYIPqiYlyDfVoRu3f-ptZM1IRSDd7QONSOWCYNg5yOR8uYLYq4vM0aZagC_R-hMdfvdvHHAVukI1uPVzFF5v_G7l4s48L4Na0ASYqnm6tEAgNF3bFpO_uaw"
                  alt="Academic Confidence"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Mô tả cụ thể kỳ vọng & yêu cầu</label>
              <textarea
                rows={5}
                placeholder="Ví dụ: Cần tìm gia sư dạy Toán lớp 12 để thi tốt nghiệp THPT Quốc Gia môn Toán đạt 8.0+. Tập trung củng cố phần Giải tích số học và Hình học không gian..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#0037b0] focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5 animate-in slide-in-from-top-2">
                <label className="block text-sm font-semibold text-gray-700">Về hình thức học</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Online', 'Tại nhà', 'Cả hai'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormat(opt)}
                      className={`py-2 rounded-lg border text-xs font-semibold hover:border-blue-400 capitalize transition-all ${
                        format === opt
                          ? 'border-[#0037b0] bg-blue-50 text-blue-900 ring-2 ring-blue-100'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">Thứ / Khung thời gian học dự kiến</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Tối Thứ 2 (19:00 - 21:00)"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#0037b0] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Tags từ khóa giúp tìm nhanh (ấn Enter)</label>
              <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border border-gray-100 rounded-xl min-h-12 items-center">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0037b0] px-2.5 py-1 rounded-lg text-xs font-semibold"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => setTags(tags.filter((_, tIdx) => tIdx !== idx))}
                      className="hover:bg-blue-100 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Thêm từ khóa..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="bg-transparent border-none p-1 text-xs outline-none focus:ring-0 flex-1 min-w-[120px]"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-sm text-gray-700">Vui lòng rà soát lại thông tin trước khi xuất bản lớp</h4>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium">Tiêu đề lớp</p>
                  <p className="font-bold text-gray-900 mt-0.5">{title}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium">Môn học</p>
                  <p className="font-bold text-[#0037b0] mt-0.5">{subject}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium">Ngân sách dự kiến</p>
                  <p className="font-bold text-orange-600 mt-0.5">{feeInput || 'Thỏa thuận'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium">Hình thức / Lịch học</p>
                  <p className="font-bold text-gray-900 mt-0.5">{format} • {schedule}</p>
                </div>
              </div>
              <div className="border-t border-gray-200/50 pt-3">
                <p className="text-xs text-gray-400 uppercase font-medium">Mô tả cụ thể</p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed whitespace-pre-wrap">{description}</p>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-200/60 text-gray-600 px-2 py-0.5 rounded text-[10px] font-sans font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer actions bar */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
          <button
            onClick={step > 1 ? () => setStep(step - 1) : handleSaveDraft}
            className="px-6 py-2.5 text-sm font-semibold text-[#0037b0] hover:bg-gray-100 rounded-xl transition-all flex items-center gap-1.5"
          >
            {step > 1 ? (
              'Quay lại'
            ) : (
              <>
                <Save className="w-4 h-4" />
                Lưu nhạp
              </>
            )}
          </button>

          <button
            onClick={step < 3 ? handleNextStep : handleConfirmSubmit}
            className="px-8 py-2.5 bg-[#0037b0] hover:bg-blue-800 text-on-primary text-sm font-semibold rounded-xl shadow-md active:scale-95 transition-transform flex items-center gap-1.5"
          >
            {step < 3 ? (
              <>
                Tiếp theo
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              'Bắt đầu đăng bài tìm gia sư'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
