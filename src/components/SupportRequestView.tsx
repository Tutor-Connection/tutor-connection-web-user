/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SupportTicket } from '../types';
import { ArrowLeft, HelpCircle, AlertOctagon, UploadCloud, Send, File, Clock, BadgeAlert, Sparkles, CheckCircle } from 'lucide-react';

interface SupportRequestViewProps {
  onBack: () => void;
  onSubmit: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => void;
  existingTickets: SupportTicket[];
}

export default function SupportRequestView({ onBack, onSubmit, existingTickets }: SupportRequestViewProps) {
  const [category, setCategory] = useState('Chất lượng giảng dạy');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files).map((f: File) => f.name);
      setFiles([...files, ...droppedFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = Array.from(e.target.files).map((f: File) => f.name);
      setFiles([...files, ...selectedFiles]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Vui lòng cung cấp tiêu đề và mô tả sự cố.');
      return;
    }
    onSubmit({
      category,
      title,
      description,
      files
    });
    setTitle('');
    setDescription('');
    setFiles([]);
    setAlertSuccess(true);
    setTimeout(() => {
      setAlertSuccess(false);
    }, 4000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden my-6">
      {/* Top action header bar */}
      <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="font-display font-bold text-lg text-gray-900">Yêu cầu cứu hộ &amp; Hỗ trợ</h2>
        </div>
        <span className="text-xs text-orange-600 font-bold flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-orange-500 fill-orange-100 animate-pulse" />
          Hỗ trợ 24/7
        </span>
      </div>

      <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-8">
        {/* Banner guide info */}
        <section className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-4 text-xs">
          <HelpCircle className="w-6 h-6 text-[#0037b0] shrink-0 mt-0.5" />
          <div className="space-y-1.5 leading-relaxed text-blue-950">
            <h4 className="font-bold text-sm">Gửi yêu cầu hỗ trợ / Phản ánh khiếu nại chất lượng học</h4>
            <p className="text-blue-900">
              Có sự cố với buổi học thử? Bạn cảm thấy gia sư giảng dạy không đúng năng lực, hành xử thiếu sư phạm hoặc lịch trình học không được đảm bảo? Hãy tạo ticket ngay dưới đây. Đội ngũ Tư vấn viên Học vụ sẽ lập tức liên hệ giải quyết trực tiếp trong vòng 2 giờ làm việc.
            </p>
          </div>
        </section>

        {alertSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex gap-3 animate-in fade-in duration-300">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold">Gửi ticket cứu hộ học tập thành công!</h5>
              <p className="text-emerald-700 mt-1">Đội ngũ Học vụ của Academic Confidence đã ghim hồ sơ và đang kiểm chứng xử lý khẩn cấp sự cố của bạn.</p>
            </div>
          </div>
        )}

        {/* Form container */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700">Danh mục hỗ trợ sự cố</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:border-[#0037b0] outline-none transition-all"
              >
                <option value="Chất lượng giảng dạy">Chất lượng giảng dạy tệ</option>
                <option value="Lịch học sai biệt">Lịch học sai biệt, đi muộn</option>
                <option value="Học phí &amp; Thanh toán">Lỗi học phí &amp; Thanh toán</option>
                <option value="Xói mòn hành xử sư phạm">Thái độ kì quặc của gia sư</option>
                <option value="Phần mềm &amp; Kỹ thuật">Lỗi kỹ thuật, Zoom/Meet</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700 flex items-center gap-1">
                <AlertOctagon className="w-3.5 h-3.5 text-red-500" />
                Tiêu đề sự cố ngắn ngọn
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Lớp Thầy Hoàng đi muộn 3 lần liên tiếp..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:border-[#0037b0] outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700">Mô tả và trần thuật sự việc chi tiết</label>
            <textarea
              placeholder="Vui lòng thuật lại chi tiết thời điểm, hành vi xảy ra để ban giám sát có thông tin đầy đủ đối phác xử lý..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:border-[#0037b0] outline-none transition-all resize-none leading-relaxed"
              required
            />
          </div>

          {/* Drag & drop file uploads */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700">Tải lên tệp ảnh minh chứng (nếu có)</label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                dragOver
                  ? 'border-[#0037b0] bg-blue-50/50'
                  : 'border-gray-200 hover:border-blue-400 bg-gray-50/30'
              }`}
            >
              <label className="cursor-pointer block">
                <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2 animate-bounce" />
                <p className="text-xs font-bold text-gray-800">Kéo thả ảnh chụp màn hình sự cố vào đây</p>
                <p className="text-[10px] text-gray-400 mt-1">hoặc click để duyệt tệp ảnh trên thiết bị của bạn</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>

            {/* Selected files indicator list */}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 animate-in slide-in-from-top-2">
                {files.map((f, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold">
                    <File className="w-3.5 h-3.5 text-gray-400" />
                    {f}
                    <button
                      type="button"
                      onClick={() => setFiles(files.filter((_, fIdx) => fIdx !== idx))}
                      className="hover:bg-gray-200 rounded-full w-4.5 h-4.5 flex items-center justify-center text-xs text-gray-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Action button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-red-650 hover:bg-red-700 text-white bg-red-700 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Send className="w-4 h-4" />
            Nộp ticket khiếu nại khẩn cấp
          </button>
        </form>

        {/* Existing tickets list space index logs track */}
        <div className="space-y-4 pt-6 border-t border-gray-100">
          <h4 className="font-display text-sm font-bold text-gray-800">Lịch sử ticket phân nhánh cứu hộ của bạn</h4>
          
          {existingTickets.length === 0 ? (
            <div className="text-center py-6 border border-dashed border-gray-100 rounded-xl bg-gray-50/20">
              <Clock className="w-8 h-8 text-gray-300 mx-auto mb-1.5" />
              <p className="text-xs text-gray-400 font-semibold">Tươi sáng! Bạn chưa phát sinh bất kỳ khiếu nại nào.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {existingTickets.map((tk) => (
                <div key={tk.id} className="bg-white border border-gray-100 p-4 rounded-xl flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <BadgeAlert className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="flex justify-between items-center gap-2">
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase">{tk.category}</span>
                      <span className="text-[10px] text-gray-400">{tk.createdAt}</span>
                    </div>
                    <h5 className="font-bold text-gray-900 mt-1 truncate">{tk.title}</h5>
                    <p className="text-gray-500 text-[11px] leading-relaxed mt-1 whitespace-pre-wrap">{tk.description}</p>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-gray-50 mt-3">
                      <span className="text-[10px] text-gray-400 font-semibold">{tk.files.length} đính kèm minh chứng</span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        tk.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800 animate-pulse'
                      }`}>
                        {tk.status === 'resolved' ? 'Đã giải quyết khép kín' : 'Đang điều tra xem xét'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
