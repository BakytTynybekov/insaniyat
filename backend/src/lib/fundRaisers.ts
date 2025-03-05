type fundRaiser = {
  id: number;
  title: string;
  description: string;
  text: string;
  goal: string;
  raised: number;
  image: string;
};

export const fundRaisers: fundRaiser[] = [
  {
    id: 1,
    title: "Образование для детей",
    description:
      "Сбор средств на учебники и школьные принадлежности для детей из малообеспеченных семей.",
    text: "<p> This the paragraph of the fundRaiser</p>",
    goal: "500000",
    raised: 350000,
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 2,
    title: "Медицинская помощь",
    description: "Сбор на лечение и реабилитацию детей с тяжелыми заболеваниями.",
    text: "<p> This the paragraph of the fundRaiser</p>",
    goal: "1000000",
    raised: 750000,
    image:
      "https://images.unsplash.com/photo-1576765608621-0f7b827f7974?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 3,
    title: "Социальная адаптация",
    description: "Программы для интеграции детей и подростков в общество.",
    text: "<p> This the paragraph of the fundRaiser</p>",
    goal: "300000",
    raised: 120000,
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 4,
    title: "Помощь бездомным",
    description: "Сбор средств на питание и временное жилье для бездомных.",
    text: "<p> This the paragraph of the fundRaiser</p>",
    goal: "400000",
    raised: 200000,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 5,
    title: "Экологическая инициатива",
    description: "Сбор на озеленение городов и экологические проекты.",
    text: "<p> This the paragraph of the fundRaiser</p>",
    goal: "600000",
    raised: 450000,
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
];
