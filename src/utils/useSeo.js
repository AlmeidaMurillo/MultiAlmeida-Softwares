import { useEffect } from "react";

function upsertMetaByName(name, content) {
  if (content == null || content === "") return;

  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function upsertMetaByProperty(property, content) {
  if (content == null || content === "") return;

  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (!href) return;

  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

/**
 * Hook simples para SEO em SPA.
 * - Atualiza title
 * - Atualiza description/robots
 * - Atualiza OpenGraph/Twitter
 * - Define canonical baseado na URL atual
 */
export default function useSeo({
  title,
  description,
  noindex = false,
  canonical,
  ogImage,
  twitterCard = "summary_large_image",
} = {}) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const resolvedTitle = title || "MultiAlmeida Softwares";
    document.title = resolvedTitle;

    const resolvedCanonical =
      canonical ||
      (typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}` : "");

    const resolvedDescription = description || "";

    upsertMetaByName("description", resolvedDescription);
    upsertMetaByName("robots", noindex ? "noindex,nofollow" : "index,follow");

    upsertMetaByProperty("og:type", "website");
    upsertMetaByProperty("og:site_name", "MultiAlmeida Softwares");
    upsertMetaByProperty("og:title", resolvedTitle);
    if (resolvedDescription) upsertMetaByProperty("og:description", resolvedDescription);
    if (resolvedCanonical) upsertMetaByProperty("og:url", resolvedCanonical);
    if (ogImage) upsertMetaByProperty("og:image", ogImage);

    upsertMetaByName("twitter:card", twitterCard);
    upsertMetaByName("twitter:title", resolvedTitle);
    if (resolvedDescription) upsertMetaByName("twitter:description", resolvedDescription);
    if (ogImage) upsertMetaByName("twitter:image", ogImage);

    upsertLink("canonical", resolvedCanonical);
  }, [title, description, noindex, canonical, ogImage, twitterCard]);
}
