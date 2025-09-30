import { useEffect, useRef } from "react";
import { HeroSection } from "../../components/heroSection/HeroSection";
import StayUpdated from "../../components/stayUpdated/StayUpdated";
import { CampaignsPage } from "../fundraisers/CampaignsPage/CampaignsPage";
import { ProgramsPage } from "../programs/ProgramsPage/ProgramsPage";
import gsap from "gsap";
import { Contacts } from "../other/Contacts/Contacts";
import "./mainPage.scss";
//
const MainPage = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statsRef.current) {
      const statNumbers =
        statsRef.current.querySelectorAll<HTMLDivElement>(".stat-number");
      statNumbers.forEach((num) => {
        const value = num.getAttribute("data-value")?.toString() || 0;
        gsap.to(num, {
          innerText: value,
          duration: 5,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 160%",
            toggleActions: "play none none none",
          },
          snap: { innerText: 1 },
        });
      });
    }
  }, []);

  type HelpItem = {
    icon: string;
    title: string;
    text: string;
  };
  const helpItems: HelpItem[] = [
    { icon: "💰", title: "Финансовая помощь", text: "Любая сумма делает мир лучше" },
    { icon: "🕒", title: "Волонтерство", text: "Станьте частью нашей команды" },
    { icon: "📢", title: "Информация", text: "Расскажите о нас в соцсетях" },
  ];
  return (
    <>
      <HeroSection />
      <section className="luxury-stats" ref={statsRef}>
        <div className="stat-item">
          <div className="stat-number" data-value="5">
            0
          </div>
          <div className="stat-label">Лет помогаем</div>
          <div className="stat-decoration"></div>
        </div>
        <div className="stat-item">
          <div className="stat-number" data-value="500">
            0
          </div>
          <div className="stat-label">Счастливых историй</div>
          <div className="stat-decoration"></div>
        </div>
        <div className="stat-item">
          <div className="stat-number" data-value="1000000">
            0
          </div>
          <div className="stat-label">Собрано рублей</div>
          <div className="stat-decoration"></div>
        </div>
      </section>
      <CampaignsPage />
      <section className="luxury-help">
        <div className="help-container">
          <div className="help-visual">
            <div className="visual-circle"></div>
            <div className="visual-icons">
              {["💙", "🙌", "🌍"].map((icon, i) => (
                <div key={i} className="visual-icon">
                  {icon}
                </div>
              ))}
            </div>
          </div>
          <div className="help-content">
            <h2>Как помочь</h2>
            <div className="help-items">
              {helpItems.map((item, i) => (
                <div key={i} className="help-item">
                  <div className="item-icon">{item.icon}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ProgramsPage />
      <StayUpdated />
      <Contacts />
    </>
  );
};

export default MainPage;
