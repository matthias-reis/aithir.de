import type { FC } from 'react';

export const Tags: FC = (props) => {
  return <ul className="mt-8 flex gap-4 text-sm" {...props} />;
};

export const Tag: FC = ({ children }) => {
  return (
    <li>
      <a href="/" className={`text-matze`}>
        #{children}
      </a>
    </li>
  );
};
