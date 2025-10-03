import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Share2, Activity, Brain, Users, Scissors } from "lucide-react";
import { DogBreed } from "@/types/dogmatch";
import { mockBreeds } from "@/lib/mockData";
import Header from "@/components/Header";
import { toast } from "sonner";

export default function BreedDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [breed, setBreed] = useState<DogBreed | null>(null);

  useEffect(() => {
    const foundBreed = mockBreeds.find(b => b.id === id);
    if (!foundBreed) {
      navigate("/");
      return;
    }
    setBreed(foundBreed);
  }, [id, navigate]);

  if (!breed) {
    return null;
  }

  const characteristics = [
    { icon: Activity, label: "Exercício", value: `${breed.exerciseNeeds}h/dia` },
    { icon: Brain, label: "Inteligência", value: `${breed.intelligence}/10` },
    { icon: Users, label: "Com crianças", value: breed.goodWithChildren ? "Sim" : "Não" },
    { icon: Scissors, label: "Queda de pelo", value: breed.shedding }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <img
                src={breed.images[0]}
                alt={breed.name}
                className="w-full aspect-square object-cover rounded-2xl shadow-strong"
              />
            </div>

            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{breed.name}</h1>
                  <Badge variant="secondary" className="text-base px-3 py-1">
                    {breed.breedGroup}
                  </Badge>
                </div>
                <Button variant="outline" size="icon" onClick={() => toast.success("Compartilhado!")}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-lg text-muted-foreground mb-6">
                {breed.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {characteristics.map(({ icon: Icon, label, value }) => (
                  <Card key={label} className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{label}</div>
                        <div className="font-semibold">{value}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-3">Características Físicas</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Tamanho:</span>
                      <span className="ml-2 font-medium">{breed.size}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Peso:</span>
                      <span className="ml-2 font-medium">{breed.averageWeight}kg</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Vida:</span>
                      <span className="ml-2 font-medium">{breed.lifeExpectancy} anos</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Saúde:</span>
                      <span className="ml-2 font-medium">{breed.healthRisk}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3">Temperamento</h3>
                  <div className="flex flex-wrap gap-2">
                    {breed.temperament.map((trait, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/questionnaire">
                  <Button className="w-full bg-gradient-accent">
                    <Heart className="mr-2 h-4 w-4" />
                    Encontrar Outra Raça
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">História</h3>
              <p className="text-muted-foreground leading-relaxed">
                {breed.history}
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Cuidados Necessários</h3>
              <ul className="space-y-3">
                {breed.care.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Heart className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
