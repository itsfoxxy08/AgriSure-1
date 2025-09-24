import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/ui/language-selector";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import agrisureLogo from "@/assets/agrisure-logo-final.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const userData = localStorage.getItem("agrisure_user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location]);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { name: t("home"), path: "/" },
    { name: t("schemes"), path: "/schemes" },
    { name: t("benefits"), path: "/benefits" },
    { name: t("mandiPrices"), path: "/mandi-prices" },
    { name: t("reportCorruption"), path: "/report-corruption" },
    { name: t("profile"), path: "/profile" },
  ];

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("agrisure_user");
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src={agrisureLogo} 
            alt="AgriSure Logo" 
            className="h-12 w-auto max-w-[140px]"
          />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-base font-medium transition-colors hover:text-primary ${
                isActive(item.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-3">
          <LanguageSelector />
          
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="outline" onClick={handleLogout} size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" onClick={handleLogin}>
                {t("login")}
              </Button>
              <Button onClick={handleRegister}>
                {t("register")}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;