import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ScrollArea } from "./ui/scroll-area";
import { AddChosenProgramButton } from "@/components/ActionBUttons";
import Image from "next/image";

interface Program {
  id: string;
  name: string;
  level: string;
  institution: string;
  duration: string;
  created_at: string;
  updated_at: string;
  fulltime: boolean;
  description: string;
  image: string;
  country: string;
  logo: string | null;
}

export default function SearchResults({ programs }: { programs: Program[] }) {
  return (
    <ScrollArea>
      {programs.length > 0 ? (
        <div className="w-full grid md:grid-cols-2 gap-2 p-2">
          {programs.map((program) => (
            <Card
              key={program.id}
              className="bg-card hover:bg-accent/50 transition-colors"
            >
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className="flex-shrink-0">
                  <Image
                    src={program.logo || "/images/mit.jpg"}
                    width={100}
                    height={100}
                    alt={`${program.name} logo`}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <CardTitle className="text-lg">{program.name}</CardTitle>
                  <CardTitle className="text-muted-foreground text-xs">
                    {program.institution}
                  </CardTitle>
                </div>
                <AddChosenProgramButton programID={program.id} />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-card-foreground/80 mb-2">
                  {program.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        "No programs found"
      )}
    </ScrollArea>
  );
}
