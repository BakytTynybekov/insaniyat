import React from "react";
import "./button.scss";
// Определяем типы для пропсов
interface ButtonProps {
  children: React.ReactNode; // Содержимое кнопки (текст или элементы)
  onClick?: () => void; // Обработчик клика
  type?: "button" | "submit" | "reset"; // Тип кнопки
  disabled?: boolean; // Отключение кнопки
  className?: string; // Дополнительные классы для стилизации
  variant?: "primary" | "secondary" | "danger"; // Вариант стиля кнопки
  width?: "100%";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
  width = "",
}) => {
  // Определяем классы для разных вариантов кнопки
  const variantClasses = {
    primary: "button-primary",
    secondary: "button-secondary",
    danger: "button-danger",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ width: width }}
      className={`button ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
