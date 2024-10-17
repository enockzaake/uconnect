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
import TestComponent from "@/components/Test";
import Header from "@/components/Header";
import WhatsappBot from "@/components/WhatsappBot";

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

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

  const heroSlides = [
    {
      image: "/images/usa.jpg",
      title: "Explore the USA's Academic Excellence",
      description:
        "Study in the USA and immerse yourself in top-tier education, vibrant cities, and diverse cultures with U-CONNECT.",
    },
    {
      image: "/images/italy.jpg",
      title: "Experience Italy's Rich Heritage",
      description:
        "Dive into Italy’s world-renowned arts, history, and culinary traditions while advancing your education.",
    },
    {
      image: "/images/france-hero.jpg",
      title: "Learn and Live in Iconic France",
      description:
        "Pursue your academic goals in France, where world-class education meets rich cultural experiences.",
    },
    {
      image: "/images/france-2.jpg",
      title: "Shape Your Future in France",
      description:
        "Gain critical skills and a global outlook while studying in the heart of France’s innovative academic institutions.",
    },
    {
      image: "/images/canada.jpg",
      title: "Unlock Opportunities in Canada",
      description:
        "Study in Canada, known for its top universities, multicultural environments, and high-quality education.",
    },
    {
      image: "/images/germany.jpg",
      title: "Innovate and Learn in Germany",
      description:
        "Join Germany’s renowned universities and enhance your skills in a country famous for its engineering and technology sectors.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  });

  useEffect(() => {
    const marquee = document.getElementById("university-marquee");
    if (marquee) {
      const originalContent = marquee.innerHTML;
      marquee.innerHTML += originalContent;
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <WhatsappBot />
      <main className="flex-1">
        <section className="relative w-full h-[calc(80vh-3.5rem)] overflow-hidden">
          <div
            className="absolute inset-0 bg-repeat opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23EF4444' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "20px 20px",
            }}
          ></div>
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentHeroSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                layout="fill"
                objectFit="cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8">
                    {slide.description}
                  </p>
                  <Button
                    size="lg"
                    className="bg-red-700 hover:bg-red-800 text-white"
                  >
                    Explore Programs
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentHeroSlide
                    ? "bg-red-700"
                    : "bg-white bg-opacity-50"
                }`}
                onClick={() => setCurrentHeroSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-red-700 hover:bg-red-50 hover:text-red-800"
              onClick={() =>
                setCurrentHeroSlide(
                  (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
                )
              }
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-red-700 hover:bg-red-50 hover:text-red-800"
              onClick={() =>
                setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)
              }
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </section>

        <section className="w-full py-6">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-red-700">
                Your personalized dashboard
              </h2>
              <p className="max-w-[1200px] text-zinc-500">
                Experience our user-friendly platform that makes planning your
                study abroad journey a breeze.
              </p>
            </div>
            <div className="mt-10">
              <Image
                src="/images/dashboard.png"
                alt="U-CONNECT Dashboard"
                width={1000}
                height={400}
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
          </div>
        </section>

        <TestComponent />

        <section className="w-full py-12 ">
          <div className="container px-4 md:px-24">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-red-700">
                  Comprehensive Visa Assistance
                </h2>
                <p className="max-w-[600px] text-zinc-500 md:text-md/relaxed lg:text-base/relaxed xl:text-md/relaxed">
                  We understand that the visa process can be daunting.
                  That&apos;s why our dedicated team provides comprehensive
                  support throughout your visa application journey. From
                  document preparation to interview coaching, we&apos;re with
                  you every step of the way until you&apos;re ready to embark on
                  your study abroad adventure.
                </p>
              </div>
              <div className="flex justify-center lg:order-first">
                <Image
                  src="/images/visa-approved.jpg"
                  alt="Visa Assistance Process"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="destinatons" className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-red-600">
                  Popular Destinations
                </h2>
                <p className="max-w-[900px] text-zinc-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
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
                        className="inline-flex items-center  text-sm text-blue-600 hover:underline"
                        href="/fn"
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

        <section className="w-full py-12  bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-red-700">
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
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-red-700 hover:bg-red-50 hover:text-red-800"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous testimonial</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white text-red-700 hover:bg-red-50 hover:text-red-800"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next testimonial</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-red-700">
                  Why U-CONNECT?
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
                  <GraduationCap className="h-12 w-12 text-red-700" />
                  <h3 className="text-xl font-bold">Expert Guidance</h3>
                  <p className="text-zinc-500">
                    Our experienced advisors provide personalized support
                    throughout your study abroad journey.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center space-y-4 text-center p-6">
                  <Globe2 className="h-12 w-12 text-red-700" />
                  <h3 className="text-xl font-bold">Global Network</h3>
                  <p className="text-zinc-500">
                    Access to a wide range of prestigious universities and
                    programs across the globe.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center space-y-4 text-center p-6">
                  <Users className="h-12 w-12 text-red-700" />
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

        <section className="w-full py-12 bg-red-700">
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
                    className="max-w-lg flex-1 bg-white text-red-700 placeholder-red-400"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-white text-red-700 hover:bg-red-50"
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
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-red-100">
        <p className="text-xs text-zinc-500">
          © 2024 U-CONNECT. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-red-700"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-red-700"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
