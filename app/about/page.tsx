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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#f8f5f9]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-[#522258] text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  About Universities Connect
                </h1>
                <p className="mx-auto max-w-[700px] text-[#7d337f] md:text-xl">
                  Global for a better tomorrow
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4 text-center lg:text-left">
                <h2 className="text-[#522258] text-3xl font-bold tracking-tighter  text-center sm:text-2xl md:text-3xl">
                  Our Mission
                </h2>
                <p className="mx-auto max-w-[600px] text-[#7d337f] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At Universities Connect, we&apos;re committed to delivering
                  innovative solutions that transform education and improve
                  lives. Our mission is to push the boundaries of global
                  education while maintaining a strong focus on sustainability
                  and ethical practices.
                </p>
              </div>
              <div className="space-y-4 text-center lg:text-left">
                <h2 className="text-[#522258] text-3xl font-bold tracking-tighter text-center sm:text-2xl md:text-3xl">
                  Our Values
                </h2>
                <ul className="mx-auto max-w-[600px] space-y-2 text-[#7d337f] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f5f9]">
          <div className="container px-4 md:px-6">
            <h2 className="text-[#522258] text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
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
                <Card key={member.name} className="bg-white">
                  <CardHeader>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={100}
                      height={100}
                      className="rounded-full mx-auto"
                    />
                    <CardTitle className="text-center text-[#522258]">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-center text-[#7d337f]">
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
            <h2 className="text-[#522258] text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Location
            </h2>
            <div className="flex items-center justify-center overflow-hidden rounded-lg">
              <MapSVG />
            </div>
            <p className="mt-4 text-center text-[#7d337f]">Kampala Uganda</p>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f5f9]">
          <div className="container px-4 md:px-6">
            <h2 className="text-[#522258] text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Achievements
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  year: "2023",
                  achievement: "Global Education Innovation Award",
                },
                {
                  year: "2022",
                  achievement: "100 University Partnerships Milestone",
                },
                {
                  year: "2021",
                  achievement:
                    "Launched Revolutionary Global Learning Platform",
                },
              ].map((item) => (
                <Card key={item.year} className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#522258] text-center">
                      {item.year}
                    </CardTitle>
                    <CardDescription className="text-[#7d337f] text-center">
                      {item.achievement}
                    </CardDescription>
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
                <h2 className="text-[#522258] text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join Our Journey
                </h2>
                <p className="mx-auto max-w-[700px] text-[#7d337f] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Be part of our mission to innovate and make a difference in
                  global education. Join our team or partner with us today.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-[#522258] hover:bg-[#7d337f] text-white">
                  Join Our Team
                </Button>
                <Button
                  variant="outline"
                  className="text-[#522258] border-[#522258] hover:bg-[#f8f5f9]"
                >
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#e6d9e8]">
        <p className="text-xs text-[#7d337f]">
          © 2024 UNIVERSITIES CONNECT. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-[#522258]"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-[#522258]"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
