import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor?: string;
}

const StatCard = ({ icon: Icon, label, value, iconColor = 'text-primary' }: StatCardProps) => (
  <Card className="p-4 flex items-center gap-3">
    <div className={`p-2 rounded-lg bg-primary/10 ${iconColor}`}>
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  </Card>
);

export default StatCard;
