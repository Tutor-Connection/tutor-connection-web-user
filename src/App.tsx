/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Tutor, BookingRequest, UserPost, ChatThread, AppNotification, UserProfile, SupportTicket, Review } from './types';
import {
  INITIAL_TUTORS,
  INITIAL_POSTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CHATS,
  INITIAL_PROFILE,
  INITIAL_REVIEWS
} from './data';

// Import modular screens
import BookingModal from './components/BookingModal';
import CreatePostView from './components/CreatePostView';
import ChatDetailView from './components/ChatDetailView';
import ProfileSettingsView from './components/ProfileSettingsView';
import ClassDetailsView from './components/ClassDetailsView';
import TrialConfirmationModal from './components/TrialConfirmationModal';
import SupportRequestView from './components/SupportRequestView';
import RatingsExploreView from './components/RatingsExploreView';
import RatingsTutorDetailsView from './components/RatingsTutorDetailsView';
import RatingsRateTutorForm from './components/RatingsRateTutorForm';

// Icons
import {
  Search,
  SlidersHorizontal,
  Bell,
  MessageSquare,
  Sparkles,
  BookOpen,
  User,
  Plus,
  Compass,
  ArrowRight,
  MapPin,
  Clock,
  Video,
  FileText,
  BadgeAlert,
  Star,
  CheckCircle,
  HelpCircle,
  Phone,
  Bookmark,
  ChevronRight,
  Menu,
  X,
  PlusCircle,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  // State
  const [tutors, setTutors] = useState<Tutor[]>(INITIAL_TUTORS);
  const [posts, setPosts] = useState<UserPost[]>(INITIAL_POSTS);
  const [chats, setChats] = useState<ChatThread[]>(INITIAL_CHATS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedTutorForRatingId, setSelectedTutorForRatingId] = useState<string>('tutor-1');
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 'ticket-1',
      category: 'Phần mềm & Kỹ thuật',
      title: 'Không thể truy cập link Google Meet của gia sư Thầy Hoàng',
      description: 'Lúc 18h30 ngày 15/10, đường truyền lỗi không thể tham gia lớp học thử Toán Cao cấp. Yêu cầu hỗ trợ dọn dẹp phòng chat.',
      files: ['screenshot_error.png'],
      status: 'resolved',
      createdAt: '15/10/2023'
    }
  ]);

  // Seeding initial simulated bookings
  const [bookings, setBookings] = useState<BookingRequest[]>([
    {
      id: 'bk-1',
      tutorId: 'tutor-12',
      tutorName: 'Lê Minh Anh',
      tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmiml7YPfvw3jn8nygMT9GChsNEcelx3FUY6Mozb5bC2TR7tmuhZfRuZjrmi19OCP43w2T1l2jDMR7FoDHfRpXy6xJBMmbCAFajHDdZB-PSYG9tESPAdiDovUmziAeM7J-AHkLQcx7lImxcE3nAwnjyEO2iVWmodhvArOAq70b8vcDvrFiIRMEJUOI4Y-F6JvWS_C68O-ZRIAMqf1j-yypS4gDljOqlK8aM-zUXNSxfBWBEKhnvpkjWAcJ6KkAIhJ1Avo4ARv_5g',
      tutorPrice: 450000,
      date: '2026-06-25',
      startTime: '19:00',
      method: 'online',
      status: 'pending',
      createdAt: '18/06/2026'
    }
  ]);

  // Navigation
  const [activeView, setActiveView] = useState<
    'home' | 'search' | 'posts' | 'chats' | 'notifications' | 'profile' | 'create-post' | 'class-details' | 'support' | 'ratings-explore' | 'ratings-details' | 'ratings-rate'
  >('home');

  // Load and cache ratings state gracefully
  useEffect(() => {
    const cachedTutors = localStorage.getItem('ac_tutors_list');
    const cachedReviews = localStorage.getItem('ac_reviews_list');

    if (cachedTutors) {
      setTutors(JSON.parse(cachedTutors));
    } else {
      localStorage.setItem('ac_tutors_list', JSON.stringify(INITIAL_TUTORS));
    }

    if (cachedReviews) {
      setReviews(JSON.parse(cachedReviews));
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('ac_reviews_list', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Tất cả');
  const [selectedGender, setSelectedGender] = useState<'Nam' | 'Nữ' | 'Tất cả'>('Tất cả');
  const [selectedFormat, setSelectedFormat] = useState<'Online' | 'Tại nhà' | 'Tất cả'>('Tất cả');
  const [priceLimit, setPriceLimit] = useState<number>(600000);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  // Focus detail selected cards
  const [selectedTutorDetail, setSelectedTutorDetail] = useState<Tutor | null>(null);
  const [bookingTutor, setBookingTutor] = useState<Tutor | null>(null);
  const [trialTutor, setTrialTutor] = useState<Tutor | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [selectedClassTutor, setSelectedClassTutor] = useState<Tutor | null>(null);

  // State bookmarked / saved tutors
  const [savedTutorIds, setSavedTutorIds] = useState<string[]>(['tutor-1', 'tutor-2']);

  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Subject quick filters list
  const SUBJECTS = ['Tất cả', 'Toán học', 'Vật lý', 'Hóa học', 'Tiếng Anh', 'Ngữ văn', 'Tin học'];

  // Handle actions
  const handleToggleBookmark = (id: string) => {
    if (savedTutorIds.includes(id)) {
      setSavedTutorIds(savedTutorIds.filter(t => t !== id));
    } else {
      setSavedTutorIds([...savedTutorIds, id]);
    }
  };

  const handleBookingSubmit = (data: {
    date: string;
    startTime: string;
    method: 'online' | 'offline';
    address?: string;
    notes?: string;
  }) => {
    if (!bookingTutor) return;
    const newBooking: BookingRequest = {
      id: 'bk-' + Date.now(),
      tutorId: bookingTutor.id,
      tutorName: bookingTutor.name,
      tutorAvatar: bookingTutor.avatar,
      tutorPrice: bookingTutor.price,
      date: data.date,
      startTime: data.startTime,
      method: data.method,
      address: data.address,
      notes: data.notes,
      status: 'pending',
      createdAt: new Date().toLocaleDateString('vi-VN')
    };
    setBookings([newBooking, ...bookings]);

    // Send a notification simulation
    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title: 'Đăng ký học thử',
      type: 'schedule',
      time: 'Vừa xong',
      text: `Bạn đã gửi yêu cầu đặt lịch học thử với gia sư ${bookingTutor.name} vào ngày ${data.date} lúc ${data.startTime}.`,
      unread: true
    };
    setNotifications([newNotif, ...notifications]);

    // Auto add chat thread or append message
    const threadExists = chats.find(t => t.tutorId === bookingTutor.id);
    if (!threadExists) {
      const newThread: ChatThread = {
        id: 'chat-' + Date.now(),
        tutorId: bookingTutor.id,
        tutorName: bookingTutor.name,
        tutorAvatar: bookingTutor.avatar,
        status: 'Học thử',
        lastMessage: 'Đã gửi yêu cầu đăng ký lịch hẹn học thử.',
        lastMessageTime: 'Vừa xong',
        messages: [
          {
            id: 'm-init',
            sender: 'user',
            text: `Chào gia sư, em đã gửi yêu cầu học thử vào ngày ${data.date} lúc ${data.startTime}. Mong anh/chị xem và phản hồi sớm ạ! Thêm ghi chú: "${data.notes || 'Không có ghi chú'}"`,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };
      setChats([newThread, ...chats]);
    }
  };

  const handleCreatePost = (newPost: Omit<UserPost, 'id' | 'createdAt' | 'applicantsCount'>) => {
    const postItem: UserPost = {
      id: 'post-' + Date.now(),
      ...newPost,
      createdAt: new Date().toLocaleDateString('vi-VN'),
      applicantsCount: 0
    };
    setPosts([postItem, ...posts]);
  };

  const handleSupportSubmit = (newTicket: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => {
    const ticketItem: SupportTicket = {
      id: 'ticket-' + Date.now(),
      ...newTicket,
      createdAt: new Date().toLocaleDateString('vi-VN'),
      status: 'pending'
    };
    setSupportTickets([ticketItem, ...supportTickets]);
  };

  const handleTrialConfirmation = (feedback?: string) => {
    if (!trialTutor) return;
    // Add real-time notification update
    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title: 'Xác nhận phản hồi học thử',
      type: 'system',
      time: 'Vừa xong',
      text: feedback
        ? `Đã khép lại yêu cầu học cùng gia sư ${trialTutor.name}. Trân quý đóng góp ý kiến: "${feedback}".`
        : `Lớp học cùng gia sư ${trialTutor.name} đã được chính thức kích hoạt chuyển giao hành trình học tập.`,
      unread: true
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleUpdateThread = (updated: ChatThread) => {
    setChats(chats.map(c => (c.id === updated.id ? updated : c)));
  };

  const handleAddReview = (newReviewContent: Omit<Review, 'id' | 'ratingDate'>) => {
    const nextReview: Review = {
      ...newReviewContent,
      id: `rev-${Date.now()}`,
      ratingDate: new Date().toISOString()
    };

    const updatedReviews = [nextReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('ac_reviews_list', JSON.stringify(updatedReviews));

    const updatedTutors = tutors.map(tutor => {
      if (tutor.id === nextReview.tutorId) {
        const tutorReviews = updatedReviews.filter(r => r.tutorId === tutor.id);
        const initialReviewsCount = tutor.reviewsCount || 0;
        const totalCount = initialReviewsCount + 1;
        const userReviewsSum = tutorReviews.reduce((sum, r) => sum + r.averageScore, 0);
        const initialSum = (tutor.rating || 0) * initialReviewsCount;
        const newAverage = totalCount > 0 ? (initialSum + userReviewsSum) / totalCount : 0;

        return {
          ...tutor,
          rating: Number(newAverage.toFixed(1)),
          reviewsCount: totalCount
        };
      }
      return tutor;
    });

    setTutors(updatedTutors);
    localStorage.setItem('ac_tutors_list', JSON.stringify(updatedTutors));
  };

  // Filter computation
  const filteredTutors = tutors.filter((t) => {
    const matchQuery =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.bio && t.bio.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchSubject = selectedSubject === 'Tất cả' || t.subject.includes(selectedSubject);
    const matchGender = selectedGender === 'Tất cả' || t.gender === selectedGender;
    const matchFormat =
      selectedFormat === 'Tất cả' ||
      t.format.includes(selectedFormat as 'Online' | 'Tại nhà');
    const matchPrice = t.price <= priceLimit;

    return matchQuery && matchSubject && matchGender && matchFormat && matchPrice;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-[#0037b0] selection:text-white" id="main-app-container">
      {/* Visual top background blob gradients */}
      <div className="absolute top-0 inset-x-0 h-[380px] bg-gradient-to-b from-[#e9edff] via-slate-50 to-transparent pointer-events-none -z-10"></div>

      {/* Primary header bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm" id="main-header">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveView('home')}>
            <div className="w-10 h-10 rounded-xl bg-[#0037b0] text-white flex items-center justify-center shadow-lg shadow-blue-500/10">
              <Sparkles className="w-5.5 h-5.5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="font-display font-black text-base text-gray-900 tracking-tight flex items-center gap-1.5 leading-none">
                Tutor Match 
                <span className="text-[10px] bg-blue-100 text-[#0037b0] px-1.5 py-0.5 rounded-full font-bold">PRO</span>
              </h1>
              <p className="text-[9px] text-[#0037b0] font-bold font-sans tracking-widest uppercase mt-1">ACADEMIC CONFIDENCE</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-bold text-gray-500">
            <button
              onClick={() => setActiveView('home')}
              className={`transition-all hover:text-[#0037b0] relative py-1 ${
                activeView === 'home' || activeView === 'search' ? 'text-[#0037b0]' : ''
              }`}
              id="nav-home"
            >
              Gia sư xuất sắc
              {(activeView === 'home' || activeView === 'search') && (
                <span className="absolute bottom-0 inset-x-2 h-0.5 bg-[#0037b0] rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setActiveView('posts')}
              className={`transition-all hover:text-[#0037b0] relative py-1 ${
                activeView === 'posts' || activeView === 'create-post' ? 'text-[#0037b0]' : ''
              }`}
              id="nav-posts"
            >
              Yêu cầu &amp; Đăng tin
              {(activeView === 'posts' || activeView === 'create-post') && (
                <span className="absolute bottom-0 inset-x-2 h-0.5 bg-[#0037b0] rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setActiveView('ratings-explore')}
              className={`transition-all hover:text-[#0037b0] relative py-1 ${
                activeView.startsWith('ratings-') ? 'text-[#0037b0]' : ''
              }`}
              id="nav-ratings"
            >
              Đánh giá gia sư
              {activeView.startsWith('ratings-') && (
                <span className="absolute bottom-0 inset-x-2 h-0.5 bg-[#0037b0] rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setActiveView('chats')}
              className={`transition-all hover:text-[#0037b0] relative py-1 flex items-center gap-1.5 ${
                activeView === 'chats' ? 'text-[#0037b0]' : ''
              }`}
              id="nav-chats"
            >
              Hộp thư cứu cánh
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              {activeView === 'chats' && (
                <span className="absolute bottom-0 inset-x-2 h-0.5 bg-[#0037b0] rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setActiveView('profile')}
              className={`transition-all hover:text-[#0037b0] relative py-1 ${
                activeView === 'profile' || activeView === 'support' ? 'text-[#0037b0]' : ''
              }`}
              id="nav-profile"
            >
              Học viên &amp; Cài đặt
              {(activeView === 'profile' || activeView === 'support') && (
                <span className="absolute bottom-0 inset-x-2 h-0.5 bg-[#0037b0] rounded-full"></span>
              )}
            </button>
          </nav>

          {/* Quick Right corner actions */}
          <div className="flex items-center gap-3">
            {/* Notifications Alert Bell */}
            <button
              onClick={() => setActiveView('notifications')}
              className={`relative p-2.5 bg-gray-50 border border-gray-100 rounded-xl transition-all hover:bg-gray-100 ${
                activeView === 'notifications' ? 'bg-blue-50 text-[#0037b0] border-blue-200' : 'text-gray-500'
              }`}
              id="bell-notification-btn"
            >
              <Bell className="w-[18px] h-[18px]" />
              {notifications.some((n) => n.unread) && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
              )}
            </button>

            {/* Quick Create Class post btn button */}
            <button
              onClick={() => setActiveView('create-post')}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-[#0037b0] hover:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95 shadow-blue-500/10"
              id="create-class-fast-btn"
            >
              <Plus className="w-4 h-4" />
              Đăng tin tìm gia sư
            </button>

            {/* Profile Avatar disk preview */}
            <div
              onClick={() => setActiveView('profile')}
              className="flex items-center gap-2.5 cursor-pointer pl-2 border-l border-gray-200"
              id="user-profile-disk"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-8.5 h-8.5 rounded-full object-cover border border-gray-200"
              />
              <div className="hidden md:block text-left">
                <p className="text-[11px] font-sans font-bold text-gray-800 leading-none">{profile.name}</p>
                <p className="text-[9px] text-[#0037b0] font-sans font-medium mt-1 uppercase">Student Account</p>
              </div>
            </div>

            {/* Mobile Hamburger toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 hover:bg-gray-100 rounded-xl text-gray-600"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Link options */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/45 backdrop-blur-sm pt-16 flex justify-end animate-in fade-in duration-150">
          <div className="bg-white w-3/4 max-w-xs h-full p-6 text-left space-y-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <img src={profile.avatar} alt={profile.name} className="w-12 h-12 rounded-full object-cover border" />
                <div>
                  <h4 className="font-display font-bold text-gray-900 text-sm">{profile.name}</h4>
                  <p className="text-xs text-blue-700 font-bold uppercase tracking-widest mt-0.5">HỌC VIÊN</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 font-semibold text-sm text-gray-600">
                <button
                  onClick={() => {
                    setActiveView('home');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 ${
                    activeView === 'home' || activeView === 'search' ? 'bg-blue-50 text-[#0037b0] font-bold' : ''
                  }`}
                >
                  <Compass className="w-4.5 h-4.5" />
                  Gia sư xuất sắc
                </button>
                <button
                  onClick={() => {
                    setActiveView('posts');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 ${
                    activeView === 'posts' || activeView === 'create-post' ? 'bg-blue-50 text-[#0037b0] font-bold' : ''
                  }`}
                >
                  <FileText className="w-4.5 h-4.5" />
                  Yêu cầu &amp; Đăng tin
                </button>
                <button
                  onClick={() => {
                    setActiveView('ratings-explore');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 ${
                    activeView.startsWith('ratings-') ? 'bg-blue-50 text-[#0037b0] font-bold' : ''
                  }`}
                >
                  <Star className="w-4.5 h-4.5" />
                  Đánh giá gia sư
                </button>
                <button
                  onClick={() => {
                    setActiveView('chats');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 ${
                    activeView === 'chats' ? 'bg-blue-50 text-[#0037b0] font-bold' : ''
                  }`}
                >
                  <MessageSquare className="w-4.5 h-4.5" />
                  Trò chuyện cứu cánh
                </button>
                <button
                  onClick={() => {
                    setActiveView('profile');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 ${
                    activeView === 'profile' || activeView === 'support' ? 'bg-blue-50 text-[#0037b0] font-bold' : ''
                  }`}
                >
                  <User className="w-4.5 h-4.5" />
                  Hồ sơ &amp; Cài đặt
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveView('create-post');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#0037b0] text-white font-bold text-xs rounded-xl text-center shadow-lg"
            >
              + Đăng tin tìm gia sư
            </button>
          </div>
        </div>
      )}

      {/* Main Container Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* VIEW: HOME DASHBOARD */}
        {(activeView === 'home' || activeView === 'search') && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Premium Big Header Jumbotron banner */}
            <section className="bg-[#141b2b] text-[#edf0ff] rounded-2xl relative overflow-hidden p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-gray-800">
              {/* Subtle tech grid decor overlays */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(0,55,176,0.15)_2px,transparent_2px)] [background-size:24px_24px] opacity-40"></div>
              
              <div className="space-y-3.5 relative z-10 max-w-lg text-center md:text-left">
                <span className="inline-flex items-center gap-1 bg-[#1d4ed8] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest leading-none">
                  <Sparkles className="w-3.5 h-3.5 fill-[#cad3ff]" />
                  Chiến dịch giải cứu điểm kiểm tra sắp tới
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight">
                  Tải nhanh trí tuệ, tự tin chinh phục kỳ thi!
                </h2>
                <p className="text-xs text-gray-300 leading-relaxed font-sans font-medium">
                  Nền tảng kết nối gia sư thông minh, hỗ trợ học thử miễn phí, đắm chìm học tập tương tác cùng thạc sĩ, tiến sĩ có chuyên môn dày dặn hàng đầu.
                </p>

                {/* Sub statistics counters */}
                <div className="flex items-center justify-center md:justify-start gap-4 pt-2 text-[10px] text-gray-400 font-bold">
                  <div className="space-y-0.5">
                    <p className="text-white font-display text-sm">2,500+</p>
                    <p>Gia sư hoạt động</p>
                  </div>
                  <div className="w-px h-6 bg-gray-800"></div>
                  <div className="space-y-0.5">
                    <p className="text-[#fd761a] font-display text-sm">&lt;15 Phút</p>
                    <p>Thời gian phản hồi</p>
                  </div>
                </div>
              </div>

              {/* Aesthetic Illustration mockup disk */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 z-10 hidden sm:block animate-float">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl"></div>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQZ2DTxE8EDLWEWf_lgWDC_Hi5DoSUfTgTCAORjluGddUcV7kYXkSYzLWCOpu89KQFfokd7_2A8t2hftiYwIUm5tMmzkA43jrGHdVFCpvX0KqgolVibbs1c3puY4We5pjrWlbuITt4TeqvUr2Ai77SDMWW3IgUjmUAb_CrIHe_HWnMfQMkl8VEDFuKgdel1ba_f_bVNJe3r0_V1lVIGrZQC4Sf2Z-pq_LLSEtNe_3ZOjZ97LOrMw8GpwOpUlCm64L3IR7V3dg2Xw"
                  alt="Student Academic confidence illustration"
                  className="w-full h-full object-cover rounded-2xl border-2 border-gray-700 shadow-xl"
                />
              </div>
            </section>

            {/* Sticky/Interactive search block layout inputs */}
            <section className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-md shadow-gray-200/40 relative z-20 -mt-12 max-w-4xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Text input search */}
                <div className="relative flex-1 w-full flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setActiveView('search');
                    }}
                    placeholder="Tìm kiếm theo chủ đề, tên gia sư, thế mạnh (Ví dụ: IELTS, Toán học)..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#0037b0] focus:ring-4 focus:ring-blue-100 outline-none transition-all font-sans"
                    id="search-main-input"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 text-xs font-bold text-gray-400 hover:text-gray-600"
                    >
                      Xóa
                    </button>
                  )}
                </div>

                {/* Filters drawer trigger btn */}
                <button
                  onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
                  className={`w-full sm:w-auto px-5 py-3 hover:bg-gray-100 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    showFiltersDrawer ? 'border-[#0037b0] bg-blue-50 text-[#0037b0]' : 'border-gray-200 text-gray-600'
                  }`}
                  id="filter-drawer-trigger-btn"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Bộ lọc nâng cao
                </button>
              </div>

              {/* Subject Quick Chips rows panel */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mr-2">Bộ môn nhanh:</span>
                {SUBJECTS.map((sub) => {
                  const isActive = selectedSubject === sub;
                  return (
                    <button
                      key={sub}
                      onClick={() => {
                        setSelectedSubject(sub);
                        setActiveView('search');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
                        isActive
                          ? 'bg-[#0037b0] text-white shadow shadow-blue-500/20'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>

              {/* COMPONENT: ADVANCED FILTER PANEL POPUP */}
              {showFiltersDrawer && (
                <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-6 animate-in slide-in-from-top-2 duration-200 text-left">
                  {/* Tutor gender pick */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Giới tính gia sư</label>
                    <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
                      {(['Tất cả', 'Nam', 'Nữ'] as const).map((g) => (
                        <button
                          key={g}
                          onClick={() => setSelectedGender(g)}
                          className={`py-1.5 text-xs font-bold text-center rounded-lg transition-all ${
                            selectedGender === g ? 'bg-white text-[#0037b0] shadow-sm' : 'text-gray-500 hover:bg-white/30'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Class formats */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Hình thức học</label>
                    <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
                      {(['Tất cả', 'Online', 'Tại nhà'] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => setSelectedFormat(f)}
                          className={`py-1.5 text-xs font-bold text-center rounded-lg transition-all ${
                            selectedFormat === f ? 'bg-white text-[#0037b0] shadow-sm' : 'text-gray-500 hover:bg-white/30'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hourly rate/budget range filter */}
                  <div className="space-y-1.5 md:col-span-2">
                    <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase">
                      <span>Mức học phí tối đa / buổi</span>
                      <span className="text-[#0037b0] font-mono">{priceLimit.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <div className="pt-2">
                      <input
                        type="range"
                        min={150000}
                        max={600000}
                        step={50000}
                        value={priceLimit}
                        onChange={(e) => setPriceLimit(Number(e.target.value))}
                        className="w-full accent-[#0037b0] bg-gray-200 rounded-lg cursor-pointer h-1.5"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Quick Classes dashboard segment overview */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-bold text-base text-gray-900">Phòng học trial &amp; Chính thức của em</h3>
                <span className="text-xs text-gray-400">Đã đăng ký 2 lớp</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Simulated active Class 1 trial list item */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow relative">
                  <div className="absolute top-4 right-4 animate-pulse">
                    <span className="bg-amber-100 text-[#9d4300] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Học thử: Buổi 1/1
                    </span>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-gray-100">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSxjycFC3c4yPiUHqxQGWIvonmpxS4hiQuN2npq_1_zpvzMyrVFsgquM3QhGW0jHPyO0fJXAArRKXisdU0uVy4GE5V5xvNFAjuNkPK8UaHJMGku4lwsDBbIOSKglLaDvXQFlzzl4ujxNRMB8k03iHW2-lSqEE7TPd7p0yV9eKylrXccoyGfm62Wm_spLAwENzWkSaqJzLT_q2pAPbF5SC21tzvWg908YM6e3TF9xylqWsPJsZ8NtKHZvNVxjY5EP-6MHtIC6-M_g"
                        alt="Tutor avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-gray-900">Toán đại số &amp; Calculus</h4>
                      <p className="text-[10px] text-gray-400 font-semibold mt-1">Gia sư: ThS. Nguyễn Văn A</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100/50">
                    <Clock className="w-4 h-4 text-[#0037b0]" />
                    <span className="font-semibold text-gray-700">Tối nay 19:30</span>
                    <span className="text-gray-300">•</span>
                    <span>Phương pháp đổi biến số</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const t = tutors.find(x => x.id === 'tutor-1');
                        if (t) setTrialTutor(t);
                      }}
                      className="flex-1 py-2 text-[11px] font-bold bg-[#0037b0] hover:bg-blue-800 text-white rounded-xl shadow-sm transition-all active:scale-95"
                      id="confirm-trial-lesson-btn"
                    >
                      Cứu cánh: Lưu nhận xét học thử
                    </button>
                    <button
                      onClick={() => {
                        const t = tutors.find(x => x.id === 'tutor-1');
                        if (t) {
                          setSelectedClassTutor(t);
                          setActiveView('class-details');
                        }
                      }}
                      className="px-3.5 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl font-bold text-xs"
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>

                {/* Simulated active Class 2 list item */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow relative">
                  <div className="absolute top-4 right-4">
                    <span className="bg-emerald-100 text-[#004f35] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Đang học: 12/24 buổi
                    </span>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-gray-100">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWkd4B9REc5NbAVxHNP51AKXGqBXhj98zpiRf4gt8iASm_bUVNRlxr2klB1vkPNypYZR0MJ5XiF4RoV2jrkQCTC3V8ntdoisMdQK-f06nPb8e4gdgkcHHDjaDE2aGCMM1kaSkUH85ekDaSR_LMEpd9glroy-DCJ1QNEJnYdui-ta_HAZYbMiwsYXHDsO1vfJmaLbJXa2O645miW8TMAOtLQ5Q4rl2UOodFJO6iTW5tAXBa6feFC55mbJ7jhR04zf160Wr4HsMoTA"
                        alt="Tutor avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-gray-900">Tiếng Anh IELTS 7.5+</h4>
                      <p className="text-[10px] text-gray-400 font-semibold mt-1">Gia sư: ThS. Lê Lan Anh</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100/50">
                    <Video className="w-4 h-4 text-[#0037b0]" />
                    <span className="font-semibold text-[#0037b0] underline">Google Meet link</span>
                    <span className="text-gray-300">•</span>
                    <span>T5-CN 19:30</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const thread = chats.find(c => c.tutorId === 'tutor-1') || chats[0];
                        setActiveChatId(thread.id);
                        setActiveView('chats');
                      }}
                      className="flex-1 py-2 text-[11px] font-bold border border-[#0037b0] text-[#0037b0] hover:bg-blue-50/50 rounded-xl transition-all"
                    >
                      Nhắn tin thảo luận bài tập
                    </button>
                    <button
                      onClick={() => {
                        const t = tutors.find(x => x.id === 'tutor-2');
                        if (t) {
                          setSelectedClassTutor(t);
                          setActiveView('class-details');
                        }
                      }}
                      className="px-3.5 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl font-bold text-xs"
                    >
                      Học phí &amp; Lịch
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Grid of All Tutors listings search */}
            <section className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-extrabold text-lg text-gray-900">
                  {activeView === 'search' ? `🔍 Kết quả lọc (${filteredTutors.length} gia sư)` : '🌟 Gợi ý Gia sư hàng đầu'}
                </h3>
              </div>

              {filteredTutors.length === 0 ? (
                <div className="text-center py-16 bg-white border border-dashed rounded-2xl space-y-4">
                  <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto" />
                  <div>
                    <h4 className="font-display font-bold text-gray-900 text-sm">Không tìm thấy gia sư phù hợp</h4>
                    <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto leading-relaxed">
                      Bạn có thể xóa từ khóa hoặc nới rộng tiêu chí bộ lọc (mức phí, giới tính, bộ môn) để có nhiều hồ sơ kết quả thích ứng hơn nhé!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSubject('Tất cả');
                      setSelectedGender('Tất cả');
                      setSelectedFormat('Tất cả');
                      setPriceLimit(600000);
                    }}
                    className="px-5 py-2 bg-[#0037b0] text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Reset Bộ lọc về mặc định
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="tutors-grid-lists">
                  {filteredTutors.map((t) => {
                    const isBookmarked = savedTutorIds.includes(t.id);
                    return (
                      <div
                        key={t.id}
                        className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-100/70 transition-all flex flex-col justify-between group relative"
                        id={`tutor-card-${t.id}`}
                      >
                        {/* Bookmark Heart / Badge */}
                        <button
                          type="button"
                          onClick={() => handleToggleBookmark(t.id)}
                          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur shadow-sm hover:bg-white text-rose-500 hover:scale-105 transition-all"
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
                        </button>

                        <div className="p-5 space-y-4">
                          {/* Tutor main top header metadata row */}
                          <div className="flex gap-4 items-start cursor-pointer" onClick={() => setSelectedTutorDetail(t)}>
                            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-gray-100 shadow-sm relative">
                              <img src={t.avatar} alt={t.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
                              {t.topTutor && (
                                <span className="absolute bottom-0 inset-x-0 bg-amber-500 text-white text-[8px] font-black uppercase text-center py-0.5">TOP</span>
                              )}
                            </div>
                            <div className="space-y-1 overflow-hidden">
                              <h4 className="font-display font-extrabold text-sm text-gray-900 group-hover:text-[#0037b0] transition-colors truncate">{t.name}</h4>
                              <p className="text-[10px] text-gray-450 text-[#0037b0] font-bold font-sans truncate">{t.subject}</p>
                              
                              {/* Rating stars display */}
                              <div className="flex items-center gap-1 text-xs">
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                <span className="font-bold text-gray-900">{t.rating}</span>
                                {t.reviewsCount && (
                                  <span className="text-[10px] text-gray-400 font-medium">({t.reviewsCount} học viên)</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Quick metrics badges row */}
                          <div className="flex flex-wrap gap-1.5 text-[9px] font-bold">
                            <span className="bg-blue-50 text-[#0037b0] px-2.5 py-0.5 rounded-lg border border-blue-100/30">
                              {t.gender === 'Nam' ? 'Thầy' : 'Cô'} giáo
                            </span>
                            {t.experience && (
                              <span className="bg-emerald-50 text-[#004f35] px-2.5 py-0.5 rounded-lg border border-emerald-100/30">
                                {t.experience} K.Nghiệm
                              </span>
                            )}
                            {t.degree && (
                              <span className="bg-orange-50 text-[#9d4300] px-2.5 py-0.5 rounded-lg">
                                Học vị: {t.degree}
                              </span>
                            )}
                            {t.trusted && (
                              <span className="bg-[#e9edff] text-[#0037b0] px-2.5 py-0.5 rounded-lg">
                                Đã kiểm định
                              </span>
                            )}
                          </div>

                          {/* Short bio preview fallback description */}
                          {t.bio && (
                            <p className="text-xs text-gray-500 font-sans line-clamp-2 leading-relaxed">
                              {t.bio}
                            </p>
                          )}
                        </div>

                        {/* Footer card row display rates and booking triggers */}
                        <div className="border-t border-gray-150 bg-gray-50/50 p-4 flex items-center justify-between mt-auto">
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Học phí đề xuất</p>
                            <p className="font-display font-extrabold text-[#0037b0] text-sm font-sans mt-0.5">
                              {t.price.toLocaleString('vi-VN')} VNĐ<span className="text-[11px] text-gray-400 font-bold">/h</span>
                            </p>
                          </div>

                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => setSelectedTutorDetail(t)}
                              className="px-3 py-2 text-xs font-bold text-[#0037b0] hover:bg-blue-50 rounded-lg transition-colors border border-blue-200/50"
                            >
                              Hồ sơ
                            </button>
                            <button
                              onClick={() => setBookingTutor(t)}
                              className="px-4 py-2 bg-[#0037b0] hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-sm active:scale-95 transition-transform"
                            >
                              Học thử
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}

        {/* VIEW: POSTS & REQUESTS VACANCIES BOARD */}
        {activeView === 'posts' && (
          <div className="space-y-6 animate-in fade-in duration-200 text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
              <div>
                <h2 className="font-display font-black text-xl text-gray-900 tracking-tight">Yêu cầu tìm gia sư cứu cánh</h2>
                <p className="text-xs text-gray-500 mt-1">Đăng tin tuyển dụng và tìm gia sư nhanh trong vòng vài giờ.</p>
              </div>
              <button
                onClick={() => setActiveView('create-post')}
                className="w-full sm:w-auto px-5 py-3 bg-[#0037b0] hover:bg-blue-800 text-on-primary font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-blue-500/10"
                id="create-post-dashboard-btn"
              >
                <PlusCircle className="w-4.5 h-4.5" />
                Đăng tin tìm gia sư mớii
              </button>
            </div>

            {/* List of Student posted requests */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6 hover:shadow-md transition-shadow relative"
                >
                  <div className="space-y-3.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2 flex-row">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        post.status === 'OPEN'
                          ? 'bg-emerald-100 text-emerald-800'
                          : post.status === 'MATCHED'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        STATUS: {post.status}
                      </span>
                      <span className="text-[10px] text-gray-400 font-sans font-medium">Đăng ngày: {post.createdAt}</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-display font-extrabold text-base text-gray-900">{post.title}</h3>
                      <p className="text-xs text-gray-500 font-semibold text-[#0037b0] uppercase tracking-wide mt-0.5">{post.subject}</p>
                    </div>

                    {post.description && (
                      <p className="text-xs text-gray-650 leading-relaxed text-gray-600 font-sans break-words whitespace-pre-wrap">
                        {post.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2.5 pt-1.5 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Lịch học: <strong>{post.schedule}</strong></span>
                      </div>
                      <span className="text-gray-300">|</span>
                      <div className="flex items-center gap-1">
                        <Compass className="w-4 h-4 text-gray-400" />
                        <span>Hình thức: <strong>{post.format}</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-lg text-[10px] font-sans font-semibold">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right hand side action widgets */}
                  <div className="shrink-0 flex md:flex-col justify-between items-end gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                    <div className="text-left md:text-right">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Học phí mong muốn</p>
                      <p className="font-display font-extrabold text-[#0037b0] text-sm mt-0.5">{post.fee}</p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Ứng viên đã nộp</p>
                      <p className="font-display font-extrabold text-gray-900 text-sm mt-0.5">{post.applicantsCount} gia sư ứng tuyển</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => alert('Xóa hoặc ẩn bài đăng tìm gia sư thành công!')}
                        className="p-2 border border-gray-200 hover:bg-red-50 hover:border-red-300 text-gray-400 hover:text-red-600 rounded-xl transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`Lớp học hiện có ${post.applicantsCount} gia sư ứng tuyển. Hệ thống đang đối phác hồ sơ.`)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl"
                      >
                        Quản lý hồ sơ ứng viên
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: CREATE NEW POST */}
        {activeView === 'create-post' && (
          <CreatePostView
            onBack={() => setActiveView('posts')}
            onSubmit={(newPost) => {
              handleCreatePost(newPost);
              setActiveView('posts');
            }}
          />
        )}

        {/* VIEW: MESSAGING CHAT WINDOW */}
        {activeView === 'chats' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-lg min-h-[600px] text-left animate-in fade-in duration-200">
            {/* Thread side list */}
            <div className="lg:col-span-1 border-r border-gray-100 flex flex-col">
              <header className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-display font-bold text-gray-900 text-sm">Tin nhắn cứu cánh học vụ</h3>
                <p className="text-[10px] text-gray-400 font-medium">Hộp thư an toàn được mã hóa tự động</p>
              </header>

              <div className="flex-1 overflow-y-auto divide-y divide-gray-50 no-scrollbar">
                {chats.map((ch) => {
                  const isActive = activeChatId === ch.id;
                  return (
                    <div
                      key={ch.id}
                      onClick={() => setActiveChatId(ch.id)}
                      className={`p-4 flex items-center gap-3.5 cursor-pointer transition-all ${
                        isActive ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="relative">
                        <img src={ch.tutorAvatar} alt={ch.tutorName} className="w-11 h-11 rounded-full object-cover border" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="font-display font-extrabold text-xs text-gray-950 truncate">{ch.tutorName}</h4>
                          <span className="text-[9px] text-gray-400 shrink-0 font-medium">{ch.lastMessageTime}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-1 leading-normal font-sans">{ch.lastMessage}</p>
                        
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-[9px] font-bold bg-[#edf0ff] text-[#0037b0] px-2.5 py-0.5 rounded-lg uppercase">
                            {ch.status}
                          </span>
                          {ch.unreadCount && ch.unreadCount > 0 ? (
                            <span className="bg-red-500 text-white rounded-full text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center animate-bounce">
                              {ch.unreadCount}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chat room messages view */}
            <div className="lg:col-span-2 bg-slate-50 flex flex-col h-full">
              {activeChatId ? (
                (() => {
                  const activeThread = chats.find(c => c.id === activeChatId);
                  if (!activeThread) return null;
                  return (
                    <ChatDetailView
                      thread={activeThread}
                      onBack={() => setActiveChatId(null)}
                      onUpdateThread={handleUpdateThread}
                    />
                  );
                })()
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 text-[#0037b0] rounded-full flex items-center justify-center text-[#0037b0]">
                    <MessageSquare className="w-8 h-8 text-[#0037b0] fill-[#cad3ff]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-900 text-sm">Giao tiếp cứu cánh cùng gia sư của bạn</h4>
                    <p className="text-xs text-gray-400 mt-2 max-w-sm leading-relaxed">
                      Lựa chọn một cuộc hộ thoại từ danh sách bên trái để bắt đầu nhắn tin, nhận đính kèm tài liệu file bài giải, đề ôn thi hoặc điều chỉnh lịch học thử.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW: NOTIFICATIONS PANEL */}
        {activeView === 'notifications' && (
          <div className="space-y-6 max-w-2xl mx-auto text-left animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-5">
              <div>
                <h2 className="font-display font-black text-xl text-gray-900 tracking-tight">Hộp thư thông báo hệ thống</h2>
                <p className="text-xs text-gray-500 mt-1">Cập nhật thay đổi thời vụ học phí &amp; lịch trình học tập an tâm.</p>
              </div>
              <button
                onClick={() => {
                  setNotifications(notifications.map(n => ({ ...n, unread: false })));
                  alert('Đã đánh dấu đọc tất cả thông báo học vụ!');
                }}
                className="text-xs text-[#0037b0] font-bold border border-blue-200 px-3 py-2 rounded-xl bg-white hover:bg-blue-50"
              >
                Đánh dấu Đã đọc tất cả
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden shadow-sm">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-5 flex gap-4 transition-colors ${notif.unread ? 'bg-blue-50/30' : 'hover:bg-gray-50/30'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    notif.type === 'schedule'
                      ? 'bg-amber-100 text-amber-800'
                      : notif.type === 'payment'
                      ? 'bg-emerald-100 text-emerald-800'
                      : notif.type === 'chat'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {notif.type === 'schedule' ? <Clock className="w-5 h-5" /> : notif.type === 'payment' ? <CheckCircle className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                  </div>

                  <div className="flex-1 min-w-0 text-xs">
                    <div className="flex justify-between items-center gap-4">
                      <h4 className="font-bold text-gray-950 font-display text-sm">{notif.title}</h4>
                      <span className="text-[10px] text-gray-400 font-semibold tracking-wide shrink-0">{notif.time}</span>
                    </div>
                    <p className="text-gray-500 mt-1 leading-relaxed text-xs">{notif.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: USER PROFILE & SETTINGS PORTAL */}
        {activeView === 'profile' && (
          <div className="max-w-3xl mx-auto">
            <ProfileSettingsView
              profile={profile}
              onChangeProfile={(updated) => setProfile(updated)}
              onNavigateToView={(viewName) => {
                if (viewName === 'home') setActiveView('home');
                if (viewName === 'search') setActiveView('search');
                if (viewName === 'support') setActiveView('support');
              }}
            />
          </div>
        )}

        {/* VIEW: RATINGS EXPLORE DIRECTORY */}
        {activeView === 'ratings-explore' && (
          <RatingsExploreView
            tutors={tutors}
            reviews={reviews}
            onSelectTutor={(id, view) => {
              setSelectedTutorForRatingId(id);
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW: RATINGS TUTOR DETAILS */}
        {activeView === 'ratings-details' && (
          (() => {
            const activeTutor = tutors.find(t => t.id === selectedTutorForRatingId) || tutors[0];
            return (
              <RatingsTutorDetailsView
                tutor={activeTutor}
                reviews={reviews}
                onBack={() => {
                  setActiveView('ratings-explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onRateCurrent={() => {
                  setActiveView('ratings-rate');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            );
          })()
        )}

        {/* VIEW: RATINGS RATE TUTOR FORM */}
        {activeView === 'ratings-rate' && (
          (() => {
            const activeTutor = tutors.find(t => t.id === selectedTutorForRatingId) || tutors[0];
            return (
              <RatingsRateTutorForm
                tutor={activeTutor}
                onBack={() => {
                  setActiveView('ratings-details');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSubmitReview={handleAddReview}
              />
            );
          })()
        )}

        {/* VIEW: CLASS DETAILES VIEW FOR CALENDARS & FEES */}
        {activeView === 'class-details' && selectedClassTutor && (
          <div className="max-w-3xl mx-auto">
            <ClassDetailsView
              tutor={selectedClassTutor}
              reviews={reviews}
              onBack={() => setActiveView('home')}
              onOpenChat={() => {
                const thread = chats.find(c => c.tutorId === selectedClassTutor.id);
                if (thread) {
                  setActiveChatId(thread.id);
                  setActiveView('chats');
                } else {
                  setActiveView('chats');
                }
              }}
              onRateTutor={(tutorId) => {
                setSelectedTutorForRatingId(tutorId);
                setActiveView('ratings-rate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewRatings={(tutorId) => {
                setSelectedTutorForRatingId(tutorId);
                setActiveView('ratings-details');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* VIEW: SUPPORT SERVICE REPORT TICKETS */}
        {activeView === 'support' && (
          <div className="max-w-3xl mx-auto">
            <SupportRequestView
              onBack={() => setActiveView('profile')}
              onSubmit={(newTicket) => {
                handleSupportSubmit(newTicket);
              }}
              existingTickets={supportTickets}
            />
          </div>
        )}
      </main>

      {/* MODAL: GENERAL TUTOR DETAILS BIOGRAPHY BOTTOM DRAWER */}
      {selectedTutorDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative my-8 p-6 md:p-8 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedTutorDetail(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-450 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {/* Profile Header section */}
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left border-b border-gray-100 pb-6">
              <div className="relative">
                <img
                  src={selectedTutorDetail.avatar}
                  alt={selectedTutorDetail.name}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-50 shadow-md"
                />
                {selectedTutorDetail.topTutor && (
                  <span className="absolute -bottom-2 -right-2 bg-amber-500 text-white font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase shadow">
                    TOP TUTOR
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-1">
                <h3 className="font-display font-black text-xl text-gray-900">{selectedTutorDetail.name}</h3>
                <p className="text-xs font-bold text-[#0037b0] tracking-wide uppercase">{selectedTutorDetail.subject}</p>
                
                {/* School */}
                {selectedTutorDetail.university && (
                  <p className="text-xs text-gray-500 font-medium">🏫 Tốt nghiệp: {selectedTutorDetail.university}</p>
                )}

                {/* Stars */}
                <div className="flex items-center justify-center sm:justify-start gap-1 py-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-sm text-gray-900">{selectedTutorDetail.rating}</span>
                  <span className="text-xs text-gray-400 font-medium">({selectedTutorDetail.reviewsCount || 45} Đánh giá đã xác thực)</span>
                </div>
              </div>

              {/* Price display right */}
              <div className="sm:text-right border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0 w-full sm:w-auto">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Học phí đề xuất</p>
                <p className="font-display font-black text-2xl text-[#0037b0] font-sans mt-1">
                  {selectedTutorDetail.price.toLocaleString('vi-VN')}đ<span className="text-xs text-gray-450 font-bold">/buổi</span>
                </p>
              </div>
            </div>

            {/* Biography details body content */}
            <div className="py-6 space-y-5 max-h-[350px] overflow-y-auto no-scrollbar text-left text-xs text-gray-600 leading-relaxed font-sans">
              <div className="space-y-1.5">
                <h4 className="font-display font-bold text-sm text-gray-900">Giới thiệu bản thân</h4>
                <p className="text-xs text-gray-650 tracking-wide font-sans text-gray-600 leading-relaxed font-medium">
                  {selectedTutorDetail.bio || 'Chưa cung cấp bài trần thuật tiểu sử chi tiết.'}
                </p>
              </div>

              {/* Parameters metrics blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Kinh nghiệm</span>
                  <p className="font-bold text-gray-900 text-sm">{selectedTutorDetail.experience || '3 Năm'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Mức phản hồi</span>
                  <p className="font-bold text-emerald-800 text-sm">{selectedTutorDetail.responseRate || '98%'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Thời gian trả lời</span>
                  <p className="font-bold text-gray-900 text-sm">{selectedTutorDetail.responseTime || '15 phút'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Học thử</span>
                  <p className="font-bold text-[#0037b0] text-sm">Học thử 1 buổi</p>
                </div>
              </div>

              {/* Schedule availability note */}
              {selectedTutorDetail.schedule && (
                <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#0037b0] font-bold block uppercase tracking-wider">Khung thời gian trống gần nhất</span>
                    <p className="font-bold text-gray-800 text-xs mt-0.5">{selectedTutorDetail.schedule}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions of Modal */}
            <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedTutorDetail(null);
                  const thread = chats.find(c => c.tutorId === selectedTutorDetail.id);
                  if (thread) {
                    setActiveChatId(thread.id);
                  } else {
                    const newThread: ChatThread = {
                      id: 'chat-' + Date.now(),
                      tutorId: selectedTutorDetail.id,
                      tutorName: selectedTutorDetail.name,
                      tutorAvatar: selectedTutorDetail.avatar,
                      status: 'Học thử',
                      lastMessage: 'Đã kết nối trò chuyện cứu cánh học vụ.',
                      lastMessageTime: 'Vừa xong',
                      messages: []
                    };
                    setChats([newThread, ...chats]);
                    setActiveChatId(newThread.id);
                  }
                  setActiveView('chats');
                }}
                className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-600 font-bold text-xs cursor-pointer"
              >
                Nhắn tin trao đổi trước
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedTutorForRatingId(selectedTutorDetail.id);
                  setSelectedTutorDetail(null);
                  setActiveView('ratings-details');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 py-3 border border-[#0037b0] text-[#0037b0] hover:bg-blue-50/50 rounded-xl font-bold text-xs cursor-pointer"
              >
                Xem đánh giá ({selectedTutorDetail.reviewsCount || 0})
              </button>
              <button
                type="button"
                onClick={() => {
                  setBookingTutor(selectedTutorDetail);
                  setSelectedTutorDetail(null);
                }}
                className="flex-1 py-3 bg-[#0037b0] text-white hover:bg-blue-800 font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Đăng ký học thử ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: TRIAL BOOKING FORM SLOT POPUP */}
      {bookingTutor && (
        <BookingModal
          tutor={bookingTutor}
          onClose={() => setBookingTutor(null)}
          onSubmit={(data) => {
            handleBookingSubmit(data);
            setBookingTutor(null);
          }}
        />
      )}

      {/* MODAL: TRIAL STUDENT FEEDBACK REVIEW FLOW OVERRIDES */}
      {trialTutor && (
        <TrialConfirmationModal
          tutor={trialTutor}
          onClose={() => setTrialTutor(null)}
          onConfirm={(feedback) => {
            handleTrialConfirmation(feedback);
            setTrialTutor(null);
          }}
        />
      )}
    </div>
  );
}
