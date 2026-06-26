interface CalcRowProps {
  label: string;
  perShare: React.ReactNode;
  total: React.ReactNode;
}

export const CalcRow = ({ label, perShare, total }: CalcRowProps) => (
  <tr className="group/row hover:bg-[var(--accent-light)] transition-colors">
    <td className="py-1.5 pr-4 text-[11px] text-[var(--text-secondary)] border-b border-[var(--border-light)] group-hover/row:border-transparent">{label}</td>
    <td className="py-1.5 px-4 text-right text-[11px] text-[var(--text-primary)] font-medium border-b border-[var(--border-light)] tabular-nums group-hover/row:border-transparent">{perShare}</td>
    <td className="py-1.5 pl-4 text-right text-[11px] text-[var(--text-primary)] font-medium border-b border-[var(--border-light)] tabular-nums group-hover/row:border-transparent">{total}</td>
  </tr>
);
