/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, BookOpen, Heart, Landmark, Lock, Moon, Globe, ShieldCheck, HelpCircle, LogOut, Verified, Star, CheckCircle, Save } from 'lucide-react';

interface ProfileSettingsViewProps {
  profile: UserProfile;
  onChangeProfile: (updated: UserProfile) => void;
  onNavigateToView: (viewName: string) => void;
}

export default function ProfileSettingsView({ profile, onChangeProfile, onNavigateToView }: ProfileSettingsViewProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'academic'>('profile');
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [level, setLevel] = useState(profile.level);
  const [budget, setBudget] = useState(profile.budget);
  const [target, setTarget] = useState(profile.target);
  const [parentName, setParentName] = useState(profile.parentName);
  const [parentPhone, setParentPhone] = useState(profile.parentPhone);
  const [darkMode, setDarkMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onChangeProfile({
        ...profile,
        name,
        email,
        level,
        budget,
        target,
        parentName,
        parentPhone
      });
      setSaving(false);
      alert('Đã cập nhật hồ sơ thông tin cá nhân và học tập thành công!');
    }, 1000);
  };

  const handleToggleSubject = (subject: string) => {
    const list = profile.supportSubjects.includes(subject)
      ? profile.supportSubjects.filter(s => s !== subject)
      : [...profile.supportSubjects, subject];
    onChangeProfile({
      ...profile,
      supportSubjects: list
    });
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher info */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'profile'
              ? 'border-[#0037b0] text-[#0037b0]'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Cài đặt tổng quan
        </button>
        <button
          onClick={() => setActiveTab('academic')}
          className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'academic'
              ? 'border-[#0037b0] text-[#0037b0]'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Hồ sơ học tập chi tiết
        </button>
      </div>

      {activeTab === 'profile' ? (
        <div className="space-y-6">
          {/* Profile overview card */}
          <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-4 border-blue-50 overflow-hidden shadow-md">
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <h2 className="font-display text-lg font-bold text-gray-900 mt-4">{profile.name}</h2>
            <p className="text-xs text-gray-500 mt-1">{profile.email}</p>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold">
                <Verified className="w-3.5 h-3.5" />
                Đã học 15 lớp
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-800 rounded-full text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                Top 5% Xuất Sắc
              </div>
            </div>
          </section>

          {/* Group 1: Account options */}
          <div className="space-y-3">
            <p className="px-1 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Tài khoản &amp; Học tập</p>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden shadow-sm">
              <button
                onClick={() => {
                  setName(profile.name);
                  setEmail(profile.email);
                  setActiveTab('profile');
                  alert('Bạn đang ở tab Cài đặt tổng quan. Bạn có thể sửa trực tiếp tên, email bên dưới.');
                }}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-[#0037b0] flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Thông tin cá nhân</span>
                </div>
                <span className="text-xs text-gray-400 group-hover:translate-x-1 transition-transform">✓ Đang dùng</span>
              </button>

              <button
                onClick={() => setActiveTab('academic')}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/50 transition-colors group"
                id="academic-profile-btn"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Hồ sơ học tập</span>
                </div>
                <span className="text-xs text-[#0037b0] group-hover:translate-x-1 transition-transform font-bold">Quản lý</span>
              </button>

              <button
                onClick={() => onNavigateToView('search')}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Gia sư yêu thích</span>
                </div>
                <span className="text-xs text-gray-400 group-hover:translate-x-1 transition-transform">Xem danh sách</span>
              </button>
            </div>
          </div>

          {/* Group 2: System Settings */}
          <div className="space-y-3">
            <p className="px-1 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Hệ thống &amp; Bảo mật</p>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-3.5 group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Phương thức thanh toán</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Chức năng liên kết ví MOMO, ShopeePay, hoặc Ví ngân hàng sẽ được cập nhật trong phiên bản chính thức!')}
                  className="text-xs text-[#0037b0] font-bold border border-blue-200 px-3 py-1 rounded-lg hover:bg-blue-50"
                >
                  Liên kết
                </button>
              </div>

              <div className="flex items-center justify-between px-4 py-3.5 group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Đổi mật khẩu</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Mật khẩu của bạn được quản lý bởi Google OAuth của hệ thống AI Studio.')}
                  className="text-xs text-gray-400 font-medium"
                >
                  Xem
                </button>
              </div>

              <div className="flex items-center justify-between px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Moon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Chế độ tối</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => {
                      setDarkMode(e.target.checked);
                      document.documentElement.classList.toggle('dark', e.target.checked);
                      alert(e.target.checked ? 'Đã bật Chế độ tối giả lập!' : 'Đã quay về Chế độ sáng!');
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0037b0]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between px-4 py-3.5 group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Ngôn ngữ</p>
                    <p className="text-[10px] text-gray-400">Tiếng Việt (VN)</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-sans">Mặc định</span>
              </div>
            </div>
          </div>

          {/* edit general contact profile info */}
          <div class="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 space-y-md">
            <h3 class="font-h3 text-h3 text-on-surface">Cập nhật thông tin nhanh</h3>
            <div class="space-y-md">
              <div class="space-y-xs">
                <label class="font-body-sm text-on-surface-variant block px-xs">Email liên hệ</label>
                <input 
                  type="email" 
                  className="w-full px-md py-sm bg-white border border-outline-variant rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary-fixed/20 font-body-reg transition-all"
                  value={email}
                  onChange={(e) => {}}
                  disabled
                />
              </div>
              <div class="space-y-xs">
                <label className="font-body-sm text-on-surface-variant block px-xs">Tên hiển thị</label>
                <input 
                  type="text" 
                  className="w-full px-md py-sm bg-white border border-outline-variant rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary-fixed/20 font-body-reg transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full py-3 bg-[#0037b0] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                Lưu cài đặt hiển thị
              </button>
            </div>
          </div>

          {/* Group 3: Help terms */}
          <div className="space-y-3">
            <p className="px-1 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Khác</p>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden shadow-sm">
              <button
                onClick={() => alert('Điều khoản dịch vụ bảo mật thông tin chuẩn mực giáo dục thuộc Academic Confidence.')}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Điều khoản dịch vụ</span>
                </div>
                <span className="text-xs text-gray-400 group-hover:translate-x-1 transition-transform">Xem PDF</span>
              </button>

              <button
                onClick={() => onNavigateToView('support')}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/50 transition-colors group"
                id="support-ticket-btn"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Hỗ trợ / Tạo ticket cứu hộ</span>
                </div>
                <span className="text-xs text-[#0037b0] group-hover:translate-x-1 transition-transform font-bold">Gửi yêu cầu</span>
              </button>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={() => {
              alert('Đã đăng xuất khỏi phiên làm việc thành công!');
              onNavigateToView('home');
            }}
            className="w-full bg-red-50 hover:bg-red-100 text-red-700 py-3.5 rounded-xl border border-red-100 transition-all font-bold text-sm tracking-wide flex items-center justify-center gap-2 active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất khỏi hệ thống
          </button>

          {/* App Version stamp */}
          <div className="text-center py-4 space-y-1">
            <p className="text-[10px] text-gray-400 font-semibold tracking-wide">Phiên bản 2.4.1 (Build 820)</p>
            <p className="text-[10px] text-gray-400">Academic Confidence © 2026. All Rights Reserved.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Academic Info Tab */}
          <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5 animate-in slide-in-from-bottom-3">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
              <BookOpen className="w-5 h-5 text-[#0037b0]" />
              <h3 className="font-display font-bold text-sm text-gray-900">Chi tiết Hồ sơ học tập học viên</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-500 px-1">Lớp hiện tại</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:border-[#0037b0] outline-none"
                >
                  <option value="Lớp 10">Lớp 10</option>
                  <option value="Lớp 11">Lớp 11</option>
                  <option value="Lớp 12">Lớp 12</option>
                  <option value="Đại học">Sinh viên Đại học</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-500 px-1">Ngân sách (VND / buổi tối đa)</label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full pl-3 pr-12 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:border-[#0037b0] outline-none"
                  />
                  <span className="absolute right-3 text-[10px] font-bold text-gray-400">VND</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-500 px-1">Mục tiêu học tập</label>
              <textarea
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:border-[#0037b0] outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Support Subjects chips */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-500 px-1">Môn học cần hỗ trợ</label>
              <div className="flex flex-wrap gap-1.5">
                {['Toán', 'Anh Văn', 'Lý', 'Hóa', 'Văn', 'Sinh'].map((sub) => {
                  const isActive = profile.supportSubjects.includes(sub);
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => handleToggleSubject(sub)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-blue-100/80 text-[#0037b0]'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                      }`}
                    >
                      {sub} {isActive ? '×' : '+'}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Parental contact card info */}
          <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
              <Globe className="w-5 h-5 text-[#0037b0]" />
              <h3 className="font-display font-bold text-sm text-gray-900">Liên hệ Phụ huynh / Bảo trợ</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-500 px-1">Họ tên phụ huynh</label>
                <input
                  type="text"
                  placeholder="Nhập tên bố/mẹ..."
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:border-[#0037b0] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-500 px-1">Số điện thoại liên hệ</label>
                <input
                  type="tel"
                  placeholder="090x xxx xxx..."
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:border-[#0037b0] outline-none"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3.5 bg-[#0037b0] hover:bg-blue-800 text-on-primary font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            {saving ? (
              'Đang cập nhật...'
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Lưu thông tin hồ sơ học tập
              </>
            )}
          </button>
          <p className="text-[10px] text-gray-400 font-sans text-center italic">
            Thông tin học tập của học viên được lưu trữ an tâm tuyệt đối theo tiêu chuẩn chính sách bảo mật Academic Confidence.
          </p>
        </div>
      )}
    </div>
  );
}
