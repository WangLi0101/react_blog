import React from "react";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
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
    <header className="resume-print relative overflow-hidden bg-theme-card border border-theme-border rounded-2xl p-6 md:p-8 shadow-lg transition-all hover:shadow-xl">
      {/* Decorative background accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full -mr-16 -mt-16 pointer-events-none" />
      
      <div className="relative flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
          <img
            src={avatarImg}
            alt="职业照片"
            loading="lazy"
            className="relative h-32 w-32 rounded-2xl object-cover shadow-md ring-2 ring-white dark:ring-gray-800"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-theme-text-primary mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-primary font-medium mb-6">
              {subtitle}
            </p>
          )}
          {contact && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm md:text-base">
              {contact.phone && (
                <span className="flex items-center justify-center md:justify-start gap-2.5 text-theme-text-secondary hover:text-primary transition-colors cursor-default">
                  <div className="p-1.5 bg-theme-bg-secondary rounded-md">
                    <Phone className="h-4 w-4" />
                  </div>
                  {contact.phone}
                </span>
              )}
              {contact.email && (
                <a
                  className="flex items-center justify-center md:justify-start gap-2.5 text-theme-text-secondary hover:text-primary transition-colors"
                  href={`mailto:${contact.email}`}
                >
                  <div className="p-1.5 bg-theme-bg-secondary rounded-md">
                    <Mail className="h-4 w-4" />
                  </div>
                  {contact.email}
                </a>
              )}
              {contact.location && (
                <span className="flex items-center justify-center md:justify-start gap-2.5 text-theme-text-secondary hover:text-primary transition-colors cursor-default">
                  <div className="p-1.5 bg-theme-bg-secondary rounded-md">
                    <MapPin className="h-4 w-4" />
                  </div>
                  {contact.location}
                </span>
              )}
              {contact.website && (
                <a
                  className="flex items-center justify-center md:justify-start gap-2.5 text-theme-text-secondary hover:text-primary transition-colors"
                  href={contact.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="p-1.5 bg-theme-bg-secondary rounded-md">
                    <Globe className="h-4 w-4" />
                  </div>
                  {contact.website}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ResumeHeader;
