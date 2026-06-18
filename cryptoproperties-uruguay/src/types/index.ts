import type { LucideIcon } from "lucide-react";

export interface TrustItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  tag?: string;
}

export interface AdvantageItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
}

export interface Article {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
}
