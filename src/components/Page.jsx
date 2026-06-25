export default function Page({ children, className = '' }) {
  return <main className={`mx-auto min-h-screen w-full max-w-5xl px-4 pb-24 pt-4 md:px-8 ${className}`}>{children}</main>;
}
