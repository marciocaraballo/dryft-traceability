interface FieldProps {
  label: string;
  children: React.ReactNode;
}

export const Field = ({ label, children }: FieldProps) => (
  <div className="flex items-start justify-between py-1.5 border-b border-[var(--border-light)] last:border-0 gap-4">
    <span className="text-[11px] text-[var(--text-secondary)] shrink-0 pt-px">{label}</span>
    <span className="text-[11px] text-[var(--text-primary)] font-medium text-right">{children}</span>
  </div>
);
