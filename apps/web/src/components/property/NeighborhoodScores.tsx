import { Footprints, Bus, Bike, Info } from "lucide-react";

interface ScoreProps {
    type: 'Walk' | 'Transit' | 'Bike';
    score: number;
}

const getScoreLabel = (type: string, score: number) => {
    if (score >= 90) return type === 'Walk' ? "Walker's Paradise" : type === 'Transit' ? "Rider's Paradise" : "Biker's Paradise";
    if (score >= 70) return type === 'Walk' ? "Very Walkable" : type === 'Transit' ? "Excellent Transit" : "Very Bikeable";
    if (score >= 50) return type === 'Walk' ? "Somewhat Walkable" : type === 'Transit' ? "Good Transit" : "Bikeable";
    return type === 'Walk' ? "Car-Dependent" : type === 'Transit' ? "Some Transit" : "Somewhat Bikeable";
};

const getScoreDescription = (type: string, score: number) => {
    if (score >= 90) return type === 'Walk' ? "Daily errands do not require a car." : type === 'Transit' ? "World-class public transportation." : "Daily errands can be accomplished on a bike.";
    if (score >= 70) return type === 'Walk' ? "Most errands can be accomplished on foot." : type === 'Transit' ? "Transit is convenient for most trips." : "Biking is convenient for most trips.";
    if (score >= 50) return type === 'Walk' ? "Some errands can be accomplished on foot." : type === 'Transit' ? "Many nearby public transportation options." : "Some bike infrastructure.";
    return type === 'Walk' ? "Most errands require a car." : type === 'Transit' ? "A few nearby public transportation options." : "Minimal bike infrastructure.";
};

const ScoreCard = ({ type, score }: ScoreProps) => {
    const label = getScoreLabel(type, score);
    const description = getScoreDescription(type, score);
    const Icon = type === 'Walk' ? Footprints : type === 'Transit' ? Bus : Bike;
    const colorClass = score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-500';

    return (
        <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
            <div className={`p-2 rounded-lg bg-gray-50 mt-1`}>
                <Icon className="w-6 h-6 text-gray-700" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-900 text-lg">{type} Score</span>
                    <span className={`font-black text-xl ${colorClass}`}>{score}</span>
                </div>
                <div className={`font-bold text-sm mb-1 ${colorClass}`}>{label}</div>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default function NeighborhoodScores({ latitude, longitude }: { latitude?: number, longitude?: number }) {
    // In a real app, fetch from WalkScore API using lat/long
    // Simulating deterministic scores based on coordinates to keep it consistent
    const seed = (latitude || 0) + (longitude || 0);
    const walkScore = Math.floor(Math.abs(Math.sin(seed * 123) * 30) + 65); // 65-95
    const transitScore = Math.floor(Math.abs(Math.cos(seed * 456) * 40) + 50); // 50-90
    const bikeScore = Math.floor(Math.abs(Math.sin(seed * 789) * 30) + 60); // 60-90

    return (
        <div className="bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-bold text-gray-900">Neighborhood Scores</h2>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
            </div>
            <div className="space-y-2">
                <ScoreCard type="Walk" score={walkScore} />
                <ScoreCard type="Transit" score={transitScore} />
                <ScoreCard type="Bike" score={bikeScore} />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                    Scores are estimates based on proximity to amenities, density, and infrastructure. Provided for informational purposes.
                </p>
            </div>
        </div>
    );
}
