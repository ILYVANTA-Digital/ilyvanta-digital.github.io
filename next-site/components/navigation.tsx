"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const links = [
  ["Services", "/services/"],
  ["Work", "/work/"],
  ["Solutions", "/solutions/"],
  ["Studio", "/about/"],
  ["Insights", "/insights/"],
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="ILYVANTA Digital Studio home">
        <span className="brand-mark" aria-hidden="true">
          I<span>.</span>
        </span>
        <span>
          ILYVANTA<small>DIGITAL STUDIO</small>
        </span>
      </Link>
      <button
        ref={button}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        Menu <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav id="navigation" aria-label="Main navigation" className={open ? "nav-open" : ""}>
        {links.map(([name, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={path?.startsWith(href) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {name}
          </Link>
        ))}
        <Link href="/contact/" className="nav-contact" onClick={() => setOpen(false)}>
          Let’s talk <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
