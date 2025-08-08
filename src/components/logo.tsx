import { BriefcaseBusiness } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <BriefcaseBusiness className="h-7 w-7 text-primary" />
      <h1 className="text-xl font-bold text-foreground">Paragon Hub</h1>
    </div>
  );
}
