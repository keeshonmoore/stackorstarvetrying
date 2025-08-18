import { FC } from "react";

// Types
interface iCardItem {
  title: string;
  description: string;
  tag: string;
  src: string;
  link: string;
  color: string;
  textColor: string;
}

interface iCardProps extends Omit<iCardItem, "src" | "link" | "tag"> {
  i: number;
  src: string;
}

// Components
const Card: FC<iCardProps> = ({ title, description, color, textColor, i, src }) => {
  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <div
        className="relative w-screen h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <img
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={src}
          alt={title}
        />
        <div className="absolute inset-0 bg-primary/50 z-10"></div>
        <div className="relative z-20 flex flex-col items-center text-center p-8 max-w-2xl mx-auto">
          <span className="font-bold text-5xl md:text-7xl mb-4">
            <span
              className="font-custom font-black tracking-tight italic"
              style={{ color: textColor }}
            >
              {/* {title} */}
            </span>
          </span>
          <div
            className="font-custom text-lg md:text-2xl font-medium lowercase tracking-wide italic"
            style={{ lineHeight: 1.4, color: textColor }}
          >
            {/* {description} */}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * CardSlide component displays a series of cards in a vertical scroll layout
 * Each card contains a title, description, and decorative elements
 */
interface iCardSlideProps {
  items: iCardItem[];
}

const CardsParallax: FC<iCardSlideProps> = ({ items }) => {
  return (
    <div className="min-h-screen">
      {items.map((project, i) => {
        return <Card key={`p_${i}`} {...project} i={i} />;
      })}
    </div>
  );
};

export { CardsParallax, type iCardItem };