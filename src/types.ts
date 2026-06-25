/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  subject: string;
  rating: number;
  reviewsCount?: number;
  price: number; // in VND/hour or VND/session
  experience?: string;
  degree?: string;
  university?: string;
  distance?: string;
  trusted?: boolean;
  topTutor?: boolean;
  fastResponse?: boolean;
  gender: 'Nam' | 'Nữ' | 'Tất cả';
  format: ('Tại nhà' | 'Online')[];
  bio?: string;
  responseRate?: string;
  responseTime?: string;
  schedule?: string;
  department?: string;
  title?: string;
}

export interface BookingRequest {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  tutorPrice: number;
  date: string;
  startTime: string;
  method: 'online' | 'offline';
  address?: string;
  notes?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface UserPost {
  id: string;
  title: string;
  subject: string;
  fee: string;
  status: 'OPEN' | 'MATCHED' | 'EXPIRED' | 'CLOSED';
  createdAt: string;
  applicantsCount: number;
  description: string;
  schedule: string;
  format: 'Online' | 'Tại nhà' | 'Cả hai';
  tags: string[];
}

export interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  file?: {
    name: string;
    size: string;
    type: string;
  };
}

export interface ChatThread {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  status: 'Đang học' | 'Học thử' | 'Hoàn thành';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  active?: boolean;
  messages: Message[];
}

export interface AppNotification {
  id: string;
  title: string;
  type: 'system' | 'schedule' | 'payment' | 'chat';
  time: string;
  text: string;
  unread: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  level: string;
  budget: string;
  target: string;
  supportSubjects: string[];
  parentName: string;
  parentPhone: string;
  weeklySchedule: {
    [day: string]: {
      morning: boolean;
      afternoon: boolean;
      evening: boolean;
    };
  };
}

export interface SupportTicket {
  id: string;
  category: string;
  title: string;
  description: string;
  files: string[];
  status: 'pending' | 'resolved';
  createdAt: string;
}

export interface RatingCriteria {
  quality: number;
  punctuality: number;
  attitude: number;
  support: number;
}

export interface Review {
  id: string;
  tutorId: string;
  ratingDate: string;
  ratings: RatingCriteria;
  averageScore: number;
  feedback: string;
  anonymous: boolean;
  attachments: string[]; // URLs or base64 data URLs
}

