import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudUpload } from "lucide-react";
import { Progress } from "./ui/progress";

export default function TestComponent() {
  const cards = [
    {
      id: 1,
      title: "Personal statement",
    },
    {
      id: 2,
      title: "Resume",
    },
    { id: 3, title: "Letter of recommendation" },
    { id: 4, title: "Transcript" },
    {
      id: 5,
      title: "Medical report",
    },
  ];

  return (
    <section className="w-full text-center pt-12">
      <div className="flex flex-col space-y-1">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#522258]">
          Seamless document upload to the cloud
        </h2>
        <h3 className=" text-zinc-500 text-center">
          Uplaod all your required documents seamless from the comfort of your
          home and let us take care of the rest.
        </h3>
      </div>
      <div className="relative mt-4 w-full max-w-md mx-auto  h-[250px] lg:h-[320px] lg:order-last perspective-[1000px]">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            className="absolute rounded left-0 right-0 mx-auto w-full transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2 hover:shadow-lg"
            style={{
              zIndex: cards.length - index,
              transform: `translateY(${index * 42}px) scale(${
                1 - index * 0.05
              }) translateZ(${-index * 100}px)`,
              opacity: 1 - index * 0.2,
            }}
          >
            <CardHeader className=" bg-red-100">
              <CardTitle className="flex items-center justify-between text-lg text-gray-900 md:text-xl">
                {card.title}
                {card.id === 1 ? (
                  <CloudUpload color="#ff0000" className="w-12 h-12" />
                ) : null}
              </CardTitle>
              {card.id === 1 ? (
                <div className="">
                  Uploading... 79%
                  <Progress value={79} className="w-full h-2" />
                </div>
              ) : null}
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
