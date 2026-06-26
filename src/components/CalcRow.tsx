interface CalcRowProps {
  label: string;
  perShare: React.ReactNode;
  total: React.ReactNode;
}

export const CalcRow = ({ label, perShare, total }: CalcRowProps) => (
  <tr className="group/row hover:bg-accent-light transition-colors">
    <td className="py-1.5 pr-4 text-xs text-secondary border-b border-border-light group-hover/row:border-transparent">{label}</td>
    <td className="py-1.5 px-4 text-right text-xs text-primary font-medium border-b border-border-light tabular-nums group-hover/row:border-transparent">{perShare}</td>
    <td className="py-1.5 pl-4 text-right text-xs text-primary font-medium border-b border-border-light tabular-nums group-hover/row:border-transparent">{total}</td>
  </tr>
);
