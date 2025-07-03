import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ChallengeCard from "@/components/ChallengeCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// 임시 사용자 데이터
const mockUserData = {
  name: "김덕빈",
  email: "deokbin@example.com",
  totalChallenges: 8,
  completedChallenges: 5,
  currentChallenges: [
    {
      id: "1",
      title: "함께 읽는 미드나잇 라이브러리",
      book: "미드나잇 라이브러리",
      author: "매트 헤이그",
      startDate: "2024-07-01",
      endDate: "2024-07-14",
      participants: 8,
      maxParticipants: 15,
      progress: 65,
      isJoined: true,
      inviteCode: "ABC123",
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
      progress: 30,
      isJoined: true,
      inviteCode: "DEF456",
    },
  ],
  completedChallengesList: [
    {
      id: "old1",
      title: "해리포터 마라톤",
      book: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      startDate: "2024-06-01",
      endDate: "2024-06-14",
      participants: 10,
      maxParticipants: 15,
      progress: 100,
      isJoined: true,
    },
  ],
  points: 1200, // 포인트 예시
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("current");
  const [points, setPoints] = useState(mockUserData.points);
  const [completedChallenges, setCompletedChallenges] = useState(
    mockUserData.completedChallenges
  );
  const POINTS_PER_CHALLENGE = 200;
  const EXCHANGE_THRESHOLD = 1000;

  const handleViewChallenge = (challengeId: string) => {
    navigate(`/challenge/${challengeId}`);
  };

  // 챌린지 완료 시 포인트 증가 (예시용)
  const handleCompleteChallenge = () => {
    setCompletedChallenges((prev) => prev + 1);
    setPoints((prev) => prev + POINTS_PER_CHALLENGE);
  };

  const handleExchange = () => {
    if (points < EXCHANGE_THRESHOLD) return;
    alert(
      "교보문고 e-point로 교환 신청이 완료되었습니다! (실제 연동은 미구현)"
    );
    setPoints((prev) => prev - EXCHANGE_THRESHOLD);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            안녕하세요, {mockUserData.name}님! 📚
          </h1>
          <p className="text-muted-foreground">
            오늘도 독서 챌린지에 참여해보세요.
          </p>
        </div>

        {/* 포인트/리워드 섹션 */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">🏅 내 포인트:</span>
            <span className="text-2xl font-bold text-yellow-500">
              {points}P
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCompleteChallenge}
              className="ml-2"
            >
              임시 챌린지 완료(포인트+)
            </Button>
          </div>
          <div>
            <Button
              size="sm"
              className="bg-green-600 text-white ml-2"
              disabled={points < EXCHANGE_THRESHOLD}
              onClick={handleExchange}
            >
              {points < EXCHANGE_THRESHOLD
                ? `e-point 교환(1000P~)`
                : `e-point로 교환하기`}
            </Button>
          </div>
        </div>

        {/* Grass Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">나의 독서 꾸준함</h2>
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarFallback>{mockUserData.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold">{mockUserData.name}</div>
              <div className="text-sm text-muted-foreground">
                {mockUserData.email}
              </div>
            </div>
          </div>
          <GrassGrid />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">총 참여 챌린지</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {mockUserData.totalChallenges}개
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">완료한 챌린지</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {completedChallenges}개
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">완주율</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {Math.round(
                  (completedChallenges / mockUserData.totalChallenges) * 100
                )}
                %
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Challenge Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
            <TabsTrigger value="current">참여 중인 챌린지</TabsTrigger>
            <TabsTrigger value="completed">완료한 챌린지</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            {mockUserData.currentChallenges.length > 0 ? (
              <div className="space-y-6">
                {mockUserData.currentChallenges.map((challenge) => (
                  <Card key={challenge.id} className="shadow-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                          <ChallengeCard
                            {...challenge}
                            onView={handleViewChallenge}
                          />
                        </div>
                        <div className="lg:w-80 space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">초대코드</h4>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="text-lg px-3 py-1"
                              >
                                {challenge.inviteCode}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    challenge.inviteCode
                                  )
                                }
                              >
                                복사
                              </Button>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">읽기 진행률</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>현재 진행률</span>
                                <span>{challenge.progress}%</span>
                              </div>
                              <Progress
                                value={challenge.progress}
                                className="h-3"
                              />
                            </div>
                          </div>

                          <Button
                            className="w-full"
                            onClick={() =>
                              navigate(`/challenge/${challenge.id}/record`)
                            }
                          >
                            독서 기록 작성하기
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">
                  참여 중인 챌린지가 없어요
                </h3>
                <p className="text-muted-foreground mb-6">
                  새로운 독서 챌린지에 참여해보세요!
                </p>
                <Button onClick={() => navigate("/")}>챌린지 둘러보기</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {mockUserData.completedChallengesList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockUserData.completedChallengesList.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    {...challenge}
                    onView={handleViewChallenge}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold mb-2">
                  아직 완료한 챌린지가 없어요
                </h3>
                <p className="text-muted-foreground">
                  첫 번째 챌린지를 완주해보세요!
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// 최근 42일(6주) 기준 임의의 기록 데이터 생성
function generateGrassData(days: number) {
  const today = new Date();
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    // 40% 확률로 기록 있음
    return { date: d, active: Math.random() < 0.4 };
  });
}

function GrassGrid() {
  const days = 42; // 6주
  const data = generateGrassData(days);
  // 7x6 그리드로 변환
  const weeks = Array.from({ length: 6 }, (_, w) =>
    data.slice(w * 7, (w + 1) * 7)
  );
  const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div>
      <div className="flex gap-1 mb-1">
        {dayLabels.map((d, i) => (
          <div
            key={i}
            className="w-4 text-xs text-center text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((cell, di) => (
              <div
                key={di}
                title={
                  cell.date.toLocaleDateString() +
                  (cell.active ? " 기록 있음" : " 기록 없음")
                }
                className={`w-4 h-4 rounded ${
                  cell.active ? "bg-green-500" : "bg-gray-200"
                } border border-gray-300`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="text-xs text-muted-foreground mt-2">
        최근 6주간의 독서 기록
      </div>
    </div>
  );
}
