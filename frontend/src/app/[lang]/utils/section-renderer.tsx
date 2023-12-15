import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Email from "../components/Email";
import Slides from "@/app/[lang]/components/Slides";
import ClickToAction from "@/app/[lang]/components/ClickToAction";
import Parallax from "@/app/[lang]/components/Parallax";
import About from "@/app/[lang]/components/About";
import Services from "@/app/[lang]/components/Services";
import Articles from "@/app/[lang]/components/Articles";
import Stocks from "@/app/[lang]/components/Stocks";
import Members from "@/app/[lang]/components/Members";

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
    case "sections.services":
      return <Services key={index} data={section}/>
    case "sections.articles":
      return <Articles key={index} data={section}/>
    case "sections.stocks":
      return <Stocks key={index}/>
    case "sections.members":
      return <Members key={index} data={section}/>
    default:
      return null;
  }
}
