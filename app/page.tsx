"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe2,
  GraduationCap,
  Users,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import WhatsappBot from "@/components/WhatsappBot";

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonials = [
    {
      name: "Emily Johnson",
      program: "Semester in Barcelona",
      quote:
        "Studying in Barcelona was the best decision I've ever made. I improved my Spanish, made lifelong friends, and gained a new perspective on the world.",
    },
    {
      name: "Michael Lee",
      program: "Year Abroad in Tokyo",
      quote:
        "My year in Tokyo challenged me in ways I never expected. I've grown so much both academically and personally. It's an experience I'll treasure forever.",
    },
    {
      name: "Sarah Thompson",
      program: "Summer in Paris",
      quote:
        "The summer program in Paris was incredible. I fell in love with the city, improved my French, and made connections that will last a lifetime.",
    },
  ];

  const popularDestinations = [
    { title: "United Kingdom", image: "/images/united-kingdom.jpg" },
    { title: "Spain", image: "/images/spain.jpg" },
    { title: "Japan", image: "/images/japan.jpg" },
    { title: "Australia", image: "/images/australia.jpg" },
    { title: "France", image: "/images/france.jpg" },
    { title: "Canada", image: "/images/canada.jpg" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const stats = [
    { label: "Study Destinations", value: "50+" },
    { label: "Students Helped", value: "10,000+" },
    { label: "Partner Universities", value: "200+" },
    { label: "Years of Experience", value: "15+" },
  ];

  const universities = [
    "Harvard University",
    "University of Oxford",
    "Stanford University",
    "University of Cambridge",
    "MIT",
    "ETH Zurich",
    "University of Tokyo",
    "National University of Singapore",
  ];

  useEffect(() => {
    const marquee = document.getElementById("university-marquee");
    if (marquee) {
      const originalContent = marquee.innerHTML;
      marquee.innerHTML += originalContent;
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <WhatsappBot />
      <main className="flex-1">
        <section className="w-full py-24 md:py-24 lg:py-32 xl:pt-48 bg-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-blue-100 opacity-50"
              style={{
                backgroundImage: `radial-gradient(circle, #3B82F6 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            ></div>
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-600">
                  Discover the World Through Education
                </h1>
                <p className="max-w-[600px] text-zinc-500 md:text-xl mx-auto">
                  Embark on a life-changing journey with Universities Connect.
                  Explore new cultures, learn new languages, and gain invaluable
                  experiences that will shape your future.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
                  href="/login"
                >
                  Get started
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-blue-200 bg-white px-8 text-sm font-medium text-blue-600 shadow-sm transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
                  href="/inquiries"
                >
                  Contact an Advisor
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 lg:py-16 bg-blue-50">
          <div className="container px-4 md:px-">
            <div className="grid grid-cols-2 md:grid-cols-4 gap- text-center">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-4xl font-bold text-blue-600">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-medium text-zinc-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 overflow-hidden bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8 text-blue-600">
              Our Partner Universities
            </h2>
            <div className="relative">
              <div
                id="university-marquee"
                className="flex space-x-8 animate-marquee"
              >
                {universities.map((uni, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center bg-white rounded-lg shadow-md p-4 w-48 h-24"
                  >
                    <span className="text-sm font-semibold text-center">
                      {uni}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-12 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-600">
                  Why Choose U-Connect?
                </h2>
                <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer unparalleled support and opportunities for students
                  seeking to broaden their horizons through international
                  education.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center space-y-4 text-center p-6">
                  <GraduationCap className="h-12 w-12 text-blue-600" />
                  <h3 className="text-xl font-bold">Expert Guidance</h3>
                  <p className="text-zinc-500">
                    Our experienced advisors provide personalized support
                    throughout your study abroad journey.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center space-y-4 text-center p-6">
                  <Globe2 className="h-12 w-12 text-blue-600" />
                  <h3 className="text-xl font-bold">Global Network</h3>
                  <p className="text-zinc-500">
                    Access to a wide range of prestigious universities and
                    programs across the globe.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center space-y-4 text-center p-6">
                  <Users className="h-12 w-12 text-blue-600" />
                  <h3 className="text-xl font-bold">Cultural Immersion</h3>
                  <p className="text-zinc-500">
                    Immerse yourself in new cultures and gain a global
                    perspective that will benefit your future career.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-600">
                  Our Programs
                </h2>
                <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our diverse range of study abroad programs tailored to
                  meet your academic and personal goals.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 pt-12">
              <Tabs defaultValue="semester" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="semester">Semester Programs</TabsTrigger>
                  <TabsTrigger value="summer">Summer Programs</TabsTrigger>
                  <TabsTrigger value="year">Full Year Programs</TabsTrigger>
                </TabsList>
                <TabsContent value="semester">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">
                        Semester Abroad
                      </h3>
                      <p className="text-zinc-500 mb-4">
                        Immerse yourself in a new culture for a full semester.
                        Perfect for students looking for an in-depth
                        international experience without committing to a full
                        year.
                      </p>
                      <Link
                        className="inline-flex items-center text-blue-600 hover:underline"
                        href="#"
                      >
                        Learn more about Semester Programs
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="summer">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Summer Abroad</h3>
                      <p className="text-zinc-500 mb-4">
                        Make the most of your summer break with our intensive
                        programs. Gain credits while exploring new countries and
                        cultures.
                      </p>
                      <Link
                        className="inline-flex items-center text-blue-600 hover:underline"
                        href="#"
                      >
                        Discover Summer Programs
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="year">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">
                        Full Year Abroad
                      </h3>
                      <p className="text-zinc-500 mb-4">
                        Fully immerse yourself in a new academic and cultural
                        environment for an entire academic year. Ideal for
                        students seeking a comprehensive international
                        experience.
                      </p>
                      <Link
                        className="inline-flex items-center text-blue-600 hover:underline"
                        href="#"
                      >
                        Explore Full Year Programs
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section
          id="destinatons"
          className="w-full py-12 md:py-24 lg:py-32 bg-blue-50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-600">
                  Popular Destinations
                </h2>
                <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover some of our most sought-after study abroad locations
                  around the world.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {popularDestinations.map((destination, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-0">
                    <Image
                      alt={`Study in ${destination.title}`}
                      className="object-cover w-full h-48"
                      height="200"
                      src={destination.image}
                      width="300"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">
                        {destination.title}
                      </h3>
                      <Link
                        className="inline-flex items-center text-sm text-blue-600 hover:underline"
                        href="#"
                      >
                        Explore programs
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-600">
                  Sign up today to find your dream university.
                </h2>
                <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  Take a look at our user-friendly platform that makes planning
                  your study abroad experience a breeze.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Dashboard Screenshot"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Program Search Screenshot"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-600">
                  Student Testimonials
                </h2>
                <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from students who have transformed their lives through
                  our study abroad programs.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <div className="relative">
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <p className="mb-4 italic">
                      &quot;{testimonials[currentSlide].quote}&quot;
                    </p>
                    <p className="font-semibold">
                      {testimonials[currentSlide].name}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {testimonials[currentSlide].program}
                    </p>
                  </CardContent>
                </Card>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous testimonial</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next testimonial</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Start Your Adventure?
                </h2>
                <p className="max-w-[900px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take the first step towards your global education journey.
                  Contact us today for a free consultation.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Input
                    className="max-w-lg flex-1 bg-white text-blue-600 placeholder-blue-400"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-blue-100">
                  By submitting, you agree to our{" "}
                  <Link
                    className="underline underline-offset-2 hover:text-white"
                    href="#"
                  >
                    Terms & Conditions
                  </Link>
                  .
                </p>
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
