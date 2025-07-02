import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, Users } from "lucide-react";

interface ChallengeCardProps {
  id: string;
  title: string;
  book: string;
  author: string;
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants: number;
  progress?: number;
  isJoined?: boolean;
  onJoin?: (id: string) => void;
  onView?: (id: string) => void;
}

export default function ChallengeCard({
  id,
  title,
  book,
  author,
  startDate,
  endDate,
  participants,
  maxParticipants,
  progress = 0,
  isJoined = false,
  onJoin,
  onView
}: ChallengeCardProps) {
  const daysLeft = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isActive = daysLeft > 0 && new Date() >= new Date(startDate);
  const isUpcoming = new Date() < new Date(startDate);

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-book animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge variant={isActive ? "default" : isUpcoming ? "secondary" : "outline"}>
            {isActive ? "진행중" : isUpcoming ? "시작 예정" : "완료"}
          </Badge>
          {isJoined && (
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              참여중
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg leading-tight">{title}</CardTitle>
        <div className="text-sm text-muted-foreground">
          <div className="font-medium">{book}</div>
          <div>by {author}</div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2" />
            {participants}/{maxParticipants}명 참여
          </div>

          {isJoined && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>읽기 진행률</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView?.(id)}
          >
            자세히 보기
          </Button>
          {!isJoined && participants < maxParticipants && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onJoin?.(id)}
              disabled={!isActive && !isUpcoming}
            >
              참여하기
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}