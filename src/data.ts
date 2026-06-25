/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tutor, UserPost, ChatThread, AppNotification, UserProfile, Review } from './types';

export const INITIAL_TUTORS: Tutor[] = [
  {
    id: 'tutor-1',
    name: 'Nguyễn Văn A',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSxjycFC3c4yPiUHqxQGWIvonmpxS4hiQuN2npq_1_zpvzMyrVFsgquM3QhGW0jHPyO0fJXAArRKXisdU0uVy4GE5V5xvNFAjuNkPK8UaHJMGku4lwsDBbIOSKglLaDvXQFlzzl4ujxNRMB8k03iHW2-lSqEE7TPd7p0yV9eKylrXccoyGfm62Wm_spLAwENzWkSaqJzLT_q2pAPbF5SC21tzvWg908YM6e3TF9xylqWsPJsZ8NtKHZvNVxjY5EP-6MHtIC6-M_g',
    subject: 'Toán học (Lớp 10-12)',
    rating: 4.9,
    reviewsCount: 128,
    price: 350000,
    experience: '5 Năm',
    degree: 'Thạc sĩ',
    university: 'ĐH Khoa Học Tự Nhiên',
    distance: '0.8km',
    trusted: true,
    topTutor: true,
    fastResponse: true,
    gender: 'Nam',
    format: ['Online', 'Tại nhà'],
    bio: 'Xin chào! Tôi là Nguyễn Văn A, hiện đang là giảng viên thỉnh giảng tại Đại học Khoa học Tự nhiên. Với hơn 5 năm kinh nghiệm luyện thi đại học và chứng chỉ quốc tế SAT, tôi tự tin giúp học sinh nắm vững kiến thức từ căn bản đến nâng cao. Phương pháp dạy học của tôi tập trung vào việc kích thích tư duy logic và khả năng tự giải quyết vấn đề của học sinh thay vì chỉ học thuộc công thức. Tôi tin rằng mỗi học sinh đều có tiềm năng riêng cần được khai phá đúng cách.',
    responseRate: '98%',
    responseTime: '~15 phút',
    schedule: 'T2-T4-T6 19:00'
  },
  {
    id: 'tutor-2',
    name: 'Cô Lan Anh',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWkd4B9REc5NbAVxHNP51AKXGqBXhj98zpiRf4gt8iASm_bUVNRlxr2klB1vkPNypYZR0MJ5XiF4RoV2jrkQCTC3V8ntdoisMdQK-f06nPb8e4gdgkcHHDjaDE2aGCMM1kaSkUH85ekDaSR_LMEpd9glroy-DCJ1QNEJnYdui-ta_HAZYbMiwsYXHDsO1vfJmaLbJXa2O645miW8TMAOtLQ5Q4rl2UOodFJO6iTW5tAXBa6feFC55mbJ7jhR04zf160Wr4HsMoTA',
    subject: 'Tiếng Anh IELTS',
    rating: 5.0,
    reviewsCount: 420,
    price: 350000,
    experience: '4 Năm',
    degree: 'Cử nhân Sư phạm',
    university: 'ĐH Ngoại Ngữ',
    distance: '1.2km',
    trusted: true,
    topTutor: true,
    fastResponse: true,
    gender: 'Nữ',
    format: ['Online', 'Tại nhà'],
    bio: 'Xin chào, mình là sư phạm chính ngành chuyên sâu luyện IELTS. Minh có kinh nghiệm 4 năm dạy tiếng Anh trực tuyến và trực tiếp cho các bạn có mục tiêu band 6.5 - 8.0.',
    responseRate: '99%',
    responseTime: '~5 phút'
  },
  {
    id: 'tutor-3',
    name: 'Thầy Hoàng',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1hQn1AbXLRL7PMkZ40dVZbFkjmcOKgwkeiwv0Cawwk705HgOJMgdDoFjVmeNDwlPrQzjDUMovXLqWg9wcS8cMQ_bQjMWZTVYvMqwrjnc7FypX01IjgftYnLby35LKuZ2jymLrbY_pnOOp94QkbzUq-xa1jGl0IjoXTcAGQmhI5QQZIbEIOfqb-oxGcdmSminrUj3Xe33dINPjxAzHS7AYGBLEU9WGBU863RN63jcraYcImy-ZUqnArz2kZpdMMRfoMSFn44xA6Q',
    subject: 'Toán Cao Cấp',
    rating: 4.9,
    reviewsCount: 95,
    price: 200000,
    experience: '6 Năm',
    degree: 'Thạc sĩ Toán',
    university: 'ĐH Bách Khoa',
    distance: '3.0km',
    trusted: true,
    topTutor: false,
    fastResponse: true,
    gender: 'Nam',
    format: ['Online'],
    bio: 'Thầy Hoàng chuyên dạy Toán giải tích cao cấp, đại số tuyến tính cho sinh viên Bách khoa, Kinh tế, KHTN. Đã giúp hàng ngàn sinh viên qua môn với điểm A, A+.'
  },
  {
    id: 'tutor-4',
    name: 'Thầy Minh',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgfzDCCdZdNd1GSyveik6TO0hzfPfAyHi6l1jULWKGaU-q1FGf3xi0iMdt4zNtmCYM3cgFqswb1pYfLqVMJXu7Gu5sOshWNTkagphS_-q1xVvjSrX2eob3-yaiSyF1W-jGhkdo4-cFxPrEGqNJGh2x9QXbHrsw20tQsp9NFm1pV_o_AggyBNfnXvwFEFOAMfKy7sIitcPLK4xA-urQm9FlVLIcKfbERSERBvJll0FmNm-f8WG8egpCap71g1AIAvWAtV9hfJXTKQ',
    subject: 'Vật Lý 12',
    rating: 4.8,
    reviewsCount: 154,
    price: 250000,
    experience: '3 Năm',
    degree: 'Kỹ sư Vật lý',
    university: 'ĐH Sư Phạm Kỹ Thuật',
    distance: '1.8km',
    trusted: false,
    topTutor: false,
    fastResponse: false,
    gender: 'Nam',
    format: ['Online', 'Tại nhà'],
    bio: 'Dạy học Vật Lý lớp 12 bằng trực quan sinh động, giải các bài thi THPT Quốc Gia tăng tốc từ mất gốc lên 8+.'
  },
  {
    id: 'tutor-5',
    name: 'Cô Hồng Hạnh',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzIdGbTKikb9l5Y88fckOzm-gc6Ja8bGGpd-2N7hBzsYjHwi1ocLdnsAtZ-1KcY0kQueo4rqL31X-78xwoY5kBjm61BrljwuB6zloojxikN3Tmbh5IcU1Lx1Wg0GcMPvBTiXfXp6jc2GTYKleH7jmaTlgRta83NRPQWSRxLsFc0pvX6lxlKRMc4W5N95VJHR6NTiz1e-zTNOOCvjriyflkDeBXCY_C5svwEoUL49lCBtag_NkBlriPaeI4r6lEu8eondXbNF2blA',
    subject: 'Ngữ Văn, Lịch Sử',
    rating: 4.9,
    reviewsCount: 78,
    price: 180000,
    experience: '8 Năm',
    degree: 'Thạc sĩ Sư phạm Văn',
    university: 'ĐH Sư Phạm TP.HCM',
    distance: '1.5km',
    trusted: true,
    topTutor: true,
    fastResponse: true,
    gender: 'Nữ',
    format: ['Tại nhà'],
    bio: 'Cô Hồng Hạnh, giáo viên trường THPT chuyên năng khiếu. Chuyên ôn thi lớp 9 lên 10 và thi tốt nghiệp THPT đạt điểm giỏi môn Văn.'
  },
  {
    id: 'tutor-6',
    name: 'Thầy Đức Anh',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf19-VoOS2QqjDlh8Oy-h7a_mmjY9SeWMrnTvD4xFDuSioxvGaweXp5OAYEXS7850fQTN4K4irbd8Hkqe2Fn4rV8WW2WbDrnYJi9Al1hQ6NVL_gAmrRVbkiPqAVVxdicsTWB1n7Iw2IUldCF91NuBwpZ7cSyzCQMhAZrRZVPkUbdycdPACBO1n28Z_v3MAYCTSJXyfe_0l0juyBg5Vzcj9lsXo7mWKpHUkPDf0KqZ9owkUqH8FC91Ed-5t2FD07vT4Ty6uuT7XFA',
    subject: 'Hóa Học 11, 12',
    rating: 4.7,
    reviewsCount: 88,
    price: 220000,
    experience: '5 Năm',
    degree: 'Thạc sĩ Hóa học',
    university: 'ĐH KHTN Hà Nội',
    distance: '2.1km',
    trusted: true,
    topTutor: false,
    fastResponse: true,
    gender: 'Nam',
    format: ['Online', 'Tại nhà'],
    bio: 'Thầy Đức Anh chuyên trị Hóa khó lớp 11, 12, dạy ôn thi đánh giá năng lực ĐHQG và tốt nghiệp quốc gia. Giáo án bài bản dễ học.'
  },
  {
    id: 'tutor-7',
    name: 'Cô Phương Thảo',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtTZC04X9-kkq1HgmL57r8F24kHJNVmhHQD0mtQErKnJAwumKEu9Y67-LV-jM5o87xXHZ-T2qymPypLIbP1A2qCS7g5sZP6YDf2gWvTKHJEAed9KtGQLyk09Ph22yU15rk9ZTXCbp5_-I28zrqBp-1LgtBxTLZjtRfYDgh90wyqGZIlWuwpmd_UD-xNKE93vvYijzTOsuOgZgfWbIzIm-DAj3CDTBJALDd-vSZc8us10IpY4eL9ckN23rA8oWMSHQPnZboGwoKwg',
    subject: 'Tiếng Pháp Giao Tiếp',
    rating: 5.0,
    reviewsCount: 65,
    price: 300000,
    experience: '6 Năm',
    degree: 'Thạc sĩ Pháp ngữ',
    university: 'ĐH Ngoại Thương',
    distance: '0.8km',
    trusted: true,
    topTutor: true,
    fastResponse: false,
    gender: 'Nữ',
    format: ['Online', 'Tại nhà'],
    bio: 'Cô Thảo có hơn 6 năm học tập và làm việc tại Pháp (HEC Paris), cung cấp các lộ trình học tiếng Pháp giao tiếp cấp tốc phát âm chuẩn.'
  },
  {
    id: 'tutor-8',
    name: 'Minh Thu Nguyen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXkBLi5CaR4wVJRaxfK2IAMbTCis0pc8ifj5JIp0NzK5tyghW_64_lI8ZUIsMGt8-_Yov0JXi-kaslE7udEPdvOSG6ecwli5HBfhfPPq9mO-bpfmsUfr3mXORnCloIV1GjTo_t5fXn3MtAiW6w-MWXP1AL1EPAzN-jRQmvvI8zcb2_Ct8l7mlXJPGNiHoTHLmLaYW5CptVl5Kf2oENy__VVMVOo7ClUWtVyCD3g8e_k71jcgnZNyegMvi9O4CK5JGrWxso6dhqOQ',
    subject: 'English Literature & IELTS',
    rating: 4.9,
    reviewsCount: 1200,
    price: 450000,
    experience: '7 Năm',
    degree: 'PhD in Linguistics',
    university: 'University of Oxford',
    distance: '1.2km',
    trusted: true,
    topTutor: true,
    fastResponse: true,
    gender: 'Nữ',
    format: ['Online'],
    bio: 'Minh Thu Nguyen holds a PhD in English Linguistics. She offers bespoke tutoring for IELTS writing, literature, SAT prep, and academic writing.'
  },
  {
    id: 'tutor-9',
    name: 'Hoang Nam Tran',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNZSnGSsNF-R_E_yPXL44vkZSNVUwXfmkeZpoSn4WzmFhezTIy-VypAyLS-2YkFy8vIT20AA_DGRClYbP4-4p3IWEP8p00XYfqJgw0wDdm7UycNw5wPhYFHUksQlSnvAFsX0cph_g-hjZNZhrE2kWuIsxFj9bR-LS786RCfCG3yLCLYNPGzU9W-zr4I5-agWYmzKC6xRJHiSIGNr_E1mcfhJfNTkaM1zWwCE6NEqcjKy3-DQDxcHmEObHX6zY0dckpwalmuwTgHg',
    subject: 'Advanced Mathematics & Calculus',
    rating: 4.8,
    reviewsCount: 850,
    price: 380000,
    experience: '4 Năm',
    degree: 'Thạc sĩ Toán Tin',
    university: 'ĐHQG TP.HCM',
    distance: '2.5km',
    trusted: false,
    topTutor: false,
    fastResponse: false,
    gender: 'Nam',
    format: ['Online', 'Tại nhà'],
    bio: 'Hoang Nam Tran possesses extensive expertise in teaching complex calculus, linear mathematics, and physics simulation to undergraduate students.'
  },
  {
    id: 'tutor-10',
    name: 'Phuong Linh Le',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU2wg-O-fz_hybqO8091xzjRDKgOrNeRWE-7e0n0pngOo9Mu2pEtwO4ADVcn9UxnHJEjf4_GrWNZo2Rl8ntu63CU_fB1upU1Ckc8u38zPvY9qjl11tkvPRa4vCNQAmr0RoTSiCzsGmxjN5sh_t7dA8rW89oScbOqrJ1rFsPgblcg4mN_t1pPo_O_aqrCp1mQQvHVewVVT6PynYOXOhgeXNudhhq5JAkmUZYDC8D4vfU_5ErX-T-YZgC5dhtUCirUDvo-a4Fh2tYg',
    subject: 'Python & Web Development',
    rating: 5.0,
    reviewsCount: 340,
    price: 550000,
    experience: '3 Năm',
    degree: 'Kỹ sư phần mềm',
    university: 'ĐH Swinburne',
    distance: '0.8km',
    trusted: true,
    topTutor: false,
    fastResponse: true,
    gender: 'Nữ',
    format: ['Online'],
    bio: 'Lập trình viên chuyên nghiệp chuyển hướng sư phạm. Phuong Linh dạy Python cơ bản, thiết kế web React, NodeJS với các bài thực hành thực tế.'
  },
  {
    id: 'tutor-11',
    name: 'Professor Duc Anh',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjWNSZP-uyfaE_q18LlIWJ7psP7Vmx3drbBzwCkRME8nQ94J-xT6E8wzfxWioV9MIntVBc9tThUGieg5w3x6RnvjC83m2w1xpAmteIfLe_U_B6Hikl_mO-X9emvvVyRQ0M06HISPZ1hlfc9aZLWuAW3t2nK9U7QsfJQy-9hdzxSsSEWOXylgGqYUDGUfFT226bXB2FT59mFmgKoUAMBA44jEv2AVAOZfHbtO6wdPzWSGZbmsdYg2G_TMnVza0jIgeso_mZX-P2vw',
    subject: 'Physics & Engineering Physics',
    rating: 4.7,
    reviewsCount: 2400,
    price: 600000,
    experience: '15 Năm',
    degree: 'Phó Giáo Sư',
    university: 'Đại học Bách Khoa TP.HCM',
    distance: '4.2km',
    trusted: true,
    topTutor: true,
    fastResponse: false,
    gender: 'Nam',
    format: ['Online', 'Tại nhà'],
    bio: 'PGS. TS Đức Anh là giảng viên kỳ cựu với hơn 15 năm giảng dạy vật lý cơ kỹ thuật, bán dẫn, vật lý lượng tử cho sinh viên đại học kỹ thuật.'
  },
  {
    id: 'tutor-12',
    name: 'Nguyễn Minh Anh',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmiml7YPfvw3jn8nygMT9GChsNEcelx3FUY6Mozb5bC2TR7tmuhZfRuZjrmi19OCP43w2T1l2jDMR7FoDHfRpXy6xJBMmbCAFajHDdZB-PSYG9tESPAdiDovUmziAeM7J-AHkLQcx7lImxcE3nAwnjyEO2iVWmodhvArOAq70b8vcDvrFiIRMEJUOI4Y-F6JvWS_C68O-ZRIAMqf1j-yypS4gDljOqlK8aM-zUXNSxfBWBEKhnvpkjWAcJ6KkAIhJ1Avo4ARv_5g',
    subject: 'Toán cao cấp, Luyện thi SAT',
    rating: 4.9,
    reviewsCount: 145,
    price: 450000,
    experience: '5 Năm',
    degree: 'Thạc sĩ Toán',
    university: 'Đại học Quốc Gia',
    distance: '1.2km',
    trusted: true,
    topTutor: true,
    gender: 'Nữ',
    format: ['Online', 'Tại nhà']
  }
];

export const INITIAL_POSTS: UserPost[] = [
  {
    id: 'post-1',
    title: 'Tìm gia sư IELTS 7.0 cấp tốc',
    subject: 'English',
    fee: '350.000đ/buổi',
    status: 'OPEN',
    createdAt: '20/10/2023',
    applicantsCount: 5,
    description: 'Cần gia sư kinh nghiệm dạy writing cho kỳ thi IELTS sắp tới. Học viên hiện tại ở mức 6.0, mục tiêu đạt 7.0+ trong vòng 2 tháng. Tập trung chủ yếu vào kỹ năng viết Task 2 và sửa lỗi ngữ pháp nâng cao. Tài liệu giáo trình sẽ được thảo luận thêm buổi đầu tiên.',
    schedule: 'T2-T4-T6 19:00',
    format: 'Online',
    tags: ['Tiếng Anh', 'IELTS']
  },
  {
    id: 'post-2',
    title: 'Gia sư Hóa học lớp 11',
    subject: 'Chemistry',
    fee: '220.000đ/buổi',
    status: 'MATCHED',
    createdAt: '15/10/2023',
    applicantsCount: 3,
    description: 'Tìm gia sư hỗ trợ ôn tập chương trình Hóa học hữu cơ lớp 11 cơ bản, chuẩn bỉ nền tảng cho năm lớp 12 sắp tới.',
    schedule: 'T5-CN 19:30',
    format: 'Tại nhà',
    tags: ['Hóa học', 'Lớp 11']
  },
  {
    id: 'post-3',
    title: 'Tìm gia sư Piano cho bé',
    subject: 'Music',
    fee: '250.000đ/buổi',
    status: 'EXPIRED',
    createdAt: '01/10/2023',
    applicantsCount: 0,
    description: 'Bé nhà mình 7 tuổi chưa từng học nhạc, muốn tìm gia sư kiên nhẫn để kèm cặp những bài nhạc cơ bản ban đầu.',
    schedule: 'T7-CN 09:00',
    format: 'Tại nhà',
    tags: ['Âm nhạc', 'Piano']
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Lớp học sắp bắt đầu',
    type: 'schedule',
    time: '2 phút trước',
    text: 'Lớp Toán 12 - Ôn thi đại học (Học sinh: Minh Anh) sẽ bắt đầu sau 15 phút nữa. Đừng quên chuẩn bị tài liệu nhé!',
    unread: true
  },
  {
    id: 'notif-2',
    title: 'Xác nhận thanh toán',
    type: 'payment',
    time: '45 phút trước',
    text: 'Phụ huynh học sinh Trần Đức đã thanh toán học phí tháng 10. Số tiền 2.500.000 VNĐ đã được cộng vào số dư của bạn.',
    unread: true
  },
  {
    id: 'notif-3',
    title: 'Tin nhắn từ Minh Anh',
    type: 'chat',
    time: '2 giờ trước',
    text: '"Thầy ơi, bài tập về nhà phần tích phân em chưa rõ lắm..."',
    unread: false
  },
  {
    id: 'notif-4',
    title: 'Cập nhật hệ thống',
    type: 'system',
    time: '1 ngày trước',
    text: 'Tính năng "Tài liệu chia sẻ" đã được nâng cấp. Bạn có thể tải lên tệp tin lên đến 50MB.',
    unread: false
  },
  {
    id: 'notif-5',
    title: 'Yêu cầu dời lịch học',
    type: 'schedule',
    time: '1 ngày trước',
    text: 'Học sinh Lê Hoàng muốn dời buổi học chiều nay sang sáng Thứ Bảy lúc 09:00.',
    unread: false
  },
  {
    id: 'notif-6',
    title: 'Đánh giá mới',
    type: 'system',
    time: '3 ngày trước',
    text: 'Bạn nhận được đánh giá 5 sao từ phụ huynh Nguyễn Văn B. "Thầy dạy rất nhiệt tình..."',
    unread: false
  }
];

export const INITIAL_CHATS: ChatThread[] = [
  {
    id: 'chat-1',
    tutorId: 'tutor-1',
    tutorName: 'Alex Nguyễn',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNEEYxEZHN1kIas4Ieh0A3By7b0hwi_xBYMma-htwkrav2O1G_3ISPhqXuUAkeFRu8x4xk7s3bsLWUhdmyfi0HJ13BGiPDf2sPzRg1K5sbUVulGkk4Kup38mBOXL2ZhWEeUX1K8rov6fCrFgChLnnIE35TqQByLX0o9AKCyXNorJwPSS1IT7KR3apM4Ew1eVqDEyBsim8HuEW4UcUJCSnUeSWKnpgAA0mV3eyl6nWBUR3XS49nkCaED5agNoLvsqrs95aCC7U0SA',
    status: 'Đang học',
    lastMessage: 'Được chứ, mình có tài liệu tóm tắt các công thức...',
    lastMessageTime: '09:20',
    messages: [
      {
        id: 'm1',
        sender: 'tutor',
        text: 'Chào bạn! Mình đã xem qua yêu cầu bài tập Toán cao cấp của bạn. Bạn muốn tập trung vào phần Đạo hàm hay Tích phân trước?',
        timestamp: '09:15'
      },
      {
        id: 'm2',
        sender: 'user',
        text: 'Chào anh, em muốn bắt đầu với Tích phân ạ. Em đang gặp khó khăn với phương pháp đổi biến số.',
        timestamp: '09:18'
      },
      {
        id: 'm3',
        sender: 'tutor',
        text: 'Được chứ, mình có tài liệu tóm tắt các công thức đổi biến số hay dùng đây. Bạn xem qua nhé.',
        timestamp: '09:20',
        file: {
          name: 'Cong-thuc-Tich-phan.pdf',
          size: '1.2 MB',
          type: 'PDF'
        }
      }
    ]
  },
  {
    id: 'chat-2',
    tutorId: 'tutor-9',
    tutorName: 'Thầy Hoàng Nam',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBu0xvhwCDfDLwt6y0FpzXOs5EEeE-wuJdv1HdEeIOPFqE8ZbRrlcW22useglH9QkB69auo0-kSPWUFR40oaiXA1Dli1gi_lSd_89E6hyS1zQ8ynznnK7y9XyyDtmd5yTxds4q0ZEl2II1IjJ9xiZ2rGQL7eBdLl1sUpw5V1TyTK-QClH4kg3z5KwUZmQJDzNKrPUetYwoVIIs8_u1a7s18D7MkwzXxvhzAgL9jMy4ObaQmcX3ObFY_se11RBnHtwDmXHzV2lL76A',
    status: 'Đang học',
    lastMessage: 'Hẹn gặp em vào buổi học tối nay lúc 7 giờ nhé.',
    lastMessageTime: '14:20',
    unreadCount: 2,
    messages: [
      {
        id: 'm1-2',
        sender: 'tutor',
        text: 'Hẹn gặp em vào buổi học tối nay lúc 7 giờ nhé. Nhớ ôn lại bài tập hôm trước nhé.',
        timestamp: '14:20'
      }
    ]
  },
  {
    id: 'chat-3',
    tutorId: 'tutor-12',
    tutorName: 'Cô Minh Anh',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCffXySvYQKrlnmEzcBvAfInYZRlILaIGE7Ykk9igDmXGMD4RPSJ8U94AKNMs4IKOFPcOlkYK6IAmfPldDouAKBgw5vjd5aoM-5q0NqH_667coupYYMkpy5TAsQB2qrzXeJXYGpsLgi7xenQlG56MgC6nl5pTxlyPABspF9O0gUIrvmr8b-fv9GBHKbQFBnVa-htDmQuX2dcJRL_A_LFrZH6QTMwkWd5f_RmS2NqB7mi78gBD4Lkmd6ObC8pSyv1JawDfOlILS5PA',
    status: 'Học thử',
    lastMessage: 'Bạn: Em cảm ơn cô nhiều ạ. Buổi học thử rất thú vị!',
    lastMessageTime: 'Hôm qua',
    messages: [
      {
        id: 'm3-1',
        sender: 'tutor',
        text: 'Rất vui được học thử cùng em. Em chuẩn bị thêm bài tập nhé.',
        timestamp: 'Hôm kia'
      },
      {
        id: 'm3-2',
        sender: 'user',
        text: 'Em cảm ơn cô nhiều ạ. Buổi học thử rất thú vị!',
        timestamp: 'Hôm qua'
      }
    ]
  },
  {
    id: 'chat-4',
    tutorId: 'tutor-11',
    tutorName: 'Thầy Quốc Bảo',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtrQDFbhqbpgUTcUu5rUu8ThqMJzg3080cLL909SoWtQoIk3OMSxpyj8VoQ-kmd9r5ADf9xseivjcFmYRodqw9FkQ66mm3zsJv69_DOkYP5IiVY7O2Y0R0uLra6rhHV0i5kAH6p-nfYK9Cry8W4FbDZ1Yeatgh-x4mMYw26e2W2p2wcsaL093P04KxsS7Ptbb2xS0IMTnM-plUgHotqtsHHljBl8XD7G96nFqqAFMUo_seW1NZ76miWoynLKhmvFdEUHwbWxFgDg',
    status: 'Đang học',
    lastMessage: 'Đã gửi một tài liệu: Chuyen_de_Vat_Ly_12.pdf',
    lastMessageTime: 'Thứ 3',
    messages: [
      {
        id: 'm4-1',
        sender: 'tutor',
        text: 'Nội dung ôn thi tốt nghiệp môn Lý đây, em tải về học nhé.',
        timestamp: 'Thứ 3'
      },
      {
        id: 'm4-2',
        sender: 'tutor',
        text: 'Đã gửi một tài liệu: Chuyen_de_Vat_Ly_12.pdf',
        timestamp: 'Thứ 3',
        file: {
          name: 'Chuyen_de_Vat_Ly_12.pdf',
          size: '3.4 MB',
          type: 'PDF'
        }
      }
    ]
  },
  {
    id: 'chat-5',
    tutorId: 'tutor-7',
    tutorName: 'Cô Thảo Vy',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGcv0jm78ZJ6Z8m9tY8Ij1pStYBOrY9pMaa9pyTnABdj0ULbOyCp9w-lICHzh5NBleNFVtluI2vyvs8ADVMXgckOVjmMl7h9qDP_4lbFgjb5WGoC6rXvcG0c4xJsZgCQ3ZMXYrvwFMe0_Hpwh-68qZstEjDM7OENowub_ZJH84neHxxMdqjBXgxLOvNEIh37b3Zvuii689cMrY5no52zCPIcyj_M5lY8SnsyXHRCN5qC-Jrife7AmTnampCW5bYIRmnB36jlowgQ',
    status: 'Hoàn thành',
    lastMessage: 'Bạn: Dạ vâng em đã nhận được link Zoom rồi ạ.',
    lastMessageTime: '12/05',
    messages: [
      {
        id: 'm5-1',
        sender: 'tutor',
        text: 'Chào em, cô gửi link lớp học nhé.',
        timestamp: '12/05'
      },
      {
        id: 'm5-2',
        sender: 'user',
        text: 'Dạ vâng em đã nhận được link Zoom rồi ạ.',
        timestamp: '12/05'
      }
    ]
  }
];

export const INITIAL_PROFILE: UserProfile = {
  name: 'Nguyễn Minh Anh',
  email: 'myle15082004@gmail.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjnX0K79JZnAHoLjthWMxYthSZoCMJtD-v1bgyhmquL_nornc7cXfdyU3EZwj1LFFstnL-dSrEpj4Ju8K_LV5EV2RxnZKPT9D17iDV6rv7U3kVYCevP4VROqzFXpGcFHfU58DhmEVohfd-31Rw464LzAA8UsqpGO-811fo0hy1-vgsO4B_rmivF6j6jw3wOIUDgG4TgI6LrUJN_KD5CIzNfsgEKc-aI5J9jk_sxu8a0Psc3TDVhLCnktvbVcIMk-RtzgG9uJ6diA',
  level: 'Lớp 12',
  budget: '500000',
  target: 'Đạt 8.0 IELTS trong vòng 6 tháng tới để đi du học...',
  supportSubjects: ['Toán', 'Anh Văn', 'Lý'],
  parentName: '',
  parentPhone: '',
  weeklySchedule: {
    'Thứ 2': { morning: false, afternoon: true, evening: true },
    'Thứ 3': { morning: true, afternoon: false, evening: true },
    'Thứ 4': { morning: false, afternoon: false, evening: true },
    'Thứ 5': { morning: false, afternoon: false, evening: false },
    'Thứ 6': { morning: false, afternoon: false, evening: false },
    'Thứ 7': { morning: false, afternoon: false, evening: false },
    'Chủ Nhật': { morning: false, afternoon: false, evening: false }
  }
};

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    tutorId: 'tutor-1',
    ratingDate: '2026-06-15T10:00:00Z',
    ratings: {
      quality: 5,
      punctuality: 5,
      attitude: 5,
      support: 5
    },
    averageScore: 5.0,
    feedback: 'Thầy Nguyễn Văn A dạy cực kỳ tận tâm. Thầy giải thích các phần tích phân nâng cao rất dễ hiểu. Nhờ thầy mà em từ học sinh trung bình tấn lên được điểm 9 trong kỳ thi học kỳ vừa rồi.',
    anonymous: false,
    attachments: []
  },
  {
    id: 'rev-2',
    tutorId: 'tutor-1',
    ratingDate: '2026-06-14T14:30:00Z',
    ratings: {
      quality: 5,
      punctuality: 4,
      attitude: 5,
      support: 4
    },
    averageScore: 4.8,
    feedback: 'Phương pháp dạy của thầy tập trung vào tư duy logic chứ không chỉ là nhớ công thức. Rất chuyên nghiệp và chu đáo, luôn chuẩn bị bài trước giờ học.',
    anonymous: true,
    attachments: []
  },
  {
    id: 'rev-3',
    tutorId: 'tutor-2',
    ratingDate: '2026-06-18T09:15:00Z',
    ratings: {
      quality: 5,
      punctuality: 5,
      attitude: 4,
      support: 5
    },
    averageScore: 4.8,
    feedback: 'Cô Lan Anh ôn IELTS cực tốt luôn ạ. Phát âm chuẩn, giáo trình bám sát đề thi thật. Cô sửa bài writing cực kỳ chi tiết luôn.',
    anonymous: false,
    attachments: []
  },
  {
    id: 'rev-4',
    tutorId: 'tutor-3',
    ratingDate: '2026-06-10T08:00:00Z',
    ratings: {
      quality: 4,
      punctuality: 5,
      attitude: 5,
      support: 4
    },
    averageScore: 4.5,
    feedback: 'Thầy Hoàng chuyên trị Toán cao cấp đại học. Em học bách khoa suýt tạch môn Giải tích 1, may có thầy cứu cánh kèm cấp tốc 2 tuần qua môn điểm B+ luôn.',
    anonymous: false,
    attachments: []
  }
];

