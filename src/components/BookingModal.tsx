/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Tutor } from '../types';
import { X, Calendar as CalendarIcon, Clock, Video, MapPin, Send, AlertTriangle } from 'lucide-react';

interface BookingModalProps {
  tutor: Tutor;
  onClose: () => void;
  onSubmit: (bookingData: {
    date: string;
    startTime: string;
    method: 'online' | 'offline';
    address?: string;
    notes?: string;
  }) => void;
}

export default function BookingModal({ tutor, onClose, onSubmit }: BookingModalProps) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [method, setMethod] = useState<'online' | 'offline'>('online');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !startTime) {
      alert('Vui lòng chọn ngày và giờ bắt đầu mong muốn.');
      return;
    }
    onSubmit({
      date,
      startTime,
      method,
      address: method === 'offline' ? address : undefined,
      notes
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-md">
        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl text-center space-y-4 animate-float">
          <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
            <Send className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-gray-900">Gửi yêu cầu thành công!</h3>
            <p className="text-gray-500 text-sm mt-2">
              Yêu cầu đặt chỗ của bạn đã được chuyển đến gia sư <strong>{tutor.name}</strong>. Gia sư sẽ phản hồi bạn trong thời gian sớm nhất qua hộp thư trò chuyện.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-[#0037b0] text-white py-3 rounded-xl font-semibold shadow-md active:scale-95 transition-transform"
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="text-center mb-6">
          <h2 className="font-display text-xl font-bold text-gray-900">Gửi yêu cầu đặt chỗ</h2>
          <p className="text-gray-500 text-xs mt-1">Xin vui lòng điền thông tin để thống nhất lịch học đầu tiên với gia sư.</p>
        </div>

        {/* Tutor Mini Card */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
            <img src={tutor.avatar} alt={tutor.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-display font-bold text-gray-900 text-sm truncate">{tutor.name}</h4>
            <p className="text-xs text-gray-500 truncate mt-0.5">{tutor.subject}</p>
          </div>
          <div className="text-right">
            <p className="text-[#0037b0] font-bold text-sm font-sans">{tutor.price.toLocaleString('vi-VN')}đ/h</p>
            <p className="text-[10px] text-gray-400">Học thử: 1 buổi</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date Pick */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700">Ngày mong muốn</label>
              <div className="relative flex items-center">
                <CalendarIcon className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#0037b0] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Time Pick */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700">Thời gian bắt đầu</label>
              <div className="relative flex items-center">
                <Clock className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#0037b0] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Formats */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700">Hình thức học</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMethod('online')}
                className={`py-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-semibold ${
                  method === 'online'
                    ? 'border-[#0037b0] bg-blue-50/50 text-[#0037b0]'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <Video className="w-4 h-4" />
                Học trực tuyến (Online)
              </button>
              <button
                type="button"
                onClick={() => setMethod('offline')}
                className={`py-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-semibold ${
                  method === 'offline'
                    ? 'border-[#0037b0] bg-blue-50/50 text-[#0037b0]'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Tại địa chỉ của tôi
              </button>
            </div>
          </div>

          {/* Offline Address Input */}
          {method === 'offline' && (
            <div className="space-y-1 animate-in slide-in-from-top-2 duration-150">
              <label className="block text-xs font-semibold text-gray-700">Địa chỉ cụ thể</label>
              <input
                type="text"
                placeholder="Nhập số nhà, tên đường, quận/huyện..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#0037b0] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                required={method === 'offline'}
              />
            </div>
          )}

          {/* Notes */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700">Ghi chú cho gia sư</label>
            <textarea
              placeholder="Mô tả mức học lực hiện tại hoặc yêu cầu đặc biệt học cùng gia sư..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#0037b0] focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
            />
          </div>

          {/* Security alert footnote */}
          <div className="flex gap-3 bg-amber-50/70 p-3 rounded-xl border border-amber-200/50 text-[11px] text-amber-800 leading-normal">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Hệ thống tự động ẩn số điện thoại và email để bảo mật thông tin tối đa. Vui lòng giao tiếp qua khung Chat an toàn của Academic Confidence.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-semibold border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl active:scale-95 transition-transform"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex-1 py-3 text-sm font-semibold bg-[#0037b0] hover:bg-[#1d4ed8] text-white rounded-xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1.5"
            >
              Gửi yêu cầu
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
