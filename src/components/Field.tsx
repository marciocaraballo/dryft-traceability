interface FieldProps {
  label: string;
  children: React.ReactNode;
}

export const Field = ({ label, children }: FieldProps) => (
  <div className="flex items-start justify-between py-1.5 border-b border-border-light last:border-0 gap-4">
    <span className="text-xs text-secondary shrink-0 pt-px">{label}</span>
    <span className="text-xs text-primary font-medium text-right">{children}</span>
  </div>
);
