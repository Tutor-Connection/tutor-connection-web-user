/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChatThread, Message } from '../types';
import { ArrowLeft, Search, MoreVertical, ShieldAlert, FileText, CheckCheck, Smile, Plus, Send, Image, Camera, Paperclip, MapPin } from 'lucide-react';

interface ChatDetailViewProps {
  thread: ChatThread;
  onBack: () => void;
  onUpdateThread: (updatedThread: ChatThread) => void;
}

export default function ChatDetailView({ thread, onBack, onUpdateThread }: ChatDetailViewProps) {
  const [messages, setMessages] = useState<Message[]>(thread.messages);
  const [inputText, setInputText] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: 'm-user-' + Date.now(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setShowAttachments(false);

    // Save back to parent state
    onUpdateThread({
      ...thread,
      lastMessage: userMsg.text,
      lastMessageTime: userMsg.timestamp,
      messages: updatedMessages,
      unreadCount: 0
    });

    // Simulate Tutor response after a brief delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      let answerText = 'Dạ vâng em đã nhận được tin nhắn của anh/chị. Em sẽ kiểm tra tài liệu và gửi phản hồi chi tiết sớm nhất có thể ạ!';
      if (userMsg.text.toLowerCase().includes('tích phân') || userMsg.text.toLowerCase().includes('toán')) {
        answerText = 'Đúng rồi em, dạng toán tích phân đổi biến số này thường có 2 cách đặt là u = u(x) hoặc đặt x = g(t). Với bài toán này em nên đặt căn thức bằng t rồi bình phương hai vế nhé!';
      } else if (userMsg.text.toLowerCase().includes('giá') || userMsg.text.toLowerCase().includes('học phí')) {
        answerText = 'Về học phí thì mức đề xuất trên hệ thống là cố định ạ. Em có thể đăng ký học thử 1 buổi đầu để xem phương pháp giảng dạy có phù hợp với em không nhé!';
      }

      const tutorMsg: Message = {
        id: 'm-tutor-' + Date.now(),
        sender: 'tutor',
        text: answerText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      const finalMessages = [...updatedMessages, tutorMsg];
      setMessages(finalMessages);

      onUpdateThread({
        ...thread,
        lastMessage: tutorMsg.text,
        lastMessageTime: tutorMsg.timestamp,
        messages: finalMessages,
        unreadCount: 0
      });
    }, 2000);
  };

  const handleAttachFile = (fileName: string, fileSize: string) => {
    const fileMsg: Message = {
      id: 'm-file-' + Date.now(),
      sender: 'user',
      text: `Đã gửi đính kèm: ${fileName}`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      file: {
        name: fileName,
        size: fileSize,
        type: fileName.split('.').pop()?.toUpperCase() || 'FILE'
      }
    };

    const updated = [...messages, fileMsg];
    setMessages(updated);
    setShowAttachments(false);
    onUpdateThread({
      ...thread,
      lastMessage: fileMsg.text,
      lastMessageTime: fileMsg.timestamp,
      messages: updated,
      unreadCount: 0
    });
  };

  return (
    <div className="flex flex-col h-[650px] bg-slate-50 rounded-2xl overflow-hidden relative border border-gray-200 shadow-lg">
      {/* Top Banner Bar */}
      <header className="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="relative">
            <img
              src={thread.tutorAvatar}
              alt={thread.tutorName}
              className="w-10 h-10 rounded-full object-cover border border-gray-100 animate-pulse"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          <div>
            <h3 className="font-display font-bold text-gray-800 text-sm">{thread.tutorName}</h3>
            <p className="text-[10px] text-gray-400 font-medium">Đang hoạt động • {thread.status}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Security alert context */}
      <div className="bg-orange-50/70 border-b border-orange-200/40 px-4 py-2 flex items-start gap-2.5 text-xs text-orange-950 shrink-0">
        <ShieldAlert className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
        <p className="leading-tight text-[11px]">
          Hệ thống tự động ẩn số điện thoại và email. Vui lòng không chia sẻ thông tin liên lạc cá nhân để giữ an toàn tối đa cho tài khoản học sinh.
        </p>
      </div>

      {/* Chat scroll workspace container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        <div className="flex justify-center my-2">
          <span className="bg-gray-200/80 text-gray-500 text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider">Hôm nay</span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[82%] ${isUser ? 'self-end ml-auto items-end' : 'self-start mr-auto items-start animate-fade-in'}`}
            >
              {msg.file ? (
                <div className={`p-3 rounded-2xl shadow-sm space-y-2 ${isUser ? 'bg-[#0037b0] text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none'}`}>
                  <p className="text-sm font-sans">{msg.text.replace('Đã gửi đính kèm: ', '')}</p>
                  <div
                    onClick={() => alert(`Đang tải file ${msg.file?.name}...`)}
                    className={`flex items-center gap-3 border rounded-xl p-2 cursor-pointer transition-all ${
                      isUser
                        ? 'bg-blue-900/40 border-blue-800/40 hover:bg-blue-900/50'
                        : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                    }`}
                  >
                    <div className="w-9 h-9 bg-red-100 text-red-700 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold truncate pr-3">{msg.file.name}</p>
                      <p className={`text-[10px] ${isUser ? 'text-blue-200' : 'text-gray-400'}`}>{msg.file.size} • {msg.file.type}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`p-3 rounded-2xl shadow-sm text-sm ${
                    isUser
                      ? 'bg-[#0037b0] text-white rounded-tr-none'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              )}

              <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-400 px-1">
                <span>{msg.timestamp}</span>
                {isUser && (
                  <div className="flex items-center gap-0.5 text-blue-600">
                    <span className="font-semibold text-[9px]">Đã xem</span>
                    <CheckCheck className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex flex-col items-start self-start mr-auto max-w-[80%] animate-pulse">
            <div className="bg-white border border-gray-100 px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
              <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 ml-2">Alex đang gõ...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Attachments drawer popup panel block */}
      {showAttachments && (
        <div className="absolute bottom-[72px] inset-x-0 bg-white border-t border-gray-100 p-4 grid grid-cols-4 gap-4 animate-in slide-in-from-bottom-5 duration-200 z-20 shadow-lg">
          <div
            onClick={() => handleAttachFile('Bai_tap_Tich_phan_Phan_1.png', '2.1 MB')}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
              <Image className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-gray-500 font-semibold">Thư viện ảnh</span>
          </div>
          <div
            onClick={() => handleAttachFile('Anh_de_toan.jpg', '1.8 MB')}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-gray-500 font-semibold">Máy ảnh</span>
          </div>
          <div
            onClick={() => handleAttachFile('De_thi_thu_Dai_hoc_Toan_2026.pdf', '4.5 MB')}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
              <Paperclip className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-gray-500 font-semibold">Tài liệu</span>
          </div>
          <div
            onClick={() => alert('Đã gửi định vị của bạn cho gia sư!')}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-gray-500 font-semibold">Vị trí</span>
          </div>
        </div>
      )}

      {/* Input controls layout form */}
      <form onSubmit={handleSend} className="bg-white border-t border-gray-100 p-3 flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => setShowAttachments(!showAttachments)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors shrink-0 ${
            showAttachments ? 'bg-red-50 text-red-600' : 'text-[#0037b0] hover:bg-gray-50'
          }`}
        >
          <Plus className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => alert('Mở bảng biểu tượng cảm xúc...')}
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-50 rounded-full shrink-0"
        >
          <Smile className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập tin nhắn để cứu cánh học tập..."
          className="flex-1 bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm rounded-xl outline-none focus:outline-none focus:border-blue-400 transition-all font-sans"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform shrink-0 ${
            inputText.trim() ? 'bg-[#0037b0] hover:bg-[#1d4ed8] text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
