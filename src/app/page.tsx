import Link from "next/link";
import ParserForm from "~/app/_components/parser-form";
import { LatestPost } from "~/app/_components/post";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "~/components/ui/field"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

import { api, HydrateClient } from "~/trpc/server";
import { Feather } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox"

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

const contributors: { title: string; href: string; description: string }[] = [
  {
    title: "Ben Morin",
    href: "#",
    description:
      "These are the responsibilities than Ben handled in this project.",
  },
  {
    title: "Khang Nguyen",
    href: "https://www.ndtkhang.dev",
    description:
      "I handled the whole web app and integrating all services",
  },
  {
    title: "John Yoshida",
    href: "#",
    description:
      "These are the responsibilities than John handled in this project.",
  },
  {
    title: "Ishkandar",
    href: "#",
    description: "These are the responsibilities than Ishkandar handled in this project.",
  },
  {
    title: "David Harrison",
    href: "#",
    description:
      "These are the responsibilities than David handled in this project.",
  },
  {
    title: "Jiming Park",
    href: "#",
    description:
      "These are the responsibilities than Jiming handled in this project.",
  },
]

export default async function Home() {

  return (
    <HydrateClient>

      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList>

          {/* Home Page */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/">Detector</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Contributors */}
          <NavigationMenuItem>
          <NavigationMenuTrigger>Contributors</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {contributors.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

          {/* Github Link */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="https://github.com/ndtkhang/fake_job_post_detective">Github</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <main className="flex bg-background">
        
        <div className="flex-col py-16 min-w-screen min-h-screen gap-9">
          
          {/* Title  */}
          <div className = "flex flex-col items-center px-16">
            <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Fake <span className="text-[hsl(236,100%,70%)]">Job Post</span> Detector
            </h1>

            <p className="mt-6 text-lg max-w-2xl text-center text-muted-foreground">
              Answer a few questions about a job posts you saw on LinkedIn, etc. and let us tell you if it's likely to be fake or real.
              Recommended to copy and paste things from the job posts instead of manually fill it out for best results.
            </p>
          </div>

          <div className ="min-h-screen flex gap-6 px-32 py-16">
            {/* Form on the left side */}
            <div className="flex-7 h-[80vh] px-6 py-8 bg-card rounded-[48px] shadow-medium">
              {/* Client-side parser form */}
              {/* eslint-disable-next-line @next/next/no-typos */}
              {/* @ts-ignore */}
              <ParserForm />
            </div>

            {/* Result on the right side */}
            <div className="flex-3 h-[80vh] px-4 py-16 bg-card rounded-[48px]">
              {/* The form component displays results itself; keep this area for future detail view */}
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                Results and details appear on the left below the form output.
              </div>
            </div>

          </div>
        </div>

      </main>
    </HydrateClient>
  );
}