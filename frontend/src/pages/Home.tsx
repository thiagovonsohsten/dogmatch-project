import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Brain, Search } from "lucide-react";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-accent rounded-full text-sm font-medium mb-6 shadow-soft">
              <Sparkles className="w-4 h-4" />
              <span>Sistema de Recomendação Inteligente</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Encontre seu Melhor Amigo
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Use inteligência artificial para descobrir a raça de cão perfeita baseada nas suas preferências e estilo de vida
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/questionnaire">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-gradient-hero hover:opacity-90 transition-all shadow-medium hover:shadow-strong"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Começar Recomendação
                </Button>
              </Link>
              
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-2"
                >
                  Como Funciona?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-all animate-scale-in">
              <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">IA Avançada</h3>
              <p className="text-muted-foreground">
                Algoritmo de Machine Learning analisa múltiplas características para encontrar o match perfeito
              </p>
            </div>
            
            <div className="text-center p-8 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-all animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-warm-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Personalizado</h3>
              <p className="text-muted-foreground">
                Recomendações baseadas no seu estilo de vida, preferências e necessidades específicas
              </p>
            </div>
            
            <div className="text-center p-8 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-all animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Raças Similares</h3>
              <p className="text-muted-foreground">
                Descubra outras raças compatíveis e compare características detalhadas
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-hero rounded-3xl p-12 text-center shadow-strong">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Pronto para conhecer seu companheiro ideal?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Leva apenas 2 minutos para responder o questionário
            </p>
            <Link to="/questionnaire">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-6 bg-card hover:bg-card/90 text-primary shadow-medium"
              >
                Iniciar Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
