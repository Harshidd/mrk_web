import * as LucideIcons from 'lucide-react'

export function DynamicIcon({ name, className }: { name: string; className?: string }) {
    const IconComponent = (LucideIcons as any)[name]
    if (!IconComponent) return <LucideIcons.Box className={className} />
    return <IconComponent className={className} />
}
