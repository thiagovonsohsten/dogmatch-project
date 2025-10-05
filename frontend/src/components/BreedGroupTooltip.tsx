import React from 'react';
import { Info } from 'lucide-react';
import { getBreedGroupInfo } from '@/lib/breedGroupInfo';

interface BreedGroupTooltipProps {
  breedGroup: string;
}

export default function BreedGroupTooltip({ breedGroup }: BreedGroupTooltipProps) {
  const info = getBreedGroupInfo(breedGroup);

  return (
    <div className="group relative inline-block">
      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
      
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-popover border rounded-lg shadow-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm">{info.name}</h4>
            <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
          </div>
          
          <div>
            <h5 className="font-medium text-xs mb-1">Características:</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              {info.characteristics.slice(0, 3).map((char, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  {char}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-xs mb-1">Exemplos:</h5>
            <p className="text-xs text-muted-foreground">{info.examples.join(', ')}</p>
          </div>
          
          <div>
            <h5 className="font-medium text-xs mb-1">Ideal para:</h5>
            <p className="text-xs text-muted-foreground">{info.idealFor.slice(0, 2).join(', ')}</p>
          </div>
        </div>
        
        {/* Seta */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
      </div>
    </div>
  );
}
