import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header>
      <span>Logo</span>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button variant="outline">Login</Button>
        </SignInButton>
        <SignUpButton>
          <Button>Sign Up</Button>
        </SignUpButton>
      </SignedOut>
    </header>
  )
}
