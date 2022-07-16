import type { FC } from "react";

const P: FC = ({ children }) => <p className="mb-4">{children}</p>;

const Button: FC<{ href: string }> = (props) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a
    className="px-8 py-1 border-matze border-solid border-2 rounded-xl block w-60 text-center"
    {...props}
  />
);

export default function Index() {
  return (
    <div className="max-w-2xl lig">
      <div className="mt-10 mb-10">
        <p className="text-sm">
          <a href="/" className={`text-matze`}>
            Transspace
          </a>
        </p>
        <h2 className="text-xl font-bold">Gravity Dimensions</h2>
      </div>
      <div className="font-light">
        <P>
          The space dimensions are well known. They already existed in some form
          even in the earlier theories. Einstein gave them the twist that these
          dimensions are curved and that mass affects the amount of bending.
        </P>
        <P>
          The (imaginary) Transspace has given them another angle that changed
          or extended some of our imagination of the three space dimensions.
        </P>
        <P>
          The theory itself is computer-assisted. An AI and a Quantum Computer
          have calculated most of the equations' solutions.
        </P>
        <P>
          One of them predicts that all dimensions fold into themselves. So very
          simplified, you could say if you travel some billion years in the same
          direction, you might be able to reach your starting point again.
        </P>
        <P>
          Some distant galaxy we observe with our telescope might even be our
          own milky way in its early days.
        </P>
      </div>
      <ul className="flex gap-4 text-sm">
        <li>
          <a href="/" className={`text-matze`}>
            #ScienceFiction
          </a>
        </li>
        <li>
          <a href="/" className={`text-matze`}>
            #SciFi
          </a>
        </li>
        <li>
          <a href="/" className={`text-matze`}>
            #SpaceTravel
          </a>
        </li>
        <li>
          <a href="/" className={`text-matze`}>
            #SpaceOpera
          </a>
        </li>
        <li>
          <a href="/" className={`text-matze`}>
            #WorldBuilding
          </a>
        </li>
      </ul>
      <div className="mt-8 text-sm text-right opacity-50">
        <p>899 chars, 311 words</p>
      </div>
      <ul className="flex gap-4 justify-center mt-24">
        <li>
          <Button href="/">Previous</Button>
        </li>
        <li>
          <Button href="/">Next</Button>
        </li>
      </ul>
    </div>
  );
}
