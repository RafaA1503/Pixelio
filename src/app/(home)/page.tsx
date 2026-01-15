"use client";

import { ProjectFrom } from "@/modules/home/ui/components/project-form";
import { ProjectList } from "@/modules/home/ui/components/projects-list";
import Image from "next/image";
import { useEffect, useState } from "react";

const Page = () => {
  const [greeting, setGreeting] = useState("Buenos días");

  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 12) {
      setGreeting("Buenos días");
    } else if (hour >= 12 && hour < 20) {
      setGreeting("Buenas tardes");
    } else {
      setGreeting("Buenas noches");
    }
  }, []);

  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          <Image 
            src="/logo.svg"
            alt="Pixelio"
            width={50}
            height={50}
            className="hidden md:block"         
          />
        </div>
        <h1 className="text-2xl md:text-5xl font-bold text-center">
          {greeting}, Bienvenido a Pixelio
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center">
              Crea aplicaciones y sitios web chateando con IA
        </p>
        <div className="max-w-3xl mx-auto w-full">
          <ProjectFrom />
        </div>
      </section>
      <ProjectList />
    </div>
  );
};

export default Page;