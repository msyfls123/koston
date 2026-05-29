import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card'
import { Button } from '../ui/button'

export const Nav = () => {
  return <div >
    <HoverCard defaultOpen>
      <HoverCardTrigger asChild>
        <Button>Hover</Button>
      </HoverCardTrigger>
      <HoverCardContent>Content</HoverCardContent>
    </HoverCard>
  </div>
}