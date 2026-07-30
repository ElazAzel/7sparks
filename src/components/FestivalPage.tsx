"use client";

import {
  Aperture,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Camera,
  Clapperboard,
  ExternalLink,
  Feather,
  Film,
  Heart,
  Menu,
  MonitorPlay,
  Play,
  Sparkles,
  Users,
  Volume2,
  WandSparkles,
  X,
  Download,
  Gamepad2,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  authors,
  films,
  representedTeams,
  type FestivalFilm,
} from "@/src/data/festival";

const days = [
  ["01", "Вселенная", "Мир, герои и визуальный код проекта"],
  ["02", "История", "Сценарий, сцены и первая раскадровка"],
  ["03", "Звук", "Озвучка, гимн и музыкальная атмосфера"],
  ["04", "Портал", "Сайт и цифровая упаковка проекта"],
  ["05", "Премьера", "Финальный монтаж и встреча со зрителем"],
];

const videoDays = [
  ["01", "27 июля", "День первый — Вселенная", "tBD"],
  ["02", "28 июля", "День второй — История", "tBD"],
  ["03", "29 июля", "День третий — Звук", "tBD"],
  ["04", "30 июля", "День четвёртый — Портал", "tBD"],
  ["05", "31 июля", "День пятый — Премьера", "tBD"],
];

const results = [
  [29, "юных авторов"],
  [9, "премьерных слотов"],
  [5, "дней продакшена"],
  [1, "большой экран"],
];

const program = [
  ["10:00", "Репетиция выступлений", "Финальный прогон и настройка материалов"],
  ["11:00", "Фестивальное пространство", "Фотозона и выставка персонажей"],
  ["13:00", "Главная сцена", "Премьеры, презентации и финальный показ"],
];

const nominations = [
  ["Искра режиссуры", Camera],
  ["Искра истории", Feather],
  ["Искра героя", Users],
  ["Искра музыки", Volume2],
  ["Искра визуального мира", Aperture],
  ["Искра дизайна мира", WandSparkles],
  ["Искра цифрового дизайна", MonitorPlay],
  ["Искра зрительских симпатий", Heart],
  ["Искра командного творчества", Sparkles],
];

const CERTIFICATES_URL =
  "https://drive.google.com/drive/folders/1F97zz0QJEt0xipr59NorXsSF-mbhD6vQ?usp=sharing";

function scrollToId(id: string, closeMenu?: () => void) {
  closeMenu?.();
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
}

function FestivalMark({
  compact = false,
  light = false,
}: {
  compact?: boolean;
  light?: boolean;
}) {
  return (
    <span
      className={`festival-mark ${compact ? "festival-mark--compact" : ""} ${
        light ? "festival-mark--light" : ""
      }`}
      aria-hidden="true"
    >
      {films.map((film, index) => (
        <i
          key={film.id}
          style={
            {
              "--ray": film.accentColor,
              "--angle": `${index * (360 / films.length)}deg`,
            } as CSSProperties
          }
        />
      ))}
      <b />
    </span>
  );
}

function Intro({ onFinish }: { onFinish: () => void }) {
  return (
    <motion.div
      className="intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "brightness(2)", transition: { duration: 0.32 } }}
      role="dialog"
      aria-label="Заставка фестиваля"
    >
      <div className="intro__dust" aria-hidden="true" />
      <div className="intro__count" aria-hidden="true">
        <span>3</span>
        <span>2</span>
        <span>1</span>
      </div>
      <motion.div
        className="intro__title"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0 0 0)" }}
        transition={{ delay: 1.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <FestivalMark light />
        <strong>9 ИСКР</strong>
        <small>FIRST CUT · 2026</small>
      </motion.div>
      <button className="intro__skip" type="button" onClick={onFinish}>
        Пропустить
      </button>
    </motion.div>
  );
}

function SectionReveal({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 54 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

function FilmArtwork({
  film,
  compact = false,
}: {
  film: FestivalFilm;
  compact?: boolean;
}) {
  return (
    <div
      className={`film-art film-art--${film.art} ${compact ? "film-art--compact" : ""}`}
      style={
        {
          "--accent": film.accentColor,
          "--secondary": film.secondaryColor,
        } as CSSProperties
      }
      role="img"
      aria-label={film.artAlt}
    >
      <div className="film-art__leak" aria-hidden="true" />
      <div className="film-art__grain" aria-hidden="true" />
      <div className="film-art__shape film-art__shape--one" aria-hidden="true" />
      <div className="film-art__shape film-art__shape--two" aria-hidden="true" />
      <span className="film-art__number">{film.number}</span>
      <span className="film-art__studio">{film.studio}</span>
      <span className="film-art__code">FRAME {film.number} · 9S/26</span>
      {film.isSecret && (
        <div className="film-art__secret">
          <Sparkles aria-hidden="true" />
          <strong>?</strong>
          <span>SECRET CUT</span>
        </div>
      )}
    </div>
  );
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      const frame = requestAnimationFrame(() => setShown(value));
      return () => cancelAnimationFrame(frame);
    }
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - started) / 850, 1);
      setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);

  return <span ref={ref}>{shown}</span>;
}

function MagneticButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (reduced || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
    event.currentTarget.style.transform = `translate(${x}px, ${y}px) rotate(-1deg)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <button
      ref={ref}
      className={`ticket-button ${className}`}
      type="button"
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </button>
  );
}

function FilmDialog({
  film,
  onClose,
  onPortal,
}: {
  film: FestivalFilm;
  onClose: () => void;
  onPortal: (film: FestivalFilm) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusables = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        "button, a[href], [tabindex]:not([tabindex='-1'])",
      ),
    );
    focusables[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("dialog-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("dialog-open");
    };
  }, [onClose]);

  const totalSlots = films.length;

  return (
    <motion.div
      className="dialog-backdrop"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        className="film-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="film-dialog-title"
        initial={{ y: "8vh", opacity: 0, rotate: 0.8 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: "5vh", opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        <button
          className="round-button film-dialog__close"
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <X />
        </button>
        <div className="film-dialog__visual">
          <FilmArtwork film={film} />
          <span className="tape tape--dialog" aria-hidden="true" />
        </div>
        <div className="film-dialog__content">
          <p className="micro-label">Премьерный слот · {film.number}/{String(totalSlots).padStart(2, "0")}</p>
          <h2 id="film-dialog-title">{film.title}</h2>
          <p className="film-dialog__studio">{film.studio}</p>
          <p className="film-dialog__description">
            {film.shortDescription ?? (film.isSecret
              ? "Премьера остаётся закрытой до объявления команды."
              : "Материалы фильма появятся после официального объявления." )}
          </p>
          {!film.isSecret && (
            <>
              <h3>Съёмочная группа</h3>
              <ul className="dialog-members">
                {film.members.map((member, index) => (
                  <li key={`${film.id}-${member}-${index}`}>{member}</li>
                ))}
              </ul>
            </>
          )}
          {film.teamPhotos.length > 0 && (
            <>
              <h3>Фото команды</h3>
              <div className="dialog-team-photos">
                {film.teamPhotos.map((photo, index) => (
                  <div key={`${film.id}-photo-${index}`} className="dialog-team-photo">
                    <img src={photo} alt={`Фото команды ${film.studio} ${index + 1}`} />
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="film-dialog__actions">
            {film.youtubeUrl && (
              <a className="text-button text-button--dialog" href={film.youtubeUrl} target="_blank" rel="noreferrer">
                Смотреть на YouTube <Play fill="currentColor" aria-hidden="true" />
              </a>
            )}
            {film.gameUrls.length > 0 && film.gameUrls.map((url, i) => (
              <a key={`${film.id}-game-${i}`} className="text-button text-button--dialog" href={url} target="_blank" rel="noreferrer">
                Игра {i + 1} <Gamepad2 aria-hidden="true" />
              </a>
            ))}
            {film.externalPageUrl ? (
              <button className="ticket-button" type="button" onClick={() => onPortal(film)}>
                Открыть страницу команды <ExternalLink aria-hidden="true" />
              </button>
            ) : (
              <span className="film-dialog__soon"><Sparkles aria-hidden="true" /> {film.isSecret ? "Объявление скоро" : "Страница команды скоро"}</span>
            )}
          </div>
          <div className="film-dialog__certificates">
            <a className="ticket-button" href={CERTIFICATES_URL} target="_blank" rel="noreferrer">
              Получить сертификаты <Download aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FestivalPage() {
  const reduced = useReducedMotion();
  const [showIntro, setShowIntro] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<FestivalFilm | null>(null);
  const [toast, setToast] = useState("");
  const [showMobileCta, setShowMobileCta] = useState(false);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(heroProgress, [0, 1], [0, 120]);
  const collageY = useTransform(heroProgress, [0, 1], [0, -80]);

  const finishIntro = useCallback(() => {
    sessionStorage.setItem("nine-sparks-intro", "seen");
    setShowIntro(false);
  }, []);

  useEffect(() => {
    if (reduced || sessionStorage.getItem("nine-sparks-intro") === "seen") return;
    const startFrame = requestAnimationFrame(() => setShowIntro(true));
    const timer = window.setTimeout(finishIntro, 2600);
    return () => {
      cancelAnimationFrame(startFrame);
      clearTimeout(timer);
    };
  }, [finishIntro, reduced]);

  useEffect(() => {
    const onVisibility = () => {
      document.documentElement.classList.toggle(
        "page-paused",
        document.visibilityState !== "visible",
      );
    };
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const updateStickyCta = () =>
      setShowMobileCta(window.scrollY > window.innerHeight * 0.62);
    updateStickyCta();
    window.addEventListener("scroll", updateStickyCta, { passive: true });
    return () => window.removeEventListener("scroll", updateStickyCta);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const openFilm = (film: FestivalFilm, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setSelectedFilm(film);
  };

  const closeFilm = useCallback(() => {
    setSelectedFilm(null);
    window.setTimeout(() => lastTrigger.current?.focus(), 0);
  }, []);

  const openPortal = (film: FestivalFilm) => {
    if (film.externalPageUrl) {
      window.open(film.externalPageUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setToast(
      film.isSecret
        ? "Премьерный слот пока остаётся секретным"
        : "Материалы этой премьеры скоро появятся",
    );
  };

  const handleHeroPointer = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--pointer-x", `${x * 22}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 18}px`);
  };

  const handlePosterPointer = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (reduced || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${-y * 7}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 7}deg`);
  };

  const resetPoster = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  const totalSlots = films.length;

  return (
    <>
      <AnimatePresence>{showIntro && <Intro onFinish={finishIntro} />}</AnimatePresence>

      <div className="global-grain" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="9 ИСКР — на главную">
          <FestivalMark compact />
          <span>9 ИСКР</span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#journey">Процесс</a>
          <a href="#videodays">Видеодневники</a>
          <a href="#films">Премьеры</a>
          <a href="#authors">Авторы</a>
          <a href="#program">Программа</a>
        </nav>
        <a className="header-ticket desktop-cta" href={CERTIFICATES_URL} target="_blank" rel="noreferrer">
          Сертификаты <Download />
        </a>
        <button
          className="round-button menu-button"
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="mobile-menu"
              aria-label="Мобильная навигация"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mobile-menu__note">festival map ↓</span>
              {[
                ["journey", "Процесс"],
                ["videodays", "Видеодневники"],
                ["films", "Премьеры"],
                ["authors", "Авторы"],
                ["program", "Программа"],
              ].map(([id, label], index) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToId(id, () => setMenuOpen(false))}
                >
                  <span>0{index + 1}</span> {label}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="top">
        <section
          ref={heroRef}
          className="hero"
          onPointerMove={handleHeroPointer}
        >
          <div className="hero__ticker" aria-hidden="true">
            <div>
              DOCUMENTOLOG AI SUMMER CAMP · 27-31 ИЮЛЯ · YOUNG DIRECTORS · FIRST CUT · 9 PREMIERES ·{" "}
              DOCUMENTOLOG AI SUMMER CAMP · 27-31 ИЮЛЯ · YOUNG DIRECTORS · FIRST CUT · 9 PREMIERES ·
            </div>
          </div>
          <div className="hero__confetti" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
          </div>
          <motion.div className="hero__title" style={{ y: titleY }}>
            <span>9</span>
            <h1>ИСКР</h1>
            <strong>AI FILM FESTIVAL · 2026</strong>
          </motion.div>
          <motion.div className="hero__collage" style={{ y: collageY }}>
            <div className="contact-sheet contact-sheet--main">
              <FilmArtwork film={films[2]} />
              <span className="tape" aria-hidden="true" />
            </div>
            <div className="contact-sheet contact-sheet--side">
              <FilmArtwork film={films[0]} compact />
            </div>
            <div className="hero__sticker">
              9
              <small>премьерных слотов</small>
            </div>
            <span className="hero__scribble">снято нами →</span>
          </motion.div>
          <div className="hero__copy">
            <p className="micro-label">Documentolog × Jedai Academy · Алматы</p>
            <p className="hero__summer-camp">Documentolog AI summer camp · 27-31 июля 2026</p>
            <p className="hero__lead">
              Пять дней, шесть команд и семь премьерных слотов. Здесь идеи
              становятся кадрами, музыкой и собственными цифровыми мирами.
            </p>
            <div className="hero__actions">
              <MagneticButton onClick={() => scrollToId("films")}>
                Смотреть премьеры <Play fill="currentColor" />
              </MagneticButton>
              <button
                className="text-button"
                type="button"
                onClick={() => scrollToId("journey")}
              >
                Как это было <ArrowDown />
              </button>
            </div>
          </div>
          <div className="hero__frame-code" aria-hidden="true">
            FRAME 0009 / FIRST CUT / 43.2389° N
          </div>
        </section>

        <section className="intertitle" aria-label="Переход к истории интенсива">
          <div>
            ИДЕЯ → КОМАНДА → ИСТОРИЯ → КАДР → ПРЕМЬЕРА → ИДЕЯ → КОМАНДА →
          </div>
        </section>

        <SectionReveal id="journey" className="journey section-shell">
          <div className="section-kicker">
            <span>01 / ПРОЦЕСС</span>
            <span>120 часов продакшена</span>
          </div>
          <div className="journey__heading">
            <h2>
              ПЯТЬ ДНЕЙ
              <em>В ДВИЖЕНИИ</em>
            </h2>
            <p>
              От первого наброска до большого экрана — не гонка на скорость, а
              настоящее командное производство.
            </p>
          </div>
          <div className="storyboard">
            <div className="storyboard__rail" aria-hidden="true">
              <span>9S</span><span>9S</span><span>9S</span><span>9S</span>
            </div>
            {days.map(([number, title, description], index) => (
              <motion.article
                className="storyboard__day"
                key={number}
                initial={reduced ? false : { opacity: 0, x: index % 2 ? 60 : -60 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, delay: index * 0.06 }}
              >
                <span className="storyboard__number">{number}</span>
                <div className="storyboard__still">
                  <span className={`still-shape still-shape--${index + 1}`} />
                  <small>SCENE {number} · TAKE 09</small>
                </div>
                <div className="storyboard__copy">
                  <span>День {number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="videodays" className="video-days section-shell">
          <div className="section-kicker">
            <span>02 / ВИДЕОДНЕВНИКИ</span>
            <span>5 дней в кадрах</span>
          </div>
          <div className="video-days__heading">
            <h2>
              КАЖДЫЙ ДЕНЬ
              <em>В КАДРЕ</em>
            </h2>
            <p>
              Короткие видео из Instagram Reels и YouTube Shorts — как это было день за днём.
            </p>
          </div>
          <div className="video-grid">
            {videoDays.map(([number, date, title, url], index) => (
              <motion.article
                className="video-card"
                key={number}
                initial={reduced ? false : { opacity: 0, y: 40 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              >
                <div className="video-card__header">
                  <span className="video-card__day">День {number}</span>
                  <span className="video-card__date">{date}</span>
                </div>
                <h3>{title}</h3>
                <div className="video-card__embed">
                  {url && url !== "tBD" ? (
                    <iframe
                      src={url}
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="video-card__placeholder">
                      <Play aria-hidden="true" />
                      <span>Видео дня появится после съёмок</span>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="films" className="premieres">
          <div className="section-shell premieres__heading">
            <div className="section-kicker">
              <span>03 / ПРЕМЬЕРЫ</span>
              <span>Листайте киноленту →</span>
            </div>
            <h2>ДЕВЯТЬ ПЕРВЫХ КАДРОВ</h2>
            <p>
              Девять премьерных слотов — от первой до последней истории.
            </p>
          </div>
          <div className="reel-shell">
            <div className="premiere-counter" aria-label="Девять премьерных слотов">
              <span>{totalSlots} ПРЕМЬЕР</span>
              <div>
                {films.map((film) => (
                  <button
                    key={film.id}
                    type="button"
                    onClick={(event) => openFilm(film, event.currentTarget)}
                    aria-label={`Открыть слот ${film.number}: ${film.title}`}
                  >
                    {film.number}
                  </button>
                ))}
              </div>
              <span>{totalSlots} ПРЕМЬЕРНЫХ СЛОТОВ</span>
            </div>
            <div className="premiere-grid" aria-label={`Каталог ${totalSlots} премьер`}>
              {films.map((film, index) => (
                <article
                  className={`film-card film-card--${index + 1}`}
                  key={film.id}
                >
                  <button
                    className="film-card__poster"
                    type="button"
                    onPointerMove={handlePosterPointer}
                    onPointerLeave={resetPoster}
                    onClick={(event) => openFilm(film, event.currentTarget)}
                    aria-label={`Открыть подробности: ${film.title}`}
                  >
                    <FilmArtwork film={film} />
                    <span className="film-card__open">
                      <ArrowRight />
                    </span>
                  </button>
                  <div className="film-card__caption">
                    <div>
                      <span>{film.number}/{String(totalSlots).padStart(2, "0")}</span>
                      <h3>{film.title}</h3>
                      <p>{film.studio}</p>
                    </div>
                    <span>{film.isSecret ? "закрыто" : `${film.members.length} авторов`}</span>
                  </div>
                </article>
              ))}
            </div>
            <p className="swipe-cue">Все {totalSlots} карточек уже здесь — нажмите на любую, чтобы увидеть команду</p>
          </div>
        </SectionReveal>

        <SectionReveal id="authors" className="authors">
          <div className="authors__marquee" aria-hidden="true">
            <div>
              {authors.length} АВТОРОВ · {totalSlots} ПРЕМЬЕР · ОДИН БОЛЬШОЙ ЭКРАН · {authors.length} АВТОРОВ · {totalSlots} ПРЕМЬЕР ·
            </div>
          </div>
          <div className="section-shell">
            <div className="section-kicker section-kicker--light">
              <span>04 / В ТИТРАХ</span>
              <span>Все имена на экране</span>
            </div>
            <div className="authors__heading">
              <h2>
                ГЛАВНЫЕ
                <em>ГЕРОИ КАДРА</em>
              </h2>
              <p>
                Здесь нет массовки. Каждое имя — часть фильма и отдельная искра
                общей премьеры.
              </p>
            </div>
            <div className="credits-cloud" aria-label={`Все ${authors.length} участников фестиваля`}>
              <span className="credits-cloud__label">ВСЕ {authors.length} ИМЁН</span>
              <div>
                {authors.map((author, index) => (
                  <span key={`${author}-${index}`}>{author}</span>
                ))}
              </div>
            </div>
            <div className="crew-grid">
              {representedTeams.map((film, teamIndex) => (
                <article className="crew-sheet" key={film.id}>
                  <span className="tape tape--crew" aria-hidden="true" />
                  <header>
                    <span>UNIT / {film.number}</span>
                    <strong>{film.studio}</strong>
                    <small>{film.members.length} участников</small>
                  </header>
                  <ol>
                    {film.members.map((member, memberIndex) => (
                      <li key={`${film.id}-${member}-${memberIndex}`}>
                        <span>{String(memberIndex + 1).padStart(2, "0")}</span>
                        {member}
                      </li>
                    ))}
                  </ol>
                  <span className="crew-sheet__stamp">
                    9 ИСКР / 2026
                  </span>
                </article>
              ))}
            </div>
            <p className="authors__count">{authors.length} имён. Ни одного лишнего.</p>
          </div>
        </SectionReveal>

        <SectionReveal className="results section-shell">
          <div className="section-kicker">
            <span>05 / ФИНАЛЬНЫЙ МОНТАЖ</span>
            <span>Только факты</span>
          </div>
          <div className="results__board">
            <div className="results__lead">
              <span>INTERMISSION</span>
              <h2>СДЕЛАНО СВОИМИ РУКАМИ</h2>
              <p>Пять дней, которые уже стали первой записью в титрах.</p>
            </div>
            <div className="results__numbers">
              {results.map(([value, label], index) => (
                <article key={label as string}>
                  <span>0{index + 1}</span>
                  <strong><Counter value={Number(value)} /></strong>
                  <p>{label as string}</p>
                </article>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="program" className="program section-shell">
          <div className="section-kicker">
            <span>06 / ПРОГРАММА</span>
            <span>Call time · Алматы</span>
          </div>
          <div className="program__heading">
            <h2>СЕГОДНЯ В КАДРЕ</h2>
            <span className="hand-note">не опаздывать! ↘</span>
          </div>
          <div className="program-list">
            {program.map(([time, title, description], index) => (
              <article className="program-item" key={time}>
                <span className="program-item__index">0{index + 1}</span>
                <time>{time}</time>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <Clapperboard aria-hidden="true" />
              </article>
            ))}
          </div>
          <div className="program__certificates">
            <a className="ticket-button" href={CERTIFICATES_URL} target="_blank" rel="noreferrer">
              Получить сертификаты <Download aria-hidden="true" />
            </a>
          </div>
          <blockquote>
            «Добро пожаловать
            <em>в нашу вселенную»</em>
          </blockquote>
        </SectionReveal>

        <SectionReveal className="nominations section-shell">
          <div className="section-kicker">
            <span>07 / ИСКРЫ ФЕСТИВАЛЯ</span>
            <span>Не рейтинг, а сильные стороны</span>
          </div>
          <div className="nominations__heading">
            <h2>КАЖДЫЙ ФИЛЬМ ОСТАВЛЯЕТ СЛЕД</h2>
            <p>
              Номинации отмечают характер проекта и вклад команды — без первого
              и последнего места.
            </p>
          </div>
          <div className="stamp-wall">
            {nominations.map(([label, Icon], index) => (
              <motion.article
                className={`festival-stamp festival-stamp--${(index % 4) + 1}`}
                key={label as string}
                initial={reduced ? false : { opacity: 0, scale: 1.35, rotate: -8 }}
                whileInView={reduced ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.65 }}
                transition={{ type: "spring", stiffness: 210, damping: 18, delay: index * 0.035 }}
              >
                <Icon aria-hidden="true" />
                <span>0{index + 1}</span>
                <h3>{label as string}</h3>
              </motion.article>
            ))}
          </div>
        </SectionReveal>

        <section className="finale">
          <div className="finale__strips" aria-hidden="true">
            {films.map((film, index) => (
              <i
                key={film.id}
                style={
                  {
                    "--strip": film.accentColor,
                    "--strip-index": index,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <motion.div
            className="finale__mark"
            initial={reduced ? false : { scale: 0.5, rotate: -18, opacity: 0 }}
            whileInView={reduced ? undefined : { scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
          >
            <FestivalMark light />
          </motion.div>
          <p className="micro-label">FINAL FRAME / 09</p>
          <h2>
            ЭТО ТОЛЬКО
            <em>ПЕРВЫЙ КАДР</em>
          </h2>
          <p className="finale__copy">
            Премьера заканчивается. Истории — только начинаются.
          </p>
          <div className="finale__actions">
            <MagneticButton onClick={() => scrollToId("films")}>
              Вернуться к премьерам <Film />
            </MagneticButton>
            <button className="finale__top" type="button" onClick={() => scrollToId("top")}>
              В начало <ArrowUp />
            </button>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#top">
          <FestivalMark compact />
          <span>9 ИСКР</span>
        </a>
        <p>Documentolog × Jedai Academy<br />Documentolog AI summer camp · 27-31 июля 2026</p>
        <span>VOL. 01 / FIRST CUT</span>
      </footer>

      <button
        className={`mobile-sticky-cta ${
          showMobileCta ? "mobile-sticky-cta--visible" : ""
        }`}
        type="button"
        onClick={() => scrollToId("films")}
      >
        Смотреть премьеры <ArrowRight />
      </button>

      <AnimatePresence>
        {selectedFilm && (
          <FilmDialog
            film={selectedFilm}
            onClose={closeFilm}
            onPortal={openPortal}
          />
        )}
      </AnimatePresence>

      <div
        className={`toast ${toast ? "toast--visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        <Sparkles aria-hidden="true" />
        {toast}
      </div>
    </>
  );
}
