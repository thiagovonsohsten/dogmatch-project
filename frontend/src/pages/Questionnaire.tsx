import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { UserPreferences, DogSize, SheddingLevel, HealthRisk, BreedGroup } from "@/types/dogmatch";
import Header from "@/components/Header";

export default function Questionnaire() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  const [preferences, setPreferences] = useState<UserPreferences>({
    size: "Medium",
    exerciseHours: 2,
    goodWithChildren: true,
    intelligence: 7,
    trainingDifficulty: 5,
    shedding: "Moderate",
    healthRisk: "Medium",
    breedGroup: "Sporting",
    friendliness: 8,
    lifeExpectancy: 12,
    averageWeight: 25
  });

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem("dogmatch-preferences", JSON.stringify(preferences));
    navigate("/results");
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Passo {step} de {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="p-8 shadow-medium animate-scale-in">
            {/* Step 1: Tamanho e Exercício */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Tamanho e Atividade</h2>
                  <p className="text-muted-foreground">Vamos começar com o básico</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size" className="text-base">Tamanho preferido do cão</Label>
                  <Select value={preferences.size} onValueChange={(v) => updatePreference("size", v as DogSize)}>
                    <SelectTrigger id="size" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Small">Pequeno (5-15kg)</SelectItem>
                      <SelectItem value="Medium">Médio (15-30kg)</SelectItem>
                      <SelectItem value="Large">Grande (30-50kg)</SelectItem>
                      <SelectItem value="Giant">Gigante (50kg+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-base">Horas de exercício por dia</Label>
                    <span className="font-semibold text-primary">{preferences.exerciseHours}h</span>
                  </div>
                  <Slider
                    value={[preferences.exerciseHours]}
                    onValueChange={(v) => updatePreference("exerciseHours", v[0])}
                    min={0}
                    max={4}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Sedentário</span>
                    <span>Muito ativo</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Bom com crianças?</Label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={preferences.goodWithChildren ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => updatePreference("goodWithChildren", true)}
                    >
                      Sim
                    </Button>
                    <Button
                      type="button"
                      variant={!preferences.goodWithChildren ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => updatePreference("goodWithChildren", false)}
                    >
                      Não
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Inteligência e Treino */}
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Inteligência e Treinamento</h2>
                  <p className="text-muted-foreground">Como você prefere treinar seu cão?</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-base">Nível de inteligência desejado</Label>
                    <span className="font-semibold text-primary">{preferences.intelligence}/10</span>
                  </div>
                  <Slider
                    value={[preferences.intelligence]}
                    onValueChange={(v) => updatePreference("intelligence", v[0])}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Cães mais inteligentes aprendem comandos rapidamente
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-base">Dificuldade de treino aceitável</Label>
                    <span className="font-semibold text-primary">{preferences.trainingDifficulty}/10</span>
                  </div>
                  <Slider
                    value={[preferences.trainingDifficulty]}
                    onValueChange={(v) => updatePreference("trainingDifficulty", v[0])}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Muito fácil</span>
                    <span>Desafiador</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-base">Amigabilidade desejada</Label>
                    <span className="font-semibold text-primary">{preferences.friendliness}/10</span>
                  </div>
                  <Slider
                    value={[preferences.friendliness]}
                    onValueChange={(v) => updatePreference("friendliness", v[0])}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Cuidados e Saúde */}
            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Cuidados e Saúde</h2>
                  <p className="text-muted-foreground">Preferências de manutenção</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shedding" className="text-base">Nível de queda de pelo</Label>
                  <Select value={preferences.shedding} onValueChange={(v) => updatePreference("shedding", v as SheddingLevel)}>
                    <SelectTrigger id="shedding">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Baixo</SelectItem>
                      <SelectItem value="Moderate">Moderado</SelectItem>
                      <SelectItem value="High">Alto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="health" className="text-base">Risco de problemas de saúde</Label>
                  <Select value={preferences.healthRisk} onValueChange={(v) => updatePreference("healthRisk", v as HealthRisk)}>
                    <SelectTrigger id="health">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Baixo</SelectItem>
                      <SelectItem value="Medium">Médio</SelectItem>
                      <SelectItem value="High">Alto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-base">Expectativa de vida (anos)</Label>
                    <span className="font-semibold text-primary">{preferences.lifeExpectancy}</span>
                  </div>
                  <Slider
                    value={[preferences.lifeExpectancy]}
                    onValueChange={(v) => updatePreference("lifeExpectancy", v[0])}
                    min={8}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Tipo e Características Finais */}
            {step === 4 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Tipo de Raça</h2>
                  <p className="text-muted-foreground">Últimos detalhes</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="breedGroup" className="text-base">Grupo de raça preferido</Label>
                  <Select value={preferences.breedGroup} onValueChange={(v) => updatePreference("breedGroup", v as BreedGroup)}>
                    <SelectTrigger id="breedGroup">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Herding">Pastoreio</SelectItem>
                      <SelectItem value="Sporting">Esportivo</SelectItem>
                      <SelectItem value="Working">Trabalho</SelectItem>
                      <SelectItem value="Hound">Caça</SelectItem>
                      <SelectItem value="Terrier">Terrier</SelectItem>
                      <SelectItem value="Toy">Toy/Companhia</SelectItem>
                      <SelectItem value="Non-Sporting">Não-Esportivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-base">Peso médio preferido (kg)</Label>
                    <span className="font-semibold text-primary">{preferences.averageWeight}kg</span>
                  </div>
                  <Slider
                    value={[preferences.averageWeight]}
                    onValueChange={(v) => updatePreference("averageWeight", v[0])}
                    min={5}
                    max={80}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-4 mt-12">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
              )}
              
              {step < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-hero"
                >
                  Próximo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-accent"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Ver Recomendação
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
