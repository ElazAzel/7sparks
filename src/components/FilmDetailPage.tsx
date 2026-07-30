"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Camera, Clapperboard, Download, Gamepad2, Play, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { type CSSProperties, useRef } from "react";
import type { FestivalFilm } from "@/src/data/festival";

const FESTIVAL_URL = "https://9-sparks-festival.vercel.app/";
const CERTIFICATES_URL =
  "https://drive.google.com/drive/folders/1F97zz0QJEt0xipr59NorXsSF-mbhD6vQ?usp=sharing";

function youtubeEmbedUrl(url: string | null) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const id = parsed.hostname.includes("youtu.be")
      ? parsed.pathname.slice(1)
      : parsed.searchParams.get("v");
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

export function FilmDetailPage({ film }: { film: FestivalFilm }) {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const collageY = useTransform(scrollYProgress, [0, 1], [0, -86]);
  const embedUrl = youtubeEmbedUrl(film.youtubeUrl);
  const isPublished = film.status === "published";
  const decorativeImage = film.number === "02" || film.number === "05"
    ? "/film-decor/street-cinema-coral.png"
    : "/film-decor/street-cinema-blue.png";
  const totalSlots = 9;

  return (
    <main
      className="film-page"
      style={{
        "--film-accent": film.accentColor,
        "--film-secondary": film.secondaryColor,
      } as CSSProperties}
    >
      <nav className="film-page__nav" aria-label="Навигация страницы фильма">
        <a href={FESTIVAL_URL} className="film-page__back">
          <ArrowLeft aria-hidden="true" /> На главный сайт фестиваля
        </a>
        <span>9 ИСКР / {film.number}</span>
      </nav>

      <section ref={heroRef} className="film-page__hero">
        <motion.div
          className="film-page__hero-art"
          style={reduced ? undefined : { y: collageY }}
          aria-hidden="true"
        >
          <Image
            src={film.poster ?? decorativeImage}
            alt=""
            fill
            priority
            sizes="(max-width: 720px) 92vw, 48vw"
          />
          <span className="film-page__tape" />
          <i className="film-page__stamp">TAKE {film.number}</i>
        </motion.div>
        <div className="film-page__hero-copy">
          <p className="film-page__eyebrow">ПРЕМЬЕРНЫЙ СЛОТ {film.number}/{String(totalSlots).padStart(2, "0")}</p>
          <h1>{film.title}</h1>
          <p className="film-page__studio">{film.studio}</p>
          <p className="film-page__lead">
            {film.shortDescription ?? (film.isSecret
              ? "Этот кадр пока запечатан. Объявление команды и материалов появится здесь позже."
              : "Команда готовит свою историю. Материалы и рассказ о мультфильме появятся после официального объявления.")}
          </p>
          <div className="film-page__actions">
            {film.youtubeUrl ? (
              <a className="film-page__primary" href={film.youtubeUrl} target="_blank" rel="noreferrer">
                <Play fill="currentColor" aria-hidden="true" /> Смотреть на YouTube
              </a>
            ) : (
              <span className="film-page__soon"><Sparkles aria-hidden="true" /> Премьера скоро</span>
            )}
            {film.gameUrls.length > 0 && film.gameUrls.map((url, i) => (
              <a key={`game-${i}`} className="film-page__primary film-page__game-link" href={url} target="_blank" rel="noreferrer">
                <Gamepad2 aria-hidden="true" /> Игра {i + 1}
              </a>
            ))}
            <a className="film-page__text-link" href={FESTIVAL_URL}>
              Все премьеры <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="film-page__about film-page__section">
        <div>
          <p className="film-page__eyebrow">01 / ПАПКА ФИЛЬМА</p>
          <h2>СОБРАНО<br /><em>СВОИМИ РУКАМИ</em></h2>
        </div>
        <div className="film-page__notes">
          <article><span>СТАТУС</span><strong>{isPublished ? "опубликовано" : "скоро"}</strong></article>
          <article><span>МАТЕРИАЛЫ</span><strong>{film.gallery.length ? "кадры готовы" : "в процессе"}</strong></article>
          <article><span>ФОРМАТ</span><strong>авторский мультфильм</strong></article>
        </div>
      </section>

      {!film.isSecret && (
        <section className="film-page__credits film-page__section">
          <div className="film-page__section-heading">
            <p className="film-page__eyebrow">02 / ТИТРЫ</p>
            <h2>КОМАНДА<br /><em>В КАДРЕ</em></h2>
          </div>
          <ul aria-label={`Авторы премьеры ${film.number}`}>
            {film.members.map((member, index) => (
              <motion.li
                key={`${film.id}-${member}-${index}`}
                initial={reduced ? false : { opacity: 0, y: 18, rotate: index % 2 ? 3 : -3 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0, rotate: index % 2 ? 1 : -1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.035, type: "spring", stiffness: 230, damping: 18 }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>{member}
              </motion.li>
            ))}
          </ul>
        </section>
      )}

      {!film.isSecret && (
        <section className="film-page__team-photos film-page__section">
          <div className="film-page__section-heading">
            <p className="film-page__eyebrow">03 / ФОТО КОМАНДЫ</p>
            <h2>КОМАНДА<br /><em>В КАДРЕ</em></h2>
          </div>
          <div className="film-page__photos-grid">
            {film.teamPhotos.length > 0 ? (
              film.teamPhotos.map((photo, index) => (
                <figure key={`${film.id}-photo-${index}`} className="film-page__photo-frame">
                  <Image src={photo} alt={`Фото команды ${film.studio} ${index + 1}`} fill sizes="(max-width: 720px) 92vw, 30vw" />
                </figure>
              ))
            ) : (
              <>
                {[0, 1, 2].map((i) => (
                  <div key={`photo-placeholder-${i}`} className="film-page__photo-placeholder">
                    <Camera aria-hidden="true" />
                    <span>Фото {i + 1}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </section>
      )}

      <section className="film-page__gallery film-page__section">
        <div className="film-page__section-heading">
          <p className="film-page__eyebrow">04 / КАДРЫ ИЗ МИРА</p>
          <h2>КОНТАКТНЫЙ<br /><em>ЛИСТ</em></h2>
        </div>
        <div className="film-page__gallery-grid">
          <figure className="film-page__gallery-decor">
            <Image src={decorativeImage} alt="Абстрактная коллажная подложка фестиваля" fill sizes="(max-width: 720px) 92vw, 42vw" />
            <figcaption>визуальный дневник / 9 искр</figcaption>
          </figure>
          {film.gallery.map((image, index) => (
            <figure key={image} className="film-page__gallery-frame">
              <Image src={image} alt={`Кадр ${index + 1} из мультфильма ${film.title}`} fill sizes="(max-width: 720px) 92vw, 42vw" />
            </figure>
          ))}
          {!film.gallery.length && (
            <div className="film-page__gallery-placeholder">
              <Clapperboard aria-hidden="true" />
              <strong>Кадры появятся здесь</strong>
              <span>команда добавит их после премьеры</span>
            </div>
          )}
        </div>
      </section>

      <section className="film-page__watch film-page__section">
        <div>
          <p className="film-page__eyebrow">05 / СМОТРЕТЬ</p>
          <h2>БОЛЬШОЙ<br /><em>ЭКРАН</em></h2>
        </div>
        {embedUrl ? (
          <div className="film-page__player">
            <iframe src={embedUrl} title={`Мультфильм ${film.title}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        ) : (
          <div className="film-page__watch-soon">
            <Play aria-hidden="true" />
            <strong>Премьера скоро</strong>
            <span>Ссылка на мультфильм появится после публикации команды.</span>
          </div>
        )}
      </section>

      <footer className="film-page__footer">
        <p>Эта история - часть фестиваля «9 ИСКР».</p>
        <a href={CERTIFICATES_URL} target="_blank" rel="noreferrer" className="film-page__certificates-btn">
          <Download aria-hidden="true" /> Получить сертификаты
        </a>
        <a href={FESTIVAL_URL}>Вернуться на главный сайт фестиваля 9 ИСКР <ArrowUpRight aria-hidden="true" /></a>
        <Link href="/" className="film-page__local-link">Открыть каталог на этом сайте</Link>
      </footer>
    </main>
  );
}
