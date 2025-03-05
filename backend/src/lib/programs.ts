type program = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export const programs: program[] = [
  {
    id: 1,
    title: "Образование для детей",
    description:
      "Мы обеспечиваем доступ к качественному образованию для детей из малообеспеченных семей.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 2,
    title: "Поддержка студентов",
    description: "Стипендии и mentorship программы для талантливых студентов.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 3,
    title: "Медицинская помощь",
    description: "Обеспечиваем медицинское обслуживание для детей и их семей.",
    image:
      "https://images.unsplash.com/photo-1576765608621-0f7b827f7974?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 4,
    title: "Социальная адаптация",
    description: "Программы для интеграции детей и подростков в общество.",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
];
