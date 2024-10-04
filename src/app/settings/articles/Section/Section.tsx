import Heading from "@/components/Heading/Heading";
import SimpleTable from "@/components/Tables/SimpleTable/SimpleTable";
import { Card } from "@/components/ui/card";

export default function Section({
  children,
  title,
  data,
  columnsHeaders,
}: {
  children?: React.ReactNode;
  title: string;
  data: Record<string, string | number | JSX.Element>[];
  columnsHeaders?: string[];
}) {
  return (
    <>
      <Heading text={title} headingLvl={3} />
      <div className="my-5">{children}</div>
      <Card className="rounded-3xl bg-white p-4">
        <SimpleTable data={data} columnsHeaders={columnsHeaders} />
      </Card>
    </>
  );
}
