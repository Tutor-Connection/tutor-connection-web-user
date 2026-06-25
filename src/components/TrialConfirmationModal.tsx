/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Tutor } from '../types';
import { ShieldAlert, BookOpen, Ban, BadgeCheck, X, CheckSquare, MessageSquare } from 'lucide-react';

interface TrialConfirmationModalProps {
  tutor: Tutor;
  onClose: () => void;
  onConfirm: (feedback?: string) => void;
}

export default function TrialConfirmationModal({ tutor, onClose, onConfirm }: TrialConfirmationModalProps) {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [success, setSuccess] = useState<'approved' | 'rejected' | null>(null);

  const handleApprove = () => {
    onConfirm();
    setSuccess('approved');
  };

  const handleReject = () => {
    onConfirm(rejectReason || 'Không phù hợp mục tiêu học tập');
    setSuccess('rejected');
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-md">
        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl text-center space-y-4 animate-float">
          <div className="w-16 h-16 bg-blue-50 text-[#0037b0] rounded-full flex items-center justify-center mx-auto">
            <BadgeCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-gray-900">Ghi nhận quyết định thành công!</h3>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              {success === 'approved' ? (
                <span>Cơ sở dữ liệu của chúng tôi đã cập nhật để kích hoạt giáo án chính thức có học phí cùng gia sư <strong>{tutor.name}</strong>.</span>
              ) : (
                <span>Hệ thống đã hủy bỏ yêu cầu học và lưu trữ đóng góp cải thiện dịch vụ của bạn dành cho Academic Confidence.</span>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-[#0037b0] text-[#ffffff] py-3 rounded-xl font-semibold shadow-md active:scale-95 transition-transform"
          >
            Quay lại bàng điều khiển
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Big circular verified gear icon */}
        <div className="text-center space-y-3 mb-5">
          <span className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 text-[#0037b0] rounded-full">
            <BadgeCheck className="w-7 h-8 text-[#0037b0]" />
          </span>
          <h1 className="font-display text-lg font-bold text-gray-900">Xác nhận học thử lớp học</h1>
          <p className="text-xs text-gray-400 leading-relaxed px-4">
            Vui lòng xem lại chất lượng học thử sau 1 buổi để thống nhất đưa ra quyết định tiếp tục lộ trình cùng học.
          </p>
        </div>

        {/* Tutor Mini display profile */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 shrink-0">
            <img src={tutor.avatar} alt={tutor.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-xs text-gray-900">Gia sư: ThS. {tutor.name}</h3>
            <div className="flex items-center gap-1.5 text-gray-500 text-[10px] mt-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Môn học: Toán Giải Tích Cao Cấp</span>
            </div>
          </div>
          <div className="bg-blue-100 text-[#0037b0] px-2.5 py-1 rounded-lg text-[10px] font-bold shrink-0">
            Đã học thử: 1 buổi
          </div>
        </div>

        {/* Key central question query prompt */}
        <div className="py-4 text-center">
          <p className="font-display text-sm font-semibold text-[#0037b0] leading-snug">
            Bạn có hài lòng và mong muốn tiếp tục lộ trình học chính thức lâu dài với gia sư này không?
          </p>
        </div>

        {/* Rejection conditional display reasons text-box form block */}
        {showRejectForm && (
          <div className="mb-4 flex flex-col gap-1.5 animate-in slide-in-from-top-4 duration-300">
            <label className="text-xs font-bold text-gray-600" htmlFor="reject-textarea">Lý do từ chối không tiếp tục học (tùy chọn)</label>
            <textarea
              id="reject-textarea"
              placeholder="Vui lòng chia sẻ cảm nhận đóng góp cụ thể về bài giảng học thử vừa qua..."
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 text-xs px-3 py-2 text-gray-700 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100"
            />
          </div>
        )}

        {/* Actions buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={showRejectForm ? handleReject : () => setShowRejectForm(true)}
            className={`flex items-center justify-center gap-1.5 font-bold py-3 rounded-xl border text-xs active:scale-95 transition-all ${
              showRejectForm
                ? 'bg-red-600 text-white border-red-600 hover:bg-red-700'
                : 'bg-white text-red-600 border-red-200 hover:bg-red-50/50'
            }`}
          >
            {showRejectForm ? (
              <>
                <Ban className="w-4 h-4" />
                Xác nhận kết thúc
              </>
            ) : (
              <>
                <X className="w-4 h-4" />
                Kết thúc tại đây
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleApprove}
            className="flex items-center justify-center gap-1.5 bg-[#0037b0] hover:bg-[#1d4ed8] text-white font-bold py-3 rounded-xl text-xs active:scale-95 transition-transform"
          >
            <CheckSquare className="w-4 h-4" />
            Đồng ý học chính thức lâu dài
          </button>
        </div>

        {/* Warning footnote alert notice */}
        <div className="flex items-start gap-2.5 bg-blue-50/60 p-3 rounded-xl border-l-4 border-[#0037b0] text-[11px] text-gray-500 leading-normal">
          <ShieldAlert className="w-4 h-4 text-[#0037b0] shrink-0 mt-0.5" />
          <p>
            Sau khi ấn xác nhận &ldquo;Đồng ý học chính thức&rdquo;, bạn sẽ thống nhất bắt đầu chịu mức đóng học phí theo số buổi thỏa thuận. Hệ thống tự động thiết lập lịch cố định hàng tuần trên thời khóa biểu.
          </p>
        </div>
      </div>
    </div>
  );
}
