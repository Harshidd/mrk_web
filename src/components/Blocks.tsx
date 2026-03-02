import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'

const components: PortableTextComponents = {
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-semibold mb-6 mt-10 tracking-tight text-fg">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-medium mb-5 mt-8 tracking-tight text-fg">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-medium mb-4 mt-6 text-fg">{children}</h3>,
        normal: ({ children }) => <p className="mb-6 leading-relaxed text-muted">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-accent pl-4 italic text-muted my-6 bg-surface py-2 pr-4 rounded-r-lg">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc leading-relaxed list-inside mb-6 space-y-2 text-muted">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal leading-relaxed list-inside mb-6 space-y-2 text-muted">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li>{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-semibold text-fg">{children}</strong>,
        link: ({ children, value }) => {
            const rel = !value?.href?.startsWith('/') ? 'noreferrer noopener' : undefined
            return (
                <a href={value?.href} rel={rel} className="text-accent hover:underline transition-all">
                    {children}
                </a>
            )
        },
    },
}

export function Blocks({ value }: { value: PortableTextBlock[] | undefined }) {
    if (!value) return null
    return <PortableText value={value} components={components} />
}
