import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ChallengeCard from "@/components/ChallengeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// 임시 데이터
const mockChallenges = [
  {
    id: "1",
    title: "함께 읽는 미드나잇 라이브러리",
    book: "미드나잇 라이브러리",
    author: "매트 헤이그",
    startDate: "2024-07-01",
    endDate: "2024-07-14",
    participants: 8,
    maxParticipants: 15,
    progress: 65
  },
  {
    id: "2", 
    title: "원피스 완독 챌린지",
    book: "원피스 1권",
    author: "오다 에이치로",
    startDate: "2024-07-05",
    endDate: "2024-07-19",
    participants: 12,
    maxParticipants: 20,
    progress: 30
  },
  {
    id: "3",
    title: "사피엔스로 역사 배우기",
    book: "사피엔스",
    author: "유발 하라리",
    startDate: "2024-07-10",
    endDate: "2024-07-31",
    participants: 5,
    maxParticipants: 10,
    progress: 0
  }
];

export default function Home() {
  const [inviteCode, setInviteCode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleJoinWithCode = () => {
    if (!inviteCode.trim()) {
      toast({
        title: "초대코드를 입력해주세요",
        variant: "destructive"
      });
      return;
    }
    
    // 실제로는 초대코드로 챌린지를 찾는 로직
    navigate(`/challenge/${inviteCode}`);
  };

  const handleJoinChallenge = (challengeId: string) => {
    toast({
      title: "챌린지에 참여했습니다!",
      description: "이제 함께 읽어보세요."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            함께 읽으면 더 재미있어요
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            혼자서는 끝까지 읽기 어려운 책도, 함께라면 완독할 수 있어요. 
            독서 기록을 공유하고 서로 동기부여를 받아보세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input
              placeholder="초대코드로 참여하기"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleJoinWithCode} className="w-full sm:w-auto">
              참여하기
            </Button>
          </div>
        </section>

        {/* Challenge Tabs */}
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="popular">인기 챌린지</TabsTrigger>
            <TabsTrigger value="recent">최신 챌린지</TabsTrigger>
            <TabsTrigger value="ending">마감임박</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  {...challenge}
                  onJoin={handleJoinChallenge}
                  onView={(id) => navigate(`/challenge/${id}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  {...challenge}
                  onJoin={handleJoinChallenge}
                  onView={(id) => navigate(`/challenge/${id}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockChallenges.filter(c => {
                const daysLeft = Math.ceil((new Date(c.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return daysLeft <= 7 && daysLeft > 0;
              }).map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  {...challenge}
                  onJoin={handleJoinChallenge}
                  onView={(id) => navigate(`/challenge/${id}`)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}