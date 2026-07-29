export type FestivalFilm = {
  id: string;
  slug: string;
  number: string;
  title: string;
  studio: string;
  accentColor: string;
  secondaryColor: string;
  art: string;
  artAlt: string;
  members: string[];
  isSecret: boolean;
  websiteUrl: string | null;
  videoUrl: string | null;
};

export const films: FestivalFilm[] = [
  {
    id: "premiere-01",
    slug: "premiere-01",
    number: "01",
    title: "Премьера 01",
    studio: "Команда 01",
    accentColor: "#2457FF",
    secondaryColor: "#D8FF3E",
    art: "frame-blue",
    artAlt: "Абстрактный сине-зелёный фестивальный кадр первой команды",
    members: ["Карим", "Ансар"],
    isSecret: false,
    websiteUrl: null,
    videoUrl: null,
  },
  {
    id: "premiere-02",
    slug: "premiere-02",
    number: "02",
    title: "Премьера 02",
    studio: "Команда 02",
    accentColor: "#FF654A",
    secondaryColor: "#F4C84A",
    art: "frame-coral",
    artAlt: "Абстрактный кораллово-жёлтый фестивальный кадр второй команды",
    members: ["Аиша", "Малика", "Улан", "Рауан", "Абай", "Дамели"],
    isSecret: false,
    websiteUrl: null,
    videoUrl: null,
  },
  {
    id: "premiere-03",
    slug: "premiere-03",
    number: "03",
    title: "Премьера 03",
    studio: "Folk Valley",
    accentColor: "#D8FF3E",
    secondaryColor: "#2457FF",
    art: "frame-lime",
    artAlt: "Абстрактный лаймово-синий фестивальный кадр Folk Valley",
    members: ["Айсултан", "Ильяс", "Арлан", "Мансура", "Нармина", "Адиля"],
    isSecret: false,
    websiteUrl: null,
    videoUrl: null,
  },
  {
    id: "premiere-04",
    slug: "premiere-04",
    number: "04",
    title: "Премьера 04",
    studio: "Команда 04",
    accentColor: "#F4C84A",
    secondaryColor: "#FF654A",
    art: "frame-yellow",
    artAlt: "Абстрактный жёлто-коралловый фестивальный кадр четвёртой команды",
    members: ["Абай", "Эсма", "Алишер", "Самир"],
    isSecret: false,
    websiteUrl: null,
    videoUrl: null,
  },
  {
    id: "premiere-05",
    slug: "premiere-05",
    number: "05",
    title: "Премьера 05",
    studio: "Команда 05",
    accentColor: "#FF654A",
    secondaryColor: "#2457FF",
    art: "frame-red",
    artAlt: "Абстрактный красно-синий фестивальный кадр пятой команды",
    members: ["Сатти Кумарбекова", "Иман", "Еркежан", "Сатти Нурумбек", "Лале"],
    isSecret: false,
    websiteUrl: null,
    videoUrl: null,
  },
  {
    id: "premiere-06",
    slug: "premiere-06",
    number: "06",
    title: "Премьера 06",
    studio: "Команда 06",
    accentColor: "#2457FF",
    secondaryColor: "#FF654A",
    art: "frame-ink",
    artAlt: "Абстрактный контрастный фестивальный кадр шестой команды",
    members: ["Султан", "Арлан", "Альмухаммед", "Латифа", "Амаль", "Амира"],
    isSecret: false,
    websiteUrl: null,
    videoUrl: null,
  },
  {
    id: "premiere-07",
    slug: "secret-portal",
    number: "07",
    title: "Секретный портал",
    studio: "Седьмой премьерный слот",
    accentColor: "#D8FF3E",
    secondaryColor: "#141414",
    art: "frame-secret",
    artAlt: "Закрытый седьмой премьерный слот фестиваля",
    members: [],
    isSecret: true,
    websiteUrl: null,
    videoUrl: null,
  },
];

export const representedTeams = films.filter((film) => !film.isSecret);
export const authors = representedTeams.flatMap((film) => film.members);
