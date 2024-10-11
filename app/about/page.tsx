import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import MapSVG from "@/components/MapSVG";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="  text-blue-600 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  About Universities Connect
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Global for a better tomorrow
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Mission
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At Acme Inc, we&apos;re committed to delivering innovative
                  solutions that transform industries and improve lives. Our
                  mission is to push the boundaries of technology while
                  maintaining a strong focus on sustainability and ethical
                  practices.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Values
                </h2>
                <ul className="grid gap-4 list-disc list-inside text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  <li>
                    Innovation: We constantly seek new ideas and solutions.
                  </li>
                  <li>
                    Integrity: We uphold the highest ethical standards in all
                    our actions.
                  </li>
                  <li>
                    Collaboration: We believe in the power of teamwork and
                    partnership.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Team
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  name: "Alice Johnson",
                  role: "CEO",
                  image: "/placeholder.svg",
                },
                { name: "Bob Smith", role: "CTO", image: "/placeholder.svg" },
                {
                  name: "Carol Williams",
                  role: "COO",
                  image: "/placeholder.svg",
                },
              ].map((member) => (
                <Card key={member.name}>
                  <CardHeader>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={100}
                      height={100}
                      className="rounded-full mx-auto"
                    />
                    <CardTitle className="text-center">{member.name}</CardTitle>
                    <CardDescription className="text-center">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Location
            </h2>
            <div className=" overflow-hidden rounded-lg">
              <MapSVG />
            </div>
            <p className="mt-4 text-center text-muted-foreground"></p>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Achievements
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  year: "2023",
                  achievement: "Forbes Innovative Company of the Year",
                },
                { year: "2022", achievement: "1 Million Customers Milestone" },
                {
                  year: "2021",
                  achievement: "Launched Revolutionary Product X",
                },
              ].map((item) => (
                <Card key={item.year}>
                  <CardHeader>
                    <CardTitle>{item.year}</CardTitle>
                    <CardDescription>{item.achievement}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join Our Journey
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Be part of our mission to innovate and make a difference. Join
                  our team or partner with us today.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Join Our Team</Button>
                <Button variant="outline">Partner With Us</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-blue-100">
        <p className="text-xs text-zinc-500">
          © 2024 UNIVERSITIES CONNECT. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-blue-600"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-blue-600"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
