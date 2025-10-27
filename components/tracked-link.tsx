'use client'

import Link, { LinkProps } from 'next/link'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  Partial<LinkProps> & {
    href: string
    eventName?: string
    external?: boolean   // set true for offsite URLs if you want hard nav
  }

export default function TrackedLink({
  href,
  eventName = 'conversion_event_contact',
  external,
  children,
  onClick,
  ...rest
}: Props) {
  const router = useRouter()

  const handleClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      onClick?.(e)
      if (e.defaultPrevented) return

      // If gtag isn't present, let the default navigation happen
      if (!window.gtag) return

      e.preventDefault()

      let navigated = false
      const go = () => {
        if (navigated) return
        navigated = true
        if (external || href.startsWith('http') || href.startsWith('mailto:')) {
          window.location.href = href
        } else {
          router.push(href)
        }
      }

      window.gtag('event', eventName, {
        event_callback: go,
        event_timeout: 2000,
      })

      // Extra safety in case callback never fires
      setTimeout(go, 2100)
    },
    [eventName, external, href, onClick, router]
  )

  // Works fine inside shadcn/ui Button with `asChild`
  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
