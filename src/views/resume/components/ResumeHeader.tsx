import React from "react";
import avatarImg from "@/assets/images/avatar.jpg";

type Contact = {
  phone?: string;
  email?: string;
  location?: string;
  website?: string;
};

type HeaderProps = {
  title: string;
  subtitle?: string;
  contact?: Contact;
};

const ResumeHeader: React.FC<HeaderProps> = ({ title, subtitle, contact }) => {
  return (
    <header className="resume-print bg-theme-secondary/60 rounded-2xl p-4 md:p-6 shadow-custom-shadow">
      <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <img
          src={avatarImg}
          alt="职业照片"
          loading="lazy"
          className="h-28 w-28 rounded-2xl object-cover shadow-lg ring-1 ring-theme-border mx-auto md:mx-0"
        />
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight mb-2">{title}</h1>
          {subtitle && (
            <p className="text-sm md:text-base text-theme-secondary mb-4">{subtitle}</p>
          )}
          {contact && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {contact.phone && <span className="text-theme-secondary">{contact.phone}</span>}
              {contact.email && <span className="text-theme-secondary">{contact.email}</span>}
              {contact.location && <span className="text-theme-secondary">{contact.location}</span>}
              {contact.website && <span className="text-theme-secondary">{contact.website}</span>}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ResumeHeader;