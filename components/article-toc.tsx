"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type TocItem = {
  id: string;
  title: string;
  level: 2 | 3 | 4;
};

type ArticleTocProps = {
  items: TocItem[];
};

const VIEWPORT_OFFSET = 160;

export function ArticleToc({ items }: ArticleTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const containerRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [listOffset, setListOffset] = useState(0);
  const resolvedActiveId =
    activeId && items.some((item) => item.id === activeId) ? activeId : (items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const getVisibleItems = () =>
      items
        .map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }))
        .filter((entry): entry is { id: string; element: HTMLElement } => Boolean(entry.element));

    const updateActiveItem = () => {
      const visibleItems = getVisibleItems();

      if (visibleItems.length === 0) {
        return;
      }

      const firstItem = visibleItems[0];
      let nextActiveId = firstItem.id;

      for (const entry of visibleItems) {
        if (entry.element.getBoundingClientRect().top <= VIEWPORT_OFFSET) {
          nextActiveId = entry.id;
        } else {
          break;
        }
      }

      setActiveId(nextActiveId);
    };

    updateActiveItem();

    let ticking = false;
    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveItem();
        ticking = false;
      });
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");

      if (hash) {
        setActiveId(hash);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [items]);

  useEffect(() => {
    if (items.length === 0 || !resolvedActiveId || !containerRef.current || !listRef.current) {
      return;
    }

    const activeLink = listRef.current.querySelector<HTMLAnchorElement>(
      `[data-toc-id="${CSS.escape(resolvedActiveId)}"]`,
    );

    if (!activeLink) {
      return;
    }

    const containerHeight = containerRef.current.clientHeight;
    const listHeight = listRef.current.scrollHeight;
    const activeTop = activeLink.offsetTop;
    const activeHeight = activeLink.offsetHeight;
    const targetOffset = Math.max(
      0,
      Math.min(
        activeTop - containerHeight / 2 + activeHeight / 2,
        Math.max(0, listHeight - containerHeight),
      ),
    );

    setListOffset(targetOffset);
  }, [resolvedActiveId, items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="glass-panel rounded-[1.6rem] p-5 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
        Table Of Contents
      </p>
      <nav
        ref={containerRef}
        className="mt-4 overflow-hidden text-sm leading-7 text-slate-600 lg:flex-1 lg:min-h-0"
      >
        <div
          ref={listRef}
          className="space-y-3 pr-2 transition-transform duration-500 ease-out"
          style={{ transform: `translateY(-${listOffset}px)` }}
        >
          {items.map((item, index) => {
            const isActive = item.id === resolvedActiveId;

            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                aria-current={isActive ? "location" : undefined}
                data-toc-id={item.id}
                className={`block rounded-2xl px-4 py-3 transition ${
                  isActive
                    ? "border border-amber-200/60 bg-[linear-gradient(135deg,rgba(255,246,230,0.98),rgba(255,239,208,0.92))] text-amber-950 shadow-[0_18px_40px_rgba(217,119,6,0.12)]"
                    : "bg-white/70 hover:bg-white hover:text-slate-950"
                } ${item.level === 3 ? "ml-3" : item.level === 4 ? "ml-6" : ""}`}
              >
                <span
                  className={`mr-2 inline-block h-2 w-2 rounded-full ${
                    isActive ? "bg-amber-400" : "bg-slate-300"
                  }`}
                />
                {index + 1}. {item.title}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
