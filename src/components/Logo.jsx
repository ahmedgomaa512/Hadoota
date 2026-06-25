import logoMark from '../assets/logo-mark.svg';
import logoMarkReversed from '../assets/logo-mark-reversed.svg';

export default function Logo({ variant = 'cream', compact = false }) {
  const reversed = variant === 'pink' || variant === 'dark';
  const textColor = variant === 'pink' || variant === 'dark' ? 'text-parchment-cream' : 'text-ink';
  return (
    <div className="flex items-center gap-3" aria-label="Hadoota">
      <img className="h-10 w-10 flex-none" src={reversed ? logoMarkReversed : logoMark} alt="" />
      {!compact && (
        <div className="leading-none">
          <p className={`font-heading text-2xl font-bold ${textColor}`}>Hadoota</p>
          <p className={`mt-1 text-xs ${reversed ? 'text-parchment-cream' : 'text-gray'}`}>every toy tells a tale</p>
        </div>
      )}
    </div>
  );
}
