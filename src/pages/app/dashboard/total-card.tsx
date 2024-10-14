import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface IProps {
  title: string;
  value: string;
}
export function TotalCard({ title, value }: IProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold tracking-tight">{value}</span>
      </CardContent>
    </Card>
  );
}
