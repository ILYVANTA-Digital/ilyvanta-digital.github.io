"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
const SculptureScene = dynamic(() => import("./sculpture-scene"), {
  ssr: false,
  loading: () => null,
});
class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export function HeroArt() {
  const area = useRef<HTMLDivElement>(null);
  const [eligible, setEligible] = useState(false);
  const [requested, setRequested] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 900px)");
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const update = () => {
      const capable =
        desktop.matches &&
        !motion.matches &&
        (nav.hardwareConcurrency || 4) >= 4 &&
        (nav.deviceMemory || 4) >= 4 &&
        !nav.connection?.saveData &&
        !["slow-2g", "2g"].includes(nav.connection?.effectiveType || "");
      setEligible(capable);
      if (!capable) {
        setRequested(false);
        setReady(false);
      }
    };
    update();
    motion.addEventListener("change", update);
    desktop.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
    };
  }, []);
  useEffect(() => {
    const target = area.current;
    if (!target) return;
    let inView = true;
    const update = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { threshold: 0.1 },
    );
    observer.observe(target);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  function activate() {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2", { failIfMajorPerformanceCaveat: true });
    if (!gl) {
      setFailed(true);
      return;
    }
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    setRequested(true);
  }
  function fail() {
    setFailed(true);
    setRequested(false);
    setReady(false);
  }
  return (
    <div className="hero-art" ref={area}>
      <Image
        src="/assets/brand-sculpture.webp"
        alt="Interwoven teal glass and brushed-metal sculpture representing connected systems"
        fill
        priority
        sizes="(max-width: 760px) 100vw, 55vw"
      />
      {requested && eligible && !failed && (
        <div className={`hero-live ${ready ? "scene-ready" : ""}`} aria-hidden="true">
          <SceneBoundary onFailure={fail}>
            <SculptureScene
              active={visible && !paused}
              onReady={() => setReady(true)}
              onFailure={fail}
            />
          </SceneBoundary>
        </div>
      )}
      <div className="art-controls">
        {eligible &&
          !failed &&
          (requested ? (
            <>
              <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
                {paused ? "Resume 3D" : "Pause 3D"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setRequested(false);
                  setReady(false);
                }}
              >
                Still image
              </button>
            </>
          ) : (
            <button type="button" onClick={activate}>
              Explore in 3D ↗
            </button>
          ))}
        {failed && <span role="status">Still artwork shown on this device.</span>}
      </div>
      <div className="art-caption">
        <span>FORM / FUNCTION / CONNECTION</span>
        <span>ILYVANTA — 01</span>
      </div>
    </div>
  );
}
