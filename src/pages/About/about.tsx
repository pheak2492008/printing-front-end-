import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ChevronRight,
  Award,
  Users,
  Globe,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

/* ── TRANSLATIONS ── */
const aboutTx = {
  km: {
    title: "អំពីយើង",
    heroTitle: "PrintMaster",
    heroSub: "ភាពច្បាស់លាស់ក្នុងគ្រប់ភីកសែល",
    missionTitle: "បេសកកម្មរបស់យើង",
    missionDesc:
      "នៅ PrintMaster យើងផ្តល់អំណាចដល់ការច្នៃប្រឌិតដោយផ្តល់នូវដំណោះស្រាយបោះពុម្ពដែលមានគុណភាពខ្ពស់ និងអាចចូលដំណើរការបានសម្រាប់បុគ្គល និងអាជីវកម្មដូចគ្នា។ យើងជឿថាគំនិតទាំងអស់សមនឹងទទួលបានជីវិតជាមួយនឹងភាពជាក់លាក់ ការយកចិត្តទុកដាក់ និងការអនុវត្តប្រកបដោយនិរន្តរភាពដែលគោរពពិភពលោករបស់យើង។",
    historyTitle: "ប្រវត្តិរបស់យើង",
    history: [
      {
        year: "2010",
        text: "ត្រូវបានបង្កើតឡើងជាហាងបោះពុម្ពក្នុងស្រុកតូចមួយនៅកណ្តាលក្រុង Portland ។",
      },
      {
        year: "2015",
        text: "ពង្រីកទៅជាវេទិកាឌីជីថល និងណែនាំការដឹកជញ្ជូនក្នុងរយៈពេល ២៤ ម៉ោង។",
      },
      {
        year: "បច្ចុប្បន្ន",
        text: "បម្រើអតិថិជនជាង ១ លាននាក់ទូទាំងប្រទេសជាមួយនឹងបច្ចេកវិទ្យាទឹកថ្នាំដែលមិនប៉ះពាល់ដល់បរិស្ថាន។",
      },
    ],
    teamTitle: "ក្រុមការងាររបស់យើង",
    contactTitle: "ទំនាក់ទំនងមកយើង",
    headquarters: "ទីស្នាក់ការកណ្តាល (សែនសុខ)",
    telegram: "តេឡេក្រាម",
    addressDetail: "ផ្លូវ ១៩៨៦, សង្កាត់ភ្នំពេញថ្មី, ខណ្ឌសែនសុខ, ភ្នំពេញ",
    callUs: "ហៅទូរស័ព្ទ",
    emailUs: "ផ្ញើអ៊ីមែល",
  },
  en: {
    title: "About Us",
    heroTitle: "PrintMaster",
    heroSub: "Precision in every pixel",
    missionTitle: "Our Mission",
    missionDesc:
      "At PrintMaster, we empower creativity by providing high-quality, accessible printing solutions for individuals and businesses alike.We believe every idea deserves to be brought to life with precision, care, and sustainable practices that respect our planet.",
    historyTitle: "Our History",
    history: [
      {
        year: "2010",
        text: "Founded as a small local print shop in downtown Portland.",
      },
      {
        year: "2015",
        text: "Expanded to digital platforms and introduced 24-hour delivery.",
      },
      {
        year: "Present",
        text: "Serving over 1 million customers nationwide with eco-friendly ink technology.",
      },
    ],
    teamTitle: "Meet the Team",
    contactTitle: "Contact Us",
    headquarters: "Headquarters (Sen Sok)",
    telegram: "Telegram",
    addressDetail: "St. 1986, Phnom Penh Thmei, Sen Sok, Phnom Penh",
    callUs: "Call Us",
    emailUs: "Email Us",
  },
  zh: {
    title: "关于我们",
    heroTitle: "PrintMaster",
    heroSub: "像素级的精准",
    missionTitle: "我们的使命",
    missionDesc:
      "PrintMaster致力於透過為個人和企業提供高品質、易於使用的印刷解決方案來激發創造力。我們相信，每一個創意都值得以精準、細緻和尊重地球的永續方式來實現。",
    historyTitle: "我们的历史",
    history: [
      { year: "2010", text: "在波特兰市中心成立，最初是一家小型当地印刷店。" },
      { year: "2015", text: "扩展到数字化平台，并推出了 24 小时送货服务。" },
      {
        year: "至今",
        text: "采用环保油墨技术，为全国超过 100 万客户提供服务。",
      },
    ],
    teamTitle: "核心团队",
    contactTitle: "联系我们",
    headquarters: "总部 (森速区)",
    telegram: "电报 (Telegram)",
    addressDetail: "金边市，森速区，新金边分区，1986路",
    callUs: "致电我们",
    emailUs: "发送邮件",
  },
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = aboutTx[lang as keyof typeof aboutTx] || aboutTx.en;

  const contactInfo = {
    phone: "+855 12 345 678",
    email: "hello@printmaster.com",
    telegramUser: "printmaster_kh",
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* ── HERO SECTION ── */}
      <section className="relative h-[40vh] flex items-center justify-center bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Office"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight uppercase tracking-widest">
            {t.heroTitle}
          </h1>
          <p className="text-sm md:text-base text-sky-400 font-bold tracking-[0.3em] uppercase">
            {t.heroSub}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* ── MISSION & HISTORY ── */}
        <section className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-4xl font-extrabold text-slate-900">
              {t.missionTitle}
            </h2>
            <p className="text-slate-500 text-xl leading-relaxed">
              {t.missionDesc}
            </p>

            {/* Visual Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <Award className="mx-auto text-sky-600 mb-2" size={24} />
                <p className="text-xl font-bold">14+</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">
                  Years
                </p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <Users className="mx-auto text-sky-600 mb-2" size={24} />
                <p className="text-xl font-bold">1M+</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">
                  Clients
                </p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <Globe className="mx-auto text-sky-600 mb-2" size={24} />
                <p className="text-xl font-bold">24/7</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">
                  Online
                </p>
              </div>
            </div>
          </div>

          {/* HISTORY TIMELINE (Based on design image) */}
          <div className="bg-sky-50/50 rounded-[40px] p-10 relative">
            <h3 className="text-2xl font-bold text-slate-900 mb-10">
              {t.historyTitle}
            </h3>
            <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-sky-200">
              {t.history.map((item, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-sky-400 z-10 shadow-sm" />
                  <h4 className="font-bold text-sky-500 text-sm mb-1 uppercase tracking-wider">
                    {item.year}
                  </h4>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MEET THE TEAM ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              {t.teamTitle}
            </h2>
            <div className="h-1.5 w-20 bg-sky-500 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Rivera",
                role: "CEO",
                img: "https://i.pravatar.cc/300?img=11",
              },
              {
                name: "Sarah Chen",
                role: "Design",
                img: "https://i.pravatar.cc/300?img=5",
              },
              {
                name: "Sok Rath",
                role: "Operations",
                img: "https://i.pravatar.cc/300?img=12",
              },
              {
                name: "Vannak Sam",
                role: "Specialist",
                img: "https://i.pravatar.cc/300?img=13",
              },
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="aspect-square rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.img}
                    className="w-full h-full object-cover"
                    alt={member.name}
                  />
                </div>
                <h4 className="font-bold text-slate-900">{member.name}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT & MAP SECTION ── */}
        <section className="grid lg:grid-cols-2 gap-12 items-start pt-20 border-t border-slate-100">
          <div className="space-y-8">
            <h2 className="text-4xl font-extrabold text-slate-900">
              {t.contactTitle}
            </h2>

            <div className="grid gap-4">
              <a
                href={`tel:${contactInfo.phone}`}
                className="group flex items-center justify-between p-6 bg-slate-50 hover:bg-white hover:shadow-xl rounded-3xl border border-slate-100 transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white text-sky-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <Phone size={26} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {t.callUs}
                    </p>
                    <p className="text-xl font-bold text-slate-900">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-sky-600 transition-colors" />
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="group flex items-center justify-between p-6 bg-slate-50 hover:bg-white hover:shadow-xl rounded-3xl border border-slate-100 transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white text-sky-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <Mail size={26} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {t.emailUs}
                    </p>
                    <p className="text-xl font-bold text-slate-900">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-sky-600 transition-colors" />
              </a>

              <a
                href={`https://t.me/${contactInfo.telegramUser}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-6 bg-sky-50/50 hover:bg-sky-600 hover:shadow-xl rounded-3xl border border-sky-100 transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white text-[#229ED9] rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-white transition-colors">
                    <Send size={26} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest group-hover:text-sky-100">
                      {t.telegram}
                    </p>
                    <p className="text-xl font-bold text-slate-900 group-hover:text-white transition-colors">
                      @{contactInfo.telegramUser}
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-sky-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-3 rounded-[40px] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden h-[450px]">
              <iframe
                title="Sen Sok Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.625442526543!2d104.87243937584168!3d11.578644888623415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951a37c34d3d3%3A0x6b801a6b0c619888!2sSen%20Sok%2C%20Phnom%20Penh!5e0!3m2!1sen!2skh!4v1711512345678"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "32px" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div className="bg-slate-900 rounded-[32px] p-8 text-white flex items-start gap-5">
              <div className="shrink-0 w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-sky-400">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{t.headquarters}</h4>
                <p className="text-slate-400 font-medium leading-relaxed">
                  {t.addressDetail}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
