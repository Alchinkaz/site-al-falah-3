"use client"

export default function AdminHome() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-lg border border-border bg-card p-6">
        <h1 className="text-2xl font-semibold text-white mb-2">Админ панель</h1>
        <p className="text-sm text-muted-foreground">
          Добро пожаловать! Это стартовая страница админки. Выберите раздел в меню слева.
        </p>
      </div>
    </div>
  )
}
