import { notFound } from "next/navigation";

/** Sends unknown URLs inside a locale (e.g. /es/foo) to the localized 404 page. */
export default function CatchAll() {
  notFound();
}
