import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Email from "../components/Email";
import Slides from "@/app/[lang]/components/Slides";
import ClickToAction from "@/app/[lang]/components/ClickToAction";
import Parallax from "@/app/[lang]/components/Parallax";
import About from "@/app/[lang]/components/About";

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} />;
    case "sections.testimonials-group":
      return <Testimonials key={index} data={section} />;
    case "sections.pricing":
      return <Pricing key={index} data={section} />;
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    case "sections.slides":
      return <Slides key={index} data={section}/>
    case "sections.click-to-action":
      return <ClickToAction key={index} data={section}/>
    case "sections.parallax":
      return <Parallax key={index} data={section}/>
    case "sections.about":
      return <About key={index} data={section}/>
    default:
      return null;
  }
}
