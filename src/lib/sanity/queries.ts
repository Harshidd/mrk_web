import { groq } from 'next-sanity'

export const getSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    ...,
    homeHero {
      ...,
    },
    about {
      ...,
    }
  }
`

export const listCategoriesQuery = groq`
  *[_type == "solutionCategory"] | order(order asc) {
    _id,
    title,
    slug,
    shortSummary,
    icon,
    order,
    ctaLabel,
    ctaUrl
  }
`

export const listProjectsQuery = groq`
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category->{ title, slug },
    summary,
    coverImage,
    featured,
    publishedAt
  }
`

export const getProjectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ...,
    category->{ title, slug }
  }
`

export const listToolsQuery = groq`
  *[_type == "tool"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category->{ title, slug },
    status,
    summary,
    forWhom,
    features,
    coverImage,
    requestLabel,
    publishedAt
  }
`

export const getToolBySlugQuery = groq`
  *[_type == "tool" && slug.current == $slug][0] {
    ...,
    category->{ title, slug }
  }
`

export const listPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    excerpt,
    coverImage,
    publishedAt,
    readingTime,
    featured
  }
`

export const getPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ...
  }
`

export const getLegalBySlugQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0] {
    ...
  }
`
