export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 lg:px-6">
        <span className="text-xs text-muted-foreground">
          &copy; 2026 VoltGrid
        </span>
        <nav className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">Terms</span>
          <span className="text-xs text-muted-foreground">Privacy</span>
        </nav>
      </div>
    </footer>
  );
}
