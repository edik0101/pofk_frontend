export default function Heading({
  text,
  headingLvl = 1,
}: {
  text: string;
  headingLvl?: 1 | 2 | 3 | 4;
}) {
  switch (headingLvl) {
    case 1:
      return (
        <h1 className="mb-[11px] mt-[53px] text-[34px] leading-normal">
          {text}
        </h1>
      );
    case 2:
      return (
        <h2 className="mb-[11px] mt-[53px] text-[34px] leading-normal">
          {text}
        </h2>
      );
    case 3:
      return (
        <h3 className="mb-[11px] mt-[53px] text-[34px] leading-normal">
          {text}
        </h3>
      );
    case 4:
      return (
        <h4 className="mb-[11px] mt-[53px] text-[34px] leading-normal">
          {text}
        </h4>
      );
  }
}
