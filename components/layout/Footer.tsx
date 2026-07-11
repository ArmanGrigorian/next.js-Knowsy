import { Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full mt-auto py-8 border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center gap-2">
        <p className="text-neutral-400 flex items-center gap-2 text-sm font-medium">
          Built with{" "}
          <Heart className="w-4 h-4 text-brand-secondary fill-brand-secondary/20" />{" "}
          by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="https://github.com/ArmanGrigorian?tab=repositories"
            className="text-brand-primary hover:text-brand-secondary hover:underline underline-offset-4 transition-colors"
          >
            Me
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
