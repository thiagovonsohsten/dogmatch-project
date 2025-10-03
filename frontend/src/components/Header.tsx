import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src={logo} alt="DogMatch" className="h-12 w-auto" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Início
          </Link>
          <Link 
            to="/about" 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}
