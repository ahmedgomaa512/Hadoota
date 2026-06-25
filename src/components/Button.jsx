export default function Button({ children, variant = 'primary', className = '', as: Component = 'button', ...props }) {
  const styles =
    variant === 'primary'
      ? 'bg-story-pink text-parchment-cream border-story-pink'
      : 'bg-white text-ink border-light-gray';

  return (
    <Component
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
