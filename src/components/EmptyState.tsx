interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const EmptyState = ({ title, description, icon }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
    <h3 className="text-base font-semibold text-muted-foreground">{title}</h3>
    {description && <p className="text-sm text-muted-foreground/70 mt-1">{description}</p>}
  </div>
);

export default EmptyState;
