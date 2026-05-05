'use client';

export default function LogoutButton({ className }: { className?: string }) {
  const logout = async () => {
    await fetch('/api/cohort-auth', { method: 'DELETE' });
    window.location.href = '/ai-with-friends/cohort';
  };
  return (
    <button className={className} onClick={logout}>
      log out
    </button>
  );
}
