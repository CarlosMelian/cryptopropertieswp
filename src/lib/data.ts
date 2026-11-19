/**
 * Non-text data for the homepage. Visible copy lives in src/i18n/dictionaries
 * and is matched to these lists by position, so keep the order in sync.
 */
import {
  Building2,
  Coins,
  Scale,
  Stamp,
  ShieldCheck,
  Globe2,
  Wallet,
  Home,
  LineChart,
  Building,
  Plane,
  Network,
  Link2,
  Landmark,
  ScrollText,
  CircleDollarSign,
  Banknote,
  Sun,
  Layers,
  Gem,
  Compass,
} from "lucide-react";

export const trustIcons = [Building2, Coins, Scale, Stamp, ShieldCheck, Globe2];

export const statValues = [
  { value: "140", suffix: "M+" },
  { value: "380", suffix: "+" },
  { value: "210", suffix: "+" },
  { value: "24", suffix: "" },
];

export const serviceIcons = [Wallet, Home, LineChart, Building, Plane, Network, Link2];

export const advantageIcons = [Landmark, ScrollText, CircleDollarSign, Banknote, Plane, Sun];

export const philosophyIcons = [ShieldCheck, Layers, Gem, Compass, Link2];
