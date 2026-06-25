/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Tutor, Review } from '../types';
import { Share, MoreVertical, ShieldCheck, CheckCircle2, Video, Calendar, HelpCircle, ArrowLeft, MessageSquare, AlertCircle, RefreshCw, Star } from 'lucide-react';

interface ClassDetailsViewProps {
  tutor: Tutor;
  reviews: Review[];
  onBack: () => void;
  onOpenChat: () => void;
  onRateTutor: (tutorId: string) => void;
  onViewRatings: (tutorId: string) => void;
}

export default function ClassDetailsView({ tutor, reviews, onBack, onOpenChat, onRateTutor, onViewRatings }: ClassDetailsViewProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'schedule' | 'tuition' | 'reviews'>('info');
  const [attendanceConfirmed, setAttendanceConfirmed] = useState(false);
  const [tuitionPaid, setTuitionPaid] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden my-6">
      {/* Header bar top */}
      <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="font-display font-bold text-lg text-gray-900">Chi tiết lớp học</h2>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => alert('Đã sao chép liên kết chia sẻ lớp học!')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <Share className="w-4.5 h-4.5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <MoreVertical className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-6">
        {/* Tutor Hero info card */}
        <section className="bg-gray-50 border border-gray-100 rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left relative">
          <div className="relative">
            <img src={tutor.avatar} alt={tutor.name} className="w-20 h-20 rounded-full object-cover border-2 border-blue-100 shadow-sm" />
            <div className="absolute bottom-0 right-0 bg-[#004f35] rounded-full p-1 border-2 border-white text-white">
              <ShieldCheck className="w-3.5 h-3.5 fill-[#60eeb1]" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold text-gray-900">ThS. {tutor.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{tutor.subject} &amp; Tư duy Logic</p>
            <div className="flex items-center justify-center sm:justify-start gap-1 mt-2.5">
              <span className="font-display text-lg font-bold text-orange-600">350.000đ</span>
              <span className="text-xs text-gray-400">/giờ</span>
            </div>
          </div>
        </section>

        {/* Tab navigations buttons */}
        <div className="border-b border-gray-100">
          <nav className="flex gap-6 overflow-x-auto no-scrollbar">
            {(['info', 'schedule', 'tuition', 'reviews'] as const).map((tab) => {
              const label =
                tab === 'info'
                  ? 'Thông tin'
                  : tab === 'schedule'
                  ? 'Lịch học'
                  : tab === 'tuition'
                  ? 'Học phí'
                  : 'Đánh giá';
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 text-sm font-semibold transition-all border-b-2 uppercase tracking-wide text-xs px-1 whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-[#0037b0] text-[#0037b0]'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Info tab panel viewport */}
        {activeTab === 'info' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Class schedule */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0037b0]" />
                <h4 className="font-display text-sm font-bold text-gray-800">Thời khóa biểu cố định</h4>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                <span className="text-sm font-semibold text-gray-600">Thứ 2, Thứ 4, Thứ 6</span>
                <span className="text-sm font-bold text-[#0037b0]">18:30 - 20:30</span>
              </div>
            </div>

            {/* Location or online details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#0037b0]" />
                <h4 className="font-display text-sm font-bold text-gray-800">Địa điểm / Hình thức học</h4>
              </div>
              <div className="bg-white border border-gray-100 p-4 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 text-[#0037b0] rounded-xl flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">Học trực tuyến qua phần mềm Google Meet</p>
                  <a
                    href="https://meet.google.com/abc-defg-hij"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#0037b0] underline font-medium mt-1 inline-block"
                  >
                    meet.google.com/abc-defg-hij
                  </a>
                </div>
              </div>
            </div>

            {/* Requirements list checklist */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#0037b0]" />
                <h4 className="font-display text-sm font-bold text-gray-800">Yêu cầu cụ thể lớp học</h4>
              </div>
              <div className="bg-white border border-gray-100 p-4 rounded-xl space-y-3">
                <div className="flex gap-2.5 items-start text-xs text-gray-600">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <p>Học viên cần chuẩn bị máy tính, webcam và microphone hoạt động ổn định.</p>
                </div>
                <div className="flex gap-2.5 items-start text-xs text-gray-600">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <p>Học viên tự ôn tập bài viết cũ 15 phút trước giờ vào buổi học chính.</p>
                </div>
                <div className="flex gap-2.5 items-start text-xs text-gray-600">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <p>Luôn hoàn thành đầy đủ bài viết luận được giao về nhà trên nền tảng.</p>
                </div>
              </div>
            </div>

            {/* Actions button */}
            <button
              onClick={onOpenChat}
              className="w-full py-3.5 bg-[#0037b0] hover:bg-blue-800 text-on-primary font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <MessageSquare className="w-4.5 h-4.5" />
              Nhắn tin trao đổi với gia sư
            </button>
          </div>
        )}

        {/* Schedule tab panel viewports */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-display text-sm font-bold text-gray-800">Hiện trạng lịch trình hiện tại</h4>
              <span className="text-[10px] bg-blue-50 text-[#0037b0] px-3 py-1 rounded-full font-bold">Thực hiện: 12/24 buổi</span>
            </div>

            {/* Live attendance confirm slot */}
            <div className="bg-[#0037b0] text-[#cad3ff] p-5 rounded-xl shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <RefreshCw className="w-24 h-24" />
              </div>
              <div className="mb-4">
                <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider block">Buổi học đề xuất điểm danh</span>
                <h3 className="font-display text-base font-bold text-white mt-1">Buổi 12: Đạo hàm bài viết nâng cao</h3>
                <p className="text-xs text-blue-100 mt-1 font-sans">Hôm nay, từ 18:30 - 20:30</p>
              </div>

              {attendanceConfirmed ? (
                <div className="w-full bg-emerald-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  Đã xác nhận điểm danh học thử thành công!
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setAttendanceConfirmed(true)}
                  className="w-full bg-white text-[#0037b0] hover:bg-blue-50 py-3 rounded-xl font-semibold text-xs active:scale-95 transition-transform shadow"
                >
                  Xác nhận điểm danh có mặt trong phòng học
                </button>
              )}
            </div>

            {/* Sessions list log */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wider px-1">Lịch sử bài học gần đây</h5>
              <div className="bg-gray-50 border border-gray-100 rounded-xl divide-y divide-gray-200/50 overflow-hidden text-xs">
                <div className="flex items-center justify-between p-3.5 opacity-60">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-400">OCT 20</span>
                    <span className="text-gray-700 font-semibold">Buổi 11: Ôn tập Giới hạn dãy số nâng cao</span>
                  </div>
                  <span className="text-emerald-700 font-bold">✓ Đã kiểm danh</span>
                </div>
                <div className="flex items-center justify-between p-3.5">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-500">OCT 30</span>
                    <span className="text-gray-800 font-bold">Buổi 13: Ứng dụng đạo hàm cực trị đồ thị</span>
                  </div>
                  <span className="text-gray-400 font-semibold">Chưa diễn ra</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tuition tab panel viewport */}
        {activeTab === 'tuition' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Tuition card billing */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Học phí tháng này</span>
                  <h3 className="font-display text-2xl font-bold text-gray-900 mt-1">1.400.000đ</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  tuitionPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {tuitionPaid ? 'ĐÃ ĐÓNG ĐẦY ĐỦ' : 'CHƯA THANH TOÁN'}
                </span>
              </div>

              {!tuitionPaid ? (
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTuitionPaid(true);
                      alert('Thanh toán qua ví MoMo thành công!');
                    }}
                    className="flex-1 bg-[#0037b0] hover:bg-blue-800 text-on-primary font-semibold py-3 rounded-xl text-xs active:scale-95 transition-transform"
                  >
                    Thanh toán số dư ngay lúc này
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTuitionPaid(true);
                      alert('Đã gửi thông báo xác nhận chuyển khoản cho quản trị viên rà soát!');
                    }}
                    className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold py-3 rounded-xl text-xs active:scale-95 transition-transform"
                  >
                    Tôi đã chuyển khoản bằng ngân hàng
                  </button>
                </div>
              ) : (
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-xs flex gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>Hóa đơn học phí tháng hiện tại đã được thanh toán hoàn chỉnh. Cám ơn sự tin tưởng của bạn!</p>
                </div>
              )}
            </div>

            {/* Billing items invoice history */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wider px-1">Lịch sử giao dịch đóng phí</h5>
              <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100 overflow-hidden text-xs">
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-800">Học phí tháng 09</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Ngày đóng: 02/09/2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-800">1.400.000đ</p>
                    <p className="text-[10px] text-emerald-700 font-semibold">✓ Đã tất toán hoàn toàn</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-800">Học phí tháng 08</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Ngày đóng: 05/08/2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-800">1.400.000đ</p>
                    <p className="text-[10px] text-emerald-700 font-semibold">✓ Đã tất toán hoàn toàn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews tab panel viewport */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-in fade-in duration-200 text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-blue-50/50 border border-blue-100/50 rounded-xl gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl border flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                  <Star className="w-6 h-6 fill-amber-500" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-gray-900">Đánh giá từ cộng đồng học viên</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Gia sư {tutor.name} có điểm trung bình là <strong className="text-orange-600 font-bold">{tutor.rating.toFixed(1)}/5.0</strong> ({tutor.reviewsCount || 0} đánh giá)
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onViewRatings(tutor.id)}
                  className="flex-1 sm:flex-initial px-4 py-2 border border-[#0037b0] text-[#0037b0] hover:bg-blue-50 font-bold text-xs rounded-xl whitespace-nowrap cursor-pointer"
                >
                  Xem chi tiết
                </button>
                <button
                  onClick={() => onRateTutor(tutor.id)}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-[#0037b0] hover:bg-blue-800 text-white font-bold text-xs rounded-xl whitespace-nowrap cursor-pointer"
                >
                  Viết đánh giá
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider px-1">Các nhận xét gần đây</h4>
              {reviews.filter(r => r.tutorId === tutor.id).length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed text-gray-400 text-xs">
                  Chưa có nhận xét nào được tải lên từ học viên. Hãy là người đầu tiên nhận xét!
                </div>
              ) : (
                <div className="space-y-3.5">
                  {reviews.filter(r => r.tutorId === tutor.id).map(r => (
                    <div key={r.id} className="p-4 bg-white border border-gray-100 rounded-xl space-y-2.5 shadow-2xs">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-gray-800">{r.anonymous ? 'Học viên ẩn danh' : 'Học viên hệ thống'}</span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{r.averageScore.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-sans">{r.feedback}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
