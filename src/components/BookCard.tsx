import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

interface BookProps {
  title: string;
  author: string;
  rating: number;
  image: string;
}

export const BookCard = ({ title, author, rating, image }: BookProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-0">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-3 space-y-1">
          <h3 className="font-bold text-sm truncate">{title}</h3>
          <p className="text-xs text-muted-foreground">{author}</p>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex items-center gap-1">
        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
        <span className="text-xs font-medium">{rating}</span>
      </CardFooter>
    </Card>
  );
};
