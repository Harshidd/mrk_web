'use client'

export function SkeletonCard() {
    return (
        <div className="glass p-7 h-full flex flex-col gap-4 animate-pulse">
            <div className="skeleton h-4 w-1/3" />
            <div className="skeleton h-5 w-3/4" />
            <div className="space-y-2 mt-2">
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-5/6" />
                <div className="skeleton h-3 w-2/3" />
            </div>
        </div>
    )
}

export function SkeletonProjectCard() {
    return (
        <div className="glass p-5 h-full flex flex-col gap-4">
            <div className="skeleton aspect-[16/10] w-full rounded-xl" />
            <div className="skeleton h-3 w-20" />
            <div className="skeleton h-5 w-2/3" />
            <div className="space-y-2">
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-4/5" />
            </div>
        </div>
    )
}

export function SkeletonLine({ width = '100%' }: { width?: string }) {
    return <div className="skeleton h-3" style={{ width }} />
}
