import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Target, Zap, ArrowRight } from "lucide-react";
import Header from "@/components/Header";

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Como o DogMatch Funciona?
            </h1>
            <p className="text-xl text-muted-foreground">
              Tecnologia de Machine Learning para encontrar seu companheiro perfeito
            </p>
          </div>

          <div className="space-y-8 mb-12">
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">1. Suas Preferências</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Coletamos informações sobre seu estilo de vida, preferências e necessidades através de um questionário detalhado. Cada resposta é importante para encontrar a raça ideal.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-warm-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">2. Algoritmo Inteligente</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nosso sistema de Machine Learning analisa múltiplas características das raças (tamanho, temperamento, necessidades de exercício, compatibilidade com crianças, etc.) e calcula scores de compatibilidade usando feature engineering avançado.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">3. Recomendação Personalizada</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Você recebe uma recomendação detalhada com a raça mais compatível, incluindo score de compatibilidade, características principais e raças similares para explorar. Tudo baseado em dados científicos sobre comportamento canino.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-hero text-primary-foreground">
            <h2 className="text-2xl font-bold mb-4">O Algoritmo</h2>
            <p className="leading-relaxed mb-6">
              O DogMatch utiliza um sistema híbrido que combina algoritmos de similaridade com pesos ajustados para cada característica. Analisamos 11 dimensões diferentes de compatibilidade, cada uma com peso específico baseado em estudos de comportamento animal e feedback de especialistas.
            </p>
            <p className="leading-relaxed">
              O sistema é constantemente otimizado para fornecer recomendações cada vez mais precisas e personalizadas.
            </p>
          </Card>

          <div className="text-center mt-12">
            <Link to="/questionnaire">
              <Button size="lg" className="bg-gradient-accent text-lg px-8 py-6">
                Experimentar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
